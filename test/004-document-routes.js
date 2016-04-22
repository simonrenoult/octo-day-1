'use strict'

const expect = require('chai').expect
const routes = require('../lib/routes')

describe('routes', () => {
  describe('listProducts', () => {
    it('should be set up for swagger', () => {
      expect(routes.listProducts).to.have.property('config')
      expect(routes.listProducts.config.tags).to.contain('api')
    })
  })
  describe('getProduct', () => {
    it('should be set up for swagger', () => {
      expect(routes.listProducts).to.have.property('config')
      expect(routes.listProducts.config.tags).to.contain('api')
    })
  })
})

