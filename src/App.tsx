import { Routes, Route, useLocation } from 'react-router';
import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Investors from './pages/Investors';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/investors" element={<Investors />} />
      </Routes>
    </>
  );
}
