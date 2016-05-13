const chai = require('chai')
const server = require('../server')

const expect = chai.expect

describe('cors', () => {
  it('should be enabled', () => {
    expect(server._settings.connections.routes.cors).to.exist
  })
})
