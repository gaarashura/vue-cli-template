var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js',
    vendor:['vue','vue-resource','babel-polyfill']
  },
  output: {
    path: config.build.assetsRoot, //导出目录的绝对路径
    filename: '[name].js',//导出文件的文件名
    publicPath: process.env.NODE_ENV === 'production'//生产模式或开发模式下html、js等文件内部引用的公共路径
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
    chunkFilename:'[name].js'//非入口文件打包文件名
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],//自动解析确定的拓展名,使导入模块时不带拓展名
    alias: {// 创建import或require的别名
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,// vue文件后缀
        loader: 'vue-loader',//使用vue-loader处理
        options: vueLoaderConfig//options是对vue-loader做的额外选项配置
      },
      {
        test: /\.js$/,// js文件后缀
        loader: 'babel-loader',//使用babel-loader处理
        include: [resolve('src'), resolve('test')]//必须处理包含src和test文件夹
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,//图片后缀
        loader: 'url-loader',//使用url-loader处理
        options: {// query是对loader做额外的选项配置
          limit: 10000,//图片小于10000字节时以base64的方式引用
          name: utils.assetsPath('img/[name].[hash:7].[ext]')//文件名为name.7位hash值.拓展名
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,//视频文件
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|//使用url-loader处理otf)(\?.*)?$/,//字体文件
        loader: 'url-loader',
        options: {
          limit: 10000,//字体文件小于1000字节的时候处理方式
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')//文件名为name.7位hash值.拓展名
        }
      }
    ]
  }
}
//注: 关于query 仅由于兼容性原因而存在。请使用 options 代替。
