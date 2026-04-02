import React from 'react';
import { motion } from 'motion/react';

export const LeadForm = () => {
  return (
    <div className="glass-panel p-8 max-w-lg w-full">
      <h3 className="text-wide text-2xl mb-2 text-dark-blue">Build Your Empire</h3>
      <p className="text-sm text-charcoal/60 mb-8">Secure your strategic growth partnership today.</p>
      
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] uppercase font-bold mb-1 ml-1">Name</label>
            <input 
              type="text" 
              className="w-full bg-white/50 border border-charcoal/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-dark-blue/20 transition-all"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold mb-1 ml-1">Company</label>
            <input 
              type="text" 
              className="w-full bg-white/50 border border-charcoal/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-dark-blue/20 transition-all"
              placeholder="Acme Corp"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-[10px] uppercase font-bold mb-1 ml-1">Email</label>
          <input 
            type="email" 
            className="w-full bg-white/50 border border-charcoal/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-dark-blue/20 transition-all"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold mb-1 ml-1">Message</label>
          <textarea 
            rows={4}
            className="w-full bg-white/50 border border-charcoal/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-dark-blue/20 transition-all resize-none"
            placeholder="Tell us about your growth goals..."
          />
        </div>

        <button className="w-full bg-dark-blue text-off-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-charcoal transition-colors shadow-lg shadow-dark-blue/20">
          Initiate Growth
        </button>
      </form>
    </div>
  );
};
