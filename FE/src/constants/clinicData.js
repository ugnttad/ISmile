import { SERVICE_CATALOG } from './services';
import { DOCTOR_IMAGES } from './images';

export const ACTIVE_DOCTOR_PROFILES = [
  {
    id: 'le-nhi',
    full_name: 'BS. Lê Nhi',
    title: 'Bác sĩ Chuyên khoa I',
    specialty: 'Nha khoa tổng quát & Thẩm mỹ',
    experience_years: 10,
    image_url: DOCTOR_IMAGES.leNhi,
  },
  {
    id: 'anh-dung',
    full_name: 'BS. Anh Dũng',
    title: 'Bác sĩ Chuyên khoa II',
    specialty: 'Cấy ghép Implant & Phẫu thuật',
    experience_years: 12,
    image_url: DOCTOR_IMAGES.anhDung,
  },
];

export const BOOKING_SERVICES = SERVICE_CATALOG.map((service) => ({
  id: service.slug,
  name: service.name,
}));
