/**
 * Created by Agnieszka on 03.03.2017.
 */
var path = require('path');

module.exports = {
    context: path.resolve('js'),
    entry: ["./index.js"],
    output: {
        path: path.resolve('build/js/'),
        publicPath: '/public/assets/js/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            // {
            //     test: /\.css$/,
            //     exclude: /node_modules/,
            //     loader: "style-loader!css-loader"
            // },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: "style-loader!css-loader!sass-loader"
            },
            {
                test: /\.(png|svg|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=10000'
            }
        ]
    },
    resolve: {
        extensions: ['.js','.scss']
    }
};