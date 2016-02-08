var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var webpack = require('webpack');


var srcPath = './src';
module.exports = {
    entry: {
        'app': srcPath+'/app.ts',
        'vendor': srcPath+'/vendor.ts'
    },
    output: {
        path: root("./dist"),
        filename: "/js/main.js"
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './index.html' },
            { from: './assets/fonts/**/*'},
            { from: './assets/images/**/*'}
        ]),
        new webpack.optimize.CommonsChunkPlugin('vendor', '/js/vendor.js')
    ],
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: "ts-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.scss$/, loader: "style!css!sass" },
            { test: /\.svg$/, loader: "file-loader!css-loader" },
            { test   : /\.(ttf|eot|otf|svg|woff(2)?)(\?[a-z0-9]+)?$/,
loader : 'file-loader' } 
        ],
        noParse: [ path.join(__dirname, 'node_modules', 'angular2', 'bundles') ]
    },
    devServer: {
        historyApiFallback: true
    }
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}