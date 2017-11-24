const express = require('express')
const specialRouter = require('./router')
const errorHandler = require('./error-handler')
const path = require('path')

module.exports = terms => {
  const publicPath = path.join(__dirname, '../public')
  return express()
    .use(express.static(publicPath))
    .use('/api', specialRouter(terms))
    .use(errorHandler)
}
