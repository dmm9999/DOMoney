module.exports = {
  context: __dirname,
  entry: "./lib/jquery_lite.js",
  output: {
    path: "./lib/",
    publicPath: "/js/",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]',
    filename: "bundle.js"
  },
  devtool: 'source-maps'
};
