# Supabase Setup for ClickyGame

This document provides instructions for setting up Supabase as the database backend for the ClickyGame leaderboard feature.

## Project Setup

1. **Create a Supabase Project**
   - Go to [Supabase](https://supabase.com/) and sign in or create an account
   - Create a new project with a name of your choice (e.g., "clickygame")
   - Select a region closest to your target users
   - Set a secure database password (keep this safe)

2. **Get Project Credentials**
   - After project creation, go to Project Settings > API
   - Copy the "Project URL" and "anon/public" key
   - These values are already configured in your project's `.env.local` file

## Database Setup

1. **Run the Schema SQL**
   - In your Supabase project, go to the SQL Editor
   - Create a new query
   - Copy and paste the contents of `supabase-schema.sql` from the project root
   - Run the query to create the necessary tables and functions

2. **Verify Table Creation**
   - Go to the Table Editor in your Supabase dashboard
   - You should see a `leaderboard` table with the following columns:
     - `id` (primary key)
     - `name` (unique)
     - `score`
     - `created_at`
     - `updated_at`

## Local Development

1. **Environment Variables**
   - Ensure your `.env.local` file contains the following variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     ```
   - You can run `node create-env.js` to create this file with the correct values

2. **Test Connection**
   - Run `node test-supabase-connection.js` to verify your connection to Supabase
   - You should see a success message if the connection is working

## API Endpoints

The following API endpoints have been created to interact with the Supabase database:

1. **GET /api/leaderboard**
   - Fetches all leaderboard entries sorted by score (descending)

2. **POST /api/leaderboard**
   - Creates a new leaderboard entry or updates an existing one
   - Required body: `{ name: string, score: number }`

3. **POST /api/leaderboard/reset**
   - Resets the leaderboard with dummy data (for development only)
   - This endpoint should be removed or protected in production

## Row Level Security (RLS)

Supabase Row Level Security has been configured to:
- Allow anyone to read the leaderboard data
- Allow anyone to insert new entries
- Allow updates only to existing entries (when score is higher)

## Troubleshooting

If you encounter issues with the Supabase connection:

1. **Check Environment Variables**
   - Verify that your `.env.local` file has the correct URL and key
   - Ensure the environment variables are being loaded properly

2. **Check Network Connectivity**
   - Ensure your development environment has internet access
   - Check if there are any firewall restrictions

3. **Check Supabase Status**
   - Visit the Supabase status page to check for any service disruptions

4. **Fallback Mechanism**
   - The application includes a fallback to localStorage if the Supabase connection fails
   - This ensures the game remains functional even without internet access
