const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const fileUpload = require('express-fileupload')

const app = express()

app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(fileUpload({ createParentPath: true }))
app.use('/images', express.static(`${__dirname}/../storage`))

module.exports = app
