import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface TermSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

const TermSlider: React.FC<TermSliderProps> = ({
  value,
  onChange,
  min,
  max,
  step,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Calculate percentage for positioning
  const percentage = ((value - min) / (max - min)) * 100;
  
  // Handle click on track
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const trackWidth = rect.width;
      const percentageClicked = clickPosition / trackWidth;
      
      // Calculate the new value
      let newValue = min + (max - min) * percentageClicked;
      
      // Round to nearest step
      newValue = Math.round(newValue / step) * step;
      
      // Ensure within bounds
      newValue = Math.max(min, Math.min(max, newValue));
      
      onChange(newValue);
    }
  };

  // Get display text for term
  const getTermDisplay = (months: number): string => {
    if (months === 1) return '1 mes';
    if (months < 12) return `${months} meses`;
    if (months === 12) return '1 año';
    if (months % 12 === 0) return `${months / 12} años`;
    return `${Math.floor(months / 12)} años y ${months % 12} meses`;
  };

  return (
    <div className="relative py-2">
      {/* Track */}
      <div
        ref={trackRef}
        className="slider-track"
        onClick={handleTrackClick}
      >
        {/* Filled portion */}
        <div
          className="absolute h-2 rounded-full bg-primary-600 dark:bg-primary-400"
          style={{ width: `${percentage}%` }}
        ></div>
        
        {/* Thumb */}
        <motion.div
          className="slider-thumb absolute top-1/2 -translate-y-1/2"
          style={{ left: `${percentage}%` }}
          whileTap={{ scale: 1.2 }}
          whileHover={{ scale: 1.1 }}
          animate={{ x: '-50%' }}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          {/* Value tooltip */}
          {isDragging && (
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white px-2 py-1 text-sm rounded-md whitespace-nowrap">
              {getTermDisplay(value)}
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Step marks for important values */}
      <div className="relative mt-2 h-0">
        {[0, 20, 40, 60, 80, 100].map((mark) => (
          <div
            key={mark}
            className="absolute w-1 h-1 rounded-full bg-light-tertiary dark:bg-dark-tertiary"
            style={{ left: `${mark}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default TermSlider;