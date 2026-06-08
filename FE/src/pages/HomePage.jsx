import Hero from '../components/home/Hero';
import VideoIntro from '../components/home/VideoIntro';
import Experience from '../components/home/Experience';
import CampaignCarousel from '../components/home/CampaignCarousel';

export default function HomePage() {
  return (
    <>
      <Hero />
      <VideoIntro />
      <CampaignCarousel />
      <Experience />
    </>
  );
}
