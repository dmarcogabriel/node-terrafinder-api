import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'
import { requestLogger, putMethod } from '../middlewares'
import './logger'

const app = express()

dotenv.config()
app.use(helmet())
app.use(compression())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(fileUpload({ createParentPath: true }))
app.use('/images', express.static(`${__dirname}/../storage`))
app.use(putMethod())
app.use(requestLogger())

export default app
