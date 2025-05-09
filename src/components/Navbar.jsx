import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: '/',       label: 'Home'    },
    { to: '/services', label: 'Services' },
    { to: '/about',    label: 'About'   },
    { to: '/contact',  label: 'Contact' },
    { to: '/gallery',  label: 'Gallery' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
      <NavLink to="/" className="logo" onClick={() => setIsOpen(false)}>
          <img src={logo} alt="Char Kulture logo" className="logo-img" />
       </NavLink>

        {/* HAMBURGER TOGGLE */}
        <div
          className={isOpen ? 'menu-icon open' : 'menu-icon'}
          onClick={() => setIsOpen(o => !o)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </div>

        {/* NAV LINKS */}
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
                onClick={() => setIsOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink
              to="/book"
              className="btn-cta"
              onClick={() => setIsOpen(false)}
            >
              Book Now
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}