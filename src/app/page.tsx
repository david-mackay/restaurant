import { VideoBackground } from '@/components/ui/VideoBackground';
import { Button } from '@/components/ui/Button';
import { RESTAURANT_NAME, RESTAURANT_TAGLINE, VIDEO_BACKGROUND_URL } from '@/config';

export default function Home() {
  return (
    <>
      <VideoBackground videoSrc={VIDEO_BACKGROUND_URL} />
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-serif mb-4">{RESTAURANT_NAME}</h1>
        <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl">
          {RESTAURANT_TAGLINE}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/reservations" variant="primary">
            Reserve a Table
          </Button>
          <Button href="/food" variant="outline">
            View Menu
          </Button>
        </div>
      </div>
    </>
  );
}