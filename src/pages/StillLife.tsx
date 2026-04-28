import { Link } from 'react-router';

export default function StillLife() {
  return (
    <main className="w-full">
      {/* 1. Hero: Ceramics & Glass — framed gallery feel */}
      <section className="relative w-full h-screen bg-white flex items-center justify-center p-5 md:p-8">
        <div className="relative w-full h-full overflow-hidden bg-[#1a1a1a]">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/videos/stilllife-hero.mp4" type="video/mp4" />
          </video>
          {/* Vertical left title */}
          <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2">
            <h1
              className="text-white text-[clamp(28px,5vw,56px)] font-bold uppercase leading-[0.9] tracking-[-0.02em]"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              STILL LIFE
            </h1>
          </div>
          {/* Bottom-right number */}
          <div className="absolute bottom-6 right-6 md:right-12">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-[0.15em]">
              03
            </p>
          </div>
        </div>
      </section>

      {/* 2. Materials Showcase */}
      <section className="relative w-full min-h-screen bg-white py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <p className="text-[#0a0a0a]/40 text-xs font-semibold uppercase tracking-[0.15em] mb-4">
              03 / Artisan Collection
            </p>
            <h2 className="text-[#0a0a0a] text-[clamp(32px,5vw,56px)] font-bold uppercase leading-[0.95] tracking-[-0.02em]">
              Form, Light, and Texture
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Glassware',
                desc: 'Hand-blown forms capturing and refracting light into spectral caustics. Each piece is unique in its imperfection.',
                video: '/videos/stilllife-hero.mp4',
              },
              {
                title: 'Ceramics',
                desc: 'Earthen textures shaped by fire and time. The tactile surface records every touch of the artisan hand.',
                video: '/videos/materials-hero.mp4',
              },
              {
                title: 'Composition',
                desc: 'The arrangement of objects in space — a meditation on balance, negative space, and the poetry of everyday things.',
                video: '/videos/nature-hero.mp4',
              },
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="aspect-[4/5] bg-[#1a1a1a] overflow-hidden mb-6">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                </div>
                <p className="text-[#2d5a3d] text-xs font-semibold uppercase tracking-[0.15em] mb-2">
                  {String(i + 1).padStart(2, '0')} / {item.title}
                </p>
                <p className="text-[#0a0a0a]/60 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Dark interlude with video */}
      <section className="relative w-full h-[70vh] bg-[#0a0a0a] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/videos/stilllife-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-[0.2em] mb-6">
              Solterix Philosophy
            </p>
            <h2 className="text-white text-[clamp(24px,4vw,48px)] font-bold uppercase leading-[0.95] tracking-[-0.02em] max-w-3xl">
              In Stillness, We Find the Deepest Movement
            </h2>
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
