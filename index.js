const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const unirest = require('unirest')
const { MongoClient } = require('mongodb')

MongoClient.connect('mongodb://localhost/sentiment', (err, db) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  const app = express()
  const publicPath = path.join(__dirname, 'public')
  app.use(express.static(publicPath))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  const terms = db.collection('terms')
  app.get('/api/terms', (req, res) => {
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

  app.post('/api/terms', (req, res) => {
    const term = req.body
    if (!term) {
      return res.sendStatus(400)
    }
    const termValue = term['searchTerm']
    const url = 'https://community-sentiment.p.mashape.com/text/'
    const mashapeKey = require('./private/keys')
    unirest.post(url)
      .header('X-Mashape-Key', mashapeKey)
      .header('Content-Type', 'application/x-www-form-urlencoded')
      .header('Accept', 'application/json')
      .send(`txt=${termValue}`)
      .end(result => {
        const data = {
          searchTerm: termValue,
          sentiment: result.body['result']['sentiment'],
          confidence: result.body['result']['confidence']
        }
        terms.insertOne(data, (err, response) => {
          if (err) {
            console.error(err)
            process.exit(1)
          }
          else {
            console.log(response)
            res.sendStatus(201)
          }
        })
      })
  })

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
