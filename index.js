require('dotenv/config')
const createApi = require('./api/create-api')
const { MongoClient } = require('mongodb')

MongoClient.connect(process.env.MONGODB_URI, (err, db) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  createApi(db.collection('terms'))
    .listen(process.env.PORT, err => {
      if (err) console.error(err)
      else console.log('PORT STARTED ON PORT ' + process.env.PORT)
    })
})
