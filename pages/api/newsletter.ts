import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase, isValidPhoneNumber } from '@/lib/supabase'

type ResponseData = {
  success: boolean
  message: string
}

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
    return res.status(400).json({ success: false, message: 'Phone number is required' })
  }
  
  // Phone number format validation
  if (!isValidPhoneNumber(phoneNumber)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid phone number' })
  }

  try {
    // Use the regular Supabase client with anon key (same as appointments)
    // Row Level Security (RLS) policies will ensure proper access control
    
    // Check if the phone number already exists
    const { data: existingSubscriber, error: lookupError } = await supabase
      .from('newsletter_subscribers')
      .select('id')
      .eq('phone_number', phoneNumber)
      .single()

    if (lookupError && lookupError.code !== 'PGRST116') {  // PGRST116 is "not found" error
      throw lookupError
    }

    if (existingSubscriber) {
      return res.status(200).json({ success: true, message: 'You are already subscribed' })
    }

    // Insert the new subscriber
    const { error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert([{ phone_number: phoneNumber }])

    if (insertError) {
      throw insertError
    }

    res.status(200).json({ success: true, message: 'Subscription successful!' })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    res.status(500).json({ success: false, message: 'Failed to process subscription' })
  }
}