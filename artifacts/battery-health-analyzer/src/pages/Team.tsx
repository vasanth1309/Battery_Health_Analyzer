import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const team = [
  {
    name: "Alex Johnson",
    role: "AI/ML Engineer",
    initials: "AJ",
    color: "from-blue-500 to-cyan-500",
    description: "Developed the LSTM prediction models and handled data preprocessing pipelines."
  },
  {
    name: "Samantha Lee",
    role: "Frontend Developer",
    initials: "SL",
    color: "from-emerald-500 to-teal-500",
    description: "Architected the React application, implementing real-time dashboards and UI."
  },
  {
    name: "Marcus Cole",
    role: "Hardware & Data Scientist",
    initials: "MC",
    color: "from-purple-500 to-pink-500",
    description: "Managed physical battery testing rigs and collected the telemetry datasets."
  }
];

export default function Team() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Meet the <span className="text-gradient">Team</span></h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The engineering students behind the Battery Health Analyzer project.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {team.map((member, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
          >
            <Card className="h-full glass-card border-none overflow-hidden group">
              <div className="h-24 bg-secondary group-hover:bg-secondary/50 transition-colors"></div>
              <CardContent className="p-6 relative pt-0">
                <div className={`absolute -top-12 left-6 w-24 h-24 rounded-2xl border-4 border-card bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-3xl font-bold shadow-xl`}>
                  {member.initials}
                </div>
                
                <div className="pt-16">
                  <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium text-sm mb-4">{member.role}</p>
                  <p className="text-muted-foreground mb-6">
                    {member.description}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <a href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors">
                      <Github size={16} />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors">
                      <Linkedin size={16} />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors">
                      <Mail size={16} />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}