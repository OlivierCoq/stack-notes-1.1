const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/sass/main.scss";`
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.ts',
      builderOptions: {
        extraResources: ['src', 'src/res/'],
      },
    },
    chainWebpack: {
      title: 'Stack Notes'
    }
  }
})