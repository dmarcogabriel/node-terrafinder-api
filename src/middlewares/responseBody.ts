import { Request, Response, NextFunction } from 'express'
import { format } from 'date-fns'
import { blueBright, red, yellow } from 'chalk'
import { ResponseBody } from '../interfaces/ResponseBody'

export const logger = () => (
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): void => {
  console.log(
    `${blueBright(`[REQUEST | ${format(new Date(), 'PPpp')}]`)}`,
  )
  console.log(
    `${blueBright('[URL]:')} ${yellow(req.url)} | ${blueBright('[METHOD]:')} ${yellow(req.method)}`,
  )
  console.log(blueBright('[HEADERS]: '), req.headers)
  console.log(blueBright('[PARAMS]: '), req.params)
  console.log(blueBright('[QUERY]: '), req.query)
  console.log(blueBright('[BODY]: '), req.body)

  console.log(red('[RESPONSE]'))
  console.log(`${red('[STATUS]:')} ${res.statusCode}`)

  next()
}
