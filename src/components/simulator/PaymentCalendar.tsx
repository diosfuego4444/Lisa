import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Payment } from '../../types';
import { formatCurrency, formatDate } from '../../utils/loanCalculator';

interface PaymentCalendarProps {
  payments: Payment[];
}

const PAYMENTS_PER_PAGE = 5;

const PaymentCalendar: React.FC<PaymentCalendarProps> = ({ payments }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  
  const totalPages = Math.ceil(payments.length / PAYMENTS_PER_PAGE);
  const currentPayments = payments.slice(
    currentPage * PAYMENTS_PER_PAGE,
    (currentPage + 1) * PAYMENTS_PER_PAGE
  );
  
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
    setSelectedPayment(null);
  };
  
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
    setSelectedPayment(null);
  };
  
  return (
    <div>
      {/* Mobile view */}
      <div className="md:hidden">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={`p-2 rounded-full ${
              currentPage === 0
                ? 'text-light-tertiary dark:text-dark-tertiary'
                : 'text-light-text dark:text-dark-text hover:bg-light-surface dark:hover:bg-dark-surface'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <span className="text-light-secondary dark:text-dark-secondary">
            Página {currentPage + 1} de {totalPages}
          </span>
          
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            className={`p-2 rounded-full ${
              currentPage === totalPages - 1
                ? 'text-light-tertiary dark:text-dark-tertiary'
                : 'text-light-text dark:text-dark-text hover:bg-light-surface dark:hover:bg-dark-surface'
            }`}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          {currentPayments.map((payment) => (
            <motion.div
              key={payment.number}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-xl ${
                selectedPayment?.number === payment.number
                  ? 'bg-primary-50 dark:bg-primary-900/20'
                  : 'bg-light-surface dark:bg-dark-surface'
              } cursor-pointer`}
              onClick={() => setSelectedPayment(selectedPayment?.number === payment.number ? null : payment)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-light-secondary dark:text-dark-secondary">
                    Cuota {payment.number}
                  </div>
                  <div className="font-medium">
                    {formatDate(payment.date)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-light-secondary dark:text-dark-secondary">
                    Pago mensual
                  </div>
                  <div className="font-semibold text-primary-600 dark:text-primary-400">
                    {formatCurrency(payment.total)}
                  </div>
                </div>
              </div>
              
              <AnimatePresence>
                {selectedPayment?.number === payment.number && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-light-surface dark:border-dark-elevated"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-light-tertiary dark:text-dark-tertiary">
                          Capital
                        </div>
                        <div className="text-light-text dark:text-dark-text">
                          {formatCurrency(payment.principal)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-light-tertiary dark:text-dark-tertiary">
                          Interés
                        </div>
                        <div className="text-light-text dark:text-dark-text">
                          {formatCurrency(payment.interest)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-light-tertiary dark:text-dark-tertiary">
                          Saldo pendiente
                        </div>
                        <div className="text-light-text dark:text-dark-text">
                          {formatCurrency(payment.balance)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Desktop view */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-light-surface dark:bg-dark-surface">
                <th className="px-6 py-3 text-left text-xs font-medium text-light-tertiary dark:text-dark-tertiary uppercase tracking-wider">
                  Cuota
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-tertiary dark:text-dark-tertiary uppercase tracking-wider">
                  Fecha de pago
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-tertiary dark:text-dark-tertiary uppercase tracking-wider">
                  Capital
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-tertiary dark:text-dark-tertiary uppercase tracking-wider">
                  Interés
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-tertiary dark:text-dark-tertiary uppercase tracking-wider">
                  Pago mensual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-tertiary dark:text-dark-tertiary uppercase tracking-wider">
                  Saldo pendiente
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-surface dark:divide-dark-surface">
              {currentPayments.map((payment, index) => (
                <motion.tr
                  key={payment.number}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-light-surface dark:hover:bg-dark-surface"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-light-text dark:text-dark-text">
                    {payment.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-light-secondary dark:text-dark-secondary">
                    {formatDate(payment.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text dark:text-dark-text">
                    {formatCurrency(payment.principal)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text dark:text-dark-text">
                    {formatCurrency(payment.interest)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary-600 dark:text-primary-400">
                    {formatCurrency(payment.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text dark:text-dark-text">
                    {formatCurrency(payment.balance)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg ${
              currentPage === 0
                ? 'text-light-tertiary dark:text-dark-tertiary'
                : 'text-light-text dark:text-dark-text hover:bg-light-surface dark:hover:bg-dark-surface'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>
          
          <span className="text-light-secondary dark:text-dark-secondary">
            Página {currentPage + 1} de {totalPages}
          </span>
          
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg ${
              currentPage === totalPages - 1
                ? 'text-light-tertiary dark:text-dark-tertiary'
                : 'text-light-text dark:text-dark-text hover:bg-light-surface dark:hover:bg-dark-surface'
            }`}
          >
            <span>Siguiente</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCalendar;