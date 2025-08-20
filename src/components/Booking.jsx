import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Users, MapPin, Clock, MessageSquare, ChefHat, CreditCard } from 'lucide-react';

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    email: '',
    phone: '',
    
    // Event Details
    service: '',
    eventDate: '',
    eventTime: '',
    guestCount: '',
    location: '',
    
    // Preferences
    dietaryRestrictions: '',
    budget: '',
    specialRequests: '',
    
    // Contact Preference
    contactMethod: 'email'
  });

  const services = [
    { id: 'private-chef', name: 'Private Dining Service', price: 'From $200/person', duration: '3-4 hours' },
    { id: 'event-catering', name: 'Event Catering', price: 'From $85/person', duration: 'Full event' },
    { id: 'tray-delivery', name: 'Tray Deliveries', price: 'From $45/tray', duration: 'Same day' },
    { id: 'breakfast-delivery', name: 'Breakfast Tray Delivery', price: 'From $120/person', duration: '2-3 hours' }
  ];

  const budgetRanges = [
    'Under $1,000',
    '$1,000 - $2,500',
    '$2,500 - $5,000',
    '$5,000 - $10,000',
    'Over $10,000',
    'Let\'s discuss'
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log('Booking submitted:', formData);
    // Handle form submission
  };

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Event Details', icon: Calendar },
    { number: 3, title: 'Preferences', icon: ChefHat },
    { number: 4, title: 'Review & Submit', icon: CreditCard }
  ];

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const IconComponent = step.icon;
        const isActive = currentStep === step.number;
        const isCompleted = currentStep > step.number;
        
        return (
          <div key={step.number} className="flex items-center">
            <motion.div
              className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                isActive 
                  ? 'bg-[var(--accent)] border-[var(--accent)] text-[var(--text-dark)]'
                  : isCompleted
                  ? 'bg-[var(--text-dark)] border-[var(--text-dark)] text-[var(--accent)]'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <IconComponent className="w-5 h-5" />
              
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[var(--accent)]"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
            
            <div className="ml-3 hidden sm:block">
              <div className={`text-sm font-semibold ${isActive ? 'text-[var(--accent)]' : 'text-gray-600'}`}>
                Step {step.number}
              </div>
              <div className={`text-xs ${isActive ? 'text-[var(--text-dark)]' : 'text-gray-500'}`}>
                {step.title}
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-4 transition-colors duration-300 ${
                isCompleted ? 'bg-[var(--text-dark)]' : 'bg-gray-300'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );

  const InputField = ({ icon: Icon, label, value, onChange, type = "text", options = null, required = false }) => (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <Icon className="w-5 h-5 text-gray-400" />
        </div>
        
        {options ? (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg font-sans transition-all duration-300 focus:border-[var(--accent)] focus:outline-none bg-white"
          >
            <option value="">Select {label.toLowerCase()}</option>
            {options.map((option, index) => (
              <option key={index} value={typeof option === 'string' ? option : option.id}>
                {typeof option === 'string' ? option : option.name}
              </option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Tell us about your ${label.toLowerCase()}...`}
            rows={4}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg font-sans transition-all duration-300 focus:border-[var(--accent)] focus:outline-none resize-none"
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg font-sans transition-all duration-300 focus:border-[var(--accent)] focus:outline-none"
          />
        )}
      </div>
    </motion.div>
  );

  const ServiceCard = ({ service, isSelected, onSelect }) => (
    <motion.div
      className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'border-[var(--accent)] bg-[var(--accent)]/10' 
          : 'border-gray-200 hover:border-[var(--accent)]/50'
      }`}
      onClick={() => onSelect(service.id)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <h3 className="text-lg font-playball text-[var(--text-dark)] mb-2">
        {service.name}
      </h3>
      <p className="text-[var(--accent)] font-semibold mb-1">{service.price}</p>
      <p className="text-gray-600 text-sm">{service.duration}</p>
    </motion.div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-playball text-[var(--text-dark)] mb-2">
                Tell Us About Yourself
              </h3>
              <p className="text-gray-600">We'll use this information to contact you about your booking</p>
            </div>

            <InputField
              icon={User}
              label="Full Name"
              value={formData.name}
              onChange={(value) => handleInputChange('name', value)}
              required
            />

            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                icon={Mail}
                label="Email Address"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                type="email"
                required
              />
              <InputField
                icon={Phone}
                label="Phone Number"
                value={formData.phone}
                onChange={(value) => handleInputChange('phone', value)}
                type="tel"
                required
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-playball text-[var(--text-dark)] mb-2">
                Event Details
              </h3>
              <p className="text-gray-600">Help us understand your event requirements</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--text-dark)] mb-4">
                Select Service <span className="text-red-500">*</span>
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    isSelected={formData.service === service.id}
                    onSelect={(id) => handleInputChange('service', id)}
                  />
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                icon={Calendar}
                label="Event Date"
                value={formData.eventDate}
                onChange={(value) => handleInputChange('eventDate', value)}
                type="date"
                required
              />
              <InputField
                icon={Clock}
                label="Preferred Time"
                value={formData.eventTime}
                onChange={(value) => handleInputChange('eventTime', value)}
                options={timeSlots}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                icon={Users}
                label="Number of Guests"
                value={formData.guestCount}
                onChange={(value) => handleInputChange('guestCount', value)}
                type="number"
                required
              />
              <InputField
                icon={MapPin}
                label="Event Location"
                value={formData.location}
                onChange={(value) => handleInputChange('location', value)}
                required
              />
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-playball text-[var(--text-dark)] mb-2">
                Your Preferences
              </h3>
              <p className="text-gray-600">Help us customize the perfect experience for you</p>
            </div>

            <InputField
              icon={ChefHat}
              label="Dietary Restrictions & Allergies"
              value={formData.dietaryRestrictions}
              onChange={(value) => handleInputChange('dietaryRestrictions', value)}
              type="textarea"
            />

            <InputField
              icon={CreditCard}
              label="Budget Range"
              value={formData.budget}
              onChange={(value) => handleInputChange('budget', value)}
              options={budgetRanges}
            />

            <InputField
              icon={MessageSquare}
              label="Special Requests or Additional Information"
              value={formData.specialRequests}
              onChange={(value) => handleInputChange('specialRequests', value)}
              type="textarea"
            />
          </motion.div>
        );

      case 4:
        const selectedService = services.find(s => s.id === formData.service);
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-playball text-[var(--text-dark)] mb-2">
                Review Your Booking
              </h3>
              <p className="text-gray-600">Please review your information before submitting</p>
            </div>

            <div className="bg-[var(--accent)]/10 rounded-lg p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-[var(--text-dark)] mb-2">Personal Information</h4>
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-[var(--text-dark)] mb-2">Event Details</h4>
                  <p><strong>Service:</strong> {selectedService?.name}</p>
                  <p><strong>Date:</strong> {formData.eventDate}</p>
                  <p><strong>Time:</strong> {formData.eventTime}</p>
                  <p><strong>Guests:</strong> {formData.guestCount}</p>
                  <p><strong>Location:</strong> {formData.location}</p>
                </div>
              </div>
              
              {formData.budget && (
                <div>
                  <h4 className="font-semibold text-[var(--text-dark)] mb-2">Budget Range</h4>
                  <p>{formData.budget}</p>
                </div>
              )}
              
              {formData.specialRequests && (
                <div>
                  <h4 className="font-semibold text-[var(--text-dark)] mb-2">Special Requests</h4>
                  <p>{formData.specialRequests}</p>
                </div>
              )}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
      <StepIndicator />
      
      {renderStep()}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <motion.button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            currentStep === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-[var(--text-dark)] hover:bg-gray-200'
          }`}
          whileHover={currentStep !== 1 ? { scale: 1.05 } : {}}
          whileTap={currentStep !== 1 ? { scale: 0.95 } : {}}
        >
          Previous
        </motion.button>

        <motion.button
          onClick={currentStep === 4 ? handleSubmit : nextStep}
          className="px-8 py-3 bg-[var(--text-dark)] text-[var(--accent)] rounded-lg font-semibold hover:bg-[var(--accent)] hover:text-[var(--text-dark)] transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {currentStep === 4 ? 'Submit Booking Request' : 'Next Step'}
        </motion.button>
      </div>
    </div>
  );
};

export default BookingForm;