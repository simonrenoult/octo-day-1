'use strict'

const logger = require('./logger')
const data = [{id: 1}, {id: 2}, {id: 3}]

exports.getProducts = () => {
  logger.info('getting all products')
  return Promise.resolve(data)
}

exports.getProduct = (id) => {
  let product = data.find((product) => product.id === id)
  return Promise.resolve(product || null)
}
