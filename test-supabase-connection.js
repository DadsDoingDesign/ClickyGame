// Test Supabase connection
const { createClient } = require('@supabase/supabase-js');

// Get Supabase URL and key from environment variables or hardcode for testing
const supabaseUrl = 'https://hitwjxxmdxlosrirkzpo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpdHdqeHhtZHhsb3NyaXJrenBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1MTI1NDIsImV4cCI6MjA1ODA4ODU0Mn0.WhSwRGY7UXzQys9IJSnJBHlDBgKNPlTGE0XmeRXXpaI';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Test connection by running a simple query
async function testConnection() {
  try {
    // Try to get the current timestamp from Supabase
    const { data, error } = await supabase.rpc('get_timestamp');
    
    if (error) {
      console.error('Error connecting to Supabase with RPC:', error.message);
      
      // Try a different approach - create a test table if it doesn't exist
      console.log('Trying to create a test table...');
      
      // Create a test table if it doesn't exist
      const { error: createError } = await supabase
        .from('leaderboard')
        .select('*')
        .limit(1);
      
      if (createError) {
        console.error('Error accessing leaderboard table:', createError.message);
        return;
      }
      
      console.log('Successfully connected to Supabase and accessed the leaderboard table!');
      return;
    }
    
    console.log('Successfully connected to Supabase!');
    console.log('Current timestamp:', data);
  } catch (error) {
    console.error('Exception:', error.message);
  }
}

testConnection();
