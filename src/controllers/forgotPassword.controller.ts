import { Request, Response } from 'express'

// todo: add send email feature
const sendForgotPasswordEmail = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: 'Senha alterada com sucesso!' })
}

// todo: add a reset password feature
const resetPassword = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: 'Um e-mail foi enviado para sua caixa de email.' })
}

export default { sendForgotPasswordEmail, resetPassword }
