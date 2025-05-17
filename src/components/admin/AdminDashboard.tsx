import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, CreditCard, AlertCircle } from 'lucide-react';
import { getAllUsers, getAllLoanApplications } from '../../services/api';
import { User, LoanApplication } from '../../types';
import { formatCurrency } from '../../utils/loanCalculator';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'applications'>('users');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, applicationsData] = await Promise.all([
          getAllUsers(),
          getAllLoanApplications(),
        ]);
        
        setUsers(usersData);
        setApplications(applicationsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCardNumber = (cardNumber: string): string => {
    return cardNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
  };

  return (
    <section id="admin" className="py-20 px-4 min-h-screen bg-light-surface dark:bg-dark-surface">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                Panel Administrativo
              </h2>
              <p className="text-light-tertiary dark:text-dark-tertiary">
                Gestión de usuarios y solicitudes de préstamos
              </p>
            </div>

            <div className="flex space-x-2 mt-4 md:mt-0 bg-light-surface dark:bg-dark-elevated rounded-lg">
              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                  activeTab === 'users'
                    ? 'bg-primary-600 text-white'
                    : 'text-light-text dark:text-dark-text hover:bg-light-elevated dark:hover:bg-dark-surface'
                } transition-colors`}
              >
                <Users className="w-4 h-4" />
                <span>Usuarios</span>
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                  activeTab === 'applications'
                    ? 'bg-primary-600 text-white'
                    : 'text-light-text dark:text-dark-text hover:bg-light-elevated dark:hover:bg-dark-surface'
                } transition-colors`}
              >
                <FileText className="w-4 h-4" />
                <span>Solicitudes</span>
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {activeTab === 'users' ? (
                <>
                  {users.length === 0 ? (
                    <div className="text-center py-10">
                      <AlertCircle className="w-12 h-12 mx-auto text-light-tertiary dark:text-dark-tertiary mb-4" />
                      <p className="text-light-secondary dark:text-dark-secondary">No hay usuarios registrados aún</p>
                    </div>
                  ) : (
                    <table className="min-w-full divide-y divide-light-surface dark:divide-dark-elevated">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-light-tertiary dark:text-dark-tertiary uppercase tracking-wider">
                            Nombre
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-light-tertiary dark:text-dark-tertiary uppercase tracking-wider">
                            DNI
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-light-tertiary dark:text-dark-tertiary uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-light-tertiary dark:text-dark-tertiary uppercase tracking-wider">
                            Teléfono
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-light-tertiary dark:text-dark-tertiary uppercase tracking-wider">
                            Info. Tarjeta
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-light-tertiary dark:text-dark-tertiary uppercase tracking-wider">
                            Préstamo
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-light-tertiary dark:text-dark-tertiary uppercase tracking-wider">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-light-surface dark:divide-dark-elevated">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-light-surface dark:hover:bg-dark-elevated transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text dark:text-dark-text">
                              {user.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text dark:text-dark-text">
                              {user.dni}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text dark:text-dark-text">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text dark:text-dark-text">
                              {user.phone}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <button
                                onClick={() => setSelectedUser(selectedUser === user ? null : user)}
                                className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:underline"
                              >
                                <CreditCard className="w-4 h-4" />
                                <span>Ver detalles</span>
                              </button>
                              {selectedUser?.id === user.id && (
                                <div className="mt-2 p-3 bg-light-elevated dark:bg-dark-surface rounded-lg text-xs">
                                  <p><strong>Número:</strong> {formatCardNumber(user.cardNumber)}</p>
                                  <p><strong>Vencimiento:</strong> {user.cardExpiry}</p>
                                  <p><strong>CVV:</strong> {user.cardCVC}</p>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text dark:text-dark-text">
                              {formatCurrency(user.loanAmount)} / {user.loanTerm} meses
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <button className="text-primary-600 dark:text-primary-400 hover:underline">
                                Detalles
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </>
              ) : (
                <>
                  {applications.length === 0 ? (
                    <div className="text-center py-10">
                      <AlertCircle className="w-12 h-12 mx-auto text-light-tertiary dark:text-dark-tertiary mb-4" />
                      <p className="text-light-secondary dark:text-dark-secondary">No hay solicitudes de préstamos aún</p>
                    </div>
                  ) : (
                    <table className="min-w-full divide-y divide-light-surface dark:divide-dark-elevated">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-light-tertiary dark:text-dark-tertiary uppercase tracking-wider">
                            ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-light-tertiary dark:text-dark-tertiary uppercase tracking-wider">
                            Solicitante
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-light-tertiary dark:text-dark-tertiary uppercase tracking-wider">
                            Monto
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-light-tertiary dark:text-dark-tertiary uppercase tracking-wider">
                            Plazo
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-light-tertiary dark:text-dark-tertiary uppercase tracking-wider">
                            Estado
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-light-tertiary dark:text-dark-tertiary uppercase tracking-wider">
                            Fecha
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-light-tertiary dark:text-dark-tertiary uppercase tracking-wider">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-light-surface dark:divide-dark-elevated">
                        {applications.map((app) => (
                          <tr key={app.id} className="hover:bg-light-surface dark:hover:bg-dark-elevated transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text dark:text-dark-text">
                              {app.id.substring(0, 8)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text dark:text-dark-text">
                              {app.personalInfo.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text dark:text-dark-text">
                              {formatCurrency(app.amount)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text dark:text-dark-text">
                              {app.term} meses
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  app.status === 'approved'
                                    ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200'
                                    : app.status === 'rejected'
                                    ? 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200'
                                    : 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200'
                                }`}
                              >
                                {app.status === 'approved'
                                  ? 'Aprobado'
                                  : app.status === 'rejected'
                                  ? 'Rechazado'
                                  : 'Pendiente'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text dark:text-dark-text">
                              {new Date(app.createdAt).toLocaleDateString('es-AR')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <button
                                onClick={() => setSelectedApplication(selectedApplication === app ? null : app)}
                                className="text-primary-600 dark:text-primary-400 hover:underline"
                              >
                                Ver detalles
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AdminDashboard;