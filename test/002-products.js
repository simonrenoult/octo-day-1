'use strict'

const expect = require('chai').expect
const products = require('../lib/products')

describe('products', () => {
  describe('getProducts', () => {
    it('should return a product list', (done) => {
      products.getProducts().then((products) => {
        expect(products).to.have.length(3)
        done()
      }).catch(done)
    })
    it('should return a promise', () => {
      expect(products.getProducts()).to.be.a('Promise')
    })
  })
})
