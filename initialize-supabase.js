// Script to initialize Supabase database with schema
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local if it exists
try {
  require('dotenv').config({ path: '.env.local' });
} catch (error) {
  console.log('dotenv package not found, continuing without it');
}

// Get Supabase URL and key from environment variables or hardcode for testing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hitwjxxmdxlosrirkzpo.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpdHdqeHhtZHhsb3NyaXJrenBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1MTI1NDIsImV4cCI6MjA1ODA4ODU0Mn0.WhSwRGY7UXzQys9IJSnJBHlDBgKNPlTGE0XmeRXXpaI';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Read the SQL schema file
const schemaFilePath = path.join(__dirname, 'supabase-schema.sql');
const schemaSql = fs.readFileSync(schemaFilePath, 'utf8');

// Split the SQL into individual statements
const sqlStatements = schemaSql
  .split(';')
  .map(statement => statement.trim())
  .filter(statement => statement.length > 0);

// Execute each SQL statement
async function executeSchema() {
  console.log('Initializing Supabase database...');
  
  try {
    for (const statement of sqlStatements) {
      console.log(`Executing SQL statement: ${statement.substring(0, 50)}...`);
      
      const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' });
      
      if (error) {
        console.error('Error executing SQL statement:', error.message);
        console.log('Trying alternative approach...');
        
        // If the RPC method doesn't work, we'll need to execute the statements manually in the Supabase dashboard
        console.log('Please execute the SQL statements manually in the Supabase dashboard SQL Editor.');
        console.log('SQL Schema file is located at:', schemaFilePath);
        break;
      }
    }
    
    console.log('Schema initialization complete!');
    
    // Test the connection by inserting some dummy data
    await insertDummyData();
    
  } catch (error) {
    console.error('Exception:', error.message);
    console.log('Please execute the SQL statements manually in the Supabase dashboard SQL Editor.');
    console.log('SQL Schema file is located at:', schemaFilePath);
  }
}

// Insert dummy data for testing
async function insertDummyData() {
  console.log('Inserting dummy data...');
  
  // Generate dummy data
  const dummyData = generateDummyData();
  
  try {
    // Insert the dummy data
    const { data, error } = await supabase
      .from('leaderboard')
      .upsert(dummyData, { onConflict: 'name' });
    
    if (error) {
      console.error('Error inserting dummy data:', error.message);
      return;
    }
    
    console.log('Dummy data inserted successfully!');
    
    // Fetch and display the leaderboard
    const { data: leaderboard, error: fetchError } = await supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .limit(5);
    
    if (fetchError) {
      console.error('Error fetching leaderboard:', fetchError.message);
      return;
    }
    
    console.log('Top 5 leaderboard entries:');
    console.table(leaderboard);
    
  } catch (error) {
    console.error('Exception:', error.message);
  }
}

// Generate dummy data for the leaderboard
function generateDummyData() {
  const names = [
    "ClickMaster", "ButtonSmasher", "PointCollector", "ScoreHunter", "ClickWizard",
    "TapChampion", "ClickNinja", "PointGatherer", "ScoreSeeker", "TapMaster",
    "ClickerPro", "PointWizard", "ScoreLord", "TapKing", "ClickerQueen",
    "PointNinja", "ScoreChaser", "TapWarrior", "ClickerGuru", "PointHunter",
    "ScoreWizard", "TapNinja", "ClickerKing", "PointMaster", "ScoreHoarder"
  ];
  
  // Create initial entries
  const initialEntries = [
    { name: "ClickyGuy123", score: 122304 },
    { name: "CallenTheClicker", score: 102568 },
    { name: "NobodyClicksLikeMe", score: 80120 },
  ];
  
  // Create additional random entries
  const randomEntries = Array.from({ length: 20 }, (_, i) => {
    const nameIndex = i % names.length;
    const nameSuffix = Math.floor(i / names.length) > 0 ? `_${Math.floor(i / names.length)}` : '';
    const name = `${names[nameIndex]}${nameSuffix}`;
    const score = Math.floor(Math.random() * 190000) + 10000;
    
    return { name, score };
  });
  
  return [...initialEntries, ...randomEntries];
}

// Execute the schema initialization
executeSchema();
