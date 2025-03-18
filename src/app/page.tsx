import { VideoBackground } from '@/components/ui/VideoBackground';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <>
      <VideoBackground videoSrc="/yes.mp4" />
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-serif mb-4">SPEAKEASY</h1>
        <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl">
          A sophisticated dining experience with craft cocktails and delicious food.
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