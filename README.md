# Nha Khoa iSmile — Web Application

Ứng dụng web phòng khám nha khoa (clone nâng cấp từ [nhakhoaismile.vn](https://nhakhoaismile.vn)) với trang công khai và hệ thống quản trị.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 18, Vite, React Router, Tailwind CSS, Lucide React, Recharts |
| Backend | Node.js, Express, Helmet, CORS, Morgan, Zod, JWT |
| Database | PostgreSQL (Neon), `pg` raw SQL, pgcrypto |
| Auth | JWT + `crypto.scrypt` password hashing |

## Cấu trúc

```
iSmile/
├── FE/          # React client (public + admin)
├── BE/          # Express REST API
└── README.md
```

## Yêu cầu

- Node.js 18+
- PostgreSQL (khuyến nghị [Neon Console](https://console.neon.tech))

## Cài đặt

### 1. Database (Neon)

1. Tạo project PostgreSQL trên Neon Console
2. Copy connection string

### 2. Backend

```bash
cd BE
cp .env.example .env
# Chỉnh DATABASE_URL, JWT_SECRET trong .env

npm install
npm run db:migrate
npm run db:seed
npm run dev
```

API chạy tại `http://localhost:5000`

### 3. Frontend

```bash
cd FE
cp .env.example .env
npm install
npm run dev
```

Web chạy tại `http://localhost:5173`

## Tài khoản Admin (mặc định)

- **Email:** `admin@nhakhoaismile.vn`
- **Mật khẩu:** `Admin@123`

## Tính năng

### Trang công khai
- Hero banner, dịch vụ nổi bật, đội ngũ bác sĩ, cơ sở vật chất
- Hình ảnh lấy trực tiếp từ nhakhoaismile.vn
- Form đặt lịch khám online

### Admin Dashboard
- Đăng nhập JWT
- Quản lý lịch hẹn (lọc, cập nhật trạng thái)
- Biểu đồ thống kê bệnh nhân & doanh thu (Recharts)

## API Endpoints

| Method | Path | Mô tả |
|--------|------|-------|
| GET | `/api/health` | Health check |
| GET | `/api/services` | Danh sách dịch vụ |
| GET | `/api/doctors` | Danh sách bác sĩ |
| POST | `/api/appointments` | Đặt lịch (public) |
| POST | `/api/auth/login` | Đăng nhập admin |
| GET | `/api/appointments` | Danh sách lịch hẹn (auth) |
| PATCH | `/api/appointments/:id/status` | Cập nhật trạng thái (auth) |
| GET | `/api/appointments/dashboard/stats` | Thống kê dashboard (auth) |
