import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface PersonalInfoStepProps {
  formData: {
    name: string;
    email: string;
    dni: string;
    phone: string;
    address: string;
  };
  updateFormData: (data: Partial<typeof formData>) => void;
  nextStep: () => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  formData,
  updateFormData,
  nextStep,
}) => {
  const [errors, setErrors] = React.useState<{
    name?: string;
    email?: string;
    dni?: string;
    phone?: string;
    address?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Ingresa tu nombre completo';
    }
    
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }
    
    if (!formData.dni.trim() || !/^\d{7,8}$/.test(formData.dni)) {
      newErrors.dni = 'Ingresa un DNI válido (7-8 dígitos)';
    }
    
    if (!formData.phone.trim() || !/^\d{10,11}$/.test(formData.phone)) {
      newErrors.phone = 'Ingresa un teléfono válido';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Ingresa tu dirección completa';
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

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">
            Nombre completo
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            className={`glass-input w-full ${errors.name ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
            placeholder="Ej. Juan Pérez"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-error-600 dark:text-error-400">{errors.name}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className={`glass-input w-full ${errors.email ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
            placeholder="Ej. juan.perez@gmail.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error-600 dark:text-error-400">{errors.email}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="dni" className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">
            DNI
          </label>
          <input
            type="text"
            id="dni"
            value={formData.dni}
            onChange={(e) => updateFormData({ dni: e.target.value.replace(/\D/g, '') })}
            className={`glass-input w-full ${errors.dni ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
            placeholder="Ej. 30123456"
            maxLength={8}
          />
          {errors.dni && (
            <p className="mt-1 text-sm text-error-600 dark:text-error-400">{errors.dni}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">
            Teléfono celular
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value.replace(/\D/g, '') })}
            className={`glass-input w-full ${errors.phone ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
            placeholder="Ej. 1155667788"
            maxLength={11}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-error-600 dark:text-error-400">{errors.phone}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">
            Dirección completa
          </label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            className={`glass-input w-full ${errors.address ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
            placeholder="Ej. Av. Corrientes 1234, 3B, CABA"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-error-600 dark:text-error-400">{errors.address}</p>
          )}
        </div>
        
        <div className="flex justify-end pt-4">
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

export default PersonalInfoStep;