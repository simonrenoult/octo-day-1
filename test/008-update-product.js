'use strict'

const chai = require('chai')

const server = require('../server')
const expect = chai.expect

describe('PUT /products/{product_id}', () => {
  describe('when product exists', () => {
    before((done) => {
      const options = { method: 'PUT', url: '/products/1?api_key=foo', payload: { id: 1, name: 'A better mug' }}
      server.inject(options, (response) => {
        this.response = response
        done()
      })
    })
    it('should return 200', () => {
      expect(this.response.statusCode).to.equal(200)
    })
    it('should return the updated product', () => {
      expect(JSON.parse(this.response.payload)).to.deep.equal({ id: 1, name: 'A better mug' })
    })
  })
  describe('when the product does not exist', () => {
    before((done) => {
      const options = { method: 'PUT', url: '/products/999999?api_key=foo', payload: { id: 999999, name: 'A better mug' }}
      server.inject(options, (response) => {
        this.response = response
        done()
      })
    })
    it('should return 201', () => {
      expect(this.response.statusCode).to.equal(201)
    })
    it('should return the updated product', () => {
      expect(JSON.parse(this.response.payload)).to.deep.equal({ id: 999999, name: 'A better mug' })
    })
  })
  describe('when the product id and the payload id are not the same', () => {
    before((done) => {
      const options = { method: 'PUT', url: '/products/666?api_key=foo', payload: { id: 999999, name: 'A better mug' }}
      server.inject(options, (response) => {
        this.response = response
        done()
      })
    })
    it('should return 400', () => {
      expect(this.response.statusCode).to.equal(400)
    })
    it('should return a message', () => {
      expect(JSON.parse(this.response.payload).message).to.equal('Asking to update resource with id 666 while payload id is 999999')
    })
  })
})
