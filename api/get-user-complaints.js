// api/get-user-complaints.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get the user's JWT from the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing authorization token' });
  }

  const token = authHeader.split(' ')[1]; // "Bearer <token>"

  // Verify the token and extract user ID
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  // Fetch complaints belonging to this user
  const { data: complaints, error: dbError } = await supabase
    .from('complaints')
    .select('*')
    .eq('user_id', user.id)
    .order('date_created', { ascending: false });

  if (dbError) {
    console.error(dbError);
    return res.status(500).json({ error: 'Database error' });
  }

  res.status(200).json(complaints);
}