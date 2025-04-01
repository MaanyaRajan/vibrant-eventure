
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, User, Flower, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Message {
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    content: "🌸 Hi there! I'm your event planning assistant. How can I help you today?",
    isBot: true,
    timestamp: new Date()
  }
];

const SUGGESTIONS = [
  "What floral themes do you offer for weddings?",
  "Tell me about your catering services",
  "How far in advance should I book?",
  "What's included in your packages?"
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to most recent message
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Reset to initial state when opening
      setMessages(INITIAL_MESSAGES);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      content: input,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot response (in a real app, this would be an API call)
    setTimeout(() => {
      const responses = [
        "Our beautiful floral arrangements can transform your event space into a magical garden. Would you like to see some examples?",
        "That's a lovely choice! We have several floral design options that might interest you.",
        "I'd be happy to help with that. Let me provide some details about our seasonal blooms.",
        "We recommend booking at least 3-6 months in advance for major events like weddings to ensure we have your preferred flowers in season.",
        "Our packages include venue decoration with fresh flowers, catering options, and photography services.",
      ];
      
      const botResponse: Message = {
        content: responses[Math.floor(Math.random() * responses.length)],
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    // Auto-send the suggestion
    const userMessage: Message = {
      content: suggestion,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse = "";
      
      // Custom responses based on suggestion
      if (suggestion.includes("floral themes")) {
        botResponse = "For weddings, we offer Garden Romance with roses and peonies, Rustic Wildflower, Tropical Paradise with orchids, Classic Elegance with white lilies, and Seasonal Bloom with the freshest in-season flowers. Each can be customized to your color preferences!";
      } else if (suggestion.includes("catering")) {
        botResponse = "Our catering services include gourmet multi-course meals featuring edible flowers, buffet-style dining, cocktail reception packages, and dietary-specific options. We work with top local chefs who create visually stunning dishes!";
      } else if (suggestion.includes("advance")) {
        botResponse = "We recommend booking 6-12 months in advance for weddings to secure seasonal flowers, 3-6 months for large corporate events, and 1-3 months for birthdays and smaller gatherings.";
      } else if (suggestion.includes("packages")) {
        botResponse = "Our packages include floral venue decoration, botanical centerpieces, floral archways, catering, event coordination, photography/videography, entertainment options, and guest accommodation arrangements. We can create custom packages with your favorite blooms too!";
      }
      
      const response: Message = {
        content: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  // Define robot face SVG for the chat button
  const RobotFace = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="#FFDAEB" />
      <circle cx="8" cy="10" r="2" fill="#111" />
      <circle cx="16" cy="10" r="2" fill="#111" />
      <path d="M8 15C8 15 10 17 12 17C14 17 16 15 16 15" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19 8L21 6M5 8L3 6" stroke="#FFDAEB" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="7" y="2" width="10" height="2" rx="1" fill="#FFDAEB" />
    </svg>
  );

  // Define robot icon for chat messages
  const RobotIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 mt-1">
      <rect x="3" y="6" width="18" height="14" rx="3" fill="#FFDAEB" />
      <circle cx="9" cy="12" r="1.5" fill="#111" />
      <circle cx="15" cy="12" r="1.5" fill="#111" />
      <path d="M9 16C9 16 10.5 17 12 17C13.5 17 15 16 15 16" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 9L20 7M6 9L4 7" stroke="#FFDAEB" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="8" y="4" width="8" height="2" rx="1" fill="#FFDAEB" />
    </svg>
  );

  return (
    <>
      {/* Chat button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-pink-400 to-rose-500 text-white p-4 rounded-full shadow-lg hover:from-pink-500 hover:to-rose-600 animate-pulse-glow"
        whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        aria-label="Chat with us"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <RobotFace />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[500px] bg-white border border-pink-200 rounded-lg shadow-2xl flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat header */}
            <div className="bg-gradient-to-r from-pink-400 to-rose-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center">
                <RobotFace />
                <h3 className="font-bold ml-2">Flora Bot</h3>
              </div>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 rounded-full text-white hover:bg-pink-500/20"
                onClick={toggleChat}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-pink-50 to-white floral-pattern">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className={`
                      max-w-[80%] p-3 rounded-lg 
                      ${message.isBot 
                        ? 'bg-pink-100 text-gray-800 rounded-tl-none' 
                        : 'bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-tr-none'}
                    `}
                  >
                    <div className="flex items-start mb-1">
                      {message.isBot ? (
                        <RobotIcon />
                      ) : (
                        <User className="h-4 w-4 mr-1 mt-1" />
                      )}
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs opacity-70 text-right">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  className="mb-4 flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-pink-100 text-gray-800 p-3 rounded-lg rounded-tl-none">
                    <div className="flex space-x-1">
                      <motion.div 
                        className="h-2 w-2 bg-pink-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'loop', delay: 0 }}
                      />
                      <motion.div 
                        className="h-2 w-2 bg-pink-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'loop', delay: 0.2 }}
                      />
                      <motion.div 
                        className="h-2 w-2 bg-pink-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'loop', delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={endOfMessagesRef} />
            </div>

            {/* Chat suggestions */}
            {messages.length < 3 && (
              <div className="p-2 bg-pink-50 border-t border-pink-100">
                <p className="text-xs text-gray-500 mb-2 px-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs py-1 px-2 h-auto border-pink-200 text-pink-700 hover:bg-pink-100"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat input */}
            <div className="p-3 bg-pink-50 border-t border-pink-100">
              <div className="flex items-center gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="min-h-[40px] max-h-[120px] resize-none border-pink-200 focus-visible:ring-pink-400 bg-white text-gray-800"
                />
                <Button 
                  type="submit" 
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white flex-shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
