'use strict'

const expect = require('chai').expect
const server = require('../')

describe('GET /products/{product_id}', () => {
  it('should return 501', (done) => {
    server.inject('/products/42', (res) => {
      expect(res.statusCode).to.equal(501)
      done()
    })
  })
  it('should contain the appropriate values', (done) => {
    server.inject('/products/42', (res) => {
      expect(res.result).to.have.property('statusCode').and.to.equal(501)
      expect(res.result).to.have.property('error').and.to.equal('Not Implemented')
      done()
    })
  })
})
