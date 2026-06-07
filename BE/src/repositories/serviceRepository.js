import pool from '../config/db.js';

export async function findAll({ featuredOnly = false } = {}) {
  let query = 'SELECT * FROM services WHERE is_active = true';
  const params = [];

  if (featuredOnly) {
    query += ' AND is_featured = true';
  }

  query += ' ORDER BY sort_order ASC, name ASC';

  const { rows } = await pool.query(query, params);
  return rows;
}

export async function findById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM services WHERE id = $1 AND is_active = true',
    [id]
  );
  return rows[0] || null;
}
