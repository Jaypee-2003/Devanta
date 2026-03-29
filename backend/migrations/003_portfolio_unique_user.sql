-- Migration to add unique constraint on user_id in portfolios table
ALTER TABLE portfolios ADD CONSTRAINT portfolios_user_id_key UNIQUE (user_id);
