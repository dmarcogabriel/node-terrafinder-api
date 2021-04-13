// todo: add send email feature
exports.sendForgotPasswordEmail = async (_, res) => res.status(200)
  .json({ message: 'Um e-mail foi enviado para sua caixa de email.' })

// todo: add a reset password feature
exports.resetPassword = async (_, res) => res.status(200)
  .json({ message: 'Senha alterada com sucesso!' })
