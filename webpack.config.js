const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConfig = {
  context: path.resolve('files'),
  entry: ['./index.js'],
  output: {
    path: path.resolve('./demo'),
    filename: 'js/bundle.[hash].js',
    publicPath: '/',
  },
  module: {},
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js', // prettier-ignore
      '@': resolve('files'),
    },
  },
}

webpackConfig.plugins = []

webpackConfig.plugins.push(
  new HtmlWebpackPlugin({
    template: '../templates/index.template.ejs',
    inject: 'body',
  }),
)

webpackConfig.plugins.push(new CleanWebpackPlugin(['demo']))
webpackConfig.plugins.push(new ExtractTextPlugin('css/styles.[hash].css'))

webpackConfig.module.rules = []

webpackConfig.module.rules.push({
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
    },
  },
})

webpackConfig.module.rules.push({
  test: /\.vue$/,
  loader: 'vue-loader',
  options: {
    extractCSS: true,
    loaders: {
      scss:
        'vue-style-loader!css-loader!autoprefixer-loader!sass-loader!webpack-px-to-rem?basePx=16',
    },
  },
})

webpackConfig.module.rules.push({
  test: /\.html$/,
  loader: 'html-loader?name=html/[name].[ext]',
})

webpackConfig.module.rules.push({
  test: /\.json$/,
  loader: 'json-loader',
})

webpackConfig.module.rules.push({
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract({
    publicPath: '',
    fallback: 'style-loader',
    use:
      'css-loader!autoprefixer-loader!sass-loader!webpack-px-to-rem?basePx=16',
  }),
})

webpackConfig.module.rules.push({
  test: /\.css$/,
  loaders: ['style-loader', 'css-loader'],
})

webpackConfig.module.rules.push({
  test: /\.(jpe?g|png|gif|svg)$/,
  exclude: [/fonts/],
  loader: 'file-loader?name=images/[name].[ext]',
})

webpackConfig.module.rules.push({
  test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
  exclude: [/images/],
  loader: 'file-loader?name=fonts/[name].[ext]',
})

module.exports = webpackConfig
