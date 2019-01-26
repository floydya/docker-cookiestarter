import gulp from 'gulp'

import Task from './base'
import { errorPipeWrapper } from './utils'

export default class SvgFont extends Task {
  dev(done) {
    let c = this.config
    let iconfont = require('gulp-iconfont')
    let changed = require('gulp-changed')
    let consolidate = require('gulp-consolidate')
    let rename = require('gulp-rename')
    let fontName = 'svgfont'
    return gulp.src(c.src)
      .pipe(iconfont({
        fontName: fontName,
        prependUnicode: true,
        formats: ['ttf', 'eot', 'woff', 'woff2'],
        normalize: true,
        fontHeight: 1001,
        fontStyle: 'normal',
        fontWeight: 'normal'
      }))
      .on('glyphs', function (glyphs, options) {
        console.log(glyphs);
        gulp.src(__dirname + '/_svgfont.styl')
          .pipe(consolidate('lodash', {
            glyphs: glyphs,
            fontName: fontName,
            fontPath: 'fonts/',
            className: 'icon'
          }))
          .pipe(gulp.dest(c.styl))
      })
      .pipe(gulp.dest(c.dest))
  }

  watch(task) {
    let watcher = require('gulp-watch')
    let batch = require('gulp-batch')
    watcher(this.config.glob, batch((events, done) => gulp.start(task, done)))
  }

}
