import { motion } from 'framer-motion';
import { Calendar, Clock, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import HeroSection from '../components/Hero';
import BookingForm from '../components/Booking';
import Footer from '../components/Footer';

// Import actual images
import bookingHero from '../assets/img/booking-hero.jpg';

const Booking = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      info: '+234 (0) 123 456 7890',
      subInfo: 'Available 9 AM - 9 PM',
      bgColor: 'bg-[var(--accent)]'
    },
    {
      icon: Mail,
      title: 'Email Us',
      info: 'hello@charkulture.com',
      subInfo: 'Response within 2 hours',
      bgColor: 'bg-[var(--text-dark)]'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      info: '+234 (0) 123 456 7890',
      subInfo: 'Quick responses',
      bgColor: 'bg-green-500'
    }
  ];

  const handleStartBooking = () => {
    document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[var(--primary-bg)]">
      {/* Hero Section */}
      <HeroSection
        pretitle="Book Your Experience"
        title="Let's Create Magic Together"
        subtitle="From intimate dinners to grand celebrations, we're here to make your culinary dreams come true. Start your booking journey with us today."
        buttonText="Start Booking"
        onButtonClick={handleStartBooking}
        backgroundImage={bookingHero}
        showScrollIndicator={true}
      />

      {/* Quick Contact Bar */}
      <motion.section 
        className="py-12 bg-white shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-playball text-[var(--text-dark)] mb-2">
              Need Help? We're Here for You
            </h2>
            <p className="text-gray-600 font-sans">
              Prefer to speak with someone? Reach out through any of these channels
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center group cursor-pointer"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 ${contact.bgColor} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-playball text-[var(--text-dark)] mb-2">
                    {contact.title}
                  </h3>
                  <p className="font-sans text-[var(--text-dark)] font-semibold">
                    {contact.info}
                  </p>
                  <p className="font-sans text-gray-500 text-sm">
                    {contact.subInfo}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Booking Process Info */}
      <motion.section 
        className="py-16 bg-[var(--accent)]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-playball text-[var(--text-dark)] mb-4">
              How Our Booking Process Works
            </h2>
            <p className="text-xl font-sans text-[var(--text-dark)] max-w-3xl mx-auto">
              We've made it simple and straightforward to book your perfect culinary experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Submit Request',
                description: 'Fill out our detailed booking form with your event information',
                icon: Calendar
              },
              {
                step: '2', 
                title: 'Consultation Call',
                description: 'We\'ll call you within 2 hours to discuss your needs in detail',
                icon: Phone
              },
              {
                step: '3',
                title: 'Custom Proposal',
                description: 'Receive a personalized menu and quote tailored to your event',
                icon: MessageCircle
              },
              {
                step: '4',
                title: 'Confirmation',
                description: 'Finalize details, confirm booking, and get ready for an amazing experience',
                icon: Clock
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-[var(--text-dark)] rounded-full flex items-center justify-center mx-auto group-hover:bg-white transition-colors duration-300">
                      <IconComponent className="w-10 h-10 text-[var(--accent)]" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--accent)] border-4 border-[var(--text-dark)] rounded-full flex items-center justify-center">
                      <span className="text-[var(--text-dark)] font-bold text-sm">{item.step}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-playball text-[var(--text-dark)] mb-3">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[var(--text-dark)]/80 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Main Booking Form */}
      <section id="booking-form" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-[var(--text-dark)] text-[var(--accent)] px-6 py-2 rounded-full font-playball text-xl mb-4">
              Booking Form
            </span>
            <h2 className="text-5xl font-playball text-[var(--text-dark)] mb-6">
              Start Your Culinary Journey
            </h2>
            <p className="text-xl font-sans text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Complete this form and we'll reach out within 2 hours to discuss your event in detail
            </p>
          </motion.div>

          <BookingForm />
        </div>
      </section>

      {/* FAQ Section */}
      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-playball text-[var(--text-dark)] mb-4">
              Common Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "How far in advance should I book?",
                answer: "We recommend booking at least 2-3 weeks in advance for private events and 4-6 weeks for weddings. However, we do accommodate last-minute requests when possible."
              },
              {
                question: "Do you provide all the equipment and staff?",
                answer: "Yes! We bring everything needed including cooking equipment, serving ware, and professional staff. You just need to provide the venue."
              },
              {
                question: "Can you accommodate dietary restrictions?",
                answer: "Absolutely! We specialize in creating delicious menus for all dietary needs including vegan, gluten-free, kosher, and various allergies."
              },
              {
                question: "What's your cancellation policy?",
                answer: "We understand plans can change. Cancellations made 72+ hours in advance receive a full refund. Within 72 hours, we charge 50% of the total cost."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-[var(--accent)]/5 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-playball text-[var(--text-dark)] mb-3">
                  {faq.question}
                </h3>
                <p className="font-sans text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Emergency Contact */}
      <motion.section 
        className="py-16 bg-[var(--text-dark)] text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Clock className="w-16 h-16 mx-auto mb-6 text-[var(--accent)]" />
            <h2 className="text-4xl font-playball text-[var(--accent)] mb-4">
              Last-Minute Events?
            </h2>
            <p className="text-xl font-sans mb-8 text-white/90 max-w-2xl mx-auto">
              Sometimes the best opportunities come at short notice. We understand and we're here to help make it happen.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="tel:+2341234567890"
                className="bg-[var(--accent)] text-[var(--text-dark)] px-8 py-4 rounded-full font-semibold text-lg hover:bg-white transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-5 h-5" />
                Emergency Hotline
              </motion.a>
              
              <motion.a
                href="https://wa.me/2341234567890"
                className="border-2 border-[var(--accent)] text-[var(--accent)] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[var(--accent)] hover:text-[var(--text-dark)] transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </motion.a>
            </div>

            <p className="text-sm text-white/70 mt-6">
              Available 24/7 for emergency catering requests
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Booking;