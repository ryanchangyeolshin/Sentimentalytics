const searchTerms = require('./searchTerms')
const { MongoClient } = require('mongodb')

MongoClient.connect('mongodb://localhost/sentiment', (err, db) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  const terms = db.collection('terms')
  terms
    .deleteMany({})
    .then(() => terms.insertMany(searchTerms))
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
    .then(() => console.log('Search terms seeded!'))
    .then(() => db.close())
})
