import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import AdminLoginModal from '../admin/AdminLoginModal';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#inicio' && e.detail === 3) { // Triple click
      setIsLoginModalOpen(true);
      e.preventDefault();
    }
  };

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-dark-background/80 backdrop-blur-md shadow-md'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                CréditoARG
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#inicio"
                className="text-light-text dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                onClick={(e) => handleNavClick(e, '#inicio')}
              >
                Inicio
              </a>
              <a
                href="#simulador"
                className="text-light-text dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Simulador
              </a>
              <a
                href="#beneficios"
                className="text-light-text dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Beneficios
              </a>
              <a
                href="#como-solicitar"
                className="text-light-text dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Cómo solicitar
              </a>
              <a
                href="#requisitos"
                className="text-light-text dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Requisitos
              </a>
              <a
                href="#faq"
                className="text-light-text dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Preguntas frecuentes
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="rounded-full p-2 text-light-text dark:text-dark-text hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
                aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {isAdmin && isLoggedIn && (
                <button
                  onClick={logout}
                  className="text-sm text-light-text dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Salir
                </button>
              )}

              <a
                href="#solicitar"
                className="apple-button-primary hidden md:block"
              >
                Solicitar ahora
              </a>

              <button
                onClick={toggleMenu}
                className="md:hidden text-light-text dark:text-dark-text"
                aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white dark:bg-dark-background shadow-lg glass-panel md:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <a
                href="#inicio"
                className="block text-light-text dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 py-2"
                onClick={(e) => {
                  handleNavClick(e, '#inicio');
                  closeMenu();
                }}
              >
                Inicio
              </a>
              <a
                href="#simulador"
                className="block text-light-text dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 py-2"
                onClick={closeMenu}
              >
                Simulador
              </a>
              <a
                href="#beneficios"
                className="block text-light-text dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 py-2"
                onClick={closeMenu}
              >
                Beneficios
              </a>
              <a
                href="#como-solicitar"
                className="block text-light-text dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 py-2"
                onClick={closeMenu}
              >
                Cómo solicitar
              </a>
              <a
                href="#requisitos"
                className="block text-light-text dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 py-2"
                onClick={closeMenu}
              >
                Requisitos
              </a>
              <a
                href="#faq"
                className="block text-light-text dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 py-2"
                onClick={closeMenu}
              >
                Preguntas frecuentes
              </a>
              
              <a
                href="#solicitar"
                className="block text-center apple-button-primary"
                onClick={closeMenu}
              >
                Solicitar ahora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Header;