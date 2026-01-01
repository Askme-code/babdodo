
"use client";

import * as React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const formspreeId = "xqeaapry";

function QuoteFormComponent() {
  const { toast } = useToast();
  const [state, handleSubmit] = useForm(formspreeId!);
  const [date, setDate] = React.useState<Date>()

  useEffect(() => {
    if (state.succeeded) {
      toast({
        title: "Quote Request Sent!",
        description: "Thank you for your interest. We will get back to you shortly.",
      });
      // Optionally reset the form fields
      setDate(undefined);
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Your Name" />
              <ValidationError prefix="Name" field="name" errors={state.errors} className="text-xs font-medium text-destructive" />
          </div>
          <div className="space-y-1">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" name="email" placeholder="you@example.com" />
              <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs font-medium text-destructive" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input id="whatsapp" name="whatsapp" placeholder="+1 (555) 123-4567" />
              <ValidationError prefix="WhatsApp" field="whatsapp" errors={state.errors} className="text-xs font-medium text-destructive" />
          </div>
          <div className="space-y-1">
              <Label htmlFor="date">Select Date</Label>
              <Popover>
                  <PopoverTrigger asChild>
                  <Button
                      variant={"outline"}
                      className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                      )}
                  >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                  <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                  />
                  <input type="hidden" name="date" value={date ? format(date, 'yyyy-MM-dd') : ''} />
                  </PopoverContent>
              </Popover>
              <ValidationError prefix="Date" field="date" errors={state.errors} className="text-xs font-medium text-destructive" />
          </div>
        </div>

        <div className="space-y-1">
            <Label htmlFor="message">Write your message</Label>
            <Textarea id="message" name="message" placeholder="I'm interested in a 5-day safari..." className="min-h-[80px]" />
            <ValidationError prefix="Message" field="message" errors={state.errors} className="text-xs font-medium text-destructive" />
        </div>
        
        <Button type="submit" className="w-full" disabled={state.submitting}>
          {state.submitting ? "Sending..." : "Send"}
        </Button>
      </form>
  );
}


export default function QuoteForm() {
  if (!formspreeId) {
    return <p className="text-destructive text-sm">Quote form is currently unavailable. Please contact us directly.</p>;
  }
  return <QuoteFormComponent />;
}
