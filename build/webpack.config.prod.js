
const path = require('path')
const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")
const CopyPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: false,
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: path.resolve(__dirname, '../dist'),
    assetModuleFilename: 'images/[name].[contenthash:8].[ext]',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        // 设为 false 表示去除所有注释，除了有特殊标志的注释如 @preserve 标记
        extractComments: false,
        terserOptions: {
          // 去除函数，如上述配置的意思是将所有 console.log 函数去除
          compress: { pure_funcs: ['console.log'] },
        }
      })
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:8].css',
      chunkFilename: 'css/[name]-[contenthash:8].chunk.css'
    }),
    new CopyPlugin({
      patterns: [
        {
          // 解释 fron 路径，具体作用未知
          // context: 'public',
          // 定义要拷贝的源文件
          from: path.resolve(__dirname, '../public'),
          // 定义粘贴的指定路径
          to: path.resolve(__dirname, '../dist/public'),
          // 确定粘贴路径的类型，dir表示路径为一个文件夹
          toType: 'dir',
          // 允许使用全局匹配
          globOptions: {
            dot: true,
            gitignore: true,
            // **表示任意目录下
            ignore: [
              // path.resolve(__dirname, '../public/index.html'),
              '**/index.html'
            ],
          },
        }
      ]
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: productionGzipExtensions,
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: true
    })
  ]
})
