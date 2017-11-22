const createApi = require('./api/create-api')
const { MongoClient } = require('mongodb')

MongoClient.connect('mongodb://localhost/sentiment', (err, db) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  createApi(db.collection('terms'), db.collection('users'))
    .listen(3000, err => {
      if (err) console.error(err)
      else console.log('PORT STARTED ON PORT 3000')
    })
})
