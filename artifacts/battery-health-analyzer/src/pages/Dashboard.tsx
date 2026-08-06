import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Battery, BatteryCharging, Zap, Thermometer, Clock, RefreshCcw } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const degradationData = [
  { month: '0', capacity: 100 },
  { month: '6', capacity: 98.2 },
  { month: '12', capacity: 95.5 },
  { month: '18', capacity: 91.8 },
  { month: '24', capacity: 88.0 },
  { month: '30', capacity: 85.1 },
  { month: '36', capacity: 81.4 },
];

const usageData = [
  { name: 'Hardware (CPU/GPU)', value: 35 },
  { name: 'Display', value: 25 },
  { name: 'Network/Radio', value: 20 },
  { name: 'Background Apps', value: 15 },
  { name: 'Sensors', value: 5 },
];

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Telemetry Dashboard</h1>
          <p className="text-muted-foreground">Real-time battery monitoring node: BATT-0842X</p>
        </div>
        <div className="flex items-center gap-2 bg-secondary/50 p-1.5 rounded-lg border border-border">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-md text-sm font-medium shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live Sync
          </div>
          <Button variant="ghost" size="sm" className="h-8"><RefreshCcw size={14} className="mr-2"/> Refresh</Button>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[
          { label: "Current Health", value: "81%", icon: Battery, color: "text-blue-500" },
          { label: "Charge Level", value: "64%", icon: BatteryCharging, color: "text-emerald-500" },
          { label: "Temperature", value: "34°C", icon: Thermometer, color: "text-orange-500" },
          { label: "Voltage", value: "3.82V", icon: Zap, color: "text-purple-500" },
          { label: "Cycles", value: "342", icon: RefreshCcw, color: "text-cyan-500" },
          { label: "Est. Time Left", value: "14h 20m", icon: Clock, color: "text-rose-500" }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="bg-card/40 border-border shadow-sm">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Icon size={20} className={`${stat.color} mb-2`} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Main Chart */}
        <Card className="lg:col-span-2 bg-card/40 border-border">
          <CardHeader>
            <CardTitle className="text-lg">Degradation Curve (36 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={degradationData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis domain={[70, 100]} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="capacity" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ r: 4, fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="bg-card/40 border-border">
          <CardHeader>
            <CardTitle className="text-lg">Power Draw Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px] w-full flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={usageData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {usageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {usageData.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}