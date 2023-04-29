// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/sass/main.scss";`
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    },
    chainWebpack: {
      title: 'Stack Notes'
    }
  }
}