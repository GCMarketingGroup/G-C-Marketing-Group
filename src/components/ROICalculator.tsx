import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const ROICalculator = () => {
  const [jobs, setJobs] = useState(5);
  const [jobPrice, setJobPrice] = useState(1000);
  const fee = 1000;
  const revenue = jobs * jobPrice;
  const roi = revenue - fee;

  return (
    <div className="glass-panel p-8 max-w-md w-full">
      <h3 className="text-wide text-xl mb-6 text-dark-blue">ROI Calculator</h3>
      <div className="space-y-8">
        {/* Monthly Jobs Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase tracking-wider">
              Monthly Jobs
            </label>
            <span className="text-sm font-bold text-dark-blue">{jobs}</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="20" 
            value={jobs} 
            onChange={(e) => setJobs(parseInt(e.target.value))}
            className="w-full h-2 bg-charcoal/20 rounded-lg appearance-none cursor-pointer accent-dark-blue"
          />
        </div>

        {/* Price per Job Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase tracking-wider">
              Price per Job
            </label>
            <span className="text-sm font-bold text-dark-blue">${jobPrice.toLocaleString()}</span>
          </div>
          <input 
            type="range" 
            min="500" 
            max="10000" 
            step="100"
            value={jobPrice} 
            onChange={(e) => setJobPrice(parseInt(e.target.value))}
            className="w-full h-2 bg-charcoal/20 rounded-lg appearance-none cursor-pointer accent-dark-blue"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-charcoal/5 rounded-xl">
            <p className="text-[10px] uppercase font-bold text-charcoal/60">Monthly Fee</p>
            <p className="text-xl font-bold">${fee.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-dark-blue/5 rounded-xl">
            <p className="text-[10px] uppercase font-bold text-dark-blue/60">Est. Revenue</p>
            <p className="text-xl font-bold text-dark-blue">${revenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-charcoal/10">
          <p className="text-sm font-medium text-charcoal/80 mb-1">Net Monthly Growth</p>
          <p className={cn("text-3xl font-bold", roi > 0 ? "text-green-600" : "text-red-600")}>
            ${roi.toLocaleString()}
          </p>
          <p className="text-[10px] text-charcoal/40 mt-2 italic">
            *Based on your custom service values.
          </p>
        </div>
      </div>
    </div>
  );
};
