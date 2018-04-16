const nodeExternals = require('webpack-node-externals');
const axios = require('axios');
const resolve = (dir) => require('path').join(__dirname, dir);

let routerBase = '';
let generateDir = 'dist';

switch (process.env.DEPLOY_ENV) {
  case 'GH_PAGES':
    routerBase = '/cdn-site/'
    generateDir = 'docs'
  break;
  case 'CDN':
    routerBase = '/~/'
    break;
}

const cdnBase = process.env.CDN_BASE || 'https://beta.cdn.byu.edu';

module.exports = {
  env: {
    cdnBase
  },
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
      { rel: 'stylesheet', href: 'https://cdn.materialdesignicons.com/2.1.19/css/materialdesignicons.min.css', type: 'text/css' },
    ],
    script: [
      { async: 'async', src: 'https://cdn.byu.edu/byu-theme-components/latest/byu-theme-components.min.js' },
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  router: {
    base: routerBase,
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
      '~/plugins/clipboard.js',
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
    dir: generateDir,
    routes: async function() {
      const resp = await axios.get(`${cdnBase}/manifest.json`);
      const manifest = resp.data;
      const routes = [];
      for ([id, lib] of Object.entries(manifest.libraries)) {
        const libRoute = `/directory/${id}`;
        lib.id = id;
        routes.push({
          route: libRoute,
          payload: lib,
        });
        const versionRoutes = await Promise.all(
          lib.versions.map(async (version) => {
            const start = Date.now();
            const manifest = (await axios.get(cdnBase + version.manifest_path)).data;
            return {
              route: `${libRoute}/${version.name}`,
              payload: {version, manifest},
            };
          })
        );
        routes.push(...versionRoutes);
      }
      return routes;
    }
  },
  plugins: ['~/plugins/vuetify.js'],
}
