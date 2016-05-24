const nconf = require('nconf')
const path = require('path')

const env = process.env.NODE_ENV || 'development'
const file = path.join(__dirname, `./${env}.json`)

module.exports = nconf
  .argv()
  .env()
  .file(file)
  .defaults({
    port: 3000
  })
