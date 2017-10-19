const express = require('express')
const specialRouter = require('./router')
const { publicDir, bodyParserJSON } = require('./middlewares')
const errorHandler = require('./error-handler')

module.exports = terms => {
  return express()
    .use(publicDir)
    .use(bodyParserJSON)
    .use('/api', specialRouter(terms))
    .use(errorHandler)
}
