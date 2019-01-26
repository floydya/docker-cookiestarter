'use strict'
require('babel-register')({})

const merge = require('lodash.merge')
const p = require('../paths')
const base = require('./base.js')
const utils = require('./utils.js')

const config = merge(base, {
  watch: true,
  devtool: '#source-map',

  entry: {
    'vendor': `${p.P.src.js}vendor.js`,
    'main': [
      `${p.P.src.js}main.js`
    ],
  },

  output: {
    path: utils.resolve(p.P.dest.js),
    publicPath: p.P.dest.js,
    filename: '[name].js',
    chunkFilename: '[id]-[name].chunk.js'
  }
})

module.exports = config