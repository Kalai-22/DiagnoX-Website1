import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

interface FAQDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const faqData = [
  {
    question: "What is DiagnoX and how does it work?",
    answer: "DiagnoX is a cloud-powered vehicle diagnostics tool that connects to your car's OBD-II port and analyzes data to provide real-time health reports, predictive maintenance alerts, and safety notifications."
  },
  {
    question: "When will DiagnoX be available?",
    answer: "We're launching soon! Join our waitlist to be among the first to experience DiagnoX and receive updates on release dates."
  },
  {
    question: "What vehicles are compatible with DiagnoX?",
    answer: "DiagnoX supports most cars equipped with OBD-II ports (generally vehicles manufactured after 2008). If you're unsure, reach out to our support team for confirmation."
  },
  {
    question: "Does DiagnoX require an internet connection?",
    answer: "Yes, for now, DiagnoX analyzes your vehicle data securely via the cloud, so you'll need an internet connection for full functionality."
  },
  {
    question: "Will my data stay private and secure?",
    answer: "Absolutely. We use industry-standard encryption to protect your vehicle's data and do not share your information with third parties."
  },
  {
    question: "How do I set up DiagnoX?",
    answer: "Simply plug the dongle into your car's OBD-II port, download our mobile app, and follow the on-screen instructions to activate and start scanning."
  },
  {
    question: "What are predictive maintenance alerts?",
    answer: "Our AI analyzes your car's data to predict possible issues before they become costly repairs, helping you save time and money on servicing."
  },
  {
    question: "Does DiagnoX support anti-theft and anti-tow alerts?",
    answer: "DiagnoX monitors unusual vehicle activity and can notify you in case of unauthorized movement or potential towing events."
  },
  {
    question: "How can I contact support if I have issues?",
    answer: "Click the 'Support' link on our website or app to reach our team via email or live chat."
  },
  {
    question: "Can I try DiagnoX before it launches?",
    answer: "Join our waitlist for early access opportunities and be the first to test new features as a beta customer."
  }
];

export function FAQDialog({ isOpen, onClose }: FAQDialogProps) {
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile breakpoint: scale down by 30%
  const isMobile = windowWidth <= 600;
  const scale = isMobile ? 0.7 : 1;
  
  // Dimensions scaled for mobile
  const dialogWidth = 480 * scale;
  const dialogHeight = 420 * scale;
  const titleFontSize = 22 * scale;
  const questionFontSize = 15 * scale;
  const answerFontSize = 14 * scale;
  const headerPadding = 16 * scale;
  const contentPadding = 16 * scale;
  const buttonPadding = 12 * scale;
  const iconSize = 20 * scale;
  const chevronSize = 16 * scale;
  const borderRadius = 16 * scale;
  const spacing = 8 * scale;
  const scrollbarWidth = 6 * scale;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, y: 100, x: -50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 100, x: -50 }}
            transition={{ 
              type: 'spring',
              damping: 25,
              stiffness: 300,
              duration: 0.32
            }}
            className="fixed bottom-10 left-10 z-[70] overflow-hidden"
            style={{
              width: `${dialogWidth}px`,
              height: `${dialogHeight}px`,
              borderRadius: `${borderRadius}px`,
              background: theme === 'dark'
                ? 'linear-gradient(to bottom, #0B0B0B, #121212)'
                : 'linear-gradient(to bottom, #FFFFFF, #F7F9FF)',
              boxShadow: theme === 'dark'
                ? '0 2px 18px rgba(192, 192, 192, 0.45), inset 0 0 0 1px rgba(192, 192, 192, 0.15)'
                : '0 2px 18px rgba(0, 13, 87, 0.45), inset 0 0 0 1px rgba(0, 13, 87, 0.15)',
            }}
          >
            {/* Header */}
            <div 
              className={`border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}
              style={{ padding: `${headerPadding}px` }}
            >
              <div className="flex items-center justify-between">
                <h3 
                  className={`font-['Instrument_Serif:Regular',serif] ${theme === 'dark' ? 'text-white' : 'text-[#0D0D0D]'}`}
                  style={{ fontSize: `${titleFontSize}px` }}
                >
                  Frequently Asked Questions
                </h3>
                <motion.button
                  whileHover={{ 
                    scale: 1.1, 
                    color: theme === 'dark' ? '#C0C0C0' : '#000d57'
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className={`transition-colors ${
                    theme === 'dark' 
                      ? 'text-white/70 hover:text-[#C0C0C0]' 
                      : 'text-black/70 hover:text-[#000d57]'
                  }`}
                >
                  <X style={{ width: `${iconSize}px`, height: `${iconSize}px` }} />
                </motion.button>
              </div>
            </div>

            {/* FAQ List - Scrollable */}
            <div 
              className="overflow-y-auto" 
              style={{
                height: `${dialogHeight - (headerPadding * 2 + titleFontSize + 1)}px`,
                padding: `${contentPadding}px`,
                scrollbarWidth: 'thin',
                scrollbarColor: theme === 'dark' 
                  ? 'rgba(192, 192, 192, 0.3) transparent'
                  : 'rgba(0, 13, 87, 0.3) transparent',
              }}
            >
              <style>{`
                div::-webkit-scrollbar {
                  width: ${scrollbarWidth}px;
                }
                div::-webkit-scrollbar-track {
                  background: transparent;
                }
                div::-webkit-scrollbar-thumb {
                  background: ${theme === 'dark' 
                    ? 'rgba(192, 192, 192, 0.3)'
                    : 'rgba(0, 13, 87, 0.3)'
                  };
                  border-radius: 10px;
                }
                div::-webkit-scrollbar-thumb:hover {
                  background: ${theme === 'dark'
                    ? 'rgba(192, 192, 192, 0.5)'
                    : 'rgba(0, 13, 87, 0.5)'
                  };
                }
              `}</style>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: `${spacing}px` }}>
                {faqData.map((faq, index) => (
                  <div 
                    key={index}
                    className={`border-b ${
                      theme === 'dark' ? 'border-white/8' : 'border-gray-200'
                    }`}
                  >
                    {/* Question */}
                    <motion.button
                      onClick={() => toggleFAQ(index)}
                      className="w-full text-left flex items-center justify-between"
                      style={{ paddingTop: `${buttonPadding}px`, paddingBottom: `${buttonPadding}px`, gap: `${buttonPadding}px` }}
                      whileHover={{ x: 2 }}
                    >
                      <span 
                        className={`font-['Poppins:SemiBold',sans-serif] ${
                          theme === 'dark' ? 'text-[#EDEDED]' : 'text-[#0D0D0D]'
                        }`}
                        style={{ fontSize: `${questionFontSize}px` }}
                      >
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="shrink-0"
                      >
                        <ChevronRight 
                          className={theme === 'dark' ? 'text-[#C0C0C0]' : 'text-[#000d57]'}
                          style={{ width: `${chevronSize}px`, height: `${chevronSize}px` }}
                        />
                      </motion.div>
                    </motion.button>
                    
                    {/* Answer */}
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p 
                            className={`font-['Poppins:Regular',sans-serif] leading-[1.5] ${
                              theme === 'dark' ? 'text-white/78' : 'text-black/78'
                            }`}
                            style={{ 
                              fontSize: `${answerFontSize}px`, 
                              paddingBottom: `${buttonPadding}px`,
                              paddingRight: `${contentPadding * 1.5}px` 
                            }}
                          >
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
