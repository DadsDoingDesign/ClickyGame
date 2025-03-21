const fs = require('fs');
const path = require('path');

// Create .env.local file with the Supabase key
const envContent = `NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpdHdqeHhtZHhsb3NyaXJrenBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1MTI1NDIsImV4cCI6MjA1ODA4ODU0Mn0.WhSwRGY7UXzQys9IJSnJBHlDBgKNPlTGE0XmeRXXpaI
NEXT_PUBLIC_SUPABASE_URL=https://hitwjxxmdxlosrirkzpo.supabase.co
`;

// Write the file
fs.writeFileSync(path.join(__dirname, '.env.local'), envContent);

console.log('.env.local file created successfully!');
