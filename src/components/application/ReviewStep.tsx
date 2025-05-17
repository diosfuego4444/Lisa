import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { formatCurrency } from '../../utils/loanCalculator';

interface ReviewStepProps {
  formData: {
    name: string;
    email: string;
    dni: string;
    phone: string;
    address: string;
    employmentStatus: string;
    monthlyIncome: number;
    hasDependents: boolean;
    otherDebts: number;
    cardNumber: string;
    cardExpiry: string;
    cardCVC: string;
    cardHolderName: string;
  };
  loanAmount: number;
  loanTerm: number;
  monthlyPayment: number;
  interestRate: number;
  prevStep: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const ReviewStep: React.FC<ReviewStepProps> = ({
  formData,
  loanAmount,
  loanTerm,
  monthlyPayment,
  interestRate,
  prevStep,
  onSubmit,
  isSubmitting,
}) => {
  const [isAgreed, setIsAgreed] = React.useState(false);
  
  const getEmploymentStatusText = (status: string): string => {
    switch (status) {
      case 'employed':
        return 'Empleado en relación de dependencia';
      case 'self-employed':
        return 'Autónomo';
      case 'freelance':
        return 'Freelance / Monotributista';
      case 'retired':
        return 'Jubilado / Pensionado';
      case 'other':
        return 'Otro';
      default:
        return status;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isAgreed && !isSubmitting) {
      onSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-6">
        Revisa tu solicitud
      </h3>
      
      <div className="space-y-6">
        {/* Loan details */}
        <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg">
          <h4 className="font-medium text-light-text dark:text-dark-text mb-2">
            Detalles del préstamo
          </h4>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-light-tertiary dark:text-dark-tertiary block">
                Monto solicitado
              </span>
              <span className="text-light-text dark:text-dark-text font-medium">
                {formatCurrency(loanAmount)}
              </span>
            </div>
            
            <div>
              <span className="text-light-tertiary dark:text-dark-tertiary block">
                Plazo
              </span>
              <span className="text-light-text dark:text-dark-text font-medium">
                {loanTerm} {loanTerm === 1 ? 'mes' : 'meses'}
              </span>
            </div>
            
            <div>
              <span className="text-light-tertiary dark:text-dark-tertiary block">
                Cuota mensual
              </span>
              <span className="text-primary-600 dark:text-primary-400 font-medium">
                {formatCurrency(monthlyPayment)}
              </span>
            </div>
            
            <div>
              <span className="text-light-tertiary dark:text-dark-tertiary block">
                Tasa de interés
              </span>
              <span className="text-light-text dark:text-dark-text font-medium">
                {interestRate.toFixed(2)}% anual
              </span>
            </div>
          </div>
        </div>
        
        {/* Personal info */}
        <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg">
          <h4 className="font-medium text-light-text dark:text-dark-text mb-2">
            Información personal
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-light-tertiary dark:text-dark-tertiary block">
                Nombre completo
              </span>
              <span className="text-light-text dark:text-dark-text">
                {formData.name}
              </span>
            </div>
            
            <div>
              <span className="text-light-tertiary dark:text-dark-tertiary block">
                DNI
              </span>
              <span className="text-light-text dark:text-dark-text">
                {formData.dni}
              </span>
            </div>
            
            <div>
              <span className="text-light-tertiary dark:text-dark-tertiary block">
                Email
              </span>
              <span className="text-light-text dark:text-dark-text">
                {formData.email}
              </span>
            </div>
            
            <div>
              <span className="text-light-tertiary dark:text-dark-tertiary block">
                Teléfono
              </span>
              <span className="text-light-text dark:text-dark-text">
                {formData.phone}
              </span>
            </div>
            
            <div className="md:col-span-2">
              <span className="text-light-tertiary dark:text-dark-tertiary block">
                Dirección
              </span>
              <span className="text-light-text dark:text-dark-text">
                {formData.address}
              </span>
            </div>
          </div>
        </div>
        
        {/* Financial info */}
        <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg">
          <h4 className="font-medium text-light-text dark:text-dark-text mb-2">
            Información financiera
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-light-tertiary dark:text-dark-tertiary block">
                Situación laboral
              </span>
              <span className="text-light-text dark:text-dark-text">
                {getEmploymentStatusText(formData.employmentStatus)}
              </span>
            </div>
            
            <div>
              <span className="text-light-tertiary dark:text-dark-tertiary block">
                Ingresos mensuales
              </span>
              <span className="text-light-text dark:text-dark-text">
                {formatCurrency(formData.monthlyIncome)}
              </span>
            </div>
            
            <div>
              <span className="text-light-tertiary dark:text-dark-tertiary block">
                Personas a cargo
              </span>
              <span className="text-light-text dark:text-dark-text">
                {formData.hasDependents ? 'Sí' : 'No'}
              </span>
            </div>
            
            <div>
              <span className="text-light-tertiary dark:text-dark-tertiary block">
                Otras deudas mensuales
              </span>
              <span className="text-light-text dark:text-dark-text">
                {formData.otherDebts ? formatCurrency(formData.otherDebts) : 'No declaradas'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Card info */}
        <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg">
          <h4 className="font-medium text-light-text dark:text-dark-text mb-2">
            Información de tarjeta
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-light-tertiary dark:text-dark-tertiary block">
                Nombre del titular
              </span>
              <span className="text-light-text dark:text-dark-text">
                {formData.cardHolderName}
              </span>
            </div>
            
            <div>
              <span className="text-light-tertiary dark:text-dark-tertiary block">
                Número de tarjeta
              </span>
              <span className="text-light-text dark:text-dark-text">
                **** **** **** {formData.cardNumber.slice(-4)}
              </span>
            </div>
            
            <div>
              <span className="text-light-tertiary dark:text-dark-tertiary block">
                Fecha de expiración
              </span>
              <span className="text-light-text dark:text-dark-text">
                {formData.cardExpiry}
              </span>
            </div>
          </div>
        </div>
        
        {/* Agreement */}
        <div className="mt-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={() => setIsAgreed(!isAgreed)}
              className="mt-1"
            />
            <span className="text-sm text-light-secondary dark:text-dark-secondary">
              He leído y acepto los <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">términos y condiciones</a> y la <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">política de privacidad</a>. Autorizo la verificación de mi información crediticia y el débito de las cuotas en mi tarjeta.
            </span>
          </label>
        </div>
        
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={prevStep}
            disabled={isSubmitting}
            className={`apple-button-secondary flex items-center ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Anterior</span>
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={!isAgreed || isSubmitting}
            className={`apple-button-primary flex items-center ${
              !isAgreed || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                <span>Procesando...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Enviar solicitud</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewStep;