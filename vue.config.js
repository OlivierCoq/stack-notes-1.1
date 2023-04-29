// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  pluginOptions: {
    css: {
      loaderOptions: {
        scss: {
          additionalData: `@import "@/sass/main.scss";`
        }
      }
    },
    electronBuilder: {
      nodeIntegration: true
    },
    chainWebpack: {
      title: 'Stack Notes'
    }
  }
}