import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import svgPaths from '../../imports/svg-zxyqwpfxuq';

// SWIFTROOMS Logo Component (for profile picture)
function SWIFTROOMSLogo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 121.747 121.532" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={svgPaths.p17a3de00} fill="#007969" />
      <path d={svgPaths.p235e3330} fill="#007969" />
    </svg>
  );
}

interface InstagramVideoPlayerProps {
  videoUrl: string;
  caption: string;
  hashtags: string[];
  likes?: string;
  comments?: string;
  shares?: string;
  isInstagramEmbed?: boolean;
}

// Story-style chrome overlaid on the reel (progress bars, handle, caption, hashtags)
function ReelOverlay({ caption, hashtags }: { caption: string; hashtags: string[] }) {
  return (
    <>
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.4)] via-transparent to-[rgba(0,0,0,0.6)] pointer-events-none" />

      {/* Story Progress Bars */}
      <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className={`h-0.5 flex-1 rounded-full ${index <= 1 ? 'bg-white' : 'bg-white/30'}`}
          />
        ))}
      </div>

      {/* Top Header - Handle only - Hidden on Mobile */}
      <div className="hidden lg:flex absolute top-8 left-4 right-4 items-center gap-3 z-10">
        {/* Profile Picture */}
        <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#FDC700] via-[#F633A9] to-[#9810FA] p-0.5">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-1.5">
            <SWIFTROOMSLogo className="w-full h-full" />
          </div>
        </div>

        {/* Username */}
        <div className="flex-1">
          <p className="font-['Barlow',sans-serif] text-white text-sm font-normal leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            @swiftrooms
          </p>
        </div>
      </div>

      {/* Bottom Content - Handle, Caption, Hashtags - Hidden on Mobile */}
      <div className="hidden lg:block absolute bottom-4 left-4 right-4 z-10">
        <div className="space-y-2">
          {/* Username */}
          <p className="font-['Barlow',sans-serif] text-white text-sm font-semibold leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            @swiftrooms
          </p>

          {/* Caption */}
          <p className="font-['Barlow',sans-serif] text-white text-sm font-normal leading-relaxed line-clamp-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            {caption}
          </p>

          {/* Hashtags */}
          <div className="flex gap-2 flex-wrap">
            {hashtags.map((tag, index) => (
              <span
                key={index}
                className="bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full text-white/90 text-xs font-['Barlow',sans-serif] font-normal leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function InstagramVideoPlayer({
  videoUrl,
  caption,
  hashtags,
  isInstagramEmbed = false,
}: InstagramVideoPlayerProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Autoplay on mount - automatic without any interaction
  useEffect(() => {
    if (!isInstagramEmbed) {
      const video = videoRef.current;
      if (video) {
        // Set video properties for autoplay
        video.muted = true; // Must be muted for autoplay to work
        video.playsInline = true;
        video.loop = true;

        // Attempt autoplay immediately
        const playPromise = video.play();

        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay was prevented - this is expected behavior in some browsers
          });
        }
      }
    }
  }, [videoUrl, isInstagramEmbed]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  // Shared responsive portrait-reel wrapper (9:16 aspect ratio)
  const wrapperClasses =
    'relative bg-black rounded-3xl overflow-hidden shadow-[0px_24px_48px_-12px_rgba(0,0,0,0.25)] w-full max-w-[320px] lg:max-w-[360px] aspect-[9/16]';

  // If it's a YouTube embed, render with iframe
  if (isInstagramEmbed) {
    // Extract video ID from URL for playlist parameter (required for loop to work)
    const videoId = videoUrl.split('/').pop()?.split('?')[0] || '';

    return (
      <div className={wrapperClasses}>
        {/* YouTube iframe fills the aspect-ratio wrapper */}
        <iframe
          src={`${videoUrl}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&modestbranding=1&playsinline=1&rel=0&showinfo=0&enablejsapi=1&origin=${window.location.origin}`}
          className="absolute inset-0 w-full h-full object-cover border-none overflow-hidden"
          title="Instagram Reel Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />

        <ReelOverlay caption={caption} hashtags={hashtags} />
      </div>
    );
  }

  return (
    <div className={wrapperClasses}>
      {/* Video fills the aspect-ratio wrapper */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="absolute inset-0 w-full h-full object-cover object-center"
        loop
        muted
        playsInline
        autoPlay
      />

      <ReelOverlay caption={caption} hashtags={hashtags} />

      {/* Mute/Unmute Button - sits below the header */}
      <button
        onClick={toggleMute}
        className="absolute top-20 right-4 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center z-10 hover:bg-black/60 transition-colors pointer-events-auto"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-white" />
        ) : (
          <Volume2 className="w-4 h-4 text-white" />
        )}
      </button>
    </div>
  );
}
