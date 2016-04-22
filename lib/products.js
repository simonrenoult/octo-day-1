'use strict'

const logger = require('./logger')

exports.getProducts = () => {
  logger.info('getting all products')
  return Promise.resolve([{id: 1}, {id: 2}, {id: 3}])
}
