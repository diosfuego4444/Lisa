import { User, LoanApplication } from '../types';

// Mock database for users and loan applications
let users: User[] = [];
let loanApplications: LoanApplication[] = [];

// Generate a random ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Submit a loan application
export const submitLoanApplication = (application: Omit<LoanApplication, 'id' | 'status' | 'createdAt'>): Promise<LoanApplication> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const newApplication: LoanApplication = {
        ...application,
        id: generateId(),
        status: 'pending',
        createdAt: new Date(),
      };
      
      loanApplications.push(newApplication);
      
      // Also add user data to users array
      const newUser: User = {
        id: generateId(),
        name: application.personalInfo.name,
        email: application.personalInfo.email,
        dni: application.personalInfo.dni,
        phone: application.personalInfo.phone,
        address: application.personalInfo.address,
        employmentStatus: application.financialInfo.employmentStatus,
        monthlyIncome: application.financialInfo.monthlyIncome,
        cardNumber: application.cardInfo.cardNumber,
        cardExpiry: application.cardInfo.cardExpiry,
        cardCVC: application.cardInfo.cardCVC,
        loanAmount: application.amount,
        loanTerm: application.term,
        createdAt: new Date(),
      };
      
      users.push(newUser);
      
      resolve(newApplication);
    }, 1500);
  });
};

// Get all users (for admin panel)
export const getAllUsers = (): Promise<User[]> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve([...users]);
    }, 500);
  });
};

// Get all loan applications (for admin panel)
export const getAllLoanApplications = (): Promise<LoanApplication[]> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve([...loanApplications]);
    }, 500);
  });
};

// Check if user is eligible for a loan
export const checkEligibility = (
  dni: string,
  monthlyIncome: number,
  loanAmount: number
): Promise<{ isEligible: boolean; reason?: string }> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Basic eligibility rules
      if (monthlyIncome < 150000) {
        resolve({ isEligible: false, reason: 'Los ingresos mensuales son insuficientes' });
      } else if (loanAmount > monthlyIncome * 10) {
        resolve({ isEligible: false, reason: 'El monto solicitado excede el máximo permitido según sus ingresos' });
      } else {
        resolve({ isEligible: true });
      }
    }, 2000);
  });
};