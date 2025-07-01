// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000,
  },
  output: "server",
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});
