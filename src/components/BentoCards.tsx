import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from './ThemeProvider';
import { useState, useEffect } from 'react';
import { Info, ChevronDown } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

interface BentoCardProps {
  title: string;
  description: string;
  index: number;
  width: number;
  height: number;
  x: number;
  y: number;
  isMobileStacked?: boolean;
}

function BentoCard({ title, description, index, width, height, x, y, isMobileStacked = false }: BentoCardProps) {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [pulseIntensity, setPulseIntensity] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive breakpoint
  const isSmallTabMobileLayout = windowWidth >= 601 && windowWidth <= 750;
  const isSmallTab = windowWidth >= 751 && windowWidth <= 1079;
  const isBigTab = windowWidth >= 1080 && windowWidth <= 1280;
  const isMobile = windowWidth >= 300 && windowWidth <= 600;
  
  // Scale factor for small tab: 12% reduction = 0.88, big tab: 18% reduction = 0.82, mobile: 22% + 16% more = 0.6552
  let scaleFactor = 1;
  if (isMobile || isSmallTabMobileLayout) scaleFactor = 0.6552;
  else if (isSmallTab) scaleFactor = 0.88;
  else if (isBigTab) scaleFactor = 0.82;

  useEffect(() => {
    if (isHovered && !isSmallTab && !isBigTab && !isMobile) {
      let frame = 0;
      const interval = setInterval(() => {
        frame += 0.02;
        // Create a smooth breathing/pulsing effect
        const intensity = (Math.sin(frame) + 1) / 2; // Oscillates between 0 and 1
        setPulseIntensity(intensity);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isHovered, isSmallTab, isBigTab, isMobile]);
  
  // Format title with line breaks
  const formatTitle = (text: string) => {
    if (text === "Vehicle Health Monitoring") {
      return (
        <>
          Vehicle Health<br />
          Monitoring
        </>
      );
    }
    if (text === "Real-Time GPS Tracking") {
      return (
        <>
          Real-Time<br />
          GPS<br />
          Tracking
        </>
      );
    }
    if (text === "Cloud-Linked Trip History Backup") {
      return (
        <>
          Cloud Linked<br />
          Trip History Backup
        </>
      );
    }
    if (text === "Anti-Theft & Anti-Tow Alerts") {
      return (
        <>
          Anti Theft &<br />
          Anti-Tow Alerts
        </>
      );
    }
    if (text === "Driving Behavior Analytics") {
      return (
        <>
          Driving Behavior<br />
          Analytics
        </>
      );
    }
    return text;
  };

  // Format description with line breaks
  const formatDescription = (text: string) => {
    if (text.startsWith("Displays diagnostic trouble codes")) {
      return (
        <>
          Displays diagnostic trouble codes (DTCs),<br />
          warning lights, and component status<br />
          directly to the app dashboard.
        </>
      );
    }
    if (text.startsWith("Sends instant notifications if the car is being towed")) {
      return (
        <>
          Sends instant notifications<br />
          if the car is being<br />
          towed, moved without<br />
          authorization, or if the<br />
          device is tampered with.
        </>
      );
    }
    if (text.startsWith("Warns users before potential breakdowns")) {
      return (
        <>
          Warns users before<br />
          potential breakdowns<br />
          by detecting abnormal<br />
          data patterns from<br />
          the vehicle's sensors.
        </>
      );
    }
    if (text.startsWith("Uses sensor data to detect impacts")) {
      return (
        <>
          Uses sensor data to detect impacts and trigger<br />
          immediate SOS alerts with live location.
        </>
      );
    }
    if (text.startsWith("Allows users to create custom boundaries")) {
      return (
        <>
          Allows users to create<br />
          custom boundaries; sends<br />
          alerts when the vehicle<br />
          enters or exits zones<br />
          during prohibited hours.
        </>
      );
    }
    if (text.startsWith("Gives detailed reports on over-speeding")) {
      return (
        <>
          Gives detailed reports on<br />
          over-speeding, harsh braking, &<br />
          mileage efficiency, promoting safer<br />
          & more economical driving habits.
        </>
      );
    }
    return text;
  };
  
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      onHoverStart={() => !isSmallTab && !isBigTab && !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isSmallTab && !isBigTab && !isMobile && setIsHovered(false)}
      className={`group absolute overflow-hidden ${!isSmallTab && !isBigTab && !isMobile ? 'cursor-pointer' : ''}`}
      style={{
        left: `${x * scaleFactor}px`,
        top: `${y * scaleFactor}px`,
        width: `${width * scaleFactor}px`,
        height: `${height * scaleFactor}px`,
        padding: `${20 * scaleFactor}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: (isHovered && !isSmallTab && !isBigTab && !isMobile) || (isExpanded && (isSmallTab || isBigTab || isMobile))
          ? theme === 'dark'
            ? `1.5px solid rgba(255, 255, 255, 0.6)`
            : `1.5px solid rgba(0, 0, 0, 0.5)` 
          : `1px solid ${theme === 'dark' ? 'rgba(192, 192, 192, 0.8)' : 'rgba(0, 0, 0, 0.1)'}`,
        borderRadius: `${8 * scaleFactor}px`,
        background: (isHovered && !isSmallTab && !isBigTab && !isMobile) || (isExpanded && (isSmallTab || isBigTab || isMobile))
          ? theme === 'dark'
            ? `linear-gradient(345deg, 
                rgba(192, 192, 192, ${0.88 + pulseIntensity * 0.04}) 0%, 
                rgba(200, 200, 200, ${0.90 + pulseIntensity * 0.04}) 5%, 
                rgba(210, 210, 210, ${0.91 + pulseIntensity * 0.04}) 10%, 
                rgba(220, 220, 220, ${0.92 + pulseIntensity * 0.04}) 15%, 
                rgba(230, 230, 230, ${0.93 + pulseIntensity * 0.03}) 20%, 
                rgba(238, 238, 238, ${0.94 + pulseIntensity * 0.03}) 25%, 
                rgba(244, 244, 244, ${0.95 + pulseIntensity * 0.03}) 30%, 
                rgba(248, 248, 248, ${0.955 + pulseIntensity * 0.025}) 35%, 
                rgba(252, 252, 252, ${0.96 + pulseIntensity * 0.025}) 40%, 
                rgba(254, 254, 254, ${0.965 + pulseIntensity * 0.02}) 50%, 
                rgba(255, 255, 255, ${0.97 + pulseIntensity * 0.02}) 60%, 
                rgba(255, 255, 255, ${0.975 + pulseIntensity * 0.015}) 70%, 
                rgba(255, 255, 255, ${0.98 + pulseIntensity * 0.015}) 80%, 
                rgba(255, 255, 255, ${0.985 + pulseIntensity * 0.01}) 90%, 
                rgba(255, 255, 255, ${0.99 + pulseIntensity * 0.01}) 100%)`
            : `linear-gradient(345deg, 
                rgba(173, 216, 230, ${0.42 + pulseIntensity * 0.22}) 0%, 
                rgba(180, 220, 233, ${0.44 + pulseIntensity * 0.20}) 5%, 
                rgba(188, 224, 237, ${0.46 + pulseIntensity * 0.18}) 10%, 
                rgba(196, 228, 240, ${0.48 + pulseIntensity * 0.16}) 15%, 
                rgba(205, 232, 243, ${0.49 + pulseIntensity * 0.14}) 20%, 
                rgba(215, 237, 246, ${0.48 + pulseIntensity * 0.12}) 25%, 
                rgba(225, 242, 249, ${0.44 + pulseIntensity * 0.10}) 30%, 
                rgba(233, 246, 251, ${0.38 + pulseIntensity * 0.08}) 35%, 
                rgba(240, 249, 252, ${0.30 + pulseIntensity * 0.06}) 40%, 
                rgba(245, 251, 254, ${0.22 + pulseIntensity * 0.05}) 50%, 
                rgba(250, 253, 255, ${0.14 + pulseIntensity * 0.03}) 60%, 
                rgba(252, 254, 255, ${0.08 + pulseIntensity * 0.02}) 70%, 
                rgba(254, 255, 255, ${0.04 + pulseIntensity * 0.015}) 80%, 
                rgba(255, 255, 255, ${0.02 + pulseIntensity * 0.01}) 90%, 
                rgba(255, 255, 255, ${0.00 + pulseIntensity * 0.005}) 100%)`
          : theme === 'dark' 
            ? 'linear-gradient(180deg, rgba(13, 13, 13, 0.45) 0%, rgba(10, 13, 32, 0.60) 100%)'
            : 'linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%)',
        boxShadow: (isHovered && !isSmallTab && !isBigTab && !isMobile) || (isExpanded && (isSmallTab || isBigTab || isMobile))
          ? theme === 'dark'
            ? '0 8px 20px rgba(255, 255, 255, 0.15), 0 0 15px rgba(255, 255, 255, 0.25)'
            : '0 8px 20px rgba(173, 216, 230, 0.3), 0 0 15px rgba(173, 216, 230, 0.2)'
          : theme === 'dark'
            ? '0px 4px 16px rgba(0, 0, 0, 0.4)'
            : '0px 4px 16px rgba(0, 0, 0, 0.08)',
        transform: (isHovered && !isSmallTab && !isBigTab && !isMobile) || (isExpanded && (isSmallTab || isBigTab || isMobile)) ? 'scale(0.98)' : 'scale(1)',
        transition: 'all 0.15s ease-out',
      }}
    >
      {isSmallTab || isBigTab || isMobile ? (
        // Small Tab & Big Tab: Click-to-expand with icon
        <>
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              {!isExpanded ? (
                <motion.h3
                  key="title"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ 
                    duration: 0.3, 
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="text-center font-['Instrument_Serif:Regular',serif]"
                  style={{
                    paddingLeft: `${5 * scaleFactor}px`,
                    paddingRight: `${5 * scaleFactor}px`,
                    fontSize: `${40 * scaleFactor}px`,
                    lineHeight: '100%',
                    letterSpacing: '-2.5%',
                    fontWeight: 400,
                    color: theme === 'dark' ? '#C0C0C0' : '#000000',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {formatTitle(title)}
                </motion.h3>
              ) : (
                <motion.p
                  key="description"
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ 
                    duration: 0.35, 
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                  className="font-['Poppins:SemiBold',sans-serif]"
                  style={{
                    paddingLeft: `${5 * scaleFactor}px`,
                    paddingRight: `${5 * scaleFactor}px`,
                    fontSize: `${16 * scaleFactor}px`,
                    lineHeight: '130%',
                    letterSpacing: '-0.02em',
                    wordSpacing: '0.02em',
                    color: '#000000',
                    fontWeight: 600,
                    textAlign: 'center',
                  }}
                >
                  {formatDescription(description)}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          {/* Icon positioned at top-right of card */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            whileTap={{ scale: 0.9 }}
            style={{
              position: 'absolute',
              top: `${15 * scaleFactor}px`,
              right: `${15 * scaleFactor}px`,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: `${4 * scaleFactor}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
            }}
          >
            <motion.div
              animate={{ 
                rotate: isExpanded ? 90 : 0,
                scale: isExpanded ? 1.1 : 1
              }}
              transition={{ 
                duration: 0.3, 
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              {!isExpanded ? (
                <Info 
                  size={18.4 * scaleFactor} 
                  color={theme === 'dark' ? '#C0C0C0' : '#666666'}
                  strokeWidth={2}
                />
              ) : (
                <span
                  style={{
                    fontSize: `${22.08 * scaleFactor}px`,
                    color: theme === 'dark' ? '#C0C0C0' : '#666666',
                    fontWeight: 'bold',
                    lineHeight: 1,
                  }}
                >
                  ×
                </span>
              )}
            </motion.div>
          </motion.button>
        </>
      ) : (
        // Default: Hover-based interaction
        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.h3
              key="title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
              className="text-center font-['Instrument_Serif:Regular',serif]"
              style={{
                paddingLeft: '5px',
                paddingRight: '5px',
                fontSize: '40px',
                lineHeight: '100%',
                letterSpacing: '-2.5%',
                fontWeight: 400,
                color: theme === 'dark' ? '#C0C0C0' : '#000000',
                whiteSpace: 'pre-line',
              }}
            >
              {formatTitle(title)}
            </motion.h3>
          ) : (
            <motion.p
              key="description"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="font-['Poppins:SemiBold',sans-serif]"
              style={{
                paddingLeft: '5px',
                paddingRight: '5px',
                fontSize: '16px',
                lineHeight: '130%',
                letterSpacing: '-0.02em',
                wordSpacing: '0.02em',
                color: '#000000',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              {formatDescription(description)}
            </motion.p>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

export function BentoGrid() {
  const { theme } = useTheme();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive breakpoint
  const isSmallTabMobileLayout = windowWidth >= 601 && windowWidth <= 750;
  const isSmallTab = windowWidth >= 751 && windowWidth <= 1079;
  const isBigTab = windowWidth >= 1080 && windowWidth <= 1280;
  const isMobile = windowWidth >= 300 && windowWidth <= 600;
  
  // Scale factor for small tab: 12% reduction = 0.88, big tab: 18% reduction = 0.82, mobile: 22% + 16% more = 0.6552
  let scaleFactor = 1;
  if (isMobile || isSmallTabMobileLayout) scaleFactor = 0.6552;
  else if (isSmallTab) scaleFactor = 0.88;
  else if (isBigTab) scaleFactor = 0.82;
  
  // Equal gap between cards
  const gap = 20;
  
  // Mobile stacked cards data
  const mobileStackedCards = [
    {
      text: "Vehicle Health Monitoring",
      description: "Displays diagnostic trouble codes (DTCs), warning lights, and component status directly to the app dashboard.",
    },
    {
      text: "Anti-Theft & Anti-Tow Alerts",
      description: "Sends instant notifications if the car is being towed, moved without authorization, or if the device is tampered with.",
    },
    {
      text: "Predictive Maintenance Alerts",
      description: "Warns users before potential breakdowns by detecting abnormal data patterns from the vehicle's sensors.",
    },
    {
      text: "SOS Response",
      description: "Uses sensor data to detect impacts and trigger immediate SOS alerts with live location.",
    },
    {
      text: "Geo & Time Fencing",
      description: "Allows users to create custom boundaries; sends alerts when the vehicle enters or exits zones during prohibited hours.",
    },
    {
      text: "Driving Behavior Analytics",
      description: "Gives detailed reports on over-speeding, harsh braking, & mileage efficiency, promoting safer & more economical driving habits.",
    },
    {
      text: "Real-Time GPS Tracking",
      description: "Enables 24/7 vehicle location monitoring with live route history and trip playback.",
    },
    {
      text: "Cloud-Linked Trip History Backup",
      description: "This feature automatically saves every trip's data — including route, distance, duration, and driving behavior — to a secure cloud system. Users can later access this history through the app for insights, performance tracking, or insurance verification.",
    }
  ];
  
  // Mobile Stacked Layout Component
  if (isMobile || isSmallTabMobileLayout) {
    const MobileStackedCard = ({ card, index }: { card: { text: string; description: string }; index: number }) => {
      const isExpanded = expandedCardIndex === index;
      
      const handleToggle = () => {
        if (isExpanded) {
          setExpandedCardIndex(null);
        } else {
          setExpandedCardIndex(index);
        }
      };
      
      // Determine collapsed height based on title length
      const collapsedHeight = card.text.length > 30 ? '76px' : '64px';
      
      // Responsive card width: 356px for mobile, scale up for 601-750px
      // At 601px: ~356px, at 750px: ~520px (linear interpolation)
      const cardWidth = isSmallTabMobileLayout 
        ? Math.min(520, 356 + ((windowWidth - 601) / (750 - 601)) * (520 - 356))
        : 356;
      
      return (
        <motion.div
          custom={index}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="overflow-hidden relative"
          style={{
            width: `${cardWidth}px`,
            padding: '16px 20px',
            border: isExpanded
              ? theme === 'dark'
                ? '1.5px solid rgba(255, 255, 255, 0.6)'
                : '1.5px solid rgba(0, 0, 0, 0.5)'
              : `1px solid ${theme === 'dark' ? 'rgba(192, 192, 192, 0.8)' : 'rgba(0, 0, 0, 0.1)'}`,
            borderRadius: '8px',
            background: isExpanded
              ? theme === 'dark'
                ? 'linear-gradient(345deg, rgba(192, 192, 192, 0.88) 0%, rgba(255, 255, 255, 0.99) 100%)'
                : 'linear-gradient(345deg, rgba(173, 216, 230, 0.42) 0%, rgba(255, 255, 255, 0.00) 100%)'
              : theme === 'dark'
                ? 'linear-gradient(180deg, rgba(13, 13, 13, 0.45) 0%, rgba(10, 13, 32, 0.60) 100%)'
                : 'linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%)',
            boxShadow: isExpanded
              ? theme === 'dark'
                ? '0 12px 32px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                : '0 12px 32px rgba(173, 216, 230, 0.4), 0 0 20px rgba(173, 216, 230, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
              : theme === 'dark'
                ? '0px 4px 16px rgba(0, 0, 0, 0.4)'
                : '0px 4px 16px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease-out',
          }}
        >
          {/* Animated shimmer effect on hover/expand */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: isExpanded ? [0, 0.15, 0] : 0,
            }}
            transition={{
              duration: 1.5,
              repeat: isExpanded ? Infinity : 0,
              ease: "linear"
            }}
            style={{
              background: theme === 'dark'
                ? 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)'
                : 'linear-gradient(90deg, transparent 0%, rgba(173, 216, 230, 0.4) 50%, transparent 100%)',
              transform: 'translateX(-100%)',
              animation: isExpanded ? 'shimmer 2s infinite' : 'none',
            }}
          />
          
          {/* Glow pulse effect when expanded */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-lg"
            animate={{
              opacity: isExpanded ? [0.2, 0.4, 0.2] : 0,
            }}
            transition={{
              duration: 2,
              repeat: isExpanded ? Infinity : 0,
              ease: "easeInOut"
            }}
            style={{
              background: theme === 'dark'
                ? 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle at 50% 0%, rgba(173, 216, 230, 0.2) 0%, transparent 70%)',
            }}
          />

          {/* Card Header with Title and Arrow */}
          <motion.button
            onClick={handleToggle}
            className="w-full flex items-center justify-between gap-3 relative z-10"
            whileTap={{ scale: 0.98 }}
          >
            <h3
              className="font-['Instrument_Serif:Regular',serif]"
              style={{
                fontSize: isExpanded ? '18px' : '24px',
                lineHeight: isExpanded ? '120%' : '110%',
                letterSpacing: '0.03em',
                fontWeight: 400,
                color: isExpanded 
                  ? '#000000'
                  : theme === 'dark' ? '#FFFFFF' : '#000000',
                flex: 1,
                textAlign: 'left',
                transition: 'all 0.3s ease-out',
              }}
            >
              {card.text}
            </h3>
            
            {/* Arrow with rotation */}
            <motion.div
              animate={{ 
                rotate: isExpanded ? 180 : 0,
              }}
              transition={{ 
                duration: 0.3, 
                ease: 'easeOut'
              }}
              className="shrink-0"
            >
              <ChevronDown
                size={24}
                color={isExpanded 
                  ? '#000000'
                  : theme === 'dark' ? '#C0C0C0' : '#666666'
                }
                strokeWidth={2}
                style={{
                  transition: 'color 0.3s ease-out',
                }}
              />
            </motion.div>
          </motion.button>

          {/* Expandable Description with expand/collapse animation */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ 
                  duration: 0.3, 
                  ease: 'easeOut'
                }}
                className="overflow-hidden relative z-10"
              >
                {/* Decorative line separator */}
                <div
                  style={{
                    height: '1px',
                    background: theme === 'dark'
                      ? 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.2), transparent)'
                      : 'linear-gradient(90deg, transparent, rgba(0, 13, 87, 0.15), transparent)',
                    marginTop: '12px',
                    marginBottom: '12px',
                  }}
                />
                
                <p
                  className="font-['Poppins:SemiBold',sans-serif]"
                  style={{
                    fontSize: '14px',
                    lineHeight: '155%',
                    letterSpacing: '0.015em',
                    wordSpacing: '0.02em',
                    color: '#000000',
                    fontWeight: 600,
                    textAlign: 'justify',
                  }}
                >
                  {card.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    };
    
    return (
      <div className="flex flex-col items-center" style={{ gap: '16px' }}>
        {mobileStackedCards.map((card, index) => (
          <MobileStackedCard key={index} card={card} index={index} />
        ))}
      </div>
    );
  }
  
  // Calculate positions with equal spacing
  // For small tab: rearranged layout
  const cards = isSmallTab ? [
    {
      text: "Vehicle Health Monitoring",
      description: "Displays diagnostic trouble codes (DTCs), warning lights, and component status directly to the app dashboard.",
      x: 0,
      y: 0,
      width: 456,
      height: 216
    },
    {
      text: "Anti-Theft & Anti-Tow Alerts",
      description: "Sends instant notifications if the car is being towed, moved without authorization, or if the device is tampered with.",
      x: 456 + gap,
      y: 0,
      width: 296,
      height: 216
    },
    {
      text: "Predictive Maintenance Alerts",
      description: "Warns users before potential breakdowns by detecting abnormal data patterns from the vehicle's sensors.",
      x: 0,
      y: 216 + gap,
      width: 264,
      height: 100 + gap + 220
    },
    {
      text: "SOS Response",
      description: "Uses sensor data to detect impacts and trigger immediate SOS alerts with live location.",
      x: 264 + gap,
      y: 216 + gap,
      width: 488,
      height: 100
    },
    {
      text: "Geo & Time Fencing",
      description: "Allows users to create custom boundaries; sends alerts when the vehicle enters or exits zones during prohibited hours.",
      x: 264 + gap,
      y: 216 + gap + 100 + gap,
      width: 268,
      height: 220
    },
    {
      text: "Driving Behavior Analytics",
      description: "Gives detailed reports on over-speeding, harsh braking, & mileage efficiency, promoting safer & more economical driving habits.",
      x: 264 + gap + 268 + gap,
      y: 216 + gap + 100 + gap,
      width: 200,
      height: 340
    },
    {
      text: "Real-Time GPS Tracking",
      description: "Enables 24/7 vehicle location monitoring with live route history and trip playback.",
      x: 264 + gap + 268 + gap,
      y: 216 + gap + 100 + gap + 340 + gap - 4,
      width: 200,
      height: 220
    },
    {
      text: "Cloud-Linked Trip History Backup",
      description: "This feature automatically saves every trip's data — including route, distance, duration, and driving behavior — to a secure cloud system. Users can later access this history through the app for insights, performance tracking, or insurance verification.",
      x: 0,
      y: 216 + gap + 100 + gap + 220 + gap,
      width: 264 + gap + 268,
      height: 336
    }
  ] : [
    // Default layout (big tab and desktop)
    {
      text: "Vehicle Health Monitoring",
      description: "Displays diagnostic trouble codes (DTCs), warning lights, and component status directly to the app dashboard.",
      x: 0,
      y: 0,
      width: 456,
      height: 216
    },
    {
      text: "Anti-Theft & Anti-Tow Alerts",
      description: "Sends instant notifications if the car is being towed, moved without authorization, or if the device is tampered with.",
      x: 456 + gap,
      y: 0,
      width: 296,
      height: 216
    },
    {
      text: "Cloud-Linked Trip History Backup",
      description: "This feature automatically saves every trip's data — including route, distance, duration, and driving behavior — to a secure cloud system. Users can later access this history through the app for insights, performance tracking, or insurance verification.",
      x: 456 + gap + 296 + gap,
      y: 0,
      width: 407,
      height: 216 + gap + 100
    },
    {
      text: "Predictive Maintenance Alerts",
      description: "Warns users before potential breakdowns by detecting abnormal data patterns from the vehicle's sensors.",
      x: 0,
      y: 216 + gap,
      width: 264,
      height: 100 + gap + 220
    },
    {
      text: "SOS Response",
      description: "Uses sensor data to detect impacts and trigger immediate SOS alerts with live location.",
      x: 264 + gap,
      y: 216 + gap,
      width: 488,
      height: 100
    },
    {
      text: "Geo & Time Fencing",
      description: "Allows users to create custom boundaries; sends alerts when the vehicle enters or exits zones during prohibited hours.",
      x: 264 + gap,
      y: 216 + gap + 100 + gap,
      width: 268,
      height: 220
    },
    {
      text: "Driving Behavior Analytics",
      description: "Gives detailed reports on over-speeding, harsh braking, & mileage efficiency, promoting safer & more economical driving habits.",
      x: 264 + gap + 268 + gap,
      y: 216 + gap + 100 + gap,
      width: 407,
      height: 220
    },
    {
      text: "Real-Time GPS Tracking",
      description: "Enables 24/7 vehicle location monitoring with live route history and trip playback.",
      x: 264 + gap + 268 + gap + 407 + gap,
      y: 216 + gap + 100 + gap,
      width: 200,
      height: 220
    }
  ];

  // Calculate total width and height based on layout
  const totalWidth = (isSmallTab || isMobile)
    ? (264 + gap + 268 + gap + 200) * scaleFactor
    : (264 + gap + 268 + gap + 407 + gap + 200) * scaleFactor;
  const totalHeight = (isSmallTab || isMobile)
    ? (216 + gap + 100 + gap + 220 + gap + 336) * scaleFactor
    : (216 + gap + 100 + gap + 220) * scaleFactor;

  return (
    <div 
      className="relative mx-auto"
      style={{ 
        width: `${totalWidth}px`,
        height: `${totalHeight}px`,
      }}
    >
      {cards.map((card, index) => (
        <BentoCard
          key={index}
          index={index}
          title={card.text}
          description={card.description}
          x={card.x}
          y={card.y}
          width={card.width}
          height={card.height}
        />
      ))}
    </div>
  );
}