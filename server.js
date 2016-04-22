const hapi = require('hapi')
const server = new hapi.Server()
const logger = require('./lib/logger')
const routes = require('./lib/routes')

server.connection({ port: 3000 })
server.route([
  routes.listProducts,
  routes.getProduct
])

server.register([
  require('hapi-swagger'),
  require('inert'),
  require('vision'),
  {
    register: require('hapi-bunyan'),
    options: { logger }
  }
])

module.exports = server
