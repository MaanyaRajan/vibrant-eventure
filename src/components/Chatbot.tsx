
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, User, Bot, ChevronDown } from 'lucide-react';
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
    content: "👋 Hi there! I'm your event planning assistant. How can I help you today?",
    isBot: true,
    timestamp: new Date()
  }
];

const SUGGESTIONS = [
  "What themes do you offer for weddings?",
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
        "Thanks for your question! Our team specializes in creating memorable events tailored to your preferences.",
        "That's a great choice! We have several options that might interest you.",
        "I'd be happy to help with that. Let me provide some details.",
        "We recommend booking at least 3-6 months in advance for major events like weddings.",
        "Our packages include venue decoration, catering options, and photography services.",
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
      if (suggestion.includes("themes")) {
        botResponse = "For weddings, we offer Elegant Classic, Rustic Romance, Beach Paradise, Garden Enchantment, and Modern Minimalist themes. Each can be customized to your preferences!";
      } else if (suggestion.includes("catering")) {
        botResponse = "Our catering services include gourmet multi-course meals, buffet-style dining, cocktail reception packages, and dietary-specific options. We work with top local chefs!";
      } else if (suggestion.includes("advance")) {
        botResponse = "We recommend booking 6-12 months in advance for weddings, 3-6 months for large corporate events, and 1-3 months for birthdays and smaller gatherings.";
      } else if (suggestion.includes("packages")) {
        botResponse = "Our packages include venue decoration, catering, event coordination, photography/videography, entertainment options, and guest accommodation arrangements. We can create custom packages too!";
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

  return (
    <>
      {/* Chat button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-amber-500 text-black p-4 rounded-full shadow-lg hover:bg-amber-600"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        aria-label="Chat with us"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[500px] bg-black border border-amber-500/30 rounded-lg shadow-2xl flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat header */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-400 text-black p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                <h3 className="font-bold">Event Assistant</h3>
              </div>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 rounded-full text-black hover:bg-amber-700/20"
                onClick={toggleChat}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-900 to-black">
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
                        ? 'bg-gray-800 text-white rounded-tl-none' 
                        : 'bg-amber-500 text-black rounded-tr-none'}
                    `}
                  >
                    <div className="flex items-start mb-1">
                      {message.isBot ? (
                        <Bot className="h-4 w-4 mr-1 mt-1" />
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
                  <div className="bg-gray-800 text-white p-3 rounded-lg rounded-tl-none">
                    <div className="flex space-x-1">
                      <motion.div 
                        className="h-2 w-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'loop', delay: 0 }}
                      />
                      <motion.div 
                        className="h-2 w-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'loop', delay: 0.2 }}
                      />
                      <motion.div 
                        className="h-2 w-2 bg-gray-400 rounded-full"
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
              <div className="p-2 bg-gray-900 border-t border-gray-800">
                <p className="text-xs text-gray-400 mb-2 px-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs py-1 px-2 h-auto border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat input */}
            <div className="p-3 bg-gray-900 border-t border-gray-800">
              <div className="flex items-center gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="min-h-[40px] max-h-[120px] resize-none border-amber-500/30 focus-visible:ring-amber-500/50 bg-gray-800 text-white"
                />
                <Button 
                  type="submit" 
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className="bg-amber-500 hover:bg-amber-600 text-black flex-shrink-0"
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
