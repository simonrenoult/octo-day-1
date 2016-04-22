const hapi = require('hapi')
const products = require('./lib/products')
const server = new hapi.Server()
const logger = require('./lib/logger')

server.connection({ port: 3000 })
server.route({
  method: 'GET',
  path: '/products',
  handler: (request, reply) => {
    reply(products.getProducts())
  }
})

server.register({
  register: require('hapi-bunyan'),
  options: { logger }
})

module.exports = server
