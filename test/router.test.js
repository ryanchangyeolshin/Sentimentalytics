require('dotenv/config')
const { describe, it, before, beforeEach, after } = require('mocha')
const { expect } = require('chai')
const { MongoClient } = require('mongodb')
const axios = require('axios')
const httpMocks = require('node-mocks-http')
const createApi = require('../api/create-api')

describe('router.js', () => {
  let db
  let terms
  let termData
  let server

  before('Connect to MongoDB', done => {
    MongoClient.connect(process.env.MONGODB_URI, (err, _db) => {
      if (err) {
        done(err)
      }
      db = _db
      terms = db.collection('terms')
      termData = { term: 'Basketball', sentiment: 'Postive', confidence: 0.99999 }
      server = createApi(terms)
        .listen(process.env.PORT, () => done())
    })
  })

  after('Disconnect MongoDB and server', done => {
    db.close()
    server.close(() => done())
  })

  beforeEach('Delete the stories from MongoDB and then insert one story', async () => {
    await terms.deleteMany({})
    await terms.insertOne(termData)
  })

  describe('GET /api/terms', () => {
    it('should return an array of terms', async () => {
      const { data } = await axios.get(`http://localhost:${process.env.PORT}/api/terms/`)
      const { term, sentiment, confidence } = data[0]
      expect(term).to.equal(termData.term)
      expect(sentiment).to.equal(termData.sentiment)
      expect(confidence).to.equal(termData.confidence)
    })
  })

  describe('DELETE /api/terms', () => {
    it('should delete all of the terms adn return empty data and 204 status code', async () => {
      const { status, data } = await axios.delete(`http://localhost:${process.env.PORT}/api/terms/`)
      expect(status).to.equal(204)
      expect(data).to.equal('')
    })
  })

  describe('GET /api/terms/:term', () => {
    it('should find the sentiment by term and return it', async () => {
      const fakeSentiment = {
        term: 'South Korea',
        sentiment: 'Neutral',
        confidence: 0.50000
      }
      await terms.insertOne(fakeSentiment)
      const { data } = await axios.get(`http://localhost:${process.env.PORT}/api/terms/${fakeSentiment.term}`)
      const { term, sentiment, confidence } = data
      expect(term).to.equal(fakeSentiment.term)
      expect(sentiment).to.equal(fakeSentiment.sentiment)
      expect(confidence).to.equal(fakeSentiment.confidence)
    })
  })
})
