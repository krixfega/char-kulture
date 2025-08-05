import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Map, Phone, Mail, Clock, Check } from 'lucide-react';
import logo from '../assets/logo.png';

import image1 from '../assets/img/menu-01.jpg';
import image2 from '../assets/img/menu-02.jpg';
import image3 from '../assets/img/menu-03.jpg';
import image4 from '../assets/img/menu-04.jpg';
import image5 from '../assets/img/menu-05.jpg';
import image6 from '../assets/img/menu-06.jpg';


export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  // Menu items with icons
  const specialFacilities = [
    { name: "Cheese Burger", href: "#" },
    { name: "Sandwich", href: "#" },
    { name: "Panner Burger", href: "#" },
    { name: "Special Sweets", href: "#" }
  ];
  
  // Social gallery images
  const galleryImages = [
    image1, image2, image3, 
    image4, image5, image6
  ];

  return (
    <footer className="w-full  py-12 mb-0 bg-[var(--text-dark)] animate-slideUp">
      <div className="container mx-auto px-4 lg:!max-w-[1200px] 2xl:!max-w-[1600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <NavLink to="/" className="logo">
                <img src={logo} alt="Char Kulture logo" className="logo-img" />
            </NavLink>
            <p className="text-[var(--primary-bg)] mb-6 leading-relaxed">
              There cursus massa at urnaaculis estieSed aliquamellus vitae ultrs condmentum leo massamollis its estiegittis miristum.
            </p>
            <div className="flex space-x-2">
              <a href="#" className="bg-[var(--accent)] hover:bg-white text-white hover:text-[var(--accent)] p-2 rounded-full">
                <Facebook size={16} />
              </a>
              <a href="#" className="bg-[var(--accent)] hover:bg-white text-white hover:text-[var(--accent)] p-2 rounded-full">
                <Twitter size={16} />
              </a>
              <a href="#" className="bg-[var(--accent)] hover:bg-white text-white hover:text-[var(--accent)] p-2 rounded-full">
                <Instagram size={16} />
              </a>
              <a href="#" className="bg-[var(--accent)] hover:bg-white text-white hover:text-[var(--accent)] p-2 rounded-full">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Special Facilities */}
          <div>
            <h4 className="text-xl font-playball text-[var(--primary-bg)] mb-6">Special Facilities</h4>
            <div className="flex flex-col">
              {specialFacilities.map((item, index) => (
                <a 
                  key={index} 
                  href={item.href} 
                  className="text-[var(--primary-bg)] mb-3 hover:text-[var(--accent)] flex items-center"
                >
                  <span className="text-[var(--accent)] mr-2"><Check size={18} /></span>
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-xl font-playball text-[var(--primary-bg)] mb-6">Contact Us</h4>
            <div className="flex flex-col space-y-3">
              <p className="flex items-start text-[var(--primary-bg)]">
                <span className="text-[var(--accent)] mr-2 mt-1"><Map size={16} /></span>
                123 Street, New York, USA
              </p>
              <p className="flex items-start text-[var(--primary-bg)]">
                <span className="text-[var(--accent)] mr-2 mt-1"><Phone size={16} /></span>
                (+012) 3456 7890 123
              </p>
              <p className="flex items-start text-[var(--primary-bg)]">
                <span className="text-[var(--accent)] mr-2 mt-1"><Mail size={16} /></span>
                info@example.com
              </p>
              <p className="flex items-start text-[var(--primary-bg)]">
                <span className="text-[var(--accent)] mr-2 mt-1"><Clock size={16} /></span>
                26/7 Hours Service
              </p>
            </div>
          </div>

          {/* Social Gallery */}
          <div className="grid grid-cols-3 gap-2">
            {galleryImages.map((img, i) => (
                <div key={i} className="w-20 h-20 p-1 overflow-hidden rounded-full border-2 border-[var(--accent)]">
                    <img 
                        src={img}
                        alt={`Gallery ${i+1}`}
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>
            ))}
            </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-white">
            &copy; {currentYear} <span className="text-[var(--accent)] font-playball">CaterServ</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}