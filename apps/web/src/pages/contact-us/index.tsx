'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Frown, Mail, MapPin, MessageSquare, Send, Smile } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  subject: z.string().min(5, {
    message: 'Subject must be at least 5 characters.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
  mood: z.enum(['happy', 'neutral', 'sad'], {
    required_error: 'Please select your current mood.',
  }),
});

export default function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      mood: 'neutral',
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onSubmit(_values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfetti(true);

      toast.success('Message sent successfully! 🎉', {
        description: "We'll get back to you as soon as possible.",
      });

      form.reset();

      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }, 1500);
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {showConfetti && <Confetti />}

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Get in Touch</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We'd love to hear from you! Drop us a message and we'll get back to you!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-lg border-2 border-primary/10 hover:border-primary/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Send us a message
            </CardTitle>
            <CardDescription>
              Fill out the form below and we'll respond as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="What's this about?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us what's on your mind..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How are you feeling today?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="happy" id="happy" />
                            <Label
                              htmlFor="happy"
                              className="flex items-center gap-1 cursor-pointer"
                            >
                              <Smile className="h-5 w-5 text-green-500" />
                              Happy
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="neutral" id="neutral" />
                            <Label htmlFor="neutral" className="cursor-pointer">
                              Neutral
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sad" id="sad" />
                            <Label htmlFor="sad" className="flex items-center gap-1 cursor-pointer">
                              <Frown className="h-5 w-5 text-red-500" />
                              Sad
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full mt-10" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="animate-pulse">Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="shadow-lg border-2 border-primary/10 hover:border-primary/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Visit our office
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative rounded-lg overflow-hidden border-2 border-muted mb-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.8833626654427!2d-79.35116672409501!3d43.79603324318156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d31babbf5ce7%3A0x5812aa25d9fb9912!2sSeneca%20Polytechnic%20Newnham%20Campus!5e0!3m2!1szh-TW!2sca!4v1742056567427!5m2!1szh-TW!2sca"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <p className="font-medium">1750 Finch Ave E</p>
              <p className="text-muted-foreground">North York, ON M2J 2X5</p>
              <p className="text-muted-foreground">Canada</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-2 border-primary/10 hover:border-primary/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Email us directly
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">General Inquiries</p>
              <p className="text-primary hover:underline">
                <a href="mailto:hello@example.com">hello@example.com</a>
              </p>

              <div className="h-4"></div>

              <p className="font-medium">Support</p>
              <p className="text-primary hover:underline">
                <a href="mailto:support@example.com">support@example.com</a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}

// Simple confetti animation component
function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            top: '-10%',
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}
    </div>
  );
}
