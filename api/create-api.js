const express = require('express')
const specialRouter = require('./special-router')
const { publicDir } = require('./middlewares')
const errorHandler = require('./error-handler')

module.exports = (terms, users) => {
  return express()
    .use(publicDir)
    .use('/api', specialRouter(terms))
    .use(errorHandler)
}
