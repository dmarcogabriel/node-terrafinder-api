import { Request, Response } from 'express'
import { sendEmail } from '../services/mail.service'
import userRepository from '../repositories/user'

const sendForgotPasswordEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userRepository.findByEmail(req.body.email)
    const encriptedUserId = Buffer.from(user._id.toString(), 'binary').toString('base64')
    await sendEmail(
      [req.body.email],
      'Recuperação de Senha',
      'O link abaixo irá redirecionar você para a página de recuperação de senha',
      `<div>
        <p>O link abaixo irá redirecionar você para a página de recuperação de senha</p>
        <a href="http://localhost:3000/reset-password/${encriptedUserId}">Recuperar Senha</a>
      </div>`,
    )
    res.status(200).json({ message: 'Um e-mail foi enviado para sua caixa de email.' })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao enviar email' })
    console.error('sendForgotPasswordEmail Error', error.message)
  }
}

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    await userRepository.resetPassword(req.params.id, req.body.password)
    res.status(200).json({ message: 'Senha atualizada com sucesso!' })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar senha' })
    console.error('resetPassword Error', error.message)
  }
}

export default { sendForgotPasswordEmail, resetPassword }
