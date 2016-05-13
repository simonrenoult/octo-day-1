const server = require('../server')
const expect = require('chai').expect

describe('config', () => {
  describe('when providing a custom port', () => {
    it('should start the server on the selected port ', () => {
      expect(server.connections[0].info.port).to.equal(1337)
    })
  })
})
