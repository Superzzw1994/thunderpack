const isProduction = (process.env.production === 'production')
module.exports = {
  presets: [
    ["@babel/preset-env", {
      useBuiltIns: 'usage',
      corejs: 3
    }],
    ["@babel/preset-react"],
    ["@babel/preset-typescript"]
  ],
  plugins: isProduction ? [["import", {
    "libraryName": "antd",
    "libraryDirectory": "es",
    "style": true // `style: true` 会加载 less 文件
  }]] : [
    ["react-refresh/babel"], ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": true // `style: true` 会加载 less 文件
    }]
  ]
}
