import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { firstName, lastName, phone, date, requirements, recipientEmail } = req.body

    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email service
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password
      },
    })

    // Configure the email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail, // Use the recipient email from the form data
      subject: 'New Appointment Request',
      text: `
        New appointment request:
        Name: ${firstName} ${lastName}
        Phone: ${phone}
        Date: ${date}
        Requirements: ${requirements}
      `,
    }

    try {
      // Send the email
      await transporter.sendMail(mailOptions)
      res.status(200).json({ message: 'Appointment request sent successfully' })
    } catch (error) {
      console.error('Error sending email:', error) // Log the error
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ message: 'Failed to send appointment request', error: errorMessage })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}