import mongoose from 'mongoose'
import { yellow } from 'chalk'

const COLLECTIONS = [
  'users',
  'properties',
]

const connect = async (dbName: string): Promise<void> => {
  console.info('database', `connecting to mongoDB: ${yellow(dbName)}`)
  await mongoose.connect(
    `${process.env.DB_URL}/${dbName}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  console.info('database', 'connected successfully')
}

const dropCollections = async (): Promise<void> => {
  const collectionsToRemove = COLLECTIONS
    .map((collectionName) => mongoose.connection.dropCollection(collectionName))
  await Promise.all(collectionsToRemove)
}

export { connect, dropCollections }
