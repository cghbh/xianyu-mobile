module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            rootValue: 37.5, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从
            exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方
            mediaQuery: false //（布尔值）允许在媒体查询中转换px。
          })
        ]
      }
    }
  }
}
