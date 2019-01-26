import gulp from 'gulp'

import Task from './base'

export default class ImageMin extends Task {
  build(done) {
    let c = this.config
    let imagemin = require('gulp-imagemin')

    let imageminPngquant = require('imagemin-pngquant')
    let imageminZopfli = require('imagemin-zopfli')
    let imageminMozjpeg = require('imagemin-mozjpeg') //need to install 'libpng'
    let imageminGiflossy = require('imagemin-giflossy')

    gulp.src(`${c.src}**/*.{gif,png,jpg,svg}`)
      .pipe(imagemin([
        //png
        imageminPngquant({
          speed: 1,
          quality: 98 //lossy settings
        }),
        imageminZopfli({
          more: true
        }),
        //gif
        // imagemin.gifsicle({
        //     interlaced: true,
        //     optimizationLevel: 3
        // }),
        //gif very light lossy, use only one of gifsicle or Giflossy
        imageminGiflossy({
          optimizationLevel: 3,
          optimize: 3, //keep-empty: Preserve empty transparent frames
          lossy: 2
        }),
        //svg
        imagemin.svgo({
          plugins: [{
            removeViewBox: false
          }]
        }),
        //jpg lossless
        imagemin.jpegtran({
          progressive: true
        }),
        //jpg very light lossy, use vs jpegtran
        imageminMozjpeg({
          quality: 90
        })
      ], {
          verbose: true
        }))
      .pipe(gulp.dest(c.src))
      .on('end', done)
  }
}
