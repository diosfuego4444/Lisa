import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light-surface dark:bg-dark-surface pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
              CréditoARG
            </h3>
            <p className="text-light-secondary dark:text-dark-secondary mb-4">
              Soluciones financieras simples y rápidas para argentinos. Préstamos personales con mínimos requisitos y 100% online.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-light-tertiary dark:text-dark-tertiary hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-light-tertiary dark:text-dark-tertiary hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-light-tertiary dark:text-dark-tertiary hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-light-tertiary dark:text-dark-tertiary hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
              Enlaces rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#inicio"
                  className="text-light-secondary dark:text-dark-secondary hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#simulador"
                  className="text-light-secondary dark:text-dark-secondary hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Simulador de préstamos
                </a>
              </li>
              <li>
                <a
                  href="#requisitos"
                  className="text-light-secondary dark:text-dark-secondary hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Requisitos
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-light-secondary dark:text-dark-secondary hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <a
                  href="#chatbot"
                  className="text-light-secondary dark:text-dark-secondary hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Asistente virtual
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
              Información legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-light-secondary dark:text-dark-secondary hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light-secondary dark:text-dark-secondary hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Política de privacidad
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light-secondary dark:text-dark-secondary hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Costo financiero total
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light-secondary dark:text-dark-secondary hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Información BCRA
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light-secondary dark:text-dark-secondary hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Defensa al consumidor
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
              Contáctanos
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5" />
                <span className="text-light-secondary dark:text-dark-secondary">
                  atencion@creditoarg.com.ar
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5" />
                <span className="text-light-secondary dark:text-dark-secondary">
                  0800-999-CRED (2733)
                  <br />
                  Lunes a Viernes 8:00 a 20:00hs
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-light-surface dark:border-dark-elevated">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-light-tertiary dark:text-dark-tertiary text-sm">
              &copy; {new Date().getFullYear()} CréditoARG. Todos los derechos reservados.
            </p>
            <p className="text-light-tertiary dark:text-dark-tertiary text-sm mt-4 md:mt-0">
              Supervisado por Banco Central de la República Argentina
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;