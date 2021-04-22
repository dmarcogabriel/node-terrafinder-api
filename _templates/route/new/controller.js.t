---
to: src/controllers/<%= h.inflection.camelize(name, true) %>.controller.ts
unless_exists: true
---
import { Request, Response } from 'express'
import { ResponseBody } from '../interfaces/ResponseBody'

export const post = async (req: Request, res: Response<ResponseBody>): Promise<void> => {
  // code here...
  res.json({ message: 'post method' })
}

export const get = async (req: Request, res: Response<ResponseBody>): Promise<void> => {
  // code here...
  res.json({ message: 'get method' })
}

export const getById = async (req: Request, res: Response<ResponseBody>): Promise<void> => {
  // code here...
  res.json({ message: 'get by id method' })
}

export const put = async (req: Request, res: Response<ResponseBody>): Promise<void> => {
  // code here...
  res.json({ message: 'put method' })
}

export const remove = async (req: Request, res: Response<ResponseBody>): Promise<void> => {
  // code here...
  res.json({ message: 'delete method' })
}
