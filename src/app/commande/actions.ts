"use server";

type Field = "name" | "email" | "appName" | "packageId" | "testLink";

export type OrderState = {
  status: "idle" | "success" | "error" | "email";
  message?: string;
  errors?: Partial<Record<Field, string>>;
  values?: Partial<Record<Field, string>>;
  email?: string;
  summary?: string;
};

const PACKAGE_RE = /^[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)+$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitOrder(_prev: OrderState, formData: FormData): Promise<OrderState> {
  const get = (key: string) => String(formData.get(key) ?? "").trim();

  // Pot de miel anti-spam : un humain ne remplit jamais ce champ caché.
  if (get("website")) return { status: "success" };

  const values = {
    name: get("name"),
    email: get("email"),
    appName: get("appName"),
    packageId: get("packageId"),
    testLink: get("testLink"),
  };

  const errors: OrderState["errors"] = {};
  if (values.name.length < 2 || values.name.length > 120) errors.name = "Indique ton nom (2 caractères minimum).";
  if (!EMAIL_RE.test(values.email) || values.email.length > 200) errors.email = "Cet email ne semble pas valide.";
  if (!values.appName || values.appName.length > 120) errors.appName = "Indique le nom de ton app.";
  if (!PACKAGE_RE.test(values.packageId) || values.packageId.length > 150)
    errors.packageId = "Format attendu : com.tonnom.tonapp";
  if (values.testLink) {
    try {
      if (new URL(values.testLink).protocol !== "https:") throw new Error("protocol");
    } catch {
      errors.testLink = "Colle un lien complet qui commence par https://";
    }
  }
  if (Object.keys(errors).length) {
    return { status: "error", message: "Quelques champs sont à corriger.", errors, values };
  }

  const order = {
    ...values,
    needHelp: formData.get("needHelp") === "on",
    expressStart: formData.get("expressStart") === "on",
    stripeSessionId: get("sessionId").slice(0, 255) || null,
    receivedAt: new Date().toISOString(),
  };

  const summary = [
    "Nouvelle commande 12testeurs",
    `• ${order.name} <${order.email}>`,
    `• App : ${order.appName} (${order.packageId})`,
    `• Lien de test fermé : ${order.testLink || "à créer"}`,
    `• Besoin d’aide pour le test fermé : ${order.needHelp ? "oui" : "non"}`,
    `• Démarrage immédiat demandé (rétractation) : ${order.expressStart ? "oui" : "non"}`,
    `• Session Stripe : ${order.stripeSessionId ?? "—"}`,
  ].join("\n");

  const webhook = process.env.ORDER_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[commande] ORDER_WEBHOOK_URL absent : commande affichée ici seulement.\n" + summary);
      return { status: "success", email: order.email };
    }
    // Pas encore d’outil branché : le client envoie lui-même le récapitulatif par email.
    return { status: "email", email: order.email, summary };
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // content : Discord · text : Slack · order : Make, Zapier, n8n…
      body: JSON.stringify({ content: summary, text: summary, allowed_mentions: { parse: [] }, order }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    console.error("[commande] échec de l’envoi au webhook", err, "\n" + summary);
    return { status: "error", message: "Envoi impossible pour le moment. Réessaie dans une minute.", values };
  }

  return { status: "success", email: order.email };
}
