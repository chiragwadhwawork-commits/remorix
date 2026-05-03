/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  MessageSquare, 
  Clock, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  Phone, 
  Mail, 
  ChevronDown, 
  Bot, 
  ShieldCheck, 
  Zap,
  Calendar,
  X,
  Menu,
  Check
} from 'lucide-react';

// --- Components ---

const Logo = ({ variant = 'full', className = "" }: { variant?: 'full' | 'icon' | 'white', className?: string }) => {
  const isWhite = variant === 'white';
  const showText = variant === 'full' || variant === 'white';
  
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* SVG Icon - Premium SaaS Signal */}
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
        {/* Background Base */}
        <rect width="40" height="40" rx="10" fill={isWhite ? "white" : "url(#logo-gradient-saas)"} />
        
        {/* Modern Chat Bubble Geometric Base */}
        <path 
          d="M10 26V14C10 11.7909 11.7909 10 14 10H26C28.2091 10 30 11.7909 30 14V22C30 24.2091 28.2091 26 26 26H14L10 30" 
          stroke={isWhite ? "#2563EB" : "white"} 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="opacity-25"
        />

        {/* The Conversion Spark - Growth + Automation */}
        <path 
          d="M16 24L21 19L17 19L24 12V17L28 17L19 26" 
          fill={isWhite ? "#2563EB" : "white"} 
          className="drop-shadow-sm"
        />

        {!isWhite && (
          <defs>
            <linearGradient id="logo-gradient-saas" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563EB" />
              <stop offset="1" stopColor="#10B981" />
            </linearGradient>
          </defs>
        )}
      </svg>

      {/* Modern SaaS Typography */}
      {showText && (
        <div className={`flex items-baseline tracking-[-0.05em] ${isWhite ? 'text-white' : 'text-slate-900'}`}>
          <span className="text-2xl font-extrabold">Remo</span>
          <span className="text-2xl font-medium opacity-70">rix</span>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="group cursor-pointer">
          <Logo variant="full" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://wa.me/917410711563?text=Hi%20I%20want%20to%20automate%20my%20WhatsApp%20leads" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95 cursor-pointer"
          >
            Get Free Setup Call
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          id="mobile-menu-toggle"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-slate-600"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="https://wa.me/917410711563?text=Hi%20I%20want%20to%20automate%20my%20WhatsApp%20leads" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-primary text-white text-center py-4 rounded-xl font-bold mt-2 cursor-pointer"
              >
                Get Free WhatsApp Setup Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const WhatsAppDemo = () => {
  const [step, setStep] = useState(1);
  const [isTyping, setIsTyping] = useState(false);

  const demoSteps = [
    {
      id: 1,
      sender: 'user',
      msg: 'Hi, is cleaning service available tomorrow 10am?',
      time: '10:00 AM'
    },
    {
      id: 2,
      sender: 'auto',
      msg: 'Hi! Yes, we have a slot available. Which service are you looking for? \n1. Deep Cleaning\n2. Sofa Cleaning\n3. Kitchen Cleaning',
      time: '10:00 AM',
      delay: 800
    },
    {
      id: 3,
      sender: 'user',
      msg: 'Deep cleaning for a 2BHK.',
      time: '10:01 AM'
    },
    {
      id: 4,
      sender: 'auto',
      msg: 'Great! The 2BHK Deep Cleaning package is ₹4,999. Should I book your slot for tomorrow 10 AM? \n(Reply with YES to confirm)',
      time: '10:01 AM',
      delay: 1200
    },
    {
      id: 5,
      sender: 'user',
      msg: 'YES',
      time: '10:02 AM'
    },
    {
      id: 6,
      sender: 'auto',
      msg: '✅ Confirmed! Our team will reach at 10 AM tomorrow. \nTotal: ₹4,999 (Pay on visit). \nAddress details requested...',
      time: '10:02 AM',
      delay: 1000
    }
  ];

  const currentMessages = demoSteps.slice(0, step);

  const nextStep = () => {
    if (step < demoSteps.length) {
      if (demoSteps[step].sender === 'auto') {
        setIsTyping(true);
        setTimeout(() => {
          setStep(s => s + 1);
          setIsTyping(false);
        }, demoSteps[step].delay || 1000);
      } else {
        setStep(s => s + 1);
      }
    } else {
      setStep(1);
    }
  };

  return (
    <div className="bg-[#E5DDD5] rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-900 w-full max-w-[340px] mx-auto aspect-[9/16] relative flex flex-col">
      {/* Header */}
      <div className="bg-[#075E54] p-4 flex items-center gap-3 text-white">
        <Logo variant="icon" className="scale-75 -ml-1" />
        <div>
          <div className="text-sm font-bold">Remorix Automation</div>
          <div className="text-[10px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
            Online
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 custom-scrollbar">
        {currentMessages.map((m) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: m.sender === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            key={m.id}
            className={`max-w-[85%] p-2.5 rounded-xl shadow-sm text-sm relative ${
              m.sender === 'user' 
                ? 'bg-[#DCF8C6] self-end rounded-tr-none' 
                : 'bg-white self-start rounded-tl-none text-slate-800'
            }`}
          >
            <p className="whitespace-pre-line">{m.msg}</p>
            <div className="text-[10px] text-slate-400 text-right mt-1">{m.time}</div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="bg-white self-start rounded-xl rounded-tl-none p-2 shadow-sm flex gap-1">
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-75"></div>
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-150"></div>
          </div>
        )}
      </div>

      {/* Footer / Input */}
      <div className="p-3 bg-[#F0F2F5] flex items-center gap-2">
        <button 
          onClick={nextStep}
          className="bg-accent text-white w-full py-2.5 rounded-lg text-xs font-bold shadow-md hover:bg-green-600 transition-colors"
          id="demo-next-btn"
        >
          {step === demoSteps.length ? 'Restart Demo' : 'Next Interaction →'}
        </button>
      </div>
      
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-900 rounded-full"></div>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0" id={`faq-${question.toLowerCase().replace(/\s+/g, '-')}`}>
      <button 
        className="w-full py-6 flex items-center justify-between text-left hover:text-primary transition-colors group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-lg text-slate-800 group-hover:text-primary">{question}</span>
        <ChevronDown className={`transition-transform duration-300 text-slate-400 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxzFRqcDEpQ9xeoNan2RSZgvHV6PwoaEGSMkEhzAnvfbi0omA0dQzkv3xZNmDpcXtDPrQ/exec";

const Home = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Get form data
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const business = formData.get('business') as string;

    const data = {
      name,
      phone,
      business,
      plan: "Website Lead",
      timestamp: new Date().toISOString()
    };

    try {
      // Send to Google Sheets
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      setFormSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen selection:bg-primary/10 selection:text-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6" id="hero">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 text-primary px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border border-blue-100">
              <Zap size={14} className="fill-primary" />
              100% Done-For-You Automation
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 leading-[1.1]">
              Convert 3x More WhatsApp Leads Into Paying Customers — <span className="text-primary italic">Automatically</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
              Never miss a lead again. Remorix instantly replies, follows up, and converts your WhatsApp inquiries into real customers — even while you sleep.
            </p>
            
            <div className="flex flex-col gap-4">
              {[
                "Instant replies to every single lead",
                "Automated follow-ups that drive sales",
                "Full professional setup & maintenance"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  {text}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a 
                  href="https://wa.me/917410711563?text=Hi%20I%20want%20to%20automate%20my%20WhatsApp%20leads" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-primary text-white px-8 py-5 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform flex items-center justify-center gap-2 cursor-pointer"
                  id="hero-cta-main"
                >
                  Get More Customers on WhatsApp
                  <ArrowRight size={20} />
                </a>
                <a 
                  href="https://wa.me/917410711563?text=Hi%20I%20want%20to%20automate%20my%20WhatsApp%20leads" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-white text-slate-800 border-2 border-slate-100 px-8 py-5 rounded-2xl text-lg font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  id="hero-cta-whatsapp"
                >
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <MessageSquare size={14} className="fill-white" />
                  </div>
                  Chat on WhatsApp
                </a>
              </div>
              <p className="text-primary font-bold text-sm flex flex-col gap-2 items-center sm:items-start">
                <span className="flex items-center gap-2">
                  <Zap size={16} className="fill-current" />
                  ⚡ Free setup for first 10 businesses this month
                </span>
                <span className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold">
                  No tech skills needed • Setup done for you • Works in 24 hours
                </span>
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden md:block relative lg:scale-110"
          >
            <div className="absolute inset-0 bg-blue-100 rounded-[3rem] rotate-3 blur-2xl -z-10 opacity-60"></div>
            <div className="absolute -top-12 -right-12 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 max-w-[200px] animate-bounce-slow hidden lg:block">
              <p className="text-[10px] font-bold text-slate-800 leading-tight">
                "Example: Instant reply sent within 2 seconds"
              </p>
            </div>
            <WhatsAppDemo />
            <div className="mt-6 text-center">
              <p className="text-sm font-bold text-primary italic">Businesses using this see up to 3x higher response rates</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Infrastructure Trust Section */}
      <section className="py-24 bg-white border-y border-slate-50" id="trust">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-slate-900 leading-tight">
                Built on the same infrastructure <br/>
                <span className="bg-gradient-to-r from-blue-600 to-accent bg-clip-text text-transparent italic">trusted by thousands of businesses</span>
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                We use official WhatsApp API platforms like <span className="font-bold text-slate-900">Interakt</span> and <span className="font-bold text-slate-900">AiSensy</span> to ensure secure, reliable, and scalable automation.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-10">
                {[
                  "No unofficial tools",
                  "No risk of number bans",
                  "Fully compliant with WhatsApp API"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-700 font-bold text-sm uppercase tracking-wide">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={14} strokeWidth={4} />
                    </div>
                    {text}
                  </div>
                ))}
              </div>

              <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-slate-900 font-bold flex items-center gap-3">
                  <Zap size={20} className="text-primary fill-primary" />
                  You get enterprise-level automation
                </p>
                <p className="text-slate-900 font-bold flex items-center gap-3">
                  <Zap size={20} className="text-primary fill-primary" />
                  Without dealing with setup, tech, or complexity
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
               {/* WhatsApp Chat Demo */}
               <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="flex flex-col gap-3 mb-6 relative">
                     <div className="bg-slate-100 self-end p-3 rounded-2xl rounded-tr-none text-xs font-medium shadow-sm max-w-[85%] text-slate-700">
                       Hi, is slot available for haircut?
                     </div>
                     <div className="bg-[#DCF8C6] self-start p-3 rounded-2xl rounded-tl-none text-xs font-medium shadow-sm max-w-[85%] text-slate-800 flex flex-col gap-1">
                        <span>Yes! We have a slot at 4:30 PM today. Would you like me to book it for you?</span>
                        <div className="flex gap-2 mt-2">
                           <span className="bg-white/50 px-3 py-1 rounded-full text-[10px] font-bold">Book Now</span>
                           <span className="bg-white/50 px-3 py-1 rounded-full text-[10px] font-bold">Full Price List</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 py-2 border-t border-slate-50">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
                      “Live automation example — replies sent within seconds”
                    </p>
                  </div>
               </div>

               {/* Automation Flow Diagram */}
               <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg">
                  <div className="grid grid-cols-4 gap-2 items-center">
                    {[
                      { label: "User Message", icon: <MessageSquare size={16} /> },
                      { label: "Instant Reply", icon: <Zap size={16} /> },
                      { label: "Follow-up", icon: <Clock size={16} /> },
                      { label: "Booking", icon: <CheckCircle2 size={16} /> }
                    ].map((step, i, arr) => (
                      <div key={i} className="flex items-center gap-1 group">
                        <div className="flex flex-col items-center gap-2 flex-1">
                           <div className="w-10 h-10 bg-blue-50 text-primary rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                             {step.icon}
                           </div>
                           <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter text-center">{step.label}</span>
                        </div>
                        {i < arr.length - 1 && (
                          <div className="text-slate-300">
                             <ArrowRight size={12} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
               </div>

               {/* Stats Preview */}
               <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent"></div>
                  <div className="flex justify-between items-center mb-6 relative">
                     <div>
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Official API Status</div>
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                           <span className="text-sm font-bold">Systems Operational</span>
                        </div>
                     </div>
                     <Logo variant="icon" className="scale-75 opacity-50" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 relative">
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="text-[10px] opacity-50 mb-1 font-bold uppercase">Automated Replies</div>
                        <div className="text-2xl font-display font-bold">48,291</div>
                     </div>
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="text-[10px] opacity-50 mb-1 font-bold uppercase">Conversion Rate</div>
                        <div className="text-2xl font-display font-bold text-accent">+124%</div>
                     </div>
                  </div>
                  <p className="text-[9px] text-white/30 mt-6 text-center font-medium uppercase tracking-widest">
                    Automation running on official WhatsApp API platforms
                  </p>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Demo Section (Mobile/Landing Focus) */}
      <section className="py-24 bg-white md:hidden overflow-hidden" id="demo-mobile">
        <div className="px-6 text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-4">See It In Action</h2>
          <p className="text-slate-600">This is how your business replies to customers automatically</p>
        </div>
        <WhatsAppDemo />
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-slate-50 overflow-hidden" id="problem">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-slate-900">You’re Losing Customers Every Day</h2>
            <div className="space-y-4 mb-8">
              <p className="text-xl text-slate-600 font-medium">Most businesses lose 30–50% of leads due to slow replies.</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-red-500">
                <span>• Customers message but you reply late</span>
                <span>• Leads don’t get follow-ups</span>
                <span>• Interested buyers disappear</span>
              </div>
            </div>
            <p className="text-slate-500 italic">"A lead ignored for 5 minutes is already 80% lost."</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <Clock className="text-red-500" size={32} />,
                title: "Slow Replies",
                desc: "Customers are impatient. If you don't reply in seconds, they message your competitor."
              },
              {
                icon: <TrendingUp className="text-red-500" size={32} />,
                title: "Zero Follow-ups",
                desc: "Most sales happen after the 4th follow-up. Most businesses never follow up even once."
              },
              {
                icon: <Users className="text-red-500" size={32} />,
                title: "Human Errors",
                desc: "Staff forgets to reply, makes mistakes, or goes home. Automation never sleeps."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                id={`problem-card-${i}`}
              >
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-white" id="solution">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
           <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1 relative"
          >
            <div className="bg-primary/5 rounded-[4rem] p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
              <div className="relative flex flex-col gap-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg text-primary">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-4xl font-display font-bold leading-tight">We handle everything <br/><span className="text-primary italic">so you don't have to.</span></h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  You don’t get software — you get a done-for-you system. No software to learn. No dashboards to manage. We build your flows, set up your triggers, and keep your automation running 24/7.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2.5"></div>
                    <p className="font-semibold text-slate-800">Done-for-you Setup & Maintenance</p>
                  </div>
                   <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2.5"></div>
                    <p className="font-semibold text-slate-800">Direct WhatsApp Integration</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">The Remorix <br/>Solution</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-blue-100 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-slate-900">Instant replies to every lead</h4>
                  <p className="text-slate-600 leading-relaxed">Our system understands customer intent and replies with pricing, slots, or details instantly.</p>
                </div>
              </div>
              <div className="flex gap-6">
                 <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-slate-900">Automatic Lead Qualification</h4>
                  <p className="text-slate-600 leading-relaxed">We automatically categorize leads so you know exactly who is ready to buy right now.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-slate-900 text-white" id="how-it-works">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">How It Works</h2>
            <p className="text-slate-400">Simple, effective automation in 3 steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Customer sends message",
                desc: "A lead reaches out on WhatsApp requesting pricing or details about your services.",
                icon: <MessageSquare size={32} className="text-blue-400" />
              },
              {
                step: "02",
                title: "Remorix replies instantly",
                desc: "Our automation handles the inquiry immediately with personalized, accurate information.",
                icon: <Zap size={32} className="text-accent" />
              },
              {
                step: "03",
                title: "You convert more leads",
                desc: "Fast replies build trust, helping you close more bookings and sales automatically.",
                icon: <TrendingUp size={32} className="text-blue-400" />
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800/50 p-10 rounded-[2.5rem] border border-white/5 text-center flex flex-col items-center gap-6"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">{item.step}</div>
                <div className="p-4 bg-white/5 rounded-2xl">
                  {item.icon}
                </div>
                <h4 className="text-2xl font-bold">{item.title}</h4>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before vs After Section */}
      <section className="py-24 bg-white" id="before-after">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-display font-bold mb-4">The Impact of Automation</h2>
             <p className="text-slate-600">The difference Between Stress and Growth</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-50 p-10 rounded-[2.5rem] border-t-4 border-red-500">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="text-red-500">Before</span> Remorix
              </h3>
              <ul className="space-y-6">
                {[
                  "Manual replies causing 2-hour delays",
                  "Leads forgotten in the chat list",
                  "Sales losing track of follow-ups",
                  "Losing 50%+ potential customers"
                ].map((text, i) => (
                  <li key={i} className="flex gap-4 text-slate-500">
                    <X className="text-red-400 mt-1 flex-shrink-0" size={20} />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-600 p-10 rounded-[2.5rem] border-t-4 border-accent text-white shadow-xl shadow-blue-200">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="text-accent underline decoration-2 underline-offset-4">After</span> Remorix
              </h3>
              <ul className="space-y-6">
                {[
                  "Instant replies (under 5 seconds)",
                  "Automatic lead qualification",
                  "Strategic 7-day follow-up flows",
                  "Significant increase in conversions"
                ].map((text, i) => (
                  <li key={i} className="flex gap-4 text-blue-50 font-medium">
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Everything built <br/>specifically for <span className="text-primary">your</span> business.</h2>
            </div>
            <p className="text-slate-600 max-w-sm mb-2">We don't do generic. Every automation flow is tailored to how your business talks to customers.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <MessageSquare size={32} className="text-primary" />,
                title: "Instant WhatsApp Replies",
                desc: "Never miss a greeting. We set up instant smart responses for common queries like pricing, address, and timings."
              },
              {
                icon: <Bot size={32} className="text-primary" />,
                title: "Auto Lead Qualification",
                desc: "Ask the right questions automatically. Find out if the lead is ready to book before you even get involved."
              },
              {
                icon: <Clock size={32} className="text-primary" />,
                title: "Done-For-You Follow-Ups",
                desc: "The fortune is in the follow-up. We set up subtle, helpful nudges to bring leads back into the conversation automatically."
              },
              {
                icon: <Calendar size={32} className="text-primary" />,
                title: "Appointment Handling",
                desc: "Qualify interest and share your booking link automatically. Reduce the back-and-forth for scheduling calls or visits."
              },
              {
                icon: <Zap size={32} className="text-primary" />,
                title: "Custom Business Flows",
                desc: "Need something special? We build custom paths for referral programs, feedback collection, or payment reminders."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group"
                id={`feature-${i}`}
              >
                <div className="mb-6 p-4 bg-slate-50 rounded-2xl w-fit group-hover:bg-blue-50 transition-colors">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-4 text-slate-900">{feature.title}</h4>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
            
            {/* CTA Card */}
            <div className="bg-gradient-to-br from-primary to-blue-700 p-10 rounded-[2rem] text-white flex flex-col justify-between">
              <div>
                <h4 className="text-2xl font-bold mb-4">Start your automation journey today.</h4>
                <p className="opacity-80 leading-relaxed mb-8">We take care of the tech, you take care of the new customers.</p>
              </div>
              <div className="flex flex-col gap-3">
                <a 
                  href="https://wa.me/917410711563?text=Hi%20I%20want%20to%20automate%20my%20WhatsApp%20leads" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-primary text-center py-4 rounded-xl font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 cursor-pointer"
                >
                  Get More Customers on WhatsApp
                  <ArrowRight size={18} />
                </a>
                <p className="text-[10px] text-white/80 font-bold text-center uppercase tracking-wider">Free setup available this month</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white" id="how-it-works">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-display font-bold mb-4">A Simple 3-Step Process</h2>
            <p className="text-slate-600">From manual struggle to automatic success in 7 days.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-16 relative">
             {/* Connector line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 -z-10"></div>
            
            {[
              {
                step: "01",
                title: "Business Audit",
                desc: "We jump on a call to understand your leads, your staff capacity, and your sales goal."
              },
              {
                step: "02",
                title: "Strategy & Setup",
                desc: "Our engineers build your custom WhatsApp flows, auto-replies, and follow-up sequences."
              },
              {
                step: "03",
                title: "Launch & Grow",
                desc: "We go live. You start seeing instant replies and automated conversions on your WhatsApp."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center bg-white px-8"
              >
                <div className="w-20 h-20 bg-blue-50 text-primary border-4 border-white rounded-full flex items-center justify-center text-2xl font-display font-bold mx-auto mb-8 shadow-sm">
                  {item.step}
                </div>
                <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden" id="target-users">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
              <div className="max-w-2xl">
                 <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">Built for local businesses that <br/><span className="bg-gradient-to-r from-blue-400 to-accent bg-clip-text text-transparent italic">depend on fast replies.</span></h2>
                 <p className="text-lg opacity-80">From first message to confirmed booking — automated on WhatsApp.</p>
              </div>
              <div className="bg-slate-800 p-6 rounded-3xl border border-white/10 text-center">
                 <div className="text-accent font-bold text-lg mb-1 italic uppercase tracking-wider">Limited onboarding slots</div>
                 <p className="text-xs opacity-60">We onboard only 10 businesses per month to ensure high-quality setup and results.</p>
              </div>
           </div>
            <div className="mb-8 text-center md:text-left">
              <p className="text-primary font-bold text-sm uppercase tracking-widest">See how it works for your business — click a category below</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { 
                  name: "Salons and Parlours", 
                  desc: "Auto-reply to enquiries → Book appointments instantly",
                  example: "“Hi, haircut today?” → Available slots + booking link",
                  icon: <Users size={20} />, 
                  href: "/salon-demo" 
                },
                { 
                  name: "Real Estate Agents", 
                  desc: "Capture leads → Follow up automatically → Close faster",
                  example: "“Price & location?” → Details + site visit follow-up",
                  icon: <Users size={20} />, 
                  href: "/realestate-demo" 
                },
                { 
                  name: "Coaching & Education", 
                  desc: "Answer FAQs → Share details → Convert enquiries to admissions",
                  example: "“Fees?” → Full info + enrollment link",
                  icon: <Zap size={20} />, 
                  href: "/coaching-demo" 
                },
                { 
                  name: "Gyms & Fitness", 
                  desc: "Handle trial requests → Send reminders → Reduce drop-offs",
                  example: "“Trial available?” → Schedule + reminder sent",
                  icon: <TrendingUp size={20} />, 
                  href: "/gym-demo" 
                },
                { 
                  name: "Other Local Services", 
                  desc: "Reply in seconds → Qualify leads → Turn chats into customers",
                  example: "“Available tomorrow?” → Instant confirmation",
                  icon: <Check size={20} />, 
                  href: "/healthcare-demo" 
                }
              ].map((item, i) => {
                const CardContent = (
                  <>
                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-primary/20 transition-colors">
                      {item.icon}
                    </div>
                    <div className="flex flex-col gap-2">
                       <span className="font-bold text-sm h-10 md:h-12 flex items-center justify-center leading-tight text-white group-hover:text-primary transition-colors">{item.name}</span>
                       <p className="text-[10px] text-slate-400 leading-tight">{item.desc}</p>
                       <div className="flex flex-col gap-1 mt-1">
                          <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Live demo:</p>
                          <p className="text-[10px] text-accent font-medium leading-tight italic">{item.example}</p>
                       </div>
                       <p className="text-[9px] text-primary font-bold mt-2 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex items-center justify-center gap-1">
                          Click to view live demo →
                       </p>
                    </div>
                  </>
                );

                if (item.href) {
                  return (
                    <Link 
                      key={i}
                      to={item.href}
                      className="bg-slate-800/50 hover:bg-slate-800 p-8 rounded-3xl border border-white/5 text-center flex flex-col items-center gap-4 transition-all hover:scale-105 cursor-pointer group"
                    >
                      {CardContent}
                    </Link>
                  );
                }

                return (
                  <div 
                    key={i} 
                    className="bg-slate-800/50 hover:bg-slate-800 p-8 rounded-3xl border border-white/5 text-center flex flex-col items-center gap-4 transition-all hover:scale-105 cursor-default group"
                    id={`target-${i}`}
                  >
                    {CardContent}
                  </div>
                );
              })}
           </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-white" id="pricing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Investment in Growth</h2>
            <p className="text-slate-600">Simpler than hiring an employee, more effective than manual labor.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Lead Capture System",
                badge: "🔹 Starter",
                setup: "₹999 Setup | ",
                price: "₹3,000",
                desc: "Never miss a customer inquiry. Automated 24/7 capture.",
                features: [
                  "Instant reply to every message (24/7)",
                  "Never miss a customer inquiry",
                  "Capture name, number & requirements",
                  "Step in and reply manually anytime"
                ],
                footnote: "Perfect if you're currently missing or delaying responses. Best for businesses with daily inquiries.",
                icon: <MessageSquare size={32} />
              },
              {
                title: "Conversion Booster System",
                badge: "🔥 Growth",
                price: "₹5,000",
                popular: true,
                desc: "Designed to help increase conversions by 10–30%.",
                features: [
                  "Everything in Starter",
                  "Automated follow-ups",
                  "Re-engage customers automatically",
                  "Broadcast offers & reminders",
                  "Step in and reply manually anytime"
                ],
                footnote: "Best Value: This is where most businesses start seeing real revenue growth.",
                icon: <TrendingUp size={32} />
              },
              {
                title: "Sales Autopilot System",
                badge: "⚡ Pro",
                price: "₹8,000",
                desc: "Built for businesses serious about scaling.",
                features: [
                  "Everything in Growth",
                  "Customized business automation",
                  "End-to-end sales journey handling",
                  "Smart lead nurturing sequences",
                  "Priority support & optimization",
                  "Step in and reply manually anytime"
                ],
                footnote: "Built for businesses serious about scaling.",
                icon: <Zap size={32} />
              }
            ].map((plan, i) => (
              <div key={i} className={`relative group ${plan.popular ? 'scale-105 z-10' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-accent text-slate-900 px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl">
                    Most Popular
                  </div>
                )}
                <div className={`h-full bg-white border-2 ${plan.popular ? 'border-primary' : 'border-slate-100'} rounded-[2.5rem] p-8 flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300`}>
                  <div className={`w-14 h-14 ${plan.popular ? 'bg-primary text-white' : 'bg-blue-50 text-primary'} rounded-2xl flex items-center justify-center mb-6`}>
                    {plan.icon}
                  </div>
                  
                  <div className="text-primary font-bold text-sm mb-2 uppercase tracking-wider">{plan.badge}</div>
                  <h3 className="text-xl font-bold mb-4 leading-tight">{plan.title}</h3>
                  
                  <div className="mb-6">
                    <div className="text-4xl font-display font-bold text-slate-900 mb-1">
                      <span className="text-lg font-sans text-slate-400 font-medium">{plan.setup}</span>
                      {plan.price}
                      <span className="text-lg font-sans text-slate-400 font-medium">/mo</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <div className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={12} strokeWidth={4} />
                        </div>
                        <span className="text-sm font-medium text-slate-600 leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl mb-6">
                    <p className="text-[11px] text-slate-500 font-medium italic leading-relaxed">
                      {plan.footnote}
                    </p>
                  </div>

                  <a 
                    href={`https://wa.me/917410711563?text=Hi%20I%27m%20interested%20in%20the%20${encodeURIComponent(plan.title)}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full block py-4 rounded-xl text-center font-bold transition-all active:scale-[0.98] cursor-pointer ${
                      plan.popular 
                        ? 'bg-primary text-white shadow-lg shadow-primary/25 hover:bg-blue-700' 
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    Select Plan
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-400 font-bold flex items-center justify-center gap-2">
              <Check size={16} className="text-green-500" strokeWidth={3} />
              Includes ongoing monitoring, updates, and optimization
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-slate-50" id="faq">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
            <FAQItem 
              question="What exactly is Remorix?" 
              answer="Remorix is a done-for-you service. We don't sell software for you to learn. Instead, our team sets up and manages WhatsApp automation for local businesses to help them convert leads that currently go cold." 
            />
            <FAQItem 
              question="Do I need to be tech-savvy?" 
              answer="Not at all! That's the best part. We handle 100% of the technical setup, from flow design to connecting it to your business phone. You just handle the incoming sales." 
            />
            <FAQItem 
              question="How is this different from generic Chatbots?" 
              answer="Most chatbots are robotic and annoy customers. We build 'Smart Flows' that feel natural and focus purely on getting the customer to the next step (booking, pricing, or interest qualification)." 
            />
            <FAQItem 
              question="Will I get banned from WhatsApp?" 
              answer="We use official WhatsApp Business API or safe automation practices depending on your volume to ensure your number stays healthy and professional." 
            />
            <FAQItem 
              question="Is there any setup fee?" 
              answer="Currently, we are waiving off our standard setup fee for businesses who join this month. You only pay the flat monthly subscription." 
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white" id="contact">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-blue-600 rounded-[3rem] overflow-hidden relative shadow-2xl shadow-blue-200">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-500 opacity-90 -z-10"></div>
            <div className="grid md:grid-cols-2">
              <div className="p-12 md:p-20 text-white flex flex-col justify-center">
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">Ready to win <br/>back your time?</h2>
                <div className="space-y-6 mb-12">
                   <a href="tel:+917410711563" className="flex items-center gap-4 text-xl font-bold hover:text-accent transition-colors">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                        <Phone size={24} />
                      </div>
                      +91 7410711563
                   </a>
                   <a href="mailto:info@remorix.in" className="flex items-center gap-4 text-xl font-bold hover:text-accent transition-colors">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                        <Mail size={24} />
                      </div>
                      info@remorix.in
                   </a>
                </div>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://wa.me/917410711563?text=Hi%20I%20want%20to%20automate%20my%20WhatsApp%20leads" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent text-slate-900 px-8 py-5 rounded-2xl font-bold text-lg hover:bg-green-400 transition-colors flex items-center gap-2 cursor-pointer"
                    id="contact-whatsapp"
                  >
                    <MessageSquare size={20} className="fill-slate-900" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white/5 p-12 md:p-20 backdrop-blur-sm border-l border-white/10">
                <AnimatePresence mode="wait">
                  <div className="mb-8 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-4">Start converting more WhatsApp leads into customers today.</h3>
                    <p className="text-blue-100 opacity-80">Setup takes less than 24 hours. Limited onboarding slots available this month.</p>
                  </div>
                  {!formSubmitted ? (
                    <motion.form 
                      key="form"
                      id="lead-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-6" 
                      onSubmit={handleFormSubmit}
                    >
                      <div className="flex flex-col gap-2">
                        <label className="text-white text-sm font-bold opacity-80 pl-1 uppercase tracking-wider">Your Name</label>
                        <input 
                          name="name"
                          type="text" 
                          required
                          placeholder="e.g. Rahul Sharma" 
                          className="bg-white/10 border border-white/20 rounded-2xl p-5 text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors transition-shadow"
                          id="form-name"
                        />
                      </div>
                       <div className="flex flex-col gap-2">
                        <label className="text-white text-sm font-bold opacity-80 pl-1 uppercase tracking-wider">Business Phone</label>
                        <input 
                          name="phone"
                          type="tel" 
                          required
                          placeholder="+91 00000 00000" 
                          className="bg-white/10 border border-white/20 rounded-2xl p-5 text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
                          id="form-phone"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-white text-sm font-bold opacity-80 pl-1 uppercase tracking-wider">Business Type</label>
                        <input 
                          name="business"
                          type="text" 
                          required
                          placeholder="e.g. Yoga Gym, Dental Clinic" 
                          className="bg-white/10 border border-white/20 rounded-2xl p-5 text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
                          id="form-type"
                        />
                      </div>
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-white text-blue-600 w-full py-5 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-colors shadow-lg shadow-black/10 mt-4 active:scale-95 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? "Saving..." : "Save My Spot"}
                      </button>
                      <p className="text-white/40 text-[10px] text-center uppercase tracking-widest font-bold">Safe & Secure Interaction</p>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center p-8"
                    >
                      <div className="w-20 h-20 bg-accent text-slate-900 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-accent/20">
                        <Check size={40} strokeWidth={3} />
                      </div>
                      <h3 className="text-3xl font-display font-bold text-white mb-4">You're on the list!</h3>
                      <p className="text-blue-50 text-lg leading-relaxed">
                        ✅ Your spot is reserved. We’ll contact you within 24 hours.
                      </p>
                      <button 
                        onClick={() => setFormSubmitted(false)}
                        className="mt-8 text-white/60 text-sm hover:text-white border-b border-white/20 pb-1 font-bold"
                      >
                        Submit another form
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-slate-50 border-t border-slate-100" id="footer">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
             <a href="#hero" className="mb-6 block cursor-pointer">
                <Logo variant="full" />
              </a>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Redefining sales for Indian local businesses through seamless WhatsApp automation. Built with ❤️ for Bharat.
              </p>
              <div className="flex gap-4">
                 <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-primary transition-colors cursor-pointer">
                    <TrendingUp size={18} />
                 </div>
                 <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-primary transition-colors cursor-pointer">
                    <MessageSquare size={18} />
                 </div>
              </div>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-slate-900">Navigation</h5>
            <div className="flex flex-col gap-4">
              <a href="#how-it-works-visual" className="text-slate-500 text-sm hover:text-primary transition-colors cursor-pointer">How It Works</a>
              <a href="#features" className="text-slate-500 text-sm hover:text-primary transition-colors cursor-pointer">Features</a>
              <a href="#pricing" className="text-slate-500 text-sm hover:text-primary transition-colors cursor-pointer">Pricing</a>
              <a href="#contact" className="text-slate-500 text-sm hover:text-primary transition-colors cursor-pointer">Contact</a>
            </div>
          </div>

          <div>
             <h5 className="font-bold mb-6 text-slate-900">Contact Details</h5>
             <div className="flex flex-col gap-4">
                <a href="tel:+917410711563" className="flex items-center gap-3 text-slate-500 text-sm hover:text-primary transition-colors cursor-pointer">
                  <Phone size={16} /> +91 7410711563
                </a>
                 <a href="mailto:info@remorix.in" className="flex items-center gap-3 text-slate-500 text-sm hover:text-primary transition-colors cursor-pointer">
                  <Mail size={16} /> info@remorix.in
                </a>
                <div className="flex items-center gap-3 text-slate-500 text-sm">
                   <Users size={16} /> Mumbai, India
                </div>
             </div>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-slate-900">Quick Connection</h5>
            <a 
              href="https://wa.me/917410711563?text=Hi%20I%20want%20to%20automate%20my%20WhatsApp%20leads" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-accent text-slate-900 px-6 py-4 rounded-2xl font-bold hover:shadow-lg transition-all text-sm cursor-pointer"
              id="footer-whatsapp-btn"
            >
              <MessageSquare size={18} className="fill-slate-900" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-slate-400 text-xs">© 2026 Remorix Automation. All rights reserved.</p>
           <div className="flex gap-8">
              <span className="text-slate-400 text-xs hover:text-slate-600 transition-colors cursor-pointer">Privacy Policy</span>
              <span className="text-slate-400 text-xs hover:text-slate-600 transition-colors cursor-pointer">Terms of Service</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

const demoConfigs: Record<string, { name: string; welcome: string; image: string; firstOptions: string[] }> = {
  salon: {
    name: "Glow & Grace Salon",
    welcome: "Hi! Welcome to Glow & Grace Salon 💇‍♀️\nHow can we help you today?",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=50&h=50&fit=crop",
    firstOptions: ["Book Appointment", "View Services", "Pricing"]
  },
  gym: {
    name: "FitZone Gym",
    welcome: "Welcome to FitZone Gym 💪\nHow can we help you?",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=50&h=50&fit=crop",
    firstOptions: ["Join Membership", "Personal Training", "Pricing"]
  },
  realestate: {
    name: "Elite Realty",
    welcome: "Welcome! Looking for a property? 🏡",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=50&h=50&fit=crop",
    firstOptions: ["Buy Property", "Rent Property", "Budget Range"]
  },
  coaching: {
    name: "Bright Academy",
    welcome: "Welcome to Bright Academy 📚\nHow can we help you?",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=50&h=50&fit=crop",
    firstOptions: ["Course Details", "Fees", "Book Demo Class"]
  },
  healthcare: {
    name: "Care Clinic",
    welcome: "Welcome to Care Clinic 🏥\nHow can we assist you?",
    image: "https://images.unsplash.com/photo-1505751172876-019669bf6910?w=50&h=50&fit=crop",
    firstOptions: ["Book Appointment", "Doctor Availability", "Consultation Fees"]
  }
};

const IndustryDemo = ({ type }: { type: string }) => {
  const config = demoConfigs[type] || demoConfigs.salon;
  const [messages, setMessages] = useState<{ id: number; sender: 'user' | 'bot'; text: string; options?: string[]; isConversion?: boolean }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasFollowedUp, setHasFollowedUp] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  // Idle follow-up logic
  useEffect(() => {
    if (messages.length > 0 && messages.length < 10 && !isTyping) {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      
      idleTimerRef.current = setTimeout(() => {
        if (!hasFollowedUp) {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
              id: Date.now(),
              sender: 'bot',
              text: "Hi, just following up on your enquiry! 😊 Anything else I can help you with?"
            }]);
            setHasFollowedUp(true);
          }, 1500);
        }
      }, 15000); // 15 seconds idle
    }
    return () => { if (idleTimerRef.current) clearTimeout(idleTimerRef.current); };
  }, [messages, isTyping, hasFollowedUp]);

  const addBotMessage = (msgs: { text: string; options?: string[]; isConversion?: boolean }[]) => {
    msgs.forEach((msg, idx) => {
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            id: Date.now() + idx,
            sender: 'bot',
            text: msg.text,
            options: msg.options,
            isConversion: msg.isConversion
          }]);

          // If it's a final message, trigger the "Setup call" follow-up after 6 seconds
          if (!msg.options && !msg.isConversion) {
            setTimeout(() => {
              setIsTyping(true);
              setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, {
                  id: Date.now() + 99,
                  sender: 'bot',
                  text: "Would you like to set this up for your business? 🚀",
                  options: ["Yes, Book Free Call", "Chat on WhatsApp"],
                  isConversion: true
                }]);
              }, 1200);
            }, 6000);
          }
        }, 1200);
      }, idx * 2500); // Stagger multiple messages
    });
  };

  const startDemo = () => {
    const userMsg = { id: Date.now(), sender: 'user' as const, text: 'Hi' };
    setMessages([userMsg]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'bot', 
        text: config.welcome, 
        options: config.firstOptions 
      }]);
    }, 1500);
  };

  const handleOptionClick = (option: string) => {
    // Clear idle timer
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    // If it's the final conversion buttons
    if (option === "Yes, Book Free Call" || option === "Chat on WhatsApp") {
      window.open(`https://wa.me/917410711563?text=Hi%20I%20want%20to%20automate%20my%20WhatsApp%20leads%20for%20my%20${type}%20business`, '_blank');
      return;
    }

    // 1. Show user bubble first
    const userMsg = { id: Date.now(), sender: 'user' as const, text: option };
    setMessages(prev => [...prev.map(m => ({ ...m, options: undefined })), userMsg]);

    // 2. Trigger Bot Responses based on industry
    let nextMessages: { text: string; options?: string[] }[] = [];

    // Industry Logic
    if (type === 'salon') {
      if (option === "Book Appointment" || option === "Book Now") {
        nextMessages = [{ text: "Great! What service are you looking for? 😊", options: ["Haircut", "Facial", "Hair Spa"] }];
      } else if (option === "Pricing") {
        nextMessages = [{ text: "Here are our starting prices 💇‍♀️" }, { text: "• Haircut: ₹299+\n• Facial: ₹799+\n• Hair Spa: ₹999+" }, { text: "Would you like to book an appointment?", options: ["Book Now", "Talk to Staff"] }];
      } else if (["Haircut", "Facial", "Hair Spa"].includes(option)) {
        nextMessages = [{ text: "Perfect! Please choose a time slot:", options: ["Today", "Tomorrow", "This Weekend"] }];
      } else if (["Today", "Tomorrow", "This Weekend"].includes(option)) {
        nextMessages = [{ text: "You're all set! Our team will confirm your booking shortly. ✅" }];
      }
    } else if (type === 'gym') {
      if (option === "Join Membership" || option === "Book Now") {
        nextMessages = [{ text: "Awesome! Which plan interests you? 💪", options: ["Monthly Plan", "Annual Plan (20% OFF)", "3 Month Trial"] }];
      } else if (option === "Pricing") {
        nextMessages = [{ text: "Monthly plans start at ₹1,999!" }, { text: "Would you like to visit the gym or talk to our trainer?", options: ["Book Visit", "Talk to Trainer"] }];
      } else if (option === "Personal Training") {
        nextMessages = [{ text: "Our trainers help you reach goals 2x faster! Request a free trial?", options: ["Yes, Book Trial", "View Pricing"] }];
      } else if (["Monthly Plan", "Annual Plan (20% OFF)", "3 Month Trial", "Book Visit", "Yes, Book Trial"].includes(option)) {
        nextMessages = [{ text: "Great! Please share your name and preferred visit time below. 🏋️‍♂️" }];
      }
    } else if (type === 'realestate') {
       if (option === "Buy Property" || option === "Rent Property") {
        nextMessages = [{ text: "Excellent choice! Which location are you interested in? 🏡", options: ["South Mumbai", "Navi Mumbai", "Thane"] }];
      } else if (option === "Budget Range") {
        nextMessages = [{ text: "What's your preferred budget range?", options: ["Under 50 Lacs", "50 Lacs - 1 Cr", "Above 1 Cr"] }];
      } else if (["South Mumbai", "Navi Mumbai", "Thane", "Under 50 Lacs", "50 Lacs - 1 Cr", "Above 1 Cr"].includes(option)) {
        nextMessages = [{ text: "Noted! One of our agents will share matching properties with you shortly. 📈" }];
      }
    } else if (type === 'coaching') {
      if (option === "Course Details") {
        nextMessages = [{ text: "We offer top-tier preparation for:\n• JEE/NEET\n• Foundation (8-10th)\n• Olympiads", options: ["JEE/NEET", "Foundation", "Fees"] }];
      } else if (option === "Fees") {
        nextMessages = [{ text: "Our courses start from ₹5,000 per month. 📚" }, { text: "Would you like to attend a free demo class?", options: ["Book Demo Class", "Talk to Counselor"] }];
      } else if (option === "Book Demo Class") {
        nextMessages = [{ text: "Demo class request received! Please choose a date:", options: ["This Saturday", "Next Monday"] }];
      } else if (["This Saturday", "Next Monday", "JEE/NEET", "Foundation"].includes(option)) {
         nextMessages = [{ text: "Registration complete! You'll receive the joining link shortly. 🎓" }];
      }
    } else if (type === 'healthcare') {
      if (option === "Book Appointment") {
        nextMessages = [{ text: "Please select your preferred specialty: 🏥", options: ["General Physician", "Pediatrician", "Dentist"] }];
      } else if (option === "Consultation Fees") {
        nextMessages = [{ text: "Consultation starts at ₹499 per visit. 🩺" }, { text: "Would you like to check availability?", options: ["Check Availability", "Book Appointment"] }];
      } else if (["General Physician", "Pediatrician", "Dentist", "Check Availability"].includes(option)) {
        nextMessages = [{ text: "Please select a preferred time:", options: ["Today", "Tomorrow morning", "Tomorrow evening"] }];
      } else if (["Today", "Tomorrow morning", "Tomorrow evening"].includes(option)) {
        nextMessages = [{ text: "Appointment request sent! Our staff will confirm the final slot in 10 mins. ✅" }];
      }
    }

    if (option === "Talk to Staff" || option === "Talk to Trainer" || option === "Talk to Counselor" || option === "Talk to Staff") {
      nextMessages = [{ text: "Sure! One of our team members will reach out to you on this chat in 2-5 minutes. 🕒" }];
    } else if (option === "View Services" && !nextMessages.length) {
      nextMessages = [{ text: "Loading our full service menu... 📄", options: config.firstOptions.filter(o => o !== "View Services") }];
    }

    if (nextMessages.length > 0) {
      addBotMessage(nextMessages);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] overflow-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[100px] rounded-full"></div>
      </div>

      <Link to="/" className="fixed top-8 left-8 z-50 flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-lg border border-slate-100 text-slate-600 hover:text-primary font-bold transition-all group scale-90 md:scale-100">
        <ArrowRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <div className="max-w-2xl w-full text-center mb-8 relative z-10">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-slate-900 tracking-tight">{config.name} Demo</h1>
        <p className="text-slate-600 text-lg">See how Remorix automates {type} leads instantly.</p>
      </div>

      <div className="w-full max-w-[380px] h-[720px] bg-[#E5DDD5] rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-[12px] border-slate-900 overflow-hidden flex flex-col relative z-10 transition-transform hover:scale-[1.01] duration-500">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-900 rounded-b-2xl z-30"></div>
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-800 rounded-full z-30 opacity-40"></div>
        
        <div className="bg-[#075E54] p-4 pt-10 flex items-center gap-3 text-white shadow-md relative z-20">
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold overflow-hidden border border-white/20">
            <img src={config.image} alt={config.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div>
            <div className="text-sm font-bold flex items-center gap-1.5">
              {config.name}
              <ShieldCheck size={12} className="text-blue-300" />
            </div>
            <div className="text-[10px] flex items-center gap-1 opacity-80">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              Online
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 custom-scrollbar relative z-10" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: '400px' }}>
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40 bg-white/20 backdrop-blur-[2px] rounded-3xl m-2">
              <div className="w-16 h-16 bg-white/40 rounded-full flex items-center justify-center mb-4"><MessageSquare size={32} /></div>
              <p className="text-sm font-bold text-slate-700">Click "Start Demo" below to see the automation flow.</p>
            </div>
          ) : (
            <>
              {messages.map((m) => (
                <div key={m.id} className="flex flex-col gap-2">
                  <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className={`max-w-[85%] p-3 rounded-2xl shadow-sm text-sm relative group ${m.sender === 'user' ? 'bg-[#DCF8C6] self-end rounded-tr-none' : 'bg-white self-start rounded-tl-none text-slate-800'}`}>
                    <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
                    <div className="text-[9px] text-slate-400 text-right mt-1.5 flex items-center justify-end gap-1">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {m.sender === 'user' && <Check size={10} className="text-blue-500" />}
                    </div>
                  </motion.div>
                  {m.options && (
                    <div className="flex flex-col gap-2 pt-1 items-start">
                      {m.options.map((opt, idx) => (
                        <motion.button key={opt} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} onClick={() => handleOptionClick(opt)} className="bg-white text-primary border-b-2 border-slate-100 px-5 py-3 rounded-2xl text-xs font-bold hover:bg-slate-50 transition-all shadow-md active:scale-95 text-left w-fit max-w-[240px]">
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-white self-start rounded-2xl rounded-tl-none p-4 shadow-sm flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                </motion.div>
              )}
            </>
          )}
        </div>

        <div className="p-4 bg-[#F0F2F5] border-t border-slate-200 relative z-20">
          {messages.length === 0 ? (
            <button onClick={startDemo} className="w-full bg-accent text-slate-900 py-4 rounded-2xl font-bold hover:bg-green-400 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 group">
              Start Live Demo
              <Bot size={18} className="group-hover:rotate-12 transition-transform" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
               <div className="flex-1 bg-white p-3 rounded-2xl shadow-inner text-slate-300 text-sm px-4 flex items-center justify-between"><span>Type a message...</span><Zap size={14} className="opacity-20" /></div>
               <div onClick={() => { setMessages([]); setHasFollowedUp(false); }} className="p-3 bg-white text-slate-400 hover:text-red-500 rounded-2xl cursor-pointer transition-all shadow-sm active:scale-90"><X size={20} /></div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 text-center text-slate-400 text-xs flex flex-col gap-2">
         <p>Remorix {type.charAt(0).toUpperCase() + type.slice(1)} Automation v1.2</p>
         <div className="flex items-center gap-4 justify-center">
            <span className="flex items-center gap-1"><ShieldCheck size={12}/> Zero Spam</span>
            <span className="flex items-center gap-1"><Zap size={12} className="fill-current"/> Instant Response</span>
         </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/salon-demo" element={<IndustryDemo type="salon" />} />
        <Route path="/gym-demo" element={<IndustryDemo type="gym" />} />
        <Route path="/realestate-demo" element={<IndustryDemo type="realestate" />} />
        <Route path="/coaching-demo" element={<IndustryDemo type="coaching" />} />
        <Route path="/healthcare-demo" element={<IndustryDemo type="healthcare" />} />
      </Routes>
    </Router>
  );
}

