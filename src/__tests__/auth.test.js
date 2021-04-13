const supertest = require('supertest')
const app = require('../server')
const User = require('../models/User')

let request
let userId

const userMock = {
  firstName: 'Tester',
  lastName: 'Johnson',
  phone: '14999998888',
  cpf: '55544422233',
  email: 'auth@test.com',
  password: 'bbbbbb',
}

beforeAll(async () => {
  const server = await app.createServer('test')
  request = supertest(server)

  const res = await request.post('/api/users').send(userMock)
  userId = res.body.userId
})

afterAll(async () => {
  await User.findByIdAndDelete(userId)
})

describe('Auth', () => {
  it('should be able to login', async () => {
    const { email, password } = userMock

    const res = await request.post('/api/login').send({
      email,
      password,
    })

    expect(res.status).toBe(200)
    expect(res.body.auth).toEqual(true)
    expect(res.body.userId).toEqual(userId)
  })

  it('should fail to login (wrong email)', async () => {
    const { password } = userMock

    const res = await request.post('/api/login').send({
      email: 'fake@email.com',
      password,
    })

    expect(res.status).toBe(400)
    expect(res.body.auth).toEqual(false)
    expect(res.body.message).toEqual('E-mail ou senha incorretos!')
  })

  it('should fail to login (wrong password)', async () => {
    const { email } = userMock

    const res = await request.post('/api/login').send({
      email,
      password: 'cccccc',
    })

    expect(res.status).toBe(400)
    expect(res.body.auth).toEqual(false)
    expect(res.body.message).toEqual('E-mail ou senha incorretos!')
  })
})
