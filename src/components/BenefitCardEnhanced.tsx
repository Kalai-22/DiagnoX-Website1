import { motion } from 'motion/react';
import { Zap, Shield, Lock, Smile } from 'lucide-react';

interface BenefitCardEnhancedProps {
  title: string;
  description: string;
  index: number;
  icon: 'zap' | 'shield' | 'lock' | 'smile';
  isExpanded: boolean;
  onToggle: (index: number) => void;
}

const iconMap = {
  zap: Zap,
  shield: Shield,
  lock: Lock,
  smile: Smile,
};

export function BenefitCardEnhanced({ title, description, index, icon, isExpanded, onToggle }: BenefitCardEnhancedProps) {
  const Icon = iconMap[icon];

  // Staggered entrance animation with bounce
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    visible: { 
      scale: 1, 
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: index * 0.12 + 0.2,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      onClick={() => onToggle(index)}
      className="relative cursor-pointer"
      style={{
        width: '100%',
        maxWidth: '360px',
      }}
    >
      {/* Main card container */}
      <motion.div
        className="relative overflow-hidden"
        whileTap={{ scale: 0.98 }}
        style={{
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: isExpanded
            ? '0 25px 50px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
            : '0 12px 30px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
          padding: '14px 16px',
        }}
        animate={{
          scale: isExpanded ? 1.02 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Gradient overlay on expand */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: isExpanded ? 0.08 : 0
          }}
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(0, 13, 87, 0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Content wrapper */}
        <div className="relative flex items-center gap-3">
          {/* Icon */}
          <motion.div
            variants={iconVariants}
            className="shrink-0"
          >
            <motion.div
              className="relative rounded-full flex items-center justify-center bg-[#000d57]/6"
              style={{
                width: '38px',
                height: '38px',
                border: '1.5px solid rgba(0, 13, 87, 0.12)'
              }}
              animate={{
                boxShadow: isExpanded
                  ? ['0 0 0 0 rgba(0, 13, 87, 0.15)', '0 0 0 8px rgba(0, 13, 87, 0)', '0 0 0 0 rgba(0, 13, 87, 0)']
                  : '0 0 0 0 rgba(0, 13, 87, 0)'
              }}
              transition={{ duration: 0.6 }}
            >
              <Icon 
                className="text-[#000d57]"
                size={20}
                strokeWidth={2.2}
              />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h3 
            className="flex-1 font-['Instrument_Serif:Regular',serif] text-black text-left"
            style={{ 
              fontSize: '17px',
              lineHeight: '1.3',
              letterSpacing: '0.01em'
            }}
            animate={{
              color: isExpanded ? '#000d57' : '#000000'
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>

          {/* Expand indicator */}
          <motion.div
            className="shrink-0"
            animate={{
              rotate: isExpanded ? 180 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-5 h-5 rounded-full flex items-center justify-center bg-black/5">
              <svg 
                width="9" 
                height="9" 
                viewBox="0 0 10 10" 
                fill="none"
                className="text-black/60"
              >
                <path 
                  d="M5 2L5 8M5 8L2 5M5 8L8 5" 
                  stroke="currentColor" 
                  strokeWidth="1.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Description with smooth expand/collapse */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0,
            marginTop: isExpanded ? '14px' : 0
          }}
          transition={{ 
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{ overflow: 'hidden' }}
        >
          <p 
            className="font-['Poppins:Regular',sans-serif] text-black/70 text-justify pl-[56px]"
            style={{ 
              fontSize: '13px',
              lineHeight: '1.65',
              letterSpacing: '0.015em'
            }}
          >
            {description}
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom shine effect */}
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-4 blur-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.12 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.12 + 0.3 }}
        style={{
          background: 'radial-gradient(ellipse, rgba(0, 13, 87, 0.3) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  );
}