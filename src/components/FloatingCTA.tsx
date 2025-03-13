
import React, { useEffect, useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMorphed, setIsMorphed] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
      
      // Morph from circle to pill when reaching near the bottom
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPosition = scrollY + windowHeight;
      
      // Morph when reaching 80% of page
      setIsMorphed(scrollPosition > documentHeight * 0.8);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ctaRef}
      className={`fixed right-6 bottom-6 z-40 transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <button className={`bg-coffee-gold text-coffee-dark p-4 shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,177,106,0.3)] ${
        isMorphed ? "rounded-full px-5" : "rounded-full"
      }`}>
        <div className="flex items-center">
          <ShoppingBag className="h-5 w-5" />
          <span className={`transition-all duration-300 overflow-hidden ${
            isMorphed ? "max-w-32 ml-2 opacity-100" : "max-w-0 opacity-0"
          }`}>
            Shop Now
          </span>
        </div>
      </button>
    </div>
  );
};

export default FloatingCTA;
