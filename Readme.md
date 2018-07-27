### 开始

`npm install`

**正常打包**

`npm start`

**打开webpack server**

`npm run server`

**production模式**

`npm run pro`
***

### config
**entry 单入口**
```
    entry:__dirname+"/app/main.js"
    //__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
```
**entry 多入口**
```
    entry:{
		entry_name1: __dirname + "/app/main.js",
		entry_name2: __dirname + "/app/entry2.js",
	},
```
**output 单出口**

```
output: {
		path: __dirname + "/public", 
		filename: "bundle.js",
	 //可以指定出口文件名称
	
	},
```

**output 多出口**
```
    output: {
		path: __dirname + "/public", 
		filename: "[name].js",
	},
	//生成对应的entry_name.js
```
**mode**  使用相应模式的内置优化。

`development` 启用 NamedChunksPlugin 和 NamedModulesPlugin

`production` 主要提供代码压缩

**target** 为js的各种不同的环境提供编译功能

`node` node环境

`web` 浏览器环境

**devtool** 开发阶段的选项，打包模式

`source-map`  

`cheap-module-source-map`

`eval-source-map`  中小型项目中选这个

`cheap-module-eval-source-map`

**devServer** webpack-server的配置

```
{
    contentBase: "./public", //本地服务器所加载的页面所在的目录
    historyApiFallback: true, //不跳转
    inline: true, //实时刷新
    hot: true, //配合babel，热加载插件
    port: 9000, //端口改为9000
    host: '192.168.0.103', //如果指定的host，局域网的电脑或手机可以访问该网站,
    open:true, // 自动打开浏览器
    index:'front.html', // 默认打开的首页
}
```



**loader** 使用不同的脚本或工具对不同的文件进行处理

```
rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            }
        ]
```
一些常用的loader：

`sass-loader`:用于处理sass文件

`url-loader`:用于处理图片的引用关系，大图片直接引用，小图片会转成base64文件

`file-loader`: 用于移动文件，打包时会把文件移动到目标路径[webpack介绍](https://www.webpackjs.com/loaders/file-loader/) \ [GitHub]( https://github.com/webpack-contrib/file-loader)

`postcss-loader`:为CSS代码自动添加适应不同浏览器的CSS前缀

**plugins** 增加webpack的功能

使用插件需要提前引入

`const CleanWebpackPlugin = require("clean-webpack-plugin");`

一些常用的plugin

`HtmlWebpackPlugin`:根据一个传入的模板生成打包的文件(index.html)

`webpack.optimize.OccurrenceOrderPlugin`：为组件分配ID，分析和优先考虑使用最多的模块，并为它们分配最小的ID

`ExtractTextPlugin`:抽离css文件，防止打包后引起样式错乱。也可以使用`style-loader`

`CleanWebpackPlugin`:去除build文件中的残余文件,各种id hash之类的

> webpack先执行loader，再运行plugin
