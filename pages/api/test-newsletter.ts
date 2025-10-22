import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  success: boolean
  message: string
  testData?: object
}

/**
 * This is a test API endpoint to verify the newsletter subscription functionality.
 * It simulates a successful newsletter subscription without actually storing data.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  // Get the phone number from the request body
  const { phoneNumber } = req.body

  // Basic validation
  if (!phoneNumber || phoneNumber.trim() === '') {
    return res.status(400).json({ 
      success: false, 
      message: 'Phone number is required',
      testData: { received: req.body }
    })
  }

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Return success response for testing purposes
  res.status(200).json({ 
    success: true, 
    message: 'Test subscription successful!',
    testData: { 
      receivedPhoneNumber: phoneNumber,
      timestamp: new Date().toISOString(),
      note: 'This is a test endpoint. No data was stored in the database.'
    }
  })
}