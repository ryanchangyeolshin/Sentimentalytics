const { Router } = require('express')
const { cache } = require('./middlewares')

const specialRouter = terms => {
  const router = new Router()

  router.get('/terms', (req, res, next) => {
    terms.find()
      .toArray()
      .then(terms => res.json(terms))
      .catch(next)
  })

  router.delete('/terms', (req, res, next) => {
    terms.deleteMany()
      .then(response => res.sendStatus(204))
      .catch(next)
  })

  router.get('/terms/:term', cache(terms), ({ params: { term } }, res, next) => {
    terms.findOne({ term: term })
      .then(term => res.json(term))
      .catch(next)
  })

  return router
}

module.exports = specialRouter
