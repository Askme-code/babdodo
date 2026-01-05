
"use client";

import { useForm, ValidationError } from "@formspree/react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

const formspreeId = "xqeaapry";

function ContactFormComponent() {
  const { toast } = useToast();
  const [state, handleSubmit] = useForm(formspreeId!);

  useEffect(() => {
    if (state.succeeded) {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We will get back to you shortly.",
      });
    }
    if (state.errors && !state.succeeded) {
        const allErrors = state.errors.getAllFieldErrors();
        if (allErrors.length > 0) {
             toast({
                title: "Submission Error",
                description: "Please check the form for errors and try again.",
                variant: "destructive",
            });
        }
    }
  }, [state.succeeded, state.errors, toast]);

  return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" placeholder="John Doe" />
            <ValidationError prefix="Name" field="name" errors={state.errors} className="text-sm font-medium text-destructive" />
        </div>
        
        <div className="space-y-2">
             <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" name="email" placeholder="you@example.com" />
            <ValidationError prefix="Email" field="email" errors={state.errors} className="text-sm font-medium text-destructive" />
        </div>

        <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp Number</Label>
            <Input id="whatsapp" name="whatsapp" placeholder="+1 555 123 4567" />
            <ValidationError prefix="WhatsApp" field="whatsapp" errors={state.errors} className="text-sm font-medium text-destructive" />
        </div>

        <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" placeholder="Inquiry about Serengeti Safari" />
            <ValidationError prefix="Subject" field="subject" errors={state.errors} className="text-sm font-medium text-destructive" />
        </div>

        <div className="space-y-2">
            <Label htmlFor="message">Your Message</Label>
            <Textarea id="message" name="message" placeholder="Tell us about your dream adventure..." className="min-h-[120px]" />
            <ValidationError prefix="Message" field="message" errors={state.errors} className="text-sm font-medium text-destructive" />
        </div>
        
        <Button type="submit" className="w-full" disabled={state.submitting}>
          {state.submitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
  );
}

export default function ContactForm() {
  if (!formspreeId) {
    return <p className="text-destructive text-sm">The contact form is currently unavailable. Please contact us directly via email or phone.</p>;
  }
  return <ContactFormComponent />;
}
