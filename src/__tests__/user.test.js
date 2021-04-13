const supertest = require('supertest')
// const createJWKSMock = require('mock-jwks')
const app = require('../server')
// const UserModel = require('../models/User')
// const {TokenExpiredError} = require('jsonwebtoken')
const userMock = require('../config/tests/userMock')

let request
let token
let userId

beforeAll(async () => {
  const server = await app.createServer('test')
  request = supertest(server)

  const { email, password } = userMock

  // Get access Token and User ID
  const res = await request.post('/api/login').send({
    email,
    password,
  })

  token = res.body.token
  userId = res.body.userId
})

describe('User Tests', () => {
  describe('Public routes', () => {
    it('should create user', async () => {
      const res = await request.post('/api/users').send(userMock)

      expect(res.status).toEqual(201)
      expect(res.body.message).toEqual('User created successfully.')
    })

    it('should not create user', async () => {
      const res = await request.post('/api/users')
        .send({ ...userMock, email: null })

      expect(res.status).toEqual(500)
      expect(res.body.error._message).toEqual('User validation failed')
    })
  })

  describe('Private routes', () => {
    it('should get all users', async () => {
      const res = await request.get('/api/users')
        .set({ 'x-access-token': token })

      expect(res.status).toEqual(200)
    })

    it('should fail to get all users', async () => {
      const res = await request.get('/api/users')
        .set({ 'x-access-token': 'test' })

      expect(res.status).toEqual(401)
      expect(res.body.auth).toEqual(false)
      expect(res.body.message).toEqual('Token inválido')
    })

    it('should get user by id', async () => {
      const res = await request.get(`/api/users/${userId}`)
        .set({ 'x-access-token': token })

      expect(res.status).toEqual(200)
    })

    it('should fail to get user by id', async () => {
      const res = await request.get('/api/users/123')
        .set({ 'x-access-token': token })

      expect(res.status).toEqual(500)
    })
  })
})
