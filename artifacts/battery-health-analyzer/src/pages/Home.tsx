import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Battery, Activity, Cpu, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const TYPEWRITER_TEXTS = [
  "Predictive Maintenance",
  "Lifespan Optimization",
  "AI-Powered Insights",
  "Real-time Monitoring"
];

const FloatingIcon = ({ children, delay, x, y, duration }: any) => (
  <motion.div
    initial={{ x, y, opacity: 0 }}
    animate={{ 
      x: [x - 20, x + 20, x - 20],
      y: [y - 20, y + 20, y - 20],
      opacity: 0.2 
    }}
    transition={{
      repeat: Infinity,
      duration: duration || 8,
      delay,
      ease: "easeInOut"
    }}
    className="absolute pointer-events-none text-primary/30 dark:text-primary/20 hidden md:block"
  >
    {children}
  </motion.div>
);

const AnimatedCounter = ({ end, suffix = "", prefix = "" }: { end: number, suffix?: string, prefix?: string }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [end]);

  return <span>{prefix}{count}{suffix}</span>;
};

export default function Home() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = TYPEWRITER_TEXTS[textIndex];
    let timeoutId: NodeJS.Timeout;

    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % TYPEWRITER_TEXTS.length);
        timeoutId = setTimeout(() => {}, 500); // pause before typing next
      } else {
        timeoutId = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length - 1));
        }, 50);
      }
    } else {
      if (displayText === currentText) {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 2000); // pause before deleting
      } else {
        timeoutId = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        }, 100);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isDeleting, textIndex]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Animated Particles/Background */}
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 z-0 mask-image:linear-gradient(to_bottom,white,transparent)"></div>
        
        {/* Floating Icons */}
        <FloatingIcon x={100} y={150} delay={0} duration={6}><Battery size={48} /></FloatingIcon>
        <FloatingIcon x={window.innerWidth - 200} y={200} delay={1} duration={7}><Activity size={64} /></FloatingIcon>
        <FloatingIcon x={200} y={window.innerHeight - 300} delay={2} duration={8}><Cpu size={56} /></FloatingIcon>
        <FloatingIcon x={window.innerWidth - 300} y={window.innerHeight - 250} delay={1.5} duration={5}><Zap size={40} /></FloatingIcon>

        <div className="relative z-10 text-center max-w-4xl mx-auto mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6 text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            System Online v2.4.1
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            Intelligent Battery <br className="hidden md:block"/>
            <span className="text-gradient">Health Analysis</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground h-12 mb-8"
          >
            For <span className="font-semibold text-foreground border-r-2 border-primary pr-1">{displayText}</span>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Deploying advanced machine learning models to predict battery degradation, optimize charge cycles, and extend the lifespan of critical power systems.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="rounded-full px-8 w-full sm:w-auto group">
              <Link href="/analyzer">
                Analyze Battery
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 w-full sm:w-auto border-border hover:bg-secondary">
              <Link href="/dashboard">
                View Live Dashboard
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-xs text-muted-foreground mb-2 tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 border-2 border-muted-foreground rounded-full flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-t border-border bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 glass-card"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Activity size={24} />
              </div>
              <h3 className="text-4xl font-bold mb-2">
                <AnimatedCounter end={98} suffix="%" />
              </h3>
              <p className="text-muted-foreground">Prediction Accuracy</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center text-center p-6 glass-card"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4">
                <Zap size={24} />
              </div>
              <h3 className="text-4xl font-bold mb-2">
                <AnimatedCounter end={15} prefix="+" suffix="M" />
              </h3>
              <p className="text-muted-foreground">Data Points Analyzed</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center text-center p-6 glass-card"
            >
              <div className="w-12 h-12 rounded-full bg-chart-3/10 flex items-center justify-center text-chart-3 mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-4xl font-bold mb-2">
                <AnimatedCounter end={40} suffix="%" />
              </h3>
              <p className="text-muted-foreground">Average Lifespan Extension</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Feature Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Stop Reacting. <br/><span className="text-gradient">Start Predicting.</span></h2>
              <p className="text-lg text-muted-foreground mb-6">
                Traditional battery management systems only tell you when a battery has already failed. Our AI model analyzes voltage, temperature, and charge cycle patterns to predict degradation months before it happens.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Early warning anomaly detection",
                  "Precise Remaining Useful Life (RUL) estimation",
                  "Actionable insights to slow degradation",
                  "Comprehensive multi-cell tracking"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                      <ShieldCheck size={14} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild>
                <Link href="/about">Learn How It Works</Link>
              </Button>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-border bg-card/40 p-4 overflow-hidden shadow-2xl shadow-primary/5"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive animate-pulse"></div>
                  <span className="font-medium">Live Telemetry</span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">ID: BATT-0842X</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-background border border-border">
                  <div className="text-sm text-muted-foreground mb-1">Health Score</div>
                  <div className="text-3xl font-bold text-accent">87%</div>
                </div>
                <div className="p-4 rounded-xl bg-background border border-border">
                  <div className="text-sm text-muted-foreground mb-1">Temperature</div>
                  <div className="text-3xl font-bold">32°C</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Capacity Projection</span>
                  <span className="text-primary font-medium">Stable</span>
                </div>
                <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '87%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}