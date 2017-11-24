require('dotenv/config')
const { describe, it, before, after, beforeEach } = require('mocha')
const { expect } = require('chai')
const sinon = require('sinon')
const httpMocks = require('node-mocks-http')
const { MongoClient } = require('mongodb')
const createApi = require('../api/create-api')
const errorHandler = require('../api/error-handler')

describe('error-handler', () => {
  let db
  let terms
  let server
  let req
  let res
  let spy

  before('Connect to MongoDB', done => {
    MongoClient.connect(process.env.MONGODB_URI, (err, _db) => {
      if (err) {
        done(err)
      }
      db = _db
      terms = db.collection('terms')
      server = createApi(terms)
        .listen(process.env.PORT, () => done())
    })
  })

  after('Disconnect MongoDB and server', done => {
    db.close()
    server.close(() => done())
  })

  beforeEach('Declare the request and response', () => {
    spy = sinon.spy()
    req = httpMocks.createRequest({
      method: 'GET',
      url: '/terms/Basketball',
      params: {
        term: 'Basketball'
      }
    })
    res = httpMocks.createResponse()
  })

  describe('error handler function', () => {
    it('should be a function', async () => {
      expect(errorHandler).to.be.a('function')
    })

    it('should call next() once', () => {
      errorHandler('error', req, res, spy)
      expect(spy.calledOnce).to.equal(true)
    })

    it('should return an internal server error message and a status code of 500', () => {
      errorHandler('error', req, res, spy)
      expect(res._getData()).to.equal(JSON.stringify({ 'error': 'Internal Server Error' }))
      expect(res._getStatusCode()).to.equal(500)
    })
  })
})
