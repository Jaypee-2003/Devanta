-- Migration to add GitHub Access Token to Users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS github_access_token TEXT;
