import { Hero, NewsletterBox, OurPolicy } from '../components';
import { LatestCollection } from '../components';
import { BestSeller } from '../components';

export default function Home() {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
}
