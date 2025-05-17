import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, CreditCard, Calendar, Shield } from 'lucide-react';

interface CardVerificationStepProps {
  formData: {
    cardNumber: string;
    cardExpiry: string;
    cardCVC: string;
    cardHolderName: string;
  };
  updateFormData: (data: Partial<typeof formData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const CardVerificationStep: React.FC<CardVerificationStepProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const [errors, setErrors] = useState<{
    cardNumber?: string;
    cardExpiry?: string;
    cardCVC?: string;
    cardHolderName?: string;
  }>({});
  
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    
    // Validate card number (16 digits)
    if (!formData.cardNumber.trim() || !/^\d{16}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = 'Ingresa un número de tarjeta válido (16 dígitos)';
    }
    
    // Validate expiry date (MM/YY format)
    if (!formData.cardExpiry.trim() || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = 'Ingresa la fecha en formato MM/YY';
    } else {
      // Check if date is not expired
      const [month, year] = formData.cardExpiry.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const now = new Date();
      
      if (expiry < now) {
        newErrors.cardExpiry = 'La tarjeta ha expirado';
      }
    }
    
    // Validate CVC (3-4 digits)
    if (!formData.cardCVC.trim() || !/^\d{3,4}$/.test(formData.cardCVC)) {
      newErrors.cardCVC = 'Ingresa un código de seguridad válido';
    }
    
    // Validate card holder name
    if (!formData.cardHolderName.trim()) {
      newErrors.cardHolderName = 'Ingresa el nombre como aparece en la tarjeta';
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

  // Format card number with spaces (every 4 digits)
  const formatCardNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    const groups = [];
    
    for (let i = 0; i < digits.length; i += 4) {
      groups.push(digits.slice(i, i + 4));
    }
    
    return groups.join(' ');
  };

  // Format expiry date (MM/YY)
  const formatExpiryDate = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    
    if (digits.length <= 2) {
      return digits;
    }
    
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-2">
          Verificación de tarjeta
        </h3>
        <p className="text-light-secondary dark:text-dark-secondary text-sm">
          Esta información solo se utiliza para verificar tu identidad. No se realizarán cargos a tu tarjeta sin tu autorización.
        </p>
      </div>
      
      {/* Card Preview */}
      <div className="mb-8 h-48 relative perspective-800">
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ rotateY: isCardFlipped ? 180 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front of card */}
          <div 
            className="absolute inset-0 rounded-xl p-5 backface-hidden"
            style={{ 
              background: 'linear-gradient(to right, #0077b6, #0a9396)', 
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="flex flex-col h-full text-white">
              <div className="flex justify-between items-start">
                <div className="h-10 w-14 bg-white/20 rounded-md"></div>
                <CreditCard className="w-8 h-8" />
              </div>
              
              <div className="mt-4">
                <div className="flex space-x-2 text-2xl font-mono tracking-wider">
                  <span>{formData.cardNumber.slice(0, 4) || '****'}</span>
                  <span>{formData.cardNumber.slice(4, 8) || '****'}</span>
                  <span>{formData.cardNumber.slice(8, 12) || '****'}</span>
                  <span>{formData.cardNumber.slice(12, 16) || '****'}</span>
                </div>
              </div>
              
              <div className="mt-auto flex justify-between">
                <div>
                  <div className="text-xs opacity-70">Titular</div>
                  <div className="font-medium uppercase tracking-wider">
                    {formData.cardHolderName || 'TU NOMBRE'}
                  </div>
                </div>
                <div>
                  <div className="text-xs opacity-70">Expira</div>
                  <div className="font-medium tracking-wider">
                    {formData.cardExpiry || 'MM/YY'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Back of card */}
          <div 
            className="absolute inset-0 rounded-xl p-5 backface-hidden"
            style={{ 
              background: 'linear-gradient(to right, #0a9396, #0077b6)', 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="flex flex-col h-full text-white">
              <div className="h-10 w-full bg-black/60 mt-4"></div>
              
              <div className="mt-4 flex justify-end">
                <div className="h-10 w-3/4 bg-white/80 flex items-center justify-end pr-4">
                  <span className="text-black font-mono">
                    {formData.cardCVC || 'CVC'}
                  </span>
                </div>
              </div>
              
              <div className="mt-auto flex justify-center">
                <CreditCard className="w-8 h-8" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">
            Número de tarjeta
          </label>
          <div className="relative">
            <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-tertiary dark:text-dark-tertiary" />
            <input
              type="text"
              id="cardNumber"
              value={formatCardNumber(formData.cardNumber)}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, '');
                updateFormData({ cardNumber: digits.slice(0, 16) });
              }}
              className={`glass-input w-full pl-12 ${errors.cardNumber ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
          </div>
          {errors.cardNumber && (
            <p className="mt-1 text-sm text-error-600 dark:text-error-400">{errors.cardNumber}</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="cardExpiry" className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">
              Fecha de expiración
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-tertiary dark:text-dark-tertiary" />
              <input
                type="text"
                id="cardExpiry"
                value={formData.cardExpiry}
                onChange={(e) => {
                  const formatted = formatExpiryDate(e.target.value);
                  updateFormData({ cardExpiry: formatted });
                }}
                onFocus={() => setIsCardFlipped(false)}
                className={`glass-input w-full pl-12 ${errors.cardExpiry ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
            {errors.cardExpiry && (
              <p className="mt-1 text-sm text-error-600 dark:text-error-400">{errors.cardExpiry}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="cardCVC" className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">
              Código de seguridad
            </label>
            <div className="relative">
              <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-tertiary dark:text-dark-tertiary" />
              <input
                type="text"
                id="cardCVC"
                value={formData.cardCVC}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, '');
                  updateFormData({ cardCVC: digits.slice(0, 4) });
                }}
                onFocus={() => setIsCardFlipped(true)}
                onBlur={() => setIsCardFlipped(false)}
                className={`glass-input w-full pl-12 ${errors.cardCVC ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                placeholder="123"
                maxLength={4}
              />
            </div>
            {errors.cardCVC && (
              <p className="mt-1 text-sm text-error-600 dark:text-error-400">{errors.cardCVC}</p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="cardHolderName" className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">
            Nombre del titular
          </label>
          <input
            type="text"
            id="cardHolderName"
            value={formData.cardHolderName}
            onChange={(e) => updateFormData({ cardHolderName: e.target.value })}
            onFocus={() => setIsCardFlipped(false)}
            className={`glass-input w-full ${errors.cardHolderName ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
            placeholder="Como aparece en la tarjeta"
          />
          {errors.cardHolderName && (
            <p className="mt-1 text-sm text-error-600 dark:text-error-400">{errors.cardHolderName}</p>
          )}
        </div>
        
        <div className="text-xs text-light-tertiary dark:text-dark-tertiary mt-2">
          <Shield className="inline-block w-3 h-3 mr-1" />
          Tus datos están seguros. Usamos cifrado SSL de 256 bits.
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

export default CardVerificationStep;