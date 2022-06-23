import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  css: [
    // tailwind temprorary decision until support
    '~/assets/css/tailwind.css',
    '~/assets/css/index.scss',
    '~/assets/fonts/Montserrat/stylesheet.css',
  ],
  storybook: {
    // Options
    components: true
  }
})
