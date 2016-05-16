'use strict'

const chai = require('chai')
const chaiThings = require('chai-things')

const server = require('../server')
const expect = chai.expect

chai.use(chaiThings)

describe('GET /products?fields=id,name', () => {
  before((done) => {
    server.inject('/products?api_key=foo&fields=id,name', (response) => {
      this.response = response
      this.products = JSON.parse(this.response.payload)
      done()
    })
  })
  it('should return 200', () => {
    expect(this.response.statusCode).to.equal(200)
  })
  it('should contain an id', () => {
    expect(this.products).to.all.have.property('id')
  })
  it('should contain a name', () => {
    expect(this.products).to.all.have.property('name')
  })
  it('should exclude tags', () => {
    expect(this.products).not.to.all.have.property('tags')
  })
})
