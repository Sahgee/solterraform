import { useRef, useState, useEffect } from 'react';

interface VideoHeroProps {
  videoSrc: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  overlayPosition?: 'center' | 'bottom-center' | 'top-left' | 'left-vertical';
  showNumber?: string;
  framed?: boolean;
  textBehind?: boolean;
}

export default function VideoHero({
  videoSrc,
  title,
  subtitle,
  ctaText,
  ctaHref = '#',
  overlayPosition = 'center',
  showNumber,
  framed = false,
  textBehind = false,
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setLoaded(true);
    video.addEventListener('canplaythrough', handleCanPlay);
    if (video.readyState >= 3) setLoaded(true);

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
    };
  }, []);

  const containerClass = framed
    ? 'absolute inset-5 md:inset-8 overflow-hidden'
    : 'absolute inset-0 overflow-hidden';

  const renderOverlay = () => {
    switch (overlayPosition) {
      case 'center':
        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            {title && (
              <h1 className="text-white text-[clamp(40px,8vw,80px)] font-bold uppercase leading-[0.9] tracking-[-0.02em]">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-white/80 text-xs font-semibold uppercase tracking-[0.15em] mt-4">
                {subtitle}
              </p>
            )}
            {ctaText && (
              <a
                href={ctaHref}
                className="pill-btn border-white text-white mt-10 inline-block"
              >
                {ctaText}
              </a>
            )}
          </div>
        );
      case 'bottom-center':
        return (
          <div className="absolute inset-x-0 bottom-16 flex flex-col items-center text-center px-6">
            {title && (
              <h1 className="text-white text-[clamp(40px,8vw,80px)] font-bold uppercase leading-[0.9] tracking-[-0.02em]">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-white/80 text-xs font-semibold uppercase tracking-[0.15em] mt-4">
                {subtitle}
              </p>
            )}
            {ctaText && (
              <a
                href={ctaHref}
                className="pill-btn border-white text-white mt-10 inline-block"
              >
                {ctaText}
              </a>
            )}
          </div>
        );
      case 'top-left':
        return (
          <div className="absolute top-24 left-6 md:left-12">
            {title && (
              <h1 className="text-white text-[clamp(32px,6vw,64px)] font-bold uppercase leading-[0.9] tracking-[-0.02em]">
                {title}
              </h1>
            )}
            {showNumber && (
              <p className="text-white/60 text-xs font-semibold uppercase tracking-[0.15em] mt-2">
                {showNumber}
              </p>
            )}
          </div>
        );
      case 'left-vertical':
        return (
          <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2">
            {title && (
              <h1
                className="text-white text-[clamp(32px,5vw,56px)] font-bold uppercase leading-[0.9] tracking-[-0.02em]"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
              >
                {title}
              </h1>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Loading state */}
      {!loaded && (
        <div className="absolute inset-0 bg-[#0a0a0a] z-10 flex items-center justify-center">
          <div className="text-white/40 text-xs font-semibold uppercase tracking-[0.2em] animate-pulse">
            Loading
          </div>
        </div>
      )}

      {/* Video background */}
      <div className={containerClass}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease' }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Text behind effect */}
      {textBehind && title && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1
            className="text-white/[0.12] text-[clamp(80px,18vw,280px)] font-bold uppercase leading-none tracking-[-0.03em] select-none"
            style={{ mixBlendMode: 'overlay' }}
          >
            {title}
          </h1>
        </div>
      )}

      {/* Overlay content */}
      {renderOverlay()}
    </section>
  );
}
