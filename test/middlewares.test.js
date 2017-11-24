require('dotenv/config')
const { describe, it, before, beforeEach, after } = require('mocha')
const { expect } = require('chai')
const { MongoClient } = require('mongodb')
const createApi = require('../api/create-api')
const { cache } = require('../api/middlewares')
const httpMocks = require('node-mocks-http')

describe('middlewares.js', () => {
  let db
  let terms
  let term
  let server
  let cacheMiddleware
  let req
  let res

  before('Connect to MongoDB', done => {
    MongoClient.connect(process.env.MONGODB_URI, (err, _db) => {
      if (err) {
        done(err)
      }
      db = _db
      terms = db.collection('terms')
      term = { term: 'Basketball', sentiment: 'Postive', confidence: 0.99999 }
      cacheMiddleware = cache(terms)
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
    await terms.insertOne(term)
    req = httpMocks.createRequest({
      method: 'GET',
      url: '/terms/Basketball',
      params: {
        term: 'Basketball'
      }
    })
    res = httpMocks.createResponse()
  })

  describe('cache middleware', () => {
    it('should return undefined if the sentiment is already inside the database', async () => {
      const response = await cacheMiddleware(req, res, () => {})
      expect(response).to.equal(undefined)
    })

    it('should insert a new term and return undefined', async () => {
      const reqTwo = httpMocks.createRequest({
        method: 'GET',
        url: '/terms/Joey',
        params: {
          term: 'Joey'
        }
      })
      const response = await cacheMiddleware(reqTwo, res, () => {})
      expect(response).to.equal(undefined)
    })
  })
})
