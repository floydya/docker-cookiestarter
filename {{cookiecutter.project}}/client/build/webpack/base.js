'use strict'
require('babel-register')({})

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin

import { WebpackErrorLogger }  from './plugins/error-log'

const p = require('../paths')
const utils = require('./utils.js')

const resolve = utils.resolve
const cssExtractor = new ExtractTextPlugin({
  filename: '[name].js.css',
  allChunks: true,
})

module.exports = {
  resolveLoader: {
    alias: {
      'puglint-loader': path.join(__dirname, './loaders/puglint'),
    },
  },

  resolve: {
    modules: [
      resolve(p.P.src.js),
      resolve('node_modules')
    ],

    cachePredicate: function() { return true },

    alias: {
      src: resolve(p.P.src.js),
      // directives: 'src/directives',
      // helpers: 'src/helpers',
      // mixins: 'src/mixins',
      // styles: 'src/styles',
      vue$: 'vue/dist/vue.esm.js'
    },

    extensions: ['.js', '.vue', '.json']
  },

  module: {
    rules: [
      {
        test: /\.(js|vue|es6)$/i,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: [resolve('node_modules')],
        options: {
          formatter: require('eslint/lib/formatters/codeframe')
        }
      },
      {
        test: /\.styl$/i,
        loader: 'stylint-loader',
        enforce: 'pre',
        exclude: [resolve('node_modules')],
        options: JSON.parse(fs.readFileSync('.stylintrc', 'utf8')),
      },
      {
        test: /\.pug$/i,
        loader: 'puglint-loader',
        enforce: 'pre',
        exclude: [resolve('node_modules')],
        options: require('../../.pug-lintrc.js'),
      },
      { test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/i, loader: 'file' },
      {
        test: /\.css$/i,
        loader: cssExtractor.extract({
          use: 'css-loader!postcss-loader'
        }),
      },
      {
        test: /\.styl$/i,
        loader: cssExtractor.extract({
          use: 'css-loader!postcss-loader!stylus-loader',
        }),
      },
      {
        test: /\.js$/i,
        loader: 'babel-loader',
        exclude: [
          resolve('node_modules/vue'),
          resolve('node_modules/lodash.merge'),
        ],
        options: JSON.parse(fs.readFileSync('.babelrc', 'utf8')),
      },
      {
        test: /\.pug$/i,
        loader: 'pug',
        options: {
          basedir: p.P.src.pug
        }
      },
      {
        test: /\.vue$/i,
        loader: 'vue-loader',
        options: {
          loaders: {
            styl: cssExtractor.extract({
              use: 'css-loader!postcss-loader!stylus-loader',
              fallback: 'vue-style-loader'
            }),

            css: cssExtractor.extract({
              use: 'css-loader!postcss-loader',
              fallback: 'vue-style-loader'
            })
          }
        }
      },
      { test: /\.json$/i, loader: 'json' },
    ]
  },

  // Stats is used to customize Webpack's console output
  // https://webpack.js.org/configuration/stats/
  stats: {
    hash: false,
    colors: true,
    chunks: false,
    version: false,
    children: false,
    timings: true
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: { plugins: require('../config/postcss').config },
        stylus: require('../config/stylus').config,
      }
    }),

    cssExtractor,

    new CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: Infinity
    }),

    new WebpackNotifierPlugin({title: 'Webpack', alwaysNotify: false}),

    new WebpackErrorLogger({alwaysNotify: true}),
  ],
}