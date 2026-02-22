-- Create user_memberships table
CREATE TABLE IF NOT EXISTS user_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE,
  plan TEXT NOT NULL CHECK (plan IN ('basic', 'premium', 'pro')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  payment_id TEXT,
  amount INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_memberships ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own membership
CREATE POLICY "Users can view own membership" ON user_memberships
  FOR SELECT USING (auth.uid()::text = user_id);

-- Allow users to insert their own membership
CREATE POLICY "Users can insert own membership" ON user_memberships
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Allow users to update their own membership
CREATE POLICY "Users can update own membership" ON user_memberships
  FOR UPDATE USING (auth.uid()::text = user_id);
