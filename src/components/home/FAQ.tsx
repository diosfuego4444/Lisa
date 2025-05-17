import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { faqData } from '../../data/faqData';

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  
  const toggleItem = (id: string) => {
    setOpenItems((prev) => 
      prev.includes(id) 
        ? prev.filter((item) => item !== id) 
        : [...prev, id]
    );
  };
  
  return (
    <section id="faq" className="py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
            Preguntas <span className="text-primary-600 dark:text-primary-400">frecuentes</span>
          </h2>
          <p className="text-light-secondary dark:text-dark-secondary max-w-2xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre nuestros préstamos personales.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className={`w-full text-left p-5 rounded-lg flex justify-between items-center transition-colors ${
                  openItems.includes(item.id)
                    ? 'bg-primary-50 dark:bg-primary-900/20'
                    : 'glass-panel hover:bg-light-surface dark:hover:bg-dark-surface'
                }`}
              >
                <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
                  {item.question}
                </h3>
                
                <span>
                  {openItems.includes(item.id) ? (
                    <ChevronUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-light-tertiary dark:text-dark-tertiary" />
                  )}
                </span>
              </button>
              
              <AnimatePresence>
                {openItems.includes(item.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 bg-light-surface dark:bg-dark-surface rounded-b-lg">
                      <p className="text-light-secondary dark:text-dark-secondary">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-light-secondary dark:text-dark-secondary mb-4">
            ¿No encuentras la respuesta que buscas?
          </p>
          
          <a
            href="#chatbot"
            className="apple-button-secondary inline-flex"
          >
            Hablar con un asesor
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;