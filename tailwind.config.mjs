/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
        display: ["press-start-2p", "ui-monospace", "monospace"],
        serif: [
          "Literata Variable",
          "ui-serif",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
