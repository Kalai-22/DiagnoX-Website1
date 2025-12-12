import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';

interface ContactMobilePageProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactMobilePage({ isOpen, onClose }: ContactMobilePageProps) {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    fromEmail: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch('https://script.google.com/macros/s/AKfycbxdauy9ygtDkm0tiwP_CDIPd6Wo85qvftzrQUIBwk10IYYmqWucomX-OmSwy2ECYQBt/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'support',
        email: formData.fromEmail,
        subject: formData.subject,
        message: formData.message
      }),
      mode: 'no-cors'
    })
      .then(() => {
        setSubmitted(true);
        setFormData({ fromEmail: '', subject: '', message: '' });
      })
      .catch((error) => {
        console.error('Submission error:', error);
        setSubmitted(true);
        setFormData({ fromEmail: '', subject: '', message: '' });
      });
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({ fromEmail: '', subject: '', message: '' });
    onClose();
  };

  const handleClear = () => {
    setFormData({ fromEmail: '', subject: '', message: '' });
    setSubmitted(false);
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
            <div className="flex items-center justify-between mb-2">
              <h1 
                className={`font-['Instrument_Serif:Regular',serif] ${
                  theme === 'dark' ? 'text-white' : 'text-[#0D0D0D]'
                }`}
                style={{ fontSize: '32px', lineHeight: '1.2', fontWeight: '500' }}
              >
                How can we help you?
              </h1>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className={`transition-colors ml-4 ${
                  theme === 'dark' 
                    ? 'text-white/70 hover:text-[#C0C0C0]' 
                    : 'text-black/70 hover:text-[#000d57]'
                }`}
              >
                <X style={{ width: '24px', height: '24px' }} />
              </motion.button>
            </div>
            <p 
              className={`font-['Poppins:Regular',sans-serif] ${
                theme === 'dark' ? 'text-white/60' : 'text-gray-500'
              }`}
              style={{ fontSize: '12.5px' }}
            >
              Send us a message at <span className={`font-['Poppins:SemiBold',sans-serif] ${
                theme === 'dark' ? 'text-[#C0C0C0]' : 'text-[#000d57]'
              }`}>contact@diagnox.xyz</span>
            </p>
          </div>

          {/* Form Content - Scrollable */}
          <div 
            className="h-[calc(100vh-132px)] overflow-y-auto"
            style={{
              padding: '24px',
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

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  type: 'spring', 
                  damping: 15, 
                  stiffness: 300 
                }}
                className="flex flex-col items-center justify-center py-16 space-y-4"
              >
                {/* Animated Success Icon */}
                <div className="relative">
                  {/* Outer ring animation */}
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
                      className={theme === 'dark' ? 'text-green-400' : 'text-green-500'}
                      style={{ width: '60px', height: '60px' }}
                      strokeWidth={2}
                    />
                  </motion.div>
                  
                  {/* Sparkles around the checkmark */}
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
                        className={theme === 'dark' ? 'text-green-300' : 'text-green-400'}
                        style={{ width: '16px', height: '16px' }}
                      />
                    </motion.div>
                  ))}
                </div>
                
                {/* Success Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center space-y-2"
                >
                  <h4 
                    className={`font-['Poppins:SemiBold',sans-serif] ${
                      theme === 'dark' ? 'text-green-400' : 'text-green-600'
                    }`}
                    style={{ fontSize: '20px' }}
                  >
                    Message Sent Successfully!
                  </h4>
                  <p 
                    className={`font-['Poppins:Regular',sans-serif] ${
                      theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                    }`}
                    style={{ fontSize: '15px' }}
                  >
                    We'll get back to you as soon as possible.
                  </p>
                </motion.div>
                
                {/* Send Another Message Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSubmitted(false)}
                  className={`mt-4 px-8 py-3 rounded-lg font-['Poppins:SemiBold',sans-serif] transition-all ${
                    theme === 'dark'
                      ? 'bg-white/10 hover:bg-white/15 text-white/80 border border-white/20'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                  }`}
                  style={{ fontSize: '14px' }}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Your email */}
                <div>
                  <label 
                    className={`block font-['Poppins:SemiBold',sans-serif] mb-2 ${
                      theme === 'dark' ? 'text-white/80' : 'text-gray-700'
                    }`}
                    style={{ fontSize: '13px' }}
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="fromEmail"
                    placeholder="you@example.com"
                    value={formData.fromEmail}
                    onChange={(e) => setFormData({ ...formData, fromEmail: e.target.value })}
                    required
                    className={`w-full border transition-colors ${
                      theme === 'dark'
                        ? 'bg-white/4 border-white/12 text-white placeholder:text-gray-500 focus:border-white/25 focus:outline-none'
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-gray-400 focus:outline-none'
                    } font-['Poppins:Regular',sans-serif]`}
                    style={{ 
                      height: '48px',
                      fontSize: '15px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      borderRadius: '8px'
                    }}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label 
                    className={`block font-['Poppins:SemiBold',sans-serif] mb-2 ${
                      theme === 'dark' ? 'text-white/80' : 'text-gray-700'
                    }`}
                    style={{ fontSize: '13px' }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className={`w-full border transition-colors ${
                      theme === 'dark'
                        ? 'bg-white/4 border-white/12 text-white placeholder:text-gray-500 focus:border-white/25 focus:outline-none'
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-gray-400 focus:outline-none'
                    } font-['Poppins:Regular',sans-serif]`}
                    style={{ 
                      height: '48px',
                      fontSize: '15px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      borderRadius: '8px'
                    }}
                  />
                  <p 
                    className={`text-right font-['Poppins:Regular',sans-serif] transition-colors mt-1 ${
                      formData.subject.length > 100
                        ? 'text-red-500'
                        : theme === 'dark'
                        ? 'text-white/50'
                        : 'text-gray-500'
                    }`}
                    style={{ fontSize: '12px' }}
                  >
                    {formData.subject.length} / 100
                  </p>
                </div>

                {/* Message */}
                <div>
                  <label 
                    className={`block font-['Poppins:SemiBold',sans-serif] mb-2 ${
                      theme === 'dark' ? 'text-white/80' : 'text-gray-700'
                    }`}
                    style={{ fontSize: '13px' }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us more..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className={`w-full border resize-none transition-colors ${
                      theme === 'dark'
                        ? 'bg-white/4 border-white/12 text-white placeholder:text-gray-500 focus:border-white/25 focus:outline-none'
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-gray-400 focus:outline-none'
                    } font-['Poppins:Regular',sans-serif]`}
                    style={{
                      fontSize: '15px',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      scrollbarWidth: 'thin',
                      scrollbarColor: theme === 'dark' 
                        ? 'rgba(192, 192, 192, 0.3) transparent'
                        : 'rgba(0, 13, 87, 0.3) transparent',
                    }}
                  />
                  <p 
                    className={`text-right font-['Poppins:Regular',sans-serif] transition-colors mt-1 ${
                      formData.message.length > 1000
                        ? 'text-red-500'
                        : theme === 'dark'
                        ? 'text-white/50'
                        : 'text-gray-500'
                    }`}
                    style={{ fontSize: '12px' }}
                  >
                    {formData.message.length} / 1000
                  </p>
                  <style>{`
                    textarea::-webkit-scrollbar {
                      width: 6px;
                    }
                    textarea::-webkit-scrollbar-track {
                      background: transparent;
                    }
                    textarea::-webkit-scrollbar-thumb {
                      background: ${theme === 'dark' 
                        ? 'rgba(192, 192, 192, 0.3)'
                        : 'rgba(0, 13, 87, 0.3)'
                      };
                      border-radius: 10px;
                    }
                    textarea::-webkit-scrollbar-thumb:hover {
                      background: ${theme === 'dark'
                        ? 'rgba(192, 192, 192, 0.5)'
                        : 'rgba(0, 13, 87, 0.5)'
                      };
                    }
                  `}</style>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClear}
                    className={`flex-1 border transition-all duration-200 backdrop-blur-md flex items-center justify-center ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30'
                        : 'bg-gray-100/50 border-gray-300 text-gray-700 hover:bg-gray-200/60 hover:border-gray-400'
                    } font-['Poppins:SemiBold',sans-serif]`}
                    style={{ 
                      height: '48px',
                      fontSize: '15px',
                      borderRadius: '8px'
                    }}
                  >
                    Clear
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={formData.subject.length > 100 || formData.message.length > 1000}
                    whileHover={formData.subject.length <= 100 && formData.message.length <= 1000 ? { scale: 1.02 } : {}}
                    whileTap={formData.subject.length <= 100 && formData.message.length <= 1000 ? { scale: 0.98 } : {}}
                    className={`flex-[2] transition-all duration-200 shadow-lg flex items-center justify-center relative overflow-hidden ${
                      formData.subject.length > 100 || formData.message.length > 1000
                        ? theme === 'dark'
                          ? 'bg-white/10 text-white/30 cursor-not-allowed'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : theme === 'dark'
                        ? 'bg-gradient-to-r from-white via-gray-100 to-white text-black hover:shadow-[0_0_20px_rgba(192,192,192,0.4)] hover:from-gray-50 hover:to-gray-50'
                        : 'text-white'
                    } font-['Poppins:SemiBold',sans-serif]`}
                    style={
                      formData.subject.length > 100 || formData.message.length > 1000
                        ? { 
                            height: '48px',
                            fontSize: '16px',
                            borderRadius: '8px'
                          }
                        : theme === 'light'
                        ? {
                            height: '48px',
                            fontSize: '16px',
                            borderRadius: '8px',
                            background: 'radial-gradient(circle at center, #0D0D0D 24%, #0A0D20 78%, #000D57 96%)',
                            boxShadow: 'inset 0 0 0 0.8px rgba(232, 232, 232, 0.8), 0 0 20px rgba(0, 13, 87, 0.4)',
                          }
                        : { 
                            height: '48px',
                            fontSize: '16px',
                            borderRadius: '8px'
                          }
                    }
                  >
                    <span className="relative z-10">Send Message</span>
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}