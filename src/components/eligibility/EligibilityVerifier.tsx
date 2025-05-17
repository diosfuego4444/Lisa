import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { checkEligibility } from '../../services/api';

const EligibilityVerifier: React.FC = () => {
  const [step, setStep] = useState(1);
  const [dni, setDni] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    isEligible: boolean;
    reason?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await checkEligibility(
        dni,
        Number(monthlyIncome),
        Number(loanAmount)
      );
      
      setResult(response);
    } catch (error) {
      console.error('Error al verificar elegibilidad:', error);
      setResult({
        isEligible: false,
        reason: 'Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setDni('');
    setMonthlyIncome('');
    setLoanAmount('');
    setResult(null);
    setStep(1);
  };

  const formatCurrency = (value: string): string => {
    const numericValue = value.replace(/\D/g, '');
    
    if (!numericValue) return '';
    
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(Number(numericValue));
  };

  const handleMonthlyIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setMonthlyIncome(value);
  };

  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setLoanAmount(value);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <section id="verificador" className="py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
            Verificador de <span className="text-primary-600 dark:text-primary-400">elegibilidad</span>
          </h2>
          <p className="text-light-secondary dark:text-dark-secondary max-w-2xl mx-auto">
            Completa el formulario a continuación para verificar si calificas para un préstamo personal.
            Esta verificación no afecta tu historial crediticio.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <div className="glass-panel p-6 md:p-8">
            {!result ? (
              <form onSubmit={handleSubmit}>
                {/* Progress steps */}
                <div className="mb-8">
                  <div className="flex justify-between items-center">
                    {[1, 2, 3].map((i) => (
                      <React.Fragment key={i}>
                        <div className="flex flex-col items-center">
                          <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              step === i
                                ? 'bg-primary-600 text-white'
                                : step > i
                                ? 'bg-success-600 text-white'
                                : 'bg-light-surface dark:bg-dark-surface text-light-tertiary dark:text-dark-tertiary'
                            }`}
                          >
                            {step > i ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              i
                            )}
                          </div>
                          <span className={`text-xs mt-1 ${
                            step === i
                              ? 'text-primary-600 dark:text-primary-400'
                              : 'text-light-tertiary dark:text-dark-tertiary'
                          }`}>
                            {i === 1 ? 'Identidad' : i === 2 ? 'Ingresos' : 'Préstamo'}
                          </span>
                        </div>
                        
                        {i < 3 && (
                          <div className={`flex-1 h-1 mx-2 rounded-full ${
                            step > i
                              ? 'bg-success-600'
                              : 'bg-light-surface dark:bg-dark-surface'
                          }`}></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">
                        Información de identidad
                      </h3>
                      
                      <div className="mb-6">
                        <label htmlFor="dni" className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">
                          DNI
                        </label>
                        <input
                          type="text"
                          id="dni"
                          value={dni}
                          onChange={(e) => setDni(e.target.value.replace(/\D/g, ''))}
                          className="glass-input w-full"
                          placeholder="Ej. 30123456"
                          maxLength={8}
                          required
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={handleNextStep}
                          disabled={dni.length < 7}
                          className={`apple-button-primary ${
                            dni.length < 7 ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          Siguiente
                        </button>
                      </div>
                    </motion.div>
                  )}
                  
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">
                        Información de ingresos
                      </h3>
                      
                      <div className="mb-6">
                        <label htmlFor="monthlyIncome" className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">
                          Ingresos mensuales
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="monthlyIncome"
                            value={monthlyIncome ? formatCurrency(monthlyIncome) : ''}
                            onChange={handleMonthlyIncomeChange}
                            className="glass-input w-full"
                            placeholder="Ej. $150.000"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="apple-button-secondary"
                        >
                          Anterior
                        </button>
                        
                        <button
                          type="button"
                          onClick={handleNextStep}
                          disabled={!monthlyIncome}
                          className={`apple-button-primary ${
                            !monthlyIncome ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          Siguiente
                        </button>
                      </div>
                    </motion.div>
                  )}
                  
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">
                        Información del préstamo
                      </h3>
                      
                      <div className="mb-6">
                        <label htmlFor="loanAmount" className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">
                          Monto solicitado
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="loanAmount"
                            value={loanAmount ? formatCurrency(loanAmount) : ''}
                            onChange={handleLoanAmountChange}
                            className="glass-input w-full"
                            placeholder="Ej. $100.000"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="apple-button-secondary"
                        >
                          Anterior
                        </button>
                        
                        <button
                          type="submit"
                          disabled={isLoading || !loanAmount}
                          className={`apple-button-primary ${
                            isLoading || !loanAmount ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {isLoading ? (
                            <span className="flex items-center">
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Verificando...
                            </span>
                          ) : (
                            'Verificar elegibilidad'
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8"
              >
                <div className="mb-6">
                  {result.isEligible ? (
                    <div className="w-20 h-20 mx-auto rounded-full bg-success-100 dark:bg-success-900/30 flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-success-600 dark:text-success-400" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 mx-auto rounded-full bg-error-100 dark:bg-error-900/30 flex items-center justify-center">
                      <XCircle className="w-10 h-10 text-error-600 dark:text-error-400" />
                    </div>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
                  {result.isEligible ? '¡Felicitaciones! Eres elegible' : 'Lo sentimos'}
                </h3>
                
                <p className="text-light-secondary dark:text-dark-secondary mb-6">
                  {result.isEligible 
                    ? 'Basado en la información proporcionada, calificas para solicitar un préstamo personal. Procede a completar la solicitud para obtener tu dinero en 24 horas.'
                    : result.reason || 'No calificas para un préstamo en este momento. Revisa los requisitos e intenta nuevamente más adelante.'}
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={resetForm}
                    className="apple-button-secondary"
                  >
                    Verificar de nuevo
                  </button>
                  
                  {result.isEligible && (
                    <a
                      href="#solicitar"
                      className="apple-button-primary"
                    >
                      Solicitar préstamo
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EligibilityVerifier;