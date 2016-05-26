var path              = require('path');
var pkg               = require('./package.json');
var webpack           = require('webpack');
var HtmlPlugin        = require('html-webpack-plugin');
var CleanPlugin       = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var TARGET      = process.env.npm_lifecycle_event;
var ROOT        = path.resolve(__dirname);


// Development

if (TARGET === 'start' || !TARGET) {

  module.exports = {

    devtool: 'eval-source-map',

    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    },

    resolve: {
      extensions: ['', '.js', '.jsx', '.css']
    },

    entry: [
      'webpack-hot-middleware/client',
      path.resolve(ROOT, 'app'),
    ],

    output: {
      path: path.resolve(ROOT, 'build'),
      publicPath: '/',
      filename: 'bundle.js'
    },

    module: {
      preLoaders: [
        {
          test: /\.css$/,
          loader: 'csslint',
          include: path.resolve(ROOT, 'app')
        }, {
          test: /\.jsx?$/,
          loader: 'eslint',
          include: path.resolve(ROOT, 'app')
        }
      ],
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css'],
          include: path.resolve(ROOT, 'app')
        }, {
          test: /\.jsx?$/,
          loader: 'babel',
          include: path.resolve(ROOT, 'app'),
          query: {
            cacheDirectory: true,
            presets: ['react', 'react-hmre', 'es2015'],
            plugins: ['transform-object-rest-spread']
          }
        }
      ]
    },

    plugins: [
      new HtmlPlugin({
        title: 'React App',
        inject: 'body',
        template: path.resolve(ROOT, 'app/templates/index.html')
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({ 'DEBUG': true })
    ]
  };


// Production

} else {

  module.exports = {

    devtool: 'cheap-module-eval-source-map',

    entry: {
      app: path.resolve(ROOT, 'app'),
      vendor: Object.keys(pkg.dependencies)
    },

    resolve: {
      extensions: ['', '.js', '.jsx', '.css']
    },

    output: {
      path: path.resolve(ROOT, 'dist'),
      filename: '[name].js?[chunkhash]'
    },

    module: {
      preLoaders: [
        {
          test: /\.css$/,
          loader: 'csslint',
          include: path.resolve(ROOT, 'app')
        }, {
          test: /\.jsx?$/,
          loader: 'eslint',
          include: path.resolve(ROOT, 'app')
        }
      ],
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
          include: path.resolve(ROOT, 'app')
        }, {
          test: /\.jsx?$/,
          loader: 'babel',
          include: path.resolve(ROOT, 'app'),
          query: {
            presets: ['react', 'es2015'],
            plugins: ['transform-object-rest-spread']
          }
        }
      ]
    },

    plugins: [
      new HtmlPlugin({
        title: 'React App',
        inject: 'body',
        template: path.resolve(ROOT, 'app/templates/index.html')
      }),
      new CleanPlugin(['build']),
      new ExtractTextPlugin('styles.css?[chunkhash]'),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin(
        'vendor', '[name].js?[chunkhash]'
      ),
      new webpack.DefinePlugin({
        'process.env'  : { 'NODE_ENV': JSON.stringify('production') }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  };

};
