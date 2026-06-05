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
  Check,
  Dumbbell,
  Stethoscope,
  GraduationCap,
  Building2,
  Compass,
  Ticket,
  Database,
  Bell
} from 'lucide-react';

// --- Components ---

const Logo = ({ variant = 'full', className = "" }: { variant?: 'full' | 'icon' | 'white', className?: string }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="https://i.postimg.cc/RVjnxwfZ/remorix-logo.png" 
        alt="Remorix Automation Logo" 
        className={`${variant === 'icon' ? 'h-8 w-8 object-cover object-left' : 'h-10 md:h-16 w-auto object-contain'}`}
      />
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);

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

  const industries = [
    {
      name: "Gym & Fitness Centers",
      path: "/industries/gym-fitness",
      desc: "Automate class bookings, renewals & follow-ups.",
      icon: Dumbbell,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      name: "Healthcare",
      path: "/industries/healthcare",
      desc: "Automate patient scheduling, reminders & FAQs.",
      icon: Stethoscope,
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20"
    },
    {
      name: "🎓 Education & EdTech",
      path: "/industries/education-edtech",
      desc: "Automate student admissions, course inquiries, counseling bookings, fee collection reminders, and student support.",
      icon: GraduationCap,
      color: "text-purple-500 bg-purple-500/10 border-purple-500/20"
    },
    {
      name: "Real Estate",
      path: "/industries/real-estate",
      desc: "Automate property inquiries, visits & handoffs.",
      icon: Building2,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20"
    },
    {
      name: "Travel & Tourism",
      path: "/industries/travel-tourism",
      desc: "Automate confirmations, itineraries & support.",
      icon: Compass,
      color: "text-sky-500 bg-sky-500/10 border-sky-500/20"
    },
    {
      name: "Events & Webinar",
      path: "/industries/events-webinar",
      desc: "Automate tickets, event reminders & feedback.",
      icon: Ticket,
      color: "text-rose-500 bg-rose-500/10 border-rose-500/20"
    }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="group cursor-pointer">
          <Logo variant="full" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="/"
            className="text-sm font-medium text-secondary-text hover:text-primary transition-colors"
          >
            Home
          </a>

          {/* Solutions Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsSolutionsOpen(true)}
            onMouseLeave={() => setIsSolutionsOpen(false)}
          >
            <button 
              className={`text-sm font-medium flex items-center gap-1 transition-colors ${
                isSolutionsOpen ? 'text-primary' : 'text-secondary-text hover:text-primary'
              }`}
            >
              Solutions
              <ChevronDown size={14} className={`transition-transform duration-350 ${isSolutionsOpen ? 'rotate-180 text-primary' : ''}`} />
            </button>

            <AnimatePresence>
              {isSolutionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[640px] bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 grid grid-cols-2 gap-4 z-50 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary"></div>
                  
                  {industries.map((ind, i) => {
                    const IconComponent = ind.icon;
                    return (
                      <a 
                        key={i}
                        href={ind.path}
                        className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all duration-300 group/navitem border border-transparent hover:border-slate-100 hover:shadow-lg hover:shadow-slate-100/30"
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${ind.color} group-hover/navitem:scale-110 transition-transform duration-300 shadow-sm`}>
                          <IconComponent size={20} />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="text-sm font-bold text-slate-800 group-hover/navitem:text-primary transition-colors flex items-center gap-1">
                            {ind.name}
                            <ArrowRight size={12} className="opacity-0 group-hover/navitem:opacity-100 group-hover/navitem:translate-x-1 transition-all" />
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{ind.desc}</p>
                        </div>
                      </a>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-secondary-text hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://wa.me/917410711563?text=Hi%20I%20want%20to%20automate%20my%20WhatsApp%20leads" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all active:scale-95 cursor-pointer"
          >
            Get Free Setup Call
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-secondary-text"
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
            <div className="p-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
              <a 
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold text-slate-800"
              >
                Home
              </a>

              {/* Mobile Solutions Section */}
              <div className="border-b border-slate-50 pb-2">
                <button 
                  onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)}
                  className="flex items-center justify-between w-full text-lg font-semibold text-slate-800 py-2"
                >
                  Solutions
                  <ChevronDown size={20} className={`transition-transform duration-300 ${isMobileSolutionsOpen ? 'rotate-180 text-primary' : 'text-slate-400'}`} />
                </button>
                
                <AnimatePresence>
                  {isMobileSolutionsOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pl-4 pr-2 flex flex-col gap-3 pt-2"
                    >
                      {industries.map((ind, i) => {
                        const IconComponent = ind.icon;
                        return (
                          <a 
                            key={i}
                            href={ind.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 py-2 text-sm text-slate-600 hover:text-primary transition-colors border-b border-slate-50/50 last:border-0"
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${ind.color}`}>
                              <IconComponent size={14} />
                            </div>
                            <span className="font-medium text-slate-700">{ind.name}</span>
                          </a>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

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
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot' | 'staff'; text: string; time: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0);

  const demoSteps = [
    { sender: 'user', text: 'Hi, available for deep cleaning tomorrow?', time: '10:00 AM', delay: 1000 },
    { sender: 'bot', text: 'Hi! Yes, we have a slot at 10 AM. Would you like to book it?', time: '10:00 AM', delay: 800 },
    { sender: 'user', text: 'Yes, please book it for me.', time: '10:01 AM', delay: 1500 },
    { sender: 'bot', text: 'Great! Confirming with our team...', time: '10:01 AM', delay: 800 },
    { sender: 'staff', text: 'Hi, I am Rahul. Your deep cleaning slot is confirmed for 10 AM tomorrow! ✅', time: '10:02 AM', delay: 2000 },
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step < demoSteps.length) {
      const current = demoSteps[step];
      timer = setTimeout(() => {
        if (current.sender === 'user') {
          setMessages(prev => [...prev, current]);
          setStep(s => s + 1);
        } else {
          setIsTyping(true);
          const typingTimer = setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, current]);
            setStep(s => s + 1);
          }, 1500);
          return () => clearTimeout(typingTimer);
        }
      }, current.delay);
    } else {
      timer = setTimeout(() => {
        setMessages([]);
        setStep(0);
      }, 6000);
    }
    return () => clearTimeout(timer);
  }, [step]);

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
        {messages.map((m, idx) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: m.sender === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            key={idx}
            className={`max-w-[85%] p-2.5 rounded-xl shadow-sm text-sm relative ${
              m.sender === 'user' 
                ? 'bg-[#DCF8C6] self-end rounded-tr-none' 
                : m.sender === 'staff'
                ? 'bg-blue-50 border border-blue-100 self-start rounded-tl-none'
                : 'bg-white self-start rounded-tl-none text-slate-800'
            }`}
          >
            {m.sender === 'staff' && <div className="text-[8px] font-bold text-blue-600 mb-1">Business Verified</div>}
            <p className="whitespace-pre-line text-[13px]">{m.text}</p>
            <div className="text-[9px] text-slate-400 text-right mt-1">{m.time}</div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="bg-white self-start rounded-xl rounded-tl-none p-2 shadow-sm flex gap-1">
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        )}
      </div>

      <div className="p-3 bg-white/50 border-t border-slate-200">
         <div className="bg-white rounded-full px-4 py-2 text-slate-400 text-xs shadow-inner">Type a message...</div>
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
    <div className="min-h-screen selection:bg-primary selection:text-white">
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
            <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border border-primary/10">
              <Zap size={14} className="fill-primary" />
              100% Done-For-You Automation
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-primary-text leading-[1.1]">
              Convert 3x More WhatsApp Leads Into Paying Customers — <span className="text-primary italic">Automatically</span>
            </h1>
            <p className="text-xl text-secondary-text leading-relaxed max-w-lg">
              Never miss a lead again. Remorix instantly replies, follows up, and converts your WhatsApp inquiries into real customers — even while you sleep.
            </p>
            
            <div className="flex flex-col gap-4">
              {[
                "Instant replies to every single lead",
                "Automated follow-ups that drive sales",
                "Full professional setup & maintenance"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-primary-text font-medium">
                  <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
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
              </div>
              <p className="text-primary font-bold text-sm flex flex-col gap-2 items-center sm:items-start">
                <span className="flex items-center gap-2">
                  <Zap size={16} className="fill-current" />
                  ⚡ Free setup for first 10 businesses this month
                </span>
                <span className="text-secondary-text/60 text-[10px] uppercase tracking-wider font-semibold">
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
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-primary-text leading-tight">
                Built on the same infrastructure <br/>
                <span className="text-primary italic">trusted by thousands of businesses</span>
              </h2>
              <p className="text-xl text-secondary-text leading-relaxed mb-8">
                We use official WhatsApp API platforms like <span className="font-bold text-primary-text">Interakt</span> and <span className="font-bold text-primary-text">AiSensy</span> to ensure secure, reliable, and scalable automation.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-10">
                {[
                  "No unofficial tools",
                  "No risk of number bans",
                  "Fully compliant with WhatsApp API"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 text-secondary-text font-bold text-sm uppercase tracking-wide">
                    <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={14} strokeWidth={4} />
                    </div>
                    {text}
                  </div>
                ))}
              </div>

              <div className="space-y-4 p-6 bg-bg rounded-2xl border border-border-light">
                <p className="text-primary-text font-bold flex items-center gap-3">
                  <Zap size={20} className="text-primary fill-primary" />
                  You get enterprise-level automation
                </p>
                <p className="text-primary-text font-bold flex items-center gap-3">
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
      <section className="py-24 bg-bg overflow-hidden" id="problem">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-primary-text">You’re Losing Customers Every Day</h2>
            <div className="space-y-4 mb-8">
              <p className="text-xl text-secondary-text font-medium">Most businesses lose 30–50% of leads due to slow replies.</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-red-500">
                <span>• Customers message but you reply late</span>
                <span>• Leads don’t get follow-ups</span>
                <span>• Interested buyers disappear</span>
              </div>
            </div>
            <p className="text-secondary-text opacity-70 italic">"A lead ignored for 5 minutes is already 80% lost."</p>
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
                className="bg-white p-8 rounded-3xl border border-border-light shadow-sm hover:shadow-md transition-shadow"
                id={`problem-card-${i}`}
              >
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-primary-text">{item.title}</h3>
                <p className="text-secondary-text leading-relaxed">{item.desc}</p>
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
                <p className="text-secondary-text text-lg leading-relaxed">
                  You don’t get software — you get a done-for-you system. No software to learn. No dashboards to manage. We build your flows, set up your triggers, and keep your automation running 24/7.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2.5"></div>
                    <p className="font-semibold text-primary-text">Done-for-you Setup & Maintenance</p>
                  </div>
                   <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2.5"></div>
                    <p className="font-semibold text-primary-text">Direct WhatsApp Integration</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-primary-text">The Remorix <br/>Solution</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-primary-text">Instant replies to every lead</h4>
                  <p className="text-secondary-text leading-relaxed">Our system understands customer intent and replies with pricing, slots, or details instantly.</p>
                </div>
              </div>
              <div className="flex gap-6">
                 <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-primary-text">Automatic Lead Qualification</h4>
                  <p className="text-secondary-text leading-relaxed">We automatically categorize leads so you know exactly who is ready to buy right now.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-primary-text text-white" id="how-it-works">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">How It Works</h2>
            <p className="opacity-70">Simple, effective automation in 3 steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Customer sends message",
                desc: "A lead reaches out on WhatsApp requesting pricing or details about your services.",
                icon: <MessageSquare size={32} className="text-white/80" />
              },
              {
                step: "02",
                title: "Remorix replies instantly",
                desc: "Our automation handles the inquiry immediately with personalized, accurate information.",
                icon: <Zap size={32} className="text-primary" />
              },
              {
                step: "03",
                title: "You convert more leads",
                desc: "Fast replies build trust, helping you close more bookings and sales automatically.",
                icon: <TrendingUp size={32} className="text-white/80" />
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 p-10 rounded-[2.5rem] border border-white/5 text-center flex flex-col items-center gap-6"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">{item.step}</div>
                <div className="p-4 bg-white/5 rounded-2xl">
                  {item.icon}
                </div>
                <h4 className="text-2xl font-bold">{item.title}</h4>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before vs After Section */}
      <section className="py-24 bg-white" id="before-after">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-display font-bold mb-4 text-primary-text">The Impact of Automation</h2>
             <p className="text-secondary-text">The difference Between Stress and Growth</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-bg p-10 rounded-[2.5rem] border-t-4 border-red-500 shadow-sm border border-border-light">
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
                  <li key={i} className="flex gap-4 text-secondary-text">
                    <X className="text-red-400 mt-1 flex-shrink-0" size={20} />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary p-10 rounded-[2.5rem] border-t-4 border-primary text-white shadow-xl shadow-primary/20">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="text-white underline decoration-2 underline-offset-4 font-bold">After</span> Remorix
              </h3>
              <ul className="space-y-6">
                {[
                  "Instant replies (under 5 seconds)",
                  "Automatic lead qualification",
                  "Strategic 7-day follow-up flows",
                  "Significant increase in conversions"
                ].map((text, i) => (
                  <li key={i} className="flex gap-4 text-white/90 font-medium">
                    <CheckCircle2 className="text-white mt-1 flex-shrink-0" size={20} />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-bg" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-primary-text">Everything built <br/>specifically for <span className="text-primary">your</span> business.</h2>
            </div>
            <p className="text-secondary-text max-w-sm mb-2">We don't do generic. Every automation flow is tailored to how your business talks to customers.</p>
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
                className="bg-white p-10 rounded-[2rem] border border-border-light hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group"
                id={`feature-${i}`}
              >
                <div className="mb-6 p-4 bg-bg rounded-2xl w-fit group-hover:bg-primary/5 transition-colors">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-4 text-primary-text">{feature.title}</h4>
                <p className="text-secondary-text leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
            
            {/* CTA Card */}
            <div className="bg-primary p-10 rounded-[2rem] text-white flex flex-col justify-between shadow-xl shadow-primary/20">
              <div>
                <h4 className="text-2xl font-bold mb-4">Start your automation journey today.</h4>
                <p className="opacity-80 leading-relaxed mb-8">We take care of the tech, you take care of the new customers.</p>
              </div>
              <div className="flex flex-col gap-3">
                <a 
                  href="https://wa.me/917410711563?text=Hi%20I%20want%20to%20automate%20my%20WhatsApp%20leads" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-primary text-center py-4 rounded-xl font-bold hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
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
            <h2 className="text-4xl font-display font-bold mb-4 text-primary-text">A Simple 3-Step Process</h2>
            <p className="text-secondary-text">From manual struggle to automatic success in 7 days.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-16 relative">
             {/* Connector line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border-light -translate-y-1/2 -z-10"></div>
            
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
                <div className="w-20 h-20 bg-primary/5 text-primary border-4 border-white rounded-full flex items-center justify-center text-2xl font-display font-bold mx-auto mb-8 shadow-sm">
                  {item.step}
                </div>
                <h4 className="text-2xl font-bold mb-4 text-primary-text">{item.title}</h4>
                <p className="text-secondary-text leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Pricing Section */}
      <section className="py-32 bg-slate-50/50 overflow-hidden relative" id="pricing">
        {/* Futuristic Glow Background Elements */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10 animate-pulse [animation-delay:2s]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-primary-text tracking-tight italic">
              Simple, Powerful <span className="text-primary underline decoration-primary/20 underline-offset-8">Pricing</span>
            </h2>
            <p className="text-xl text-secondary-text max-w-2xl mx-auto opacity-70">
              Choose the perfect automation fuel for your business growth. 
              No hidden fees, just pure conversion.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {/* Starter Package */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
            >
              <div className="mb-8">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-6 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-500">
                  <span className="text-3xl">🟢</span>
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Starter Package</div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-display font-bold text-primary-text">₹3,000</span>
                  <span className="text-slate-400 font-medium">/mo</span>
                </div>
                <p className="text-slate-500 text-sm font-medium">Best for small businesses getting regular inquiries.</p>
              </div>

              <div className="space-y-8 flex-grow mb-10">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-50 pb-2">Communication</h4>
                  <ul className="space-y-3">
                    {[
                      "WhatsApp customer support",
                      "FAQ automation",
                      "Pricing inquiry automation",
                      "Schedule/timing sharing",
                      "Human handoff support",
                      "Support routing"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                        <Check size={14} className="text-primary flex-shrink-0" strokeWidth={3} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-50 pb-2">Data & Management</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm font-medium text-slate-600">
                      <Check size={14} className="text-primary flex-shrink-0" strokeWidth={3} />
                      Google Sheets/CRM lead collection
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Growth Package */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="relative group bg-white rounded-[3.5rem] p-10 border-2 border-primary shadow-2xl shadow-primary/10 flex flex-col transition-all duration-500"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-primary/30 whitespace-nowrap">
                Most Popular
              </div>

              <div className="mb-8">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-primary/30">
                  <span className="text-3xl">🟡</span>
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">Growth Package</div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-display font-bold text-primary-text tracking-tight">₹5,000</span>
                  <span className="text-primary font-bold">/mo</span>
                </div>
                <p className="text-slate-500 text-sm font-medium">Best for growing businesses running ads & needing conversion.</p>
              </div>

              <div className="space-y-8 flex-grow mb-10">
                <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest text-center">Everything in Starter +</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-4 border-b border-primary/5 pb-2">Booking & Onboarding</h4>
                  <ul className="space-y-3">
                    {[
                      "Booking system automation",
                      "Consultation/demo booking",
                      "Onboarding automation",
                      "Appointment scheduling"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-bold text-primary-text">
                        <Check size={16} className="text-primary flex-shrink-0" strokeWidth={3} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-4 border-b border-primary/5 pb-2">Lead & Sales Automation</h4>
                  <ul className="space-y-3">
                    {[
                      "Automated inquiry handling",
                      "Lead capture automation",
                      "Lead qualification flow",
                      "WhatsApp-based sales funnel",
                      "Abandoned inquiry follow-ups",
                      "AI follow-up system"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-bold text-primary-text">
                        <Check size={16} className="text-primary flex-shrink-0" strokeWidth={3} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Pro Package */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/5"
            >
              <div className="mb-8">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-6 group-hover:bg-red-50 group-hover:text-red-500 transition-colors duration-500">
                  <span className="text-3xl">🔴</span>
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Pro / Custom Package</div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-display font-bold text-primary-text tracking-tighter uppercase">Custom Pricing</span>
                </div>
                <p className="text-slate-500 text-sm font-medium">Best for premium brands & high-volume automation.</p>
              </div>

              <div className="space-y-8 flex-grow mb-10">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Everything in Growth +</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-50 pb-2">Systems & Features</h4>
                  <ul className="space-y-3">
                    {[
                      "Re-engagement campaigns",
                      "Broadcast marketing campaigns",
                      "AI-powered assistant systems",
                      "Advanced workflows",
                      "API integrations",
                      "Custom CRM integrations",
                      "Advanced analytics",
                      "Multi-agent systems"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                        <Zap size={14} className="text-red-400 flex-shrink-0 fill-red-400/20" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-20 text-center">
             <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-full border border-slate-100 shadow-sm">
                <ShieldCheck className="text-primary" size={20} />
                <p className="text-sm font-bold text-slate-600">
                  Setup done for you in <span className="text-primary italic">24 hours</span>. Full ongoing maintenance included.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-bg" id="faq">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-primary-text">Frequently Asked Questions</h2>
          </div>
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-border-light">
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
          <div className="bg-primary rounded-3xl md:rounded-[3rem] overflow-hidden relative shadow-2xl shadow-primary/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 opacity-90 -z-10"></div>
            <div className="grid md:grid-cols-2">
              <div className="p-6 sm:p-12 md:p-20 text-white flex flex-col justify-center">
                <h2 className="text-3xl md:text-6xl font-display font-bold mb-8 leading-tight">Ready to win <br/>back your time?</h2>
                <div className="space-y-6 mb-12">
                   <a href="tel:+917410711563" className="flex items-center gap-4 text-base md:text-xl font-bold hover:text-white transition-colors">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Phone size={20} className="md:w-6 md:h-6" />
                      </div>
                      +91 7410711563
                   </a>
                   <a href="mailto:info@remorix.in" className="flex items-center gap-4 text-base md:text-xl font-bold hover:text-white transition-colors">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Mail size={20} className="md:w-6 md:h-6" />
                      </div>
                      info@remorix.in
                   </a>
                </div>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://wa.me/917410711563?text=Hi%20I%20want%20to%20automate%20my%20WhatsApp%20leads" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-primary px-6 md:px-8 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-white/90 transition-colors flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
                    id="contact-whatsapp"
                  >
                    <MessageSquare size={18} className="fill-primary" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-black/5 p-6 sm:p-12 md:p-20 backdrop-blur-sm border-t md:border-t-0 md:border-l border-white/10">
                <AnimatePresence mode="wait">
                  <div className="mb-8 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Start converting more WhatsApp leads into customers today.</h3>
                    <p className="text-white/85 text-sm md:text-base">Setup takes less than 24 hours. Limited onboarding slots available this month.</p>
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
                        <label className="text-white text-xs md:text-sm font-bold opacity-80 pl-1 uppercase tracking-wider">Your Name</label>
                        <input 
                          name="name"
                          type="text" 
                          required
                          placeholder="e.g. Rahul Sharma" 
                          className="bg-white/10 border border-white/20 rounded-2xl py-4 px-5 md:p-5 text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors transition-shadow text-sm md:text-base"
                          id="form-name"
                        />
                      </div>
                       <div className="flex flex-col gap-2">
                        <label className="text-white text-xs md:text-sm font-bold opacity-80 pl-1 uppercase tracking-wider">Business Phone</label>
                        <input 
                          name="phone"
                          type="tel" 
                          required
                          placeholder="+91 00000 00000" 
                          className="bg-white/10 border border-white/20 rounded-2xl py-4 px-5 md:p-5 text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors text-sm md:text-base"
                          id="form-phone"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-white text-xs md:text-sm font-bold opacity-80 pl-1 uppercase tracking-wider">Business Type</label>
                        <input 
                          name="business"
                          type="text" 
                          required
                          placeholder="e.g. Yoga Gym, Dental Clinic" 
                          className="bg-white/10 border border-white/20 rounded-2xl py-4 px-5 md:p-5 text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors text-sm md:text-base"
                          id="form-type"
                        />
                      </div>
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-white text-primary w-full py-4 md:py-5 rounded-2xl font-bold text-lg md:text-xl hover:bg-slate-50 transition-colors shadow-lg shadow-black/10 mt-4 active:scale-95 cursor-pointer disabled:opacity-50"
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
                      <div className="w-20 h-20 bg-white text-primary rounded-full flex items-center justify-center mb-6 shadow-xl shadow-black/10">
                        <Check size={40} strokeWidth={3} />
                      </div>
                      <h3 className="text-3xl font-display font-bold text-white mb-4">You're on the list!</h3>
                      <p className="text-white/90 text-lg leading-relaxed">
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
      <footer className="py-20 bg-bg border-t border-border-light" id="footer">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
             <a href="#hero" className="mb-6 block cursor-pointer">
                <Logo variant="full" />
              </a>
              <p className="text-secondary-text text-sm leading-relaxed mb-6">
                Redefining sales for Indian local businesses through seamless WhatsApp automation. Built with ❤️ for Bharat.
              </p>
              <div className="flex gap-4">
                 <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center text-secondary-text hover:text-primary transition-colors cursor-pointer border border-border-light">
                    <TrendingUp size={18} />
                 </div>
                 <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center text-secondary-text hover:text-primary transition-colors cursor-pointer border border-border-light">
                    <MessageSquare size={18} />
                 </div>
              </div>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-primary-text">Navigation</h5>
            <div className="flex flex-col gap-4">
              <a href="#how-it-works-visual" className="text-secondary-text text-sm hover:text-primary transition-colors cursor-pointer">How It Works</a>
              <a href="#features" className="text-secondary-text text-sm hover:text-primary transition-colors cursor-pointer">Features</a>
              <a href="#pricing" className="text-secondary-text text-sm hover:text-primary transition-colors cursor-pointer">Pricing</a>
              <a href="#contact" className="text-secondary-text text-sm hover:text-primary transition-colors cursor-pointer">Contact</a>
            </div>
          </div>

          <div>
             <h5 className="font-bold mb-6 text-primary-text">Contact Details</h5>
             <div className="flex flex-col gap-4">
                <a href="tel:+917410711563" className="flex items-center gap-3 text-secondary-text text-sm hover:text-primary transition-colors cursor-pointer">
                  <Phone size={16} /> +91 7410711563
                </a>
                 <a href="mailto:info@remorix.in" className="flex items-center gap-3 text-secondary-text text-sm hover:text-primary transition-colors cursor-pointer">
                  <Mail size={16} /> info@remorix.in
                </a>
                <div className="flex items-center gap-3 text-secondary-text text-sm">
                   <Users size={16} /> Mumbai, India
                </div>
             </div>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-primary-text">Quick Connection</h5>
            <a 
              href="https://wa.me/917410711563?text=Hi%20I%20want%20to%20automate%20my%20WhatsApp%20leads" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-white px-6 py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all text-sm cursor-pointer shadow-lg shadow-primary/20"
              id="footer-whatsapp-btn"
            >
              <MessageSquare size={18} className="fill-white" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-border-light flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-secondary-text/50 text-xs">© 2026 Remorix Automation. All rights reserved.</p>
           <div className="flex gap-8">
              <span className="text-secondary-text/50 text-xs hover:text-secondary-text transition-colors cursor-pointer">Privacy Policy</span>
              <span className="text-secondary-text/50 text-xs hover:text-secondary-text transition-colors cursor-pointer">Terms of Service</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

const demoConfigs: any = {
  salon: {
    name: "Glow & Grace Salon",
    welcome: "Hi! Welcome to Glow & Grace Salon 💇‍♀️ What can we do for you today?",
    image: "https://i.postimg.cc/RVjnxwfZ/remorix-logo.png",
    firstOptions: ["Book Appointment", "View Prices"],
    flows: {
      "Book Appointment": [
        { sender: 'bot', text: "Great! Let me check our availability for today... 📅" },
        { sender: 'staff', text: "Hi! I'm Priya. We have a slot open at 5:30 PM with our lead stylist. Does that work for you?", options: ["Yes, Book it", "Talk to Staff"] }
      ],
      "View Prices": [
        { sender: 'bot', text: "Here are our starting prices 💇‍♀️\n• Haircut: ₹500\n• Global Coloring: ₹2499\n• Hydrafacial: ₹1999" },
        { sender: 'staff', text: "I'm Reema! If you book any service today, you'll get a free head massage. Want to check a slot?", options: ["Yes, Book Now", "Maybe later"] }
      ],
      "Yes, Book it": [
        { sender: 'staff', text: "Perfect! I've reserved your slot for 5:30 PM today. See you at the salon! ✨", isConversion: true }
      ],
      "Yes, Book Now": [
        { sender: 'staff', text: "Excellent! I've reserved that slot for you. See you soon! ✂️", isConversion: true }
      ]
    }
  },
  gym: {
    name: "ONE REP MAX Fitness Hub",
    welcome: "🏋️ Welcome to ONE REP MAX Fitness Hub\n\nReady to transform your physique and level up your fitness journey?\n\nTrain with expert guidance, premium equipment, and result-driven programs built for real transformation.\n\nHow can we help you today?",
    image: "https://i.postimg.cc/RVjnxwfZ/remorix-logo.png",
    firstOptions: ["Membership Plans", "Book Free Trial", "Program Details", "Personal Training", "Talk to Support"],
    flows: {}
  },
  realestate: {
    name: "Skyline Properties",
    welcome: "Welcome to Skyline Properties! 🏘️ Looking for your dream home?",
    image: "https://i.postimg.cc/RVjnxwfZ/remorix-logo.png",
    firstOptions: ["View Listings", "Book Site Visit"],
    flows: {
      "View Listings": [
        { sender: 'bot', text: "Sure! We have 3 premium 2BHK units available in the city center starting from ₹85L. 🏢" },
        { sender: 'staff', text: "Hi, I'm Rajesh. I've sent the detailed brochure and floor plans to your WhatsApp. Would you like to see a video tour?", options: ["Watch Video", "Book Visit"] }
      ],
      "Book Site Visit": [
        { sender: 'bot', text: "Excellent choice. Personal visits are the best way to feel the space." },
        { sender: 'staff', text: "Hi, I'm Pooja. I'm at the property site right now. I can show you around tomorrow at 11 AM or 4 PM. Which works?", options: ["11 AM Tomorrow", "4 PM Tomorrow"] }
      ],
      "Watch Video": [{ sender: 'bot', text: "Sending tour video... 🎥 Let me know if you'd like to schedule a physical visit after watching!", isConversion: true }],
      "11 AM Tomorrow": [{ sender: 'staff', text: "Great! I've scheduled your visit for 11 AM. I'll send the location pin 1 hour before the visit. See you! 📍", isConversion: true }]
    }
  },
  healthcare: {
    name: "City Care Clinic",
    welcome: "Welcome to City Care Clinic 🏥 How can we assist you today?",
    image: "https://i.postimg.cc/RVjnxwfZ/remorix-logo.png",
    firstOptions: ["📅 Book Appointment", "💻 Consult Doctor Online", "🩺 Specializations", "🚨 Emergency Helpline", "📍 Clinic Location"],
    flows: {}
  },
  education: {
    name: "EduFlow AI",
    welcome: "👋 Welcome to EduFlow AI\n\nAutomate admissions, counseling, student support, and follow-ups through WhatsApp.\n\nHow can we help you today?",
    image: "https://i.postimg.cc/RVjnxwfZ/remorix-logo.png",
    firstOptions: ["🎓 Course Inquiry", "📝 Admission Process", "💰 Fee Structure", "📅 Book Counseling", "📚 Student Support"],
    flows: {}
  },
  travel: {
    name: "RoamFree Travels",
    welcome: "Hi! Welcome to RoamFree Travels 🏔️ Let's design your dream vacation!",
    image: "https://i.postimg.cc/RVjnxwfZ/remorix-logo.png",
    firstOptions: ["Explore Packages", "Instant Support"],
    flows: {
      "Explore Packages": [
        { sender: 'bot', text: "Choose your paradise:\n\n🌴 Maldives Gateway - 4D/3N\n🏔️ Himachal Adventure - 6D/5N\n🌸 Bali Bliss - 5D/4N" },
        { sender: 'staff', text: "Hey there! I'm Kabir. If you book today, we get you a flat ₹5,000 off on international bookings. Want to customize an itinerary?", options: ["Send Himachal Plan", "Request Bali Call"] }
      ],
      "Instant Support": [
        { sender: 'bot', text: "We are here 24/7. Connecting you to travel helpline team... ✈️" },
        { sender: 'staff', text: "Hi, I'm Sarah from client support. Please share your booking reference number and query below.", isConversion: true }
      ],
      "Send Himachal Plan": [{ sender: 'bot', text: "PDF itinerary sent! 🏔️ Pack your bags and get ready for snow peaks! Let me know if you need custom stays.", isConversion: true }]
    }
  },
  events: {
    name: "Nexus Web Events",
    welcome: "Hi! Welcome to Nexus Web Events 🎟️ Ready to reserve your ticket?",
    image: "https://i.postimg.cc/RVjnxwfZ/remorix-logo.png",
    firstOptions: ["Claim Webinar Ticket", "Speaker Lineup"],
    flows: {
      "Claim Webinar Ticket": [
        { sender: 'bot', text: "Splendid! Registration takes less than 30 seconds." },
        { sender: 'staff', text: "Hey! I'm Varun. We have limited free seat tickets remaining for this Sunday's Masterclass. Reserve your entry spot now?", options: ["Yes, Reserve Spot", "Ask Event Timing"] }
      ],
      "Speaker Lineup": [
        { sender: 'bot', text: "This Sunday, we have industry leaders from Google, Meta, and Netflix sharing conversion secrets! 🎙️" },
        { sender: 'staff', text: "Kajal here! Would you like a VIP calendar invite so you don't miss any session?", options: ["Get Calendar Invite", "Talk to Staff"] }
      ],
      "Yes, Reserve Spot": [{ sender: 'staff', text: "Confirmed! 🎉 Your digital entry ticket with a unique QR code has been delivered to your WhatsApp. See you on Sunday!", isConversion: true }],
      "Get Calendar Invite": [{ sender: 'staff', text: "Perfect! 📅 Google Calendar invite dispatched. Looking forward to having you with us!", isConversion: true }]
    }
  }
};

const InstagramAdPreview = ({ type, onCtaClick }: { type: string; onCtaClick: () => void }) => {
  const isGym = type === 'gym';

  let profileInitials = "1RM";
  let profileHandle = "onerepmax_fitness";
  let captionText = "STOP making excuses. 🏋️ Join ONE REP MAX Fitness Hub. Claim your FREE Trial and personalized coaching consultation. Click below to start chatting instantly with our coaches on WhatsApp!";
  let likedByText = "fitness_coach_am and 2,410 others";
  let timeAgo = "3 hours ago";

  let adImage = "https://i.ibb.co/MDWbtVRD/Screenshot-2026-06-01-160924.png";
  let adTitle = "ONE REP MAX FITNESS STUDIO";
  let adBadge = "MEMBERSHIP STARTS AT ₹599";
  let adOffers = ["✨ Cardio & Strengthening", "✨ Body Transformation & Weight Loss", "✨ Steam Bath & Specialist Personal Trainers"];

  if (type === 'salon') {
    profileInitials = "GG";
    profileHandle = "glowandgrace_salon";
    captionText = "Get the luxury salon makeover you deserve! ✨ Claim a FREE head massage with any service booked today. Click below to start chatting with our stylist on WhatsApp! 💇‍♀️💅";
    likedByText = "stylist_priya and 1,894 others";
    adImage = "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80";
    adTitle = "Glow & Grace Makeover";
    adBadge = "FREE HEAD MASSAGE";
    adOffers = ["✨ Balayage & Styling Special", "✨ Premium Hair & Nail Spa", "✨ Professional HydraFacials"];
    timeAgo = "1 hour ago";
  } else if (type === 'realestate') {
    profileInitials = "SP";
    profileHandle = "skyline_properties";
    captionText = "Your dream home is waiting! Premium City Center apartments starting at ₹85 Lakhs. Click to get catalogs, video tours and scheduled site visits on WhatsApp! 🏢🏙️";
    likedByText = "rajesh_realestate and 3,120 others";
    adImage = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80";
    adTitle = "Skyline Luxury Residences";
    adBadge = "2BHK CITY CENTER UNIT";
    adOffers = ["📍 Heart of the City Location", "📹 On-Demand Video Walkthroughs", "📆 Scheduled Personal Viewings"];
    timeAgo = "2 hours ago";
  } else if (type === 'healthcare') {
    profileInitials = "CC";
    profileHandle = "citycare_clinic";
    captionText = "Skip the crowded waiting lines! Book your appointment with Dr. Mehta or consult online with expert doctors instantly. Click below to chat with our staff on WhatsApp! 👨‍⚕️💊";
    likedByText = "dr_rohan and 1,452 others";
    adImage = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80";
    adTitle = "City Care Clinic Online";
    adBadge = "SKIP WAITING ROOMS";
    adOffers = ["👨‍⚕️ Top Senior Physicians", "💻 Live Digital Consultant Chats", "⏱️ Direct Appt Scheduling"];
    timeAgo = "4 hours ago";
  } else if (type === 'education') {
    profileInitials = "EF";
    profileHandle = "eduflow_ai";
    captionText = "Accelerate your career in tech! 🚀 100% placement support, live assessment and 1-on-1 counseling. Click below to book your FREE counseling seat on WhatsApp! 💻📊";
    likedByText = "placement_cell and 4,520 others";
    adImage = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80";
    adTitle = "EduFlow Tech Accelerator";
    adBadge = "1-ON-1 FREE COUNSELING";
    adOffers = ["🚀 Practical Real-world Curriculum", "💼 100% Comprehensive Job Hunt Assistance", "🎓 Direct Interactive Enrollment Slots"];
    timeAgo = "5 hours ago";
  } else if (type === 'travel') {
    profileInitials = "RF";
    profileHandle = "roamfree_travels";
    captionText = "Your next paradise is just a chat away! Get flat ₹5,000 off on Maldives, Himachal, or Bali itineraries today. Click below to plan your custom travel on WhatsApp! 🌴✈️";
    likedByText = "wanderlust_kabir and 2,240 others";
    adImage = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80";
    adTitle = "RoamFree Luxury Escapes";
    adBadge = "FLAT ₹5,000 OFF TODAY";
    adOffers = ["🌴 Custom Maldives Resorts Plans", "🏔️ Spectacular Himachal Hikes", "🌸 Magical Bali Bliss Packages"];
    timeAgo = "1 hour ago";
  } else if (type === 'events') {
    profileInitials = "NX";
    profileHandle = "nexus_events";
    captionText = "Masterclass seats filling fast! Learn from leaders at Google, Meta, and Netflix this Sunday. Click below to claim your standard FREE entry ticket & calendar invite on WhatsApp! 🎙️📅";
    likedByText = "kajal_meta and 5,115 others";
    adImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80";
    adTitle = "Nexus Web Masterclass";
    adBadge = "FREE SUNDAY ENTRY SEAT";
    adOffers = ["🎙️ Speakers from Google, Meta & Netflix", "📅 Instant Google Calendar Reserve Link", "🎁 Custom Digital VIP Tickets Delivered"];
    timeAgo = "1 hour ago";
  }

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans select-none overflow-y-auto custom-scrollbar">
      {/* Mobile simulated Status Bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-2 text-[10px] font-bold text-slate-700 bg-white">
        <div>10:50</div>
        <div className="flex items-center gap-1.5">
          <span className="opacity-80">5G</span>
          <div className="w-5 h-2.5 border border-slate-700 rounded-sm p-0.5 flex items-center">
            <div className="w-full h-full bg-slate-700 rounded-xs"></div>
          </div>
        </div>
      </div>

      {/* Instagram App Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-slate-100 flex-shrink-0">
        <div className="font-serif font-black text-xl text-slate-800 tracking-tight italic select-none">Instagram</div>
        <div className="flex items-center gap-5 text-slate-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex items-center justify-between px-3.5 py-2.5 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-red-500 to-purple-600 p-[2px] shadow-sm flex items-center justify-center">
            <div className="w-full h-full rounded-full border border-white bg-slate-900 flex items-center justify-center text-[9px] text-amber-400 font-black tracking-tighter uppercase">
              {profileInitials}
            </div>
          </div>
          <div className="flex flex-col text-left leading-tight">
            <span className="text-[12px] font-bold text-slate-800 flex items-center gap-1 leading-none">
              {profileHandle}
              <span className="text-blue-500 text-[10px] select-none" title="Verified Account">✓</span>
            </span>
            <span className="text-[9px] text-slate-500 font-semibold leading-none mt-1">Sponsored</span>
          </div>
        </div>
        <button className="text-slate-400 p-1 hover:bg-slate-50 rounded-full transition-all">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Main Ad Image / Creative Wrapper */}
      <div className="relative w-full aspect-square bg-slate-900 border-y border-slate-100 flex-shrink-0 select-none overflow-hidden">
        {isGym ? (
          <>
            <img 
              src={adImage} 
              alt="Instagram Ad Campaign Creative" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            {/* High-fidelity interactive "Chat on WhatsApp" button overlay */}
            {/* Sits exactly on top of the drawn button coordinates in the vertical screenshot */}
            <motion.button
              onClick={onCtaClick}
              whileHover={{ scale: 1.015, brightness: 1.05 }}
              whileTap={{ scale: 0.985 }}
              className="absolute top-[78.6%] left-[4.8%] w-[76.5%] h-[6.8%] bg-[#208365] hover:bg-[#1a7358] text-white rounded-xl flex items-center justify-between px-3.5 shadow-md active:scale-95 transition-all text-left z-20 group border border-white/5 font-sans cursor-pointer"
              style={{
                boxShadow: "0 4px 15px rgba(32,131,101,0.4)"
              }}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 fill-current text-white flex-shrink-0 animate-pulse" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.489.002 9.961-4.438 9.964-9.893.001-2.643-1.02-5.127-2.877-6.986-1.855-1.859-4.325-2.883-6.963-2.884-5.49 0-9.966 4.438-9.969 9.894-.001 1.942.512 3.63 1.42 5.093l-.974 3.556 3.739-.98z" />
                </svg>
                <span className="text-[12.5px] font-extrabold tracking-wide text-white font-sans leading-none">Chat on WhatsApp</span>
              </div>
              
              <svg className="w-4 h-4 stroke-current text-white transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </>
        ) : (
          <>
            <img 
              src={adImage} 
              alt={adTitle} 
              className="w-full h-full object-cover opacity-90"
              referrerPolicy="no-referrer"
            />
            {/* Elegant overlay gradient to make textual information pop */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />

            <div className="absolute inset-x-4 bottom-18 text-white flex flex-col gap-1 text-left z-10">
              <span className="bg-yellow-400 text-slate-900 font-black text-[9px] px-2 py-0.5 rounded-md w-fit uppercase tracking-wider mb-1">
                {adBadge}
              </span>
              <h3 className="font-extrabold text-[15px] tracking-tight text-white leading-tight uppercase">
                {adTitle}
              </h3>
              <div className="flex flex-col gap-0.5 mt-1">
                {adOffers.map((offer, idx) => (
                  <div key={idx} className="text-[9.5px] text-white/95 font-semibold flex items-center gap-1.5">
                    {offer}
                  </div>
                ))}
              </div>
              <p className="text-[8px] text-slate-300 italic mt-0.5">Powered by Remorix Automation Lead-Capture Engine</p>
            </div>

            {/* Custom CTA matching the style perfectly but dynamically rendered on non-gym post */}
            <motion.button
              onClick={onCtaClick}
              whileHover={{ scale: 1.015, brightness: 1.05 }}
              whileTap={{ scale: 0.985 }}
              className="absolute bottom-3 left-4 right-4 bg-[#208365] hover:bg-[#1a7358] text-white py-3 px-4 rounded-xl flex items-center justify-between shadow-lg active:scale-95 transition-all text-left z-20 group border border-white/10 font-sans cursor-pointer"
              style={{
                boxShadow: "0 4px 15px rgba(32,131,101,0.4)"
              }}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 fill-current text-white flex-shrink-0 animate-pulse" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.489.002 9.961-4.438 9.964-9.893.001-2.643-1.02-5.127-2.877-6.986-1.855-1.859-4.325-2.883-6.963-2.884-5.49 0-9.966 4.438-9.969 9.894-.001 1.942.512 3.63 1.42 5.093l-.974 3.556 3.739-.98z" />
                </svg>
                <span className="text-[12.5px] font-extrabold tracking-wide text-white font-sans leading-none">Chat on WhatsApp</span>
              </div>
              
              <svg className="w-4 h-4 stroke-current text-white transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </>
        )}
      </div>

      {/* Description text under click */}
      <div className="px-4 pb-5 text-left flex-shrink-0">
        <div className="text-[11px] font-extrabold text-slate-900 leading-snug">
          Liked by {likedByText}
        </div>
        <div className="text-[11px] mt-1 text-slate-600 leading-relaxed">
          <span className="font-extrabold text-slate-800 mr-1.5">{profileHandle}</span>
          {captionText}
        </div>
        <div className="text-[9.5px] text-slate-400 font-bold mt-2 uppercase tracking-wide">
          View all 148 comments
        </div>
        <div className="text-[8px] text-slate-400 font-bold mt-0.5 uppercase tracking-wider">
          {timeAgo}
        </div>
      </div>
    </div>
  );
};

const GymForm = ({ onSubmit }: { onSubmit: (data: { name: string; phone: string; date: string; goal: string }) => void }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [goal, setGoal] = useState('Muscle Gain');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter your phone number");
      return;
    }
    if (!date) {
      setError("Please choose a date");
      return;
    }
    setError('');
    setSubmitted(true);
    onSubmit({ name, phone, date, goal });
  };

  if (submitted) {
    return (
      <div className="text-center py-2 text-emerald-600 font-bold flex items-center justify-center gap-1.5 text-xs">
        <CheckCircle2 size={14} className="text-emerald-500" /> Lead Information Recorded
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-3 bg-slate-50 p-4 rounded-xl border border-slate-150 shadow-xs text-left w-full max-w-[280px]">
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5 flex items-center gap-1">
        📝 Interactive Application Form
      </div>
      
      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5 tracking-wider">👤 Full Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Rahul Sharma" 
          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-green-500 font-sans text-slate-800"
          required
        />
      </div>

      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5 tracking-wider">📞 Phone Number</label>
        <input 
          type="tel" 
          value={phone} 
          onChange={e => setPhone(e.target.value)}
          placeholder="e.g. +91 98765 43210" 
          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-green-500 font-sans text-slate-800"
          required
        />
      </div>

      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5 tracking-wider">🎯 Primary Fitness Goal</label>
        <select 
          value={goal} 
          onChange={e => setGoal(e.target.value)}
          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-green-500 font-sans text-slate-850"
        >
          <option value="Muscle Gain">Muscle Gain 🏋️</option>
          <option value="Weight Loss">Weight Loss 🏃</option>
          <option value="Body Transformation">Body Transformation ⭐</option>
          <option value="General Fitness">General Fitness 💪</option>
        </select>
      </div>

      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5 tracking-wider">📅 Preferred Visit Date</label>
        <input 
          type="date" 
          value={date} 
          onChange={e => setDate(e.target.value)}
          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-green-500 font-sans text-slate-800"
          required
        />
      </div>

      {error && <div className="text-[10px] text-red-500 font-bold">{error}</div>}
      
      <button 
        type="submit" 
        className="mt-1.5 w-full bg-[#128C7E] hover:bg-[#075E54] text-white py-2 rounded-lg text-xs font-bold shadow-sm transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <Check size={14} strokeWidth={3} /> Submit Booking Form
      </button>
    </form>
  );
};

const EduCounselingForm = ({ onSubmit }: { onSubmit: (data: { name: string; phone: string; email: string; course: string }) => void }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('Digital Marketing');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter your phone number");
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError("Please enter a valid email address");
      return;
    }
    setError('');
    setSubmitted(true);
    onSubmit({ name, phone, email, course });
  };

  if (submitted) {
    return (
      <div className="text-center py-2 text-emerald-600 font-bold flex items-center justify-center gap-1.5 text-xs">
        <CheckCircle2 size={14} className="text-emerald-500" /> Booking Session Scheduled
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-3 bg-slate-50 p-4 rounded-xl border border-slate-150 shadow-xs text-left w-full max-w-[280px]">
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5 flex items-center gap-1">
        🎓 Interactive Booking Form
      </div>
      
      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5 tracking-wider">👤 Full Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Rahul Sharma" 
          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-green-500 font-sans text-slate-850"
          required
        />
      </div>

      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5 tracking-wider">📞 Phone Number</label>
        <input 
          type="tel" 
          value={phone} 
          onChange={e => setPhone(e.target.value)}
          placeholder="e.g. +91 98765 43210" 
          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-green-500 font-sans text-slate-850"
          required
        />
      </div>

      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5 tracking-wider">📧 Email Address</label>
        <input 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)}
          placeholder="e.g. rahul@example.com" 
          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-green-500 font-sans text-slate-850"
          required
        />
      </div>

      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5 tracking-wider">🎓 Course of Interest</label>
        <select 
          value={course} 
          onChange={e => setCourse(e.target.value)}
          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-green-500 font-sans text-slate-850 animate-none"
        >
          <option value="Digital Marketing">Digital Marketing 💻</option>
          <option value="Data Analytics">Data Analytics 📊</option>
          <option value="Graphic Design">Graphic Design 🎨</option>
          <option value="AI & Automation">AI & Automation 🤖</option>
        </select>
      </div>

      {error && <div className="text-[10px] text-red-500 font-bold">{error}</div>}
      
      <button 
        type="submit" 
        className="mt-1.5 w-full bg-[#128C7E] hover:bg-[#075E54] text-white py-2 rounded-lg text-xs font-bold shadow-sm transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <Check size={14} strokeWidth={3} /> Submit Booking Form
      </button>
    </form>
  );
};

const HealthcareApptForm = ({ onSubmit }: { onSubmit: (data: { name: string; phone: string; age: string; dept: string }) => void }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [dept, setDept] = useState('General Medicine 🩺');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter patient's name");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter phone number");
      return;
    }
    if (!age.trim() || isNaN(Number(age)) || Number(age) <= 0) {
      setError("Please enter a valid age");
      return;
    }
    setError('');
    setSubmitted(true);
    onSubmit({ name, phone, age, dept });
  };

  if (submitted) {
    return (
      <div className="text-center py-2 text-teal-600 font-bold flex items-center justify-center gap-1.5 text-xs">
        <CheckCircle2 size={14} className="text-teal-500" /> Patient Slot Requested
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-3 bg-slate-50 p-4 rounded-xl border border-slate-150 shadow-xs text-left w-full max-w-[280px]">
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5 flex items-center gap-1">
        🩺 Patient Intake Registry
      </div>
      
      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5 tracking-wider">👤 Patient Full Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Ramesh Kumar" 
          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-green-500 font-sans text-slate-855"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5 tracking-wider">📞 Phone No.</label>
          <input 
            type="tel" 
            value={phone} 
            onChange={e => setPhone(e.target.value)}
            placeholder="e.g. 9876543210" 
            className="w-full text-xs p-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-green-500 font-sans text-slate-855"
            required
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5 tracking-wider">🎂 Age</label>
          <input 
            type="number" 
            value={age} 
            onChange={e => setAge(e.target.value)}
            placeholder="e.g. 35" 
            className="w-full text-xs p-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-green-500 font-sans text-slate-855"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5 tracking-wider">🩺 Doctor Department</label>
        <select 
          value={dept} 
          onChange={e => setDept(e.target.value)}
          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-green-500 font-sans text-slate-845 animate-none"
        >
          <option value="General Medicine 🩺">Dr. Mehta (General Medicine)</option>
          <option value="Pediatrics (Kids) 👶">Dr. Roy (Pediatrics)</option>
          <option value="Dermatology (Skin) 🥑">Dr. Joshi (Dermatology)</option>
          <option value="Cardiology (Heart) ❤️">Dr. Iyer (Cardiology)</option>
        </select>
      </div>

      {error && <div className="text-[10px] text-red-500 font-bold">{error}</div>}
      
      <button 
        type="submit" 
        className="mt-1.5 w-full bg-[#128C7E] hover:bg-[#075E54] text-white py-2 rounded-lg text-xs font-bold shadow-sm transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <Check size={14} strokeWidth={3} /> Register & Book Slot
      </button>
    </form>
  );
};

const WhatsAppPhone = ({ type }: { type: string }) => {
  const config = demoConfigs[type as keyof typeof demoConfigs] || demoConfigs.salon;
  const isGym = type === 'gym';
  const isEdu = type === 'education';
  const isHealth = type === 'healthcare';

  // State Management for Gym click-to-WhatsApp Funnel
  const [igAdActive, setIgAdActive] = useState(true);
  const [gymSelectedGoal, setGymSelectedGoal] = useState("");
  const [gymSelectedTimeline, setGymSelectedTimeline] = useState("");
  const [showGymForm, setShowGymForm] = useState(false);
  const [gymLeadName, setGymLeadName] = useState("");
  const [gymLeadPhone, setGymLeadPhone] = useState("");
  const [gymLeadDate, setGymLeadDate] = useState("");

  // State Management for Education dynamic chatbot
  const [eduSelectedCourse, setEduSelectedCourse] = useState("");
  const [eduLeadName, setEduLeadName] = useState("");
  const [eduLeadPhone, setEduLeadPhone] = useState("");
  const [eduLeadEmail, setEduLeadEmail] = useState("");

  // State Management for Healthcare dynamic chatbot
  const [healthSelectedDept, setHealthSelectedDept] = useState("");
  const [healthLeadName, setHealthLeadName] = useState("");
  const [healthLeadPhone, setHealthLeadPhone] = useState("");
  const [healthLeadAge, setHealthLeadAge] = useState("");

  const [messages, setMessages] = useState<{ 
    id: number; 
    sender: 'user' | 'bot' | 'staff'; 
    text: string; 
    options?: string[]; 
    isConversion?: boolean;
    isCrmEntry?: boolean;
    isSalesNotification?: boolean;
    isGymFormBubble?: boolean;
    isGymConfirmationDone?: boolean;
    isEduFormBubble?: boolean;
    isEduCrmEntry?: boolean;
    isEduSalesNotification?: boolean;
    isEduConfirmationDone?: boolean;
    isHealthFormBubble?: boolean;
    isHealthCrmEntry?: boolean;
    isHealthSalesNotification?: boolean;
    isHealthConfirmationDone?: boolean;
  }[]>([]);

  const [messageQueue, setMessageQueue] = useState<{ 
    sender: 'bot' | 'staff'; 
    text: string; 
    options?: string[]; 
    isConversion?: boolean;
    isCrmEntry?: boolean;
    isSalesNotification?: boolean;
    isGymFormBubble?: boolean;
    isGymConfirmationDone?: boolean;
    isEduFormBubble?: boolean;
    isEduCrmEntry?: boolean;
    isEduSalesNotification?: boolean;
    isEduConfirmationDone?: boolean;
    isHealthFormBubble?: boolean;
    isHealthCrmEntry?: boolean;
    isHealthSalesNotification?: boolean;
    isHealthConfirmationDone?: boolean;
  }[]>([]);

  const [isTyping, setIsTyping] = useState(false);
  const [hasFollowedUp, setHasFollowedUp] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sequential message processing
  useEffect(() => {
    if (messageQueue.length > 0 && !isTyping) {
      const nextMessage = messageQueue[0];
      const timer = setTimeout(() => {
        setIsTyping(true);
        // Realistic simulation typing delays
        const durationFactor = nextMessage.isCrmEntry || nextMessage.isSalesNotification ? 10 : 15;
        const typingDuration = Math.min(Math.max(nextMessage.text.length * durationFactor, 700), 1500);
        
        const typingTimer = setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            id: Date.now(),
            sender: nextMessage.sender,
            text: nextMessage.text,
            options: nextMessage.options,
            isConversion: nextMessage.isConversion,
            isCrmEntry: nextMessage.isCrmEntry,
            isSalesNotification: nextMessage.isSalesNotification,
            isGymFormBubble: nextMessage.isGymFormBubble,
            isGymConfirmationDone: nextMessage.isGymConfirmationDone,
            isEduFormBubble: nextMessage.isEduFormBubble,
            isEduCrmEntry: nextMessage.isEduCrmEntry,
            isEduSalesNotification: nextMessage.isEduSalesNotification,
            isEduConfirmationDone: nextMessage.isEduConfirmationDone,
            isHealthFormBubble: nextMessage.isHealthFormBubble,
            isHealthCrmEntry: nextMessage.isHealthCrmEntry,
            isHealthSalesNotification: nextMessage.isHealthSalesNotification,
            isHealthConfirmationDone: nextMessage.isHealthConfirmationDone
          }]);
          setMessageQueue(prev => prev.slice(1));

          // Global conversion follow-up logic for general industries
          if (!isGym && !isEdu && !isHealth && nextMessage.isConversion && !hasFollowedUp) {
             setHasFollowedUp(true);
              setTimeout(() => {
                setMessageQueue(prev => [...prev, {
                  sender: 'bot',
                  text: "Ready to automate your business? Let's chat on WhatsApp to get started! 👇",
                  options: ["Chat on WhatsApp"],
                  isConversion: true
                }]);
              }, 3000);
          }
        }, typingDuration);
        
        return () => clearTimeout(typingTimer);
      }, 400);
      
      return () => clearTimeout(timer);
    }
  }, [messageQueue, isTyping, hasFollowedUp, isGym, isEdu, isHealth]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const addToQueue = (msgs: { 
    sender: 'bot' | 'staff'; 
    text: string; 
    options?: string[]; 
    isConversion?: boolean;
    isCrmEntry?: boolean;
    isSalesNotification?: boolean;
    isGymFormBubble?: boolean;
    isGymConfirmationDone?: boolean;
    isEduFormBubble?: boolean;
    isEduCrmEntry?: boolean;
    isEduSalesNotification?: boolean;
    isEduConfirmationDone?: boolean;
    isHealthFormBubble?: boolean;
    isHealthCrmEntry?: boolean;
    isHealthSalesNotification?: boolean;
    isHealthConfirmationDone?: boolean;
  }[]) => {
    setMessageQueue(prev => [...prev, ...msgs]);
  };

  const handleIgCtaClick = () => {
    setIgAdActive(false);

    let initialUserText = "Hi! Can I get more information?";
    if (isGym) {
      initialUserText = "hello! Can I get more info on Gym packages?";
    } else if (isEdu) {
      initialUserText = "Hi! I am interested in educational courses.";
    } else if (type === 'salon') {
      initialUserText = "Hi! I want to book a hair/beauty appointment.";
    } else if (type === 'realestate') {
      initialUserText = "Hi! I want to see the latest premium real estate listings.";
    } else if (type === 'healthcare') {
      initialUserText = "Hello! I would like to book a doctor appointment.";
    } else if (type === 'travel') {
      initialUserText = "Hi! I am looking for travel packages.";
    } else if (type === 'events') {
      initialUserText = "Hi! Register me for the next masterclass ticket.";
    }

    setMessages([
      {
        id: Date.now(),
        sender: 'user' as const,
        text: initialUserText
      }
    ]);
    setMessageQueue([]);
    setHasFollowedUp(false);
    
    // Welcome Message (Step 2)
    addToQueue([{
      sender: 'bot' as const,
      text: config.welcome,
      options: config.firstOptions
    }]);
  };

  const startDemo = () => {
    setIgAdActive(true);
    setMessages([]);
    setMessageQueue([]);
    setHasFollowedUp(false);

    // Reset Gym specific states
    setGymSelectedGoal("");
    setGymSelectedTimeline("");
    setGymLeadName("");
    setGymLeadPhone("");
    setGymLeadDate("");
    setShowGymForm(false);

    // Reset Education specific states
    setEduSelectedCourse("");
    setEduLeadName("");
    setEduLeadPhone("");
    setEduLeadEmail("");

    // Reset Healthcare specific states
    setHealthSelectedDept("");
    setHealthLeadName("");
    setHealthLeadPhone("");
    setHealthLeadAge("");
  };

  const handleFormSubmit = (data: { name: string; phone: string; date: string; goal: string }) => {
    setGymLeadName(data.name);
    setGymLeadPhone(data.phone);
    setGymLeadDate(data.date);
    setGymSelectedGoal(data.goal);
    setShowGymForm(false);

    // Render submitted values as user's response in chat
    const userSummaryMsg = {
      id: Date.now(),
      sender: 'user' as const,
      text: `👤 Contact Details Submitted:\n\nName: ${data.name}\nPhone: ${data.phone}\nGoal: ${data.goal}\nPreferred Date: ${data.date}`
    };

    setMessages(prev => {
      // Remove options & active flags from previous messages to avoid double submissions
      const updatedPrev = prev.map(m => m.isGymFormBubble ? { ...m, isGymFormBubble: false, options: undefined } : m);
      return [...updatedPrev, userSummaryMsg];
    });

    // CRM capture entry message (Step 7)
    addToQueue([
      {
        sender: 'bot' as const,
        text: `✅ Lead Captured\n\nSource:\nInstagram Click-to-WhatsApp Ad\n\nInterest:\nGym Membership\n\nStatus:\nNew Lead\n\nLead Added to CRM Successfully`,
        isCrmEntry: true
      },
      // Sales Notification (Step 8)
      {
        sender: 'staff' as const,
        text: `📢 New Lead Received\n\nName: ${data.name}\n\nPhone: ${data.phone}\n\nGoal: ${data.goal}\n\nPreferred Visit Date: ${data.date}\n\nSource:\nInstagram Ad\n\nPriority:\nHigh`,
        isSalesNotification: true
      },
      // Confirmation (Step 9)
      {
        sender: 'staff' as const,
        text: `✅ Your free trial request has been submitted successfully.\n\nOur fitness consultant will contact you shortly to confirm your visit.\n\nWe are excited to help you begin your transformation journey.`,
        isGymConfirmationDone: true
      }
    ]);
  };

  const handleEduFormSubmit = (data: { name: string; phone: string; email: string; course: string }) => {
    setEduLeadName(data.name);
    setEduLeadPhone(data.phone);
    setEduLeadEmail(data.email);
    setEduSelectedCourse(data.course);

    const userSummaryMsg = {
      id: Date.now(),
      sender: 'user' as const,
      text: `👤 Counseling Booking Registered:\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nCourse: ${data.course}`
    };

    setMessages(prev => {
      const updatedPrev = prev.map(m => m.isEduFormBubble ? { ...m, isEduFormBubble: false, options: undefined } : m);
      return [...updatedPrev, userSummaryMsg];
    });

    addToQueue([
      {
        sender: 'bot' as const,
        text: `lead_crm_entry`,
        isEduCrmEntry: true
      },
      {
        sender: 'staff' as const,
        text: `lead_sales_alert`,
        isEduSalesNotification: true
      },
      {
        sender: 'staff' as const,
        text: `✅ Dear ${data.name}, your academic counseling slot is reserved.\n\nOur enrollment consultant will call you on ${data.phone} within a few hours to match your career goals. Get ready to launch!`,
        isEduConfirmationDone: true
      }
    ]);
  };

  const handleHealthFormSubmit = (data: { name: string; phone: string; age: string; dept: string }) => {
    setHealthLeadName(data.name);
    setHealthLeadPhone(data.phone);
    setHealthLeadAge(data.age);
    setHealthSelectedDept(data.dept);

    const userSummaryMsg = {
      id: Date.now(),
      sender: 'user' as const,
      text: `👤 Patient Registration:\n\nName: ${data.name}\nPhone: ${data.phone}\nAge: ${data.age}\nSelected Track: ${data.dept}`
    };

    setMessages(prev => {
      const updatedPrev = prev.map(m => m.isHealthFormBubble ? { ...m, isHealthFormBubble: false, options: undefined } : m);
      return [...updatedPrev, userSummaryMsg];
    });

    addToQueue([
      {
        sender: 'bot' as const,
        text: `patient_crm_entry`,
        isHealthCrmEntry: true
      },
      {
        sender: 'staff' as const,
        text: `patient_sales_alert`,
        isHealthSalesNotification: true
      },
      {
        sender: 'staff' as const,
        text: `✅ Dear ${data.name}, your doctor consultation slot is reserved in our register.\n\nOur clinic receptionist will match your medical record and issue a WhatsApp digital prescription token shortly on ${data.phone}. Stay healthy! 🏥`,
        isHealthConfirmationDone: true
      }
    ]);
  };

  const handleOptionClick = (option: string) => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    if (option === "Restart Ad Funnel") {
      startDemo();
      return;
    }

    if (option === "Yes, Book Free Call" || option === "Chat on WhatsApp") {
      window.open(`https://wa.me/917410711563?text=Hi%20I%20want%20to%20automate%20my%20WhatsApp%20leads%20for%20my%20${type}%20business`, '_blank');
      return;
    }

    const userMsg = { id: Date.now(), sender: 'user' as const, text: option };
    setMessages(prev => [...prev.map(m => ({ ...m, options: undefined })), userMsg]);

    const nextMessages: { 
      sender: 'bot' | 'staff'; 
      text: string; 
      options?: string[]; 
      isConversion?: boolean;
      isCrmEntry?: boolean;
      isSalesNotification?: boolean;
      isGymFormBubble?: boolean;
      isGymConfirmationDone?: boolean;
      isEduFormBubble?: boolean;
      isEduCrmEntry?: boolean;
      isEduSalesNotification?: boolean;
      isEduConfirmationDone?: boolean;
      isHealthFormBubble?: boolean;
      isHealthCrmEntry?: boolean;
      isHealthSalesNotification?: boolean;
      isHealthConfirmationDone?: boolean;
    }[] = [];

    if (isGym) {
      if (option === "Membership Plans") {
        // Step 3
        nextMessages.push({
          sender: 'bot',
          text: `🔥 Membership Plans\n\n• 1 Month – ₹700\n• 3 Months – ₹1500\n• 6 Months – ₹2400\n• 1 Year – ₹4500\n\nBenefits:\n\n✅ Beginner Friendly\n✅ Expert Trainer Support\n✅ Locker & Changing Room\n✅ Parking Available`,
          options: ["Book Free Trial", "Talk to Support"]
        });
      } else if (option === "Program Details") {
        // Step 4
        nextMessages.push({
          sender: 'bot',
          text: `🔥 Available Programs\n\n• Fat Loss Program\n• Muscle Gain Program\n• Body Transformation\n• Strength Training`,
          options: ["Personal Training", "Book Free Trial"]
        });
      } else if (option === "Personal Training") {
        nextMessages.push({
          sender: 'staff',
          text: `Hey! Coach Amit here. 🏋️\n\nOur personal training programs guarantee peak structural strength and targeted body composition transformation.\n\nReady to do a 1-on-1 trial assessment workout?`,
          options: ["Book Free Trial", "Talk to Support"]
        });
      } else if (option === "Talk to Support") {
        nextMessages.push({
          sender: 'bot',
          text: `Connecting you to staff helpline... ☎️`
        });
        nextMessages.push({
          sender: 'staff',
          text: `Hey! Neha from the front desk here. 😊 How can I assist you with your fitness goals? I highly recommend starting with a Free Trial Workout!`,
          options: ["Book Free Trial", "Membership Plans"]
        });
      } else if (option === "Book Free Trial") {
        // Direct Lead Capture Form Bubble right inside WhatsApp chat
        nextMessages.push({
          sender: 'bot',
          text: `Great choice! Please fill out your visit card details below to reserve your FREE workout trial session. 👇`
        });
        nextMessages.push({
          sender: 'bot',
          text: `lead_capture_form`,
          isGymFormBubble: true
        });
      } else {
        nextMessages.push({
          sender: 'bot',
          text: `Noted! Let me hook you up with one of our coaches shortly. 🚀`,
          isConversion: true
        });
      }
    } else if (isEdu) {
      if (option === "🎓 Course Inquiry") {
        nextMessages.push({
          sender: "bot",
          text: "Which course are you interested in?",
          options: ["💻 Digital Marketing", "📊 Data Analytics", "🎨 Graphic Design", "🤖 AI & Automation"]
        });
      } else if (["💻 Digital Marketing", "📊 Data Analytics", "🎨 Graphic Design", "🤖 AI & Automation"].includes(option)) {
        const pureCourseName = option.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, "").trim();
        setEduSelectedCourse(pureCourseName);
        nextMessages.push({
          sender: "bot",
          text: `📚 *Course: ${pureCourseName}*\n\n✅ *Duration:* 6 Months\n✅ *Live + Recorded Classes*\n✅ *Industry Projects*\n✅ *Placement Assistance*`,
          options: ["📄 Download Brochure", "📅 Book Demo Class"]
        });
      } else if (option === "📄 Download Brochure") {
        nextMessages.push({
          sender: "staff",
          text: `Excellent choice! 📄 I have dispatched the curriculum brochure and syllabus PDF for *${eduSelectedCourse || "your selected course"}* to your WhatsApp.\n\nReady to elevate your career?`,
          options: ["📅 Book Demo Class", "💰 Fee Structure"]
        });
      } else if (option === "📅 Book Demo Class") {
        nextMessages.push({
          sender: "staff",
          text: `Wonderful! Let's schedule your 1-on-1 free counseling assessment and demo session. Your seat is premium allocated. Please register your details below! 👇`
        });
        nextMessages.push({
          sender: "bot",
          text: "lead_capture_form",
          isEduFormBubble: true
        });
      } else if (option === "📝 Admission Process") {
        nextMessages.push({
          sender: "bot",
          text: `Our admission process is simple:\n\n1. Application Form\n2. Counseling Session\n3. Document Verification\n4. Fee Payment\n5. Enrollment Confirmation`,
          options: ["🚀 Apply Now", "📞 Talk to Counselor"]
        });
      } else if (option === "🚀 Apply Now") {
        nextMessages.push({
          sender: "bot",
          text: `Wonderful decision! Let's secure your seat booking. Access the interactive form card below to start. 👇`
        });
        nextMessages.push({
          sender: "bot",
          text: "lead_capture_form",
          isEduFormBubble: true
        });
      } else if (option === "📞 Talk to Counselor") {
        nextMessages.push({
          sender: "bot",
          text: `Connecting you to a certified academic counselor... ☎️`
        });
        nextMessages.push({
          sender: "staff",
          text: `Hey! Simran from admissions office here. 😊 I can help you select the ideal tech focus track.\n\nPlease drop your details in the card below so I can review your background and call you! 👇`
        });
        nextMessages.push({
          sender: "bot",
          text: "lead_capture_form",
          isEduFormBubble: true
        });
      } else if (option === "💰 Fee Structure") {
        nextMessages.push({
          sender: "bot",
          text: "Select a course track to view standard fee configurations:",
          options: ["💻 Digital Marketing", "📊 Data Analytics", "🎨 Graphic Design"]
        });
      } else if (option === "📅 Book Counseling") {
        nextMessages.push({
          sender: "bot",
          text: `Perfect! Please specify your academic contact details in the card below to lock your counselor session slot. 👇`
        });
        nextMessages.push({
          sender: "bot",
          text: "lead_capture_form",
          isEduFormBubble: true
        });
      } else if (option === "📚 Student Support") {
        nextMessages.push({
          sender: "bot",
          text: "Welcome to Student Learning Support. How can we help you today with your active class dashboard? 🎓",
          options: ["📅 Class Schedule", "🎥 Recorded Lectures", "📜 Certificates", "🛠 Technical Support"]
        });
      } else if (option === "📅 Class Schedule") {
        nextMessages.push({
          sender: "bot",
          text: `📅 *Your live sessions are scheduled:*\nEvery Saturday & Sunday 6:00 PM - 8:00 PM IST.\n\nA session access link is dispatched 15 minutes before class.`
        });
        nextMessages.push({
          sender: "staff",
          text: "Need to make any modifications, or talk to student support administration?",
          options: ["📞 Talk to Counselor", "Go back to Main Menu"]
        });
      } else if (option === "🎥 Recorded Lectures") {
        nextMessages.push({
          sender: "bot",
          text: `🎥 *Recorded Lectures Status:*\nAll live playback recordings are automatically published to your LMS dashboard within 2 hours of completion.\n\nYou have lifetime 24/7 access!`
        });
        nextMessages.push({
          sender: "staff",
          text: "Do you have any login issues, or would you like to speak with general tech desk?",
          options: ["🛠 Technical Support", "Go back to Main Menu"]
        });
      } else if (option === "📜 Certificates") {
        nextMessages.push({
          sender: "bot",
          text: `📜 *Certificate Evaluation:*\nOnce you complete the modular projects and clear the final industry review assessment, your certified document will be digitally issued instantly.`
        });
        nextMessages.push({
          sender: "staff",
          text: "Would you like our support team to verify your graduation checklist status?",
          options: ["📞 Talk to Counselor", "Go back to Main Menu"]
        });
      } else if (option === "🛠 Technical Support") {
        nextMessages.push({
          sender: "bot",
          text: `🛠 *Technical Help Desk Is Online:*\nPlease describe your dashboard issue. Our development and support engineers will assist you in real time shortly!`
        });
        nextMessages.push({
          sender: "staff",
          text: "You can also return to the main dashboard menu:",
          options: ["Go back to Main Menu"]
        });
      } else if (option === "Go back to Main Menu") {
        nextMessages.push({
          sender: "bot",
          text: `👋 Back to the main office menu. How can we assist you today?`,
          options: ["🎓 Course Inquiry", "📝 Admission Process", "💰 Fee Structure", "📅 Book Counseling", "📚 Student Support"]
        });
      } else {
        nextMessages.push({
          sender: "bot",
          text: `Noted! Let me connect you with our lead academic counselors shortly. 🚀`,
          isConversion: true
        });
      }
    } else if (isHealth) {
      if (option === "📅 Book Appointment") {
        nextMessages.push({
          sender: "bot",
          text: "Which medical department/specialization do you need help with?",
          options: ["🩺 General Medicine", "👶 Pediatrics (Kids)", "🥑 Dermatology (Skin)", "❤️ Cardiology (Heart)"]
        });
      } else if (["🩺 General Medicine", "👶 Pediatrics (Kids)", "🥑 Dermatology (Skin)", "❤️ Cardiology (Heart)"].includes(option)) {
        setHealthSelectedDept(option);
        nextMessages.push({
          sender: "bot",
          text: `🏥 *Department:* ${option}\n\n✅ *Live consultation available*\n✅ *Verified medical practitioner*\n✅ *Digital prescription & follow-up support*\n✅ *Quick registration processes*`,
          options: ["📅 Confirm Booking Slot", "💬 Offline Consultation Slots"]
        });
      } else if (option === "📅 Confirm Booking Slot") {
        nextMessages.push({
          sender: "staff",
          text: `Wonderful decision! Let's get your medical details down in our patient register. Please fill the clinic form card below to secure your instant slot 👇`
        });
        nextMessages.push({
          sender: "bot",
          text: "lead_capture_form",
          isHealthFormBubble: true
        });
      } else if (option === "💬 Offline Consultation Slots") {
        nextMessages.push({
          sender: "bot",
          text: `Connecting with our general medicine and diagnostic desks... ☎️`
        });
        nextMessages.push({
          sender: "staff",
          text: `Hey! Nurse Anjali here. 😊 I can help you select the ideal specialist.\n\nPlease describe your symptoms or provide details in the form card below so I can verify and register your slot! 👇`
        });
        nextMessages.push({
          sender: "bot",
          text: "lead_capture_form",
          isHealthFormBubble: true
        });
      } else if (option === "💻 Consult Doctor Online") {
        nextMessages.push({
          sender: "bot",
          text: `Dr. Rohan (On-Duty General Medical Officer) is active online. Let's submit your patient records to connect you immediately 👇`
        });
        nextMessages.push({
          sender: "bot",
          text: "lead_capture_form",
          isHealthFormBubble: true
        });
      } else if (option === "🩺 Specializations") {
        nextMessages.push({
          sender: "bot",
          text: "We have state-of-the-art diagnostic and clinical consultation divisions:\n\n• *General Medicine* – Daily health consultations, wellness checkups.\n• *Pediatrics & Child Care* – Special vaccination & child growth audits.\n• *Dermatology* – Skin, hair, allergies, cosmetic guidance.\n• *Cardiology* – Vascular checks, BP diagnostics, cardiac wellness.",
          options: ["📅 Book Appointment", "🚨 Emergency Helpline"]
        });
      } else if (option === "🚨 Emergency Helpline") {
        nextMessages.push({
          sender: "bot",
          text: `🚨 *CITY CARE EMERGENCY HELPLINE*\n\nIf you have a life-threatening medical situation, please dial our emergency squad coordinate immediately at: *+91 91100 00108* ☎️\n\nAmbulation response time is ~12-15 minutes in urban bounds.`
        });
        nextMessages.push({
          sender: "staff",
          text: "You can also schedule a standard consult or return to main menu:",
          options: ["📅 Book Appointment", "Go back to Healthcare Menu"]
        });
      } else if (option === "📍 Clinic Location") {
        nextMessages.push({
          sender: "bot",
          text: `🏥 *City Care Clinic Location*\n\n📍 Landmark: Metro Pillar 125, Beside Grand Arcade, New Delhi\n⏰ Timings: 8:00 AM - 10:00 PM (Monday-Sunday)\n\nDirections pin has been auto-dispatched to your mobile tracker! 🗺️`
        });
        nextMessages.push({
          sender: "staff",
          text: "Would you like our support team to verify appointment slots or go back?",
          options: ["📅 Book Appointment", "Go back to Healthcare Menu"]
        });
      } else if (option === "Go back to Healthcare Menu") {
        nextMessages.push({
          sender: "bot",
          text: `🏥 Back to the clinic menu. How can we assist you today?`,
          options: ["📅 Book Appointment", "💻 Consult Doctor Online", "🩺 Specializations", "🚨 Emergency Helpline", "📍 Clinic Location"]
        });
      } else {
        nextMessages.push({
          sender: "bot",
          text: `Noted! Connecting you with our clinical counselors immediately! 🚀`,
          isConversion: true
        });
      }
    } else {
      // Standard Industries routing
      if (config.flows && config.flows[option]) {
        nextMessages.push(...config.flows[option]);
      } else {
        if (type === 'salon') {
          if (option === "Book Appointment" || option === "Pricing") {
            nextMessages.push({ sender: 'bot', text: "Let me check available slots... 📅" });
            nextMessages.push({ sender: 'staff', text: "Hi! I'm Priya. We have a slot open at 5 PM today. Should I book it?", options: ["Yes, Book Now", "Talk to Staff"] });
          } else if (option === "Yes, Book Now") {
            nextMessages.push({ sender: 'staff', text: "Perfect! I've reserved the 5 PM slot for you. See you soon! ✨", isConversion: true });
          }
        }
      }
    }
    
    if (nextMessages.length > 0) {
      addToQueue(nextMessages);
    } else if (option !== "Talk to Staff" && !isGym) {
      addToQueue([{ sender: 'bot', text: "Noted! One of our experts will get back to you shortly. 🚀", isConversion: true }]);
    }

    if (option === "Talk to Staff" && !isGym) {
      addToQueue([{ sender: 'staff', text: "Hi! I'm here. How can I help you today? 😊" }]);
    }
  };

  // If Instagram ad is active
  if (igAdActive) {
    return (
      <div className="w-full h-full relative overflow-hidden bg-white select-none">
        <InstagramAdPreview type={type} onCtaClick={handleIgCtaClick} />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#E5DDD5] select-none text-left relative overflow-hidden">
      {/* WhatsApp Header */}
      <div className="bg-[#075E54] p-4 pt-10 flex items-center justify-between text-white shadow-md relative z-20 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white font-bold overflow-hidden border border-white/20 flex-shrink-0">
            <img src={config.image} alt={config.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div>
            <div className="text-xs font-bold flex items-center gap-1.5 leading-tight">
              {config.name}
              <ShieldCheck size={12} className="text-white/70 fill-current" />
            </div>
            <div className="text-[9px] flex items-center gap-1 opacity-80 leading-tight mt-0.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              Online
            </div>
          </div>
        </div>

        {/* Small subtle restart button */}
        <button 
          onClick={startDemo}
          className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 active:bg-white/30 transition-all text-[9.5px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md text-white/95 border border-white/15 cursor-pointer select-none"
          title="Restart Simulator"
        >
          <svg className="w-3 h-3 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          <span>Restart</span>
        </button>
      </div>

      {/* WhatsApp Chat view */}
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 custom-scrollbar relative z-10" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: '400px' }}>
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 opacity-40 bg-white/40 backdrop-blur-[2px] rounded-3xl m-2 border border-white/30">
            <div className="w-12 h-12 bg-white/60 rounded-full flex items-center justify-center mb-3 text-slate-700">
              <MessageSquare size={24} />
            </div>
            <p className="text-xs font-bold text-slate-800 leading-snug">Click "Start Live Demo" below to see the automation flow.</p>
          </div>
        ) : (
          <>
            {messages.map((m) => (
              <div key={m.id} className="flex flex-col gap-2">
                {/* Check for personalized custom card views */}
                {m.isCrmEntry ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 15 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }} 
                    className="w-[85%] bg-emerald-50 border border-emerald-200 self-start p-4 rounded-2xl rounded-tl-none shadow-sm flex flex-col gap-2 text-slate-800"
                  >
                    <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 underline-offset-1">
                      <Database size={15} className="text-emerald-500 fill-emerald-100" />
                      CRM Entry Log
                    </div>
                    
                    <div className="text-[11px] font-sans flex flex-col gap-2 mt-1">
                      <div className="text-emerald-600 font-extrabold uppercase text-[10px] bg-emerald-100/50 px-2.5 py-1 rounded-md border border-emerald-200 w-fit">
                        ✅ Lead Captured Successfully
                      </div>
                      <div className="mt-1 flex flex-col gap-1.5 font-medium text-slate-700">
                        <div><strong className="text-slate-800">Source:</strong> Instagram Click-to-WhatsApp Ad</div>
                        <div><strong className="text-slate-800">Interest:</strong> Gym Membership Trial</div>
                        <div><strong className="text-slate-800">Status:</strong> New Prospect (Unassigned)</div>
                      </div>
                    </div>
                    
                    <div className="text-[9px] text-slate-400 text-right mt-1.5">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </motion.div>
                ) : m.isEduCrmEntry ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 15 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }} 
                    className="w-[85%] bg-purple-50 border border-purple-200 self-start p-4 rounded-2xl rounded-tl-none shadow-sm flex flex-col gap-2 text-slate-800"
                  >
                    <div className="text-xs font-bold text-purple-800 flex items-center gap-1.5">
                      <Database size={15} className="text-purple-500 fill-purple-100" />
                      CRM Student Database Log
                    </div>
                    
                    <div className="text-[11px] font-sans flex flex-col gap-2 mt-1">
                      <div className="text-purple-600 font-extrabold uppercase text-[10px] bg-purple-100/50 px-2.5 py-1 rounded-md border border-purple-200 w-fit">
                        ✅ Lead Captured Successfully
                      </div>
                      <div className="mt-1 flex flex-col gap-1.5 font-medium text-slate-700">
                        <div><strong className="text-slate-800">Source:</strong> WhatsApp Chatbot (EduFlow AI)</div>
                        <div><strong className="text-slate-800">Interest Course:</strong> {eduSelectedCourse || "Digital Marketing"}</div>
                        <div><strong className="text-slate-800">Status:</strong> Hot Lead (Assigned to Counselor)</div>
                      </div>
                    </div>
                    
                    <div className="text-[9px] text-slate-400 text-right mt-1.5">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </motion.div>
                ) : m.isSalesNotification ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 15 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }} 
                    className="w-[85%] bg-orange-50 border border-orange-200 self-start p-4 rounded-2xl rounded-tl-none shadow-sm flex flex-col gap-2 text-slate-800"
                  >
                    <div className="text-xs font-bold text-orange-850 flex items-center gap-1.5">
                      <Bell size={15} className="text-orange-500 fill-orange-200 animate-bounce" />
                      Sales Team Notification Simulator
                    </div>
                    
                    <div className="text-[11px] flex flex-col gap-1 mt-1 font-medium text-slate-700">
                      <div className="text-red-600 font-extrabold uppercase text-[10px] bg-red-100/50 px-2.5 py-1 rounded-md border border-red-200 w-fit mb-1.5 flex items-center gap-1">
                        📢 New Lead Received
                      </div>
                      <div><strong className="text-slate-800">Name:</strong> {gymLeadName}</div>
                      <div><strong className="text-slate-800">Phone:</strong> {gymLeadPhone}</div>
                      <div><strong className="text-slate-800">Goal:</strong> {gymSelectedGoal || 'General Fitness'}</div>
                      <div><strong className="text-slate-800">Preferred Date:</strong> {gymLeadDate}</div>
                      <div><strong className="text-slate-800">Source:</strong> Instagram Ad (Click-to-WhatsApp)</div>
                      <div><strong className="text-slate-800">Priority:</strong> <span className="bg-red-500 text-white font-extrabold text-[8.5px] px-2 py-0.5 rounded-full inline-block">HIGH PRIORITY</span></div>
                    </div>
                    
                    <div className="text-[9px] text-slate-400 text-right mt-1.5">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </motion.div>
                ) : m.isEduSalesNotification ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 15 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }} 
                    className="w-[85%] bg-fuchsia-50 border border-fuchsia-200 self-start p-4 rounded-2xl rounded-tl-none shadow-sm flex flex-col gap-2 text-slate-800"
                  >
                    <div className="text-xs font-bold text-fuchsia-850 flex items-center gap-1.5">
                      <Bell size={15} className="text-fuchsia-500 fill-fuchsia-200 animate-bounce" />
                      Counselor Assignment System Alert
                    </div>
                    
                    <div className="text-[11px] flex flex-col gap-1 mt-1 font-medium text-slate-700">
                      <div className="text-fuchsia-600 font-extrabold uppercase text-[10px] bg-fuchsia-100/50 px-2.5 py-1 rounded-md border border-fuchsia-200 w-fit mb-1.5 flex items-center gap-1">
                        📢 New Student Session Required
                      </div>
                      <div><strong className="text-slate-800">Name:</strong> {eduLeadName}</div>
                      <div><strong className="text-slate-800">Phone:</strong> {eduLeadPhone}</div>
                      <div><strong className="text-slate-800">Email:</strong> {eduLeadEmail}</div>
                      <div><strong className="text-slate-800">Course:</strong> {eduSelectedCourse || "Digital Marketing"}</div>
                      <div><strong className="text-slate-800">Source:</strong> Remorix EduFlow AI</div>
                      <div><strong className="text-slate-800">Priority:</strong> <span className="bg-red-500 text-white font-extrabold text-[8.5px] px-2 py-0.5 rounded-full inline-block">COUNSELOR ALERT</span></div>
                    </div>
                    
                    <div className="text-[9px] text-slate-400 text-right mt-1.5">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </motion.div>
                ) : m.isHealthCrmEntry ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 15 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }} 
                    className="w-[85%] bg-teal-50 border border-teal-250 self-start p-4 rounded-2xl rounded-tl-none shadow-sm flex flex-col gap-2 text-slate-800 animate-none"
                  >
                    <div className="text-xs font-bold text-teal-850 flex items-center gap-1.5">
                      <Database size={15} className="text-teal-500 fill-teal-100" />
                      Clinic Patient Database Log
                    </div>
                    
                    <div className="text-[11px] font-sans flex flex-col gap-2 mt-1">
                      <div className="text-teal-600 font-extrabold uppercase text-[10px] bg-teal-100/50 px-2.5 py-1 rounded-md border border-teal-200/50 w-fit">
                        ✅ Patient Intake Saved
                      </div>
                      <div className="mt-1 flex flex-col gap-1.5 font-medium text-slate-705">
                        <div><strong className="text-slate-800 font-bold">Source:</strong> WhatsApp Clinic Bot</div>
                        <div><strong className="text-slate-800 font-bold">Patient Track:</strong> {healthSelectedDept || "General Medical Advice"}</div>
                        <div><strong className="text-slate-800 font-bold">Status:</strong> Registered (Awaiting Nurse triage)</div>
                      </div>
                    </div>
                    
                    <div className="text-[9px] text-slate-400 text-right mt-1.5">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </motion.div>
                ) : m.isHealthSalesNotification ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 15 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }} 
                    className="w-[85%] bg-cyan-50 border border-cyan-200 self-start p-4 rounded-2xl rounded-tl-none shadow-sm flex flex-col gap-2 text-slate-800 animate-none"
                  >
                    <div className="text-xs font-bold text-cyan-850 flex items-center gap-1.5">
                      <Bell size={15} className="text-cyan-500 fill-cyan-200 animate-bounce" />
                      Nurse Desk System Dispatch
                    </div>
                    
                    <div className="text-[11px] flex flex-col gap-1 mt-1 font-medium text-slate-705">
                      <div className="text-cyan-600 font-extrabold uppercase text-[10px] bg-cyan-100/50 px-2.5 py-1 rounded-md border border-cyan-200/50 w-fit mb-1.5 flex items-center gap-1">
                        📢 Live Patient Admission Requested
                      </div>
                      <div><strong className="text-slate-800 font-bold">Patient Name:</strong> {healthLeadName}</div>
                      <div><strong className="text-slate-800 font-bold">Contact Number:</strong> {healthLeadPhone}</div>
                      <div><strong className="text-slate-800 font-bold">Patient Age:</strong> {healthLeadAge}</div>
                      <div><strong className="text-slate-800 font-bold">Allocated Dept:</strong> {healthSelectedDept || "General Medicine 🩺"}</div>
                      <div><strong className="text-slate-800 font-bold">Triage Operator:</strong> Nurse Anjali</div>
                      <div><strong className="text-slate-800 font-bold">Triage Priority:</strong> <span className="bg-[#128C7E] text-white font-extrabold text-[8.5px] px-2 py-0.5 rounded-full inline-block">IMMEDIATE CALL</span></div>
                    </div>
                    
                    <div className="text-[9px] text-slate-400 text-right mt-1.5">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }} 
                    className={`max-w-[85%] p-3 rounded-2xl shadow-sm text-sm relative group ${m.sender === 'user' ? 'bg-[#DCF8C6] self-end rounded-tr-none text-slate-850' : m.sender === 'staff' ? 'bg-white border border-border-light self-start rounded-tl-none text-slate-800' : 'bg-white self-start rounded-tl-none text-primary-text'}`}
                  >
                    {m.sender === 'staff' && <div className="text-[9.5px] font-bold text-[#128C7E] mb-1 flex items-center gap-1.5"><ShieldCheck size={11} className="text-emerald-500 fill-emerald-100" /> Verified Business Account</div>}
                    
                    {m.isGymFormBubble ? (
                      <GymForm onSubmit={handleFormSubmit} />
                    ) : m.isEduFormBubble ? (
                      <EduCounselingForm onSubmit={handleEduFormSubmit} />
                    ) : m.isHealthFormBubble ? (
                      <HealthcareApptForm onSubmit={handleHealthFormSubmit} />
                    ) : (
                      <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
                    )}

                    {!m.isGymFormBubble && !m.isEduFormBubble && !m.isHealthFormBubble && (
                      <div className="text-[8.5px] text-secondary-text/50 text-right mt-1.5 flex items-center justify-end gap-1">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {m.sender === 'user' && <Check size={10} className="text-blue-500" />}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Show Options Block */}
                {m.options && (
                  <div className="flex flex-col gap-2 pt-1 items-start">
                    {m.options.map((opt, idx) => (
                      <motion.button 
                        key={opt} 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: idx * 0.08 }} 
                        onClick={() => handleOptionClick(opt)} 
                        className="bg-white text-primary-text border border-border-light px-5 py-3 rounded-2xl text-xs font-bold hover:bg-bg transition-all shadow-md active:scale-95 text-left w-fit max-w-[245px] cursor-pointer hover:border-emerald-400"
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-white self-start rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex gap-1.5">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Input / Control Footer */}
      <div className="p-4 bg-[#F0F2F5] border-t border-border-light relative z-20 flex-shrink-0">
        {messages.length === 0 ? (
          <button 
            onClick={startDemo} 
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 group cursor-pointer"
          >
            Start Live Demo
            <Bot size={18} className="group-hover:rotate-12 transition-transform" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
             <div className="flex-1 bg-white p-3 rounded-2xl shadow-inner text-secondary-text/30 text-sm px-4 flex items-center justify-between">
               <span>Type a message...</span>
               <Zap size={14} className="opacity-20 animate-pulse" />
             </div>
             <div 
               onClick={startDemo} 
               className="p-3 bg-white text-secondary-text/50 hover:text-red-500 rounded-2xl cursor-pointer transition-all shadow-sm active:scale-90"
               title="Reset & Start Over"
             >
               <X size={20} />
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const IndustryDemo = ({ type }: { type: string }) => {
  const config = demoConfigs[type as keyof typeof demoConfigs] || demoConfigs.salon;
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] overflow-hidden selection:bg-primary selection:text-white">
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[100px] rounded-full"></div>
      </div>

      <Link to="/" className="fixed top-8 left-8 z-50 flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-lg border border-border-light text-secondary-text hover:text-primary font-bold transition-all group scale-90 md:scale-100">
        <ArrowRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <div className="max-w-2xl w-full text-center mb-8 relative z-10">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-primary-text tracking-tight">{config.name} Demo</h1>
        <p className="text-secondary-text text-lg">See how Remorix automates {type} leads instantly.</p>
      </div>

      <div className="w-full max-w-[380px] h-[720px] scale-[0.8] xs:scale-[0.9] sm:scale-100 origin-center my-[-40px] xs:my-[-15px] sm:my-0 bg-[#E5DDD5] rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-[12px] border-primary-text overflow-hidden flex flex-col relative z-10 transition-transform hover:scale-[1.01] sm:hover:scale-[1.01] duration-500 pb-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-primary-text rounded-b-2xl z-30"></div>
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-black/20 rounded-full z-30 opacity-40"></div>
        <WhatsAppPhone type={type} />
      </div>
      
      <div className="mt-8 text-center text-secondary-text/50 text-xs flex flex-col gap-2">
         <p>Remorix {type.charAt(0).toUpperCase() + type.slice(1)} Automation v1.2</p>
         <div className="flex items-center gap-4 justify-center">
            <span className="flex items-center gap-1"><ShieldCheck size={12}/> Zero Spam</span>
            <span className="flex items-center gap-1"><Zap size={12} className="fill-current"/> Instant Response</span>
         </div>
      </div>
    </div>
  );
};

const IndustryPage = ({ type }: { type: string }) => {
  const industryMeta: Record<string, { title: string; subtitle: string; icon: any; focusText: string; bulletHeading: string; bulletPoints: string[]; ctaText: string }> = {
    "gym": {
      title: "Gym & Fitness Centers",
      subtitle: "Convert trial inquiries and maintain consistent membership numbers with hands-off automation.",
      focusText: "Never lose an enthusiastic fitness lead. Our flows handle booking, reminders, and payment renewals naturally.",
      bulletHeading: "Automation Capabilities",
      bulletPoints: [
        "Instant class schedule & booking triggers",
        "Membership renew / prompt system via WhatsApp",
        "Automated personal training trial follow-ups",
        "Direct synchronization with gym CRM & calendars",
        "Automatic no-show recovery communications"
      ],
      ctaText: "Automate Gym Leads",
      icon: Dumbbell
    },
    "healthcare": {
      title: "Healthcare Clinics",
      subtitle: "Reduce clinic phone load and ensure seamless patient follow-up with clinical-grade WhatsApp flows.",
      focusText: "Allow patients to book appointments and receive crucial updates without exhausting your reception staff.",
      bulletHeading: "Automation Capabilities",
      bulletPoints: [
        "Smart appointment slot checker & booking engine",
        "Automated dosage & next-appointment reminders",
        "Immediate replies to treatment costs & timings",
        "Secure patient documentation dispatch",
        "Human routing for critical clinical concerns"
      ],
      ctaText: "Automate Healthcare Leads",
      icon: Stethoscope
    },
    "education": {
      title: "🎓 Education & EdTech",
      subtitle: "Automate admissions, counseling, student support, and follow-ups through WhatsApp.",
      focusText: "Speed to lead is king in Ed Tech. Answer student curriculum inquiries instantly, qualify prospective student leads 24/7, and book counseling calls.",
      bulletHeading: "Automation Capabilities",
      bulletPoints: [
        "Instant course curriculum & PDF brochure delivery on request",
        "Interactive admissions qualification survey & interview routing",
        "Automated booking of academic counselor sessions",
        "Dynamic fee payment collection alerts & reminders",
        "Ongoing client and student support FAQs on demand"
      ],
      ctaText: "Automate EdTech Leads",
      icon: GraduationCap
    },
    "realestate": {
      title: "Real Estate Developers",
      subtitle: "Qualify buyers, distribute catalogs, and book site visits automatically.",
      focusText: "Real estate agents are busy on site. Let automation handle the introductory details and brochure delivery.",
      bulletHeading: "Automation Capabilities",
      bulletPoints: [
        "Instant brochure, floor layout, and video tour sharing",
        "Site visit booking widget directly on WhatsApp",
        "Smart qualification based on budget and location",
        "Auto-handoff to dedicated block agents on site",
        "Automated post-visit feedback loops"
      ],
      ctaText: "Automate Property Leads",
      icon: Building2
    },
    "travel": {
      title: "Travel & Tourism",
      subtitle: "Send instant travel details, confirmation PDFs, and support itineraries on the go.",
      focusText: "Travelers demand information now. Provide confirmations, schedules, and instant help in any timezone.",
      bulletHeading: "Automation Capabilities",
      bulletPoints: [
        "Instant flight, hotel, or package voucher dispatch",
        "Interactive trip planner & itinerary suggestions",
        "24/7 helpline routing for active traveler emergencies",
        "Automated check-in & gate timing reminders",
        "Collect traveler reviews and photos post-trip"
      ],
      ctaText: "Automate Travel Leads",
      icon: Compass
    },
    "events": {
      title: "Events & Webinars",
      subtitle: "Deliver digital tickets, send broadcast alerts, and capture masterclass feedback effortlessly.",
      focusText: "Keep attendance rates high. Automate calendar sync, countdown reminders, and post-webinar deals.",
      bulletHeading: "Automation Capabilities",
      bulletPoints: [
        "Digital ticket delivery with secure QR codes",
        "Staggered pre-event reminders & teaser sequences",
        "Automatic Zoom / webinar link distribution",
        "Post-event special cohort discounts & offers",
        "Instant survey feedback collectors"
      ],
      ctaText: "Automate Event Leads",
      icon: Ticket
    }
  };

  const meta = industryMeta[type] || industryMeta.gym;
  const Icon = meta.icon;

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar />
      
      {/* Hero Header */}
      <section className="pt-32 pb-20 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[30%] h-[30%] bg-primary/5 blur-[100px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7 text-left flex flex-col gap-6">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary font-bold text-sm transition-all group w-fit">
              <ArrowRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            
            <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-full text-xs font-bold w-fit border border-primary/10">
              <Icon size={14} className="animate-pulse" />
              Industry Blueprint
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-800 leading-tight">
              WhatsApp Automation Built for <span className="text-primary italic">{meta.title}</span>
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
              {meta.subtitle} {meta.focusText}
            </p>

            <div className="border border-slate-100 p-6 rounded-3xl bg-slate-50/50">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-primary" />
                {meta.bulletHeading}
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {meta.bulletPoints.map((pt, i) => (
                  <div key={i} className="flex gap-3 items-start text-sm text-slate-600 font-medium">
                    <Check size={14} className="text-primary mt-1 flex-shrink-0" strokeWidth={3} />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href={`https://wa.me/917410711563?text=Hi%20I%20want%20to%20automate%20my%20WhatsApp%20leads%20for%20my%20${meta.title}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white text-center py-4 px-8 rounded-2xl font-bold text-normal hover:bg-primary/95 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
              >
                <MessageSquare size={18} className="fill-white" />
                {meta.ctaText}
              </a>
              <a 
                href="#live-demo-interactive"
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-center py-4 px-8 rounded-2xl font-bold text-normal transition-all flex items-center justify-center gap-2"
              >
                Try Simulator Below
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Side Visualization / Simulation Frame */}
          <div className="lg:col-span-5 flex justify-center w-full overflow-hidden" id="live-demo-interactive">
            <div className="scale-[0.8] xs:scale-90 md:scale-95 lg:scale-100 origin-center my-[-40px] xs:my-0">
              <div className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest text-center flex items-center gap-2 justify-center">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></span>
                Interactive Sandbox Simulator
              </div>
              <div className="w-[360px] h-[680px] bg-[#E5DDD5] rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.25)] border-[12px] border-slate-800 overflow-hidden flex flex-col relative">
                <WhatsAppPhone type={type} />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trust & DFY Checklist */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold mb-6 text-slate-800">Remorix is 100% Done-For-You</h2>
          <p className="text-slate-500 text-base max-w-2xl mx-auto mb-12">
            You don't need any technical skills, servers, or API registrations. Our engineers handle everything, ensuring your WhatsApp flows launch and scale seamlessly in 24 hours.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Flow Copywriting", desc: "We write highly converting, natural copy specific to your target customers." },
              { title: "System Setup", desc: "Connecting WhatsApp, databases, and calendars is completely executed by us." },
              { title: "Active Maintenance", desc: "We constantly verify triggers and API health so you never miss a lead." }
            ].map((fac, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-left">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold font-display text-sm mb-4">0{i+1}</div>
                <h4 className="font-bold text-slate-800 mb-2">{fac.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{fac.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
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
        <Route path="/education-demo" element={<IndustryDemo type="education" />} />
        
        {/* Solutions Dynamic Industry Pages */}
        <Route path="/industries/gym-fitness" element={<IndustryPage type="gym" />} />
        <Route path="/industries/healthcare" element={<IndustryPage type="healthcare" />} />
        <Route path="/industries/education-edtech" element={<IndustryPage type="education" />} />
        <Route path="/industries/real-estate" element={<IndustryPage type="realestate" />} />
        <Route path="/industries/travel-tourism" element={<IndustryPage type="travel" />} />
        <Route path="/industries/events-webinar" element={<IndustryPage type="events" />} />
      </Routes>
    </Router>
  );
}

