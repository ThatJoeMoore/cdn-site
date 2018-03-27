const nodeExternals = require('webpack-node-externals');
const resolve = (dir) => require('path').join(__dirname, dir);

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - Web Community CDN',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'preload', href: 'https://cloud.typography.com/75214/6517752/css/fonts.css', as: 'style'},
      { rel: 'preload', href: 'https://cdn.byu.edu/byu-theme-components/latest/byu-theme-components.min.css', as: 'style' },
      { rel: 'preload', href: 'https://cdn.byu.edu/byu-theme-components/latest/byu-theme-components.min.js', as: 'script' },
      { rel: 'preload', href: 'https://cdn.byu.edu/byu-theme-components/latest/components.min.js', as: 'script' },
      { rel: 'preload', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,700|Source+Code+Pro|Material+Icons', as: 'style' },

      { rel: 'icon', type: 'image/x-icon', href: 'https://cdn.byu.edu/shared-icons/1.0.0/favicons/favicon.ico' },
      
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.byu.edu/byu-theme-components/latest/byu-theme-components.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cloud.typography.com/75214/6517752/css/fonts.css'},
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,700|Source+Code+Pro|Material+Icons' },
    ],
    script: [
      { async: 'async', src: 'https://cdn.byu.edu/byu-theme-components/latest/byu-theme-components.min.js' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  router: {
    base: '/~/'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient, isServer }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    },
    vendor: [
      'axios',
      '~/plugins/vuetify.js',
    ],
    extractCSS: true,
    babel: {
      plugins: [
        ["transform-imports", {
          "vuetify": {
            "transform": "vuetify/es5/components/${member}",
            "preventFullImport": true
          }
        }]
      ]
    },
  },
  plugins: ['~/plugins/vuetify.js']
}
