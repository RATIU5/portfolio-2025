import { defineConfig, fontProviders } from 'astro/config';
import studiocms from 'studiocms';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from "@astrojs/cloudflare"

const site =
    process.env.NODE_ENV === 'production'
        ? 'https://ratiu5.dev'
        : 'http://localhost:4321';

// https://astro.build/config
export default defineConfig({
  site,
  output: "server",

  adapter: cloudflare(),

  integrations: [studiocms()],

  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Fredericka the Great",
        cssVariable: "--ftg",
      },
      {
        provider: fontProviders.google(),
        name: "Cutive Mono",
        cssVariable: "--cm",
      },
      {
        provider: fontProviders.local(),
        name: "Typrighter",
        cssVariable: "--typrighter",
        options: {
          variants: [
            {
              weight: 400,
              style: "normal",
              src: ["./src/assets/fonts/typrighter.woff2", "./src/assets/fonts/typrighter.woff"]
            },
            {
              weight: 700,
              style: "normal",
              src: ["./src/assets/fonts/typrighter-Bold.woff2", "./src/assets/fonts/typrighter-Bold.woff"]
            }
          ]
        }
      }
    ]
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
