import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = (data: ContactForm) => {
    return new Promise(resolve => {
      setTimeout(() => {
        setIsSubmitted(true);
        resolve(true);
      }, 1000);
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in <span className="text-gradient">Touch</span></h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Interested in our project? Have questions about the AI model? Reach out to the team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card className="h-full border-border bg-card/40">
            <CardContent className="p-8 space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <p className="text-muted-foreground mb-8">
                  This project was developed as a final year engineering submission. We are open to feedback, collaboration, and academic inquiries.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-muted-foreground">contact@bha-project.edu</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-accent/10 text-accent shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/10 text-purple-500 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">University Location</h4>
                    <p className="text-muted-foreground">Engineering Building, Room 402<br/>University Campus, CA 90210</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full border-border bg-card/40 backdrop-blur">
            <CardContent className="p-8">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-2">
                    <Send size={32} />
                  </div>
                  <h3 className="text-2xl font-bold">Message Sent!</h3>
                  <p className="text-muted-foreground">Thank you for reaching out. We'll get back to you shortly.</p>
                  <Button variant="outline" onClick={() => setIsSubmitted(false)} className="mt-4">
                    Send Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <input 
                      {...register("name")}
                      className="w-full p-3 rounded-md bg-background border border-input focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder="John Doe"
                    />
                    {errors.name && <span className="text-xs text-destructive">{errors.name.message}</span>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input 
                      {...register("email")}
                      className="w-full p-3 rounded-md bg-background border border-input focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder="john@example.com"
                    />
                    {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <input 
                      {...register("subject")}
                      className="w-full p-3 rounded-md bg-background border border-input focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder="Project Inquiry"
                    />
                    {errors.subject && <span className="text-xs text-destructive">{errors.subject.message}</span>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea 
                      {...register("message")}
                      rows={4}
                      className="w-full p-3 rounded-md bg-background border border-input focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                    {errors.message && <span className="text-xs text-destructive">{errors.message.message}</span>}
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}