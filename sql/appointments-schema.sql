-- SQL Schema for Supabase
-- Run this in your Supabase SQL Editor after creating your project

-- Create appointments table
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  service VARCHAR(255) NOT NULL,
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Unique constraint to prevent double booking
  UNIQUE(date, time)
);

-- Create index for faster queries
CREATE INDEX idx_appointments_date_time ON appointments(date, time);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_created_at ON appointments(created_at);

-- Row Level Security (RLS) policies
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Policy to allow reading all appointments (for checking availability)
CREATE POLICY "Anyone can read appointments" ON appointments
  FOR SELECT USING (true);

-- Policy to allow inserting appointments (for booking)
CREATE POLICY "Anyone can insert appointments" ON appointments
  FOR INSERT WITH CHECK (true);

-- Policy to allow updating own appointments (for future admin features)
CREATE POLICY "Anyone can update appointments" ON appointments
  FOR UPDATE USING (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_appointments_updated_at 
  BEFORE UPDATE ON appointments 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Create a view for available time slots (optional, for complex queries)
CREATE OR REPLACE VIEW available_slots AS
SELECT 
  generate_series(
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '90 days',
    INTERVAL '1 day'
  )::DATE as date,
  unnest(ARRAY[
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'
  ])::TIME as time
WHERE 
  -- Exclude Sundays (adjust as needed)
  EXTRACT(DOW FROM generate_series) != 0;

-- Example queries you can run to test:

-- Get all appointments for a specific date
-- SELECT * FROM appointments WHERE date = '2024-01-15' ORDER BY time;

-- Get available slots for a specific date
-- SELECT time FROM available_slots a 
-- WHERE a.date = '2024-01-15' 
--   AND NOT EXISTS (
--     SELECT 1 FROM appointments ap 
--     WHERE ap.date = a.date AND ap.time = a.time
--   )
-- ORDER BY time;