-- SQL Schema for Supabase Newsletter Subscribers Table
-- Run this in your Supabase SQL Editor

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number VARCHAR(20) NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  active BOOLEAN DEFAULT TRUE,
  source VARCHAR(255) DEFAULT 'website',
  
  -- Validate phone number format (basic validation)
  CONSTRAINT valid_phone CHECK (length(phone_number) >= 10)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_newsletter_phone ON newsletter_subscribers(phone_number);
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscribers(active);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed_at ON newsletter_subscribers(subscribed_at);

-- Enable Row Level Security (RLS)
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies similar to the appointments table
-- Allow anyone to insert subscribers (this is what makes it work with anon key)
CREATE POLICY "Anyone can insert newsletter subscribers" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Allow reading subscribers
CREATE POLICY "Anyone can read newsletter subscribers" ON newsletter_subscribers
  FOR SELECT USING (true);

-- Note: By default, no update or delete policies are created
-- This means subscribers can't be modified without admin access

-- Example queries:

-- Get all active subscribers
-- SELECT * FROM newsletter_subscribers WHERE active = TRUE ORDER BY subscribed_at DESC;

-- Count total subscribers
-- SELECT COUNT(*) FROM newsletter_subscribers WHERE active = TRUE;

-- Find subscriber by phone number
-- SELECT * FROM newsletter_subscribers WHERE phone_number = '+1234567890';