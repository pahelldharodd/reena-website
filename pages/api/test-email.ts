import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'recipient@example.com', // Replace with a test recipient email
    subject: 'Test Email',
    text: 'This is a test email.',
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).json({ message: 'Test email sent successfully' })
  } catch (error: any) {
    console.error('Error sending test email:', error) // Log the error
    res.status(500).json({ message: 'Failed to send test email', error: (error as Error).message })
  }
}