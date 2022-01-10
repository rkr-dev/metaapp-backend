import nodemailer from 'nodemailer'

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (options) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL, // generated ethereal user
      pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
  })

  // send mail with defined transport object
  let message = {
    from: `${process.env.SMTP_FROM} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  }

  const info = await transporter.sendMail(message)

  console.log('Message sent: %s', info.messageId)
}
