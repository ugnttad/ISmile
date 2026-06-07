import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';

const SALT_LENGTH = 16;
const KEY_LENGTH = 64;

export function hashPassword(password) {
  const salt = randomBytes(SALT_LENGTH);
  const hash = scryptSync(password, salt, KEY_LENGTH);
  return `${salt.toString('hex')}:${hash.toString('hex')}`;
}

export function verifyPassword(password, storedHash) {
  const [saltHex, hashHex] = storedHash.split(':');
  if (!saltHex || !hashHex) return false;

  const salt = Buffer.from(saltHex, 'hex');
  const stored = Buffer.from(hashHex, 'hex');
  const derived = scryptSync(password, salt, KEY_LENGTH);

  return timingSafeEqual(stored, derived);
}
