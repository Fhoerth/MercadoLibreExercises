require('dotenv').config()
const path = require('path')
const webpack = require('webpack')
const deepmerge = require('deepmerge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { concat } = require('ramda')

const pkg = require('./package.json')
const config = require('./config.json')

const isProduction = process.env.NODE_ENV === 'production'
const entryFile = './' + path.join('app', 'index.js')

const definePlugin = new webpack.DefinePlugin({
  'process.env': {
    'MERCADO_LIBRE_API_BASE_URL': JSON.stringify(process.env.MERCADO_LIBRE_API_BASE_URL)
  }
})

const baseConfig = {
  output: {
    filename: path.join(config.dirs.dist, 'js', config.dist.jsBundleFileName),
    path: path.resolve(__dirname, config.dirs.public),
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    }, {
      test: /\.(png|jpg)$/,
      loader: `file-loader?name=${config.dirs.public}/images/[name]-[hash].[ext]` // inline base64 URLs for <=10kb images, direct URLs for the rest
    }]
  },

  plugins: [
    new CopyWebpackPlugin([
      { context: path.join(config.dirs.app, config.dirs.assets), from: '*', to: '' }
    ])
  ]
}

if (isProduction) {
  // @@@@@ PRODUCTION @@@@@
  const extractCSS = new ExtractTextPlugin(path.join(config.dirs.dist, 'styles', config.dist.cssBudleFileName))
  const distConfig = deepmerge(baseConfig, {
    entry: entryFile,
    module: {
      loaders: [{
        test: /\.scss$/,
        use: extractCSS.extract(['css-loader?modules&camelCase=true&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'autoprefixer-loader', 'sass-loader'])
      }]
    },
    plugins: [
      new CleanWebpackPlugin([config.dirs.public]),
      extractCSS,
      new HtmlWebpackPlugin({
        filename: 'index.html',
        minify: {
          collapseInlineTagWhitespace: true,
          collapseWhitespace: true
        },
        pkg,
        template: '!!ejs-loader!' + path.join(__dirname, config.dirs.app, config.dirs.assets, 'index.html')
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        comments: false
      }),
      definePlugin
    ]
  }, {
    arrayMerge: concat
  })
  module.exports = distConfig
} else {
  // @@@@@ DEVELOPMENT @@@@@
  const devWebpackConfig = deepmerge(baseConfig, {
    devtool: 'inline-source-map',
    entry: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${config.dev.host}:${config.dev.port}`,
      'webpack/hot/only-dev-server',
      entryFile
    ],
    module: {
      loaders: [{
        test: /\.scss$/,
        loader: 'style-loader!css-loader?modules&camelCase=true&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!autoprefixer-loader!sass-loader'
      }]
    },
    devServer: {
      hot: true,
      contentBase: config.dirs.public,
      publicPath: `http://${config.dev.host}:${config.dev.port}`,
      historyApiFallback: {
        rewrites: [
          { from: /^\/$/, to: '/index.html' }
        ]
      }
    },
    plugins: [
      definePlugin,
      new CleanWebpackPlugin([config.dirs.public], { exclude: 'vendor' }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        minify: {
          collapseInlineTagWhitespace: true,
          collapseWhitespace: true
        },
        externals: [path.join(config.dirs.vendor, 'vendor.bundle.js')],
        pkg,
        template: '!!ejs-loader!' + path.join(__dirname, config.dirs.app, config.dirs.assets, 'index.html')
      }),
      new webpack.DllReferencePlugin({
        context: '.',
        manifest: require(path.join(__dirname, config.dirs.public, config.dirs.vendor, 'vendor-manifest.json'))
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    ]
  }, {
    arrayMerge: concat
  })
  module.exports = devWebpackConfig
}
