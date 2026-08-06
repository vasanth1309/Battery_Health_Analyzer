import React from 'react';
import { Link } from 'wouter';
import { BatteryCharging, Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
                <BatteryCharging size={20} />
              </div>
              <span className="text-lg font-bold tracking-tight">BHA Core</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              Advanced AI-powered battery monitoring and health prediction system for modern engineering.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors"><Github size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Mail size={20} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Navigation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Project</Link></li>
              <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="/workflow" className="hover:text-primary transition-colors">Workflow</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/analyzer" className="hover:text-primary transition-colors">Battery Analyzer</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Live Dashboard</Link></li>
              <li><Link href="/insights" className="hover:text-primary transition-colors">AI Insights</Link></li>
              <li><Link href="/applications" className="hover:text-primary transition-colors">Use Cases</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/team" className="hover:text-primary transition-colors">Meet the Team</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Get in Touch</Link></li>
              <li className="pt-2 text-xs opacity-60">Final Year Engineering Project © 2024</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}