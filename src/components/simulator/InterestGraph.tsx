import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/loanCalculator';

interface InterestGraphProps {
  principal: number;
  interest: number;
}

const InterestGraph: React.FC<InterestGraphProps> = ({ principal, interest }) => {
  const totalAmount = principal + interest;
  const principalPercentage = (principal / totalAmount) * 100;
  const interestPercentage = (interest / totalAmount) * 100;
  
  const [animate, setAnimate] = useState(false);
  const graphRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (graphRef.current) {
      observer.observe(graphRef.current);
    }
    
    return () => {
      if (graphRef.current) {
        observer.unobserve(graphRef.current);
      }
    };
  }, []);

  return (
    <div ref={graphRef} className="h-full flex flex-col">
      {/* Pie chart */}
      <div className="relative aspect-square max-w-xs mx-auto mb-6">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="20"
            className="dark:opacity-20"
          />
          
          {/* Interest arc */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#f43f5e"
            strokeWidth="20"
            strokeDasharray={`${interestPercentage * 2.51} 251`}
            strokeDashoffset="62.75"
            className="dark:opacity-80"
            initial={{ strokeDasharray: "0 251" }}
            animate={animate ? { strokeDasharray: `${interestPercentage * 2.51} 251` } : {}}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          />
          
          {/* Principal arc */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="20"
            strokeDasharray={`${principalPercentage * 2.51} 251`}
            className="dark:opacity-80"
            initial={{ strokeDasharray: "0 251" }}
            animate={animate ? { strokeDasharray: `${principalPercentage * 2.51} 251` } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          {/* Center text */}
          <text
            x="50"
            y="50"
            dominantBaseline="middle"
            textAnchor="middle"
            className="text-sm fill-light-text dark:fill-dark-text font-medium"
          >
            Total
          </text>
          <text
            x="50"
            y="58"
            dominantBaseline="middle"
            textAnchor="middle"
            className="text-xs fill-light-tertiary dark:fill-dark-tertiary"
          >
            {formatCurrency(totalAmount).replace("$", "")}
          </text>
        </svg>
      </div>
      
      {/* Legend */}
      <div className="space-y-4 mt-auto">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-4 h-4 rounded-full bg-primary-500"></div>
            <span className="text-light-text dark:text-dark-text font-medium">Capital</span>
            <span className="text-light-tertiary dark:text-dark-tertiary ml-auto">
              {principalPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-2 bg-light-surface dark:bg-dark-surface rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary-500 rounded-full"
              initial={{ width: "0%" }}
              animate={animate ? { width: `${principalPercentage}%` } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </div>
          <div className="text-right text-sm text-light-secondary dark:text-dark-secondary mt-1">
            {formatCurrency(principal)}
          </div>
        </div>
        
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-4 h-4 rounded-full bg-accent-500"></div>
            <span className="text-light-text dark:text-dark-text font-medium">Intereses</span>
            <span className="text-light-tertiary dark:text-dark-tertiary ml-auto">
              {interestPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-2 bg-light-surface dark:bg-dark-surface rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-accent-500 rounded-full"
              initial={{ width: "0%" }}
              animate={animate ? { width: `${interestPercentage}%` } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </div>
          <div className="text-right text-sm text-light-secondary dark:text-dark-secondary mt-1">
            {formatCurrency(interest)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestGraph;