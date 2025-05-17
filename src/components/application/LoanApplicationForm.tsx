import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, Loader2, X } from 'lucide-react';
import { useLoan } from '../../context/LoanContext';
import { submitLoanApplication } from '../../services/api';
import { LoanApplication } from '../../types';
import { formatCurrency } from '../../utils/loanCalculator';

// Step components
import PersonalInfoStep from './PersonalInfoStep';
import FinancialInfoStep from './FinancialInfoStep';
import CardVerificationStep from './CardVerificationStep';
import ReviewStep from './ReviewStep';

const LoanApplicationForm: React.FC = () => {
  const { loanAmount, loanTerm, simulation } = useLoan();
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    // Personal info
    name: '',
    email: '',
    dni: '',
    phone: '',
    address: '',
    
    // Financial info
    employmentStatus: '',
    monthlyIncome: 0,
    hasDependents: false,
    otherDebts: 0,
    
    // Card info
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardHolderName: '',
  });
  
  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };
  
  const toggleForm = () => {
    setIsVisible(!isVisible);
  };
  
  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };
  
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };
  
  const handleSubmit = async () => {
    if (!simulation) return;
    
    setIsSubmitting(true);
    
    try {
      const applicationData: Omit<LoanApplication, 'id' | 'status' | 'createdAt'> = {
        amount: loanAmount,
        term: loanTerm,
        monthlyPayment: simulation.monthlyPayment,
        interestRate: simulation.interestRate,
        totalInterest: simulation.totalInterest,
        totalPayment: simulation.totalPayment,
        startDate: new Date(),
        personalInfo: {
          name: formData.name,
          email: formData.email,
          dni: formData.dni,
          phone: formData.phone,
          address: formData.address,
        },
        financialInfo: {
          employmentStatus: formData.employmentStatus,
          monthlyIncome: formData.monthlyIncome,
          hasDependents: formData.hasDependents,
          otherDebts: formData.otherDebts,
        },
        cardInfo: {
          cardNumber: formData.cardNumber,
          cardExpiry: formData.cardExpiry,
          cardCVC: formData.cardCVC,
          cardHolderName: formData.cardHolderName,
        },
      };
      
      await submitLoanApplication(applicationData);
      setIsSuccess(true);
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      dni: '',
      phone: '',
      address: '',
      employmentStatus: '',
      monthlyIncome: 0,
      hasDependents: false,
      otherDebts: 0,
      cardNumber: '',
      cardExpiry: '',
      cardCVC: '',
      cardHolderName: '',
    });
    setCurrentStep(1);
    setIsSuccess(false);
    setIsVisible(false);
  };
  
  // Render different content based on visibility state
  const renderContent = () => {
    if (!isVisible) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-panel p-8">
            <h2 className="text-3xl font-bold text-light-text dark:text-dark-text mb-6">
              Solicitar préstamo
            </h2>
            
            <div className="mb-8 space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-success-600 dark:text-success-400 mt-0.5 flex-shrink-0" />
                <p className="text-light-secondary dark:text-dark-secondary">
                  Proceso 100% online. Obtén tu dinero en 24 horas hábiles.
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-success-600 dark:text-success-400 mt-0.5 flex-shrink-0" />
                <p className="text-light-secondary dark:text-dark-secondary">
                  Mínimos requisitos. Solo necesitas DNI y una tarjeta a tu nombre.
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-success-600 dark:text-success-400 mt-0.5 flex-shrink-0" />
                <p className="text-light-secondary dark:text-dark-secondary">
                  Formulario sencillo de 4 pasos con respuesta inmediata.
                </p>
              </div>
            </div>
            
            {simulation ? (
              <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-xl mb-8">
                <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">
                  Resumen de tu préstamo
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-light-tertiary dark:text-dark-tertiary text-sm">Monto solicitado</span>
                    <p className="text-xl font-semibold text-light-text dark:text-dark-text">
                      {formatCurrency(simulation.amount)}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-light-tertiary dark:text-dark-tertiary text-sm">Plazo</span>
                    <p className="text-xl font-semibold text-light-text dark:text-dark-text">
                      {simulation.term} {simulation.term === 1 ? 'mes' : 'meses'}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-light-tertiary dark:text-dark-tertiary text-sm">Cuota mensual</span>
                    <p className="text-xl font-semibold text-primary-600 dark:text-primary-400">
                      {formatCurrency(simulation.monthlyPayment)}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-light-tertiary dark:text-dark-tertiary text-sm">Tasa de interés</span>
                    <p className="text-xl font-semibold text-light-text dark:text-dark-text">
                      {simulation.interestRate.toFixed(2)}% anual
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-warning-100 dark:bg-warning-900/30 p-4 rounded-lg text-warning-800 dark:text-warning-300 mb-8">
                <p>Por favor, simula tu préstamo primero para continuar.</p>
              </div>
            )}
            
            <div className="flex justify-center">
              <button
                onClick={toggleForm}
                disabled={!simulation}
                className={`apple-button-primary flex items-center space-x-2 ${
                  !simulation ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span>Comenzar solicitud</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      );
    }
    
    if (isSuccess) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
        >
          <div className="glass-panel p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto scrollbar-hide">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-success-600 dark:text-success-400" />
              </div>
              
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
                ¡Solicitud enviada con éxito!
              </h2>
              
              <p className="text-light-secondary dark:text-dark-secondary">
                Hemos recibido tu solicitud de préstamo. En breve recibirás un correo electrónico 
                de confirmación. Nuestro equipo evaluará tu solicitud y te contactará en las próximas 24 horas.
              </p>
            </div>
            
            <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg mb-6">
              <div className="mb-3">
                <span className="text-light-tertiary dark:text-dark-tertiary text-sm">Número de solicitud</span>
                <p className="font-medium text-light-text dark:text-dark-text">
                  LP-{Math.floor(100000 + Math.random() * 900000)}
                </p>
              </div>
              
              <div>
                <span className="text-light-tertiary dark:text-dark-tertiary text-sm">Monto solicitado</span>
                <p className="font-medium text-light-text dark:text-dark-text">
                  {simulation ? formatCurrency(simulation.amount) : ''}
                </p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={resetForm}
                className="apple-button-primary"
              >
                Finalizar
              </button>
            </div>
          </div>
        </motion.div>
      );
    }
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
      >
        <div className="glass-panel p-6 md:p-8 max-w-2xl w-full mx-4 relative max-h-[90vh] overflow-y-auto scrollbar-hide">
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-light-tertiary dark:text-dark-tertiary hover:text-light-text dark:hover:text-dark-text transition-colors"
            onClick={toggleForm}
            disabled={isSubmitting}
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
              Solicitud de préstamo
            </h2>
            
            <p className="text-light-secondary dark:text-dark-secondary">
              Completa el formulario para obtener tu préstamo de {simulation ? formatCurrency(simulation.amount) : ''} en {loanTerm} {loanTerm === 1 ? 'mes' : 'meses'}.
            </p>
          </div>
          
          {/* Progress steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep === i
                          ? 'bg-primary-600 text-white'
                          : currentStep > i
                          ? 'bg-success-600 text-white'
                          : 'bg-light-surface dark:bg-dark-surface text-light-tertiary dark:text-dark-tertiary'
                      }`}
                    >
                      {currentStep > i ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        i
                      )}
                    </div>
                    <span className={`text-xs mt-1 ${
                      currentStep === i
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-light-tertiary dark:text-dark-tertiary'
                    }`}>
                      {i === 1 ? 'Datos personales' : i === 2 ? 'Datos financieros' : i === 3 ? 'Verificación' : 'Revisión'}
                    </span>
                  </div>
                  
                  {i < 4 && (
                    <div className={`flex-1 h-1 mx-2 rounded-full ${
                      currentStep > i
                        ? 'bg-success-600'
                        : 'bg-light-surface dark:bg-dark-surface'
                    }`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          {/* Step content */}
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <PersonalInfoStep 
                formData={formData} 
                updateFormData={updateFormData} 
                nextStep={nextStep}
              />
            )}
            
            {currentStep === 2 && (
              <FinancialInfoStep 
                formData={formData} 
                updateFormData={updateFormData} 
                nextStep={nextStep} 
                prevStep={prevStep}
              />
            )}
            
            {currentStep === 3 && (
              <CardVerificationStep 
                formData={formData} 
                updateFormData={updateFormData} 
                nextStep={nextStep} 
                prevStep={prevStep}
              />
            )}
            
            {currentStep === 4 && (
              <ReviewStep 
                formData={formData} 
                loanAmount={loanAmount}
                loanTerm={loanTerm}
                monthlyPayment={simulation?.monthlyPayment || 0}
                interestRate={simulation?.interestRate || 0}
                prevStep={prevStep}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="solicitar" className="py-24 px-4">
      <div className="container mx-auto">
        {renderContent()}
      </div>
    </section>
  );
};

export default LoanApplicationForm;