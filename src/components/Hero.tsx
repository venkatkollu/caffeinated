
import React, { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const parallaxRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
      
      if (textRef.current) {
        const scrollY = window.scrollY;
        const opacity = Math.max(0, 1 - scrollY / 500);
        textRef.current.style.opacity = opacity.toString();
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-coffee-dark/80 z-10"></div>
        <img
          ref={parallaxRef}
          src="https://images.unsplash.com/photo-1459755486867-b55449bb39ff?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"
          alt="Coffee beans"
          className="w-full h-full object-cover scale-110"
        />
      </div>
      
      {/* Hero content */}
      <div 
        ref={textRef}
        className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center"
      >
        <p className="text-coffee-cream/90 mb-5 tracking-[0.3em] text-sm uppercase font-sans">Since 1897</p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light mb-6 text-white max-w-4xl leading-tight">
          Artisanally Crafted <span className="text-coffee-gold">Coffee</span> Experiences
        </h1>
        <p className="max-w-md text-coffee-cream/80 leading-relaxed font-light mt-4">
          Meticulously sourced beans, expertly roasted to transform ordinary moments into extraordinary experiences.
        </p>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
        <p className="text-coffee-cream/60 text-xs tracking-widest mb-4 uppercase">Discover</p>
        <ArrowDown className="h-5 w-5 text-coffee-gold animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
