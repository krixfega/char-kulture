import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home     from './pages/Home';
import Services from './pages/Services';
import About    from './pages/About';
import Contact  from './pages/Contact';
import Gallery  from './pages/Gallery';
import Booking  from './pages/Booking';

export default function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about"    element={<About />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/gallery"  element={<Gallery />} />
          <Route path="/book"     element={<Booking />} />
        </Routes>
      </div>
    </>
  );
}