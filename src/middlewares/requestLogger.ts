import { Request, Response, NextFunction } from 'express'
import { format } from 'date-fns'
import { blueBright, yellow } from 'chalk'
import { ResponseBody } from '../interfaces/ResponseBody'

export const requestLogger = () => (
  req: Request,
  _: Response<ResponseBody>,
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

  next()
}
