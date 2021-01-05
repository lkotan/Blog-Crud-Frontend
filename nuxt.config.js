export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#E53935'
  },
  /*
   ** Global CSS
   */
  css: [
    '../node_modules/ti-icons/css/themify-icons.css',
    '~/assets/scss/style.scss',
    '~/assets/style.css',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/serviceInstaller",
    "~/plugins/vuetify",
    "~/helpers/vuetify",
    "~/helpers/extensions",
    "~/Repositories/PageRepository"
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    ['bootstrap-vue/nuxt', {
      icons: true,
    }],
  ],
  axios: {
    baseURL: 'http://localhost:62943/api'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  env: {
    title: " | Blog Web Site",
  }
}
