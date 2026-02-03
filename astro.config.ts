import { defineConfig, fontProviders } from 'astro/config';
import { loadEnv } from "vite";
import node from '@astrojs/node';
import studiocms from 'studiocms';

import tailwindcss from '@tailwindcss/vite';

const { SITE_URL = "http://localhost:4321" } = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: "server",

  adapter: node({
    mode: 'standalone'
  }),

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
        name: "Give You Glory",
        cssVariable: "--gyg",
      },
      {
        provider: fontProviders.google(),
        name: "Cutive Mono",
        cssVariable: "--cm",
      }
    ]
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
