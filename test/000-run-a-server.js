'use strict'

const expect = require('chai').expect
const server = require('../')

describe('the server', () => {
  let subject
  it('should reply 404 on /', (done) => {
    server.inject('/', (res) => {
      expect(res.statusCode).to.equal(404)
      done()
    })
  })
})
