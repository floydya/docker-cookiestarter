const chalk = require('chalk')
const WebpackNotifierPlugin = require('webpack-notifier')

export class WebpackErrorLogger extends WebpackNotifierPlugin {
  compileMessage = function(stats) {
    if (this.isFirstBuild) {
      this.isFirstBuild = false

      if (this.options.skipFirstNotification) {
        return
      }
    }

    var error
    if (stats.hasErrors()) {
      error = stats.compilation.errors[0]
    } else if (stats.hasWarnings() && !this.options.excludeWarnings) {
      error = stats.compilation.warnings[0]
    } else if (!this.lastBuildSucceeded || this.options.alwaysNotify) {
      this.lastBuildSucceeded = true
      return chalk.green('Build successful')
    } else {
      return
    }

    this.lastBuildSucceeded = false

    var message
    if (error.module && error.module.rawRequest)
      message = error.module.rawRequest + '\n'

    if (error.error)
      message = chalk.red('ERROR: ') + message + error.error.toString()
    else if (error.warning)
      message = chalk.yellow('WARNING: ') + message + error.warning.toString()
    else if (error.message) {
      message = chalk.yellow('WARNING: ') + message + error.message.toString()
    }

    return message
  }
  compilationDone(stats) {
    let msg = this.compileMessage(stats)

    if (msg) {
      console.log(`\n${msg}`)
    }
  }
}