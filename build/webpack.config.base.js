const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { isDevelopment, isProduction } = require('../scripts/config/env')
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const getCssLoaders = () => {
  const cssLoaders = [
    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        // modules: {
        //   localIdentName: '[local]--[hash:base64:5]'
        // },
        modules: false,
        sourceMap: isDevelopment,
      }
    }
  ]

  isProduction && cssLoaders.push({
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          isProduction && [
            'postcss-preset-env',
            {
              autoprefixer: {
                grid: true,
              }
            },
          ],
        ],
      },
    }
  })

  return cssLoaders;
}


module.exports = {
  entry: {
    index: path.resolve(__dirname, '../src/main.tsx')
  },
  cache: {
    // 缓存类型，值为 memory 或 filesystem
    type: 'filesystem',
    // 全局缓存失效的一种机制，配置 {config: [__filename]}，表示当配置文件内容或配置文件依赖的模块文件发生变化时，当前的构建缓存即失效`
    buildDependencies: {
      config: [__filename],
    },
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   exclude: [/node_modules/],
      //   use: [...getCssLoaders()]
      // },
      // {
      //   test: /\.(css|less)$/,
      //   exclude: [/src/],
      //   use: ['style-loader', 'css-loader'],
      // },
      {
        test: /\.(css|less)$/,
        // exclude: [/node_modules/],
        // include: [/src/],
        use: [
          ...getCssLoaders(),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDevelopment,
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: path.resolve(__dirname, './node_modules')
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.webp$/],
        // 资源模块类型
        // `asset/resource：将资源分割为单独的文件，并导出url，就是之前的 file-loader的功能
        // asset/inline：将资源导出为dataURL（url(data:)）的形式，之前的 url-loader的功能
        // asset/source：将资源导出为源码（source code）. 之前的 raw-loader 功能
        // asset：自动选择导出为单独文件或者 dataURL形式（默认为8KB）. 之前有url-loader设置asset size limit 限制实现
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        type: 'asset/resource',
      },
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      publicPath: './',
      favicon: path.resolve(__dirname, '../public/favicon.ico')
    }),
    new WebpackBar({
      name: 'link startou!!!',
      color: '#52c41a'
    }),
    new ForkTsCheckerPlugin({
      typescript: {
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }
    }),
    new CleanWebpackPlugin(),
  ]
}
