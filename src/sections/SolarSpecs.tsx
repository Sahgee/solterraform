import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SPECS = [
  { label: 'Target Efficiency', value: '34%+', detail: 'Perovskite-silicon tandem cell architecture' },
  { label: 'Voltage Regulation', value: '800V DC', detail: 'Next-gen power optimizers for grid-scale arrays' },
  { label: 'Degradation Control', value: '< 0.2%', detail: 'Advanced encapsulant and passivation layers' },
  { label: 'Panel Output', value: '700W+', detail: 'Bifacial modules with tracking integration' },
  { label: 'Thermal Resilience', value: '-50°C to +100°C', detail: 'Extended operating envelope testing' },
  { label: 'Storm Endurance', value: '300 km/h', detail: 'Aerodynamic frame and mounting systems' },
  { label: 'Impact Resistance', value: '50 mm', detail: 'Reinforced tempered glass with EVA buffers' },
  { label: 'Structural Load', value: '7200 Pa', detail: 'Heavy snow and ice loading certification' },
];

export default function SolarSpecs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const items = itemsRef.current.filter(Boolean);
    if (!section || items.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    items.forEach((item, i) => {
      gsap.set(item, { opacity: 0, y: 40 });
      const tl = gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: i * 0.08,
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-white py-24 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-20">
          <p className="text-[#2d5a3d] text-xs font-semibold uppercase tracking-[0.15em] mb-4">
            Research & Development
          </p>
          <h2 className="text-[#0a0a0a] text-[clamp(32px,5vw,56px)] font-bold uppercase leading-[0.95] tracking-[-0.02em]">
            The Future of Solar Voltage Systems
          </h2>
          <p className="text-[#0a0a0a]/50 text-sm mt-4 max-w-lg leading-relaxed">
            Our next-generation photovoltaic architecture will integrate perovskite-silicon 
            tandem cells with advanced voltage optimization modules, aiming to redefine 
            how solar energy is captured, regulated, and distributed across global power grids.
          </p>
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#0a0a0a]/10">
          {SPECS.map((spec, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className="bg-white p-8 group hover:bg-[#f8f8f8] transition-colors duration-300"
            >
              <p className="text-[#0a0a0a]/30 text-xs font-semibold uppercase tracking-wider mb-3">
                {spec.label}
              </p>
              <p className="text-[#0a0a0a] text-3xl font-bold tracking-tight mb-2">
                {spec.value}
              </p>
              <p className="text-[#0a0a0a]/40 text-xs leading-relaxed">
                {spec.detail}
              </p>
              <div className="mt-6 h-px w-8 bg-[#2d5a3d] group-hover:w-16 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-16 flex items-center justify-between border-t border-[#0a0a0a]/10 pt-8">
          <p className="text-[#0a0a0a]/40 text-xs uppercase tracking-wider">
            In development — projected certification 2026
          </p>
          <p className="text-[#2d5a3d] text-xs font-semibold uppercase tracking-wider">
            Advancing Through Research
          </p>
        </div>
      </div>
    </section>
  );
}
