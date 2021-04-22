import { Request, Response } from 'express'
import { ResponseBody } from '../interfaces/ResponseBody'

export const get = async (req: Request, res: Response<ResponseBody>): Promise<void> => {
  // todo: add main api page
  res.json({ message: 'get method' })
}
