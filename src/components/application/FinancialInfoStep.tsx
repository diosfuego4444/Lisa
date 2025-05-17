import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { formatCurrency } from '../../utils/loanCalculator';

interface FinancialInfoStepProps {
  formData: {
    employmentStatus: string;
    monthlyIncome: number;
    hasDependents: boolean;
    otherDebts: number;
  };
  updateFormData: (data: Partial<typeof formData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const FinancialInfoStep: React.FC<FinancialInfoStepProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const [errors, setErrors] = React.useState<{
    employmentStatus?: string;
    monthlyIncome?: string;
    otherDebts?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    
    if (!formData.employmentStatus) {
      newErrors.employmentStatus = 'Selecciona tu situación laboral';
    }
    
    if (!formData.monthlyIncome || formData.monthlyIncome < 150000) {
      newErrors.monthlyIncome = 'El ingreso mínimo debe ser de $150.000';
    }
    
    if (formData.otherDebts < 0) {
      newErrors.otherDebts = 'El valor debe ser positivo';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      nextStep();
    }
  };

  // Convert number to formatted currency for display
  const formatCurrencyInput = (value: number): string => {
    if (value === 0) return '';
    return formatCurrency(value).replace('$', '');
  };

  // Parse currency string to number for storage
  const parseCurrencyInput = (value: string): number => {
    return parseInt(value.replace(/\D/g, '') || '0', 10);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="employmentStatus" className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">
            Situación laboral
          </label>
          <select
            id="employmentStatus"
            value={formData.employmentStatus}
            onChange={(e) => updateFormData({ employmentStatus: e.target.value })}
            className={`glass-input w-full ${errors.employmentStatus ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
          >
            <option value="">Seleccionar...</option>
            <option value="employed">Empleado en relación de dependencia</option>
            <option value="self-employed">Autónomo</option>
            <option value="freelance">Freelance / Monotributista</option>
            <option value="retired">Jubilado / Pensionado</option>
            <option value="other">Otro</option>
          </select>
          {errors.employmentStatus && (
            <p className="mt-1 text-sm text-error-600 dark:text-error-400">{errors.employmentStatus}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="monthlyIncome" className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">
            Ingresos mensuales
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-light-tertiary dark:text-dark-tertiary">
              $
            </span>
            <input
              type="text"
              id="monthlyIncome"
              value={formatCurrencyInput(formData.monthlyIncome)}
              onChange={(e) => updateFormData({ 
                monthlyIncome: parseCurrencyInput(e.target.value)
              })}
              className={`glass-input w-full pl-8 ${errors.monthlyIncome ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
              placeholder="Ej. 150.000"
            />
          </div>
          {errors.monthlyIncome && (
            <p className="mt-1 text-sm text-error-600 dark:text-error-400">{errors.monthlyIncome}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">
            ¿Tienes personas a cargo?
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={formData.hasDependents === true}
                onChange={() => updateFormData({ hasDependents: true })}
                className="mr-2"
              />
              <span className="text-light-text dark:text-dark-text">Sí</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={formData.hasDependents === false}
                onChange={() => updateFormData({ hasDependents: false })}
                className="mr-2"
              />
              <span className="text-light-text dark:text-dark-text">No</span>
            </label>
          </div>
        </div>
        
        <div>
          <label htmlFor="otherDebts" className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">
            Otras deudas mensuales (opcional)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-light-tertiary dark:text-dark-tertiary">
              $
            </span>
            <input
              type="text"
              id="otherDebts"
              value={formatCurrencyInput(formData.otherDebts)}
              onChange={(e) => updateFormData({ 
                otherDebts: parseCurrencyInput(e.target.value)
              })}
              className={`glass-input w-full pl-8 ${errors.otherDebts ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
              placeholder="Ej. 50.000"
            />
          </div>
          {errors.otherDebts && (
            <p className="mt-1 text-sm text-error-600 dark:text-error-400">{errors.otherDebts}</p>
          )}
        </div>
        
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={prevStep}
            className="apple-button-secondary flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Anterior</span>
          </button>
          
          <button
            type="submit"
            className="apple-button-primary flex items-center"
          >
            <span>Siguiente</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default FinancialInfoStep;