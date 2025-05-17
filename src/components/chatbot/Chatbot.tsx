import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import { ChatbotMessage, ChatbotOption } from '../../types';
import { initialMessages, chatbotResponses } from '../../data/chatbotData';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatbotMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);
  
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };
  
  const handleOptionClick = (optionId: string) => {
    // Add user message
    const userMessage: ChatbotMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: chatbotResponses[optionId]?.options?.[0]?.text || 'No option text',
      timestamp: new Date(),
    };
    
    // Add bot response
    if (chatbotResponses[optionId]) {
      const botResponse = {
        ...chatbotResponses[optionId],
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, userMessage, botResponse]);
    }
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: ChatbotMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: newMessage,
      timestamp: new Date(),
    };
    
    // Add generic bot response
    const botResponse: ChatbotMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: 'Gracias por tu mensaje. Un asesor revisará tu consulta y te contactará a la brevedad.',
      options: [
        { id: 'back', text: 'Volver al menú principal' },
      ],
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage, botResponse]);
    setNewMessage('');
  };

  return (
    <div id="chatbot" className="fixed bottom-6 right-6 z-40">
      {/* Toggle button */}
      <motion.button
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center ${
          isOpen 
            ? 'bg-error-600 text-white' 
            : 'bg-primary-600 text-white'
        }`}
        onClick={toggleChatbot}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
      
      {/* Chatbot window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 right-0 w-96 max-w-full glass-panel overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary-600 text-white p-4">
              <h3 className="font-semibold">Asistente virtual</h3>
              <p className="text-xs opacity-80">Respuesta instantánea a tus consultas</p>
            </div>
            
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 ${
                    message.sender === 'bot' ? 'text-left' : 'text-right'
                  }`}
                >
                  <div
                    className={`inline-block max-w-[80%] rounded-xl p-3 ${
                      message.sender === 'bot'
                        ? 'bg-light-surface dark:bg-dark-elevated text-light-text dark:text-dark-text rounded-tl-none'
                        : 'bg-primary-600 text-white rounded-tr-none'
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>
                  
                  {/* Options */}
                  {message.sender === 'bot' && message.options && (
                    <div className="mt-2 space-y-2">
                      {message.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleOptionClick(option.id)}
                          className="block w-full text-left py-2 px-3 rounded-lg bg-light-surface/80 dark:bg-dark-surface/80 hover:bg-light-surface dark:hover:bg-dark-surface text-light-text dark:text-dark-text text-sm transition-colors"
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <div
                    className={`text-xs mt-1 text-light-tertiary dark:text-dark-tertiary ${
                      message.sender === 'bot' ? 'text-left' : 'text-right'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-light-surface dark:border-dark-elevated">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 glass-input py-2"
                />
                <button
                  type="submit"
                  className="apple-button-primary !py-2 !px-4"
                  disabled={!newMessage.trim()}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;