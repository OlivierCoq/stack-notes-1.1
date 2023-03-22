const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV  ===  'production'  ?  './'  :  '/',
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/sass/main.scss";`
      }
    }
  }
})
