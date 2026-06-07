import * as authService from '../services/authService.js';

export async function login(req, res, next) {
  try {
    const { email, password } = req.validated;
    const result = await authService.login(email, password);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function me(req, res, next) {
  try {
    const profile = await authService.getProfile(req.user.id);
    res.json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
}
