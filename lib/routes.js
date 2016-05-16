'use strict'

const boom = require('boom')
const joi = require('joi')
const pick = require('lodash.pick')
const is = require('is')

const logger = require('./logger')
const products = require('./products')

exports.listProducts = {
  method: 'GET',
  path: '/products',
  config: {
    pre: [
      {method: findAllProducts, assign: 'products'},
      {method: filterProducts, assign: 'products'},
      {method: selectFields, assign: 'products'}
    ],
    tags: ['api'],
    validate: {
      query: joi.object({
        api_key: joi.string().required().default('aaa')
      }).unknown()
    }
  },
  handler: (request, reply) => {
    reply(request.pre.products)
  }
}

exports.getProduct = {
  method: 'GET',
  path: '/products/{product_id}',
  config: {
    pre: [
      {method: findProductById, assign: 'product'},
      {method: failIfProductNotFound, assign: 'product'}
    ],
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
    return reply(request.pre.product)
  }
}

exports.createProduct = {
  method: 'POST',
  path: '/products',
  handler: (request, reply) => {
    products.createProduct(request.payload).then((newProduct) => {
      return reply()
        .code(201)
        .header('Location', `/products/${newProduct.id}`)
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

exports.updateOrCreateProduct = {
  method: 'PUT',
  path: '/products/{product_id}',
  handler: (request, reply) => {
    const product = request.pre.product
    const data = request.payload
    if (!product) return reply(products.createProduct(data)).code(201)
    return reply(products.updateProduct(product.id, data))
  },
  config: {
    pre: [
      {method: failIfIdsMismatch},
      {method: findProductById, assign: 'product'}
    ],
    tags: ['api'],
    validate: {
      params: {
        product_id: joi.number()
      },
      query: {
        api_key: joi.string().required().default('fakeroo')
      },
      payload: joi.object({
        id: joi.number().example(1),
        name: joi.string().example('A fake mug')
      }).allow(null)
    }
  }
}

exports.patchProduct = {
  method: 'PATCH',
  path: '/products/{product_id}',
  handler: (request, reply) => {
    const data = request.payload
    return reply(products.updateProduct(request.pre.product.id, data))
  },
  config: {
    pre: [
      {method: findProductById, assign: 'product'},
      {method: failIfProductNotFound, assign: 'product'}
    ],
    tags: ['api'],
    validate: {
      params: {
        product_id: joi.number()
      },
      query: {
        api_key: joi.string().required().default('fakeroo')
      },
      payload: joi.object({
        name: joi.string().example('A fake mug').optional()
      }).allow(null)
    }
  }
}

function filterProducts (request, reply) {
  const products = request.pre.products.filter((product) => {
    return Object.keys(product).every((key) => {
      const attr = product[key]
      const filter = request.query[key]
      if (is.undef(attr) || is.nil(attr)) return false
      if (is.undef(filter)) return true
      if (is.string(attr)) return attr.match(filter)
      if (is.integer(attr)) return attr.toString() === filter
      if (is.bool(attr)) return attr.toString() === filter
    })
  })
  reply(products)
}

function selectFields (request, reply) {
  if (!request.query.fields) return reply(request.pre.products)
  const fields = request.query.fields.split(',')
  reply(request.pre.products.map((product) => pick(product, fields)))
}

function findAllProducts (request, reply) {
  return reply(products.getProducts())
}

function findProductById (request, reply) {
  const id = parseInt(request.params.product_id)
  products.getProduct(id).then(reply)
}

function failIfProductNotFound (request, reply) {
  const product = request.pre.product
  if (!product) return reply(boom.notFound())
  return reply(product)
}

function failIfIdsMismatch (request, reply) {
  const id = parseInt(request.payload.id)
  const requestId = parseInt(request.params.product_id)
  const msg = `Asking to update resource with id ${requestId} while payload id is ${id}`
  if (requestId !== id) return reply(boom.badRequest(msg))
  reply()
}
