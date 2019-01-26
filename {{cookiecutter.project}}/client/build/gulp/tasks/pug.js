import gulp from 'gulp'

import Task from './base'
import { errorPipeWrapper } from './utils'

const pugLintConfig = require('../../../.pug-lintrc.js')

export default class Pug extends Task {
  dev(done) {
    let c = this.config
    let pug              = require('gulp-pug')
    let pugCompiler      = require('pug')
    let changed          = require('gulp-changed')
    let rename           = require('gulp-rename')
    let puglint          = require('gulp-pug-lint')

    errorPipeWrapper(gulp.src(c.src))
      .pipe(changed(c.basedir, {
        extension: c.extension,
        dest: c.dest
      }))
      .pipe(puglint(pugLintConfig))
      .pipe(pug({
        pretty: true,
        debug: false,
        doctype: 'html',
        pug: pugCompiler,
        basedir: c.basedir,
      }))
      .pipe(rename({
        extname: c.extension,
      }))
    .pipe(gulp.dest(c.dest))
    .on('end', done)
  }

  build(done) {
    let c = this.config
    let pug              = require('gulp-pug')
    let pugCompiler      = require('pug')
    let rename           = require('gulp-rename')
    let puglint          = require('gulp-pug-lint')

    gulp.src(c.src)
      .pipe(puglint(pugLintConfig))
      .pipe(pug({
        pretty: false,
        debug: false,
        doctype: 'html',
        pug: pugCompiler,
        basedir: c.basedir,
      }))
      .pipe(rename({
        extname: c.extension,
      }))
    .pipe(gulp.dest(c.dest))
    .on('end', done)
  }

  watch(task) {
    let watcher = require('gulp-watch')
    let batch = require('gulp-batch')

    watcher(this.config.glob, batch((events, done) => gulp.start(task, done)))
  }
}
