export interface User {
  id: string;
  name: string;
  email: string;
  dni: string;
  phone: string;
  address: string;
  employmentStatus: string;
  monthlyIncome: number;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
  loanAmount: number;
  loanTerm: number;
  createdAt: Date;
}

export interface LoanApplication {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  amount: number;
  term: number;
  monthlyPayment: number;
  interestRate: number;
  totalInterest: number;
  totalPayment: number;
  startDate: Date;
  personalInfo: {
    name: string;
    email: string;
    dni: string;
    phone: string;
    address: string;
  };
  financialInfo: {
    employmentStatus: string;
    monthlyIncome: number;
    hasDependents: boolean;
    otherDebts: number;
  };
  cardInfo: {
    cardNumber: string;
    cardExpiry: string;
    cardCVC: string;
    cardHolderName: string;
  };
  createdAt: Date;
}

export interface LoanSimulation {
  amount: number;
  term: number;
  monthlyPayment: number;
  interestRate: number;
  totalInterest: number;
  totalPayment: number;
  payments: Payment[];
}

export interface Payment {
  number: number;
  date: Date;
  principal: number;
  interest: number;
  balance: number;
  total: number;
}

export interface ChatbotMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  options?: ChatbotOption[];
  timestamp: Date;
}

export interface ChatbotOption {
  id: string;
  text: string;
  nextMessageId?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Requirement {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface StepItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}