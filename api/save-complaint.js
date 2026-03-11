// api/save-complaint.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

function generatePublicId() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `CR-${randomNum}`;
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50) +
    '-' + Math.random().toString(36).substring(2, 8);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, description, sector, orderId, amount, authority, status } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Get user ID from token if present
  let userId = null;
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (!error && user) {
      userId = user.id;
    }
  }

  const slug = generateSlug(title);
  const publicId = generatePublicId();

  try {
    const { data, error } = await supabase
      .from('complaints')
      .insert([
        {
          slug,
          public_id: publicId,
          user_id: userId,
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

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: error.message });
    }

    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
    
    res.status(200).json({ url: `${baseUrl}/case?public_id=${publicId}` });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: err.message });
  }
}