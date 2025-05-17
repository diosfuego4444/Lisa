import React from 'react';
import { motion } from 'framer-motion';
import { stepsData } from '../../data/stepsData';
import { Calculator, ClipboardEdit, ShieldCheck, ThumbsUp, FileSignature, Banknote } from 'lucide-react';

const icons = {
  Calculator: <Calculator className="w-6 h-6" />,
  ClipboardEdit: <ClipboardEdit className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  ThumbsUp: <ThumbsUp className="w-6 h-6" />,
  FileSignature: <FileSignature className="w-6 h-6" />,
  Banknote: <Banknote className="w-6 h-6" />,
};

const HowToApply: React.FC = () => {
  return (
    <section id="como-solicitar" className="py-24 px-4 bg-light-surface dark:bg-dark-surface">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
            ¿Cómo solicitar un <span className="text-primary-600 dark:text-primary-400">préstamo</span>?
          </h2>
          <p className="text-light-secondary dark:text-dark-secondary max-w-2xl mx-auto">
            Obtener tu préstamo personal es rápido y sencillo. 
            Sigue estos simples pasos y recibe el dinero en tu cuenta en 24 horas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stepsData.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-panel p-6 relative"
            >
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary-600 dark:bg-primary-500 text-white flex items-center justify-center font-bold text-xl z-10">
                {index + 1}
              </div>
              
              {/* Connector line */}
              {index < stepsData.length - 1 && (
                <div className="absolute top-12 -right-4 w-8 h-0.5 bg-primary-300 dark:bg-primary-700 hidden lg:block"></div>
              )}
              
              <div className="mb-4 pt-2">
                <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  {
                    step.icon in icons
                      ? icons[step.icon as keyof typeof icons]
                      : <div className="w-6 h-6" />
                  }
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-3">
                {step.title}
              </h3>
              
              <p className="text-light-secondary dark:text-dark-secondary">
                {step.description}
              </p>
              
              {/* Animated illustration */}
              <motion.div
                className="mt-6 h-20 flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.05, 1],
                  y: [0, -5, 0],
                }}
                transition={{ 
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 3,
                  delay: index * 0.5,
                }}
              >
                {index === 0 && (
                  <div className="relative w-20 h-16">
                    <div className="absolute inset-0 bg-light-surface dark:bg-dark-elevated rounded-lg"></div>
                    <div className="absolute top-3 left-3 right-3 h-2 bg-primary-200 dark:bg-primary-800 rounded"></div>
                    <div className="absolute top-8 left-3 w-8 h-2 bg-primary-300 dark:bg-primary-700 rounded"></div>
                    <motion.div 
                      className="absolute bottom-3 right-3 w-3 h-3 bg-primary-600 dark:bg-primary-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    ></motion.div>
                  </div>
                )}
                
                {index === 1 && (
                  <div className="relative w-20 h-16">
                    <div className="absolute inset-0 bg-light-surface dark:bg-dark-elevated rounded-lg"></div>
                    <div className="absolute top-3 left-3 right-3 h-1 bg-light-tertiary dark:bg-dark-tertiary rounded"></div>
                    <div className="absolute top-6 left-3 right-3 h-1 bg-light-tertiary dark:bg-dark-tertiary rounded"></div>
                    <div className="absolute top-9 left-3 right-8 h-1 bg-light-tertiary dark:bg-dark-tertiary rounded"></div>
                    <motion.div 
                      className="absolute right-3 bottom-3 w-4 h-4 border-2 border-primary-600 dark:border-primary-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    ></motion.div>
                  </div>
                )}
                
                {index === 2 && (
                  <div className="relative w-20 h-16">
                    <div className="absolute inset-0 bg-light-surface dark:bg-dark-elevated rounded-lg"></div>
                    <div className="absolute inset-3 border-2 border-dashed border-primary-300 dark:border-primary-700 rounded"></div>
                    <motion.div 
                      className="absolute inset-0 m-auto w-6 h-6 bg-primary-600 dark:bg-primary-400 rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </motion.div>
                  </div>
                )}
                
                {index === 3 && (
                  <div className="relative w-20 h-16">
                    <div className="absolute inset-0 bg-light-surface dark:bg-dark-elevated rounded-lg"></div>
                    <motion.div 
                      className="absolute inset-0 m-auto w-10 h-10 text-success-600 dark:text-success-400"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ThumbsUp className="w-10 h-10" />
                    </motion.div>
                  </div>
                )}
                
                {index === 4 && (
                  <div className="relative w-20 h-16">
                    <div className="absolute inset-0 bg-light-surface dark:bg-dark-elevated rounded-lg"></div>
                    <div className="absolute top-3 left-3 right-3 h-1 bg-light-tertiary dark:bg-dark-tertiary rounded"></div>
                    <div className="absolute top-6 left-3 right-8 h-1 bg-light-tertiary dark:bg-dark-tertiary rounded"></div>
                    <motion.div 
                      className="absolute bottom-3 right-3 w-6 h-6 text-primary-600 dark:text-primary-400"
                      animate={{ rotate: [-5, 5, -5] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <FileSignature className="w-6 h-6" />
                    </motion.div>
                  </div>
                )}
                
                {index === 5 && (
                  <div className="relative w-20 h-16">
                    <div className="absolute inset-0 bg-success-100 dark:bg-success-900/30 rounded-lg"></div>
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <Banknote className="w-10 h-10 text-success-600 dark:text-success-400" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="#solicitar"
            className="apple-button-primary inline-flex"
          >
            Solicitar ahora
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToApply;