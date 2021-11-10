import nodemailer from 'nodemailer'

export const sendEmail = async (
  to: string[],
  subject: string,
  text: string,
  html: string,
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '0effb1a73e7e86',
      pass: '7fccd52e6cd1ae',
    },
  })

  const info = await transporter.sendMail({
    from: '"Terrafinder" <contato@terrafinder.com>',
    to: to.join(', '),
    subject,
    text,
    html,
  })

  console.info('mail service', `Email sent to: ${info.envelope.to}`)
}
