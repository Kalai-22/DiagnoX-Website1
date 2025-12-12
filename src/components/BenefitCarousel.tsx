/**
 * ============================================================================
 * BenefitCarousel Component
 * ============================================================================
 * 
 * A manual swipe carousel for displaying benefit cards.
 * Used for small tablet viewport (751-1079px).
 * 
 * Features:
 * - One card visible at a time
 * - Manual swipeable/draggable interaction
 * - Auto-center snap behavior
 * - Disabled arrow states at ends
 * - Smooth animations
 * 
 * ============================================================================
 */

import { useState } from 'react';
import { motion, PanInfo } from 'motion/react';

// ============================================================================
// Types
// ============================================================================

interface BenefitCarouselProps {
  benefits: Array<{
    title: string;
    description: string;
    icon: 'zap' | 'shield' | 'lock' | 'smartphone' | 'bell';
  }>;
}

// ============================================================================
// Component
// ============================================================================

export function BenefitCarousel({ benefits }: BenefitCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex === benefits.length - 1;

  const handleDragStart = (event: any, info: PanInfo) => {
    setDragStartX(info.point.x);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const dragDistance = info.point.x - dragStartX;
    const threshold = 50; // Minimum drag distance to trigger slide

    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0 && !isAtStart) {
        // Dragged right - go to previous
        goToPrevious();
      } else if (dragDistance < 0 && !isAtEnd) {
        // Dragged left - go to next
        goToNext();
      }
    }
  };

  const goToNext = () => {
    if (!isAtEnd) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (!isAtStart) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative w-full max-w-[800px] mx-auto">
      {/* Carousel container with hidden overflow */}
      <div 
        className="overflow-hidden relative"
        style={{ 
          marginLeft: '60px',
          marginRight: '60px',
        }}
      >
        {/* Carousel track */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          className="flex cursor-grab active:cursor-grabbing"
          style={{
            gap: '0', // No gap to prevent card peek
          }}
          animate={{
            x: `calc(-${currentIndex * 100}%)`,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={`${benefit.title}-${index}`}
              className="flex-shrink-0 rounded-xl"
              style={{
                width: '100%', // Full width of overflow container
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                padding: '32px 24px',
              }}
            >
              <h3
                className="font-['Instrument_Serif:Regular',serif] text-black text-center pointer-events-none"
                style={{
                  fontSize: '28px',
                  lineHeight: '1.2',
                  letterSpacing: '0.01em',
                }}
              >
                {benefit.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-6">
        {benefits.map((_, index) => {
          const isActive = currentIndex === index;
          
          return (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="transition-all duration-300"
              style={{
                width: isActive ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: isActive 
                  ? 'rgba(0, 0, 0, 0.8)' 
                  : 'rgba(0, 0, 0, 0.2)',
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          );
        })}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        disabled={isAtStart}
        className={`absolute left-2 top-[calc(50%-48px)] -translate-y-1/2 z-10 rounded-full p-2 transition-all ${
          isAtStart 
            ? 'bg-white/40 cursor-not-allowed opacity-50' 
            : 'bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white'
        }`}
        aria-label="Previous slide"
        style={{
          width: '40px',
          height: '40px',
          border: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isAtStart ? 'opacity-50' : ''}
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        disabled={isAtEnd}
        className={`absolute right-2 top-[calc(50%-48px)] -translate-y-1/2 z-10 rounded-full p-2 transition-all ${
          isAtEnd 
            ? 'bg-white/40 cursor-not-allowed opacity-50' 
            : 'bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white'
        }`}
        aria-label="Next slide"
        style={{
          width: '40px',
          height: '40px',
          border: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isAtEnd ? 'opacity-50' : ''}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}