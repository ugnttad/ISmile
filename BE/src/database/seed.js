import dotenv from 'dotenv';
import pool from '../config/db.js';
import { hashPassword } from '../utils/password.js';

dotenv.config();

const IMG = {
  logo: 'https://nhakhoaismile.vn/wp-content/uploads/2025/11/logo.svg',
  hero: 'https://nhakhoaismile.vn/wp-content/smush-webp/2026/06/ChatGPT-Image-14_03_35-1-thg-6-2026.png.webp',
  banner: 'https://nhakhoaismile.vn/wp-content/smush-webp/2026/04/BANNER-WEB.jpg.webp',
  facility1: 'https://nhakhoaismile.vn/wp-content/uploads/2026/02/image.png',
  facility2: 'https://nhakhoaismile.vn/wp-content/uploads/elementor/thumbs/IMG_3274-rn25svktdh2oisipsew13e5vtif4hm0soc78equj2c.jpg',
  facility3: 'https://nhakhoaismile.vn/wp-content/uploads/2026/01/1920x1080.png',
  implant: 'https://nhakhoaismile.vn/wp-content/smush-webp/2026/02/Gemini_Generated_Image_oyv1y6oyv1y6oyv1-1.png.webp',
  niengRang: 'https://nhakhoaismile.vn/wp-content/smush-webp/2026/02/Niengranggg.png.webp',
  tramRang: 'https://nhakhoaismile.vn/wp-content/smush-webp/2026/02/Tramrangcomposite.png.webp',
  trongRangSu: 'https://nhakhoaismile.vn/wp-content/smush-webp/2026/02/trongrangsu.jpg.webp',
  veneer: 'https://nhakhoaismile.vn/wp-content/smush-webp/2026/04/matdavennergemini-1.png.webp',
  doctor1: 'https://nhakhoaismile.vn/wp-content/smush-webp/2026/02/Anh-Dung-Ismile.png.webp',
  doctor2: 'https://nhakhoaismile.vn/wp-content/smush-webp/2026/02/bsLeNhi.png.webp',
};

const services = [
  {
    name: 'Cấy ghép Implant',
    slug: 'cay-ghep-implant',
    description: 'Phục hồi răng mất bằng trụ titanium hiện đại, ổn định lâu dài và thẩm mỹ tự nhiên.',
    image_url: IMG.implant,
    price_from: 15000000,
    is_featured: true,
    sort_order: 1,
  },
  {
    name: 'Niềng răng thẩm mỹ',
    slug: 'nieng-rang-tham-my',
    description: 'Chỉnh nha với mắc cài kim loại, sứ hoặc khay trong suốt Invisalign.',
    image_url: IMG.niengRang,
    price_from: 25000000,
    is_featured: true,
    sort_order: 2,
  },
  {
    name: 'Trám răng Composite',
    slug: 'tram-rang-composite',
    description: 'Trám răng sâu, mẻ bằng vật liệu composite màu răng tự nhiên.',
    image_url: IMG.tramRang,
    price_from: 500000,
    is_featured: true,
    sort_order: 3,
  },
  {
    name: 'Trồng răng sứ',
    slug: 'trong-rang-su',
    description: 'Phục hình răng sứ cao cấp, đảm bảo chức năng ăn nhai và thẩm mỹ.',
    image_url: IMG.trongRangSu,
    price_from: 3000000,
    is_featured: true,
    sort_order: 4,
  },
  {
    name: 'Mặt dán sứ Veneer',
    slug: 'mat-dan-su-veneer',
    description: 'Thiết kế nụ cười hoàn hảo với mặt dán sứ siêu mỏng, bền đẹp.',
    image_url: IMG.veneer,
    price_from: 6000000,
    is_featured: true,
    sort_order: 5,
  },
];

const doctors = [
  {
    full_name: 'BS. Lê Nhi',
    title: 'Bác sĩ Chuyên khoa I',
    specialty: 'Nha khoa tổng quát & Thẩm mỹ',
    bio: 'Hơn 10 năm kinh nghiệm trong điều trị và phục hình răng thẩm mỹ.',
    image_url: IMG.doctor2,
    experience_years: 10,
    sort_order: 1,
  },
  {
    full_name: 'BS. Anh Dũng',
    title: 'Bác sĩ Chuyên khoa II',
    specialty: 'Cấy ghép Implant & Phẫu thuật',
    bio: 'Chuyên gia implant với hàng trăm ca phẫu thuật thành công.',
    image_url: IMG.doctor1,
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

async function seed() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const email = process.env.ADMIN_EMAIL || 'admin@nhakhoaismile.vn';
    const { rows: existingUsers } = await client.query('SELECT id FROM users WHERE email = $1', [email]);

    if (existingUsers.length === 0) {
      const password = process.env.ADMIN_PASSWORD || 'Admin@123';
      await client.query(
        `INSERT INTO users (email, password_hash, full_name, role) VALUES ($1, $2, $3, 'admin')`,
        [email, hashPassword(password), process.env.ADMIN_NAME || 'Quản trị viên']
      );
      console.log('Created admin user');
    }

    const { rows: serviceCount } = await client.query('SELECT COUNT(*)::int AS c FROM services');
    if (serviceCount[0].c === 0) {
      for (const s of services) {
        await client.query(
          `INSERT INTO services (name, slug, description, image_url, price_from, is_featured, sort_order)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [s.name, s.slug, s.description, s.image_url, s.price_from, s.is_featured, s.sort_order]
        );
      }
      console.log(`Seeded ${services.length} services`);
    }

    const { rows: doctorCount } = await client.query('SELECT COUNT(*)::int AS c FROM doctors');
    if (doctorCount[0].c === 0) {
      for (const d of doctors) {
        await client.query(
          `INSERT INTO doctors (full_name, title, specialty, bio, image_url, experience_years, sort_order)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [d.full_name, d.title, d.specialty, d.bio, d.image_url, d.experience_years, d.sort_order]
        );
      }
      console.log(`Seeded ${doctors.length} doctors`);
    }

    const { rows: apptCount } = await client.query('SELECT COUNT(*)::int AS c FROM appointments');
    if (apptCount[0].c === 0) {
      const { rows: svcRows } = await client.query('SELECT id, price_from FROM services LIMIT 5');
      const { rows: docRows } = await client.query('SELECT id FROM doctors WHERE is_active = true ORDER BY sort_order ASC LIMIT 2');

      for (let i = 0; i < sampleAppointments.length; i++) {
        const a = sampleAppointments[i];
        const svc = svcRows[i % svcRows.length];
        const doc = docRows[i % docRows.length];
        await client.query(
          `INSERT INTO appointments
            (patient_name, phone, service_id, doctor_id, appointment_date, appointment_time, status, estimated_revenue, created_at)
           VALUES ($1, $2, $3, $4, CURRENT_DATE + $5::int, '09:00:00', $6, $7, NOW() + ($5::int * INTERVAL '1 day'))`,
          [a.patient_name, a.phone, svc.id, doc.id, a.days_offset, a.status, a.revenue || svc.price_from]
        );
      }
      console.log(`Seeded ${sampleAppointments.length} appointments`);
    }

    await client.query('COMMIT');
    console.log('Seed complete');
    console.log('Images reference:', IMG.logo);
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
