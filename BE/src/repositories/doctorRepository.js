import pool from '../config/db.js';

export async function findAll() {
  const { rows } = await pool.query(
    'SELECT * FROM doctors WHERE is_active = true ORDER BY sort_order ASC, full_name ASC'
  );
  return rows;
}

export async function findById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM doctors WHERE id = $1 AND is_active = true',
    [id]
  );
  return rows[0] || null;
}
