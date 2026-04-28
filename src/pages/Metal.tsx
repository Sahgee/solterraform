import { Link } from 'react-router';
import VideoHero from '../components/VideoHero';

export default function Metal() {
  return (
    <main className="w-full">
      {/* 1. Hero: Mechanical Gears */}
      <VideoHero
        videoSrc="/videos/metal-hero.mp4"
        title="SYNCHRONIZED"
        subtitle="Precision in Motion"
        ctaText="VIEW INDUSTRY SOLUTIONS"
        ctaHref="#solutions"
        overlayPosition="center"
      />

      {/* 2. Industry Solutions */}
      <section id="solutions" className="relative w-full min-h-screen bg-[#0a0a0a] py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-[0.15em] mb-4">
              05 / Industrial Division
            </p>
            <h2 className="text-white text-[clamp(32px,5vw,56px)] font-bold uppercase leading-[0.95] tracking-[-0.02em]">
              Engineered for Eternity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Gears & Transmissions',
                desc: 'Precision-machined components with tolerances measured in microns. Designed for decades of continuous operation.',
                stat: '0.001mm',
                statLabel: 'Tolerance',
              },
              {
                title: 'Structural Components',
                desc: 'Load-bearing elements forged from recycled steel alloys. Strength without the environmental cost of virgin mining.',
                stat: '98%',
                statLabel: 'Recycled Content',
              },
              {
                title: 'Kinetic Systems',
                desc: 'Moving assemblies that transform raw energy into precise mechanical action. The heart of industrial machinery.',
                stat: '50+',
                statLabel: 'Year Lifespan',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-white/10 p-8 hover:border-[#2d5a3d]/50 transition-colors duration-500"
              >
                <div className="aspect-video bg-[#1a1a1a] mb-8 overflow-hidden">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover opacity-60"
                  >
                    <source src="/videos/metal-hero.mp4" type="video/mp4" />
                  </video>
                </div>
                <p className="text-[#2d5a3d] text-xs font-semibold uppercase tracking-[0.15em] mb-3">
                  {String(i + 1).padStart(2, '0')} / {item.title}
                </p>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>
                <div className="pt-6 border-t border-white/5">
                  <p className="text-white text-2xl font-bold">{item.stat}</p>
                  <p className="text-white/30 text-xs uppercase tracking-wider mt-1">
                    {item.statLabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Precision Statement */}
      <section className="relative w-full h-[70vh] bg-white overflow-hidden flex items-center px-6 md:px-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#2d5a3d] text-xs font-semibold uppercase tracking-[0.15em] mb-6">
              The Metal Division
            </p>
            <h2 className="text-[#0a0a0a] text-[clamp(28px,4vw,48px)] font-bold uppercase leading-[0.95] tracking-[-0.02em] mb-8">
              Where Force Meets Finesse
            </h2>
            <p className="text-[#0a0a0a]/60 text-sm leading-relaxed mb-6">
              Solterraform's Metal Division engineers components that bridge the gap
              between raw industrial power and surgical precision. Our foundries use
              98% recycled steel, powered by the same solar arrays we deploy in the field.
            </p>
            <p className="text-[#0a0a0a]/60 text-sm leading-relaxed">
              From massive gear trains that turn wind into electricity, to precision
              components for medical devices — we prove that sustainability and
              industrial strength are not opposing forces.
            </p>
          </div>
          <div className="relative aspect-square bg-[#1a1a1a] overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            >
              <source src="/videos/metal-hero.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* 4. Final CTA */}
      <section className="relative w-full h-[60vh] bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-6">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        >
          <source src="/videos/metal-hero.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10">
          <p className="text-white/50 text-xs font-semibold uppercase tracking-[0.2em] mb-6">
            Solterix Holding Inc.
          </p>
          <h2 className="text-white text-[clamp(28px,5vw,56px)] font-bold uppercase leading-[0.95] tracking-[-0.02em] mb-8 max-w-3xl">
            Fueling Unique Innovations for a Sustainable Tomorrow
          </h2>
          <Link to="/" className="pill-btn border-white text-white inline-block">
            RETURN TO HOME
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#0a0a0a] border-t border-white/10 py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-[0.15em]">
              SOLTERRAFORM
            </p>
            <p className="text-white/40 text-xs mt-2">
              A Solterix Holding Inc. Company
            </p>
          </div>
          <div className="flex gap-8">
            {['Solar', 'Nature', 'Still Life', 'Materials', 'Metal'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(' ', '-')}`}
                className="text-white/50 text-xs uppercase tracking-wider hover:text-[#2d5a3d] transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-white/5">
          <p className="text-white/20 text-xs">
            Preserving and transforming the future of the world.
          </p>
        </div>
      </footer>
    </main>
  );
}
