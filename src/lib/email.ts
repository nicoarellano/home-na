import nodemailer from 'nodemailer'

type EmailData = {
  to: string
  subject: string
  html: string
  text?: string
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT ? Number.parseInt(process.env.EMAIL_PORT) : 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendEmail(data: EmailData) {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: data.to,
    subject: data.subject,
    html: data.html,
    text: data.text,
  })
  return info.messageId
}
