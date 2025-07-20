'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { CheckIcon } from '@heroicons/react/24/solid';

/**
 * Contact Section Component with Stepper Form
 * 
 * A multi-step contact form that guides users through:
 * 1. Entering their full name
 * 2. Entering their email
 * 3. Reviewing and sending
 * 
 * @component
 * @returns {JSX.Element} Contact section
 */
export default function Contact() {
  // Initialize EmailJS once when component mounts
  useEffect(() => {
    emailjs.init('Mi3TAbAEo5NBH4YC1');
  }, []);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  /**
   * Step configuration
   */
  const steps = [
    { 
      label: 'Full Name', 
      field: 'fullName',
      placeholder: 'John Doe',
      type: 'text'
    },
    { 
      label: 'Email Address', 
      field: 'email',
      placeholder: 'john@example.com',
      type: 'email'
    },
    { 
      label: 'Review & Send', 
      field: null,
      placeholder: '',
      type: null
    }
  ];

  /**
   * Handle input changes
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Handle next step
   */
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  /**
   * Handle previous step
   */
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  /**
   * Check if current step is valid
   */
  const isStepValid = () => {
    if (currentStep === 0) return formData.fullName.trim() !== '';
    if (currentStep === 1) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    return true;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await emailjs.send(
        'service_unjq52s',
        'template_7ti7hmv',
        {
          user_name: formData.fullName,
          user_email: formData.email,
          message: `New contact from ${formData.fullName} (${formData.email})`,
        }
      );

      if (response.status !== 200) {
        throw new Error(`EmailJS returned status: ${response.status}`);
      }
      
      setSubmitStatus('success');
      setTimeout(() => {
        setFormData({ fullName: '', email: '' });
        setCurrentStep(0);
        setSubmitStatus('idle');
      }, 3000);
    } catch (error: any) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-orange-300">Work With Me</h2>
          <p className="text-lg text-white/70">Let's connect and create something amazing together</p>
        </motion.div>

        {/* Stepper Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <motion.button
                  onClick={() => index < currentStep && setCurrentStep(index)}
                  disabled={index > currentStep}
                  className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                    index < currentStep 
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 cursor-pointer' 
                      : index === currentStep 
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500' 
                      : 'bg-gray-700'
                  }`}
                  whileHover={index < currentStep ? { scale: 1.1 } : {}}
                  whileTap={index < currentStep ? { scale: 0.95 } : {}}
                >
                  {index < currentStep ? (
                    <CheckIcon className="w-6 h-6 text-white" />
                  ) : (
                    <span className="text-white font-bold">{index + 1}</span>
                  )}
                  
                  {/* Pulse animation for current step */}
                  {index === currentStep && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-orange-500/30"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.button>
                
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className={`w-20 h-0.5 mx-2 transition-all duration-300 ${
                    index < currentStep ? 'bg-purple-600' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          {/* Step labels */}
          <div className="flex justify-between max-w-md mx-auto mt-4">
            {steps.map((step, index) => (
              <p key={index} className={`text-sm ${
                index <= currentStep ? 'text-white' : 'text-gray-500'
              }`}>
                {step.label}
              </p>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          className="bg-gradient-to-br from-purple-600/20 to-orange-600/20 backdrop-blur-lg rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {currentStep < 2 ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-lg font-medium text-purple-300 mb-4">
                  {steps[currentStep].label}
                </label>
                <input
                  type={steps[currentStep].type!}
                  name={steps[currentStep].field!}
                  value={formData[steps[currentStep].field as keyof typeof formData]}
                  onChange={handleInputChange}
                  placeholder={steps[currentStep].placeholder}
                  className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-white/50 text-lg"
                  autoFocus
                />
              </motion.div>
            ) : (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-purple-300 mb-4">Review Your Information</h3>
                <div className="space-y-3 bg-black/20 p-6 rounded-lg">
                  <div>
                    <p className="text-sm text-purple-300">Full Name</p>
                    <p className="text-white text-lg">{formData.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Email Address</p>
                    <p className="text-white text-lg">{formData.email}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                currentStep === 0 
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              Previous
            </button>

            {currentStep < 2 ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  !isStepValid() 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-white'
                }`}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  isSubmitting 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-white'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            )}
          </div>

          {/* Status Messages */}
          <AnimatePresence>
            {submitStatus === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-green-400 text-center mt-4"
              >
                Message sent successfully! I'll get back to you soon.
              </motion.p>
            )}
            
            {submitStatus === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-center mt-4"
              >
                Failed to send message. Please try again later.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
