const { Router } = require('express')
const authRoutes = require('./auth.routes')
const userRoutes = require('./user.routes')
const propertyRoutes = require('./property.routes')

const routes = Router()

userRoutes(routes)
authRoutes(routes)
propertyRoutes(routes)

module.exports = routes
