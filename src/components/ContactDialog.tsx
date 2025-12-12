import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactDialog({ isOpen, onClose }: ContactDialogProps) {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    fromEmail: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile breakpoint: scale down by 25%
  const isMobile = windowWidth <= 600;
  const scale = isMobile ? 0.75 : 1;
  
  // Dimensions scaled for mobile
  const dialogWidth = 560 * scale;
  const titleFontSize = 22 * scale;
  const subtitleFontSize = 13 * scale;
  const labelFontSize = 12 * scale;
  const inputFontSize = 14 * scale;
  const inputFontSizeSmall = 13.5 * scale;
  const buttonFontSize = 15 * scale;
  const buttonFontSizeSmall = 14 * scale;
  const counterFontSize = 11 * scale;
  const headerPadding = 16 * scale;
  const formPadding = 16 * scale;
  const spacing = 12 * scale;
  const inputHeight = 48 * scale;
  const inputHeightSmall = 44 * scale;
  const buttonHeight = 48 * scale;
  const iconSize = 20 * scale;
  const borderRadius = 16 * scale;
  const inputBorderRadius = 8 * scale;
  const emailBorderRadius = 36 * scale;
  const checkIconSize = 60 * scale;
  const checkRingSize = 80 * scale;
  const successTitleSize = 18 * scale;
  const successTextSize = 14 * scale;
  const successButtonSize = 13 * scale;
  const successPadding = 48 * scale;
  const sparkleSize = 16 * scale;

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
        setSubmitted(true); // Still show success
        setFormData({ fromEmail: '', subject: '', message: '' });
      });
  };

  
  const handleClose = () => {
    // Reset form state when closing
    setSubmitted(false);
    setFormData({ fromEmail: '', subject: '', message: '' });
    onClose();
  };

  const handleClear = () => {
    setFormData({ fromEmail: '', subject: '', message: '' });
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
            onClick={handleClose}
          />
          
          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, y: 100, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 100, x: 50 }}
            transition={{ 
              type: 'spring',
              damping: 25,
              stiffness: 300,
              duration: 0.32
            }}
            className="fixed bottom-10 right-10 z-[70] overflow-hidden"
            style={{
              width: `${dialogWidth}px`,
              borderRadius: `${borderRadius}px`,
              background: theme === 'dark'
                ? 'linear-gradient(to bottom, #0B0B0B, #121212)'
                : 'linear-gradient(to bottom, #ffffff, #f9fafb)',
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
              <div className="flex items-center justify-between mb-1">
                <h3 
                  className={`font-['Instrument_Serif:Regular',serif] ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontSize: `${titleFontSize}px` }}
                >
                  How can we help you?
                </h3>
                <motion.button
                  whileHover={{ 
                    scale: 1.1, 
                    color: theme === 'dark' ? '#C0C0C0' : '#000d57'
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className={`transition-colors ${
                    theme === 'dark' 
                      ? 'text-white/60 hover:text-[#C0C0C0]' 
                      : 'text-gray-400 hover:text-[#000d57]'
                  }`}
                >
                  <X style={{ width: `${iconSize}px`, height: `${iconSize}px` }} />
                </motion.button>
              </div>
              <p 
                className={`font-['Poppins:Regular',sans-serif] ${theme === 'dark' ? 'text-white/60' : 'text-gray-500'}`}
                style={{ fontSize: `${subtitleFontSize}px` }}
              >
                Send us a message at <span className={`font-['Poppins:SemiBold',sans-serif] ${
                  theme === 'dark' ? 'text-[#C0C0C0]' : 'text-[#000d57]'
                }`}>contact@diagnox.xyz</span>
              </p>
            </div>

            {/* Form */}
            <div style={{ padding: `${formPadding}px` }}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    type: 'spring', 
                    damping: 15, 
                    stiffness: 300 
                  }}
                  className="flex flex-col items-center justify-center space-y-4"
                  style={{ paddingTop: `${successPadding}px`, paddingBottom: `${successPadding}px` }}
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
                      style={{ 
                        width: `${checkRingSize}px`, 
                        height: `${checkRingSize}px`, 
                        top: `${-10 * scale}px`, 
                        left: `${-10 * scale}px` 
                      }}
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
                        style={{ width: `${checkIconSize}px`, height: `${checkIconSize}px` }}
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
                          x: [0, (i - 1) * 25 * scale],
                          y: [0, (-20 + (i * 10)) * scale]
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
                          style={{ width: `${sparkleSize}px`, height: `${sparkleSize}px` }}
                        />
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Success Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                    style={{ display: 'flex', flexDirection: 'column', gap: `${spacing / 2}px` }}
                  >
                    <h4 
                      className={`font-['Poppins:SemiBold',sans-serif] ${
                        theme === 'dark' ? 'text-green-400' : 'text-green-600'
                      }`}
                      style={{ fontSize: `${successTitleSize}px` }}
                    >
                      Message Sent Successfully!
                    </h4>
                    <p 
                      className={`font-['Poppins:Regular',sans-serif] ${
                        theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                      }`}
                      style={{ fontSize: `${successTextSize}px` }}
                    >
                      We'll get back to you as soon as possible.
                    </p>
                  </motion.div>
                  
                  {/* Optional: Send Another Message Button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSubmitted(false)}
                    className={`mt-4 px-6 rounded-lg font-['Poppins:SemiBold',sans-serif] transition-all ${
                      theme === 'dark'
                        ? 'bg-white/10 hover:bg-white/15 text-white/80 border border-white/20'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                    }`}
                    style={{ 
                      fontSize: `${successButtonSize}px`,
                      paddingTop: `${10 * scale}px`,
                      paddingBottom: `${10 * scale}px`
                    }}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: `${spacing}px` }}>
                  {/* Your email */}
                  <div>
                    <label 
                      className={`block font-['Poppins:SemiBold',sans-serif] ${
                        theme === 'dark' ? 'text-white/80' : 'text-gray-700'
                      }`}
                      style={{ fontSize: `${labelFontSize}px`, marginBottom: `${6 * scale}px` }}
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
                        height: `${inputHeight}px`,
                        fontSize: `${inputFontSize}px`,
                        paddingLeft: `${16 * scale}px`,
                        paddingRight: `${16 * scale}px`,
                        borderRadius: `${emailBorderRadius}px` 
                      }}
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label 
                      className={`block font-['Poppins:SemiBold',sans-serif] ${
                        theme === 'dark' ? 'text-white/80' : 'text-gray-700'
                      }`}
                      style={{ fontSize: `${labelFontSize}px`, marginBottom: `${6 * scale}px` }}
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
                        height: `${inputHeightSmall}px`,
                        fontSize: `${inputFontSizeSmall}px`,
                        paddingLeft: `${14 * scale}px`,
                        paddingRight: `${14 * scale}px`,
                        borderRadius: `${inputBorderRadius}px` 
                      }}
                    />
                    <p 
                      className={`text-right font-['Poppins:Regular',sans-serif] transition-colors ${
                        formData.subject.length > 100
                          ? 'text-red-500'
                          : theme === 'dark'
                          ? 'text-white/50'
                          : 'text-gray-500'
                      }`}
                      style={{ fontSize: `${counterFontSize}px`, marginTop: `${4 * scale}px` }}
                    >
                      {formData.subject.length} / 100
                    </p>
                  </div>

                  {/* Message */}
                  <div>
                    <label 
                      className={`block font-['Poppins:SemiBold',sans-serif] ${
                        theme === 'dark' ? 'text-white/80' : 'text-gray-700'
                      }`}
                      style={{ fontSize: `${labelFontSize}px`, marginBottom: `${6 * scale}px` }}
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      placeholder="Tell us more..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={4}
                      className={`w-full border resize-none transition-colors ${
                        theme === 'dark'
                          ? 'bg-white/4 border-white/12 text-white placeholder:text-gray-500 focus:border-white/25 focus:outline-none'
                          : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-gray-400 focus:outline-none'
                      } font-['Poppins:Regular',sans-serif]`}
                      style={{
                        fontSize: `${inputFontSize}px`,
                        padding: `${8 * scale}px ${12 * scale}px`,
                        borderRadius: `${inputBorderRadius}px`,
                        scrollbarWidth: 'thin',
                        scrollbarColor: theme === 'dark' 
                          ? 'rgba(192, 192, 192, 0.3) transparent'
                          : 'rgba(0, 13, 87, 0.3) transparent',
                      }}
                    />
                    <p 
                      className={`text-right font-['Poppins:Regular',sans-serif] transition-colors ${
                        formData.message.length > 1000
                          ? 'text-red-500'
                          : theme === 'dark'
                          ? 'text-white/50'
                          : 'text-gray-500'
                      }`}
                      style={{ fontSize: `${counterFontSize}px`, marginTop: `${4 * scale}px` }}
                    >
                      {formData.message.length} / 1000
                    </p>
                    <style>{`
                      textarea::-webkit-scrollbar {
                        width: ${6 * scale}px;
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
                  <div className="flex" style={{ gap: `${spacing}px`, paddingTop: `${8 * scale}px` }}>
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
                        height: `${buttonHeight}px`,
                        fontSize: `${buttonFontSizeSmall}px`,
                        borderRadius: `${inputBorderRadius}px` 
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
                              height: `${buttonHeight}px`,
                              fontSize: `${buttonFontSize}px`,
                              borderRadius: `${inputBorderRadius}px` 
                            }
                          : theme === 'light'
                          ? {
                              height: `${buttonHeight}px`,
                              fontSize: `${buttonFontSize}px`,
                              borderRadius: `${inputBorderRadius}px`,
                              background: 'radial-gradient(circle at center, #0D0D0D 24%, #0A0D20 78%, #000D57 96%)',
                              boxShadow: 'inset 0 0 0 0.8px rgba(232, 232, 232, 0.8), 0 0 20px rgba(0, 13, 87, 0.4)',
                            }
                          : { 
                              height: `${buttonHeight}px`,
                              fontSize: `${buttonFontSize}px`,
                              borderRadius: `${inputBorderRadius}px` 
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
        </>
      )}
    </AnimatePresence>
  );
}