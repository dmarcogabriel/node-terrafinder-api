const supertest = require('supertest')
const app = require('../server')
const { email, password } = require('../config/tests/userMock')
const propertyMock = require('../config/tests/propertyMock')

let request
let token
let userId
let propertyId

const login = async () => {
  const server = await app.createServer('test')
  request = supertest(server)

  // Get access Token and User ID
  const res = await request.post('/api/login').send({
    email,
    password,
  })

  token = res.body.token
  userId = res.body.userId
}

const createProperty = async () => {
  const res = await request.post('/api/properties').send({
    ...propertyMock, user: userId,
  }).set({ 'x-access-token': token })

  propertyId = res.body.property._id
}

beforeAll(async () => {
  await login()
  await createProperty()
})

describe('Property Tests', () => {
  describe('Public routes', () => {
    it('should list all properties', async () => {
      const res = await request.get('/api/properties')

      expect(res.status).toEqual(200)
      expect(res.body.properties).toBeTruthy()
    })

    it('should get property by id', async () => {
      const res = await request.get(`/api/property/${propertyId}`)

      expect(res.status).toEqual(200)
      expect(res.body.property).toBeTruthy()
    })

    it('should fail to get property by id', async () => {
      const res = await request.get('/api/property/5faeb09d07fc324f5470c128')

      expect(res.status).toEqual(400)
      expect(res.body.message).toEqual('Propriedade não encontrada')
    })

    it('should fail to get property by id', async () => {
      const res = await request.get('/api/property/123')

      expect(res.status).toEqual(500)
      expect(res.body.message).toEqual('[Error] Malformed id')
    })
  })

  describe('Private routes', () => {
    it('should create property', async () => {
      const res = await request.post('/api/properties')
        .send({ ...propertyMock, user: userId })
        .set({ 'x-access-token': token })

      expect(res.status).toEqual(201)
      expect(res.body.message).toEqual('Anúncio criado com sucesso!')
    })

    it('should fail to create property', async () => {
      const res = await request.post('/api/properties')
        .send({ ...propertyMock, user: null })
        .set({ 'x-access-token': token })

      expect(res.status).toEqual(500)
      expect(res.body.message).toEqual('[Error] failed to save property')
    })

    it('should list properties by user id', async () => {
      const res = await request.get(`/api/properties/user/${userId}`)
        .set({ 'x-access-token': token })

      expect(res.status).toEqual(200)
      expect(res.body.properties).toBeTruthy()
    })

    it('should fail to list properties by user id (malformed id)', async () => {
      const res = await request.get('/api/properties/user/123')
        .set({ 'x-access-token': token })

      expect(res.status).toEqual(500)
      expect(res.body.message).toEqual('[Error] Malformed id')
    })

    it('should fail to list properties by user id (wrong id)', async () => {
      const res = await request
        .get('/api/properties/user/5fac3be65a0bd202c2c48ea1')
        .set({ 'x-access-token': token })

      expect(res.status).toEqual(400)
      expect(res.body.message).toEqual('Propriedade não encontrada')
    })
  })
})
