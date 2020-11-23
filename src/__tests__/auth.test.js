const supertest = require('supertest')
const app = require('../server')
const userMock = require('../config/tests/userMock')

let request

beforeEach(async () => {
  const server = await app.createServer('test')
  request = supertest(server)
})

describe('Auth', () => {
  it('should be able to login', async () => {
    const { email, password } = userMock

    const res = await request.post('api/login').send({
      email,
      password,
    })

    expect(res.status).toBe(404)
  })
})
