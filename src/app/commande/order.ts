// Traitement de la commande dans le navigateur : le site est 100 % statique (aucun serveur).

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

  // Optionnel : copie automatique vers un webhook (Make, Zapier, n8n…), sans attendre la réponse.
  const webhook = process.env.NEXT_PUBLIC_ORDER_WEBHOOK_URL;
  if (webhook) {
    fetch(webhook, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ content: summary, text: summary, order }),
    }).catch(() => {});
  }

  // Le client envoie le récapitulatif par email : la commande arrive toujours dans ta boîte.
  return { status: "email", email: order.email, summary };
}
