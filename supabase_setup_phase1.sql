-- ExportAgent Phase 1 Database Schema
-- Run this SQL in Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Contacts table (buyers and suppliers)
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('buyer', 'supplier')),
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  address JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents table (invoices, packing lists, proforma, bill of lading)
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('invoice', 'packing_list', 'proforma', 'bol')),
  title VARCHAR(255) NOT NULL,
  file_url TEXT,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- HS Code searches table
CREATE TABLE IF NOT EXISTS hs_searches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  query TEXT NOT NULL,
  hs_code VARCHAR(10),
  confidence FLOAT DEFAULT 0.0,
  country VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shipments table
CREATE TABLE IF NOT EXISTS shipments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  reference VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'shipped', 'customs', 'delivered')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Usage counters table (monthly tracking)
CREATE TABLE IF NOT EXISTS usage_counters (
  user_id UUID NOT NULL,
  month_yyyy VARCHAR(7) NOT NULL,
  docs_created INTEGER DEFAULT 0,
  hs_searches INTEGER DEFAULT 0,
  ai_queries INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, month_yyyy)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contacts_user_id ON contacts(user_id);
CREATE INDEX IF NOT EXISTS idx_contacts_type ON contacts(type);
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(type);
CREATE INDEX IF NOT EXISTS idx_hs_searches_user_id ON hs_searches(user_id);
CREATE INDEX IF NOT EXISTS idx_shipments_user_id ON shipments(user_id);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON shipments(status);
CREATE INDEX IF NOT EXISTS idx_usage_counters_user_id ON usage_counters(user_id);

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'ExportAgent Phase 1 schema setup completed successfully!';
  RAISE NOTICE 'Tables created: contacts, documents, hs_searches, shipments, usage_counters';
  RAISE NOTICE 'Indexes created for optimal query performance';
END $$;
