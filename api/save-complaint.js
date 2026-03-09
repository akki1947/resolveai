import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Helper to generate a unique URL‑friendly slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')        // remove special characters
    .replace(/\s+/g, '-')             // spaces to hyphens
    .replace(/-+/g, '-')              // collapse multiple hyphens
    .substring(0, 50) +                // limit length
    '-' + Math.random().toString(36).substring(2, 8);
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, description, sector, orderId, amount, authority, status } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const slug = generateSlug(title);

  try {
    const { data, error } = await supabase
      .from('complaints')
      .insert([
        {
          slug,
          title,
          description,
          sector,
          order_id: orderId,
          amount,
          authority: authority || 'Consumer Forum',
          status: status || 'Awaiting response'
        }
      ])
      .select();

    if (error) throw error;

    // Construct the public URL
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
    
    res.status(200).json({ url: `${baseUrl}/case?slug=${slug}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
}