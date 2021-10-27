import mongoose from 'mongoose'
import { blueBright, greenBright, yellow } from 'chalk'

const COLLECTIONS = [
  'users',
  'properties',
]

const connect = async (dbName: string): Promise<void> => {
  console.log(`${blueBright('[DATABASE]')} Connecting to MongoDB: ${yellow(dbName)}`)
  await mongoose.connect(
    `${process.env.DB_URL}/${dbName}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  console.log(`${blueBright('[DATABASE]')} Connected ${greenBright('Successfull')}!`)
}

const dropCollections = async (): Promise<void> => {
  const collectionsToRemove = COLLECTIONS
    .map((collectionName) => mongoose.connection.dropCollection(collectionName))
  await Promise.all(collectionsToRemove)
}

export { connect, dropCollections }
