import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CreditCard, TrendingUp, DollarSign } from 'lucide-react';
import { LoanSimulation } from '../../types';
import { formatCurrency, formatPercentage, formatDate } from '../../utils/loanCalculator';

interface LoanDetailsProps {
  simulation: LoanSimulation;
}

const LoanDetails: React.FC<LoanDetailsProps> = ({ simulation }) => {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + simulation.term);
  
  const detailItems = [
    {
      icon: <DollarSign className="w-5 h-5 text-primary-600 dark:text-primary-400" />,
      label: 'Monto solicitado',
      value: formatCurrency(simulation.amount),
    },
    {
      icon: <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />,
      label: 'Plazo',
      value: `${simulation.term} ${simulation.term === 1 ? 'mes' : 'meses'}`,
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />,
      label: 'Tasa de interés',
      value: formatPercentage(simulation.interestRate) + ' anual',
    },
    {
      icon: <CreditCard className="w-5 h-5 text-primary-600 dark:text-primary-400" />,
      label: 'Cuota mensual',
      value: formatCurrency(simulation.monthlyPayment),
    },
    {
      icon: <DollarSign className="w-5 h-5 text-primary-600 dark:text-primary-400" />,
      label: 'Total intereses',
      value: formatCurrency(simulation.totalInterest),
    },
    {
      icon: <DollarSign className="w-5 h-5 text-primary-600 dark:text-primary-400" />,
      label: 'Total a pagar',
      value: formatCurrency(simulation.totalPayment),
    },
    {
      icon: <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />,
      label: 'Fecha primer pago',
      value: formatDate(startDate.setMonth(startDate.getMonth() + 1)),
    },
    {
      icon: <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />,
      label: 'Fecha último pago',
      value: formatDate(endDate),
    },
  ];

  return (
    <div className="space-y-4">
      {detailItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-light-surface/70 dark:hover:bg-dark-surface/70 transition-colors"
        >
          <div className="p-2 rounded-full bg-primary-100/50 dark:bg-primary-900/30">
            {item.icon}
          </div>
          <div>
            <span className="text-sm text-light-tertiary dark:text-dark-tertiary block">
              {item.label}
            </span>
            <span className="font-semibold text-light-text dark:text-dark-text">
              {item.value}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default LoanDetails;