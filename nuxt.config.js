module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'cdn-home',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.byu.edu/byu-theme-components/latest/byu-theme-components.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.byu.edu/theme-fonts/latest/gotham-ringside-vitesse.css'},
    ],
    script: [
      { async: 'async', src: 'https://cdn.byu.edu/byu-theme-components/latest/byu-theme-components.min.js' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
