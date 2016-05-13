const hapi = require('hapi')
const boom = require('boom')
const env = process.env.NODE_ENV || 'development'

const logger = require('./lib/logger')
const routes = require('./lib/routes')
const config = require(`./config/${env}`)

const server = new hapi.Server({connections: {routes: {cors: true}}})
server.connection({ port: config.port })
server.route([
  routes.listProducts,
  routes.getProduct,
  routes.createProduct,
  routes.updateOrCreateProduct,
  routes.patchProduct
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
