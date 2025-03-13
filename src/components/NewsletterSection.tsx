
import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Coffee } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      toast.success("Thank you for subscribing!", {
        description: "You'll receive our coffee updates soon.",
        icon: <Coffee className="h-5 w-5 text-coffee-gold" />,
      });
    }, 1500);
  };

  return (
    <section className="relative py-32 px-4 bg-coffee-dark">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497935586047-9395ee1e9fc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          alt="Coffee plantation"
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      
      <div 
        ref={containerRef}
        className="container mx-auto relative z-10 max-w-md"
      >
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-white">
            Join Our Journey
          </h2>
          <p className="text-coffee-cream/60 mb-10 text-sm">
            Subscribe for exclusive offers, brewing tips, and early access to our limited-edition roasts.
          </p>
          
          <form 
            onSubmit={handleSubmit}
            className="flex gap-4"
          >
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent border-coffee-gold/20 text-coffee-cream placeholder:text-coffee-cream/40 focus-visible:ring-coffee-gold/50"
            />
            
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="bg-coffee-gold text-coffee-dark hover:bg-coffee-gold/90"
            >
              {isSubmitting ? "..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
