
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Coffee, ShoppingBag } from "lucide-react";

const Navbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-coffee-dark/80 backdrop-blur-md">
      <div 
        className="h-0.5 bg-coffee-gold transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <div className="container mx-auto flex items-center justify-between py-5">
        <div className="flex items-center gap-3">
          <Coffee className="h-6 w-6 text-coffee-gold" />
          <h1 className="text-xl font-serif font-medium text-white">Caffeinated</h1>
        </div>
        
        <ul className="hidden md:flex space-x-12">
          {["Products", "Story", "Brew", "Testimonials"].map((item) => (
            <li key={item} className="font-sans text-sm tracking-wide text-coffee-cream/90 hover:text-coffee-gold transition-colors">
              <a href={`#${item.toLowerCase()}`}>{item}</a>
            </li>
          ))}
        </ul>
        
        <Button className="bg-transparent border border-coffee-gold text-coffee-gold hover:bg-coffee-gold/10 rounded-full px-5 py-2 h-auto text-sm">
          <ShoppingBag className="mr-2 h-4 w-4" />
          Shop
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
