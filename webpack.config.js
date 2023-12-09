const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
    const mode = argv.mode || 'production'
    const isDevelopment = mode === 'development'

    return ({
        mode,
        entry: './src/index.ts',
        output: {
            publicPath: '/',
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['.ts', '.js'],
            modules: [
                path.resolve(__dirname, './node_modules'),
                path.resolve(__dirname, './src')
            ],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                // style modules
                {
                    test: /\.sass$/i,
                    use: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: {
                                    localIdentName: '[name]__[local]--[hash:base64:5]',
                                },
                            },
                        },
                        'sass-loader',
                    ],
                    include: /\.module\.sass$/,
                },
                // normal styles
                {
                    test: /\.sass$/i,
                    use: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                    exclude: /\.module\.sass$/,
                },
                // normal css
                {
                    test: /\.css$/i,
                    use: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                    ]
                },
                {
                    test: /\.(png|jpg|gif|xml|musicxml)$/i,
                    type: 'asset/resource'
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({template: './src/index.html'}),
            new MiniCssExtractPlugin(),
            new CopyPlugin({
                patterns: [
                    { from: "assets", to: "assets" }
                ],
            }),
        ]
    })
}
