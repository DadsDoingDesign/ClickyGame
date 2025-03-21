import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../utils/supabaseClient';

// This endpoint is for development purposes only
// It should be protected or removed in production
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST method for this endpoint
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    // Delete all entries from the leaderboard table
    const { error } = await supabase
      .from('leaderboard')
      .delete()
      .neq('id', 0); // This is a safety measure to ensure we're not accidentally deleting everything

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Generate dummy data for testing
    const dummyData = generateDummyData();
    
    // Insert dummy data
    const { error: insertError } = await supabase
      .from('leaderboard')
      .insert(dummyData);

    if (insertError) {
      return res.status(500).json({ error: insertError.message });
    }

    return res.status(200).json({ message: 'Leaderboard reset successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to reset leaderboard' });
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
