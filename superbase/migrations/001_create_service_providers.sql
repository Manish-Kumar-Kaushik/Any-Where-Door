-- Service Providers Table
-- Stores service provider information by category

CREATE TABLE IF NOT EXISTS service_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(100) NOT NULL,
  sub_category VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  website VARCHAR(500),
  photo_url TEXT,
  rating DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  opening_time TIME NOT NULL,
  closing_time TIME NOT NULL,
  is_open BOOLEAN DEFAULT true,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_providers_category ON service_providers(category);
CREATE INDEX IF NOT EXISTS idx_providers_sub_category ON service_providers(sub_category);
CREATE INDEX IF NOT EXISTS idx_providers_rating ON service_providers(rating DESC);

-- Enable Row Level Security
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public can view providers" ON service_providers
  FOR SELECT USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Authenticated users can insert" ON service_providers
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update
CREATE POLICY "Authenticated users can update" ON service_providers
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete" ON service_providers
  FOR DELETE USING (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO service_providers (category, sub_category, name, description, address, phone_number, email, photo_url, rating, review_count, opening_time, closing_time, is_open) VALUES
-- Home Services - Cleaning
('Home Services', 'Cleaning', 'Sparkle Clean Services', 'Professional home cleaning services', '123 Main Street, Mumbai', '+91 9876543210', 'info@sparkleclean.com', 'https://images.unsplash.com/photo-1581578731548-c64695bade35?w=400', 4.8, 245, '08:00:00', '20:00:00', true),
('Home Services', 'Cleaning', 'Deep Clean Experts', 'Deep cleaning and sanitization', '456 Oak Avenue, Mumbai', '+91 9876543211', 'contact@deepclean.com', 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400', 4.6, 189, '09:00:00', '19:00:00', true),
('Home Services', 'Cleaning', 'Home Shine Services', 'Regular and one-time cleaning', '789 Pine Road, Mumbai', '+91 9876543212', 'hello@homeshine.com', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400', 4.5, 156, '07:00:00', '21:00:00', true),
('Home Services', 'Cleaning', 'Eco Clean Solutions', 'Eco-friendly cleaning services', '321 Garden Lane, Mumbai', '+91 9876543213', 'support@ecoclean.com', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400', 4.7, 198, '08:30:00', '18:30:00', true),

-- Home Services - Plumbing
('Home Services', 'Plumbing', 'Quick Fix Plumbing', 'Emergency plumbing repairs', '567 Water Works Road, Mumbai', '+91 9876543214', 'service@quickfix.com', 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400', 4.9, 312, '00:00:00', '23:59:00', true),
('Home Services', 'Plumbing', 'Pipe Master Services', 'Pipe installation and repair', '890 Flow Street, Mumbai', '+91 9876543215', 'info@pipemaster.com', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400', 4.7, 234, '06:00:00', '22:00:00', true),
('Home Services', 'Plumbing', 'Aqua Tech Plumbing', 'All plumbing solutions', '234 Stream Avenue, Mumbai', '+91 9876543216', 'help@aquatech.com', 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400', 4.6, 178, '08:00:00', '20:00:00', true),
('Home Services', 'Plumbing', 'Drain Doctor', 'Drain cleaning and repair', '678 Pipeline Road, Mumbai', '+91 9876543217', 'contact@draindoctor.com', 'https://images.unsplash.com/photo-1577053145987-0c12e1c4e62c?w=400', 4.8, 267, '07:00:00', '21:00:00', true),

-- Home Services - Electrician
('Home Services', 'Electrician', 'Spark Electricians', 'Electrical repairs and installation', '145 Power Lane, Mumbai', '+91 9876543218', 'service@sparkelectric.com', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400', 4.9, 289, '06:00:00', '22:00:00', true),
('Home Services', 'Electrician', 'Circuit Pro Services', 'Wiring and electrical work', '267 Voltage Street, Mumbai', '+91 9876543219', 'info@circuitpro.com', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 4.7, 198, '08:00:00', '20:00:00', true),
('Home Services', 'Electrician', 'Light Up Electric', 'Lighting installation and repair', '389 Bulb Road, Mumbai', '+91 9876543220', 'help@lightup.com', 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400', 4.6, 145, '09:00:00', '19:00:00', true),
('Home Services', 'Electrician', 'Power Safe Electricians', 'Safe electrical solutions', '412 Energy Avenue, Mumbai', '+91 9876543221', 'contact@powersafe.com', 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400', 4.8, 234, '07:00:00', '21:00:00', true),

-- Home Services - Gardener
('Home Services', 'Gardener / Maali', 'Green Thumb Gardens', 'Landscape design and maintenance', '523 Gardenia Street, Mumbai', '+91 9876543222', 'info@greenthumb.com', 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400', 4.8, 189, '06:00:00', '18:00:00', true),
('Home Services', 'Gardener / Maali', 'Nature Care Landscaping', 'Full garden services', '678 Plant Road, Mumbai', '+91 9876543223', 'service@naturecare.com', 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=400', 4.7, 156, '07:00:00', '19:00:00', true),
('Home Services', 'Gardener / Maali', 'Urban Garden Experts', 'Urban gardening solutions', '890 Flora Avenue, Mumbai', '+91 9876543224', 'help@urbangarden.com', 'https://images.unsplash.com/photo-1598902108854-10e335adac99?w=400', 4.6, 123, '08:00:00', '18:00:00', true),
('Home Services', 'Gardener / Maali', 'Bloom Master Gardeners', 'Professional gardening services', '234 Blossom Lane, Mumbai', '+91 9876543225', 'info@bloommaster.com', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 4.9, 198, '06:00:00', '17:00:00', true),

-- Vehicle Services - Car Wash
('Vehicle Services', 'Car Wash & Detailing', 'Premium Car Spa', 'Premium car wash and detailing', '145 Auto Lane, Mumbai', '+91 9876543226', 'service@premiumcspa.com', 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400', 4.9, 345, '08:00:00', '20:00:00', true),
('Vehicle Services', 'Car Wash & Detailing', 'Shine Express Car Wash', 'Quick and quality wash', '267 Vehicle Road, Mumbai', '+91 9876543227', 'info@shineexpress.com', 'https://images.unsplash.com/photo-1570665756505-9a49b8a4b82c?w=400', 4.7, 267, '07:00:00', '21:00:00', true),
('Vehicle Services', 'Car Wash & Detailing', 'Detailing Pro Studio', 'Professional detailing services', '389 Car Street, Mumbai', '+91 9876543228', 'help@detailingpro.com', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400', 4.8, 234, '09:00:00', '19:00:00', true),
('Vehicle Services', 'Car Wash & Detailing', 'Sparkle Auto Care', 'Complete auto care', '412 Drive Avenue, Mumbai', '+91 9876543229', 'contact@sparkleauto.com', 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=400', 4.6, 189, '08:00:00', '20:00:00', true),

-- Health Services - Doctor
('Health Services', 'Doctor Consultation', 'City Health Clinic', 'General physician consultations', '567 Medical Road, Mumbai', '+91 9876543230', 'appointment@cityhealth.com', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400', 4.9, 456, '09:00:00', '18:00:00', true),
('Health Services', 'Doctor Consultation', 'Wellness Medical Center', 'Multi-specialty consultations', '890 Health Street, Mumbai', '+91 9876543231', 'info@wellnessmc.com', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400', 4.8, 378, '08:00:00', '20:00:00', true),
('Health Services', 'Doctor Consultation', 'Family Care Doctors', 'Family medicine specialists', '234 Clinic Avenue, Mumbai', '+91 9876543232', 'service@familycare.com', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400', 4.7, 289, '10:00:00', '19:00:00', true),
('Health Services', 'Doctor Consultation', 'Quick Health Consult', 'Online and offline consultations', '456 Care Lane, Mumbai', '+91 9876543233', 'help@quickhealth.com', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400', 4.8, 345, '24 hours', '24 hours', true),

-- Spa & Wellness - Massage
('Spa & Wellness', 'Massage Therapy', 'Serenity Spa & Massage', 'Relaxing massage therapies', '123 Relax Road, Mumbai', '+91 9876543234', 'info@serenityspa.com', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400', 4.9, 567, '10:00:00', '22:00:00', true),
('Spa & Wellness', 'Massage Therapy', 'Healing Touch Massage', 'Therapeutic massage services', '456 Wellness Street, Mumbai', '+91 9876543235', 'service@healingtouch.com', 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400', 4.8, 389, '09:00:00', '21:00:00', true),
('Spa & Wellness', 'Massage Therapy', 'Royal Spa & Wellness', 'Luxury spa experience', '789 Spa Avenue, Mumbai', '+91 9876543236', 'help@royalspa.com', 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400', 4.9, 456, '10:00:00', '23:00:00', true),
('Spa & Wellness', 'Massage Therapy', 'Zen Garden Spa', 'Traditional Asian massage', '234 Zen Lane, Mumbai', '+91 9876543237', 'contact@zengardenspa.com', 'https://images.unsplash.com/photo-1591343395082-e120087004b4?w=400', 4.7, 234, '11:00:00', '21:00:00', true),

-- Salon - Hair Spa
('Appointments', 'Salon Booking', 'Style Studio Salon', 'Full hair and beauty services', '567 Fashion Road, Mumbai', '+91 9876543238', 'info@stylestudio.com', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400', 4.9, 678, '10:00:00', '20:00:00', true),
('Appointments', 'Salon Booking', 'Glamour Hair & Beauty', 'Premium salon services', '890 Beauty Street, Mumbai', '+91 9876543239', 'service@glamour.com', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400', 4.8, 456, '09:00:00', '19:00:00', true),
('Appointments', 'Salon Booking', 'Trend Setters Salon', 'Latest hair trends', '234 Style Avenue, Mumbai', '+91 9876543240', 'help@trendssetters.com', 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400', 4.7, 345, '10:00:00', '20:00:00', true),
('Appointments', 'Salon Booking', 'Elite Beauty Parlour', 'Complete beauty solutions', '456 Elite Lane, Mumbai', '+91 9876543241', 'contact@elitebeauty.com', 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400', 4.8, 389, '09:00:00', '18:00:00', true);
