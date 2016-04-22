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
  describe('getProduct', () => {
    describe('when the product exist', () => {
      it('should be returned', (done) => {
        products.getProduct(1).then((product) => {
          expect(product).to.exist
          expect(product.id).to.equal(1)
          done()
        }).catch(done)
      })
    })
    describe('when the product does not exsit', () => {
      it('should return null', (done) => {
        products.getProduct(42).then((product) => {
          expect(product).to.be.null
          done()
        }).catch(done)
      })
    })
  })
})
