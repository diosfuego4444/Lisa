import React, { createContext, useState, useContext, ReactNode } from 'react';
import { LoanSimulation } from '../types';
import { simulateLoan } from '../utils/loanCalculator';

interface LoanContextType {
  loanAmount: number;
  loanTerm: number;
  simulation: LoanSimulation | null;
  setLoanAmount: (amount: number) => void;
  setLoanTerm: (term: number) => void;
  updateSimulation: () => void;
}

const LoanContext = createContext<LoanContextType | undefined>(undefined);

export const LoanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [loanTerm, setLoanTerm] = useState<number>(12);
  const [simulation, setSimulation] = useState<LoanSimulation | null>(null);

  const updateSimulation = () => {
    if (loanAmount >= 10000 && loanAmount <= 2500000 && loanTerm >= 1 && loanTerm <= 60) {
      const newSimulation = simulateLoan(loanAmount, loanTerm);
      setSimulation(newSimulation);
    }
  };

  // Update simulation whenever amount or term changes
  React.useEffect(() => {
    updateSimulation();
  }, [loanAmount, loanTerm]);

  return (
    <LoanContext.Provider 
      value={{ 
        loanAmount, 
        loanTerm, 
        simulation, 
        setLoanAmount, 
        setLoanTerm, 
        updateSimulation 
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};

export const useLoan = (): LoanContextType => {
  const context = useContext(LoanContext);
  
  if (context === undefined) {
    throw new Error('useLoan must be used within a LoanProvider');
  }
  
  return context;
};