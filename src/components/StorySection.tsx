
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Story timeline items
const timelineItems = [
  {
    year: "1897",
    title: "Our Beginnings",
    description: "Founded by Giovanni Rinaldi, a passionate craftsman from Italy, our journey began with a small roastery.",
    image: "https://images.unsplash.com/photo-1518057111178-44a106bad636?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "1923",
    title: "Global Exploration",
    description: "The second generation expanded our network, traveling to remote coffee-growing regions to source the finest beans.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "Today",
    title: "Artisanal Excellence",
    description: "Now in our fourth generation, we continue to craft premium coffee experiences, blending heritage with innovation.",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const StorySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  
  // Update element positions on resize or scroll
  useEffect(() => {
    const handleResize = () => {
      if (sectionRef.current) {
        setElementTop(sectionRef.current.offsetTop);
        setClientHeight(window.innerHeight);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, []);
  
  // Hook to track scroll progress within section
  const useScrollProgress = () => {
    const { scrollY } = useScroll();
    const scrollProgress = useTransform(
      scrollY, 
      [elementTop, elementTop + (sectionRef.current?.offsetHeight || 0) - clientHeight], 
      [0, 1]
    );
    return scrollProgress;
  };
  
  const scrollProgress = useScrollProgress();

  // Timeline item component with parallax and animations
  const TimelineItem = ({ item, index, progress }: { 
    item: typeof timelineItems[0], 
    index: number, 
    progress: number 
  }) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      if (itemRef.current) {
        observer.observe(itemRef.current);
      }
      
      return () => {
        if (itemRef.current) {
          observer.unobserve(itemRef.current);
        }
      };
    }, []);
    
    // Even items come from left, odd from right
    const direction = index % 2 === 0 ? -1 : 1;
    const delay = index * 0.2;
    
    return (
      <div
        ref={itemRef}
        className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center md:items-start gap-12 mb-40 opacity-0 ${isVisible ? 'animate-fade-in' : ''}`}
        style={{ animationDelay: `${delay}s` }}
      >
        <div className="w-full md:w-1/2">
          <div className="relative mb-6 transform transition-all duration-1000" 
               style={{ 
                 transform: `translateX(${isVisible ? '0px' : `${direction * 50}px`})`,
                 opacity: isVisible ? 1 : 0,
                 transition: 'transform 1.2s cubic-bezier(0.17, 0.55, 0.55, 1), opacity 1.2s cubic-bezier(0.17, 0.55, 0.55, 1)',
                 transitionDelay: `${delay}s`
               }}>
            <span className="inline-block text-4xl font-serif text-coffee-gold mb-3">
              {item.year}
            </span>
            <h3 className="text-3xl font-serif font-light mb-4 text-white">
              {item.title}
            </h3>
            <p className="text-coffee-cream/70 max-w-md text-lg">
              {item.description}
            </p>
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <div className="relative overflow-hidden rounded-lg">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-all duration-1000"
                style={{ 
                  transform: `scale(${isVisible ? 1.0 : 1.1}) translateY(${isVisible ? '0%' : '5%'})`,
                  filter: `sepia(${Math.max(0, 80 - (isVisible ? 80 : 0))}%)`,
                  transition: 'transform 1.5s cubic-bezier(0.17, 0.55, 0.55, 1), filter 2s cubic-bezier(0.17, 0.55, 0.55, 1)',
                  transitionDelay: `${delay + 0.3}s`
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/80 to-transparent opacity-60"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="story"
      ref={sectionRef}
      className="py-32 px-4 bg-coffee-dark relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-[-10%] w-56 h-56 rounded-full bg-coffee-gold/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-[-10%] w-72 h-72 rounded-full bg-coffee-gold/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div 
          ref={headingRef} 
          className="text-center mb-32 transform transition-all duration-1000"
          style={{
            opacity: scrollProgress.get() > 0.05 ? 1 : 0,
            transform: `translateY(${scrollProgress.get() > 0.05 ? '0px' : '50px'})`,
          }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4 text-white">
            Our Heritage
          </h2>
          <div className="h-0.5 w-24 bg-coffee-gold/50 mx-auto mb-8"></div>
          <p className="text-coffee-cream/60 text-center max-w-lg mx-auto text-lg">
            A tradition of excellence spanning generations, crafted with passion in every cup
          </p>
        </div>
        
        <div className="space-y-0">
          {timelineItems.map((item, index) => (
            <TimelineItem 
              key={index} 
              item={item} 
              index={index}
              progress={scrollProgress.get()}
            />
          ))}
        </div>
        
        <div className="text-center mt-24 opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="inline-block px-8 py-4 border border-coffee-gold/30 rounded-full text-coffee-gold hover:bg-coffee-gold/10 transition-colors cursor-pointer">
            <span className="text-sm uppercase tracking-widest">Discover Our Process</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
