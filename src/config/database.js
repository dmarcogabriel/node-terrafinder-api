require('dotenv/config')
const mongoose = require('mongoose')

const COLLECTIONS = [
  'users',
  'properties',
]

const connect = async (dbName) => mongoose.connect(
  `${process.env.DB_URL}/${dbName}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
)

const dropCollections = async () => {
  const collectionsToRemove = COLLECTIONS
    .map((collectionName) => mongoose.connection.dropCollection(collectionName))
  await Promise.all(collectionsToRemove)
}

module.exports = { connect, dropCollections }
