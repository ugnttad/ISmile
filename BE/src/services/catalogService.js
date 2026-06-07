import * as serviceRepo from '../repositories/serviceRepository.js';
import * as doctorRepo from '../repositories/doctorRepository.js';

export async function getServices(featuredOnly = false) {
  return serviceRepo.findAll({ featuredOnly });
}

export async function getDoctors() {
  return doctorRepo.findAll();
}
