import React from 'react';
import { motion } from 'framer-motion';
import { requirementsData } from '../../data/requirementsData';
import { User, FileText, DollarSign, Briefcase, Building, CreditCard } from 'lucide-react';

const icons = {
  User: <User className="w-6 h-6" />,
  FileText: <FileText className="w-6 h-6" />,
  DollarSign: <DollarSign className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  Building: <Building className="w-6 h-6" />,
  CreditCard: <CreditCard className="w-6 h-6" />,
};

const Requirements: React.FC = () => {
  return (
    <section id="requisitos" className="py-24 px-4 bg-light-surface dark:bg-dark-surface">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
            ¿Qué necesitas para <span className="text-primary-600 dark:text-primary-400">aplicar</span>?
          </h2>
          <p className="text-light-secondary dark:text-dark-secondary max-w-2xl mx-auto">
            Solicitamos requisitos mínimos para que puedas obtener tu préstamo 
            de manera rápida y sin complicaciones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {requirementsData.map((requirement, index) => (
            <motion.div
              key={requirement.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-panel p-6"
            >
              <div className="mb-4">
                <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  {
                    requirement.icon in icons
                      ? icons[requirement.icon as keyof typeof icons]
                      : <div className="w-6 h-6" />
                  }
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-3">
                {requirement.title}
              </h3>
              
              <p className="text-light-secondary dark:text-dark-secondary">
                {requirement.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 p-6 glass-panel max-w-3xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
              <div className="w-full aspect-square bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-primary-600 dark:bg-primary-500 text-white rounded-full">
                    <span className="text-2xl font-bold">?</span>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
                Verificador de elegibilidad
              </h3>
              
              <p className="text-light-secondary dark:text-dark-secondary mb-4">
                ¿No estás seguro si calificas? Utiliza nuestro verificador rápido 
                para saber si eres elegible para un préstamo personal.
              </p>
              
              <div className="mt-4">
                <a
                  href="#verificador"
                  className="apple-button-primary inline-flex"
                >
                  Verificar elegibilidad
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Requirements;