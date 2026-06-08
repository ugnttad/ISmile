const CDN = 'https://nhakhoaismile.vn/wp-content';
const CAMPAIGN_ASSETS = '/campaigns';
const SERVICE_ASSETS = '/services';

export const IMAGES = {
  logo: `${CDN}/uploads/2025/11/logo.svg`,
  logoWhite: `${CDN}/smush-webp/2025/11/logo-white-1.png.webp`,
  hero: `${CDN}/smush-webp/2026/06/ChatGPT-Image-14_03_35-1-thg-6-2026.png.webp`,
  banner: `${CDN}/smush-webp/2026/04/BANNER-WEB.jpg.webp`,
};

export const CLINIC_IMAGES = {
  treatmentRoom: `${CAMPAIGN_ASSETS}/treatment-room.jpg`,
  reception: `${CAMPAIGN_ASSETS}/feedback-family-01.jpg`,
  lobby: `${CDN}/uploads/2026/01/1920x1080.png`,
  rose: `${CAMPAIGN_ASSETS}/feedback-smile-04.jpg`,
  videoPlaceholder: `${CAMPAIGN_ASSETS}/feedback-smile-02.jpg`,
};

export const SERVICE_IMAGES = {
  implant: `${SERVICE_ASSETS}/implant.webp`,
  braces: `${SERVICE_ASSETS}/nieng-rang.webp`,
  composite: `${SERVICE_ASSETS}/tram-rang-composite.webp`,
  crown: `${CDN}/smush-webp/2026/02/trongrangsu.jpg.webp`,
  veneer: `${SERVICE_ASSETS}/dan-su-veneer.webp`,
};

export const DOCTOR_IMAGES = {
  leNhi: `${CDN}/smush-webp/2026/02/bsLeNhi.png.webp`,
  anhDung: `${CDN}/smush-webp/2026/02/Anh-Dung-Ismile.png.webp`,
};

export const CAMPAIGN_IMAGES = [
  {
    type: 'event',
    src: `${CAMPAIGN_ASSETS}/campaign-ngay-hoi-rang-xinh.jpg`,
    title: 'Ngày hội răng xinh 1/6',
    kicker: 'Sự kiện thiếu nhi',
    desc: 'Không khí tươi sáng, nhiều ưu đãi và quà tặng cho bé khi thăm khám tại iSmile.',
    fit: 'contain',
    accent: 'from-sky-400 to-cyan-500',
  },
  {
    type: 'community',
    src: `${CAMPAIGN_ASSETS}/campaign-hoi-sinh-nu-cuoi.jpg`,
    title: 'Hồi sinh nụ cười',
    kicker: 'Chương trình cộng đồng',
    desc: 'Câu chuyện hỗ trợ khách hàng lớn tuổi và các hoàn cảnh cần phục hồi khả năng ăn nhai.',
    fit: 'contain',
    accent: 'from-blue-700 to-amber-400',
  },
  {
    type: 'treatment',
    src: `${CAMPAIGN_ASSETS}/campaign-chua-tuy-01.jpg`,
    title: 'Chữa tủy nhẹ nhàng',
    kicker: 'Điều trị bảo tồn',
    desc: 'Poster truyền thông nổi bật tinh thần tư vấn kỹ, công nghệ hiện đại và giữ răng thật.',
    fit: 'contain',
    accent: 'from-blue-600 to-sky-300',
  },
  {
    type: 'treatment',
    src: `${CAMPAIGN_ASSETS}/campaign-chua-tuy-02.jpg`,
    title: 'Giữ trọn răng gốc',
    kicker: 'Bảo tồn răng thật',
    desc: 'Biến thể poster dùng cho carousel sự kiện, giúp trang có nhịp chuyển động sinh động hơn.',
    fit: 'contain',
    accent: 'from-cyan-500 to-blue-700',
  },
  {
    type: 'result',
    src: `${CAMPAIGN_ASSETS}/before-after-veneer.jpg`,
    title: 'Trước và sau thẩm mỹ',
    kicker: 'Kết quả điều trị',
    desc: 'Một lát cắt trực quan về thay đổi màu răng, phù hợp để khách hàng xem nhanh hiệu quả.',
    fit: 'contain',
    accent: 'from-slate-500 to-sky-500',
  },
  {
    type: 'space',
    src: `${CAMPAIGN_ASSETS}/treatment-room.jpg`,
    title: 'Phòng điều trị thực tế',
    kicker: 'Không gian lâm sàng',
    desc: 'Hình ảnh thật trong phòng khám, đặt cạnh poster để trang bớt khuôn mẫu và đáng tin hơn.',
    fit: 'cover',
    accent: 'from-cyan-500 to-blue-600',
  },
  {
    type: 'feedback',
    src: `${CAMPAIGN_ASSETS}/feedback-family-01.jpg`,
    title: 'Khách hàng sau implant',
    kicker: 'Feedback khách thật',
    desc: 'Khoảnh khắc khách hàng cùng bác sĩ Anh Dũng tại khu tiếp đón iSmile.',
    fit: 'contain',
    accent: 'from-sky-500 to-blue-700',
  },
  {
    type: 'feedback',
    src: `${CAMPAIGN_ASSETS}/feedback-smile-02.jpg`,
    title: 'Răng khỏe cùng iSmile',
    kicker: 'Khoảnh khắc tại phòng khám',
    desc: 'Ảnh feedback gần gũi, giúp phần social proof tự nhiên hơn thay vì chỉ dùng poster.',
    fit: 'contain',
    accent: 'from-cyan-400 to-blue-600',
  },
  {
    type: 'feedback',
    src: `${CAMPAIGN_ASSETS}/feedback-smile-03.jpg`,
    title: 'Cấy implant không đau',
    kicker: 'Khách hàng quốc tế',
    desc: 'Một nhịp hình ảnh đời thường, sáng và thật để tăng cảm giác tin cậy cho website.',
    fit: 'contain',
    accent: 'from-sky-400 to-indigo-500',
  },
  {
    type: 'feedback',
    src: `${CAMPAIGN_ASSETS}/feedback-smile-04.jpg`,
    title: 'Răng sứ thẩm mỹ',
    kicker: 'Nụ cười sau điều trị',
    desc: 'Feedback khách hàng sau khi hoàn tất dịch vụ thẩm mỹ nụ cười tại iSmile.',
    fit: 'contain',
    accent: 'from-cyan-500 to-sky-700',
  },
  {
    type: 'feedback',
    src: `${CAMPAIGN_ASSETS}/feedback-smile-05.jpg`,
    title: 'Khách hàng thân thiện',
    kicker: 'Social proof',
    desc: 'Ảnh thật được xử lý bằng khung blur mềm, giữ sự sáng sủa và cao cấp.',
    fit: 'contain',
    accent: 'from-blue-500 to-cyan-500',
  },
  {
    type: 'feedback',
    src: `${CAMPAIGN_ASSETS}/feedback-smile-06.jpg`,
    title: 'Một nụ cười rất iSmile',
    kicker: 'Feedback khách hàng',
    desc: 'Kết thúc carousel bằng khoảnh khắc tươi, nhẹ và giàu cảm xúc tại quầy tiếp đón.',
    fit: 'contain',
    accent: 'from-sky-500 to-blue-700',
  },
];
