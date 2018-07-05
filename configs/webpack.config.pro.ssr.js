import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
let BomPlugin = require('webpack-utf8-bom');//将文件转成utf-8 bom格式，解决中文乱码的问题
const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('development')
};
let srcPath =  path.join(__dirname, '../src/');;
export default {
    // devtool: 'source-map',
    mode: 'production',
    entry: {  
        vendor: [
            'whatwg-fetch'
        ],
        index: [
            'babel-polyfill',
            srcPath + 'server/index'
        ]
    },
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.join(__dirname, '..', 'dist'),   // Note: Physical files are only output by the production build
        publicPath: '/dist/',
        filename: '[name].js',
        library: 'notice',// expose our entry file’s exports to the “outside world.” We are going to call our library name `app`
        libraryTarget: 'commonjs2' //defined how our library is exported to the outside world. Since `module.exports` is a default in node environment, we are going to use the same
    },
      node: {
        __filename: true,
        __dirname: true
    },
    plugins: [
        new webpack.DefinePlugin(GLOBALS)
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude:  [path.join(__dirname, '..', 'node_modules')],
                loader:   'babel-loader',
                exclude: /node_modules/,
                query: {                
                    babelrc: "false",
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: [
                        "transform-es2015-modules-commonjs" //如果不转换成require，import 'xxx.styl'会报错
                    ]
                }
            },
            {
                test: /\.css$/,
                loader: 'css-loader/locals',
                options: {
                    sourceMap: true,
                    importLoaders: 1,
                    localIdentName: '[name].[local]',  // [name]__[local]--[hash:base64:5] -> name: module name, local: original name
                    modules: true
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader?emitFile=false'
            }
        ]
    }
};
