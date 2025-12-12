import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import lightModeLogo from 'figma:asset/c6e878ec99d5a6a46f2ef96f6eec5542faa878ff.png';
import darkModeLogo from 'figma:asset/6d2fa2cbe0d69440a2e9d4951b4dbf4fea83e7fd.png';

// Mobile Menu Dialog Component
function MobileMenuDialog({ isOpen, onClose, showWaitlistButton, isInWaitlistSection }: { isOpen: boolean; onClose: () => void; showWaitlistButton: boolean; isInWaitlistSection: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'features', 'about', 'contact'];
      const navHeight = 72;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= navHeight + 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight = 72;
      const y = section.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
      onClose();
    }
  };

  const scrollToWaitlist = () => {
    const section = document.getElementById('waitlist');
    if (section) {
      const navHeight = 72;
      const y = section.getBoundingClientRect().top + window.pageYOffset - navHeight - 40;
      window.scrollTo({ top: y, behavior: 'smooth' });
      onClose();
    }
  };

  // Generate random particles - less in mobile menu
  const particleCount = theme === 'dark' ? 15 : 25;
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 4,
    size: 1 + Math.random() * 2,
  }));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - no onClick handler to prevent closing when clicking outside */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Menu Dialog */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed top-0 right-0 h-full w-[200px] z-50 flex flex-col overflow-hidden ${
              theme === 'dark' ? 'bg-black' : 'bg-white'
            }`}
            style={{
              boxShadow: theme === 'dark' 
                ? '-4px 0 24px rgba(0, 0, 0, 0.5)' 
                : '-4px 0 24px rgba(0, 0, 0, 0.15)',
              borderLeft: theme === 'dark'
                ? '0.5px solid rgba(255, 255, 255, 0.1)'
                : '0.5px solid rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Glowing blue gradient at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none"
              style={{
                background: theme === 'dark'
                  ? 'radial-gradient(ellipse at center bottom, rgba(0, 13, 87, 0.3) 0%, rgba(7, 13, 50, 0.15) 40%, transparent 70%)'
                  : 'radial-gradient(ellipse at center bottom, rgba(59, 130, 246, 0.12) 0%, rgba(147, 197, 253, 0.08) 40%, transparent 70%)',
                filter: 'blur(25px)',
                animation: 'pulse 4s ease-in-out infinite',
              }}
            />

            {/* Particle emission effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute rounded-full"
                  style={{
                    left: particle.left,
                    bottom: '-10px',
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    background: theme === 'dark' ? '#6B93E8' : '#3B82F6',
                    boxShadow: theme === 'dark'
                      ? `0 0 ${particle.size * 2}px rgba(107, 147, 232, 0.6), 0 0 ${particle.size * 4}px rgba(59, 130, 246, 0.4)`
                      : `0 0 ${particle.size * 2}px rgba(59, 130, 246, 0.5), 0 0 ${particle.size * 4}px rgba(147, 197, 253, 0.3)`,
                  }}
                  initial={{ 
                    y: 0, 
                    opacity: 0,
                    scale: 0
                  }}
                  animate={{
                    y: -420,
                    opacity: [0, 0.7, 0.7, 0],
                    scale: [0, 1, 1, 0.5],
                  }}
                  transition={{
                    duration: particle.duration,
                    delay: particle.delay,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              ))}
            </div>

            {/* Close Button */}
            <div className="flex justify-end p-4 relative z-10">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className={`p-1 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Menu Items */}
            <nav className="flex flex-col px-6 space-y-4 relative z-10">
              {/* Home */}
              <motion.button
                whileHover={{ x: 8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('hero')}
                className={`text-left font-['Poppins:SemiBold',sans-serif] text-[18px] leading-[1.4] transition-colors ${
                  activeSection === 'hero'
                    ? theme === 'dark' ? 'text-white' : 'text-gray-900'
                    : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Home
              </motion.button>

              {/* Features */}
              <motion.button
                whileHover={{ x: 8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('features')}
                className={`text-left font-['Poppins:SemiBold',sans-serif] text-[18px] leading-[1.4] transition-colors ${
                  activeSection === 'features'
                    ? theme === 'dark' ? 'text-white' : 'text-gray-900'
                    : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Features
              </motion.button>

              {/* About Us */}
              <motion.button
                whileHover={{ x: 8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('about')}
                className={`text-left font-['Poppins:SemiBold',sans-serif] text-[18px] leading-[1.4] transition-colors ${
                  activeSection === 'about'
                    ? theme === 'dark' ? 'text-white' : 'text-gray-900'
                    : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                About Us
              </motion.button>

              {/* Contact */}
              <motion.button
                whileHover={{ x: 8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('contact')}
                className={`text-left font-['Poppins:SemiBold',sans-serif] text-[18px] leading-[1.4] transition-colors ${
                  activeSection === 'contact'
                    ? theme === 'dark' ? 'text-white' : 'text-gray-900'
                    : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Contact
              </motion.button>

              {/* Join Waitlist Button - only shown for very small screens */}
              {showWaitlistButton && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="pt-2"
                >
                  <button
                    className={`group relative w-full font-['Poppins:SemiBold',sans-serif] h-[44px] rounded-[6px] px-4 text-[16px] overflow-hidden transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-white text-black'
                        : 'bg-transparent text-white'
                    }`}
                    onClick={scrollToWaitlist}
                  >
                    <span className={`relative z-10 transition-colors duration-300 ${
                      theme === 'dark'
                        ? isInWaitlistSection ? 'text-white' : 'text-black group-hover:text-white'
                        : isInWaitlistSection ? 'text-black' : 'text-white group-hover:text-black'
                    }`}>
                      Join Waitlist
                    </span>
                    {/* Gradient overlay with metallic stroke */}
                    <div 
                      className={`absolute inset-0 transition-all duration-300 ${
                        theme === 'dark'
                          ? isInWaitlistSection ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          : isInWaitlistSection ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
                      }`}
                      style={{
                        background: 'radial-gradient(circle at center, #0D0D0D 24%, #0A0D20 78%, #000D57 96%)',
                        borderRadius: '6px',
                        boxShadow: 'inset 0 0 0 0.8px rgba(232, 232, 232, 0.8), 0 0 20px rgba(232, 232, 232, 0.6), 0 0 40px rgba(184, 184, 184, 0.4)',
                      }}
                    />
                    {/* White background overlay for hover in light mode */}
                    <div 
                      className={`absolute inset-0 transition-all duration-300 ${
                        theme === 'dark'
                          ? 'opacity-0'
                          : isInWaitlistSection ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                      style={{
                        background: 'white',
                        borderRadius: '6px',
                        border: '0.8px solid black',
                      }}
                    />
                  </button>
                </motion.div>
              )}
            </nav>

            {/* Theme Toggle with separator line */}
            <div className="mt-auto px-6 pb-8 relative z-10">
              {/* Subtle separator line */}
              <div 
                className={`h-[1px] mb-6 ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' 
                    : 'bg-gradient-to-r from-transparent via-gray-300/60 to-transparent'
                }`}
              />
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between"
              >
                <span className={`font-['Poppins:SemiBold',sans-serif] text-[18px] ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Theme
                </span>
                <motion.button
                  onClick={() => {
                    toggleTheme();
                    onClose();
                  }}
                  className="relative w-[48px] h-[26px] rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#E5E7EB',
                    border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.15)',
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Toggle theme"
                >
                  {/* Sliding Circle */}
                  <motion.div
                    className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-md"
                    animate={{
                      left: theme === 'dark' ? '26px' : '3px',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 700,
                      damping: 35,
                      mass: 0.5,
                    }}
                  />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('hero');
  const [isInWaitlistSection, setIsInWaitlistSection] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);

  // Track window width for responsive behavior
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'features', 'about', 'contact'];
      const navHeight = 72;
      
      // Find which section is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Consider section active if it's in the upper portion of viewport
          if (rect.top <= navHeight + 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }

      // Check if waitlist section is in view
      const waitlistSection = document.getElementById('waitlist');
      if (waitlistSection) {
        const rect = waitlistSection.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
        setIsInWaitlistSection(isInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight = 72;
      const y = section.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToWaitlist = () => {
    const section = document.getElementById('waitlist');
    if (section) {
      const navHeight = 72;
      const y = section.getBoundingClientRect().top + window.pageYOffset - navHeight - 40;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Determine if we should show mobile/tablet layout
  // Mobile: 300-600px, Small Tab: 601-1079px
  const isMobileOrSmallTab = windowWidth >= 300 && windowWidth <= 1079;
  const isVerySmallMobile = windowWidth < 432;

  return (
    <>
      <MobileMenuDialog isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} showWaitlistButton={isVerySmallMobile} isInWaitlistSection={isInWaitlistSection} />
      
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed left-0 right-0 top-0 z-40 transition-colors ${
          theme === 'dark'
            ? 'bg-[#0d0d0d] border-b border-[#C0C0C0]/40'
            : 'bg-white border-b border-gray-200'
        }`}
      >
        <div className={`mx-auto flex h-[72px] items-center justify-between ${
          isMobileOrSmallTab ? 'px-4' : 'max-w-[1440px] px-[72px]'
        }`}>
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`block cursor-pointer ${
              isMobileOrSmallTab ? 'h-[56px] w-[104px]' : 'h-[72px] w-[133px]'
            }`}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img 
              alt="DiagnoX Logo" 
              className="h-full w-full object-contain" 
              src={theme === 'dark' ? darkModeLogo : lightModeLogo} 
            />
          </motion.button>

          {isMobileOrSmallTab ? (
            // Mobile & Small Tab Layout
            <div className="flex items-center gap-4">
              {/* Join Waitlist Button - hidden on very small screens */}
              {!isVerySmallMobile && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
                    className={`group relative font-['Poppins:SemiBold',sans-serif] h-[40px] rounded-[6px] px-4 text-[14px] overflow-hidden transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-white text-black'
                        : 'bg-transparent text-white'
                    }`}
                    onClick={scrollToWaitlist}
                  >
                    <span className={`relative z-10 transition-colors duration-300 ${
                      theme === 'dark'
                        ? isInWaitlistSection ? 'text-white' : 'text-black group-hover:text-white'
                        : isInWaitlistSection ? 'text-black' : 'text-white group-hover:text-black'
                    }`}>
                      Join Waitlist
                    </span>
                    {/* Gradient overlay with metallic stroke */}
                    <div 
                      className={`absolute inset-0 transition-all duration-300 ${
                        theme === 'dark'
                          ? isInWaitlistSection ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          : isInWaitlistSection ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
                      }`}
                      style={{
                        background: 'radial-gradient(circle at center, #0D0D0D 24%, #0A0D20 78%, #000D57 96%)',
                        borderRadius: '6px',
                        boxShadow: 'inset 0 0 0 0.8px rgba(232, 232, 232, 0.8), 0 0 20px rgba(232, 232, 232, 0.6), 0 0 40px rgba(184, 184, 184, 0.4)',
                      }}
                    />
                    {/* White background overlay for hover in light mode */}
                    <div 
                      className={`absolute inset-0 transition-all duration-300 ${
                        theme === 'dark'
                          ? 'opacity-0'
                          : isInWaitlistSection ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                      style={{
                        background: 'white',
                        borderRadius: '6px',
                        border: '0.8px solid black',
                      }}
                    />
                  </button>
                </motion.div>
              )}

              {/* Hamburger Menu */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(true)}
                className={`p-2 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}
                aria-label="Open menu"
              >
                <Menu size={24} />
              </motion.button>
            </div>
          ) : (
            // Default & Big Tab Layout (Desktop)
            <div className="flex items-center gap-[32px]">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('features')}
                className={`font-['Poppins:SemiBold',sans-serif] text-[16px] tracking-[-0.08px] leading-[1.45] cursor-pointer transition-colors ${
                  activeSection === 'features'
                    ? theme === 'dark'
                      ? 'text-[#ffffff]'
                      : 'text-gray-900'
                    : theme === 'dark'
                      ? 'text-[#C0C0C0] hover:text-[#ffffff]'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Features
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('about')}
                className={`font-['Poppins:SemiBold',sans-serif] text-[16px] tracking-[-0.08px] leading-[1.45] cursor-pointer transition-colors ${
                  activeSection === 'about'
                    ? theme === 'dark'
                      ? 'text-[#ffffff]'
                      : 'text-gray-900'
                    : theme === 'dark'
                      ? 'text-[#C0C0C0] hover:text-[#ffffff]'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                About Us
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className={`font-['Poppins:SemiBold',sans-serif] text-[16px] tracking-[-0.08px] leading-[1.45] cursor-pointer transition-colors ${
                  activeSection === 'contact'
                    ? theme === 'dark'
                      ? 'text-[#ffffff]'
                      : 'text-gray-900'
                    : theme === 'dark'
                      ? 'text-[#C0C0C0] hover:text-[#ffffff]'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Contact
              </motion.button>
              
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="relative w-[42px] h-[22px] rounded-full transition-all duration-300"
                style={{
                  backgroundColor: theme === 'dark' ? '#1a1a1a' : '#E5E7EB',
                  border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.15)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle theme"
              >
                {/* Sliding Circle */}
                <motion.div
                  className="absolute top-[3px] w-[14px] h-[14px] rounded-full bg-white shadow-sm"
                  animate={{
                    left: theme === 'dark' ? '23px' : '3px',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 700,
                    damping: 35,
                    mass: 0.5,
                  }}
                />
              </motion.button>

              {/* CTA Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  className={`group relative font-['Poppins:SemiBold',sans-serif] h-[56px] gap-[10px] rounded-[8px] px-[24px] py-[16px] overflow-hidden transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-white text-black'
                      : isInWaitlistSection
                        ? 'bg-white text-black'
                        : 'bg-transparent text-white group-hover:text-black'
                  }`}
                  style={{
                    border: theme === 'dark'
                      ? 'none'
                      : isInWaitlistSection
                        ? '0.8px solid black'
                        : 'none',
                  }}
                  onClick={scrollToWaitlist}
                >
                  <span className={`relative z-10 transition-colors duration-300 ${
                    theme === 'dark'
                      ? isInWaitlistSection ? 'text-white' : 'group-hover:text-white'
                      : isInWaitlistSection ? 'text-black' : 'text-white group-hover:text-black'
                  }`}>
                    Join Waitlist
                  </span>
                  {/* Gradient overlay with metallic stroke */}
                  <div 
                    className={`absolute inset-0 transition-all duration-300 ${
                      theme === 'dark'
                        ? isInWaitlistSection ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        : isInWaitlistSection ? 'opacity-0 group-hover:opacity-0' : 'opacity-100 group-hover:opacity-0'
                    }`}
                    style={{
                      background: 'radial-gradient(circle at center, #0D0D0D 24%, #0A0D20 78%, #000D57 96%)',
                      borderRadius: '8px',
                      boxShadow: theme === 'dark'
                        ? (isInWaitlistSection 
                          ? 'inset 0 0 0 0.8px rgba(232, 232, 232, 0.8), 0 0 20px rgba(232, 232, 232, 0.6), 0 0 40px rgba(184, 184, 184, 0.4)' 
                          : 'inset 0 0 0 0.8px rgba(232, 232, 232, 0.8)')
                        : (isInWaitlistSection
                          ? 'inset 0 0 0 0.8px rgba(232, 232, 232, 0.8)'
                          : 'inset 0 0 0 0.8px rgba(232, 232, 232, 0.8), 0 0 20px rgba(232, 232, 232, 0.6), 0 0 40px rgba(184, 184, 184, 0.4)'),
                    }}
                  />
                  {/* White background overlay for hover in light mode */}
                  <div 
                    className={`absolute inset-0 transition-all duration-300 ${
                      theme === 'dark'
                        ? 'opacity-0'
                        : isInWaitlistSection ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                    style={{
                      background: 'white',
                      borderRadius: '8px',
                      border: '0.8px solid black',
                    }}
                  />
                </button>
              </motion.div>
            </div>
          )}
        </div>
      </motion.nav>
    </>
  );
}