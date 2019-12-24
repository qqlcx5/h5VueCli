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
    // overlay: {
    //   warnings: true,
    //   errors: true
    // }
  },
  css: { // 样式相关配置
    extract: false, // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    requireModuleExtension: true, // 去掉文件名中的 .module
    sourceMap: false, // 格式化样式
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/css/color.scss";@import "~@/assets/css/mixin.scss";@import "~@/assets/css/animation.scss";`
      }
    }
  },
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
	assetsDir: 'static',
  chainWebpack: config => {
    // 一个规则里的 基础Loader
    // svg是个基础loader
    const svgRule = config.module.rule('svg')
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()
    // 添加要替换的 loader
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
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