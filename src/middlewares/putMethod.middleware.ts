import { Request, Response, NextFunction } from 'express'
import { ResponseBody } from '../interfaces/ResponseBody'

export const putMethod = () => (
  req: Request,
  _: Response<ResponseBody>,
  next: NextFunction,
): void => {
  if (req.method === 'PUT') req.body = { ...req.body, updatedAt: new Date() }
  next()
}
