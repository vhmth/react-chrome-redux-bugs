'use strict';

import path from 'path';
import webpack from 'webpack';

export default {
  entry: {
    content:    './src/js/content.js',
    background: './src/js/background.js'
  },

  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/assets/',
    filename: '[name].js'
  },

  // for WriteFilePlugin
  devServer: {
    outputPath: path.join(__dirname, '../dist'),
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }]
  },

  resolve: {
    root: [path.join(__dirname, "../bower_components")]
  },

  plugins: [
    new webpack.ResolverPlugin(
        new webpack.ResolverPlugin
                   .DirectoryDescriptionFilePlugin('.bower.json', ['main']))
  ]
};
