import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-light-background dark:from-primary-950/40 dark:to-dark-background z-0"></div>
      
      {/* Floating elements (decorative) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-primary-200/30 dark:bg-primary-800/10 backdrop-blur-md"
          animate={{ y: [0, 20, 0], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-[15%] w-48 h-48 rounded-full bg-accent-200/20 dark:bg-accent-800/10 backdrop-blur-md"
          animate={{ y: [0, -30, 0], rotate: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-[30%] left-[25%] w-32 h-32 rounded-full bg-secondary-200/20 dark:bg-secondary-800/10 backdrop-blur-md"
          animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
        />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-light-text dark:text-dark-text mb-6 leading-tight">
              Préstamos personales <span className="text-primary-600 dark:text-primary-400">rápidos y simples</span>
            </h1>
            
            <p className="text-xl text-light-secondary dark:text-dark-secondary mb-8 leading-relaxed">
              Obtén desde $10.000 hasta $2.500.000 en minutos con mínimos requisitos. 
              Plazos de devolución de hasta 60 meses adaptados a tus necesidades.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-success-600 dark:text-success-400 mt-0.5 flex-shrink-0" />
                <p className="text-light-text dark:text-dark-text">100% online, sin papeleos ni visitas a sucursales</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-success-600 dark:text-success-400 mt-0.5 flex-shrink-0" />
                <p className="text-light-text dark:text-dark-text">Respuesta en menos de 10 minutos</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-success-600 dark:text-success-400 mt-0.5 flex-shrink-0" />
                <p className="text-light-text dark:text-dark-text">Sin gastos ocultos, total transparencia</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#simulador"
                className="apple-button-primary flex items-center justify-center"
              >
                <span>Simular préstamo</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              
              <a
                href="#como-solicitar"
                className="apple-button-secondary"
              >
                Cómo funciona
              </a>
            </div>
          </motion.div>
          
          {/* Image/card visualization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Main card */}
              <motion.div
                className="glass-panel p-8 max-w-md"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              >
                <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">
                  Préstamo recomendado
                </h3>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-light-secondary dark:text-dark-secondary">Monto</span>
                    <span className="text-xl font-semibold text-light-text dark:text-dark-text">$500.000</span>
                  </div>
                  
                  <div className="w-full h-2 bg-light-surface dark:bg-dark-surface rounded-full overflow-hidden">
                    <div className="h-full w-1/5 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-light-secondary dark:text-dark-secondary">Plazo</span>
                    <span className="text-xl font-semibold text-light-text dark:text-dark-text">12 meses</span>
                  </div>
                  
                  <div className="w-full h-2 bg-light-surface dark:bg-dark-surface rounded-full overflow-hidden">
                    <div className="h-full w-1/5 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
                  </div>
                </div>
                
                <div className="mb-8 p-4 rounded-xl bg-light-surface/80 dark:bg-dark-surface/80">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-light-secondary dark:text-dark-secondary">Cuota mensual</span>
                    <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">$61.250</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-light-tertiary dark:text-dark-tertiary">Tasa anual</span>
                      <p className="text-light-text dark:text-dark-text font-medium">47%</p>
                    </div>
                    
                    <div>
                      <span className="text-light-tertiary dark:text-dark-tertiary">Total a devolver</span>
                      <p className="text-light-text dark:text-dark-text font-medium">$735.000</p>
                    </div>
                  </div>
                </div>
                
                <a
                  href="#solicitar"
                  className="apple-button-primary w-full flex items-center justify-center"
                >
                  <span>Solicitar ahora</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </motion.div>
              
              {/* Decoration card 1 */}
              <motion.div
                className="absolute -left-8 -bottom-8 w-32 h-24 glass-panel p-4 hidden sm:block"
                animate={{ y: [0, 5, 0], x: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              >
                <span className="text-light-tertiary dark:text-dark-tertiary text-xs">Tasa desde</span>
                <p className="text-light-text dark:text-dark-text text-lg font-semibold">30% anual</p>
              </motion.div>
              
              {/* Decoration card 2 */}
              <motion.div
                className="absolute -right-6 -top-6 w-36 h-24 glass-panel p-4 hidden sm:block"
                animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
              >
                <span className="text-light-tertiary dark:text-dark-tertiary text-xs">Aprobación</span>
                <p className="text-light-text dark:text-dark-text text-lg font-semibold">En minutos</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;