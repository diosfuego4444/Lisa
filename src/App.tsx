import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LoanProvider } from './context/LoanContext';
import { AuthProvider } from './context/AuthContext';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Home components
import Hero from './components/home/Hero';
import Benefits from './components/home/Benefits';
import FAQ from './components/home/FAQ';
import HowToApply from './components/home/HowToApply';
import Requirements from './components/home/Requirements';

// Feature components
import LoanSimulator from './components/simulator/LoanSimulator';
import EligibilityVerifier from './components/eligibility/EligibilityVerifier';
import LoanApplicationForm from './components/application/LoanApplicationForm';
import Chatbot from './components/chatbot/Chatbot';
import AdminDashboard from './components/admin/AdminDashboard';
import { useAuth } from './context/AuthContext';

// Main App component
function AppContent() {
  const { isLoggedIn, isAdmin } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {isAdmin && isLoggedIn ? (
          <AdminDashboard />
        ) : (
          <>
            <Hero />
            <LoanSimulator />
            <Benefits />
            <HowToApply />
            <Requirements />
            <EligibilityVerifier />
            <FAQ />
            <LoanApplicationForm />
          </>
        )}
      </main>
      
      <Footer />
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LoanProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LoanProvider>
    </ThemeProvider>
  );
}

export default App;