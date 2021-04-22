import { Request, Response } from 'express'
import { isNil } from 'lodash'
import userRepository from '../repositories/user'

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body
  try {
    const data = await userRepository.login(email, password)
    if (isNil(data)) {
      res.status(400).json({
        message: 'E-mail ou senha incorretos!',
        data: { auth: false },
      })
    } else {
      const { token, id } = data
      res.status(200).json({
        message: 'Logou ae carai',
        data: {
          auth: true,
          token,
          userId: id,
        },
      })
    }
  } catch (error) {
    res.status(500).send({
      message: 'Falha na autenticação',
      data: { error },
    })
  }
}

export default { login }
