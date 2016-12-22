"use strict";

var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

module.exports = {
	entry: [
		'react-hot-loader/patch',
		'./src/index.jsx' // your app's entry point
	],
	devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
	output: {
		publicPath: '/',
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
			    // Transform all ES6 files to plain old ES5.
			    test: /\.jsx?$/,
			    exclude: /(bower_components|node_modules)/,
			    loaders: ['babel']
			},
			{
				// Load .css files.
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader?sourceMap', 'css-loader')
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loaders: ["style-loader", "css-loader", "sass-loader"]
			},
			{
			    // Load images.
			    test: /\.(gif|jpe?g|png|svg)$/,
			    loaders: ['url-loader?limit=25000']
			},
			{
			    // Load fonts with optional version numbers.
			    test: /\.(eot|svg|ttf|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			    loaders: ['file-loader']
			}
		]
	},
	devServer: {
		contentBase: "./public",
		// do not print bundle build stats
		noInfo: true,
		// enable HMR
		hot: true,
		// embed the webpack-dev-server runtime into the bundle
		inline: true,
		// serve index.html in place of 404 responses to allow HTML5 history
		historyApiFallback: true,
		port: PORT,
		host: HOST
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new ExtractTextPlugin("styles.css"),
		new webpack.ProvidePlugin({
            jQuery: 'jquery'
        })
	]
};
