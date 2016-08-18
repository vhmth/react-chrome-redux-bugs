'use strict';

import path from 'path';

import gulp from 'gulp';
import gutil from 'gulp-util';
import runSequence from 'run-sequence';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import WriteFilePlugin from 'write-file-webpack-plugin';

import webpackConfig from './config/webpack.config.js';

gulp.task('default', ['webpack-dev-server', 'extension-watch']);

function _getWebpackConfig() {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  let config = Object.assign({}, webpackConfig);
  config.plugins = (config.plugins || []).concat(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV) // http://stackoverflow.com/a/30835619/696130
      }
    }),
    new WriteFilePlugin()
  );

  switch(process.env.NODE_ENV) {
    case 'development':
      config.devtool = 'sourcemap';
      config.debug = true;
      break;
    default:
      // staging or production
      config.plugins = config.plugins.concat(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
      );
      break;
  }

  return config;
}

gulp.task('webpack-dev-server', (cb) => {
  let config = _getWebpackConfig();
  new WebpackDevServer(webpack(config), {
    contentBase: path.join(__dirname, 'src'),
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }).listen(8080, 'localhost', function(err) {
    if(err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://localhost:8080');
  });
});

gulp.task('extension-watch', ['extension'], (cb) => {
  gulp.watch([
    'dist/content.js',
    'dist/background.js',
    'src/extension/**/*'
  ], ['extension']);
});

gulp.task('extension', (cb) => {
  runSequence('extension-assets', cb);
});

gulp.task('extension-assets', function () {
  return gulp.src(['src/**/*']).pipe(gulp.dest('dist'));
});
