require('dotenv/config')
const { describe, it, before, after, beforeEach } = require('mocha')
const { expect } = require('chai')
const { MongoClient } = require('mongodb')
const fetchSentiment = require('../api/fetch-sentiment')

describe('fetchSentiment()', () => {
  let db
  let terms
  let randomTerm

  before('Connect to MongoDB', done => {
    MongoClient.connect(process.env.MONGODB_URI, (err, _db) => {
      if (err) {
        done(err)
      }
      db = _db
      terms = db.collection('terms')
      randomTerm = 'I won the lottery!'
      done()
    })
  })

  after('disconnect from MongoDB', done => {
    db.close(() => done())
  })

  beforeEach('Delete the terms collection', async () => {
    await terms.deleteMany({})
  })

  describe('When term is inserted as the parameter', () => {
    it('should return the sentiment data', async () => {
      const { term, sentiment, confidence } = await fetchSentiment(randomTerm)
      expect(term).to.equal(randomTerm)
      expect(sentiment).to.be.a('string')
      expect(confidence).to.be.a('number')
    })
  })
})
