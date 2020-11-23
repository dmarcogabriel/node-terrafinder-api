require('dotenv/config')
// const database = require('../database')
const supertest = require('supertest')
const app = require('../../server')
const userMock = require('./userMock')

let request

beforeAll(async () => {
  const server = await app.createServer('test')
  request = supertest(server)

  await request.post('/api/users').send(userMock)
})
afterAll(async () => {
  // todo: drop table
  // database.dropCollections()
})
