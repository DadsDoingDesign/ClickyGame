import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../utils/supabaseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle GET request - fetch all leaderboard entries
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('score', { ascending: false });

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch leaderboard data' });
    }
  } 
  // Handle POST request - add or update a leaderboard entry
  else if (req.method === 'POST') {
    try {
      const { name, score } = req.body;

      if (!name || typeof score !== 'number') {
        return res.status(400).json({ error: 'Name and score are required' });
      }

      // Check if entry already exists
      const { data: existingEntry } = await supabase
        .from('leaderboard')
        .select('*')
        .eq('name', name)
        .single();

      if (existingEntry) {
        // Update existing entry if new score is higher
        if (score > existingEntry.score) {
          const { data, error } = await supabase
            .from('leaderboard')
            .update({ score })
            .eq('name', name)
            .select();

          if (error) {
            return res.status(500).json({ error: error.message });
          }

          return res.status(200).json(data);
        } else {
          // Return existing entry if score is not higher
          return res.status(200).json(existingEntry);
        }
      } else {
        // Create new entry
        const { data, error } = await supabase
          .from('leaderboard')
          .insert([{ name, score }])
          .select();

        if (error) {
          return res.status(500).json({ error: error.message });
        }

        return res.status(201).json(data);
      }
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update leaderboard' });
    }
  } else {
    // Handle unsupported methods
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
