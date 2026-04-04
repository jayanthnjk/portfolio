import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSpy } from '../hooks/useScrollSpy';
import type { NavLink } from '../types';

const NAV_LINKS: NavLink[] = [
  { label: 'Home', sectionId: 'hero' },
  { label: 'About', sectionId: 'about' },
  { label: 'Projects', sectionId: 'skills' },
  { label: 'Case Studies', sectionId: 'projects' },
];
const IDS = NAV_LINKS.map((l) => l.sectionId);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(26,26,46,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-[68px]">
        {/* Logo */}
        <button onClick={() => go('hero')} className="flex items-center gap-2">
          <span className="text-coral-500 text-xl">✦</span>
          <span className="text-white text-base font-bold font-heading">connect-jayanth</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <button key={l.sectionId} onClick={() => go(l.sectionId)}
              className="relative px-3.5 py-2 text-[13px] font-medium transition-colors duration-200"
              style={{ color: active === l.sectionId ? '#ff6b4a' : 'rgba(255,255,255,0.55)' }}>
              {l.label}
            </button>
          ))}
          <button onClick={() => go('contact')}
            className="ml-4 btn-coral !py-2 !px-5 !text-[13px]">
            <span>Let's Connect</span>
          </button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-white/70" aria-label="Toggle menu" aria-expanded={open}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
            {open
              ? <><line x1={18} y1={6} x2={6} y2={18}/><line x1={6} y1={6} x2={18} y2={18}/></>
              : <><line x1={4} y1={7} x2={20} y2={7}/><line x1={4} y1={12} x2={20} y2={12}/><line x1={4} y1={17} x2={20} y2={17}/></>}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(26,26,46,0.98)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="px-4 py-3 space-y-0.5">
              {NAV_LINKS.map((l) => (
                <button key={l.sectionId} onClick={() => go(l.sectionId)}
                  className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    color: active === l.sectionId ? '#ff6b4a' : 'rgba(255,255,255,0.5)',
                    background: active === l.sectionId ? 'rgba(255,107,74,0.08)' : 'transparent',
                  }}>
                  {l.label}
                </button>
              ))}
              <div className="pt-2">
                <button onClick={() => go('contact')} className="w-full btn-coral justify-center !text-[13px]">
                  <span>Let's Connect</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
