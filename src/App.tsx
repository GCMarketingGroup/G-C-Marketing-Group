/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import Lenis from 'lenis';
import { Experience } from './components/Experience';
import { ROICalculator } from './components/ROICalculator';
import { LeadForm } from './components/LeadForm';
import { AboutUs } from './components/AboutUs';
import { cn } from './lib/utils';
import { ArrowDown, ChevronRight, Globe, Zap, Shield, TrendingUp } from 'lucide-react';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const unsubscribe = smoothProgress.on("change", (latest) => {
      setScrollProgress(latest);
    });

    return () => {
      lenis.destroy();
      unsubscribe();
    };
  }, [smoothProgress]);

  // Transform values for UI elements
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.15], [1, 0.8]);
  
  const devOpacity = useTransform(smoothProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const devY = useTransform(smoothProgress, [0.2, 0.3, 0.4, 0.5], [50, 0, 0, -50]);

  const aboutOpacity = useTransform(smoothProgress, [0.55, 0.65, 0.75, 0.82], [0, 1, 1, 0]);
  const aboutY = useTransform(smoothProgress, [0.55, 0.65, 0.75, 0.82], [50, 0, 0, -50]);

  const revealOpacity = useTransform(smoothProgress, [0.85, 0.92], [0, 1]);
  const revealY = useTransform(smoothProgress, [0.85, 0.92], [50, 0]);

  return (
    <div ref={containerRef} className="relative w-full bg-off-white">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas shadows gl={{ antialias: true }}>
          <Experience scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference text-off-white">
        <div className="text-wide text-xl">G&C Marketing Group</div>
        <div className="hidden md:flex gap-8 text-[10px] uppercase font-bold tracking-widest">
          <a href="#" className="hover:opacity-50 transition-opacity">Strategy</a>
          <a href="#" className="hover:opacity-50 transition-opacity">Systems</a>
          <a href="#" className="hover:opacity-50 transition-opacity">Growth</a>
          <a href="#" className="hover:opacity-50 transition-opacity">Contact</a>
        </div>
      </nav>

      {/* Scroll Progress Indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div 
            key={i}
            className={cn(
              "w-1 h-12 rounded-full transition-all duration-500",
              (scrollProgress >= i * 0.25 && scrollProgress < (i + 1) * 0.25) 
                ? "bg-dark-blue h-16" 
                : "bg-charcoal/20"
            )}
          />
        ))}
      </div>

      {/* Content Sections */}
      
      {/* Section 1: Hero - Gridlock */}
      <section className="relative h-[100vh] flex items-center justify-center z-10 px-8">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-4xl text-center"
        >
          <h1 className="text-wide text-5xl md:text-8xl mb-6 text-charcoal leading-tight">
            Navigate the <span className="text-dark-blue">Noise</span>
          </h1>
          <p className="text-lg md:text-xl text-charcoal/60 max-w-2xl mx-auto mb-12 font-medium">
            Most businesses plateau in the urban sprawl of market noise. We provide the architectural clarity to break through.
          </p>
          <div className="flex flex-col items-center gap-4">
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-charcoal/40"
            >
              <ArrowDown size={32} />
            </motion.div>
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-charcoal/40">Scroll to Explore</span>
          </div>
        </motion.div>
      </section>

      {/* Section 2: Development - The System */}
      <section className="relative h-[200vh] z-10">
        <div className="sticky top-0 h-[100vh] flex items-center justify-center px-8">
          <motion.div 
            style={{ opacity: devOpacity, y: devY }}
            className="grid md:grid-cols-2 gap-12 items-center max-w-6xl"
          >
            <div className="glass-panel p-12">
              <h2 className="text-wide text-3xl mb-6 text-dark-blue">The System</h2>
              <p className="text-charcoal/70 mb-8 leading-relaxed">
                We deconstruct your current operations and reassemble them into high-performance blueprints. Our strategic growth engine is built for scale, not just survival.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Zap, text: "Automated Lead Generation" },
                  { icon: Shield, text: "Risk-Mitigated Scaling" },
                  { icon: Globe, text: "Market Dominance Strategy" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm font-bold text-charcoal/80">
                    <div className="w-8 h-8 rounded-full bg-dark-blue/10 flex items-center justify-center text-dark-blue">
                      <item.icon size={16} />
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-dark-blue/5 blur-3xl rounded-full" />
                <div className="relative glass-panel p-8 border-dark-blue/20">
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-wide text-xs">System Status</div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[85, 92, 78].map((w, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase text-charcoal/40">
                          <span>Module {i+1}</span>
                          <span>{w}%</span>
                        </div>
                        <div className="h-1 bg-charcoal/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${w}%` }}
                            className="h-full bg-dark-blue"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: About Us - The Architects */}
      <section className="relative h-[200vh] z-10">
        <div className="sticky top-0 h-[100vh] flex items-center justify-center px-8">
          <motion.div 
            style={{ opacity: aboutOpacity, y: aboutY }}
            className="w-full max-w-6xl flex justify-center"
          >
            <AboutUs />
          </motion.div>
        </div>
      </section>

      {/* Section 4: Reveal - Clarity & Conversion */}
      <section className="relative h-[200vh] z-10">
        <div className="sticky top-0 h-[100vh] flex flex-col items-center justify-center px-8">
          <motion.div 
            style={{ opacity: revealOpacity, y: revealY }}
            className="w-full max-w-6xl"
          >
            <div className="text-center mb-16">
              <h2 className="text-wide text-4xl md:text-6xl mb-6 text-charcoal">Absolute <span className="text-dark-blue">Clarity</span></h2>
              <p className="text-lg text-charcoal/60 max-w-2xl mx-auto">
                The noise dissolves. The path is clear. Your growth is now a mathematical certainty.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="flex flex-col gap-8">
                <ROICalculator />
                <div className="glass-panel p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <TrendingUp className="text-dark-blue" />
                    <h4 className="text-wide text-sm">Growth Trajectory</h4>
                  </div>
                  <p className="text-xs text-charcoal/60 leading-relaxed">
                    Our partners see an average of 40% increase in operational efficiency within the first 90 days.
                  </p>
                </div>
              </div>
              <LeadForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 px-8 bg-charcoal text-off-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="text-wide text-2xl mb-6">G&C Marketing Group</div>
            <p className="text-off-white/40 max-w-sm text-sm leading-relaxed">
              Strategic growth partners for the high-performance service industry. Repositioning empires through technical authority.
            </p>
          </div>
          <div>
            <h5 className="text-wide text-xs mb-6 opacity-50">Navigation</h5>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-dark-blue transition-colors">Strategy</a></li>
              <li><a href="#" className="hover:text-dark-blue transition-colors">Systems</a></li>
              <li><a href="#" className="hover:text-dark-blue transition-colors">Growth</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-wide text-xs mb-6 opacity-50">Connect</h5>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-dark-blue transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-dark-blue transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-dark-blue transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-off-white/10 flex justify-between items-center text-[10px] uppercase font-bold tracking-widest opacity-30">
          <span>© 2026 G&C Marketing Group</span>
          <span>Built for Performance</span>
        </div>
      </footer>
    </div>
  );
}
