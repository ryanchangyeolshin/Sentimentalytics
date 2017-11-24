const fetchSentiment = require('./fetch-sentiment')

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
  cache
}
