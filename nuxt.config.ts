import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "./app/utils/seo.js";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@morev/vue-transitions/nuxt",
    "v-wave/nuxt",
    "@vee-validate/nuxt",
    "@nuxtjs/seo",
  ],

  tailwindcss: { exposeConfig: true, editorSupport: true },
  colorMode: { classSuffix: "", preference: "light" },
  imports: {
    imports: [
      { from: "tailwind-variants", name: "tv" },
      { from: "tailwind-variants", name: "VariantProps", type: true },
    ],
  },
  icon: {
    customCollections: [
      { prefix: "cui", dir: "./app/assets/icons/untitled-icons", height: 24, width: 24 },
    ],
  },
  app: {
    head: {
      title: SITE_TITLE,
      titleTemplate: `%s | ${SITE_NAME}`,
    },
  },
  site: {
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    defaultLocale: "en",
  },
});