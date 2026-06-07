import * as catalogService from '../services/catalogService.js';

export async function getServices(req, res, next) {
  try {
    const featuredOnly = req.query.featured === 'true';
    const services = await catalogService.getServices(featuredOnly);
    res.json({ success: true, data: services });
  } catch (err) {
    next(err);
  }
}

export async function getDoctors(req, res, next) {
  try {
    const doctors = await catalogService.getDoctors();
    res.json({ success: true, data: doctors });
  } catch (err) {
    next(err);
  }
}
