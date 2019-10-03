var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
  entry: './frontend/index.js',
  output: {
    path: path.resolve(__dirname , 'dist'),
    filename: 'index_bundle.js'
  },
  watch: true,
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.(js)$/,
      use:'babel-loader'
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  mode:'development',
  devServer: {
    hot: false,
    disableHostCheck: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    proxy: {
      '/balance/**': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      }
    },
  },
  plugins: [
    new HtmlWebpackPlugin ({
      template : 'frontend/index.html'
    })
  ]
}