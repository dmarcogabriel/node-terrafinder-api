import { Request, Response, NextFunction } from 'express'
import { ResponseBody } from '../interfaces/ResponseBody'

export const logger = () => (
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): void => {
  // todo: add logs here
  console.log(req)
  next()
}
