import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    if (!isHome) {
      window.location.href = `/${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-[#0F1419]/90 backdrop-blur-md border-b border-[#2A9D8F]/10'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-5">
        <Link
          to="/"
          className="text-xs font-bold uppercase tracking-[0.2em] text-[#F4F1EA] hover:text-[#2A9D8F] transition-colors duration-300"
        >
          SOLTERRAFORM
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {[
            { label: 'Opportunity', id: 'opportunity' },
            { label: 'Collaboration', id: 'collaboration' },
            { label: 'Pipeline', id: 'pipeline' },
            { label: 'Technology', id: 'technology' },
            { label: 'Network', id: 'network' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#F4F1EA]/60 hover:text-[#2A9D8F] transition-all duration-300 hover:tracking-[0.2em]"
            >
              {item.label}
            </button>
          ))}
          <Link
            to="/investors"
            className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#E9C46A] hover:text-[#F4F1EA] transition-all duration-300"
          >
            Investors
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#F4F1EA] text-xs font-semibold uppercase tracking-widest"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0F1419]/95 backdrop-blur-sm py-8 px-6 flex flex-col gap-5 border-b border-[#2A9D8F]/10">
          {[
            { label: 'Opportunity', id: 'opportunity' },
            { label: 'Collaboration', id: 'collaboration' },
            { label: 'Pipeline', id: 'pipeline' },
            { label: 'Technology', id: 'technology' },
            { label: 'Network', id: 'network' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-xs font-medium uppercase tracking-[0.15em] text-[#F4F1EA]/60 hover:text-[#2A9D8F] transition-all text-left"
            >
              {item.label}
            </button>
          ))}
          <Link
            to="/investors"
            onClick={() => setMenuOpen(false)}
            className="text-xs font-semibold uppercase tracking-[0.15em] text-[#E9C46A] hover:text-[#F4F1EA] transition-all"
          >
            Investors
          </Link>
        </div>
      )}
    </nav>
  );
}
