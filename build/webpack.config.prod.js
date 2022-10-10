
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
    runtimeChunk: { name: "runtime" },
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test:/[\\/]node_modules[\\/]/,
          //最小大小设置成0，把所有的依赖都给提取出来变成独立的bundle
          minSize: 0,
          minChunks: 1,//模块至少使用次数,当值为2时，代表只引用了一次的模块不做分割打包处理
          priority: 1,//值越大优先级越高
          chunks: 'initial'
        }
      }
    }
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
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: productionGzipExtensions,
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false
    })
  ]
})
