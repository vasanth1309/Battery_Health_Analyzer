import React from 'react';
import { motion } from 'framer-motion';
import { 
  Battery, Activity, Thermometer, Zap, 
  BarChart4, Clock, Power, Shield, 
  RefreshCcw, Lightbulb
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Battery,
    title: "Battery Health %",
    description: "Real-time State of Health (SOH) calculation comparing current capacity against factory design specifications.",
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    icon: RefreshCcw,
    title: "Charge Cycle Monitoring",
    description: "Accurate counting of full and partial charge cycles with depth-of-discharge tracking.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  {
    icon: Thermometer,
    title: "Temperature Analysis",
    description: "Thermal monitoring to detect overheating events that drastically accelerate chemical degradation.",
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  {
    icon: Zap,
    title: "Voltage Monitoring",
    description: "Detection of abnormal voltage sags under load, indicating increased internal resistance.",
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    icon: BarChart4,
    title: "Capacity Prediction",
    description: "LSTM-based machine learning forecasting of future capacity degradation curves.",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10"
  },
  {
    icon: Clock,
    title: "Remaining Useful Life",
    description: "Estimation of exact time (or cycles) remaining before the battery drops below critical 80% threshold.",
    color: "text-rose-500",
    bg: "bg-rose-500/10"
  },
  {
    icon: Power,
    title: "Fast Charging Analysis",
    description: "Quantifies the exact degradation penalty incurred by frequent high-wattage fast charging.",
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
  {
    icon: Activity,
    title: "Usage Statistics",
    description: "Breakdown of power draw by application, screen, or hardware component to optimize efficiency.",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10"
  },
  {
    icon: Shield,
    title: "Safety Health Score",
    description: "Aggregated safety metric warning against swelling, thermal runaway risks, or short circuits.",
    color: "text-green-500",
    bg: "bg-green-500/10"
  },
  {
    icon: Lightbulb,
    title: "AI Recommendations",
    description: "Personalized, actionable advice to adjust charging habits and extend battery lifespan.",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10"
  }
];

export default function Features() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Platform <span className="text-gradient">Capabilities</span></h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive suite of analytical tools designed to extract every metric from battery telemetry data.
        </p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div key={index} variants={item} whileHover={{ y: -5 }}>
              <Card className="h-full border-border bg-card/30 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${feature.bg} ${feature.color}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}