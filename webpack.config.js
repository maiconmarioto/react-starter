var webpack = require('webpack');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var WebpackBrowserPlugin = require('webpack-browser-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = function(env) {

  const package = require('./package.json');
  const dependencies = package.dependencies;
  const VENDOR_LIBS = Object.keys(dependencies);

  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';
  const analyzer = env && env.analyze ? true : false;

  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html',
      title: 'Tree-shaking'
    }),
    new webpack.NamedModulesPlugin(),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    new WebpackBrowserPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ];

  if (isProd) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        output: {
          comments: false,
        },
      })
    );
  }

  if (analyzer) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8000,
        reportFilename: 'report.html',
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null,
        logLevel: 'info'
      })
    );
  }

  return {
    entry: {
       bundle: './src/index.js',
       vendor: VENDOR_LIBS
     },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].[hash].js'
    },
    module: {
      rules: [
        {
          use: 'babel-loader',
          test: /.\js$/,
          exclude: /node_modules/
        },
        {
          use: ['style-loader', 'css-loader'],
          test: /\.css$/
        }
      ],
    },
    plugins: plugins,
    devServer: {
      contentBase: './src',
      historyApiFallback: true,
      port: 3000,
      compress: isProd,
      inline: !isProd,
      hot: !isProd,
      stats: {
        assets: true,
        children: false,
        chunks: false,
        hash: false,
        modules: false,
        publicPath: false,
        timings: true,
        version: false,
        warnings: true,
          colors: {
          green: '\u001b[32m',
        }
      },
    },
  }
}

// ================================================================
