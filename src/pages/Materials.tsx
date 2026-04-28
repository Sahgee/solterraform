import { Link } from 'react-router';
import VideoHero from '../components/VideoHero';

export default function Materials() {
  return (
    <main className="w-full">
      {/* 1. Hero: Leather & Fabric */}
      <VideoHero
        videoSrc="/videos/materials-hero.mp4"
        title="MATERIALS"
        overlayPosition="bottom-center"
        textBehind={true}
      />

      {/* 2. Materials Grid */}
      <section className="relative w-full min-h-screen bg-[#0a0a0a] py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-[0.15em] mb-4">
              04 / Tactile Studies
            </p>
            <h2 className="text-white text-[clamp(32px,5vw,56px)] font-bold uppercase leading-[0.95] tracking-[-0.02em]">
              The Language of Touch
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {[
              { label: 'Leather', desc: 'Aged, worked, and worn into character', src: '/videos/materials-hero.mp4' },
              { label: 'Fabric', desc: 'Threads woven with intention and precision', src: '/videos/stilllife-hero.mp4' },
              { label: 'Stone', desc: 'Geologic time compressed into form', src: '/videos/nature-hero.mp4' },
              { label: 'Wood', desc: 'Grain telling stories of seasons passed', src: '/videos/sustainability.mp4' },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative aspect-[4/3] overflow-hidden bg-[#1a1a1a] cursor-pointer"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100"
                >
                  <source src={item.src} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">
                    {item.desc}
                  </p>
                  <h3 className="text-white text-2xl font-bold uppercase tracking-wide">
                    {item.label}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Materials Philosophy */}
      <section className="relative w-full min-h-[80vh] bg-white flex items-center px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#2d5a3d] text-xs font-semibold uppercase tracking-[0.15em] mb-6">
            Material Science Division
          </p>
          <h2 className="text-[#0a0a0a] text-[clamp(28px,4vw,48px)] font-bold uppercase leading-[0.95] tracking-[-0.02em] mb-8">
            Every Material Has a Memory
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <p className="text-[#0a0a0a]/60 text-sm leading-relaxed">
              At Solterraform, our materials research goes beyond surface properties.
              We study how leather ages under different atmospheric conditions,
              how fabric responds to stress and humidity, and how natural materials
              can be engineered to outperform synthetic alternatives.
            </p>
            <p className="text-[#0a0a0a]/60 text-sm leading-relaxed">
              Our sustainable material initiative has produced bio-leathers from
              agricultural waste, self-healing polymers inspired by tree resin,
              and carbon-negative concrete formulations. The future is built from
              materials that remember their origin.
            </p>
          </div>
          <div className="mt-12 flex gap-4">
            <Link to="/metal" className="sharp-btn border-[#0a0a0a] text-[#0a0a0a]">
              VIEW METAL COLLECTION
            </Link>
            <Link to="/" className="sharp-btn border-[#0a0a0a]/20 text-[#0a0a0a]/50">
              BACK TO SOLAR
            </Link>
          </div>
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
      </footer>
    </main>
  );
}
