const isProduction = (process.env.production === 'production');
const babelConfig = require('@chaoswise/ui/config/babel');
module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: 3
    }],
    ['@babel/preset-react'],
    ['@babel/preset-typescript']
  ],
  plugins: isProduction ? [[
    'import',
    babelConfig // @chaoswise/ui 按需引入babel配置
  ]] : [
    ['react-refresh/babel'],
    [
      'import',
      babelConfig // @chaoswise/ui 按需引入babel配置
    ]
  ]
};