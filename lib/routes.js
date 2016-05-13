'use strict'
const boom = require('boom')
const products = require('./products')
const joi = require('joi')

exports.listProducts = {
  method: 'GET',
  path: '/products',
  config: {
    tags: ['api'],
    validate: {
      query: {
        api_key: joi.string().required().default('aaa')
      }
    }
  },
  handler: (request, reply) => {
    reply(products.getProducts())
  }
}

exports.getProduct = {
  method: 'GET',
  path: '/products/{product_id}',
  config: {
    tags: ['api'],
    validate: {
      params: {
        product_id: joi.number()
      },
      query: {
        api_key: joi.string().required().default('aaa')
      }
    }
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

exports.createProduct = {
  method: 'POST',
  path: '/products',
  handler: (request, reply) => {
    products.createProduct(request.payload).then((newProductId) => {
      return reply()
        .code(201)
        .header('Location', `/products/${newProductId}`)
    })
  },
  config: {
    tags: ['api'],
    validate: {
      query: {
        api_key: joi.string().required().default('aaa')
      },
      payload: joi.object({
        name: joi.string().example('A fake mug').optional()
      }).allow(null)
    }
  }
}
