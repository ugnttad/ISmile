import dotenv from 'dotenv';
import app from '../src/app.js';
import * as authService from '../src/services/authService.js';

dotenv.config();

// Initialize admin user on startup
(async () => {
  try {
    await authService.ensureAdminUser();
    console.log('Admin user ready');
  } catch (err) {
    console.warn('Could not ensure admin user:', err.message);
  }
})();

export default app;
