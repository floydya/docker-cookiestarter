import gulp from 'gulp'

import Task from './base'
import { errorPipeWrapper } from './utils'


export default class Copy extends Task {
  dev(done) {
    let c = this.config
    let changed = require('gulp-changed')

    errorPipeWrapper(gulp.src(c.src))
      .pipe(changed(c.dest))
    .pipe(gulp.dest(c.dest))
    .on('end', done)
  }

  build(done) {
    let c = this.config

    gulp.src(c.src)
      .pipe(gulp.dest(c.dest))
    .on('end', done)
  }

  watch(task) {
    let watcher = require('gulp-watch')
    let batch = require('gulp-batch')

    watcher(this.config.glob, batch((events, done) => gulp.start(task, done)))
  }
}
