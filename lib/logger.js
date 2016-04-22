const bunyan = require('bunyan')
const package = require('../package')
const blackhole = require('stream-blackhole')

module.exports = bunyan.createLogger({
  name: package.name,
  stream: blackhole()
})
