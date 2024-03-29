'use strict'

const expect = require('chai').expect
const server = require('../../')

describe('Server', () => {
  let subject
  it('should reply 404 on /', (done) => {
    server.inject('/', (res) => {
      expect(res.statusCode).to.equal(404)
      done()
    })
  })
})
