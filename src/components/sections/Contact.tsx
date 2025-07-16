'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

// EmailJS Setup Instructions:
// 1. Sign up at https://www.emailjs.com/
// 2. Create an email service and get your Service ID
// 3. Create an email template and get your Template ID
// 4. Get your Public Key from Account → API Keys
// 5. Replace the placeholder values below with your actual IDs

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Initialize EmailJS with your public key
      emailjs.init('Mi3TAbAEo5NBH4YC1');
      
      // Send email using EmailJS
      const response = await emailjs.send(
        'service_unjq52s',
        'template_7ti7hmv',
        {
          from_name: formData.fullName,
          from_email: formData.email,
          to_name: 'Yoav',
          message: `New contact from ${formData.fullName} (${formData.email})`,
        }
      );

      if (response.status !== 200) throw new Error('Failed to send message');
      
      setSubmitStatus('success');
      setFormData({ fullName: '', email: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="min-h-screen bg-black/20 backdrop-blur-sm py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-purple-600/20 to-orange-600/20 backdrop-blur-lg rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-4xl font-bold text-center mb-8 text-orange-300">Work With Me</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-purple-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-white/50"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-purple-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-white/50"
                placeholder="john@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 shadow-lg'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <p className="text-green-400 text-center mt-4">
                Message sent successfully! I'll get back to you soon.
              </p>
            )}
            
            {submitStatus === 'error' && (
              <p className="text-red-400 text-center mt-4">
                Failed to send message. Please try again later.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
} 