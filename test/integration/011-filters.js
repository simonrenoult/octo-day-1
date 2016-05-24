'use strict'

const chai = require('chai')
const chaiThings = require('chai-things')

const server = require('../../server')
const expect = chai.expect

chai.use(chaiThings)

describe('GET /products?size=medium', () => {
  before((done) => {
    server.inject('/products?api_key=foo&size=medium', (response) => {
      this.response = response
      this.products = JSON.parse(this.response.payload)
      done()
    })
  })
  it('should return 200', () => {
    expect(this.response.statusCode).to.equal(200)
  })
  it('should return elements with size "medium"', () => {
    expect(this.products).to.all.have.property('size', 'medium')
  })
})
