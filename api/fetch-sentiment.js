const mashapeKey = require('../private/keys')
const unirest = require('unirest')

const fetchSentiment = term => {
  const url = 'https://community-sentiment.p.mashape.com/text/'
  return new Promise((resolve, reject) => {
    unirest.post(url)
      .header('X-Mashape-Key', mashapeKey)
      .header('Content-Type', 'application/x-www-form-urlencoded')
      .header('Accept', 'application/json')
      .send(`txt=${term}`)
      .end(result => {
        console.log(result)
        const data = {
          term: term,
          sentiment: result.body['result']['sentiment'],
          confidence: result.body['result']['confidence']
        }
        resolve(data)
      })
  })
}

module.exports = fetchSentiment
