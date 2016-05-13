'use strict'

const chai = require('chai')

const server = require('../server')
const expect = chai.expect

describe('PATCH /products/{product_id}', () => {
  describe('when product does not exists', () => {
    before((done) => {
      const options = { method: 'PATCH', url: '/products/111?api_key=foo', payload: { name: 'A better mug' }}
      server.inject(options, (response) => {
        this.response = response
        done()
      })
    })
    it('should return 404', () => {
      expect(this.response.statusCode).to.equal(404)
    })
  })
  describe('when product exists', () => {
    before((done) => {
      const options = { method: 'PATCH', url: '/products/1?api_key=foo', payload: { name: 'An even better mug' }}
      server.inject(options, (response) => {
        this.response = response
        done()
      })
    })
    it('should return 200', () => {
      expect(this.response.statusCode).to.equal(200)
    })
    it('should return the updated object', () => {
      const product = JSON.parse(this.response.payload)
      expect(product.name).to.equal('An even better mug')
    })
  })
})
