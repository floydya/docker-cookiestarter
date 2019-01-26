'use strict'
require('babel-register')({})

const merge = require('lodash.merge')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BabelMinifyPlugin = require('babel-minify-webpack-plugin')

const p = require('../paths')
const dev = require('./dev.js')
const utils = require('./utils.js')

const config = merge(dev, {
  watch: false,
  devtool: false,

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),

    // Set the production environment
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
  ].concat(
    dev.plugins,
    [
      // Minify babel output
      new BabelMinifyPlugin({
        mangle: { topLevel: true }
      }),

      // enable scope hoisting
      new webpack.optimize.ModuleConcatenationPlugin(),

      // extract webpack runtime and module manifest to its own file in order to
      // prevent vendor hash from being updated whenever app bundle is updated
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity
      }),

      // Minify with dead-code elimination
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        sourceMap: false,

        uglifyOptions: {
          compress: {
            drop_console: true,
            hoist_props: true,
            keep_infinity: true,
            passes: 3,
          }
        }
      }),

      new webpack.BannerPlugin({
        banner: utils.banner,
        raw: true,
        entryOnly: true
      })
    ])
})

if (process.env.ANALYZE) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

  config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = config