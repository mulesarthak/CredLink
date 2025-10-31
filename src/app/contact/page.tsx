'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Send, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do I get started with CredLink?",
    answer: "Getting started is easy! Simply sign up for an account, choose your plan, and follow our onboarding process. Our team will guide you through the setup."
  },
  {
    question: "What types of credentials can I manage?",
    answer: "CredLink supports various types of credentials including educational certificates, professional certifications, licenses, and custom credentials from any issuing organization."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we use industry-standard encryption and security protocols to protect your data. All credentials are stored securely and access is controlled through advanced authentication methods."
  },
  {
    question: "Can I integrate CredLink with other systems?",
    answer: "Absolutely! CredLink offers robust API integration capabilities that allow you to connect with your existing HR systems, learning management systems, and other platforms."
  },
  {
    question: "What support options are available?",
    answer: "We offer 24/7 customer support through email, live chat, and phone. Premium plans also include dedicated account management and priority support."
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: ''
  });

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      message: ''
    });
    
    setIsSubmitting(false);
    alert('Thank you for your message! We will get back to you promptly.');
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section with Background Pattern */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -z-10"></div>
        
        <div className="container mx-auto px-6 pt-24 pb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              
             
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Let's Start a{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Conversation
              </span>
            </h1>

          </div>

          {/* Main Content Layout */}
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start" style={{marginTop: '80px'}}>
            {/* Left Side - Contact Info Cards */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
              {/* Email Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300" style={{marginBottom: '10px'}}>
                <div className="text-center">
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                    
                    <a href="mailto:hello@credlink.com" className="text-purple-600 hover:text-purple-700 font-medium">
                      hello@credlink.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300" style={{marginTop: '10px'}}>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Follow Us</h3>
                      
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-4">
                    <a
                      href="#"
                      className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-all duration-300 group"
                    >
                      <svg className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-all duration-300 group"
                    >
                      <svg className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-all duration-300 group"
                    >
                      <svg className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-all duration-300 group"
                    >
                      <svg className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* FAQ Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300" style={{marginTop: '10px'}}>
                <div className="text-center">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
                  </div>
                  
                  <div className="space-y-5 text-left">
                    {faqData.map((faq, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => toggleFAQ(index)}
                          className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 rounded-lg"
                        >
                          <span className="font-medium text-gray-900 text-sm">{faq.question}</span>
                          <svg
                            className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                              openFAQ === index ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {openFAQ === index && (
                          <div className="px-4 pb-3">
                            <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            

            {/* Right Side - Contact Form */}
            <div className="relative">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-20 shadow-2xl border border-white/20 min-h-[500px]">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a message</h2>
                 
                </div>

                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                  <div className="grid grid-cols-2" style={{gap: '48px'}}>
                    <div className="relative">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full py-6 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white transition-all duration-300 text-gray-900 font-medium outline-none text-lg h-12"
                      style={{paddingLeft: '25px', paddingRight: '32px'}}
                        placeholder="First Name *"
                      />
                      <label className="absolute left-4 top-2 text-xs text-gray-500 font-medium">
                        
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full py-6 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white transition-all duration-300 text-gray-900 font-medium outline-none text-lg h-12"
                      style={{paddingLeft: '25px', paddingRight: '32px'}}
                        placeholder="Last Name"
                      />

                    </div>
                  </div>

                  <div className="relative" style={{marginBottom: '10px'}}>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full py-6 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white transition-all duration-300 text-gray-900 font-medium outline-none text-lg h-12"
                      style={{paddingLeft: '25px', paddingRight: '32px'}}
                      placeholder="Phone Number *"
                    />
                    
                  </div>

                  <div className="relative" style={{marginBottom: '10px'}}>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full py-6 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white transition-all duration-300 text-gray-900 font-medium outline-none text-lg h-12"
                      style={{paddingLeft: '25px', paddingRight: '32px'}}
                      placeholder="Email Address *"
                    />
                    
                  </div>

                  <div className="relative" style={{marginBottom: '10px'}}>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full py-6 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white transition-all duration-300 resize-none text-gray-900 font-medium outline-none text-lg h-20"
                      style={{paddingLeft: '25px', paddingRight: '32px'}}
                      placeholder="Your Message"
                    />
                    
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    // className="w-full py-6 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white transition-all duration-300 text-gray-900 font-medium outline-none text-lg h-12"
                    //   style={{paddingLeft: '25px', paddingRight: '32px'}}
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 text-lg h-12"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                       
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <div className="text-center pt-6">
                    
                  </div>
                </form>
              </div>
            </div>
          

      {/* FAQ Section */}
      
      {/* Social Media Section */}
      
    </div>
    </div>
        </div>
      </div>
  );
}