import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import Doctors from '../components/home/Doctors';
import Facility from '../components/home/Facility';
import Experience from '../components/home/Experience';
import CampaignCarousel from '../components/home/CampaignCarousel';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CampaignCarousel />
      <Experience />
      <Services />
      <Doctors />
      <Facility />
    </>
  );
}
