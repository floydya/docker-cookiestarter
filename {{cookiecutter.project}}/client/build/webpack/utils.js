const path = require('path')
const p = require('../../package.json')

module.exports.banner =
  '/*!\n' +
  ' * ' + p.name + ' v' + p.version +
  (p.repository
    ? ' (' + (p.repository.url || p.repository) + ')\n'
    : '\n'
  ) +
  ' * (c) ' + new Date().getFullYear() + ' ' + p.author + '\n' +
  ' * Released under the Creative Attribution-NonCommercial-NoDerivatives 4.0 International License.\n' +
  ' */'

module.exports.resolve = x => path.normalize(path.join(__dirname, '..', '..', x))

module.exports.isProduction = process.env.NODE_ENV === 'production'