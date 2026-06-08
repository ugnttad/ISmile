import dotenv from 'dotenv';
import pool from '../config/db.js';
import { hashPassword } from '../utils/password.js';

dotenv.config();

const IMG = {
  implant: '/services/implant.webp',
  composite: '/services/tram-rang-composite.webp',
  braces: '/services/nieng-rang.webp',
  jewel: '/services/dinh-da-rang.webp',
  veneer: '/services/dan-su-veneer.webp',
  children: '/services/nha-khoa-tre-em.webp',
  denture: '/services/ham-thao-lap.webp',
  aestheticFilling: '/services/tram-rang-tham-my.webp',
  treatment: '/services/dieu-tri-chuyen-sau.webp',
  doctorNhi: 'https://nhakhoaismile.vn/wp-content/smush-webp/2026/02/bsLeNhi.png.webp',
  doctorDung: 'https://nhakhoaismile.vn/wp-content/smush-webp/2026/02/Anh-Dung-Ismile.png.webp',
};

const services = [
  {
    name: 'Trồng răng Implant',
    slug: 'trong-rang-implant',
    description: 'Phục hồi răng mất bằng trụ Implant, hỗ trợ ăn nhai chắc chắn và giữ thẩm mỹ nụ cười.',
    image_url: IMG.implant,
    price_from: 15000000,
    is_featured: true,
    sort_order: 1,
  },
  {
    name: 'Trám răng Composite',
    slug: 'tram-rang-composite',
    description: 'Khôi phục mô răng sâu, mẻ hoặc thưa nhỏ bằng vật liệu có màu gần với răng thật.',
    image_url: IMG.composite,
    price_from: 500000,
    is_featured: true,
    sort_order: 2,
  },
  {
    name: 'Chỉnh nha - Niềng răng',
    slug: 'chinh-nha-nieng-rang',
    description: 'Điều chỉnh răng lệch lạc, chen chúc hoặc sai khớp cắn bằng kế hoạch chỉnh nha rõ ràng.',
    image_url: IMG.braces,
    price_from: 25000000,
    is_featured: true,
    sort_order: 3,
  },
  {
    name: 'Đính đá răng',
    slug: 'dinh-da-rang',
    description: 'Tạo điểm nhấn thẩm mỹ nhỏ trên răng với quy trình gọn, sạch và được kiểm soát kỹ.',
    image_url: IMG.jewel,
    price_from: 500000,
    is_featured: false,
    sort_order: 4,
  },
  {
    name: 'Dán sứ Veneer',
    slug: 'dan-su-veneer',
    description: 'Cải thiện màu sắc và hình thể răng bằng mặt dán sứ mỏng, thiên về thẩm mỹ tự nhiên.',
    image_url: IMG.veneer,
    price_from: 6000000,
    is_featured: true,
    sort_order: 5,
  },
  {
    name: 'Nha khoa trẻ em',
    slug: 'nha-khoa-tre-em',
    description: 'Thăm khám, phòng ngừa và điều trị răng miệng cho bé trong không khí nhẹ nhàng.',
    image_url: IMG.children,
    price_from: 300000,
    is_featured: false,
    sort_order: 6,
  },
  {
    name: 'Hàm tháo lắp',
    slug: 'ham-thao-lap',
    description: 'Phục hồi răng mất bằng hàm tháo lắp, phù hợp với nhiều nhu cầu và điều kiện điều trị.',
    image_url: IMG.denture,
    price_from: 2500000,
    is_featured: false,
    sort_order: 7,
  },
  {
    name: 'Trám răng thẩm mỹ',
    slug: 'tram-rang-tham-my',
    description: 'Xử lý khuyết điểm nhỏ trên răng trước với vật liệu thẩm mỹ, giữ nụ cười đều hơn.',
    image_url: IMG.aestheticFilling,
    price_from: 800000,
    is_featured: false,
    sort_order: 8,
  },
  {
    name: 'Điều trị chuyên sâu',
    slug: 'dieu-tri-chuyen-sau',
    description: 'Thăm khám và xử lý các vấn đề răng miệng cần bác sĩ theo dõi kỹ từng bước.',
    image_url: IMG.treatment,
    price_from: 1000000,
    is_featured: false,
    sort_order: 9,
  },
];

const doctors = [
  {
    full_name: 'BS. Lê Nhi',
    title: 'Bác sĩ Chuyên khoa I',
    specialty: 'Nha khoa tổng quát & Thẩm mỹ',
    bio: 'Bác sĩ Lê Nhi trực tiếp tư vấn và theo dõi các điều trị nha khoa tổng quát, phục hình và thẩm mỹ nụ cười.',
    image_url: IMG.doctorNhi,
    experience_years: 10,
    sort_order: 1,
  },
  {
    full_name: 'BS. Anh Dũng',
    title: 'Bác sĩ Chuyên khoa II',
    specialty: 'Cấy ghép Implant & Phẫu thuật',
    bio: 'Bác sĩ Anh Dũng phụ trách tư vấn Implant, phẫu thuật và các kế hoạch phục hồi răng cần theo dõi sát.',
    image_url: IMG.doctorDung,
    experience_years: 12,
    sort_order: 2,
  },
];

const sampleAppointments = [
  { patient_name: 'Nguyễn Văn An', phone: '0901234567', days_offset: -25, status: 'completed', revenue: 3500000 },
  { patient_name: 'Trần Thị Bình', phone: '0912345678', days_offset: -20, status: 'completed', revenue: 15000000 },
  { patient_name: 'Lê Minh Châu', phone: '0923456789', days_offset: -15, status: 'completed', revenue: 800000 },
  { patient_name: 'Phạm Hoài Đức', phone: '0934567890', days_offset: -10, status: 'confirmed', revenue: 25000000 },
  { patient_name: 'Võ Thị Em', phone: '0945678901', days_offset: -5, status: 'completed', revenue: 6000000 },
  { patient_name: 'Hoàng Văn Phúc', phone: '0956789012', days_offset: -2, status: 'pending', revenue: 500000 },
  { patient_name: 'Đặng Thị Giang', phone: '0967890123', days_offset: 3, status: 'pending', revenue: 3000000 },
  { patient_name: 'Bùi Minh Hải', phone: '0978901234', days_offset: 7, status: 'confirmed', revenue: 15000000 },
];

async function upsertDoctor(client, doctor) {
  const { rows } = await client.query(
    'SELECT id FROM doctors WHERE full_name = $1 LIMIT 1',
    [doctor.full_name]
  );

  if (rows.length > 0) {
    await client.query(
      `UPDATE doctors
       SET title = $2,
           specialty = $3,
           bio = $4,
           image_url = $5,
           experience_years = $6,
           sort_order = $7,
           is_active = true
       WHERE id = $1`,
      [
        rows[0].id,
        doctor.title,
        doctor.specialty,
        doctor.bio,
        doctor.image_url,
        doctor.experience_years,
        doctor.sort_order,
      ]
    );
    return;
  }

  await client.query(
    `INSERT INTO doctors (full_name, title, specialty, bio, image_url, experience_years, sort_order, is_active)
     VALUES ($1, $2, $3, $4, $5, $6, $7, true)`,
    [
      doctor.full_name,
      doctor.title,
      doctor.specialty,
      doctor.bio,
      doctor.image_url,
      doctor.experience_years,
      doctor.sort_order,
    ]
  );
}

async function seed() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const email = process.env.ADMIN_EMAIL || 'admin@nhakhoaismile.vn';
    const password = process.env.ADMIN_PASSWORD || 'Admin@123';

    await client.query(
      `INSERT INTO users (email, password_hash, full_name, role)
       VALUES ($1, $2, $3, 'admin')
       ON CONFLICT (email) DO UPDATE
       SET full_name = EXCLUDED.full_name,
           updated_at = NOW()`,
      [email, hashPassword(password), process.env.ADMIN_NAME || 'Quản trị viên']
    );
    console.log('Admin user ready');

    await client.query('UPDATE services SET is_active = false');
    for (const service of services) {
      await client.query(
        `INSERT INTO services (name, slug, description, image_url, price_from, is_featured, sort_order, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, $7, true)
         ON CONFLICT (slug) DO UPDATE
         SET name = EXCLUDED.name,
             description = EXCLUDED.description,
             image_url = EXCLUDED.image_url,
             price_from = EXCLUDED.price_from,
             is_featured = EXCLUDED.is_featured,
             sort_order = EXCLUDED.sort_order,
             is_active = true`,
        [
          service.name,
          service.slug,
          service.description,
          service.image_url,
          service.price_from,
          service.is_featured,
          service.sort_order,
        ]
      );
    }
    console.log(`Seeded ${services.length} services`);

    await client.query('UPDATE doctors SET is_active = false');
    for (const doctor of doctors) {
      await upsertDoctor(client, doctor);
    }
    console.log(`Seeded ${doctors.length} doctors`);

    const { rows: apptCount } = await client.query('SELECT COUNT(*)::int AS c FROM appointments');
    if (apptCount[0].c === 0) {
      const { rows: svcRows } = await client.query('SELECT id, price_from FROM services WHERE is_active = true ORDER BY sort_order ASC LIMIT 5');
      const { rows: docRows } = await client.query('SELECT id FROM doctors WHERE is_active = true ORDER BY sort_order ASC LIMIT 2');

      for (let i = 0; i < sampleAppointments.length; i += 1) {
        const appointment = sampleAppointments[i];
        const service = svcRows[i % svcRows.length];
        const doctor = docRows[i % docRows.length];

        await client.query(
          `INSERT INTO appointments
            (patient_name, phone, service_id, doctor_id, appointment_date, appointment_time, status, estimated_revenue, created_at)
           VALUES ($1, $2, $3, $4, (CURRENT_DATE + ($5::int * INTERVAL '1 day'))::date, '09:00:00', $6, $7, NOW() + ($5::int * INTERVAL '1 day'))`,
          [
            appointment.patient_name,
            appointment.phone,
            service.id,
            doctor.id,
            appointment.days_offset,
            appointment.status,
            appointment.revenue || service.price_from,
          ]
        );
      }
      console.log(`Seeded ${sampleAppointments.length} appointments`);
    }

    await client.query('COMMIT');
    console.log('Seed complete');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
