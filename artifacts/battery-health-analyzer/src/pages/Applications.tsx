import React from 'react';
import { motion } from 'framer-motion';
import { Car, Smartphone, Laptop, Sun, Server, Radio, Factory } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const applications = [
  {
    icon: Car,
    title: "Electric Vehicles (EVs)",
    description: "Prevent sudden range drops and catastrophic battery failures in automotive fleets. Optimize charging scheduling for logistics companies."
  },
  {
    icon: Smartphone,
    title: "Consumer Electronics",
    description: "Embed predictive models in OS firmware to extend smartphone lifespan, reducing warranty claims and e-waste."
  },
  {
    icon: Laptop,
    title: "Laptops & Portables",
    description: "Intelligent charge capping and thermal management for high-performance workstations that are frequently plugged in."
  },
  {
    icon: Sun,
    title: "Solar Storage",
    description: "Monitor massive home and commercial battery walls to ensure they can handle grid load shifting effectively over 15+ years."
  },
  {
    icon: Server,
    title: "Data Center UPS",
    description: "Uninterruptible Power Supplies must never fail. Predictive analysis ensures backup batteries are healthy before grid outages occur."
  },
  {
    icon: Radio,
    title: "IoT Edge Devices",
    description: "Maximize the lifespan of remote sensors where battery replacement is physically difficult or economically unviable."
  },
  {
    icon: Factory,
    title: "Industrial Equipment",
    description: "Monitor electric forklifts and warehouse robotics to schedule maintenance without disrupting operational shifts."
  }
];

export default function Applications() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Real-World <span className="text-gradient">Applications</span></h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Our AI architecture is agnostic to battery chemistry and scale, making it adaptable to nearly any industry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {applications.map((app, idx) => {
          const Icon = app.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-border bg-card/40 hover:bg-card/80 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{app.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {app.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}