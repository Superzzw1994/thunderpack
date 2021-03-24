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
    plugins: isProduction ? [] : [
        ["react-refresh/babel"]
    ]
}