export default class Task {
  constructor(config) {
    this.config = config
  }

  binded(func) {
    return this[func].bind(this)
  }
}
