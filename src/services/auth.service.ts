import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const SECRET_HASH: string | undefined = process.env.SECRET

const authorize = (req: Request, res: Response, next: NextFunction): void => {
  const token = String(req.headers['x-access-token'])

  if (!token) {
    res.status(401).json({
      data: { auth: false },
      message: 'Acesso restrito',
    })
    console.error('auth.service > authorize > Acesso restrito')
  } else {
    jwt.verify(token, SECRET_HASH || '', (error) => {
      if (error) {
        res.status(401).json({
          data: { auth: false },
          message: 'Token inválido',
        })
        console.error('auth.service > authorize > Token inválido')
      } else next()
    })
  }
}

export default { authorize }
