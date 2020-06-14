// vue.config.js
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // 配置项
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/', // 资源文件目录
  // 开启esLint
  // lintOnSave: process.env.NODE_ENV !== 'production',
  // 开发服务配置
  devServer: {
    open: true,
    port: 2032,
    proxy: { // 代理控制
      '/api': {
        target: 'http://192.168.8.3:8070',
        ws: true,
        changeOrigin: true
      },
    },
  },
  css: {
    extract: false,
    requireModuleExtension: true,
    sourceMap: false,
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/css/color.scss";@import "~@/assets/css/mixin.scss";@import "~@/assets/css/animation.scss";`
      }
    }
  },
  assetsDir: 'static',
  // 别名
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        "~components": resolve("src/components"), // 组件
        "~image": resolve("src/assets/img"), // 静态资源
        "~style": resolve("src/assets/css") // 通用样式
      }
    }
  },

  // 将构建好的文件输出到位置
  outputDir: 'dist',
  // 是否为生产环境构建生成 source map？
  productionSourceMap: process.env.NODE_ENV !== 'production',

  // 三方插件的选项
  pluginOptions: {
    // ...
  },
}