import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Battery, ThermometerSun, Zap, 
  RotateCcw, Calendar, Activity, 
  CheckCircle, AlertTriangle, XCircle, Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const analyzeSchema = z.object({
  capacity: z.coerce.number().min(100).max(100000),
  voltage: z.coerce.number().min(1).max(100),
  temperature: z.coerce.number().min(-20).max(80),
  cycles: z.coerce.number().min(0).max(5000),
  age: z.coerce.number().min(1).max(120),
  chargingFreq: z.string().min(1)
});

type AnalyzeForm = z.infer<typeof analyzeSchema>;

interface Results {
  health: number;
  status: string;
  statusColor: string;
  statusIcon: React.ReactNode;
  remainingLife: string;
  tempStatus: string;
  cycleStatus: string;
  recommendations: string[];
}

export default function Analyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<Results | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<AnalyzeForm>({
    resolver: zodResolver(analyzeSchema),
    defaultValues: {
      capacity: 4000,
      voltage: 3.7,
      temperature: 25,
      cycles: 100,
      age: 12,
      chargingFreq: "daily"
    }
  });

  const onSubmit = (data: AnalyzeForm) => {
    setIsAnalyzing(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      // Calculate health formula
      let healthReduction = 0;
      
      // Cycle impact
      healthReduction += (data.cycles / 10) * 0.5;
      
      // Temp impact
      if (data.temperature > 35) {
        healthReduction += (data.temperature - 35) * 2;
      } else if (data.temperature < 0) {
        healthReduction += (0 - data.temperature) * 1;
      }
      
      // Age impact
      healthReduction += (data.age / 12) * 3;
      
      // Voltage impact
      if (data.voltage < 3.5) {
        healthReduction += 10;
      }

      let health = 100 - healthReduction;
      health = Math.max(0, Math.min(100, health)); // Clamp 0-100
      
      // Determine status
      let status = "";
      let statusColor = "";
      let statusIcon = null;
      
      if (health >= 95) {
        status = "Excellent";
        statusColor = "text-emerald-500";
        statusIcon = <CheckCircle className="text-emerald-500" size={24} />;
      } else if (health >= 80) {
        status = "Good";
        statusColor = "text-blue-500";
        statusIcon = <CheckCircle className="text-blue-500" size={24} />;
      } else if (health >= 60) {
        status = "Average";
        statusColor = "text-yellow-500";
        statusIcon = <AlertTriangle className="text-yellow-500" size={24} />;
      } else if (health >= 40) {
        status = "Poor";
        statusColor = "text-orange-500";
        statusIcon = <AlertTriangle className="text-orange-500" size={24} />;
      } else {
        status = "Replace Soon";
        statusColor = "text-red-500";
        statusIcon = <XCircle className="text-red-500" size={24} />;
      }
      
      // Remaining life estimate
      const remainingMonths = Math.max(0, Math.round(((health - 40) / 100) * 48)); // Assuming 48 months typical life
      const remainingLife = remainingMonths > 12 
        ? `${Math.floor(remainingMonths/12)} yrs ${remainingMonths%12} mos` 
        : `${remainingMonths} months`;

      // Gen recommendations
      const recs = [];
      if (data.temperature > 35) recs.push("Warning: High operating temperature detected. Keep device cool.");
      if (data.chargingFreq === "multiple_daily") recs.push("Reduce charging frequency to minimize cycle stress.");
      if (data.voltage < 3.5) recs.push("Low resting voltage indicates cell degradation. Monitor closely.");
      if (recs.length === 0) recs.push("Battery is operating optimally. Continue current usage habits.");

      setResults({
        health: Math.round(health),
        status,
        statusColor,
        statusIcon,
        remainingLife,
        tempStatus: data.temperature > 35 ? "High" : data.temperature < 0 ? "Low" : "Optimal",
        cycleStatus: data.cycles > 500 ? "High wear" : "Normal",
        recommendations: recs
      });
      
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Diagnostic <span className="text-gradient">Analyzer</span></h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Input current telemetry data to run our predictive ML model and get an instant State of Health (SOH) evaluation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-5">
          <Card className="border-border bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity size={20} className="text-primary"/> 
                Input Telemetry
              </CardTitle>
              <CardDescription>Enter parameters for analysis.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Battery size={14} className="text-muted-foreground" /> Design Capacity (mAh)
                  </label>
                  <input 
                    {...register("capacity")} 
                    className="w-full p-2 rounded-md bg-background border border-input focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                  {errors.capacity && <span className="text-xs text-destructive">{errors.capacity.message}</span>}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Zap size={14} className="text-muted-foreground" /> Current Voltage (V)
                  </label>
                  <input 
                    {...register("voltage")} 
                    step="0.1"
                    className="w-full p-2 rounded-md bg-background border border-input focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                  {errors.voltage && <span className="text-xs text-destructive">{errors.voltage.message}</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <ThermometerSun size={14} className="text-muted-foreground" /> Temp (°C)
                    </label>
                    <input 
                      {...register("temperature")} 
                      className="w-full p-2 rounded-md bg-background border border-input focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <RotateCcw size={14} className="text-muted-foreground" /> Cycles
                    </label>
                    <input 
                      {...register("cycles")} 
                      className="w-full p-2 rounded-md bg-background border border-input focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Calendar size={14} className="text-muted-foreground" /> Age (Months)
                    </label>
                    <input 
                      {...register("age")} 
                      className="w-full p-2 rounded-md bg-background border border-input focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Charging Freq</label>
                    <select 
                      {...register("chargingFreq")}
                      className="w-full p-2 rounded-md bg-background border border-input focus:ring-2 focus:ring-primary outline-none transition-all"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="daily">Daily</option>
                      <option value="multiple_daily">Multiple times/day</option>
                    </select>
                  </div>
                </div>

                <Button type="submit" className="w-full mt-4" disabled={isAnalyzing}>
                  {isAnalyzing ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-background border-t-transparent animate-spin"></div>
                      Processing AI Model...
                    </span>
                  ) : (
                    "Run Analysis"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-7">
          <Card className="h-full border-border bg-card/30 backdrop-blur relative overflow-hidden">
            {!results && !isAnalyzing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <Activity size={48} className="mb-4 opacity-20" />
                <p>Enter data and run analysis to view results</p>
              </div>
            )}
            
            {isAnalyzing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm z-10">
                <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-4"></div>
                <div className="text-lg font-medium animate-pulse">Running Neural Network Inference...</div>
              </div>
            )}

            <AnimatePresence>
              {results && !isAnalyzing && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 md:p-8"
                >
                  <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                    {/* Radial Progress */}
                    <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-secondary" />
                        <motion.circle 
                          initial={{ strokeDashoffset: 283 }}
                          animate={{ strokeDashoffset: 283 - (283 * results.health) / 100 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" 
                          strokeLinecap="round" 
                          strokeDasharray="283"
                          className={results.statusColor} 
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center text-center">
                        <span className="text-4xl font-bold">{results.health}%</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-widest">Health</span>
                      </div>
                    </div>

                    <div className="flex-grow text-center md:text-left space-y-4 w-full">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Overall Status</div>
                        <div className={`text-3xl font-bold flex items-center justify-center md:justify-start gap-2 ${results.statusColor}`}>
                          {results.statusIcon} {results.status}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-background p-3 rounded-lg border border-border">
                          <div className="text-xs text-muted-foreground mb-1">Est. Remaining Life</div>
                          <div className="font-semibold">{results.remainingLife}</div>
                        </div>
                        <div className="bg-background p-3 rounded-lg border border-border">
                          <div className="text-xs text-muted-foreground mb-1">Thermal State</div>
                          <div className="font-semibold">{results.tempStatus}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2 border-b border-border pb-2">
                      <Info size={18} className="text-primary"/> AI Recommendations
                    </h3>
                    <ul className="space-y-3">
                      {results.recommendations.map((rec, idx) => (
                        <motion.li 
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 + 0.5 }}
                          className="flex items-start gap-3 bg-secondary/30 p-3 rounded-lg"
                        >
                          <CheckCircle className="text-primary mt-0.5 shrink-0" size={16} />
                          <span className="text-sm">{rec}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </div>
  );
}