import dotenv from 'dotenv';
import app from './app.js';
import * as authService from './services/authService.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await authService.ensureAdminUser();
    console.log('Admin user ready');
  } catch (err) {
    console.warn('Could not ensure admin user (DB may not be connected):', err.message);
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
