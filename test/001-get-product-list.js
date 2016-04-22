'use strict'

const expect = require('chai').expect
const server = require('../')

describe('GET /products', () => {
  it('should return 200', (done) => {
    server.inject('/products', (res) => {
      expect(res.statusCode).to.equal(200)
      done()
    })
  })

  it('should return a product list', (done) => {
    server.inject('/products', (res) => {
      expect(res.result).to.have.length(3)
      done()
    })
  })
})
