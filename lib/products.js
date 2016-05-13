'use strict'

const logger = require('./logger')
const data = [{id: 1, name: 'A great mug'}, {id: 2, name: 'A not so great mug'}, {id: 3, name: 'A deutsch qualidad mug'}]

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
  const newProduct = {id: data[data.length - 1].id + 1, name: payload.name}
  data.push(newProduct)
  return Promise.resolve(newProduct.id)
}
