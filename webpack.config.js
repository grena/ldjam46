const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');

module.exports = () => {
    return {
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [
                {test: /\.ts/, loader: 'ts-loader', exclude: /node_modules/}
            ]
        },
        entry: './src/index.ts',
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new HtmlWebpackPlugin({
                templateParameters: {
                    'title': 'Boutestrape'
                },
                template: 'src/assets/html/index.ejs',
            }),
            new CopyPlugin([
                {from: 'src/assets', to: 'assets'},
                {from: 'src/assets/favicon.ico', to: '.'},
            ]),
            new webpack.ProvidePlugin({
                Phaser: 'phaser',
            }),
            new ExtraWatchWebpackPlugin({
                files: ['src/assets/**/*'],
            }),
        ],
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: parseInt(process.env.SERVER_PORT || 8080)
        }
    }
};
