import pool from '../config/db.js';

const SELECT_FIELDS = `
  a.*,
  s.name AS service_name,
  d.full_name AS doctor_name
`;

const FROM_JOIN = `
  FROM appointments a
  LEFT JOIN services s ON a.service_id = s.id
  LEFT JOIN doctors d ON a.doctor_id = d.id
`;

export async function create(data) {
  const { rows } = await pool.query(
    `INSERT INTO appointments
      (patient_name, phone, email, service_id, doctor_id, appointment_date, appointment_time, note, estimated_revenue)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [
      data.patientName,
      data.phone,
      data.email || null,
      data.serviceId || null,
      data.doctorId || null,
      data.appointmentDate,
      data.appointmentTime,
      data.note || null,
      data.estimatedRevenue || 0,
    ]
  );
  return rows[0];
}

export async function findAll({ status, page = 1, limit = 20 } = {}) {
  const params = [];
  let where = 'WHERE 1=1';

  if (status) {
    params.push(status);
    where += ` AND a.status = $${params.length}`;
  }

  const offset = (page - 1) * limit;
  params.push(limit, offset);

  const countQuery = `SELECT COUNT(*)::int AS total FROM appointments a ${where}`;
  const countParams = status ? [status] : [];
  const { rows: countRows } = await pool.query(countQuery, countParams);

  const { rows } = await pool.query(
    `SELECT ${SELECT_FIELDS} ${FROM_JOIN} ${where}
     ORDER BY a.appointment_date DESC, a.appointment_time DESC
     LIMIT $${params.length - 1} OFFSET $${params.length}`,
    params
  );

  return { data: rows, total: countRows[0].total, page, limit };
}

export async function findById(id) {
  const { rows } = await pool.query(
    `SELECT ${SELECT_FIELDS} ${FROM_JOIN} WHERE a.id = $1`,
    [id]
  );
  return rows[0] || null;
}

export async function updateStatus(id, status, estimatedRevenue) {
  const params = [status, id];
  let query = `UPDATE appointments SET status = $1, updated_at = NOW()`;

  if (estimatedRevenue !== undefined) {
    params.splice(1, 0, estimatedRevenue);
    query += `, estimated_revenue = $2`;
    query += ` WHERE id = $3 RETURNING *`;
  } else {
    query += ` WHERE id = $2 RETURNING *`;
  }

  const { rows } = await pool.query(query, params);
  return rows[0] || null;
}

export async function getMonthlyStats(months = 6) {
  const { rows } = await pool.query(
    `SELECT
       TO_CHAR(DATE_TRUNC('month', created_at), 'YYYY-MM') AS month,
       COUNT(*)::int AS patients,
       COALESCE(SUM(estimated_revenue), 0)::int AS revenue
     FROM appointments
     WHERE created_at >= DATE_TRUNC('month', NOW()) - ($1 || ' months')::interval
     GROUP BY DATE_TRUNC('month', created_at)
     ORDER BY month ASC`,
    [months - 1]
  );
  return rows;
}

export async function getStatusCounts() {
  const { rows } = await pool.query(
    `SELECT status, COUNT(*)::int AS count
     FROM appointments
     GROUP BY status`
  );
  return rows;
}

export async function getDashboardSummary() {
  const { rows } = await pool.query(
    `SELECT
       COUNT(*)::int AS total_appointments,
       COUNT(*) FILTER (WHERE status = 'pending')::int AS pending,
       COUNT(*) FILTER (WHERE status = 'confirmed')::int AS confirmed,
       COUNT(*) FILTER (WHERE status = 'completed')::int AS completed,
       COUNT(*) FILTER (WHERE status = 'cancelled')::int AS cancelled,
       COUNT(*) FILTER (WHERE appointment_date = CURRENT_DATE)::int AS today,
       COALESCE(SUM(estimated_revenue) FILTER (WHERE status = 'completed'), 0)::int AS total_revenue
     FROM appointments`
  );
  return rows[0];
}
