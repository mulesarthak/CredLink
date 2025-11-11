-- Add role column to users table
-- This fixes the error: "The column `role` does not exist in the current database"

ALTER TABLE `users` 
ADD COLUMN `role` VARCHAR(191) NULL DEFAULT 'user' AFTER `username`;

-- Verify the column was added
DESCRIBE `users`;
