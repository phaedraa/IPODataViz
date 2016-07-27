var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: "./entry.js",
  target: 'node',
  externals: [nodeExternals({
    // this WILL include `jquery` and `webpack/hot/dev-server` in the bundle, as well as `lodash/*` 
    whitelist: ['jquery', 'webpack/hot/dev-server', /^lodash/]
  })],
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" }
    ]
  }
};
