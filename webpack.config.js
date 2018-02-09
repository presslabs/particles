const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const webpackConfig = {
  context: path.resolve('files'),
  entry: ['./index.js', './style.scss'],
  output: {
    path: path.resolve('./demo'),
    filename: 'js/bundle.js',
    publicPath: '/',
  },
  module: {},
}

webpackConfig.plugins = []
webpackConfig.module.rules = []

webpackConfig.module.rules.push({
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  query: 'presets=es2015',
})

webpackConfig.module.rules.push({
  test: /\.html$/,
  loader: 'html-loader?name=html/[name].[ext]',
})

webpackConfig.module.rules.push({
  test: /\.twig$/,
  loader: 'twig-loader',
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
