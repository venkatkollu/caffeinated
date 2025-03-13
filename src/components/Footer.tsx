
import React from "react";
import { Coffee, Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-coffee-dark pt-20 pb-8 px-4 border-t border-coffee-gold/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Coffee className="h-5 w-5 text-coffee-gold" />
              <h3 className="font-serif text-lg text-white">
                Caffeinated
              </h3>
            </div>
            <p className="text-coffee-cream/60 mb-6 text-sm max-w-xs leading-relaxed">
              Crafting exceptional coffee experiences since 1897. From bean to cup, we celebrate the artistry of coffee.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-coffee-cream/40 hover:text-coffee-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-coffee-cream/40 hover:text-coffee-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-coffee-cream/40 hover:text-coffee-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-sm uppercase tracking-wider text-coffee-gold/70 mb-6">
              Explore
            </h3>
            <ul className="space-y-3">
              {["Products", "Our Story", "Brewing Guide", "Sustainability", "Gift Cards"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-coffee-cream/60 hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-serif text-sm uppercase tracking-wider text-coffee-gold/70 mb-6">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="text-coffee-cream/60 text-sm">
                123 Coffee Lane, Brewville
              </li>
              <li className="text-coffee-cream/60 text-sm">
                hello@caffeinated.com
              </li>
              <li className="text-coffee-cream/60 text-sm">
                +1 (555) 123-4567
              </li>
            </ul>
          </div>
          
          {/* Hours */}
          <div>
            <h3 className="font-serif text-sm uppercase tracking-wider text-coffee-gold/70 mb-6">
              Hours
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-coffee-cream/60 text-sm">Mon - Fri</span>
                <span className="text-white text-sm">8AM - 6PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-coffee-cream/60 text-sm">Saturday</span>
                <span className="text-white text-sm">9AM - 7PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-coffee-cream/60 text-sm">Sunday</span>
                <span className="text-white text-sm">10AM - 5PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-coffee-gold/5 text-center text-coffee-cream/40 text-xs">
          <p>© {new Date().getFullYear()} Caffeinated. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
