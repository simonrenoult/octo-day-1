const hapi = require('hapi')
const server = new hapi.Server()

server.connection({ port: 3000 })

module.exports = server
