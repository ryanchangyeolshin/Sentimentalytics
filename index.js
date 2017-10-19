const { MongoClient } = require('mongodb')

MongoClient.connect('mongodb://localhost/sentiment', (err, db) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  const express = require('express')
  const app = express()
  const router = express.Router()
  const path = require('path')
  const publicPath = path.join(__dirname, 'public')
  app.use(express.static(publicPath))

  const bodyParser = require('body-parser')
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  const terms = db.collection('terms')

  const cache = ({ params: { term } }, res, next) => {
    terms.findOne({ term: term })
      .then(sentiment => {
        if (sentiment !== null) {
          res.json(sentiment)
        }
        else {
          const url = 'https://community-sentiment.p.mashape.com/text/'
          const mashapeKey = require('./private/keys')
          const unirest = require('unirest')
          unirest.post(url)
            .header('X-Mashape-Key', mashapeKey)
            .header('Content-Type', 'application/x-www-form-urlencoded')
            .header('Accept', 'application/json')
            .send(`txt=${term}`)
            .end(result => {
              const data = {
                term: term,
                sentiment: result.body['result']['sentiment'],
                confidence: result.body['result']['confidence']
              }
              terms.insertOne(data, (err) => {
                if (err) {
                  console.error(err)
                  process.exit(1)
                }
                else {
                  next()
                }
              })
            })
        }
      })
      .catch(err => {
        console.error(err)
        res.sendStatus(500)
      })
  }

  router.get('/terms', (req, res) => {
    terms.find()
      .toArray()
      .then(terms => {
        res.json(terms)
      })
      .catch(err => {
        console.error(err)
        res.sendStatus(500)
      })
  })

  router.delete('/terms', (req, res) => {
    terms.deleteMany()
      .then(response => {
        res.sendStatus(204)
      })
      .catch(err => {
        console.error(err)
        process.exit(1)
      })
  })

  router.get('/terms/:term', cache, ({ params: { term } }, res) => {
    terms.findOne({ term: term })
      .then(term => {
        res.json(term)
      })
      .catch(err => {
        console.error(err)
        res.sendStatus(500)
      })
  })

  app.use('/api', router)

  const PORT = process.env.PORT || 3000
  app.listen(PORT, err => {
    if (err) {
      console.error(err)
    }
    else {
      console.log('PORT STARTED ON PORT 3000')
    }
  })
})
