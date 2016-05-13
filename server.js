const hapi = require('hapi')
const boom = require('boom')

const logger = require('./lib/logger')
const routes = require('./lib/routes')

const server = new hapi.Server({connections: {routes: {cors: true}}})
server.connection({ port: 3000 })
server.route([
  routes.listProducts,
  routes.getProduct,
  routes.createProduct
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

server.ext('onPreAuth', (request, reply) => {
  if (!request.path.match(/^\/products/)) return reply.continue()
  if (!request.query.api_key) return reply(boom.unauthorized('You must provide an api_key'))
  else return reply.continue()
})

module.exports = server
