require('dotenv/config')
const AYLIENTextAPI = require('aylien_textapi')

const fetchSentiment = term => {
  const textapi = new AYLIENTextAPI({
    application_id: process.env.AYLIEN_ID,
    application_key: process.env.AYLIEN_KEY
  })

  return new Promise((resolve, reject) => {
    textapi.sentiment({ 'text': term }, (err, res) => {
      if (err) {
        reject(err)
      }
      else {
        const data = {
          term: res.text,
          sentiment: res.polarity,
          confidence: res.polarity_confidence
        }
        resolve(data)
      }
    })
  })
}

module.exports = fetchSentiment
