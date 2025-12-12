import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';

interface FAQMobilePageProps {
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

export function FAQMobilePage({ isOpen, onClose }: FAQMobilePageProps) {
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ 
            type: 'spring',
            damping: 30,
            stiffness: 300
          }}
          className="fixed inset-0 z-[100] overflow-hidden"
          style={{
            background: theme === 'dark'
              ? '#0d0d0d'
              : '#ffffff',
          }}
        >
          {/* Header */}
          <div 
            className={`sticky top-0 z-10 border-b ${
              theme === 'dark' ? 'border-white/10 bg-[#0d0d0d]' : 'border-gray-200 bg-white'
            }`}
            style={{ padding: '24px' }}
          >
            <div className="flex items-center justify-between">
              <h1 
                className={`font-['Instrument_Serif:Regular',serif] ${
                  theme === 'dark' ? 'text-white' : 'text-[#0D0D0D]'
                }`}
                style={{ fontSize: '28px', lineHeight: '1.2', fontWeight: '500' }}
              >
                Frequently Asked Questions
              </h1>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className={`transition-colors ml-4 ${
                  theme === 'dark' 
                    ? 'text-white/70 hover:text-[#C0C0C0]' 
                    : 'text-black/70 hover:text-[#000d57]'
                }`}
              >
                <X style={{ width: '28px', height: '28px' }} />
              </motion.button>
            </div>
          </div>

          {/* FAQ List - Scrollable */}
          <div 
            className="h-[calc(100vh-96px)] overflow-y-auto"
            style={{
              padding: '16px 24px 24px 24px',
              scrollbarWidth: 'thin',
              scrollbarColor: theme === 'dark' 
                ? 'rgba(192, 192, 192, 0.3) transparent'
                : 'rgba(0, 13, 87, 0.3) transparent',
            }}
          >
            <style>{`
              div::-webkit-scrollbar {
                width: 6px;
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
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {faqData.map((faq, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-b ${
                    theme === 'dark' ? 'border-white/8' : 'border-gray-200'
                  }`}
                  style={{ paddingBottom: '8px' }}
                >
                  {/* Question */}
                  <motion.button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left flex items-center justify-between"
                    style={{ paddingTop: '12px', paddingBottom: '8px', gap: '16px' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span 
                      className={`font-['Poppins:SemiBold',sans-serif] ${
                        theme === 'dark' ? 'text-[#EDEDED]' : 'text-[#0D0D0D]'
                      }`}
                      style={{ fontSize: '16px', lineHeight: '1.4' }}
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
                        style={{ width: '20px', height: '20px' }}
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
                          className={`font-['Poppins:Regular',sans-serif] ${
                            theme === 'dark' ? 'text-white/78' : 'text-black/78'
                          }`}
                          style={{ 
                            fontSize: '15px', 
                            lineHeight: '1.6',
                            paddingTop: '4px',
                            paddingBottom: '8px',
                            paddingRight: '32px' 
                          }}
                        >
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
