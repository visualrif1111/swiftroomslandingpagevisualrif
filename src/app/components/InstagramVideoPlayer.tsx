import { useState, useRef, useEffect } from 'react';
import { Instagram, Volume2, VolumeX } from 'lucide-react';
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

  // If it's a YouTube embed, render with iframe
  if (isInstagramEmbed) {
    // Extract video ID from URL for playlist parameter (required for loop to work)
    const videoId = videoUrl.split('/').pop()?.split('?')[0] || '';
    
    return (
      <div className="relative bg-black rounded-[22.5px] overflow-hidden shadow-[0px_24px_48px_-12px_rgba(0,0,0,0.25)] w-full max-w-[320px] lg:max-w-[360px] aspect-[9/16]">
        {/* YouTube iframe */}
        <iframe
          src={`${videoUrl}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&modestbranding=1&playsinline=1&rel=0&showinfo=0&enablejsapi=1&origin=${window.location.origin}`}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          title="Instagram Reel Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            border: 'none',
            overflow: 'hidden',
          }}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.4)] via-transparent to-[rgba(0,0,0,0.6)] pointer-events-none" />

        {/* Story Progress Bars */}
        <div className="absolute top-[15px] left-[15px] right-[15px] flex gap-[3.75px] z-10">
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className={`h-[2px] flex-1 rounded-full ${
                index <= 1 ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Top Header - Only Handle and Follow - Hidden on Mobile */}
        <div className="hidden lg:flex absolute top-[30px] left-[15px] right-[15px] items-center gap-[11px] z-10">
          {/* Profile Picture */}
          <div className="relative w-[37.5px] h-[37.5px] rounded-full bg-gradient-to-br from-[#FDC700] via-[#F633A9] to-[#9810FA] p-[2px]">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-[6px]">
              <SWIFTROOMSLogo className="w-full h-full" />
            </div>
          </div>

          {/* Username */}
          <div className="flex-1">
            <p className="font-['Barlow',sans-serif] text-white text-[13px] font-normal leading-[18.75px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              @swiftrooms
            </p>
          </div>
        </div>

        {/* Bottom Content - Only Handle, Caption, and Hashtags - Hidden on Mobile */}
        <div className="hidden lg:block absolute bottom-[15px] left-[15px] right-[15px] z-10">
          <div className="space-y-[7.5px]">
            {/* Username */}
            <p className="font-['Barlow',sans-serif] text-white text-[13px] font-semibold leading-[18.75px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              @swiftrooms
            </p>

            {/* Caption */}
            <p className="font-['Barlow',sans-serif] text-white text-[13px] font-normal leading-[21.33px] max-w-[314px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              {caption}
            </p>

            {/* Hashtags */}
            <div className="flex gap-[7.5px] flex-wrap">
              {hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-white/10 backdrop-blur-sm px-[7.5px] py-[3.75px] rounded-full text-white/90 text-[11px] font-['Barlow',sans-serif] font-normal leading-[15px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-black rounded-[22.5px] overflow-hidden shadow-[0px_24px_48px_-12px_rgba(0,0,0,0.25)] w-full max-w-[320px] lg:max-w-[360px] aspect-[9/16]">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted
        playsInline
        autoPlay
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.4)] via-transparent to-[rgba(0,0,0,0.6)] pointer-events-none" />

      {/* Story Progress Bars */}
      <div className="absolute top-[15px] left-[15px] right-[15px] flex gap-[3.75px] z-10">
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className={`h-[2px] flex-1 rounded-full ${
              index <= 1 ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Top Header - Only Handle and Follow - Hidden on Mobile */}
      <div className="hidden lg:flex absolute top-[30px] left-[15px] right-[15px] items-center gap-[11px] z-10">
        {/* Profile Picture */}
        <div className="relative w-[37.5px] h-[37.5px] rounded-full bg-gradient-to-br from-[#FDC700] via-[#F633A9] to-[#9810FA] p-[2px]">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-[6px]">
            <SWIFTROOMSLogo className="w-full h-full" />
          </div>
        </div>

        {/* Username */}
        <div className="flex-1">
          <p className="font-['Barlow',sans-serif] text-white text-[13px] font-normal leading-[18.75px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            @swiftrooms
          </p>
        </div>
      </div>

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute top-[75px] right-[15px] w-[30px] h-[30px] bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center z-10 hover:bg-black/60 transition-colors pointer-events-auto"
      >
        {isMuted ? (
          <VolumeX className="w-[15px] h-[15px] text-white" />
        ) : (
          <Volume2 className="w-[15px] h-[15px] text-white" />
        )}
      </button>

      {/* Bottom Content - Only Handle, Caption, and Hashtags - Hidden on Mobile */}
      <div className="hidden lg:block absolute bottom-[15px] left-[15px] right-[15px] z-10">
        <div className="space-y-[7.5px]">
          {/* Username */}
          <p className="font-['Barlow',sans-serif] text-white text-[13px] font-semibold leading-[18.75px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            @swiftrooms
          </p>

          {/* Caption */}
          <p className="font-['Barlow',sans-serif] text-white text-[13px] font-normal leading-[21.33px] max-w-[314px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            {caption}
          </p>

          {/* Hashtags */}
          <div className="flex gap-[7.5px] flex-wrap">
            {hashtags.map((tag, index) => (
              <span
                key={index}
                className="bg-white/10 backdrop-blur-sm px-[7.5px] py-[3.75px] rounded-full text-white/90 text-[11px] font-['Barlow',sans-serif] font-normal leading-[15px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}