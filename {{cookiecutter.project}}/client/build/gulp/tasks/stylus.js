import gulp from 'gulp'
import * as fs from 'fs'

import Task from './base'
import { errorPipeWrapper } from './utils'


const stylintConfig = JSON.parse(fs.readFileSync('.stylintrc', 'utf8'))
const stylusConfig = require('../../config/stylus').config
const postcssConfig = require('../../config/postcss').config
const cssoConfig = {
  restructure: true,
  sourceMap: false,
  debug: false,
  usage: {
    blacklist: {}
  }
}

export default class Stylus extends Task {
  dev(done) {
    let c = this.config
    let stylus         = require('gulp-stylus')
    let sourcemaps     = require('gulp-sourcemaps')
    let postcss        = require('gulp-postcss')

    return errorPipeWrapper(gulp.src(c.src))
      .pipe(sourcemaps.init())
        .pipe(stylus(c.stylus || stylusConfig))
        .pipe(postcss(c.postcss || postcssConfig))
      .pipe(sourcemaps.write())
    .pipe(gulp.dest(c.dest))
  }

  build(done) {
    let c = this.config
    let stylus         = require('gulp-stylus')
    let postcss        = require('gulp-postcss')
    let csso           = require('gulp-csso')
    let stylint        = require('gulp-stylint')

    return gulp.src(c.src)
      .pipe(stylint({
        rules: c.stylint || stylintConfig,
        reporter: {
          reporter: 'stylint-stylish',
          reporterOptions: {
            verbose: true
          }
        }
      }))
      .pipe(stylint.reporter())
      .pipe(stylus(stylusConfig))
      .pipe(postcss(postcssConfig))
      .pipe(csso(c.csso || cssoConfig))
    .pipe(gulp.dest(c.dest))
  }

  watch(task) {
    let watcher = require('gulp-watch')
    let batch = require('gulp-batch')

    watcher(this.config.glob, batch((events, done) => gulp.start(task, done)))
  }
}
