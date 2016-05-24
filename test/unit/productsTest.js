'use strict'

const expect = require('chai').expect
const Products = require('../../lib/products')

describe('Products', () => {
  describe('.getProducts', () => {
    it('should return a product list', (done) => {
      Products.getProducts().then((products) => {
        expect(products).to.have.length(3)
        done()
      }).catch(done)
    })
    it('should return a promise', () => {
      expect(Products.getProducts()).to.be.a('Promise')
    })
  })
  describe('.getProduct', () => {
    describe('when the product exist', () => {
      it('should be returned', (done) => {
        Products.getProduct(1).then((product) => {
          expect(product).to.exist
          expect(product.id).to.equal(1)
          done()
        }).catch(done)
      })
    })
    describe('when the product does not exsit', () => {
      it('should return null', (done) => {
        Products.getProduct(42).then((product) => {
          expect(product).to.be.null
          done()
        }).catch(done)
      })
    })
  })
})
