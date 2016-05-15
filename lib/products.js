'use strict'

const logger = require('./logger')
const data = [
  {id: 1, name: 'A great mug', tags: ['casual', 'cheap']},
  {id: 2, name: 'A not so great mug', tags: ['casual', 'expensive']},
  {id: 3, name: 'A deutsch qualidad mug', tags: ['casual', 'cheap']}
]

exports.getProducts = () => {
  logger.info('getting all products')
  return Promise.resolve(data)
}

exports.getProduct = (id) => {
  let product = data.find((product) => product.id === id)
  return Promise.resolve(product || null)
}

exports.createProduct = (payload) => {
  payload = payload || {}
  let id = payload.id || data[data.length - 1].id + 1
  const newProduct = {id, name: payload.name || 'Untitled'}
  data.push(newProduct)
  return Promise.resolve(newProduct)
}

exports.updateProduct = (id, payload) => {
  const productIndex = data.findIndex((product) => product.id === parseInt(id))
  data[productIndex].name = payload.name
  return Promise.resolve(data[productIndex])
}
