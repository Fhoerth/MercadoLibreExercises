const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const pkg = require('./package.json')
const config = require('./config.json')

module.exports = {
  entry: {
    vendor: Object.keys(pkg.dependencies).concat(Object.keys(pkg.devDependencies))
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, config.dirs.public, config.dirs.vendor),
    library: '[name]_lib'
  },
  plugins: [
    new CleanWebpackPlugin([config.dirs.public]),
    new webpack.DllPlugin({
      name: '[name]_lib',
      path: path.join(config.dirs.public, config.dirs.vendor, '[name]-manifest.json')
    })
  ]
}
