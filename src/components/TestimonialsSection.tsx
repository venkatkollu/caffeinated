
import React, { useEffect, useRef } from "react";
import { Star } from "lucide-react";

// Testimonial type definition
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

// Sample testimonials data
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Coffee Enthusiast",
    content: "The Ethiopian Yirgacheffe completely transformed my morning routine. The fruity notes and bright acidity make each cup a truly special experience.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Café Owner",
    content: "As a café owner, I've tried countless coffee beans. This Colombian Supremo has become our signature blend - customers can't get enough of its rich caramel notes.",
    rating: 5
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Barista",
    content: "The Sumatra Mandheling creates the most velvety espresso. The earthy, chocolatey profile gives our signature drinks incredible depth.",
    rating: 4
  }
];

const TestimonialsSection = () => {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const testimonialsItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!testimonialsRef.current) return;
      
      testimonialsItemRefs.current.forEach((testimonial, index) => {
        if (!testimonial) return;
        
        const rect = testimonial.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        
        if (isVisible) {
          // Gradually reduce blur based on visibility
          const blurValue = Math.max(0, 5 - ((window.innerHeight * 0.8 - rect.top) / 200));
          testimonial.style.backdropFilter = `blur(${blurValue}px)`;
          testimonial.style.opacity = `${1 - (blurValue / 5)}`;
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="testimonials" className="py-32 px-4 bg-coffee-dark">
      <div 
        ref={testimonialsRef}
        className="container mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-serif font-light mb-2 text-white text-center">
          From Our Community
        </h2>
        <p className="text-coffee-cream/60 text-center mb-20 max-w-md mx-auto">
          The voices of our passionate coffee enthusiasts
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={el => testimonialsItemRefs.current[index] = el}
              className="bg-coffee-medium/10 backdrop-blur-[5px] p-8 opacity-0 transition-all duration-500"
            >
              <div className="flex mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating 
                      ? "text-coffee-gold fill-coffee-gold" 
                      : "text-coffee-gold/30"
                    }`}
                  />
                ))}
              </div>
              
              <p className="text-coffee-cream mb-6 text-sm leading-relaxed italic">
                "{testimonial.content}"
              </p>
              
              <div>
                <h3 className="font-medium text-white text-sm">
                  {testimonial.name}
                </h3>
                <p className="text-xs text-coffee-cream/60">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
