import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { greenBright } from 'chalk'

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.error(`[${greenBright('Validation Errors')}]: `, errors.array())
    res.status(400).json({ message: 'Validation Error', data: errors.array() })
  } else {
    next()
  }
}
