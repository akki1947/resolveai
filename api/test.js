import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  try {
    // Try a simple query
    const { data, error } = await supabase.from('complaints').select('count', { count: 'exact', head: true });
    if (error) throw error;
    res.status(200).json({ success: true, message: 'Connected to Supabase' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
