'use strict'
const boom = require('boom')
const products = require('./products')

exports.listProducts = {
  method: 'GET',
  path: '/products',
  config: {
    tags: ['api']
  },
  handler: (request, reply) => {
    reply(products.getProducts())
  }
}

exports.getProduct = {
  method: 'GET',
  path: '/products/{product_id}',
  config: {
    tags: ['api']
  },
  handler: (request, reply) => {
    products.getProduct(request.params.product_id)
      .then((product) => {
        if (!product) return boom.notFound()
        return product
      })
      .then(reply)
  }
}
