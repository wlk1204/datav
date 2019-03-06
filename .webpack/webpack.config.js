const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pxtoviewport = require('postcss-px-to-viewport');
const autoprefixer = require('autoprefixer');

const devMode = process.env.NODE_ENV === 'development';

const POSTCSS = [
  autoprefixer({
    browsers: ['last 2 versions'],
  }),
  pxtoviewport({
    viewportWidth: 1920,
    viewportHeight: 1080,
    unitPrecision: 5,
    viewportUnit: 'vw',
    selectorBlackList: [],
    minPixelValue: 1,
    mediaQuery: false,
  }),
];

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/client/app.js'),
  },
  output: {
    filename: 'js/[name].[hash:8].js',
    path: path.resolve(__dirname, '../electron/dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.es6|js|jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader?cacheDirectory=true'], // true is in node_modules
      },
      {
        test: /\.css$/,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/,
        exclude: path.join(__dirname, '../node_modules'),
        use: [{
          loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]__[hash:base64:5]',
          },
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: loader => POSTCSS,
          },
        }, {
          loader: 'less-loader',
          options: {
            strictMath: true,
            noIeCompat: true,
            modules: true,
          },
        }],
      },
      {
        test: /\.styl$/,
        exclude: path.join(__dirname, '../node_modules'),
        use: [{
          loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
          options: {
            strictMath: true,
            noIeCompat: true,
            modules: true,
          },
        }],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10,
              publicPath: './',
              name: 'images/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10,
            mimetype: 'application/font-wof',
          },
        },
      },
      {
        test: /\.(eot|ttf|otf|ttc)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: './',
            name: 'fonts/[name].[hash:8].[ext]',
          },
        },
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader',
        ],
      },
    ],
  },
  devServer: {
    disableHostCheck: true,
    contentBase: '../dist',
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true, // 没有此项,BrowserRouter错误
    hot: true,
    port: 8888,
  },
};

const plugins = [];

if (devMode) {
  module.exports.mode = 'development';
  module.exports.devtool = 'inline-source-map';
  module.exports.plugins = plugins.concat([
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/client/index.html'),
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: '[id].[hash:8].css', // attention no css/
    })
  ]);
} else {
  module.exports.mode = 'production';
  module.exports.plugins = plugins.concat([
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/client/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: '[id].[hash:8].css', // attention no css/
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      // 'process.env.ELECTRON_ENV': JSON.stringify('production'),
    })
  ]);
}