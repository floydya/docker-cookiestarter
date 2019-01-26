import gulp from 'gulp'

import { P as p, R as r } from '../paths'

import Copy from './tasks/copy'
import Stylus from './tasks/stylus'
import Pug from './tasks/pug'

import SvgFont from './tasks/svgfonts'
import ImageMin from './tasks/imagemin'

let imagemin = new ImageMin({
  src: p.dest.public,
})

let svgfonts = new SvgFont({
  src: `${p.src.public}svg/*.svg`,
  glob: `${p.src.public}**/*.svg`,
  dest: `${p.dest.public}fonts/`,
  styl: `${p.src.stylus}project/`
})

let pub = new Copy({
  src: [`${p.src.public}**/*`, `!${p.src.public}svg/`],
  glob: [`${p.src.public}**/*`, `!${p.src.public}svg/`],
  dest: p.dest.public
})

let stylus = new Stylus({
  src: `${p.src.stylus}style.styl`,
  glob: `${p.src.stylus}**/*.styl`,
  dest: p.dest.stylus
})

let template_src = [
  `${p.src.pug}templates/**/*.pug`,
  `!${p.src.pug}templates/**/_*.pug`,
]
let templates = new Pug({
  src: template_src,
  basedir: `${p.src.pug}templates/`,
  glob: template_src,
  dest: p.dest.pug,
  extension: '.jinja',
})


gulp.task('svgfonts', svgfonts.binded('dev'))
gulp.task('public', pub.binded('dev'))
gulp.task('stylus', stylus.binded('dev'))
gulp.task('templates', templates.binded('dev'))


gulp.task('public:build', pub.binded('build'))
gulp.task('stylus:build', stylus.binded('build'))
gulp.task('templates:build', templates.binded('build'))
gulp.task('imagemin:build', imagemin.binded('build'))

gulp.task('watch', ['svgfonts', 'public', 'stylus', 'templates'], (done) => {
  svgfonts.watch('svgfonts')
  pub.watch('public')
  stylus.watch('stylus')
  templates.watch('templates')
  done()
})

gulp.task('build', [
  'public:build', 'stylus:build', 'templates:build', 'imagemin:build'
])

gulp.task('default', ['watch'])
