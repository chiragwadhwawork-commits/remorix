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
        <a href="#hero" className="flex items-center gap-2 group cursor-pointer">
          <span className="text-2xl font-display font-bold tracking-tight">
            <span className="bg-gradient-to-br from-primary to-blue-700 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">R</span>
            emorix
          </span>
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
        <div className="w-10 h-10 bg-slate-400 rounded-full flex items-center justify-center font-bold">R</div>
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

const Home = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Get form data
    const nameInput = document.getElementById('form-name') as HTMLInputElement;
    const phoneInput = document.getElementById('form-phone') as HTMLInputElement;
    const typeInput = document.getElementById('form-type') as HTMLInputElement;

    if (nameInput && phoneInput && typeInput) {
      const name = nameInput.value;
      const phone = phoneInput.value;
      const business = typeInput.value;

      const message = `New Lead:%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0ABusiness: ${encodeURIComponent(business)}`;
      
      window.open(`https://wa.me/917410711563?text=${message}`, '_blank');
      setFormSubmitted(true);
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
              Turn WhatsApp Leads into Customers — <span className="text-primary italic">Automatically.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
              We help Indian local businesses reply instantly, follow up automatically, and convert more leads on WhatsApp — without you lifting a finger.
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

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a 
                href="https://wa.me/917410711563?text=Hi%20I%20want%20to%20automate%20my%20WhatsApp%20leads" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-primary text-white px-8 py-5 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform flex items-center justify-center gap-2 cursor-pointer"
                id="hero-cta-main"
              >
                Get Free Setup Call
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
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden md:block relative lg:scale-110"
          >
            <div className="absolute inset-0 bg-blue-100 rounded-[3rem] rotate-3 blur-2xl -z-10 opacity-60"></div>
            <WhatsAppDemo />
          </motion.div>
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
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-slate-900">Why Most Leads Go Cold</h2>
            <p className="text-xl text-slate-600 font-medium italic">"A lead ignored for 5 minutes is already 80% lost."</p>
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
                  No software to learn. No dashboards to manage. We build your flows, set up your triggers, and keep your automation running 24/7.
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
                  <h4 className="text-xl font-bold mb-2 text-slate-900">Custom Smart Replies</h4>
                  <p className="text-slate-600 leading-relaxed">Our system understands customer intent and replies with pricing, slots, or details instantly.</p>
                </div>
              </div>
              <div className="flex gap-6">
                 <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-slate-900">Lead Health Monitoring</h4>
                  <p className="text-slate-600 leading-relaxed">We automatically categorize leads so you know exactly who is ready to buy right now.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Visual Section */}
      <section className="py-24 bg-slate-900 text-white" id="how-it-works-visual">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">How It Works in 3 Steps</h2>
            <p className="text-slate-400">Our seamless process to transform your lead management</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "Step 1",
                title: "Lead Sends Message",
                desc: "A potential customer reaches out on WhatsApp requesting pricing or details.",
                icon: <MessageSquare size={32} className="text-blue-400" />
              },
              {
                step: "Step 2",
                title: "Auto Reply + Qualification",
                desc: "Our system replies instantly and asks qualifying questions to filter high-intent leads.",
                icon: <Zap size={32} className="text-accent" />
              },
              {
                step: "Step 3",
                title: "Follow-up + Conversion",
                desc: "Automated follow-ups keep the lead warm until they book or purchase.",
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
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10 text-sm font-medium text-slate-300">
              <CheckCircle2 size={16} className="text-accent" />
              Fully automated. No manual effort required.
            </div>
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
                title: "WhatsApp Auto Reply Setup",
                desc: "Never miss a greeting. We set up instant smart responses for common queries like pricing, address, and timings."
              },
              {
                icon: <Bot size={32} className="text-primary" />,
                title: "Lead Qualification Flows",
                desc: "Ask the right questions automatically. Find out if the lead is looking for individual or commercial services before you get involved."
              },
              {
                icon: <Clock size={32} className="text-primary" />,
                title: "Automated Follow-Ups",
                desc: "The fortune is in the follow-up. We set up subtle, helpful nudges to bring leads back into the conversation."
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
              <a 
                href="https://wa.me/917410711563?text=Hi%20I%20want%20to%20automate%20my%20WhatsApp%20leads" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary text-center py-4 rounded-xl font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 cursor-pointer"
              >
                Book Setup Call
                <ArrowRight size={18} />
              </a>
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
                 <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Built for local <br/><span className="bg-gradient-to-r from-blue-400 to-accent bg-clip-text text-transparent italic">powerhouses in India.</span></h2>
              </div>
              <div className="bg-slate-800 p-6 rounded-3xl border border-white/10 text-center">
                 <div className="text-accent font-bold text-2xl mb-1 italic">Limted Slots</div>
                 <p className="text-sm opacity-60">We only onboard 10 businesses per month to ensure quality.</p>
              </div>
           </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: "Salons & Clinics", icon: <Users size={20} />, href: "/salon-demo", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=50&h=50&fit=crop" },
                { name: "Gyms & Fitness", icon: <TrendingUp size={20} />, href: "/gym-demo", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=50&h=50&fit=crop" },
                { name: "Real Estate Agents", icon: <Users size={20} />, href: "/realestate-demo", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=50&h=50&fit=crop" },
                { name: "Coaching Institutes", icon: <Zap size={20} />, href: "/coaching-demo", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=50&h=50&fit=crop" },
                { name: "Healthcare Providers", icon: <Check size={20} />, href: "/healthcare-demo", image: "https://images.unsplash.com/photo-1505751172876-019669bf6910?w=50&h=50&fit=crop" }
              ].map((item, i) => {
                const CardContent = (
                  <>
                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-primary/20 transition-colors">
                      {item.icon}
                    </div>
                    <span className="font-bold text-sm leading-tight text-white">{item.name}</span>
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

          <div className="max-w-2xl mx-auto relative">
             <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-2 -z-10 blur-xl opacity-10"></div>
             <div className="bg-white border-2 border-slate-100 rounded-[3rem] p-12 text-center shadow-xl">
                <div className="w-20 h-20 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
                  <TrendingUp size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Automated Lead System</h3>
                <p className="text-slate-600 mb-8">Full custom professional setup & automation maintenance.</p>
                
                <div className="mb-10 p-8 bg-slate-50 rounded-[2rem] inline-block w-full">
                  <div className="text-5xl font-display font-bold text-slate-900 mb-2">₹5,000<span className="text-xl font-sans text-slate-400 font-medium"> / month</span></div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Fixed Monthly Partnership</div>
                </div>

                <div className="flex flex-col gap-4 mb-10 text-left max-w-sm mx-auto">
                   {[
                    "Everything set up from scratch",
                    "Unlimited automated messages",
                    "Customized follow-up strategy",
                    "Monthly optimization call",
                    "No technical work needed by you"
                   ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <div className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                        <Check size={12} strokeWidth={4} />
                      </div>
                      <span className="font-medium text-slate-700">{item}</span>
                    </div>
                   ))}
                </div>

                <a 
                  href="https://wa.me/917410711563?text=Hi%20I%20want%20to%20automate%20my%20WhatsApp%20leads" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block bg-primary text-white py-6 rounded-2xl text-xl font-bold hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-[0.98] cursor-pointer"
                  id="pricing-cta"
                >
                  Start Automation Now
                </a>
                <p className="mt-4 text-sm text-slate-400 font-medium italic">Costs way less than hiring even ONE half-trained employee.</p>
             </div>
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
                  {!formSubmitted ? (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-6" 
                      onSubmit={handleFormSubmit}
                    >
                      <div className="flex flex-col gap-2">
                        <label className="text-white text-sm font-bold opacity-80 pl-1 uppercase tracking-wider">Your Name</label>
                        <input 
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
                          type="text" 
                          required
                          placeholder="e.g. Yoga Gym, Dental Clinic" 
                          className="bg-white/10 border border-white/20 rounded-2xl p-5 text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
                          id="form-type"
                        />
                      </div>
                      <button type="submit" className="bg-white text-blue-600 w-full py-5 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-colors shadow-lg shadow-black/10 mt-4 active:scale-95 cursor-pointer">
                        Save My Spot
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
                      <h3 className="text-3xl font-display font-bold text-white mb-4">Thanks!</h3>
                      <p className="text-blue-50 text-lg leading-relaxed">
                        We'll contact you shortly to schedule your free WhatsApp Setup Call.
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
             <a href="#hero" className="flex items-center gap-2 mb-6 cursor-pointer">
                <span className="text-2xl font-display font-bold tracking-tight">
                  <span className="bg-gradient-to-br from-primary to-blue-700 bg-clip-text text-transparent">R</span>
                  emorix
                </span>
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

