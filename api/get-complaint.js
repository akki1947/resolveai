import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { public_id, slug } = req.query; // allow both for backward compatibility
  
  if (!public_id && !slug) {
    return res.status(400).json({ error: 'Missing public_id or slug' });
  }

  try {
    let query = supabase.from('complaints').select('*');
    if (public_id) {
      query = query.eq('public_id', public_id);
    } else {
      query = query.eq('slug', slug);
    }
    
    const { data: complaint, error: fetchError } = await query.single();

    if (fetchError || !complaint) {
      return res.status(404).json({ error: 'Case not found' });
    }

    // Increment view count
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