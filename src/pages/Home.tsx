import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ============================================
   SECTION 1: HERO
   ============================================ */
function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    if (h1Ref.current) {
      gsap.set(h1Ref.current, { opacity: 0, y: 40 });
      tl.to(h1Ref.current, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' });
    }
    if (subRef.current) {
      gsap.set(subRef.current, { opacity: 0, y: 30 });
      tl.to(subRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.6');
    }
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });
      tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4');
    }
    return () => { tl.kill(); };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen bg-[#0F1419] overflow-hidden flex items-center justify-center">
      {!loaded && (
        <div className="absolute inset-0 bg-[#0F1419] z-20 flex items-center justify-center">
          <div className="text-[#F4F1EA]/30 text-xs font-semibold uppercase tracking-[0.2em] animate-pulse">
            Loading
          </div>
        </div>
      )}

      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlayThrough={() => setLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1.5s ease' }}
      >
        <source src="/videos/hero-main.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 gradient-overlay z-[1]" />

      {/* Amber particle overlay via CSS */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#E9C46A]/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-[900px] mx-auto">
        <h1
          ref={h1Ref}
          className="text-[#F4F1EA] text-[clamp(36px,7vw,72px)] font-bold leading-[0.95] tracking-[-0.02em] mb-8"
        >
          The ground beneath us will generate the power ahead.
        </h1>

        <p
          ref={subRef}
          className="text-[#F4F1EA]/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Solterraform will pioneer the Asphalt Circularity Platform—a global collaboration
          network that transforms the world's roads, lots, and corridors into living renewable
          energy ecosystems. We do not build in isolation. We will invest, connect, and co-create
          with the researchers, engineers, and enterprises who share our conviction that
          infrastructure must regenerate what it touches.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button onClick={() => scrollTo('cta')} className="btn-primary">
            Partner With Us
          </button>
          <button onClick={() => scrollTo('opportunity')} className="btn-secondary">
            Read Our Vision
          </button>
          <Link to="/investors" className="btn-tertiary">
            Investor One-Pager ↓
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SECTION 2: THE OPPORTUNITY
   ============================================ */
function OpportunitySection() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const counters = el.querySelectorAll('.stat-counter');
    counters.forEach((counter) => {
      const target = counter.getAttribute('data-target');
      if (!target) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 100,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: counter,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          (counter as HTMLElement).style.opacity = String(obj.val / 100);
        },
      });
    });
  }, []);

  return (
    <section id="opportunity" className="relative w-full min-h-screen bg-[#0F1419] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-[55%_45%] gap-16 items-start">
          {/* Left: text */}
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow mb-6">The Stranded Energy Crisis</p>
            <h2 className="text-[#F4F1EA] text-[clamp(28px,4vw,48px)] font-bold leading-[0.95] tracking-[-0.01em] mb-8">
              Billions of square meters of pavement will absorb the sun's energy today—and waste nearly all of it.
            </h2>
            <p className="text-[#F4F1EA]/60 text-sm leading-relaxed mb-6">
              By 2030, urban pavement surfaces alone will cover an area larger than the state of Texas.
              These surfaces will function as massive, unregulated thermal batteries, amplifying heat
              islands, accelerating asphalt degradation, and demanding ever-greater cooling energy from
              the buildings around them. Solterraform will reverse this equation.
            </p>
            <p className="text-[#F4F1EA]/60 text-sm leading-relaxed">
              We will treat every meter of pavement as a potential node in a distributed energy
              network—harvesting thermal radiation, converting temperature gradients, and embedding
              photovoltaics where structural loads permit. The road will no longer be the end of the
              journey. It will become the beginning of the power supply.
            </p>
          </div>

          {/* Right: videos + stats */}
          <div ref={statsRef} className="flex flex-col gap-6">
            <div className="aspect-video bg-[#1a1f24] overflow-hidden relative">
              <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover">
                <source src="/videos/thermal-lot.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="stat-counter p-6 border-l-2 border-[#E9C46A]" data-target="100">
              <p className="text-[#E9C46A] text-3xl font-bold mb-2">40,000+ km</p>
              <p className="text-[#F4F1EA]/50 text-xs uppercase tracking-wider">
                of major logistics corridors will be viable for thermal harvesting by 2028
              </p>
            </div>

            <div className="aspect-video bg-[#1a1f24] overflow-hidden">
              <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover">
                <source src="/videos/logistics-hub.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="stat-counter p-6 border-l-2 border-[#2A9D8F]" data-target="100">
              <p className="text-[#2A9D8F] text-3xl font-bold mb-2">51.31%</p>
              <p className="text-[#F4F1EA]/50 text-xs uppercase tracking-wider">
                heat collection efficiency has already been demonstrated in laboratory PPFHS models—we will scale it
              </p>
            </div>

            <div className="aspect-video bg-[#1a1f24] overflow-hidden">
              <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover">
                <source src="/videos/permeable-stream.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="stat-counter p-6 border-l-2 border-[#8AB17D]" data-target="100">
              <p className="text-[#8AB17D] text-3xl font-bold mb-2">Trillions</p>
              <p className="text-[#F4F1EA]/50 text-xs uppercase tracking-wider">
                in global pavement infrastructure will be resurfaced this decade. We will ensure the next layer generates returns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SECTION 3: COLLABORATION MODEL
   ============================================ */
function CollaborationSection() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll('.collab-card');
    if (!cards) return;
    const triggers: ScrollTrigger[] = [];
    cards.forEach((card, i) => {
      gsap.set(card, { opacity: 0, y: 60 });
      const tl = gsap.to(card, {
        opacity: 1, y: 0, duration: 0.9, delay: i * 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
      });
      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section id="collaboration" className="relative w-full min-h-screen bg-[#0F1419] py-24 md:py-32 overflow-hidden">
      {/* Mycelium background video */}
      <video
        autoPlay muted loop playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.08]"
      >
        <source src="/videos/mycelium.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <p className="eyebrow mb-6">Network Architecture</p>
          <h2 className="text-[#F4F1EA] text-[clamp(32px,5vw,56px)] font-bold leading-[0.95] tracking-[-0.01em] mb-6">
            We will co-create, not compete.
          </h2>
          <p className="text-[#F4F1EA]/60 text-sm leading-relaxed max-w-2xl mx-auto">
            Solterraform will operate as a venture studio and network orchestrator. We will identify
            breakthrough research, de-risk it through pilot funding, and bridge it to enterprise
            sustainability mandates. Our partners will retain their IP. We will provide the capital
            architecture, the corporate relationships, and the scaling pathway.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'For the Researchers',
              body: 'Your laboratory breakthroughs will not remain in journals. We will translate peer-reviewed thermal efficiency into funded, monitored pilot deployments—giving your data the real-world substrate it deserves.',
              accent: '#2A9D8F',
            },
            {
              title: 'For the Technology Partners',
              body: 'Your hardware deserves an enterprise champion. We will provide the Fortune 500 client, the site access, and the performance validation required to move from prototype to procurement list.',
              accent: '#E9C46A',
            },
            {
              title: 'For the Corporations',
              body: 'Your logistics footprint will become a renewable energy portfolio. We will turn parking surfaces, distribution yards, and access roads into assets that reduce scope emissions and insulate against energy volatility.',
              accent: '#8AB17D',
            },
          ].map((card, i) => (
            <div
              key={i}
              className="collab-card glass-card p-8 md:p-10 hover:border-opacity-40 transition-all duration-500"
              style={{ borderTop: `3px solid ${card.accent}` }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: card.accent }}>
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="text-[#F4F1EA] text-xl font-bold mb-4">{card.title}</h3>
              <p className="text-[#F4F1EA]/50 text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SECTION 4: L'ORÉAL ACCELERATOR & PIPELINE
   ============================================ */
function PipelineSection() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodes = timelineRef.current?.querySelectorAll('.timeline-node');
    if (!nodes) return;
    const triggers: ScrollTrigger[] = [];
    nodes.forEach((node, i) => {
      gsap.set(node, { opacity: 0, x: i % 2 === 0 ? -40 : 40 });
      const tl = gsap.to(node, {
        opacity: 1, x: 0, duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: node, start: 'top 85%', toggleActions: 'play none none none' },
      });
      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  const steps = [
    {
      phase: 'Now',
      title: 'Network Formation',
      desc: 'We are engaging research institutions, living laboratories, and technology partners to architect the platform.',
    },
    {
      phase: '2026',
      title: 'Pilot Funding',
      desc: 'The L\'Oréal accelerator will provide the capital and site access for our first integrated demonstration.',
    },
    {
      phase: '2026–2027',
      title: 'First Deployment',
      desc: 'We will install and monitor thermal and photovoltaic pavement systems at a live corporate campus, documenting energy yield, surface cooling, and structural integrity.',
    },
    {
      phase: '2027–2030',
      title: 'Scaling & Replication',
      desc: 'With validated data, we will replicate the model across partner sites, adapting to climate zones from the American Southwest to Northern Europe and the Gulf.',
    },
  ];

  return (
    <section id="pipeline" className="relative w-full min-h-screen bg-[#0F1419] py-24 md:py-32 overflow-hidden">
      <video
        autoPlay muted loop playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12]"
      >
        <source src="/videos/campus-daynight.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <p className="eyebrow mb-6">Validation Pathway</p>
          <h2 className="text-[#F4F1EA] text-[clamp(28px,4vw,48px)] font-bold leading-[0.95] tracking-[-0.01em] mb-6">
            Our first global pilot will establish the template for everything that follows.
          </h2>
          <p className="text-[#F4F1EA]/60 text-sm leading-relaxed max-w-2xl mx-auto">
            Solterraform is currently advancing a 5-year sustainability accelerator proposal with
            L'Oréal through the L'Accelerator Program. This collaboration will include a 6- to 9-month
            pilot phase designed to prove that pavement-integrated energy systems can meaningfully
            offset operational emissions at corporate sites.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#2A9D8F]/20 md:-translate-x-px" />

          {steps.map((step, i) => (
            <div
              key={i}
              className={`timeline-node relative flex items-start gap-6 md:gap-12 mb-16 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Node dot */}
              <div className="absolute left-4 md:left-1/2 top-1 w-3 h-3 rounded-full bg-[#2A9D8F] md:-translate-x-[5px] animate-pulse shadow-[0_0_12px_rgba(42,157,143,0.4)]" />

              <div className={`ml-12 md:ml-0 md:w-[calc(50%-3rem)] ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                <p className="text-[#E9C46A] text-xs font-semibold uppercase tracking-[0.15em] mb-2">
                  {step.phase}
                </p>
                <h3 className="text-[#F4F1EA] text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-[#F4F1EA]/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SECTION 5: TECHNOLOGY PILLARS
   ============================================ */
function TechnologySection() {
  const [activePanel, setActivePanel] = useState<number | null>(null);

  const panels = [
    {
      title: 'Thermal Harvesting',
      video: '/videos/porous-stone.mp4',
      accent: '#2A9D8F',
      body: 'Porous Pavement Fluid Heat-Collecting Systems (PPFHS) will circulate transfer fluid through the natural voids in open-graded asphalt. The pavement will become a thermal sponge—absorbing solar radiation, transferring it to storage, and reducing surface temperatures by up to 23.2°C in peak conditions.',
      detail: 'Fluid channels embedded within the asphalt matrix will collect and transport thermal energy to centralized heat exchangers, enabling both immediate use and long-term storage in seasonal thermal banks.',
    },
    {
      title: 'Thermoelectric Integration',
      video: '/videos/thermal-lot.mp4',
      accent: '#E9C46A',
      body: 'Embedded generators will harvest the temperature gradient between sun-heated wearing courses and cooler subgrade layers. Where PPFHS captures bulk thermal energy, thermoelectric modules will provide continuous trickle current for sensors, lighting, and edge-computing nodes.',
      detail: 'Solid-state thermoelectric generators require no moving parts, offering decades of maintenance-free operation while converting even small temperature differentials into usable direct current.',
    },
    {
      title: 'Photovoltaic Surfacing',
      video: '/videos/solar-pavers.mp4',
      accent: '#8AB17D',
      body: 'Where structural and optical conditions permit, translucent and flexible photovoltaic wearing courses will generate direct current from daylight exposure. These surfaces will communicate—self-diagnosing, reporting anomalies, and dynamically rerouting power to maximize stability.',
      detail: 'Each photovoltaic paver will function as an intelligent node in a mesh network, transmitting performance data in real time and automatically isolating faults to preserve overall system output.',
    },
  ];

  return (
    <section id="technology" className="relative w-full bg-[#0F1419] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <p className="eyebrow mb-6">Three Pathways to Regeneration</p>
          <h2 className="text-[#F4F1EA] text-[clamp(28px,4vw,48px)] font-bold leading-[0.95] tracking-[-0.01em]">
            We will integrate complementary systems, not bet on a single horse.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {panels.map((panel, i) => (
            <div
              key={i}
              className="relative min-h-[70vh] overflow-hidden cursor-pointer group"
              onMouseEnter={() => setActivePanel(i)}
              onMouseLeave={() => setActivePanel(null)}
            >
              <video
                autoPlay muted loop playsInline preload="auto"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700"
              >
                <source src={panel.video} type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1419] via-[#0F1419]/60 to-transparent" />

              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <div
                  className="w-12 h-1 mb-6 transition-all duration-500"
                  style={{ backgroundColor: panel.accent }}
                />
                <h3 className="text-[#F4F1EA] text-2xl font-bold mb-4">{panel.title}</h3>
                <p className="text-[#F4F1EA]/60 text-sm leading-relaxed mb-4">{panel.body}</p>

                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{
                    maxHeight: activePanel === i ? '200px' : '0px',
                    opacity: activePanel === i ? 1 : 0,
                  }}
                >
                  <p className="text-[#F4F1EA]/40 text-xs leading-relaxed border-l-2 pl-4 mt-2" style={{ borderColor: panel.accent }}>
                    {panel.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SECTION 6: GLOBAL NETWORK
   ============================================ */
function NetworkSection() {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    {
      key: 'living',
      label: 'Living Laboratories',
      desc: 'We are in dialogue with proven testbeds that can validate under real traffic, real weather, real time.',
    },
    {
      key: 'research',
      label: 'Research Anchors',
      desc: 'We are engaging institutions whose thermal engineering and materials science will define the next decade of pavement design.',
    },
    {
      key: 'smartcity',
      label: 'Smart City Pilots',
      desc: 'We are seeking municipal and campus partners who can move from permit to prototype in months, not years.',
    },
    {
      key: 'infra',
      label: 'Infrastructure Innovators',
      desc: 'We are evaluating complementary hardware—from porous thermal collectors to solar pavers—that can integrate into our platform.',
    },
    {
      key: 'gov',
      label: 'Government & Policy',
      desc: 'We are cultivating relationships with agencies whose sustainability mandates will accelerate procurement.',
    },
  ];

  return (
    <section id="network" className="relative w-full bg-[#0F1419] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <p className="eyebrow mb-6">The Ecosystem We Are Building</p>
          <h2 className="text-[#F4F1EA] text-[clamp(28px,4vw,48px)] font-bold leading-[0.95] tracking-[-0.01em] mb-6">
            Innovation will not flourish in silos.
          </h2>
          <p className="text-[#F4F1EA]/60 text-sm leading-relaxed max-w-3xl mx-auto">
            We are actively engaging entities across six continents who share our conviction that
            pavement must perform beyond load-bearing. The map below represents the network we are
            weaving—research anchors, living laboratories, smart city pilots, infrastructure
            innovators, and forward-leaning government agencies. Each node is a conversation. Each
            connection is a commitment to build together.
          </p>
        </div>

        {/* Stylized world map SVG */}
        <div className="relative w-full aspect-[2/1] mb-16 bg-[#0F1419] border border-[#2A9D8F]/10 rounded-none overflow-hidden">
          <svg viewBox="0 0 800 400" className="w-full h-full">
            {/* Simplified world map dots */}
            {/* North America */}
            <circle cx="180" cy="120" r="3" fill="#2A9D8F" opacity="0.6"><animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/></circle>
            <circle cx="220" cy="140" r="2.5" fill="#E9C46A" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="4s" repeatCount="indefinite"/></circle>
            <circle cx="160" cy="160" r="2" fill="#8AB17D" opacity="0.7"><animate attributeName="opacity" values="0.7;1;0.7" dur="2.5s" repeatCount="indefinite"/></circle>
            {/* South America */}
            <circle cx="250" cy="260" r="2.5" fill="#2A9D8F" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="3.5s" repeatCount="indefinite"/></circle>
            <circle cx="270" cy="300" r="2" fill="#E9C46A" opacity="0.6"><animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/></circle>
            {/* Europe */}
            <circle cx="420" cy="110" r="3" fill="#2A9D8F" opacity="0.7"><animate attributeName="opacity" values="0.7;1;0.7" dur="2.8s" repeatCount="indefinite"/></circle>
            <circle cx="450" cy="100" r="2.5" fill="#8AB17D" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="3.2s" repeatCount="indefinite"/></circle>
            <circle cx="440" cy="130" r="2" fill="#E9C46A" opacity="0.6"><animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite"/></circle>
            {/* Africa */}
            <circle cx="440" cy="220" r="2.5" fill="#2A9D8F" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/></circle>
            <circle cx="460" cy="250" r="2" fill="#E9C46A" opacity="0.6"><animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite"/></circle>
            {/* Asia */}
            <circle cx="580" cy="130" r="3" fill="#2A9D8F" opacity="0.7"><animate attributeName="opacity" values="0.7;1;0.7" dur="2.2s" repeatCount="indefinite"/></circle>
            <circle cx="620" cy="150" r="2.5" fill="#8AB17D" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="3.5s" repeatCount="indefinite"/></circle>
            <circle cx="650" cy="140" r="2" fill="#E9C46A" opacity="0.6"><animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/></circle>
            <circle cx="600" cy="170" r="2.5" fill="#2A9D8F" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="2.7s" repeatCount="indefinite"/></circle>
            {/* Australia */}
            <circle cx="680" cy="280" r="2.5" fill="#E9C46A" opacity="0.6"><animate attributeName="opacity" values="0.6;1;0.6" dur="3.3s" repeatCount="indefinite"/></circle>
            <circle cx="700" cy="300" r="2" fill="#8AB17D" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/></circle>
            {/* Connection lines */}
            <line x1="180" y1="120" x2="420" y2="110" stroke="#2A9D8F" strokeWidth="0.5" opacity="0.2"><animate attributeName="opacity" values="0.2;0.4;0.2" dur="4s" repeatCount="indefinite"/></line>
            <line x1="420" y1="110" x2="580" y2="130" stroke="#2A9D8F" strokeWidth="0.5" opacity="0.2"><animate attributeName="opacity" values="0.2;0.4;0.2" dur="5s" repeatCount="indefinite"/></line>
            <line x1="220" y1="140" x2="250" y2="260" stroke="#E9C46A" strokeWidth="0.5" opacity="0.15"><animate attributeName="opacity" values="0.15;0.3;0.15" dur="6s" repeatCount="indefinite"/></line>
            <line x1="580" y1="130" x2="680" y2="280" stroke="#8AB17D" strokeWidth="0.5" opacity="0.2"><animate attributeName="opacity" values="0.2;0.35;0.2" dur="5s" repeatCount="indefinite"/></line>
          </svg>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-5 py-2 text-xs uppercase tracking-wider transition-all duration-300 ${
              activeFilter === 'all' ? 'bg-[#2A9D8F] text-[#0F1419]' : 'border border-[#2A9D8F]/30 text-[#F4F1EA]/60 hover:text-[#2A9D8F]'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-5 py-2 text-xs uppercase tracking-wider transition-all duration-300 ${
                activeFilter === cat.key ? 'bg-[#2A9D8F] text-[#0F1419]' : 'border border-[#2A9D8F]/30 text-[#F4F1EA]/60 hover:text-[#2A9D8F]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Category cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories
            .filter((cat) => activeFilter === 'all' || activeFilter === cat.key)
            .map((cat, i) => (
              <div key={cat.key} className="glass-card p-6 hover:border-[#2A9D8F]/30 transition-all duration-300">
                <p className="text-[#2A9D8F] text-xs font-semibold uppercase tracking-[0.15em] mb-3">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h4 className="text-[#F4F1EA] text-lg font-bold mb-2">{cat.label}</h4>
                <p className="text-[#F4F1EA]/50 text-sm leading-relaxed">{cat.desc}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SECTION 7: INVESTOR & PARTNER CTA
   ============================================ */
function CTASection() {
  return (
    <section id="cta" className="relative w-full min-h-screen bg-[#0F1419] overflow-hidden flex items-center justify-center">
      <video
        autoPlay muted loop playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/videos/continental-network.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1419]/60 via-[#0F1419]/40 to-[#0F1419]/80" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <h2 className="text-[#F4F1EA] text-[clamp(32px,5vw,56px)] font-bold leading-[0.95] tracking-[-0.01em] mb-8">
          Join us in building the infrastructure of tomorrow.
        </h2>
        <p className="text-[#F4F1EA]/60 text-sm md:text-base leading-relaxed mb-10">
          We are currently raising capital to fund our pilot architecture, partnership network, and
          first deployment team. If you are an investor who believes that the next energy revolution
          will rise from the ground rather than the roof, we invite you to request our full deck.
          If you are a researcher, technologist, or corporate sustainability leader, we invite you
          to explore co-development.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <a
            href="mailto:admin@solterixinc.com?subject=Investor%20Deck%20Request"
            className="btn-primary"
          >
            Request Investor Deck
          </a>
          <a
            href="mailto:admin@solterixinc.com?subject=Partnership%20Inquiry"
            className="btn-secondary"
          >
            Explore Partnership
          </a>
        </div>

        <div className="border-t border-[#F4F1EA]/10 pt-8">
          <p className="text-[#F4F1EA]/40 text-sm mb-1">admin@solterixinc.com</p>
          <p className="text-[#F4F1EA]/30 text-xs uppercase tracking-wider mb-2">Solterix Holding Inc.</p>
          <p className="font-serif-accent italic text-[#8AB17D] text-sm">
            Wellness of mind, body, soul, and Earth.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FOOTER
   ============================================ */
function Footer() {
  return (
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
  );
}

/* ============================================
   MAIN HOME PAGE
   ============================================ */
export default function Home() {
  return (
    <main className="w-full bg-[#0F1419]">
      <HeroSection />
      <OpportunitySection />
      <CollaborationSection />
      <PipelineSection />
      <TechnologySection />
      <NetworkSection />
      <CTASection />
      <Footer />
    </main>
  );
}
