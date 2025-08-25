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
    { name: "Classic Jollof", href: "#" },
    { name: "Naija Herb Ragu Linguine", href: "#" },
    { name: "Authentic Traditional Fried Rice", href: "#" },
    { name: "Shakshuka & Naan Bread", href: "#" }
  ];
  
  // Social gallery images
  const galleryImages = [
    image1, image2, image3, 
    image4, image5, image6
  ];

  // Add this component in your Footer.jsx file
  const TikTokIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.349-2.019-1.349-3.338h-3.064c0 .21-.011.42-.032.628-.021.209-.053.417-.095.623v9.799c0 2.106-1.714 3.82-3.82 3.82-2.106 0-3.82-1.714-3.82-3.82s1.714-3.82 3.82-3.82c.398 0 .781.061 1.142.174V5.339a6.890 6.890 0 0 0-1.142-.095C5.714 5.244 2.5 8.458 2.5 12.225s3.214 6.981 6.981 6.981 6.981-3.214 6.981-6.981V8.901a9.064 9.064 0 0 0 5.298 1.696V7.533a5.124 5.124 0 0 1-1.439-1.971Z"/>
    </svg>
  );

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
              Where culinary art meets culture. Join the Char Tribe to experience a piece of home!
            </p>
            <div className="flex space-x-2">
              {/* <a href="#" className="bg-[var(--accent)] hover:bg-white text-white hover:text-[var(--accent)] p-2 rounded-full">
                <Facebook size={16} />
              </a>
              <a href="#" className="bg-[var(--accent)] hover:bg-white text-white hover:text-[var(--accent)] p-2 rounded-full">
                <Twitter size={16} />
              </a> */}
              <a href="https://www.tiktok.com/@char.kulture?_t=ZS-8zAfrFcFdJI&_r=1" className="bg-[var(--accent)] hover:bg-white text-white hover:text-[var(--accent)] p-2 rounded-full">
                <TikTokIcon size={16} />
              </a>
              <a href="https://www.instagram.com/char_kulture?igsh=MmF5NzZka3VmcjNk" className="bg-[var(--accent)] hover:bg-white text-white hover:text-[var(--accent)] p-2 rounded-full">
                <Instagram size={16} />
              </a>
              {/* <a href="#" className="bg-[var(--accent)] hover:bg-white text-white hover:text-[var(--accent)] p-2 rounded-full">
                <Linkedin size={16} />
              </a> */}
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
                Gbagada, Lagos, Nigeria.
              </p>
              <p className="flex items-start text-[var(--primary-bg)]">
                <span className="text-[var(--accent)] mr-2 mt-1"><Phone size={16} /></span>
                (+234) 903 285 1433
              </p>
              <p className="flex items-start text-[var(--primary-bg)]">
                <span className="text-[var(--accent)] mr-2 mt-1"><Mail size={16} /></span>
                info@charkulture.com
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
            &copy; {currentYear} <span className="text-[var(--accent)] font-playball">Char Kulture</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}