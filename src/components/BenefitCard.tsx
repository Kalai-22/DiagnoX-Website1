import { motion } from 'motion/react';
import { useState } from 'react';

interface BenefitCardProps {
  title: string;
  description: string;
  index: number;
  isGrid2x2?: boolean;
  is1x4Row?: boolean;
  isMobile?: boolean;
  isDefaultVersion?: boolean;
}

export function BenefitCard({ title, description, index, isGrid2x2 = false, is1x4Row = false, isMobile = false, isDefaultVersion = false }: BenefitCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // isGrid2x2: 2x2 grid for ≤1220px (includes mobile, small tab, and now extends to 1220px)
  // is1x4Row: 1x4 row for >1220px (big tab and default)
  let cardWidth = '456px';
  let cardMinWidth = '456px';
  let cardMaxWidth = '456px';
  let cardFlex = 'none';

  // Mobile: fixed width of 360px
  if (isMobile) {
    cardWidth = '360px';
    cardMinWidth = '360px';
    cardMaxWidth = '360px';
    cardFlex = 'none';
  } else if (isGrid2x2) {
    // 2x2 grid layout - each card takes 50% width
    cardWidth = 'calc(50% - 8px)';
    cardMinWidth = '280px';
    cardMaxWidth = 'calc(50% - 8px)';
    cardFlex = '0 0 calc(50% - 8px)';
  } else if (is1x4Row) {
    // 1x4 row within 1280px container
    // Total space: 1280px - (3 gaps × 16px) = 1232px
    // Each card: 1232px ÷ 4 = 308px base
    cardWidth = 'calc(25% - 12px)';
    cardMinWidth = '280px';
    cardMaxWidth = 'calc(25% - 12px)';
    cardFlex = '1 1 calc(25% - 12px)';
  }

  // Mobile: title is 24px (28 - 4), no description
  const titleSize = isMobile ? '24px' : '28px';
  
  // Mobile: reduce padding by 4px (24px - 4px = 20px horizontal, 6px - 4px = 2px vertical)
  const horizontalPadding = isMobile ? '20px' : '24px';
  const verticalPadding = isMobile ? '2px' : '24px';

  // Default version (>1280px): glassmorphic with white glow on hover
  // Big tab & Small tab: simple white background with shadow
  if (isDefaultVersion) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="rounded-lg cursor-pointer relative overflow-hidden"
        style={{ 
          width: cardWidth,
          minWidth: cardMinWidth,
          maxWidth: cardMaxWidth,
          flex: cardFlex,
          paddingLeft: horizontalPadding, 
          paddingRight: horizontalPadding,
          paddingTop: verticalPadding,
          paddingBottom: verticalPadding,
          background: isHovered 
            ? 'rgba(255, 255, 255, 0.98)'
            : 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: isHovered
            ? '1px solid rgba(255, 255, 255, 0.8)'
            : '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: isHovered 
            ? '0 0 40px rgba(255, 255, 255, 0.6), 0 0 80px rgba(255, 255, 255, 0.4), 0 20px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
            : '0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
          transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          height: isMobile ? 'auto' : undefined,
        }}
      >
        {/* White glow effect overlay when hovered */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: isHovered ? [0.3, 0.6, 0.3] : 0,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut"
          }}
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, transparent 70%)',
          }}
        />

        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: isHovered ? [0, 0.4, 0] : 0,
            x: isHovered ? ['-100%', '100%'] : '-100%',
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: "linear"
          }}
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
          }}
        />

        <h3 
          className="font-['Instrument_Serif:Regular',sans-serif] leading-[1.2] text-black text-center relative z-10"
          style={{ 
            fontSize: titleSize,
            marginBottom: isMobile ? '0' : '12px'
          }}
        >
          {title}
        </h3>
        {!isMobile && (
          <p className="text-justify font-['Poppins:Regular',sans-serif] text-[14px] leading-[1.4] tracking-[-0.12px] text-black relative z-10">
            {description}
          </p>
        )}
      </motion.div>
    );
  }

  // Big tab & Small tab: simple white card with subtle shadow
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-lg border border-gray-300 cursor-pointer"
      style={{ 
        width: cardWidth,
        minWidth: cardMinWidth,
        maxWidth: cardMaxWidth,
        flex: cardFlex,
        paddingLeft: horizontalPadding, 
        paddingRight: horizontalPadding,
        paddingTop: verticalPadding,
        paddingBottom: verticalPadding,
        backgroundColor: isHovered ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.95)',
        boxShadow: isHovered 
          ? '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)'
          : '0 10px 25px rgba(0, 0, 0, 0.1)',
        transform: isHovered ? 'scale(1.03)' : 'scale(1)',
        transition: 'all 0.15s ease-out',
        height: isMobile ? 'auto' : undefined,
      }}
    >
      <h3 
        className="font-['Instrument_Serif:Regular',sans-serif] leading-[1.2] text-black text-center"
        style={{ 
          fontSize: titleSize,
          marginBottom: isMobile ? '0' : '12px'
        }}
      >
        {title}
      </h3>
      {!isMobile && (
        <p className="text-justify font-['Poppins:Regular',sans-serif] text-[14px] leading-[1.4] tracking-[-0.12px] text-black">
          {description}
        </p>
      )}
    </motion.div>
  );
}