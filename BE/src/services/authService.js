import * as userRepo from '../repositories/userRepository.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { signToken } from '../utils/jwt.js';

export async function login(email, password) {
  const user = await userRepo.findByEmail(email);
  if (!user || !verifyPassword(password, user.password_hash)) {
    const err = new Error('Email hoặc mật khẩu không đúng');
    err.status = 401;
    throw err;
  }

  const token = signToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      role: user.role,
    },
  };
}

export async function getProfile(userId) {
  const user = await userRepo.findById(userId);
  if (!user) {
    const err = new Error('Người dùng không tồn tại');
    err.status = 404;
    throw err;
  }
  return {
    id: user.id,
    email: user.email,
    fullName: user.full_name,
    role: user.role,
  };
}

export async function ensureAdminUser() {
  const email = process.env.ADMIN_EMAIL || 'admin@nhakhoaismile.vn';
  const existing = await userRepo.findByEmail(email);
  if (existing) return existing;

  const password = process.env.ADMIN_PASSWORD || 'Admin@123';
  return userRepo.create({
    email,
    passwordHash: hashPassword(password),
    fullName: process.env.ADMIN_NAME || 'Quản trị viên',
    role: 'admin',
  });
}
