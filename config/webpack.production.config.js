const path = require('path');
const webpackBaseConfig = require('./webpack.common.config');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const PurgeCssPlugin = require('purgecss-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
const { merge } = require('webpack-merge');
const webpackProductionConfig = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:6].css'
    }),
    new CssMinimizerWebpackPlugin(),
    new PurgeCssPlugin({
      paths: glob.sync(`./src/**/*`, { nodir: true })
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ],
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          filename: '[name]_vendors.js'
        }
      }
    }
  }
};

module.exports = merge(
  webpackBaseConfig('production'),
  webpackProductionConfig
);
