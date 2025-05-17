import { LoanSimulation, Payment } from '../types';

// Calculate monthly payment using the formula: P = (A * r * (1 + r)^n) / ((1 + r)^n - 1)
// Where:
// P = Monthly payment
// A = Loan amount
// r = Monthly interest rate (annual rate / 12 / 100)
// n = Total number of payments (term in months)
export const calculateMonthlyPayment = (amount: number, annualRate: number, termMonths: number): number => {
  const monthlyRate = annualRate / 12 / 100;
  
  if (monthlyRate === 0) {
    return amount / termMonths;
  }
  
  const paymentFactor = (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
                        (Math.pow(1 + monthlyRate, termMonths) - 1);
  
  return amount * paymentFactor;
};

// Get interest rate based on amount and term
export const getInterestRate = (amount: number, termMonths: number): number => {
  // Base rate increases with longer terms and decreases with larger amounts
  let baseRate = 85; // Starting with a high rate for Argentina (85%)
  
  // Adjust for amount (lower rate for higher amounts)
  if (amount >= 1000000) {
    baseRate -= 12;
  } else if (amount >= 500000) {
    baseRate -= 8;
  } else if (amount >= 250000) {
    baseRate -= 5;
  } else if (amount >= 100000) {
    baseRate -= 2;
  }
  
  // Adjust for term (higher rate for longer terms)
  if (termMonths >= 48) {
    baseRate += 6;
  } else if (termMonths >= 36) {
    baseRate += 4;
  } else if (termMonths >= 24) {
    baseRate += 2;
  } else if (termMonths >= 12) {
    baseRate += 1;
  }
  
  // Ensure rate doesn't go below 30% (realistic for Argentina)
  return Math.max(baseRate, 30);
};

// Generate amortization schedule
export const generatePaymentSchedule = (
  amount: number, 
  annualRate: number, 
  termMonths: number
): Payment[] => {
  const monthlyRate = annualRate / 12 / 100;
  const monthlyPayment = calculateMonthlyPayment(amount, annualRate, termMonths);
  const payments: Payment[] = [];
  
  let balance = amount;
  const startDate = new Date();
  
  for (let i = 1; i <= termMonths; i++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance -= principal;
    
    // Calculate payment date (months from start date)
    const paymentDate = new Date(startDate);
    paymentDate.setMonth(startDate.getMonth() + i);
    
    payments.push({
      number: i,
      date: paymentDate,
      principal: principal,
      interest: interest,
      balance: Math.max(0, balance),
      total: monthlyPayment,
    });
  }
  
  return payments;
};

// Generate full loan simulation
export const simulateLoan = (amount: number, termMonths: number): LoanSimulation => {
  const interestRate = getInterestRate(amount, termMonths);
  const monthlyPayment = calculateMonthlyPayment(amount, interestRate, termMonths);
  const payments = generatePaymentSchedule(amount, interestRate, termMonths);
  
  const totalPayment = monthlyPayment * termMonths;
  const totalInterest = totalPayment - amount;
  
  return {
    amount,
    term: termMonths,
    monthlyPayment,
    interestRate,
    totalInterest,
    totalPayment,
    payments,
  };
};

// Format currency in ARS
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(value);
};

// Format percentage
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

// Format date
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-AR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};