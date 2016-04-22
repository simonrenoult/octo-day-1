const hapi = require('hapi')
const products = require('./lib/products')
const server = new hapi.Server()

server.connection({ port: 3000 })
server.route({
  method: 'GET',
  path: '/products',
  handler: (request, reply) => {
    reply(products.getProducts())
  }
})

module.exports = server
