import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency, formatPercentage } from '../../utils/loanCalculator';
import { useLoan } from '../../context/LoanContext';
import AmountSlider from './AmountSlider';
import TermSlider from './TermSlider';
import LoanDetails from './LoanDetails';
import PaymentCalendar from './PaymentCalendar';
import InterestGraph from './InterestGraph';

const LoanSimulator: React.FC = () => {
  const { loanAmount, loanTerm, simulation, setLoanAmount, setLoanTerm } = useLoan();

  return (
    <section id="simulador" className="py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
            Simula tu <span className="text-primary-600 dark:text-primary-400">préstamo personal</span>
          </h2>
          <p className="text-light-secondary dark:text-dark-secondary max-w-2xl mx-auto">
            Ajusta el monto y plazo según tus necesidades para ver cuánto pagarías mensualmente.
            Obtén todos los detalles de tu préstamo al instante.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sliders and primary info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="glass-panel p-6 h-full">
              <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-6">
                Configura tu préstamo
              </h3>

              {/* Amount slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-light-secondary dark:text-dark-secondary">Monto del préstamo</span>
                  <span className="text-xl font-semibold text-light-text dark:text-dark-text">
                    {formatCurrency(loanAmount)}
                  </span>
                </div>
                <AmountSlider 
                  value={loanAmount} 
                  onChange={setLoanAmount} 
                  min={10000} 
                  max={2500000} 
                  step={10000}
                />
                <div className="flex justify-between text-xs text-light-tertiary dark:text-dark-tertiary mt-1">
                  <span>$10.000</span>
                  <span>$2.500.000</span>
                </div>
              </div>

              {/* Term slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-light-secondary dark:text-dark-secondary">Plazo de devolución</span>
                  <span className="text-xl font-semibold text-light-text dark:text-dark-text">
                    {loanTerm} {loanTerm === 1 ? 'mes' : 'meses'}
                  </span>
                </div>
                <TermSlider 
                  value={loanTerm} 
                  onChange={setLoanTerm} 
                  min={1} 
                  max={60} 
                  step={1} 
                />
                <div className="flex justify-between text-xs text-light-tertiary dark:text-dark-tertiary mt-1">
                  <span>1 mes</span>
                  <span>60 meses</span>
                </div>
              </div>

              {/* Summary */}
              {simulation && (
                <div className="p-5 rounded-xl bg-light-surface/70 dark:bg-dark-surface/70">
                  <h4 className="text-lg font-semibold text-light-text dark:text-dark-text mb-3">
                    Resumen de tu préstamo
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-light-secondary dark:text-dark-secondary">Cuota mensual</span>
                      <span className="font-semibold text-light-text dark:text-dark-text">
                        {formatCurrency(simulation.monthlyPayment)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-light-secondary dark:text-dark-secondary">Tasa de interés</span>
                      <span className="font-semibold text-light-text dark:text-dark-text">
                        {formatPercentage(simulation.interestRate)} anual
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-light-secondary dark:text-dark-secondary">Total a devolver</span>
                      <span className="font-semibold text-light-text dark:text-dark-text">
                        {formatCurrency(simulation.totalPayment)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <a
                      href="#solicitar"
                      className="apple-button-primary w-full"
                    >
                      Solicitar este préstamo
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Loan details and graphs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              {/* Interest breakdown graph */}
              {simulation && (
                <div className="glass-panel p-6">
                  <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">
                    Distribución de capital e interés
                  </h3>
                  <InterestGraph 
                    principal={simulation.amount}
                    interest={simulation.totalInterest}
                  />
                </div>
              )}

              {/* Detailed loan information */}
              {simulation && (
                <div className="glass-panel p-6">
                  <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">
                    Detalles del préstamo
                  </h3>
                  <LoanDetails simulation={simulation} />
                </div>
              )}

              {/* Payment calendar */}
              {simulation && (
                <div className="glass-panel p-6 md:col-span-2">
                  <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">
                    Calendario de pagos
                  </h3>
                  <PaymentCalendar payments={simulation.payments} />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LoanSimulator;