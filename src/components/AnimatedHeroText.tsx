import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';
import { FONTS } from '../config/fonts';
import { useState, useEffect } from 'react';

interface AnimatedHeroTextProps {
  text: string;
  delay?: number;
  fontSize?: string;
}

export function AnimatedHeroText({ text, delay = 0, fontSize: propFontSize }: AnimatedHeroTextProps) {
  const { theme } = useTheme();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive breakpoints
  const isMobile = windowWidth <= 600;
  const isSmallTab = windowWidth >= 601 && windowWidth <= 1079;
  const isBigTab = windowWidth >= 1080 && windowWidth <= 1280;
  
  // Font sizes based on breakpoint (use prop if provided, otherwise use default responsive logic)
  let fontSize = propFontSize || '132px'; // Default (>1280px)
  if (!propFontSize) {
    if (isMobile) fontSize = '56px';
    else if (isSmallTab) fontSize = '92px';
    else if (isBigTab) fontSize = '128px';
  }

  // Letter spacing based on breakpoint - tighter for mobile
  let letterSpacing = '-3.7662px'; // Default
  if (isMobile) letterSpacing = '-1.5px'; // Improved spacing for mobile
  else if (isSmallTab) letterSpacing = '-2.5px';
  else if (isBigTab) letterSpacing = '-3.2px';

  return (
    <motion.h1
      className={`mb-0 ${FONTS.branding} ${
        theme === 'dark' ? 'text-[#C0C0C0]' : 'text-gray-900'
      }`}
      style={{
        fontSize: fontSize,
        fontWeight: 400,
        lineHeight: '100%',
        letterSpacing: letterSpacing,
        textShadow: '0 0 15px rgba(255, 255, 255, 0.12), 0 0 30px rgba(255, 255, 255, 0.06)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    >
      {text}
    </motion.h1>
  );
}