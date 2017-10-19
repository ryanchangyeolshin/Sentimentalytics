const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const fetchSentiment = require('./fetch-sentiment')

const publicPath = path.join(__dirname, '../public')
const publicDir = express.static(publicPath)
const bodyParserJSON = bodyParser.json()

const cache = terms => ({ params: { term } }, res, next) => {
  terms.findOne({ term: term })
    .then(sentiment => {
      if (sentiment !== null) return
      return fetchSentiment(term)
        .then(data => terms.insertOne(data))
    })
    .then(() => next())
    .catch(next)
}

module.exports = {
  publicDir,
  bodyParserJSON,
  cache
}
