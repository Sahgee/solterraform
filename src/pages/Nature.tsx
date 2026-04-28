import { Link } from 'react-router';
import VideoHero from '../components/VideoHero';

export default function Nature() {
  return (
    <main className="w-full">
      {/* 1. Nature Hero — flower bloom timelapse */}
      <VideoHero
        videoSrc="/videos/flower-bloom.mp4"
        title="NATURE"
        showNumber="01"
        overlayPosition="top-left"
      />

      {/* 2. Video Tiles Grid */}
      <section className="relative w-full min-h-screen bg-[#0a0a0a] py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-[0.15em] mb-4">
              02 / Collections
            </p>
            <h2 className="text-white text-[clamp(32px,5vw,56px)] font-bold uppercase leading-[0.95] tracking-[-0.02em]">
              The Natural World
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { src: '/videos/nature-hero.mp4', label: 'Forest Canopy', desc: 'Ancient ecosystems thriving' },
              { src: '/videos/ocean-overhead.mp4', label: 'Open Ocean', desc: 'Waves rolling across the deep' },
              { src: '/videos/mountain-drone.mp4', label: 'Mountain Peaks', desc: 'Snow-capped grandeur from above' },
              { src: '/videos/river-aerial.mp4', label: 'River Systems', desc: 'Waters weaving through the land' },
            ].map((tile, i) => (
              <div
                key={i}
                className="group relative aspect-video overflow-hidden bg-[#1a1a1a] cursor-pointer"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                >
                  <source src={tile.src} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">
                    {tile.desc}
                  </p>
                  <h3 className="text-white text-xl font-bold uppercase tracking-wide">
                    {tile.label}
                  </h3>
                </div>
                <div className="absolute top-4 right-4 text-white/30 text-xs font-semibold">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Nature Statement — text only, no repeated video */}
      <section className="relative w-full min-h-[60vh] bg-white flex items-center px-6 md:px-12 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#2d5a3d] text-xs font-semibold uppercase tracking-[0.15em] mb-6">
            Our Commitment
          </p>
          <h2 className="text-[#0a0a0a] text-[clamp(28px,4vw,48px)] font-bold uppercase leading-[0.95] tracking-[-0.02em] mb-8">
            Nature is Not a Place to Visit. It is Home.
          </h2>
          <p className="text-[#0a0a0a]/60 text-sm leading-relaxed mb-6">
            Every Solterraform initiative begins with a deep respect for the natural
            systems that sustain life. Our biomimicry research division studies
            the efficiency of photosynthesis, the resilience of coral reefs, and
            the self-healing properties of forests.
          </p>
          <p className="text-[#0a0a0a]/60 text-sm leading-relaxed">
            These insights inform our solar arrays, our water management systems,
            and our material science — creating technology that works with nature,
            not against it.
          </p>
        </div>
      </section>

      {/* 4. Earth Cosmos — drone zoom-out to space */}
      <section className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/earth-cosmos.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-white/50 text-xs font-semibold uppercase tracking-[0.2em] mb-6">
            From the Ground to the Stars
          </p>
          <h2 className="text-white text-[clamp(32px,6vw,80px)] font-bold uppercase leading-[0.9] tracking-[-0.02em] max-w-4xl">
            One Home. One Future.
          </h2>
          <p className="text-white/60 text-sm max-w-lg mt-6 leading-relaxed">
            Every dwelling nestled in nature connects to the greater whole. From a single
            home among the trees to our shared planet spinning in the cosmos — 
            we are all part of one living system.
          </p>
          <Link
            to="/"
            className="pill-btn border-white text-white mt-10 inline-block"
          >
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
      </footer>
    </main>
  );
}
