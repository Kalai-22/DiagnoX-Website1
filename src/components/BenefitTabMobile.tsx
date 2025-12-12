/**
 * ============================================================================
 * Benefit Tab Mobile Component
 * ============================================================================
 * 
 * Tab-based interface for displaying DiagnoX benefits on mobile and tablet
 * 
 * Features:
 * - Icon tab navigation at bottom
 * - Accordion-style content area at top
 * - Smooth transitions between tabs
 * - Responsive sizing from mobile to tablet
 * - Icon animations on selection (scale + rotate)
 * - Ripple effect on click
 * 
 * Used in:
 * - Mobile (300-600px)
 * - Tablet (601-1100px)
 * 
 * ============================================================================
 */

import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { Zap, Shield, Lock, Smartphone, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';

// ============================================================================
// Types
// ============================================================================

interface BenefitTabMobileProps {
  benefits: Array<{
    title: string;
    description: string;
    icon: 'zap' | 'shield' | 'lock' | 'smartphone' | 'bell';
  }>;
}

// ============================================================================
// Icon Mapping
// ============================================================================

const iconMap = {
  zap: Zap,        // Instant, Accurate Diagnostics
  bell: Bell,      // Proactive Peace of Mind (early warnings & alerts)
  shield: Shield,  // (unused currently, kept for flexibility)
  lock: Lock,      // Data Security & Privacy
  smartphone: Smartphone,      // User-Friendly & Accessible
};

// ============================================================================
// Component
// ============================================================================

export function BenefitTabMobile({ benefits }: BenefitTabMobileProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ============================================================================
  // Responsive Breakpoints
  // ============================================================================
  const isMobile = windowWidth >= 300 && windowWidth <= 600;
  const isTabletMobileLayout = windowWidth >= 601 && windowWidth <= 1100;

  // ============================================================================
  // Responsive Values (Linear interpolation for tablet range)
  // ============================================================================

  // Container width: Mobile 360px, Tablet 360px-600px
  const containerWidth = isTabletMobileLayout
    ? Math.min(600, 360 + ((windowWidth - 601) / (1100 - 601)) * (600 - 360))
    : 360;

  // Icon button size: Mobile 52px, Tablet 52px-72px (reduced by 16%)
  const iconButtonSize = isTabletMobileLayout
    ? Math.min(72, 52 + ((windowWidth - 601) / (1100 - 601)) * (72 - 52)) * 0.84
    : 52 * 0.84;

  // Icon size: Mobile 24px, Tablet 24px-32px (reduced by 16%)
  const iconSize = isTabletMobileLayout
    ? Math.min(32, 24 + ((windowWidth - 601) / (1100 - 601)) * (32 - 24)) * 0.84
    : 24 * 0.84;

  // Title font size: Mobile 20px, Tablet 20px-26px
  const titleFontSize = isTabletMobileLayout
    ? Math.min(26, 20 + ((windowWidth - 601) / (1100 - 601)) * (26 - 20))
    : 20;

  // Description font size: Mobile 13.5px, Tablet 13.5px-15px
  const descFontSize = isTabletMobileLayout
    ? Math.min(15, 13.5 + ((windowWidth - 601) / (1100 - 601)) * (15 - 13.5))
    : 13.5;

  return (
    <div className="w-full mx-auto" style={{ maxWidth: `${containerWidth}px` }}>
      {/* ========================================================================
          Content Area (Top) - Accordion animation
          ======================================================================== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ 
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="overflow-hidden mb-4"
        >
          {/* Description card */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="px-4"
          >
            <div
              className="rounded-xl p-4"
              style={{
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              }}
            >
              {/* Title */}
              <h3
                className="font-['Instrument_Serif:Regular',serif] text-black mb-3"
                style={{
                  fontSize: `${titleFontSize}px`,
                  lineHeight: '1.3',
                  letterSpacing: '0.01em',
                }}
              >
                {benefits[activeTab].title}
              </h3>
              
              {/* Description */}
              <p
                className="font-['Poppins:Regular',sans-serif] text-black/75 text-justify"
                style={{
                  fontSize: `${descFontSize}px`,
                  lineHeight: '1.65',
                  letterSpacing: '0.015em',
                }}
              >
                {benefits[activeTab].description}
              </p>
            </div>
          </motion.div>

          {/* Decorative bottom glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-2"
            style={{
              width: '60%',
              height: '16px',
              background: 'radial-gradient(ellipse, rgba(0, 13, 87, 0.3) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ========================================================================
          Icon Tab Bar (Bottom)
          ======================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center px-3 py-2 rounded-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
        }}
      >
        {benefits.map((benefit, index) => {
          const Icon = iconMap[benefit.icon];
          const isActive = activeTab === index;

          return (
            <motion.button
              key={index}
              onClick={() => setActiveTab(index)}
              className="relative flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
              style={{
                width: `${iconButtonSize}px`,
                height: `${iconButtonSize}px`,
              }}
            >
              {/* Active background */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 0.8,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 13, 87, 0.08) 0%, rgba(0, 13, 87, 0.12) 100%)',
                  border: '1.5px solid rgba(0, 13, 87, 0.2)',
                  boxShadow: '0 4px 12px rgba(0, 13, 87, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                }}
              />

              {/* Ripple effect on click */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  initial={{ scale: 1, opacity: 0.4 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    background: 'rgba(0, 13, 87, 0.2)',
                  }}
                />
              )}

              {/* Icon with animations */}
              <motion.div
                className="relative z-10"
                animate={{
                  scale: isActive ? 1.15 : 1,
                  rotate: isActive ? [0, -5, 5, 0] : 0,
                }}
                transition={{ 
                  scale: { duration: 0.3 },
                  rotate: { duration: 0.5 }
                }}
              >
                <Icon
                  size={iconSize}
                  strokeWidth={2.2}
                  className="transition-colors duration-300"
                  style={{
                    color: isActive ? '#000d57' : '#666666',
                  }}
                />
              </motion.div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}