const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpackBaseConfig = require('./webpack.common.config');
const { merge } = require('webpack-merge');
const webpackDevelopmentConfig = {
  mode: 'development',
  devtool: 'source-map',
  plugins: [new ReactRefreshWebpackPlugin()],
  devServer: {
    hot: true,
    open: true,
    host: '0.0.0.0',
    port: 1994,
    historyApiFallback: true,
    clientLogLevel: 'silent'
  }
};

module.exports = merge(
  webpackBaseConfig('development'),
  webpackDevelopmentConfig
);
