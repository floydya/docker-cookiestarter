var PugLint = require('pug-lint')
var loaderUtils = require('loader-utils')

function lint(source, webpackConfig, queryConfig, webpack, callback) {
  try {
    var linter = new PugLint()
    linter.configure(queryConfig)

    var errors = linter.checkFile(source)

    if (errors.length) {
      result = [errors.length + ' issues found in ' + source].concat(
        errors.map(function(x) { return x.message })
      )
      message = '\n' + result.join('\n\n')
      this.resetOnChange()

      if (!this.state.quiet) {
        webpack.emitError(message)
      } else {
        throw new Error(
          'Module failed because of a puglint error.\n' +
          message
        )
      }
    }
  } catch (errLint) {
    return callback(errLint)
  }

  if (callback) {
    callback(null, source)
  }
}

module.exports = function(source) {
  var webpackConfig = this.options.puglint || {}
  var queryConfig = this.query ? loaderUtils.parseQuery(this.query) : null
  var callback = this.async()

  if (this.cacheable) {
    this.cacheable()
  }

  if (!callback) {
    lint(source, webpackConfig, queryConfig, this)
    return source
  }

  try {
    lint(source, webpackConfig, queryConfig, this, callback)
  } catch (error) {
    callback(error)
  }
}
