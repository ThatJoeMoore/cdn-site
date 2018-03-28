const nodeExternals = require('webpack-node-externals');
const axios = require('axios');
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
    base: '/~/',
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        let position = {x: 0, y: 0};
        if (to.hash) {
          position = { selector: to.hash }
        }
        return position
      }
    },
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
  generate: {
    interval: 100,
    routes: async function() {
      const resp = await axios.get('https://dev.cdn.byu.edu/manifest.json');
      const manifest = resp.data;
      const routes = [];
      for ([id, lib] of Object.entries(manifest.libraries)) {
        const libRoute = `/directory/${id}`;
        lib.id = id;
        routes.push({
          route: libRoute,
          payload: lib,
        });
        for (version of lib.versions) {
          const verPath = version.type === 'release' ? version.name : 'experimental/' + version.name;
          const manifest = (await axios.get(`https://dev.cdn.byu.edu/${id}/${verPath}/.cdn-meta/version-manifest.json`)).data;
          routes.push({
            route: `${libRoute}/${version.name}`,
            payload: {version, manifest},
          });
        }
      }
      return routes;
    }
  },
  plugins: ['~/plugins/vuetify.js'],
}
