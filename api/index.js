import app from '../BE/src/app.js';
import * as authService from '../BE/src/services/authService.js';

let adminReady;

async function ensureStartup() {
  if (!adminReady) {
    adminReady = authService.ensureAdminUser().catch((err) => {
      console.warn('Could not ensure admin user:', err.message);
    });
  }

  return adminReady;
}

export default async function handler(req, res) {
  await ensureStartup();
  return app(req, res);
}
