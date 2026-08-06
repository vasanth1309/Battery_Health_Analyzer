import React from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, Activity, Brain, Lightbulb, LayoutDashboard, ArrowDown } from 'lucide-react';

const steps = [
  {
    icon: Database,
    title: "1. Data Acquisition",
    description: "Raw telemetry (voltage, current, temperature, timestamps) is collected from BMS sensors.",
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    icon: Cpu,
    title: "2. Preprocessing",
    description: "Noise filtering, outlier removal, and normalization of time-series data.",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10"
  },
  {
    icon: Activity,
    title: "3. Feature Extraction",
    description: "Calculating internal resistance, charge capacities, and thermal gradients.",
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    icon: Brain,
    title: "4. ML Inference",
    description: "LSTM neural network processes features to predict degradation curves and Remaining Useful Life.",
    color: "text-pink-500",
    bg: "bg-pink-500/10"
  },
  {
    icon: Lightbulb,
    title: "5. Recommendation Engine",
    description: "Rule-based expert system generates actionable advice based on ML outputs.",
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  {
    icon: LayoutDashboard,
    title: "6. User Interface",
    description: "Insights are presented via interactive React dashboards (what you are seeing now).",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  }
];

export default function Workflow() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">System <span className="text-gradient">Pipeline</span></h1>
        <p className="text-muted-foreground text-lg">
          The end-to-end architecture of our predictive maintenance model.
        </p>
      </div>

      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 -translate-x-1/2 opacity-20 hidden md:block"></div>
        
        <div className="space-y-6 md:space-y-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`flex flex-col md:flex-row items-center justify-between ${isEven ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block md:w-5/12"></div>
                
                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-background bg-card z-10 flex items-center justify-center shadow-lg hidden md:flex">
                  <Icon size={20} className={step.color} />
                </div>

                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="w-full md:w-5/12"
                >
                  <div className="glass-card p-6 relative">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 md:hidden ${step.bg} ${step.color}`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                    
                    {/* Mobile connector */}
                    {idx !== steps.length - 1 && (
                      <div className="md:hidden flex justify-center mt-6">
                        <ArrowDown className="text-muted-foreground opacity-50" />
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}