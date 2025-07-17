-- Sample Data Script for Supabase Kanban Task
-- Run this AFTER you've authenticated and want to add sample data
-- This should be run when you're logged in to your app

-- First, make sure you're authenticated (run this in your app's console or when logged in)
-- This will only work if auth.uid() returns a valid user ID

-- Create sample boards
INSERT INTO task (title, description, user_id, status) VALUES 
    ('My First Task', 'A sample Kanban Task to get you started', auth.uid(), 'pending'),
    ('Project Alpha', 'Development project Task', auth.uid(), 'in-progress'),
    ('Marketing Campaign', 'Q1 marketing initiatives', auth.uid(), 'completed')
ON CONFLICT DO NOTHING;

-- Success message
SELECT 'Sample data created successfully! 🎉' as message; 