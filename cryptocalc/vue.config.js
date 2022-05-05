const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  chainWebpack: config => {
    config.plugin('polyfills').use(NodePolyfillPlugin)
  },
  pwa: {    
    appleMobileWebAppCapable: 'yes',
    iconPaths: {
      favicon32: 'icons/favicon-32x32.png',
      favicon16: 'icons/favicon-16x16.png',
      appleTouchIcon: 'icons/apple-touch-icon-152x152.png',
      maskIcon: 'icons/manifest-icon-512-masked.png',
      msTileImage: 'icons/ms-icon-144x144.png'
    }
  },
}
