import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { slug } = req.query;
  
  if (!slug) {
    return res.status(400).json({ error: 'Missing slug' });
  }

  try {
    // Fetch complaint by slug
    const { data: complaint, error: fetchError } = await supabase
      .from('complaints')
      .select('*')
      .eq('slug', slug)
      .single();

    if (fetchError || !complaint) {
      return res.status(404).json({ error: 'Case not found' });
    }

    // Increment view count (optional)
    await supabase
      .from('complaints')
      .update({ views: (complaint.views || 0) + 1 })
      .eq('id', complaint.id);

    res.status(200).json(complaint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
}