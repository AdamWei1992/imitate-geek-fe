const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base')
const EslintWebpackPlugin = require('eslint-webpack-plugin')

module.exports = webpackMerge.merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'js/[name].js',
    // path: path.resolve(__dirname, '../dist'),
    // publicPath: '/dist'
  },
  stats: 'errors-only',
  devServer: {
    host: '0.0.0.0',
    port: '3000',
    client: {
      logging: 'none'
    },
    compress: true,
    // open: true,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4000',
        changeOrigin: true
      }
    }
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin()
    new EslintWebpackPlugin({
      fix: true,
      extensions: ['ts', 'js', 'json'],
      exclude: ['node_modules']
    })
  ]
})
