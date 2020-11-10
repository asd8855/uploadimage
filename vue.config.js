const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "./",
  productionSourceMap: false,
  devServer: {
    port: 8088,
    before(app) { },
    https: false,
    open: false,
    proxy: {
      '/user': {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      '/upload': {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      '/agreement': {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    }
  },
  lintOnSave: false, //关闭eslint代码检查
  configureWebpack: config => {
    config.resolve.extensions = [".js", ".vue", ".json"];
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("src"));
  }
};
