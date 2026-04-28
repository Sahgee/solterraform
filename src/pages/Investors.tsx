import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Investors() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = contentRef.current?.querySelectorAll('.investor-section');
    if (!sections) return;
    const triggers: ScrollTrigger[] = [];
    sections.forEach((section) => {
      gsap.set(section, { opacity: 0, y: 40 });
      const tl = gsap.to(section, {
        opacity: 1, y: 0, duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none none' },
      });
      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <main className="w-full bg-[#0F1419] min-h-screen">
      {/* Hero */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
        <video
          autoPlay muted loop playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/videos/continental-network.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1419]/70 via-[#0F1419]/80 to-[#0F1419]" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24">
          <p className="eyebrow mb-6">Solterix Holding Inc.</p>
          <h1 className="text-[#F4F1EA] text-[clamp(32px,6vw,64px)] font-bold leading-[0.95] tracking-[-0.02em] mb-4">
            SOLTERRAFORM
          </h1>
          <p className="text-[#2A9D8F] text-lg font-medium mb-2">The Asphalt Circularity Platform</p>
          <p className="text-[#F4F1EA]/40 text-sm mb-8">admin@solterixinc.com</p>
          <a
            href="mailto:admin@solterixinc.com?subject=Investor%20Deck%20Request"
            className="btn-primary inline-block"
          >
            Request Full Investor Deck
          </a>
        </div>
      </section>

      {/* Content */}
      <div ref={contentRef} className="max-w-4xl mx-auto px-6 md:px-12 py-16 space-y-20">

        {/* Thesis */}
        <section className="investor-section border-l-2 border-[#E9C46A] pl-8">
          <p className="eyebrow mb-4">The Thesis in One Sentence</p>
          <p className="text-[#F4F1EA] text-lg md:text-xl leading-relaxed font-serif-accent italic">
            Solterraform will transform the world's 40,000+ kilometers of major logistics corridors
            and billions of square meters of corporate pavement from passive heat sinks into active,
            distributed renewable energy networks—starting with a funded pilot that validates the
            model for global replication.
          </p>
        </section>

        {/* Problem */}
        <section className="investor-section">
          <p className="eyebrow mb-6">The Problem: Stranded Energy</p>
          <div className="space-y-4">
            {[
              'Pavement surfaces currently absorb and waste the majority of solar radiation they receive, amplifying urban heat islands and accelerating material degradation.',
              'Corporations spend billions cooling buildings and logistics hubs while the asphalt surrounding them radiates waste heat.',
              'Existing solar solutions focus on rooftops and fields, ignoring the vast horizontal infrastructure already embedded in global supply chains.',
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="text-[#E9C46A] text-sm font-bold mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-[#F4F1EA]/70 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Solution */}
        <section className="investor-section">
          <p className="eyebrow mb-6">The Solution: The Asphalt Circularity Platform</p>
          <p className="text-[#F4F1EA]/70 text-sm leading-relaxed mb-8">
            Solterraform will not manufacture in isolation. We will operate as a venture studio
            and network orchestrator, integrating three complementary pavement-energy pathways:
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              {
                title: 'Thermal Harvesting (PPFHS)',
                mechanism: 'Fluid circulation through porous asphalt voids',
                output: 'Stored thermal energy + surface cooling up to 23.2°C',
                accent: '#2A9D8F',
              },
              {
                title: 'Thermoelectric Integration',
                mechanism: 'Temperature gradient harvesting between pavement layers',
                output: 'Continuous DC for sensors, lighting, edge nodes',
                accent: '#E9C46A',
              },
              {
                title: 'Photovoltaic Surfacing',
                mechanism: 'Translucent/embedded PV wearing courses',
                output: 'Direct grid or battery power',
                accent: '#8AB17D',
              },
            ].map((item, i) => (
              <div key={i} className="glass-card p-6" style={{ borderTop: `3px solid ${item.accent}` }}>
                <h4 className="text-[#F4F1EA] text-sm font-bold mb-3">{item.title}</h4>
                <p className="text-[#F4F1EA]/50 text-xs uppercase tracking-wider mb-1">Mechanism</p>
                <p className="text-[#F4F1EA]/70 text-sm mb-3">{item.mechanism}</p>
                <p className="text-[#F4F1EA]/50 text-xs uppercase tracking-wider mb-1">Output</p>
                <p className="text-[#F4F1EA]/70 text-sm">{item.output}</p>
              </div>
            ))}
          </div>

          <p className="text-[#F4F1EA]/70 text-sm leading-relaxed">
            We will partner with research institutions to mature the science, technology vendors
            to supply the hardware, and corporate anchors to provide the sites and procurement scale.
          </p>
        </section>

        {/* Traction */}
        <section className="investor-section">
          <p className="eyebrow mb-6">Traction & Pipeline</p>
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h4 className="text-[#E9C46A] text-sm font-bold uppercase tracking-wider mb-2">
                L'Oréal L'Accelerator Program (Active)
              </h4>
              <p className="text-[#F4F1EA]/70 text-sm leading-relaxed">
                We are advancing a 5-year proposal including a 6-9 month pilot phase at a corporate
                site. If awarded, this will provide validation capital, a global brand reference, and
                a replicable deployment template.
              </p>
            </div>
            <div className="glass-card p-6">
              <h4 className="text-[#2A9D8F] text-sm font-bold uppercase tracking-wider mb-2">
                Partners in Dialogue
              </h4>
              <p className="text-[#F4F1EA]/70 text-sm leading-relaxed">
                We are actively engaging living laboratories (The Ray, Curiosity Lab), research
                anchors (Chang'an University, University of Nottingham), and infrastructure
                innovators (Wattway by Colas, PLATIO Solar) to form the founding consortium.
              </p>
            </div>
            <div className="glass-card p-6">
              <h4 className="text-[#8AB17D] text-sm font-bold uppercase tracking-wider mb-2">
                IP Strategy
              </h4>
              <p className="text-[#F4F1EA]/70 text-sm leading-relaxed">
                We will not own our partners' core patents. We will own the integration architecture—
                the control systems, deployment protocols, and energy-financing models that make
                pavement energy commercially viable.
              </p>
            </div>
          </div>
        </section>

        {/* Market */}
        <section className="investor-section">
          <p className="eyebrow mb-6">Market Opportunity</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                phase: 'Immediate',
                desc: 'Corporate campus and logistics yard retrofits for Fortune 500 sustainability mandates.',
                accent: '#2A9D8F',
              },
              {
                phase: 'Mid-term',
                desc: 'Smart city district integrations where municipalities seek revenue-generating infrastructure.',
                accent: '#E9C46A',
              },
              {
                phase: 'Long-term',
                desc: 'National highway programs in climate-vulnerable regions where pavement cooling and energy generation are dual imperatives.',
                accent: '#8AB17D',
              },
            ].map((item, i) => (
              <div key={i} className="glass-card p-6" style={{ borderLeft: `3px solid ${item.accent}` }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: item.accent }}>
                  {item.phase}
                </p>
                <p className="text-[#F4F1EA]/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Business Model */}
        <section className="investor-section">
          <p className="eyebrow mb-6">Business Model</p>
          <div className="space-y-4">
            {[
              {
                num: '01',
                title: 'Pilot Revenue',
                desc: 'Funded demonstration projects with corporate anchors (L\'Oréal model).',
              },
              {
                num: '02',
                title: 'Platform Licensing',
                desc: 'Licensing our integration and monitoring architecture to infrastructure developers.',
              },
              {
                num: '03',
                title: 'Energy Servicing',
                desc: 'Long-term power-purchase or cooling-reduction contracts from deployed pavement networks.',
              },
            ].map((item) => (
              <div key={item.num} className="flex gap-6 items-start">
                <span className="text-[#E9C46A] text-lg font-bold">{item.num}</span>
                <div>
                  <h4 className="text-[#F4F1EA] text-base font-bold mb-1">{item.title}</h4>
                  <p className="text-[#F4F1EA]/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="investor-section">
          <p className="eyebrow mb-6">The Team</p>
          <div className="glass-card p-8 mb-6">
            <h3 className="text-[#F4F1EA] text-xl font-bold mb-2">Dr. Sageline LaBaze</h3>
            <p className="text-[#2A9D8F] text-sm uppercase tracking-wider mb-4">Founder & CEO</p>
            <p className="text-[#F4F1EA]/70 text-sm leading-relaxed">
              Solterix Holding Inc. A vision to build ventures that contribute to wellness of the
              mind, body, soul, and earth.
            </p>
          </div>
          <div className="glass-card p-6">
            <h4 className="text-[#F4F1EA] text-sm font-bold uppercase tracking-wider mb-3">
              Advisory & Partner Network (In Formation)
            </h4>
            <p className="text-[#F4F1EA]/60 text-sm leading-relaxed">
              Thermal engineers, smart city architects, and corporate sustainability officers from
              leading research institutions and infrastructure innovators.
            </p>
          </div>
        </section>

        {/* Investment */}
        <section className="investor-section">
          <p className="eyebrow mb-6">Investment & Use of Funds</p>
          <p className="text-[#F4F1EA]/70 text-sm leading-relaxed mb-6">
            We are currently raising capital to:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              'Architect and fund the pilot deployment team',
              'Secure partnership agreements and IP frameworks',
              'Build the monitoring and integration software layer',
              'Validate the first corporate site installation',
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-[#2A9D8F] text-sm font-bold mt-0.5">+</span>
                <p className="text-[#F4F1EA]/70 text-sm">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-[#F4F1EA]/50 text-sm">
            For the full financial model, cap table, and term sheet,{' '}
            <a
              href="mailto:admin@solterixinc.com?subject=Investor%20Deck%20Request"
              className="text-[#E9C46A] hover:text-[#F4F1EA] transition-colors underline underline-offset-4"
            >
              request our Investor Deck
            </a>.
          </p>
        </section>

        {/* Contact */}
        <section className="investor-section text-center pb-16">
          <div className="border-t border-[#2A9D8F]/20 pt-12">
            <p className="text-[#F4F1EA]/40 text-sm mb-2">admin@solterixinc.com</p>
            <p className="text-[#F4F1EA]/30 text-xs uppercase tracking-wider mb-4">
              Solterix Holding Inc.
            </p>
            <p className="font-serif-accent italic text-[#8AB17D] text-sm mb-8">
              Wellness of mind, body, soul, and Earth.
            </p>
            <Link to="/" className="btn-primary inline-block">
              Return to Main Site
            </Link>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#0F1419] border-t border-[#2A9D8F]/10 py-10 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#F4F1EA]/30 text-xs">
            &copy; 2026 Solterraform, a venture of Solterix Holding Inc.
          </p>
          <div className="flex gap-6">
            <span className="text-[#F4F1EA]/30 text-xs hover:text-[#2A9D8F] transition-colors cursor-pointer">Privacy</span>
            <span className="text-[#F4F1EA]/30 text-xs hover:text-[#2A9D8F] transition-colors cursor-pointer">Terms</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
