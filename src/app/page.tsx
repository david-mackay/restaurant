import { VideoBackground } from '@/components/ui/VideoBackground';
import { Button } from '@/components/ui/Button';
import { RESTAURANT_NAME, RESTAURANT_TAGLINE, VIDEO_BACKGROUND_URL } from '@/config';
import { PageWrapper } from '@/components/layout/PageWrapper';

export default function Home() {
  return (
    <PageWrapper>
      <VideoBackground videoSrc={VIDEO_BACKGROUND_URL} />
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl md:text-7xl font-serif mb-4 text-white">{RESTAURANT_NAME}</h1>
        <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl">
          {RESTAURANT_TAGLINE}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/food" variant="primary">
            Food Menu
          </Button>
          <Button href="/drinks" variant="primary">
            Drink Menu
          </Button>
        </div>
      </div>
      </PageWrapper>
  );
}