/**
 * ============================================================================
 * DiagnoX Landing Page - Main Application Component
 * ============================================================================
 * 
 * A fully responsive landing page with light/dark theme support featuring:
 * - Hero section with animated text and floating product showcase
 * - Features section with interactive bento grid layout
 * - About section with workflow steps and benefit cards
 * - Contact/Waitlist section with form and social links
 * 
 * Responsive Breakpoints:
 * - Mobile: 300-600px
 * - Small Tab: 601-1079px
 * - Big Tab: 1080-1280px
 * - Desktop: >1280px
 * 
 * ============================================================================
 */

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, PanInfo } from 'framer-motion';
import { Instagram, Linkedin, CheckCircle2, Sparkles } from 'lucide-react';

// Components
import { Input } from './components/ui/input';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import { NavBar } from './components/NavBar';
import { AnimatedHeroText } from './components/AnimatedHeroText';
import { BentoGrid } from './components/BentoCards';
import { BenefitCard } from './components/BenefitCard';
import { BenefitTabMobile } from './components/BenefitTabMobile';
import { XIcon } from './components/XIcon';
import { ContactDialog } from './components/ContactDialog';
import { FAQDialog } from './components/FAQDialog';
import { FAQMobilePage } from './components/FAQMobilePage';
import { ContactMobilePage } from './components/ContactMobilePage';
import { BenefitCarousel } from './components/BenefitCarousel';

// Configuration
import { FONTS } from './config/fonts';

// Assets
import svgPaths from './imports/svg-sppztv54cx';
import imgMockupRemovebg1 from 'figma:asset/83cc5e54f935b3e722af1ce6b7f8180b5220a779.png';
import imgCarInteriorBg from 'figma:asset/fb49ace1073bc7e1df7f1b5b69f317e26e62b4cd.png';
import imgCarExteriorBg from 'figma:asset/5861ff159f40f03e55d97588c9e598b980c186e2.png';

/**
 * ============================================================================
 * HERO SECTION
 * ============================================================================
 * 
 * Features:
 * - Animated gradient background
 * - Particle emission effects
 * - Big bold animated hero text
 * - Floating product mockup with parallax
 * - Fully responsive with mathematical scaling ratios
 * 
 * Scaling Ratios:
 * - Hero height to text size: 5.7:1
 * - Hero height to viewport width: 10.9:1
 * 
 * ============================================================================
 */
function HeroSection() {
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ============================================================================
  // Responsive Breakpoints
  // ============================================================================
  const isSmallTab = windowWidth >= 601 && windowWidth <= 1079;
  const isBigTab = windowWidth >= 1080 && windowWidth <= 1280;
  const isMobile = windowWidth >= 300 && windowWidth <= 600;
  
  // ============================================================================
  // Responsive Values
  // ============================================================================
  
  // Hero section height
  const heroHeight = isMobile ? '770px' : isSmallTab ? '860px' : '752px';
  
  // Image scale factors (percentage reduction from default)
  // Mobile: 60% reduction, Small Tab: 36% reduction, Big Tab: 10% reduction
  let imageScale = 1;
  if (isMobile) imageScale = 0.40;
  else if (isSmallTab) imageScale = 0.64;
  else if (isBigTab) imageScale = 0.9;
  
  // Text sizes
  const smallTextSize = isMobile ? '10.1px' : isSmallTab ? '14px' : '16px';
  const bigTextSize = isMobile ? '56px' : isSmallTab ? '92px' : '132px';
  
  // Text vertical positioning (for centering effect)
  const textTopPosition = isMobile ? '287px' : isSmallTab ? '255px' : isBigTab ? '88px' : '72px';
  
  // Gap between hero title and subtitle
  const textGap = isMobile ? '18px' : isSmallTab ? '30px' : '15px';
  
  // Image Y-axis translation for floating effect
  const imageTranslateY = isMobile ? -44 : isSmallTab ? -19 : 20;

  // ============================================================================
  // Particle Animation Configuration
  // ============================================================================
  const particleCount = theme === 'dark' ? 30 : 50;
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 4,
    size: 1 + Math.random() * 2,
  }));

  return (
    <section
      id="hero"
      className={`relative w-full overflow-clip ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-[#0d0d0d] from-[73.676%] via-[#070d32] via-[102.02%] to-[#000d57] to-[113.83%]'
          : 'bg-gradient-to-b from-gray-50 via-blue-50 to-blue-100'
      }`}
      style={{ height: heroHeight }}
    >
      {/* Glowing gradient at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[300px] pointer-events-none"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(ellipse at center bottom, rgba(0, 13, 87, 0.4) 0%, rgba(7, 13, 50, 0.2) 40%, transparent 70%)'
            : 'radial-gradient(ellipse at center bottom, rgba(59, 130, 246, 0.15) 0%, rgba(147, 197, 253, 0.1) 40%, transparent 70%)',
          filter: 'blur(30px)',
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
                ? `0 0 ${particle.size * 2}px rgba(107, 147, 232, 0.8), 0 0 ${particle.size * 4}px rgba(59, 130, 246, 0.6)`
                : `0 0 ${particle.size * 2}px rgba(59, 130, 246, 0.6), 0 0 ${particle.size * 4}px rgba(147, 197, 253, 0.4)`,
            }}
            initial={{ 
              y: 0, 
              opacity: 0,
              scale: 0
            }}
            animate={{
              y: -800,
              opacity: [0, 0.8, 0.8, 0],
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

      {/* Main content: Text + Product */}
      <motion.div
        style={{ y }}
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pb-[264px] pt-0 px-0"
        style={{
          y,
          top: textTopPosition,
        }}
      >
        {/* Text Container */}
        <div className="flex flex-col items-center text-center px-[20px] mb-[-264px]">
          {/* Hero Title */}
          <div className="w-full max-w-[1155px] flex flex-col items-center">
            <AnimatedHeroText text="The Intelligence" delay={0.3} />
            <AnimatedHeroText text="Behind Every Drive" delay={0.7} />
          </div>
          
          {/* Hero Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className={`max-w-[551px] text-center ${FONTS.bodySemiBold} leading-[1.3] tracking-normal ${
              theme === 'dark' ? '' : 'text-black'
            }`}
            style={theme === 'dark' ? {
              fontSize: smallTextSize,
              marginTop: textGap,
              background: 'linear-gradient(135deg, #B8B8B8 0%, #E8E8E8 50%, #B8B8B8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            } : {
              fontSize: smallTextSize,
              marginTop: textGap,
            }}
          >
            {isMobile ? (
              <>
                DiagnoX is redefining car health with AI-powered diagnostics<br />
                that predict, prevent, and perfect performance.
              </>
            ) : (
              <>
                DiagnoX is redefining car health with AI-powered diagnostics that<br />
                predict, prevent, and perfect performance.
              </>
            )}
          </motion.p>
        </div>

        {/* Product Image - Floating mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 * imageScale, y: imageTranslateY }}
          animate={{ opacity: 1, scale: imageScale, y: imageTranslateY }}
          transition={{ duration: 1, delay: 0.9 }}
          className="relative flex items-center justify-center mb-[-264px]"
          style={{ 
            height: 'calc(1px * ((1780.75 * 0.008380573242902756) + (1186 * 0.9999648928642273)))',
            width: 'calc(1px * ((1186 * 0.008380573242902756) + (1780.75 * 0.9999648928642273)))',
          }}
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex-none rotate-[179.52deg]"
          >
            <div className="relative h-[1186.01px] w-[1780.76px]">
              <img
                src={imgMockupRemovebg1}
                alt="DiagnoX Device"
                className="absolute inset-0 pointer-events-none size-full max-w-none object-cover object-[50%_50%]"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/**
 * ============================================================================
 * FEATURES SECTION
 * ============================================================================
 * 
 * Displays "What do we offer?" with a bento grid layout showing all features
 * 
 * Features:
 * - Responsive bento grid with hover/click interactions
 * - Different layouts for mobile (stacked accordion) vs desktop (grid)
 * - Smooth animations on scroll
 * 
 * ============================================================================
 */
function FeaturesSection() {
  const { theme } = useTheme();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);
  const x = useMotionValue(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ============================================================================
  // Responsive Breakpoints
  // ============================================================================
  const isSmallTabMobileLayout = windowWidth >= 601 && windowWidth <= 750;
  const isSmallTab = windowWidth >= 751 && windowWidth <= 1079;
  const isMobile = windowWidth >= 300 && windowWidth <= 600;
  
  // ============================================================================
  // Responsive Values
  // ============================================================================
  
  // Heading font size (reduced by 8px for small tab, 16% for mobile)
  const headingFontSize = isMobile ? '37px' : isSmallTabMobileLayout ? '37px' : isSmallTab ? '56px' : '64px';
  
  // Section height (increased 150px for small tab, reduced 60px for mobile)
  const sectionHeight = isMobile ? '962px' : isSmallTabMobileLayout ? '962px' : isSmallTab ? '1022px' : '752px';

  // Padding adjustments (reduced by 36px top and bottom for mobile)
  const paddingTop = (isMobile || isSmallTabMobileLayout) ? -27 : 9;
  const paddingBottom = (isMobile || isSmallTabMobileLayout) ? -12 : 24;

  // Handle horizontal drag
  const handleDragEnd = (event: any, info: PanInfo) => {
    // Optional: Add haptic feedback or visual response
    const velocity = Math.abs(info.velocity.x);
    if (velocity > 100) {
      // Snap back with spring animation
      x.set(0);
    }
  };

  return (
    <section
      id="features"
      className={`relative flex items-center justify-center scroll-mt-[44px] ${
        theme === 'dark' ? 'bg-[#000000]' : 'bg-white'
      }`}
      style={{ height: sectionHeight }}
    >
      <div className="flex flex-col items-center w-full" style={{ maxWidth: '1440px', padding: `${paddingTop}px 24px ${paddingBottom}px 24px`, gap: '10px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center w-full"
          style={{ maxWidth: '1200px', gap: '36px' }}
        >
          <motion.h2 
            className={FONTS.heading}
            style={{ 
              fontSize: headingFontSize,
              lineHeight: '100%',
              letterSpacing: '0.5%',
              color: theme === 'dark' ? '#FFFFFF' : '#000000',
              cursor: 'grab',
              touchAction: 'pan-y',
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            onDragEnd={handleDragEnd}
            whileDrag={{ cursor: 'grabbing' }}
          >
            What do we offer?
          </motion.h2>
          
          <BentoGrid />
        </motion.div>
      </div>
    </section>
  );
}

/**
 * ============================================================================
 * ABOUT US SECTION
 * ============================================================================
 * 
 * Two-part section:
 * 1. "How does DiagnoX work?" - Workflow steps with sequential animation
 * 2. "Why choose DiagnoX?" - Benefit cards with hover/tab interactions
 * 
 * Features:
 * - Sequential glowing animation for workflow steps (10.2s cycle)
 * - Floating mockup background with subtle effects
 * - Tab-based interface for mobile/tablet
 * - Card grid for desktop
 * 
 * ============================================================================
 */
function AboutUsSection() {
  const { theme } = useTheme();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset animation when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset animation by changing key - forces remount and sync
            setAnimationKey((prev) => prev + 1);
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% visible
    );

    const section = document.getElementById('about');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // ============================================================================
  // Responsive Breakpoints
  // ============================================================================
  const isSmallTab = windowWidth >= 601 && windowWidth <= 1079;
  const isBigTab = windowWidth >= 1080 && windowWidth <= 1280;
  const isMobile = windowWidth >= 300 && windowWidth <= 650;
  
  // ============================================================================
  // Scale Factors and Adjustments
  // ============================================================================
  
  // Overall scale factor: Mobile 12% reduction, Tab 2% reduction
  const scaleFactor = isMobile ? 0.88 : (isSmallTab || isBigTab) ? 0.98 : 1;
  
  // Image scale: Mobile 33.8% reduction, Tab 2% reduction
  const imageScale = isMobile ? 0.662112 : (isSmallTab || isBigTab) ? 0.98 : 1;
  
  // Layout adjustments
  const leftPaddingAdjustment = isMobile ? 8 : isBigTab ? 24 : isSmallTab ? 12 : 0;
  const imageRightAdjustment = isMobile ? 54 : isSmallTab ? -36 : 0;
  const topPaddingAdjustment = isMobile ? 28 : isSmallTab ? 64 : 0;
  
  // Section heights
  const firstPartHeight = isMobile ? 860 : isSmallTab ? 860 : 752;
  const secondPartHeight = isMobile ? 860 : isSmallTab ? 860 : 752;
  const totalSectionHeight = isMobile ? (860 + 860) : isSmallTab ? (860 + 860) : 1504;
  
  // Typography adjustments
  const headingSizeAdjustment = isMobile ? -10 : 0;
  const stepTextSizeAdjustment = isMobile ? -4 : 0;
  const bulletSizeAdjustment = isMobile ? -4 : 0;
  const lineHeightAdjustment = isMobile ? 4 : 0;
  const marginBottomAdjustment = isMobile ? 16 : 0;
  
  // Image positioning
  const imageTopAdjustment = isMobile ? -10 : 0;

  // Sequential animation toggle
  const useSequentialAnimation = isMobile || isSmallTab || isBigTab;

  // ============================================================================
  // Content Data
  // ============================================================================
  
  // Workflow steps for "How does DiagnoX work?"
  const steps = [
    'Plug In the Dongle',
    'Instant App Sync',
    'Cloud-Based Data Analysis',
    'Get Your Vehicle Health Report',
    'Stay Informed Anywhere, Anytime',
  ];

  // Benefits for "Why choose DiagnoX?"
  const benefits = [
    {
      title: 'Instant, Accurate Diagnostics',
      description: 'DiagnoX delivers rapid, AI-driven health checks for your vehicle, transforming raw sensor data into clear, actionable insights—so you know exactly what your car needs, fast.',
      icon: 'zap' as const,
    },
    {
      title: 'Proactive Peace of Mind',
      description: "DiagnoX helps you prevent breakdowns & costly repairs by sending early warnings & predictive maintenance alerts based on real AI analysis of your car's condition & usage.",
      icon: 'bell' as const,
    },
    {
      title: 'Data Security & Privacy',
      description: "Your vehicle's data is transmitted & stored securely in the cloud using modern encryption methods, so you're always protected—DiagnoX never shares or sells your data.",
      icon: 'lock' as const,
    },
    {
      title: 'User-Friendly & Accessible',
      description: 'Plug and play setup, intuitive mobile app, and remote access mean anyone can use DiagnoX — no technical expertise or complex setup required.',
      icon: 'smartphone' as const,
    },
  ];

  return (
    <section id="about" className="relative overflow-hidden" style={{ height: `${totalSectionHeight}px` }}>
      {/* ========================================================================
          FIRST PART: How does DiagnoX work?
          ======================================================================== */}
      <div 
        className={`relative ${theme === 'dark' ? 'bg-[#000000]' : 'bg-gray-50'}`}
        style={{ height: `${firstPartHeight}px` }}
      >
        {/* Floating mockup background image */}
        <div 
          className="absolute pointer-events-none z-0"
          style={{
            right: `${-592 + imageRightAdjustment}px`,
            top: `${(-560 * imageScale) + imageTopAdjustment}px`,
            width: `${1926.58 * imageScale}px`,
            height: `${1283.13 * imageScale}px`,
            transform: 'rotate(48.99deg)',
            transformOrigin: 'center center',
          }}
        >
          <div className="relative size-full">
            <img
              src={imgMockupRemovebg1}
              alt=""
              className="size-full object-contain"
              style={{ opacity: 0.15 }}
            />
            
            {/* Pulsing glow aura */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: theme === 'dark'
                  ? 'radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 0%, rgba(147, 197, 253, 0.04) 30%, transparent 60%)'
                  : 'radial-gradient(circle at center, rgba(59, 130, 246, 0.12) 0%, rgba(147, 197, 253, 0.06) 30%, transparent 60%)',
                filter: 'blur(80px)',
              }}
              animate={{
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Floating particles around image */}
            {Array.from({ length: 4 }, (_, i) => {
              const angle = (i / 4) * 360;
              const radius = 450 * imageScale;
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: `${2 * imageScale}px`,
                    height: `${2 * imageScale}px`,
                    background: theme === 'dark' ? '#6B93E8' : '#3B82F6',
                    boxShadow: theme === 'dark'
                      ? '0 0 4px rgba(107, 147, 232, 0.4)'
                      : '0 0 4px rgba(59, 130, 246, 0.5)',
                    left: '50%',
                    top: '50%',
                    opacity: theme === 'dark' ? 0.3 : 0.4,
                  }}
                  animate={{
                    x: [
                      Math.cos((angle * Math.PI) / 180) * radius,
                      Math.cos(((angle + 180) * Math.PI) / 180) * radius,
                      Math.cos((angle * Math.PI) / 180) * radius,
                    ],
                    y: [
                      Math.sin((angle * Math.PI) / 180) * radius,
                      Math.sin(((angle + 180) * Math.PI) / 180) * radius,
                      Math.sin((angle * Math.PI) / 180) * radius,
                    ],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    delay: i * 2,
                    ease: 'linear',
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Text content */}
        <div className="mx-auto max-w-7xl" style={{ 
          paddingLeft: `${24 + leftPaddingAdjustment}px`, 
          paddingRight: '24px',
          paddingTop: `${96 + topPaddingAdjustment}px`,
          paddingBottom: '96px'
        }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            {/* Section heading */}
            <h2 className={`${FONTS.subheading} ${
              theme === 'dark' ? 'text-white/90' : 'text-black'
            }`}
            style={{
              fontSize: `${(108 * scaleFactor) + headingSizeAdjustment}px`,
              lineHeight: `${((108 * scaleFactor) + headingSizeAdjustment) * 1.04 + lineHeightAdjustment}px`,
              letterSpacing: `${-3.786 * scaleFactor}px`,
              marginBottom: `${(48 * scaleFactor) + marginBottomAdjustment}px`,
            }}>
              How does <br />DiagnoX <span style={{ whiteSpace: 'nowrap' }}>work ?</span>
            </h2>

            {/* Workflow steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: `${24 * scaleFactor}px` }}>
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center"
                  style={{ gap: `${24 * scaleFactor}px` }}
                >
                  {/* Static bullet */}
                  <div
                    className={`shrink-0 rounded-full ${
                      theme === 'dark' ? 'bg-white/60' : 'bg-black/60'
                    }`}
                    style={{
                      width: `${(24 * scaleFactor) + bulletSizeAdjustment}px`,
                      height: `${(24 * scaleFactor) + bulletSizeAdjustment}px`,
                    }}
                  />
                  
                  {/* Static text */}
                  <p 
                    className={`${FONTS.body} ${
                      theme === 'dark' ? 'text-white/60' : 'text-black/60'
                    }`}
                    style={{
                      fontSize: `${(24 * scaleFactor) + stepTextSizeAdjustment}px`,
                      lineHeight: 1.375,
                    }}
                  >
                    {step}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ========================================================================
          SECOND PART: Why choose DiagnoX?
          ======================================================================== */}
      <motion.div 
        className="relative overflow-hidden"
        style={{ height: `${secondPartHeight}px` }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        {/* Background image with parallax - Conditional based on viewport */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${(isMobile || isSmallTab) ? imgCarExteriorBg : imgCarInteriorBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto h-full flex flex-col justify-between">
          {/* Section title bar */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center w-full"
              style={{ 
                height: '72px',
                background: windowWidth > 1280 
                  ? 'rgba(255, 255, 255, 0.15)'
                  : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: windowWidth > 1280 ? 'blur(12px)' : 'blur(4px)',
                WebkitBackdropFilter: windowWidth > 1280 ? 'blur(12px)' : 'blur(4px)',
                border: windowWidth > 1280 
                  ? '1px solid rgba(255, 255, 255, 0.3)'
                  : '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: windowWidth > 1280
                  ? '0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                  : '0 4px 12px rgba(0, 0, 0, 0.08)',
              }}
            >
              <h2 className={`${FONTS.subheading} text-[44px] leading-[1.1] tracking-[-0.24px] text-black`}>
                Why choose DiagnoX ?
              </h2>
            </motion.div>
          </div>

          {/* Benefit cards */}
          <div className="max-w-[1440px] mx-auto w-full px-6 pb-[40px]">
            {isMobile || (windowWidth >= 601 && windowWidth <= 750) ? (
              // Mobile/Small Tablet (up to 750px): Tab-based interface
              <BenefitTabMobile benefits={benefits} />
            ) : windowWidth >= 751 && windowWidth <= 1079 ? (
              // Small Tab (751-1079px): Looped swipe carousel
              <BenefitCarousel benefits={benefits} />
            ) : (
              // Desktop (1080px+): Card grid
              <div 
                className="flex"
                style={{
                  flexWrap: windowWidth <= 1220 ? 'wrap' : 'nowrap',
                  gap: '16px',
                  justifyContent: 'center',
                  maxWidth: windowWidth <= 1220 ? '100%' : '1280px',
                  margin: '0 auto',
                }}
              >
                {benefits.map((benefit, index) => (
                  <BenefitCard
                    key={index}
                    title={benefit.title}
                    description={benefit.description}
                    index={index}
                    isGrid2x2={windowWidth <= 1220}
                    is1x4Row={windowWidth > 1220}
                    isMobile={isMobile}
                    isDefaultVersion={windowWidth > 1280}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/**
 * ============================================================================
 * WAITLIST/CONTACT SECTION
 * ============================================================================
 * 
 * Bottom section containing:
 * 1. Headline: "Save time, reduce repair bills..."
 * 2. Waitlist form (email input + join button)
 * 3. Footer with Learn More, Support links and social media
 * 
 * Features:
 * - Animated success state on form submission
 * - Particle effects matching hero section
 * - Responsive text sizing
 * 
 * ============================================================================
 */
function WaitlistSection({ onSupportClick, onLearnMoreClick }: { onSupportClick: () => void; onLearnMoreClick: () => void }) {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ============================================================================
  // Responsive Breakpoints
  // ============================================================================
  const isMobile = windowWidth <= 600;
  const isSmallTab = windowWidth >= 601 && windowWidth <= 1079;
  const isRange799to601 = windowWidth >= 601 && windowWidth <= 799;
  const isRange1000to800 = windowWidth >= 800 && windowWidth <= 1000;
  const isRange1150to1001 = windowWidth >= 1001 && windowWidth <= 1150;
  const isBigTab = windowWidth >= 1151 && windowWidth <= 1280;

  // ============================================================================
  // Responsive Values
  // ============================================================================
  
  // Section height
  const sectionHeight = isMobile ? '844px' : isSmallTab ? '860px' : '752px';

  // Text sizes for headline
  // Line 1: "Save time, reduce repair bills—" (base: 96px)
  // Line 2: "our game-changing product is launching soon." (base: 64px)
  let line1Size = 96;
  let line2Size = 64;
  
  if (isMobile) {
    line1Size = 48;
    line2Size = 32;
  } else if (isRange799to601) {
    line1Size = 48;
    line2Size = 32;
  } else if (isRange1000to800) {
    line1Size = 67.2;
    line2Size = 44.8;
  } else if (isRange1150to1001) {
    line1Size = 77.76;
    line2Size = 51.84;
  } else if (isBigTab) {
    line1Size = 92.16;
    line2Size = 61.44;
  }

  // ============================================================================
  // Particle Animation Configuration
  // ============================================================================
  const contactParticleCount = theme === 'dark' ? 25 : 45;
  const contactParticles = Array.from({ length: contactParticleCount }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 5,
    size: 1 + Math.random() * 2,
  }));

  // ============================================================================
  // Form Submission Handler
  // ============================================================================
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://script.google.com/macros/s/AKfycbxdauy9ygtDkm0tiwP_CDIPd6Wo85qvftzrQUIBwk10IYYmqWucomX-OmSwy2ECYQBt/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'waitlist',
        email: email
      }),
      mode: 'no-cors'
    })
      .then(() => {
        setSubmitted(true);
        setEmail('');
      })
      .catch((error) => {
        console.error('Error:', error);
        setSubmitted(true);
        setEmail('');
      });
  };

  // ============================================================================
  // Social Media Links
  // ============================================================================
  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/diagnox.tech/', isCustom: false },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/diagnox-technologies/', isCustom: false },
    { icon: XIcon, label: 'X', href: 'https://x.com/DiagnoXtech', isCustom: true },
  ];

  return (
    <section
      id="contact"
      className={`relative overflow-hidden ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-[#0d0d0d] from-[73.676%] via-[#070d32] via-[102.02%] to-[#000d57] to-[113.83%]'
          : 'bg-gradient-to-b from-gray-50 via-blue-50 to-blue-100'
      }`}
      style={{ height: sectionHeight, display: 'flex', flexDirection: 'column' }}
    >
      {/* Glowing gradient at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[350px] pointer-events-none"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(ellipse at center bottom, rgba(0, 13, 87, 0.4) 0%, rgba(7, 13, 50, 0.2) 40%, transparent 70%)'
            : 'radial-gradient(ellipse at center bottom, rgba(59, 130, 246, 0.15) 0%, rgba(147, 197, 253, 0.1) 40%, transparent 70%)',
          filter: 'blur(30px)',
          animation: 'pulse 4s ease-in-out infinite',
        }}
      />

      {/* Particle emission effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {contactParticles.map((particle) => (
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
                ? `0 0 ${particle.size * 2}px rgba(107, 147, 232, 0.8), 0 0 ${particle.size * 4}px rgba(59, 130, 246, 0.6)`
                : `0 0 ${particle.size * 2}px rgba(59, 130, 246, 0.6), 0 0 ${particle.size * 4}px rgba(147, 197, 253, 0.4)`,
            }}
            initial={{ 
              y: 0, 
              opacity: 0,
              scale: 0
            }}
            animate={{
              y: -1000,
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

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-5xl"
        >
          {/* Headline */}
          <h2 
            className={`${FONTS.subheading} leading-[1.2] ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
            style={{ fontSize: `${line1Size}px` }}
          >
            {isMobile ? (
              <>
                Save time, reduce<br />
                repair bills—
              </>
            ) : (
              'Save time, reduce repair bills—'
            )}
          </h2>
          <p 
            className={`mb-12 ${FONTS.subheading} leading-[1.3] ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
            style={{ fontSize: `${line2Size}px` }}
          >
            {isMobile ? (
              <>
                our game-changing product<br />
                is launching soon.
              </>
            ) : (
              'our game-changing product is launching soon.'
            )}
          </p>

          {/* Waitlist Form */}
          <motion.div
            id="waitlist"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16"
          >
            {submitted ? (
              // Success state
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  type: 'spring', 
                  damping: 15, 
                  stiffness: 300 
                }}
                className="flex flex-col items-center justify-center py-8 space-y-4"
              >
                {/* Success icon with animations */}
                <div className="relative">
                  {/* Outer ring */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className={`absolute inset-0 rounded-full ${
                      theme === 'dark' 
                        ? 'bg-green-400/10' 
                        : 'bg-green-500/10'
                    }`}
                    style={{ width: '80px', height: '80px', top: '-10px', left: '-10px' }}
                  />
                  
                  {/* Checkmark */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: 'spring',
                      damping: 12,
                      stiffness: 200,
                      delay: 0.2
                    }}
                  >
                    <CheckCircle2 
                      className={`size-[60px] ${
                        theme === 'dark' ? 'text-green-400' : 'text-green-500'
                      }`}
                      strokeWidth={2}
                    />
                  </motion.div>
                  
                  {/* Sparkles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        x: [0, (i - 1) * 25],
                        y: [0, -20 + (i * 10)]
                      }}
                      transition={{
                        duration: 1,
                        delay: 0.4 + (i * 0.1),
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                      className="absolute top-0 left-1/2"
                    >
                      <Sparkles 
                        className={`size-4 ${
                          theme === 'dark' ? 'text-green-300' : 'text-green-400'
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
                
                {/* Success message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center space-y-2"
                >
                  <h4 className={`${FONTS.bodySemiBold} text-[18px] ${
                    theme === 'dark' ? 'text-green-400' : 'text-green-600'
                  }`}>
                    {"You're on the Waitlist!"}
                  </h4>
                  <p className={`${FONTS.body} text-[14px] ${
                    theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                  }`}>
                    {"We'll notify you when we launch."}
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              // Form state
              <>
                <p className={`mb-6 ${FONTS.body} text-[14px] ${
                  theme === 'dark' ? 'text-white' : 'text-gray-700'
                }`}>
                  Wanna be our early customer ?
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                  <Input
                    type="email"
                    placeholder="Email id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`h-[48px] w-[320px] rounded-full border ${FONTS.body} text-[14px] px-6 ${
                      theme === 'dark'
                        ? 'border-white/20 bg-transparent text-white placeholder:text-gray-400'
                        : 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500'
                    }`}
                  />
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button
                      type="submit"
                      className={`group relative h-[44px] px-8 rounded-full ${FONTS.body} text-[14px] overflow-hidden transition-all duration-300 ${
                        theme === 'dark'
                          ? 'bg-white text-black'
                          : 'bg-transparent text-white group-hover:text-black'
                      }`}
                      style={{
                        border: 'none',
                      }}
                    >
                      <span className={`relative z-10 transition-colors duration-300 ${
                        theme === 'dark'
                          ? 'group-hover:text-white'
                          : 'text-white group-hover:text-black'
                      }`}>
                        Join Waitlist
                      </span>
                      {/* Gradient overlay */}
                      <div 
                        className={`absolute inset-0 transition-all duration-300 ${
                          theme === 'dark'
                            ? 'opacity-0 group-hover:opacity-100'
                            : 'opacity-100 group-hover:opacity-0'
                        }`}
                        style={{
                          background: 'radial-gradient(circle at center, #0D0D0D 24%, #0A0D20 78%, #000D57 96%)',
                          borderRadius: '9999px',
                          boxShadow: theme === 'dark' 
                            ? 'inset 0 0 0 0.65px rgba(232, 232, 232, 0.8)'
                            : 'inset 0 0 0 0.65px rgba(232, 232, 232, 0.8), 0 0 20px rgba(232, 232, 232, 0.6), 0 0 40px rgba(184, 184, 184, 0.4)',
                        }}
                      />
                      {/* White background for light mode hover */}
                      <div 
                        className={`absolute inset-0 transition-all duration-300 ${
                          theme === 'dark'
                            ? 'opacity-0'
                            : 'opacity-0 group-hover:opacity-100'
                        }`}
                        style={{
                          background: 'white',
                          borderRadius: '9999px',
                          border: '0.65px solid black',
                        }}
                      />
                    </button>
                  </motion.div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Footer with links and social */}
      <div className="px-6 pb-8">
        <div className={`max-w-7xl mx-auto border-t pt-8 ${
          theme === 'dark' ? 'border-white/20' : 'border-gray-300'
        }`}>
          <div className="flex items-center justify-between">
            {/* Navigation links */}
            <nav 
              className={`flex ${FONTS.nav} leading-[1.45] tracking-[-0.08px] ${
                theme === 'dark' ? 'text-white' : 'text-gray-600'
              }`}
              style={{
                fontSize: isMobile ? '12.8px' : '16px',
                gap: isMobile ? '25.6px' : '32px'
              }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={onLearnMoreClick}
                className="cursor-pointer transition-colors"
              >
                Learn more
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={onSupportClick}
                className="cursor-pointer transition-colors"
              >
                Support
              </motion.button>
            </nav>

            {/* Social links */}
            <div 
              className="flex"
              style={{ gap: isMobile ? '19.2px' : '24px' }}
            >
              {socialLinks.map(({ icon: Icon, label, href, isCustom }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.2 }}
                  className={`transition-colors ${
                    theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {isCustom ? <Icon size={isMobile ? 16 : 20} /> : <Icon size={isMobile ? 16 : 20} />}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * ============================================================================
 * APP CONTENT
 * ============================================================================
 * 
 * Main app component that assembles all sections and manages dialog states
 * 
 * ============================================================================
 */
function AppContent() {
  const { theme } = useTheme();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 600;

  return (
    <>
      {/* Contact dialog - mobile vs desktop */}
      {isMobile ? (
        <ContactMobilePage isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      ) : (
        <ContactDialog isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      )}
      
      {/* FAQ dialog - mobile vs desktop */}
      {isMobile ? (
        <FAQMobilePage isOpen={isFAQOpen} onClose={() => setIsFAQOpen(false)} />
      ) : (
        <FAQDialog isOpen={isFAQOpen} onClose={() => setIsFAQOpen(false)} />
      )}
      
      {/* Main page */}
      <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#0d0d0d]' : 'bg-white'
      }`}>
        <NavBar />
        <main className="pt-[72px]">
          <HeroSection />
          <FeaturesSection />
          <AboutUsSection />
          <WaitlistSection 
            onSupportClick={() => setIsContactOpen(true)} 
            onLearnMoreClick={() => setIsFAQOpen(true)} 
          />
        </main>
      </div>
    </>
  );
}

/**
 * ============================================================================
 * ROOT APP COMPONENT
 * ============================================================================
 * 
 * Entry point - wraps app with ThemeProvider for dark/light mode
 * 
 * ============================================================================
 */
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}