import path from 'path'
import notifier from 'node-notifier'
import gutil from 'gulp-util'

export const errorHandler = function (err) {
  err.firstLine = err.message.split('\n')[0]

  if(!err.filename) {
    err.filename = err.firstLine.replace(/\:[0-9]+$/img, '')
  }

  if(!err.line) {
    if(!err.lineno) {
      err.line = err.firstLine.replace(/(.*)(\:([0-9]+))$/img, '$3')
    } else {
      err.line = err.lineno
    }
  }

  var pathName = err.filename.replace(__dirname, '')
  var errorPosition = `${err.line}: ${err.column || ''}::`
  var extName = path.extname(pathName)

  // Notification
  notifier.notify({
    title: `${extName.slice(1)} (${err.plugin}) error:`,
    message: `${errorPosition} ${pathName} \n ${err.message}`,
    sound: true,
  })

  // Log to console
  gutil.log(gutil.colors.red('Error'), err.message)

  try {
    this.emit('end')
  } catch(e) {}
}

export const errorPipeWrapper = function (pipe) {
  let plumber = require('gulp-plumber')

  return pipe.pipe(plumber({
    errorHandler: errorHandler,
  }))
}
