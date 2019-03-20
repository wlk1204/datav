# datav

## Overview

> An app of datav use electron.

## Install

``` bash
# 安装包依赖
yarn install # or npm

# 开发环境
yarn run dev

# 生产环境
yarn run build

```

## 打包app

[在 electron 目录中执行](https://github.com/wlk1204/datav/blob/master/electron/README.md)

## 注意

electron 打包中使用的是静态 dist 文件, 在执行 yarn run build 时, 需在 webpack.config.js 中修改打包路径:

```
...
output: {
  filename: 'js/[name].[hash:8].js',
  path: path.resolve(__dirname, '../electron/dist'),
  publicPath: './',
}

......

{
  test: /\.(png|svg|jpg|gif)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 10,
        publicPath: '../',
        name: 'images/[name].[hash:8].[ext]',
      },
    },
  ],
}
```