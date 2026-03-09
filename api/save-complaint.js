import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

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
  console.log('Function invoked with method:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, description, sector, orderId, amount, authority, status } = req.body;
  console.log('Received data:', { title, description, sector, orderId, amount, authority, status });

  if (!title || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const slug = generateSlug(title);
  console.log('Generated slug:', slug);

  try {
    console.log('Attempting Supabase insert...');
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

    if (error) {
      console.error('Supabase insert error details:', error);
      return res.status(500).json({ error: error.message, details: error });
    }

    console.log('Insert successful, data:', data);

    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
    
    res.status(200).json({ url: `${baseUrl}/case?slug=${slug}` });
  } catch (err) {
    console.error('Unexpected exception:', err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
}
