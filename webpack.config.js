var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: //"./js",
    [".js/app.js", "./js/dataHelper.js", "./js/decadeHelper.js", 
      "./js/dualAxisTimeSeriesHelper.js",
      "./js/historicalHelper.js", "./js/index.js", "./js/oadash.min.js", 
      "./js/regressionHelper.js", "./js/yoyHelper.js"
    ],
  target: 'node',
  externals: [nodeExternals({
    // this WILL include `jquery` and `webpack/hot/dev-server` in the bundle, as well as `lodash/*` 
    whitelist: ['jquery', 'webpack/hot/dev-server', /^lodash/]
  })],
  output: {
    filename: "bundle.js"
  },
  module: { loaders: [{ exclude: /node_modules/ }] },
}