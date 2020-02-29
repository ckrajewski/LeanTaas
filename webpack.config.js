/*
alias npm-exec='PATH=$(npm bin):$PATH'
*/
const webpack = require('webpack');
const path = require('path');
const openBrowser = require('react-dev-utils/openBrowser');

module.exports = {
    context: path.join(__dirname, "src"),
    devtool: "#eval-sourcemap",
    entry: "./main.js",
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        host: 'localhost', // Defaults to `localhost`
        port: 8080, // Defaults to 8080
        proxy: {
            '/api': {
                target: 'http://localhost:3000/',
                secure: false,
                changeOrigin:true,
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                        loader: "babel-loader",
                        options: {
                            presets: ["babel-preset-env", "react"],
                            plugins: ["transform-object-rest-spread", "transform-class-properties", ["react-css-modules", {
                               context: path.join(__dirname, "src")
                            }]],
                        },
                    },
                    { loader: "eslint-loader" }
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            importLoader: 1,
                            modules: true,
                            localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    output: {
        path: __dirname + "/src/",
        filename: "mainCreated.js"
    },
};
if (openBrowser('http://localhost:8080')) {
    console.log('The browser tab has been opened!');
}