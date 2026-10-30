import type { NextConfig } from "next";

// Site 100 % statique (aucun serveur) : hébergeable sur GitHub Pages, Vercel, Netlify…
// Sur GitHub Pages (https://vavacry.github.io/12testeurs), le site vit dans un sous-dossier :
// le workflow définit NEXT_PUBLIC_BASE_PATH=/12testeurs. Avec un domaine à soi, on le laisse vide.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
