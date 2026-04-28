import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PhilosophySectionProps {
  videoSrc?: string;
}

export default function PhilosophySection({
  videoSrc = '/videos/sustainability.mp4',
}: PhilosophySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const body = bodyRef.current;
    const circle = circleRef.current;
    if (!section || !line1 || !line2 || !body || !circle) return;

    const triggers: ScrollTrigger[] = [];

    // Circle rotates slowly based on scroll
    const circleTl = gsap.to(circle, {
      rotation: 180,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    });
    if (circleTl.scrollTrigger) triggers.push(circleTl.scrollTrigger);

    // Text reveals
    gsap.set([line1, line2, body], { opacity: 0, y: 60 });

    const textTl = gsap.to([line1, line2, body], {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        toggleActions: 'play none none none',
      },
    });
    if (textTl.scrollTrigger) triggers.push(textTl.scrollTrigger);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0a0a0a] overflow-hidden flex items-center"
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Decorative rotating circle */}
      <div
        ref={circleRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full border border-white/[0.08] pointer-events-none"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] md:w-[28vw] md:h-[28vw] rounded-full border border-[#2d5a3d]/20 pointer-events-none" />

      {/* Text content */}
      <div className="relative z-10 w-full px-6 md:px-12 py-24">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#2d5a3d] text-xs font-semibold uppercase tracking-[0.2em] mb-8">
            Solterraform Philosophy
          </p>

          <div ref={line1Ref}>
            <h2 className="text-white text-[clamp(36px,7vw,96px)] font-bold uppercase leading-[0.9] tracking-[-0.02em]">
              PRESERVING
            </h2>
          </div>

          <div ref={line2Ref} className="mt-2">
            <h2 className="text-white text-[clamp(36px,7vw,96px)] font-bold uppercase leading-[0.9] tracking-[-0.02em]">
              THE FUTURE
            </h2>
          </div>

          <div ref={bodyRef} className="mt-12 max-w-xl">
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Fueling unique innovations for preserving and transforming the future
              of our world. Every solution begins with understanding the materials
              and energy that sustain us.
            </p>
            <p className="text-white/40 text-sm leading-relaxed">
              We do not see sustainability as a destination, but as a continuous
              journey of adaptation, innovation, and respect for the systems that
              make life possible.
            </p>

            <div className="mt-10 flex items-center gap-6">
              <div className="h-px w-16 bg-[#2d5a3d]" />
              <p className="text-[#2d5a3d] text-xs font-semibold uppercase tracking-[0.15em]">
                Transforming
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
