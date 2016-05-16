'use strict'

const chai = require('chai')

const server = require('../server')
const expect = chai.expect

describe('POST /products', () => {
  before((done) => {
    const options = { method: 'POST', url: '/products?api_key=foo' }
    server.inject(options, (response) => {
      this.response = response
      done()
    })
  })

  it('should return 201', () => {
    expect(this.response.statusCode).to.equal(201)
  })
  it('should return the location of the new product', () => {
    expect(this.response.headers.location).to.exist
  })

  describe('when a name is provided', () => {
    before((done) => {
      const options = { method: 'POST', url: '/products?api_key=foo', payload: { name: 'A fake mug' } }
      server.inject(options, (response) => {
        this.response = response
        done()
      })
    })
    it('should set the name to the provided value', (done) => {
      const location = this.response.headers.location
      server.inject(`${location}?api_key=foo`, (response) => {
        const product = JSON.parse(response.payload)
        expect(product.name).to.equal('A fake mug')
        done()
      })
    })
  })
  describe('when a name is not provided', () => {
    before((done) => {
      const options = { method: 'POST', url: '/products?api_key=foo' }
      server.inject(options, (response) => {
        this.response = response
        done()
      })
    })
    it('should set the name to "Untitled"', (done) => {
      const location = this.response.headers.location
      server.inject(`${location}?api_key=foo`, (response) => {
        const product = JSON.parse(response.payload)
        expect(product.name).to.equal('Untitled')
        done()
      })
    })
  })
})
