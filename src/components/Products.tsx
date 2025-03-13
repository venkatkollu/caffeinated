
import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

// Product type definition
interface Product {
  id: number;
  name: string;
  origin: string;
  description: string;
  image: string;
  notes: string[];
}

// Sample products data
const products: Product[] = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    origin: "Yirgacheffe, Ethiopia",
    description: "Bright, fruity profiles with vibrant citrus and floral notes.",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    notes: ["Floral", "Citrus", "Blueberry"]
  },
  {
    id: 2,
    name: "Colombian Supremo",
    origin: "Huila, Colombia",
    description: "Sweet and full-bodied with caramel notes and a smooth finish.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    notes: ["Caramel", "Chocolate", "Citrus"]
  },
  {
    id: 3,
    name: "Sumatra Mandheling",
    origin: "Sumatra, Indonesia",
    description: "Earthy, full-bodied profile with notes of chocolate and spice.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    notes: ["Cocoa", "Cedar", "Spice"]
  }
];

const Products = () => {
  const productsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".product-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("opacity-100", "translate-y-0");
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (productsRef.current) {
      observer.observe(productsRef.current);
    }
    
    return () => {
      if (productsRef.current) {
        observer.unobserve(productsRef.current);
      }
    };
  }, []);

  return (
    <section id="products" className="py-32 px-4 bg-coffee-dark">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-light mb-2 text-white text-center">
          Our Collection
        </h2>
        <p className="text-coffee-cream/60 text-center mb-20 max-w-md mx-auto">
          Carefully selected single-origin beans from the world's premier coffee regions
        </p>
        
        <div 
          ref={productsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="product-card opacity-0 translate-y-8 transition-all duration-700 bg-coffee-medium/30 backdrop-blur-sm hover:bg-coffee-medium/40 overflow-hidden transform transition-transform hover:scale-[1.02]"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden h-72">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              
              <div className="p-8">
                <div className="mb-2">
                  <span className="text-xs tracking-wider text-coffee-gold/80 uppercase">
                    {product.origin}
                  </span>
                </div>
                <h3 className="text-xl font-serif mb-2 text-white">
                  {product.name}
                </h3>
                <p className="text-coffee-cream/70 text-sm mb-6">
                  {product.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.notes.map((note, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 text-xs bg-coffee-dark/60 text-coffee-cream/80 rounded-full"
                    >
                      {note}
                    </span>
                  ))}
                </div>
                
                <a 
                  href="#" 
                  className="inline-flex items-center text-coffee-gold hover:text-coffee-gold/80 transition-colors text-sm"
                >
                  Explore
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
