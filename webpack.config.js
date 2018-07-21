const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = {
	title: 'hello,零和壹在线课堂', // html5文件中<title>部分
	filename: 'front.html', // 默认是index.html，服务器中设置的首页是index.html，如果这里改成其它名字，那么devServer.index改为和它一样
	template: __dirname + '/app/index.tmpl.html', // 如果觉得插件默认生成的hmtl5文件不合要求，可以指定一个模板，模板文件如果不存在，会报错，默认是在项目根目录下找模板文件，才模板为样板，将打包的js文件注入到body结尾处
	inject: 'body', // true|body|head|false，四种值，默认为true,true和body相同,是将js注入到body结束标签前,head将打包的js文件放在head结束前,false是不注入，这时得要手工在html中加js
	meta: {
		viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
	},
	hash: true, //调用时生成唯一的hash编码，用于清除。。。
}


module.exports = {
	mode: 'development',
	devtool: 'eval-source-map',
	entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
	output: {
		path: __dirname + "/build", //打包后的文件存放的地方
		filename: "[name].bundle.js", //打包后输出文件的文件名
		// publicPath: "http://cdn.example.com/[hash:]/"
	},
	devServer: {
		contentBase: "./public", //本地服务器所加载的页面所在的目录
		historyApiFallback: true, //不跳转
		inline: true, //实时刷新
		hot: true, //配合babel，热加载插件
		// port: 9000, //端口改为9000
		// host: '192.168.0.103', //如果指定的host，局域网的电脑或手机可以访问该网站,
		// open:true, // 自动打开浏览器
		// index:'front.html', // 默认打开的首页
	},

	module: {
		rules: [{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: "babel-loader",

				},
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [{
					loader: "style-loader",
				}, {
					loader: "css-loader",
					options: {
						modules: true, // 指定启用css modules
						// localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
					}
				}, {
					loader: "postcss-loader" //postcss-loader为CSS代码自动添加适应不同浏览器的CSS前缀
				}],
				exclude: /node_modules/
			},
			// {
			// 	test: /\.(png|jpg|gif)$/,
			// 	use: [{
			// 		loader: 'file-loader',
			// 		options: {
			// 			name:'[path][name].[ext]',//[ext][name][path][hash][N]
			// 			outputPath:'',// 输出目录
			// 			publicPath:'',//发布目录
			// 		}
			// 	}]
			// },
			// {
			// 	test: /\.html$/,
			// 	use: [{
			// 		loader: 'html-loader',
			// 		options: {
			// 			minimize: true,
			// 			removeComments: false,
			// 			collapseWhitespace: false
			// 		}
			// 	}, ]
			// }


		]

	},
	plugins: [
		new webpack.BannerPlugin('版权所有，翻版必究'),
		// new HtmlWebpackPlugin({
		//     template: __dirname + "/app/index.tmpl.html"//根据模板生成html
		// }),
		new HtmlWebpackPlugin(HtmlWebpackPluginConfig),
		new webpack.HotModuleReplacementPlugin() //热加载插件
	],

	optimization: {
		// 压缩js代码
		minimize: true
	},


}