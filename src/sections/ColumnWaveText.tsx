import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEXT_LINES = [
  'PERFORMANCE METRICS',
  'EFFICIENCY  —  24.8%',
  'DEGRADATION  —  0.4%',
  'OUTPUT  —  500W',
  'TEMP RANGE  —  -40C',
  'WIND LOAD  —  240KM/H',
  'HAIL IMPACT  —  35MM',
  'SNOW LOAD  —  5400PA',
  'WARRANTY  —  30 YEARS',
];

export default function ColumnWaveText() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const columns = columnsRef.current;
    if (!section || columns.some((c) => !c)) return;

    const triggers: ScrollTrigger[] = [];

    columns.forEach((col, i) => {
      const index = i - 2; // center column = 0
      const yOffset = index * 60;
      const scrubAmount = 0.5 + Math.abs(index) * 0.3;

      // Set initial offset
      gsap.set(col, { y: yOffset });

      const tl = gsap.to(col, {
        y: -yOffset,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: scrubAmount,
        },
      });

      if (tl.scrollTrigger) {
        triggers.push(tl.scrollTrigger);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const renderText = () => (
    <div className="flex flex-col items-center gap-3 py-6">
      {TEXT_LINES.map((line, i) => (
        <div
          key={i}
          className="text-[clamp(13px,2vw,22px)] font-mono font-medium uppercase tracking-[0.1em] whitespace-nowrap"
          style={{ color: i === 0 ? '#2d5a3d' : '#0a0a0a' }}
        >
          {line}
        </div>
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center"
    >
      {/* Section label */}
      <div className="absolute top-8 left-6 md:left-12">
        <p className="text-[#0a0a0a]/30 text-xs font-semibold uppercase tracking-[0.15em]">
          Technical Specifications
        </p>
      </div>

      {/* 5-column parallax grid */}
      <div className="flex w-full h-full items-center justify-center overflow-hidden px-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) columnsRef.current[i] = el;
            }}
            className="flex-1 flex flex-col items-center justify-center overflow-hidden"
            style={{
              willChange: 'transform',
              opacity: i === 2 ? 1 : 0.15 + (1 - Math.abs(i - 2)) * 0.2,
              filter: i === 2 ? 'none' : 'blur(2px)',
            }}
          >
            <div className="flex flex-col items-center">
              {renderText()}
              {renderText()}
            </div>
          </div>
        ))}
      </div>

      {/* Center column highlight bars */}
      <div className="absolute inset-y-0 left-1/3 right-1/3 border-x border-[#0a0a0a]/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[200px] bg-[#2d5a3d]/20" />
    </section>
  );
}
