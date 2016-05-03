'use strict'

const expect = require('chai').expect
const sinon = require('sinon')
const server = require('../')
const products = require('../lib/products')

describe('GET /products/{product_id}', () => {
  before(() => {
    this.getProductStub = sinon.stub(products, 'getProduct')
  })
  after(() => {
    this.getProductStub.restore()
  })
  describe('when requesting without an api key', () => {
    it('should reply 401', (done) => {
      server.inject('/products/42', (res) => {
        expect(res.statusCode).to.equal(401)
        done()
      })
    })
  })
  describe('with an invalid product id', () => {
    it('should return 400', (done) => {
      server.inject('/products/something?api_key=aaa', (res) => {
        expect(res.statusCode).to.equal(400)
        done()
      })
    })
  })
  describe('when product does not exist', () => {
    before(() => {
      this.getProductStub.returns(Promise.resolve(null))
    })
    it('should return 404', (done) => {
      server.inject('/products/42?api_key=aaa', (res) => {
        expect(res.statusCode).to.equal(404)
        done()
      })
    })
    it('should contain the appropriate values', (done) => {
      server.inject('/products/42?api_key=aaa', (res) => {
        expect(res.result).to.have.property('statusCode').and.to.equal(404)
        expect(res.result).to.have.property('error').and.to.equal('Not Found')
        done()
      })
    })
  })
  describe('when product exists', () => {
    before(() => {
      this.getProductStub.returns(Promise.resolve({id: 1}))
    })
    it('should return 200', (done) => {
      server.inject('/products/1?api_key=aaa', (res) => {
        expect(res.statusCode).to.equal(200)
        done()
      })
    })
    it('should contain the appropriate values', (done) => {
      server.inject('/products/1?api_key=aaa', (res) => {
        expect(res.result).to.have.property('id').and.to.equal(1)
        done()
      })
    })
  })
})
