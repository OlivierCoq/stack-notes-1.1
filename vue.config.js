// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    },
    chainWebpack: {
      title: 'Stack Notes'
    }
  }
}