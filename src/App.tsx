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
          <div className="bg-primary rounded-[3rem] overflow-hidden relative shadow-2xl shadow-primary/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 opacity-90 -z-10"></div>
            <div className="grid md:grid-cols-2">
              <div className="p-12 md:p-20 text-white flex flex-col justify-center">
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">Ready to win <br/>back your time?</h2>
                <div className="space-y-6 mb-12">
                   <a href="tel:+917410711563" className="flex items-center gap-4 text-xl font-bold hover:text-white transition-colors">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                        <Phone size={24} />
                      </div>
                      +91 7410711563
                   </a>
                   <a href="mailto:info@remorix.in" className="flex items-center gap-4 text-xl font-bold hover:text-white transition-colors">
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
                    className="bg-white text-primary px-8 py-5 rounded-2xl font-bold text-lg hover:bg-white/90 transition-colors flex items-center gap-2 cursor-pointer"
                    id="contact-whatsapp"
                  >
                    <MessageSquare size={20} className="fill-primary" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-black/5 p-12 md:p-20 backdrop-blur-sm border-l border-white/10">
                <AnimatePresence mode="wait">
                  <div className="mb-8 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-4">Start converting more WhatsApp leads into customers today.</h3>
                    <p className="text-white/80">Setup takes less than 24 hours. Limited onboarding slots available this month.</p>
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
                          className="bg-white/10 border border-white/20 rounded-2xl p-5 text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors transition-shadow"
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
                          className="bg-white/10 border border-white/20 rounded-2xl p-5 text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors"
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
                          className="bg-white/10 border border-white/20 rounded-2xl p-5 text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors"
                          id="form-type"
                        />
                      </div>
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-white text-primary w-full py-5 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-colors shadow-lg shadow-black/10 mt-4 active:scale-95 cursor-pointer disabled:opacity-50"
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
    welcome: "Hi! Welcome to Glow & Grace Salon 💇‍♀️",
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
    name: "Iron Paradise Gym",
    welcome: "Welcome to Iron Paradise Gym! 💪 Ready to reach your goals?",
    image: "https://i.postimg.cc/RVjnxwfZ/remorix-logo.png",
    firstOptions: ["Free Trial Class", "Membership Plans"],
    flows: {
      "Free Trial Class": [
        { sender: 'bot', text: "Awesome! We have a HIIT class tomorrow at 7 AM or a Yoga session at 6 PM." },
        { sender: 'staff', text: "Hey! Coach Amit here. I'll be leading the HIIT session. Can I put your name down for the 7 AM trial?", options: ["Yes, Book HIIT", "Tell me about Yoga"] }
      ],
      "Membership Plans": [
        { sender: 'bot', text: "We have flexible plans:\n\n🔥 Monthly - ₹1,500\n💎 Quarterly - ₹4,000\n🌟 Annual - ₹12,000 (Best Value)" },
        { sender: 'staff', text: "Hi! I'm Neha from front desk. If you join today, we'll waive the registration fee (₹500). Which plan interests you?", options: ["Annual Plan", "Monthly Plan"] }
      ],
      "Yes, Book HIIT": [{ sender: 'staff', text: "Done! I've added you to the HIIT class for 7 AM tomorrow. Bring a towel and get ready to sweat! 🔥", isConversion: true }],
      "Annual Plan": [{ sender: 'staff', text: "Exciting! I've reserved the 20% discount slot for you. Come by today to activate your membership! 🌟", isConversion: true }]
    }
  },
  realestate: {
    name: "Skyline Properties",
    welcome: "Welcome to Skyline Properties! 🏘️ Looking for your dream home?",
    image: "https://i.postimg.cc/RVjnxwfZ/remorix-logo.png",
    firstOptions: ["View 2BHK Listings", "Book Site Visit"],
    flows: {
      "View 2BHK Listings": [
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
    welcome: "Welcome to City Care Clinic 🏥 How can we assist you?",
    image: "https://i.postimg.cc/RVjnxwfZ/remorix-logo.png",
    firstOptions: ["Book Appointment", "Consult Doctor Online"],
    flows: {
      "Book Appointment": [
        { sender: 'bot', text: "I can help with that. Which department are you looking for?" },
        { sender: 'staff', text: "Hi, I'm Nurse Anjali. We have Dr. Mehta (General Physician) available today at 6 PM. Shall I confirm your slot?", options: ["Confirm 6 PM", "Talk to Staff"] }
      ],
      "Consult Doctor Online": [
        { sender: 'bot', text: "Connecting you to our online consultation portal... 💻" },
        { sender: 'staff', text: "Hi, Dr. Rohan here. I'm available for a quick chat now. Please share your symptoms briefly.", isConversion: true }
      ],
      "Confirm 6 PM": [{ sender: 'staff', text: "Confirmed! ✅ Please arrive 10 minutes early. Take care!", isConversion: true }]
    }
  }
};

const IndustryDemo = ({ type }: { type: string }) => {
  const config = demoConfigs[type as keyof typeof demoConfigs] || demoConfigs.salon;
  const [messages, setMessages] = useState<{ id: number; sender: 'user' | 'bot' | 'staff'; text: string; options?: string[]; isConversion?: boolean }[]>([]);
  const [messageQueue, setMessageQueue] = useState<{ sender: 'bot' | 'staff'; text: string; options?: string[]; isConversion?: boolean }[]>([]);
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
        // Simulate human-like typing speed
        const typingDuration = Math.min(Math.max(nextMessage.text.length * 20, 1000), 2000);
        
        const typingTimer = setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            id: Date.now(),
            sender: nextMessage.sender,
            text: nextMessage.text,
            options: nextMessage.options,
            isConversion: nextMessage.isConversion
          }]);
          setMessageQueue(prev => prev.slice(1));

          // Global conversion follow-up logic
          if (nextMessage.isConversion && !hasFollowedUp) {
             setHasFollowedUp(true);
             setTimeout(() => {
                setMessageQueue(prev => [...prev, {
                  sender: 'bot',
                  text: "Ready to automate your business? Let's chat on WhatsApp to get started! 👇",
                  options: ["Chat on WhatsApp"],
                  isConversion: true
                }]);
             }, 3500);
          }
        }, typingDuration);
        
        return () => clearTimeout(typingTimer);
      }, 600); // Natural pause between messages
      
      return () => clearTimeout(timer);
    }
  }, [messageQueue, isTyping, hasFollowedUp]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const addToQueue = (msgs: { sender: 'bot' | 'staff'; text: string; options?: string[]; isConversion?: boolean }[]) => {
    setMessageQueue(prev => [...prev, ...msgs]);
  };

  const startDemo = () => {
    setMessages([]);
    setMessageQueue([]);
    setHasFollowedUp(false);
    addToQueue([{ sender: 'bot', text: config.welcome, options: config.firstOptions }]);
  };

  const handleOptionClick = (option: string) => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    if (option === "Yes, Book Free Call" || option === "Chat on WhatsApp") {
      window.open(`https://wa.me/917410711563?text=Hi%20I%20want%20to%20automate%20my%20WhatsApp%20leads%20for%20my%20${type}%20business`, '_blank');
      return;
    }

    const userMsg = { id: Date.now(), sender: 'user' as const, text: option };
    setMessages(prev => [...prev.map(m => ({ ...m, options: undefined })), userMsg]);

    const nextMessages: { sender: 'bot' | 'staff'; text: string; options?: string[]; isConversion?: boolean }[] = [];

    // Simple industry routing
    if (type === 'salon') {
      if (option === "Book Appointment" || option === "Pricing") {
        nextMessages.push({ sender: 'bot', text: "Let me check available slots... 📅" });
        nextMessages.push({ sender: 'staff', text: "Hi! I'm Priya. We have a slot open at 5 PM today. Should I book it?", options: ["Yes, Book Now", "Talk to Staff"] });
      } else if (option === "Yes, Book Now") {
        nextMessages.push({ sender: 'staff', text: "Perfect! I've reserved the 5 PM slot for you. See you soon! ✨", isConversion: true });
      }
    } else if (type === 'gym') {
      if (option === "Join Membership") {
        nextMessages.push({ sender: 'bot', text: "Awesome choice! Muscle building starts here. 💪" });
        nextMessages.push({ sender: 'staff', text: "Hey! Coach Amit here. We have a 20% discount on Annual plans this week. Interested?", options: ["Yes, Tell me more", "View Pricing"] });
      } else if (option === "Yes, Tell me more") {
        nextMessages.push({ sender: 'staff', text: "Annual plans include 2 free sessions with me! Want me to reserve a spot?", isConversion: true });
      }
    }
    
    if (nextMessages.length > 0) {
      addToQueue(nextMessages);
    } else if (option !== "Talk to Staff") {
      addToQueue([{ sender: 'bot', text: "Noted! One of our experts will get back to you shortly. 🚀", isConversion: true }]);
    }

    if (option === "Talk to Staff") {
      addToQueue([{ sender: 'staff', text: "Hi! I'm here. How can I help you today? 😊" }]);
    }
  };

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

      <div className="w-full max-w-[380px] h-[720px] bg-[#E5DDD5] rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-[12px] border-primary-text overflow-hidden flex flex-col relative z-10 transition-transform hover:scale-[1.01] duration-500">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-primary-text rounded-b-2xl z-30"></div>
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-black/20 rounded-full z-30 opacity-40"></div>
        
        <div className="bg-[#075E54] p-4 pt-10 flex items-center gap-3 text-white shadow-md relative z-20">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white font-bold overflow-hidden border border-white/20">
            <img src={config.image} alt={config.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div>
            <div className="text-sm font-bold flex items-center gap-1.5">
              {config.name}
              <ShieldCheck size={12} className="text-white/70" />
            </div>
            <div className="text-[10px] flex items-center gap-1 opacity-80">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              Online
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 custom-scrollbar relative z-10" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: '400px' }}>
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40 bg-white/20 backdrop-blur-[2px] rounded-3xl m-2 border border-white/30">
              <div className="w-16 h-16 bg-white/40 rounded-full flex items-center justify-center mb-4"><MessageSquare size={32} /></div>
              <p className="text-sm font-bold text-primary-text">Click "Start Demo" below to see the automation flow.</p>
            </div>
          ) : (
            <>
              {messages.map((m) => (
                <div key={m.id} className="flex flex-col gap-2">
                  <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className={`max-w-[85%] p-3 rounded-2xl shadow-sm text-sm relative group ${m.sender === 'user' ? 'bg-[#DCF8C6] self-end rounded-tr-none' : m.sender === 'staff' ? 'bg-white border border-border-light self-start rounded-tl-none' : 'bg-white self-start rounded-tl-none text-primary-text'}`}>
                    {m.sender === 'staff' && <div className="text-[10px] font-bold text-primary mb-1 flex items-center gap-1.5"><ShieldCheck size={12}/> Verified Business Account</div>}
                    <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
                    <div className="text-[9px] text-secondary-text/50 text-right mt-1.5 flex items-center justify-end gap-1">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {m.sender === 'user' && <Check size={10} className="text-blue-500" />}
                    </div>
                  </motion.div>
                  {m.options && (
                    <div className="flex flex-col gap-2 pt-1 items-start">
                      {m.options.map((opt, idx) => (
                        <motion.button key={opt} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} onClick={() => handleOptionClick(opt)} className="bg-white text-primary-text border border-border-light px-5 py-3 rounded-2xl text-xs font-bold hover:bg-bg transition-all shadow-md active:scale-95 text-left w-fit max-w-[240px]">
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-white self-start rounded-2xl rounded-tl-none p-4 shadow-sm flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-border-light rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-border-light rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-border-light rounded-full animate-bounce"></div>
                </motion.div>
              )}
            </>
          )}
        </div>

        <div className="p-4 bg-[#F0F2F5] border-t border-border-light relative z-20">
          {messages.length === 0 ? (
            <button onClick={startDemo} className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 group">
              Start Live Demo
              <Bot size={18} className="group-hover:rotate-12 transition-transform" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
               <div className="flex-1 bg-white p-3 rounded-2xl shadow-inner text-secondary-text/30 text-sm px-4 flex items-center justify-between"><span>Type a message...</span><Zap size={14} className="opacity-20" /></div>
               <div onClick={() => { setMessages([]); setHasFollowedUp(false); }} className="p-3 bg-white text-secondary-text/50 hover:text-red-500 rounded-2xl cursor-pointer transition-all shadow-sm active:scale-90"><X size={20} /></div>
            </div>
          )}
        </div>
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

