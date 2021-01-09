const path = require("path");

module.exports = {
  // publicPath: "/progdes/",
  chainWebpack(config) {
    config
      .entry("app")
      .clear()
      .add("./src/main.js")
      .end();
    // config.resolve.alias
    //   .set("~", path.join(__dirname, "./src"))
    //   .set("@", path.join(__dirname, "./src/core"))
    //   .set("#", path.join(__dirname, "./src/modules"));
  },
  configureWebpack: {
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: [path.resolve(__dirname, "src/core/")],
          indentedSyntax: true,
        },
        prependData: '@import "~bootstrap/scss/bootstrap"',
      },
    },
  },
  assetsDir: "@/assets/",
};
