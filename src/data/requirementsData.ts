import { Requirement } from '../types';

export const requirementsData: Requirement[] = [
  {
    id: '1',
    title: 'Ser mayor de 18 años',
    description: 'Debes tener al menos 18 años de edad para solicitar un préstamo personal en nuestra plataforma.',
    icon: 'User',
  },
  {
    id: '2',
    title: 'DNI argentino',
    description: 'Es necesario contar con un Documento Nacional de Identidad argentino válido y vigente.',
    icon: 'FileText',
  },
  {
    id: '3',
    title: 'Ingresos demostrables',
    description: 'Debes percibir ingresos mensuales demostrables de al menos $150.000, ya sea como empleado en relación de dependencia, autónomo o monotributista.',
    icon: 'DollarSign',
  },
  {
    id: '4',
    title: 'Antigüedad laboral',
    description: 'Requerimos una antigüedad laboral mínima de 6 meses en tu empleo actual o actividad independiente.',
    icon: 'Briefcase',
  },
  {
    id: '5',
    title: 'Cuenta bancaria',
    description: 'Es necesario disponer de una cuenta bancaria a tu nombre para recibir el dinero del préstamo.',
    icon: 'Building',
  },
  {
    id: '6',
    title: 'Tarjeta de crédito o débito',
    description: 'Debes contar con una tarjeta de crédito o débito a tu nombre para verificar tu identidad. No se realizarán cargos sin tu autorización.',
    icon: 'CreditCard',
  },
];