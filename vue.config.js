module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            rootValue: 37.5, // 换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从
            exclude: /(node_module)/, // 默认false，可以（reg）利用正则表达式排除某些文件夹的方
            mediaQuery: false // 布尔值）允许在媒体查询中转换px。
          })
        ]
      }
    }
  },
  productionSourceMap: true,
  chainWebpack: config => {
    config.plugins.delete('prefetch')

    // 这是生产者模式
    config.when(process.env.NODE_ENV === 'production', config => {
      // 在生产模式里面配置CDN优化的策略
      config.set('externals', {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        axios: 'axios',
        lodash: '_'
      })

      // 在生成者模式情况里面配置自定义的index.html的内容，包括在开发者模式下不引人外部的CDN文件，以及显示开发者模式下的title
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
  }
}
