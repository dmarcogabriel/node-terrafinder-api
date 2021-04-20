import mongoose from 'mongoose'

const COLLECTIONS = [
  'users',
  'properties',
]

const connect = async (dbName: string): Promise<typeof mongoose> => mongoose.connect(
  `${process.env.DB_URL}/${dbName}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
)

const dropCollections = async (): Promise<void> => {
  const collectionsToRemove = COLLECTIONS
    .map((collectionName) => mongoose.connection.dropCollection(collectionName))
  await Promise.all(collectionsToRemove)
}

export { connect, dropCollections }
