// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "path";
export default defineNuxtConfig({
  alias:{
    '@':resolve(__dirname,"/"),
  },

  compatibilityDate: "2025-01-17",
})