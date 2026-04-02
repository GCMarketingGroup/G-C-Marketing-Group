import React from 'react';
import { motion } from 'motion/react';
import { Users, Target, Award, BarChart3, Megaphone, Search } from 'lucide-react';

export const AboutUs = () => {
  return (
    <div className="max-w-4xl w-full text-center space-y-12">
      <div className="space-y-6">
        <div className="inline-block px-4 py-1 bg-dark-blue/10 rounded-full">
          <span className="text-[10px] uppercase font-bold tracking-widest text-dark-blue">The Growth Architects</span>
        </div>
        <h2 className="text-wide text-4xl md:text-6xl text-charcoal leading-tight">
          Marketing <span className="text-dark-blue">Engineered</span> <br />
          for Dominance
        </h2>
        <p className="text-charcoal/60 leading-relaxed max-w-2xl mx-auto text-lg">
          G&C Marketing Group isn't just an agency. We are a high-performance growth engine that bridges the gap between creative authority and mathematical market dominance. 
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {[
          { 
            icon: Megaphone, 
            title: "Strategic Positioning", 
            desc: "We don't just run ads. We architect market positions that force your competition into irrelevance." 
          },
          { 
            icon: BarChart3, 
            title: "Data-Driven Scale", 
            desc: "Every campaign is a calculated move. We use precision analytics to turn marketing spend into predictable revenue." 
          },
          { 
            icon: Search, 
            title: "Authority Building", 
            desc: "Repositioning your brand as the undisputed leader in your industry through technical and creative authority." 
          }
        ].map((item, i) => (
          <div key={i} className="glass-panel p-8 hover:bg-white/50 transition-all duration-500 group">
            <div className="w-14 h-14 rounded-2xl bg-dark-blue/5 flex items-center justify-center text-dark-blue mb-6 group-hover:scale-110 transition-transform">
              <item.icon size={24} />
            </div>
            <h4 className="text-wide text-sm mb-3 text-charcoal">{item.title}</h4>
            <p className="text-xs text-charcoal/50 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="pt-12">
        <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-charcoal/30">
          G&C Marketing Group — Precision. Scale. Dominance.
        </p>
      </div>
    </div>
  );
};
