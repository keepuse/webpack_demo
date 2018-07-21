const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
	mode: 'production',
	entry: __dirname + "/app/main.js", //唯一入口
	output: {
		path: __dirname + "/build",
		filename: "bundle-[name].js" //[name], [id] and [hash]
	},
	devtool: 'null', //压缩打包代码
	devServer: {
		contentBase: "./public", //本地服务器所加载的页面所在的目录
		historyApiFallback: true, //不跳转
		inline: true,
		hot: true
	},
	module: {
		rules: [{
			test: /(\.jsx|\.js)$/,
			use: {
				loader: "babel-loader"
			},
			exclude: /node_modules/
		}, {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: [{
					loader: "css-loader",
					options: {
						modules: true
					}
				}, {
					loader: "postcss-loader"
				}],
			})
		}]
	},
	plugins: [
		new webpack.BannerPlugin('版权所有，翻版必究'),
		new HtmlWebpackPlugin({
			template: __dirname + "/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
		}),
		
		new webpack.optimize.OccurrenceOrderPlugin(),//为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
       
		new ExtractTextPlugin("style.css"),//分离CSS和JS文件 需要更新4.0版本
		new CleanWebpackPlugin('build/*.*', {    //去除build文件中的残余文件,各种id hash之类的
			root: __dirname,
			verbose: true,
			dry: false
		})

	],
	
};