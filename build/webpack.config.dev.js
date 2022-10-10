const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const { name } = require('../package');

module.exports = webpackMerge.merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'js/[name].js',
    // path: path.resolve(__dirname, '../dist'),
    // publicPath: '/dist'
    library: `${name}-[name]`,
    libraryTarget: 'umd',
    uniqueName: `webpackJsonp_${name}`,
    globalObject: 'window'
  },
  stats: 'errors-only',
  devServer: {
    host: '0.0.0.0',
    port: '4000',
    client: {
      logging: 'none'
    },
    compress: true,
    // open: true,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9000',
        changeOrigin: true
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000
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
