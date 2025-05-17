import { ChatbotMessage, ChatbotOption } from '../types';

export const initialMessages: ChatbotMessage[] = [
  {
    id: 'welcome',
    sender: 'bot',
    text: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?',
    options: [
      { id: 'loan-info', text: 'Información sobre préstamos' },
      { id: 'requirements', text: 'Requisitos para solicitar' },
      { id: 'apply', text: 'Cómo solicitar un préstamo' },
      { id: 'contact', text: 'Hablar con un asesor' },
    ],
    timestamp: new Date(),
  },
];

export const chatbotResponses: Record<string, ChatbotMessage> = {
  'loan-info': {
    id: 'loan-info-response',
    sender: 'bot',
    text: 'Ofrecemos préstamos personales desde $10.000 hasta $2.500.000 con plazos de devolución desde 1 hasta 60 meses. Nuestras tasas de interés son competitivas y varían según el monto y plazo. ¿Qué más te gustaría saber?',
    options: [
      { id: 'interest-rates', text: 'Tasas de interés' },
      { id: 'loan-limits', text: 'Montos y plazos disponibles' },
      { id: 'payment-methods', text: 'Métodos de pago' },
      { id: 'back', text: 'Volver al menú principal' },
    ],
    timestamp: new Date(),
  },
  'interest-rates': {
    id: 'interest-rates-response',
    sender: 'bot',
    text: 'Nuestras tasas de interés anual varían entre el 30% y el 90%, dependiendo del monto solicitado, el plazo de devolución y tu historial crediticio. Durante el proceso de solicitud, te mostraremos la tasa específica para tu préstamo antes de confirmar.',
    options: [
      { id: 'loan-info', text: 'Volver a información de préstamos' },
      { id: 'back', text: 'Volver al menú principal' },
    ],
    timestamp: new Date(),
  },
  'loan-limits': {
    id: 'loan-limits-response',
    sender: 'bot',
    text: 'Puedes solicitar desde $10.000 hasta $2.500.000, con plazos de devolución que van desde 1 mes hasta 60 meses. El límite específico que podamos ofrecerte dependerá de tus ingresos mensuales y tu historial crediticio.',
    options: [
      { id: 'loan-info', text: 'Volver a información de préstamos' },
      { id: 'back', text: 'Volver al menú principal' },
    ],
    timestamp: new Date(),
  },
  'payment-methods': {
    id: 'payment-methods-response',
    sender: 'bot',
    text: 'Los pagos mensuales se realizan mediante débito automático de la tarjeta que registres durante el proceso de solicitud. También puedes pagar manualmente a través de transferencia bancaria o en puntos de pago como Rapipago y Pago Fácil.',
    options: [
      { id: 'loan-info', text: 'Volver a información de préstamos' },
      { id: 'back', text: 'Volver al menú principal' },
    ],
    timestamp: new Date(),
  },
  'requirements': {
    id: 'requirements-response',
    sender: 'bot',
    text: 'Para solicitar un préstamo necesitas: ser mayor de 18 años, tener DNI argentino, ingresos mensuales demostrables de al menos $150.000, antigüedad laboral mínima de 6 meses, cuenta bancaria a tu nombre y una tarjeta de crédito o débito a tu nombre para verificación.',
    options: [
      { id: 'documents', text: 'Documentación requerida' },
      { id: 'income', text: 'Sobre los ingresos mínimos' },
      { id: 'veraz', text: '¿Consultan Veraz?' },
      { id: 'back', text: 'Volver al menú principal' },
    ],
    timestamp: new Date(),
  },
  'documents': {
    id: 'documents-response',
    sender: 'bot',
    text: 'La documentación requerida incluye: DNI (frente y dorso), últimos 3 recibos de sueldo o últimas 6 facturas si eres autónomo/monotributista, comprobante de domicilio y datos de tu tarjeta para verificación (no se realizan cargos sin tu autorización).',
    options: [
      { id: 'requirements', text: 'Volver a requisitos' },
      { id: 'back', text: 'Volver al menú principal' },
    ],
    timestamp: new Date(),
  },
  'income': {
    id: 'income-response',
    sender: 'bot',
    text: 'El ingreso mensual mínimo requerido es de $150.000. Este monto es necesario para asegurar tu capacidad de pago. Si tienes ingresos variables, consideramos el promedio de los últimos 6 meses.',
    options: [
      { id: 'requirements', text: 'Volver a requisitos' },
      { id: 'back', text: 'Volver al menú principal' },
    ],
    timestamp: new Date(),
  },
  'veraz': {
    id: 'veraz-response',
    sender: 'bot',
    text: 'Sí, consultamos Veraz como parte de nuestro proceso de evaluación. Sin embargo, estar en Veraz no significa automáticamente que tu solicitud será rechazada. Evaluamos cada caso individualmente, considerando tu situación actual e ingresos estables.',
    options: [
      { id: 'requirements', text: 'Volver a requisitos' },
      { id: 'back', text: 'Volver al menú principal' },
    ],
    timestamp: new Date(),
  },
  'apply': {
    id: 'apply-response',
    sender: 'bot',
    text: 'Para solicitar un préstamo: 1) Utiliza nuestro simulador para elegir monto y plazo, 2) Completa el formulario con tus datos, 3) Proporciona información para verificar tu identidad, 4) Espera la aprobación, 5) Firma digitalmente el contrato, y 6) Recibe el dinero en tu cuenta en 24 horas hábiles.',
    options: [
      { id: 'simulator', text: 'Ir al simulador' },
      { id: 'form', text: 'Ir al formulario de solicitud' },
      { id: 'back', text: 'Volver al menú principal' },
    ],
    timestamp: new Date(),
  },
  'contact': {
    id: 'contact-response',
    sender: 'bot',
    text: 'Puedes contactar con un asesor a través de: Email: atencion@prestamos.ar, Teléfono: 0800-999-PRES (7737) de Lunes a Viernes de 8 a 20hs, o WhatsApp: +54 9 11 5555-5555, disponible 24/7.',
    options: [
      { id: 'back', text: 'Volver al menú principal' },
    ],
    timestamp: new Date(),
  },
  'back': {
    id: 'welcome',
    sender: 'bot',
    text: '¿En qué más puedo ayudarte hoy?',
    options: [
      { id: 'loan-info', text: 'Información sobre préstamos' },
      { id: 'requirements', text: 'Requisitos para solicitar' },
      { id: 'apply', text: 'Cómo solicitar un préstamo' },
      { id: 'contact', text: 'Hablar con un asesor' },
    ],
    timestamp: new Date(),
  },
  'simulator': {
    id: 'simulator-redirect',
    sender: 'bot',
    text: 'Te redirigiré al simulador de préstamos para que puedas calcular las cuotas según el monto y plazo que necesitas.',
    options: [
      { id: 'back', text: 'Volver al menú principal' },
    ],
    timestamp: new Date(),
  },
  'form': {
    id: 'form-redirect',
    sender: 'bot',
    text: 'Te redirigiré al formulario de solicitud para que puedas comenzar el proceso.',
    options: [
      { id: 'back', text: 'Volver al menú principal' },
    ],
    timestamp: new Date(),
  },
};