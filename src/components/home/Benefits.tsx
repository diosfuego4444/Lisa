import React from 'react';
import { motion } from 'framer-motion';
import { benefitsData } from '../../data/benefitsData';
import { Laptop, Clock, Search, FileText, Wallet, MessagesSquare } from 'lucide-react';

const icons = {
  Laptop: <Laptop className="w-6 h-6" />,
  Clock: <Clock className="w-6 h-6" />,
  Search: <Search className="w-6 h-6" />,
  FileText: <FileText className="w-6 h-6" />,
  Wallet: <Wallet className="w-6 h-6" />,
  MessagesSquare: <MessagesSquare className="w-6 h-6" />,
};

const Benefits: React.FC = () => {
  return (
    <section id="beneficios" className="py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
            Beneficios de nuestra <span className="text-primary-600 dark:text-primary-400">plataforma</span>
          </h2>
          <p className="text-light-secondary dark:text-dark-secondary max-w-2xl mx-auto">
            Descubre por qué miles de argentinos eligen nuestra plataforma para 
            obtener préstamos personales rápidos y seguros.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitsData.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-panel p-6 hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="mb-4">
                <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300">
                  {
                    benefit.icon in icons
                      ? icons[benefit.icon as keyof typeof icons]
                      : <div className="w-6 h-6" />
                  }
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                {benefit.title}
              </h3>
              
              <p className="text-light-secondary dark:text-dark-secondary">
                {benefit.description}
              </p>
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
            href="#simulador"
            className="apple-button-primary inline-flex"
          >
            Simular mi préstamo
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;