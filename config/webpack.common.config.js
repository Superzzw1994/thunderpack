const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {DefinePlugin} = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
  process.env.production = env;
  return {
    entry: './src/index.tsx',
    output: {
      filename: 'js/[name].[chunkhash:6].bundle.js',
      chunkFilename: 'js/[name].[contenthash:6].chunk.js',
      path: path.resolve(__dirname, '../dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader:
                env === 'production'
                  ? MiniCssExtractPlugin.loader
                  : 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        },
        {
          test: /\.less$/,
          use: [
            {
              loader:
                env === 'production'
                  ? MiniCssExtractPlugin.loader
                  : 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'less-loader'
            }
          ]
        },
        {
          test: /\.png|gif|svg|jpe?g$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[hash:8].[ext]',
                outputPath: 'img',
                limit: 1024 * 100
              }
            }
          ]
        },
        {
          test: /\.jsx?|tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader'
            },
            {
              loader: 'eslint-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      new DefinePlugin({
        BASE_URL: '"./"'
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        title: 'zzw'
      })
      // new CopyPlugin({
      //     patterns: [
      //         {
      //             from: "public", globOptions: {
      //                 dot: true,
      //                 gitignore: true,
      //                 ignore: ["**/index.html"],
      //             },
      //         },
      //     ],
      // }),
    ],
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.jsx']
    }
  };
};
