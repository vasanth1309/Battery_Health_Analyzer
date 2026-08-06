import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Cpu, BatteryWarning, Target, Users, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold mb-4"
        >
          Project Overview
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Why Battery Health <span className="text-gradient">Matters</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-3xl mx-auto"
        >
          As the world shifts toward electrification, predicting battery degradation is no longer just an engineering challenge—it's a critical environmental and economic imperative.
        </motion.p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
      >
        <motion.div variants={itemVariants}>
          <Card className="h-full glass-card border-none bg-card/40 hover:bg-card/60 transition-colors">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mb-6">
                <BatteryWarning size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">The Problem</h3>
              <p className="text-muted-foreground leading-relaxed">
                Lithium-ion batteries degrade silently due to temperature stress, high discharge rates, and improper charging cycles. Sudden failures in critical systems (EVs, UPS) can cause catastrophic downtime and safety hazards.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="h-full glass-card border-none bg-card/40 hover:bg-card/60 transition-colors">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Cpu size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">The AI Solution</h3>
              <p className="text-muted-foreground leading-relaxed">
                By feeding voltage, current, and temperature telemetry into our machine learning models, we can extract degradation features and predict the Remaining Useful Life (RUL) with high accuracy before physical symptoms appear.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="h-full glass-card border-none bg-card/40 hover:bg-card/60 transition-colors">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-6">
                <Leaf size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Global Impact</h3>
              <p className="text-muted-foreground leading-relaxed">
                Extending battery life by just 20% dramatically reduces e-waste and the environmental cost of mining raw materials. Predictive maintenance is the bridge to a sustainable electrified future.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Technical Architecture Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-border bg-background overflow-hidden flex flex-col md:flex-row shadow-2xl"
      >
        <div className="md:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Scientific Foundation</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="mt-1 text-primary"><Target size={24} /></div>
              <div>
                <h4 className="font-semibold text-lg mb-1">State of Health (SOH) Estimation</h4>
                <p className="text-muted-foreground">Calculated by comparing current maximum capacity to the nominal (design) capacity. SOH = C_current / C_nominal × 100%.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 text-primary"><Zap size={24} /></div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Internal Resistance Tracking</h4>
                <p className="text-muted-foreground">Ohmic drop (ΔV) during discharge pulses is monitored to calculate internal resistance, a key indicator of battery aging.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 text-primary"><Users size={24} /></div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Real-world Application</h4>
                <p className="text-muted-foreground">Designed for fleet managers, hardware engineers, and everyday consumers looking to maximize the ROI on battery-powered assets.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 bg-card relative overflow-hidden flex items-center justify-center p-8 min-h-[400px]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 z-0 mask-image:linear-gradient(to_bottom,white,transparent)"></div>
          <div className="relative z-10 w-full max-w-sm">
            <div className="bg-background/80 backdrop-blur rounded-2xl border border-border p-6 shadow-xl">
              <div className="font-mono text-sm text-primary mb-4">{"// SOH Prediction Algorithm"}</div>
              <pre className="text-xs text-muted-foreground overflow-x-auto font-mono leading-relaxed">
{`def predict_rul(features):
  # Normalize input features
  x_scaled = scaler.transform(features)
  
  # LSTM prediction
  rul_pred = model.predict(x_scaled)
  
  # Confidence intervals
  std_dev = calculate_uncertainty()
  
  return {
    'rul_cycles': rul_pred,
    'confidence': 95,
    'status': evaluate_safety(rul_pred)
  }`}
              </pre>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}