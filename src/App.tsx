import React, { useState, useEffect } from "react";
import { 
  Stethoscope, 
  Award, 
  Calendar, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Globe, 
  ChevronRight, 
  ChevronDown, 
  Star, 
  User, 
  BookOpen, 
  Sparkles, 
  Menu, 
  X, 
  Check, 
  ExternalLink, 
  Share2, 
  Heart, 
  MessageSquare, 
  Plus, 
  Youtube, 
  Facebook, 
  Linkedin, 
  ArrowLeft, 
  ArrowRight, 
  AlertCircle, 
  ThumbsUp,
  FileCheck2,
  CalendarCheck2,
  SendHorizontal,
  BookmarkCheck,
  CheckCircle2,
  Lock,
  ArrowUpRight
} from "lucide-react";
import * as Lucide from "lucide-react";

import { DOCTOR_DATA } from "./doctorData";
import { TimelineItem, AwardItem, ServiceItem, ChamberItem } from "./types";

// Dynamic Lucide icon helper
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Lucide as any)[name];
  if (!IconComponent) return <Stethoscope className={className} />;
  return <IconComponent className={className} />;
};

// Beautiful vector SVG QR Code
const MedicalQRCodeSVG = ({ value }: { value: string }) => {
  return (
    <div className="bg-rose-blush p-4 rounded-2xl inline-block border border-rose-gold/20 shadow-inner">
      <svg viewBox="0 0 100 100" className="w-28 h-28 text-brand-green mx-auto">
        <rect width="100" height="100" fill="#FAF2F0" rx="12" />
        {/* Top-Left Finder */}
        <rect x="6" y="6" width="22" height="22" fill="currentColor" rx="4" />
        <rect x="10" y="10" width="14" height="14" fill="#FAF2F0" rx="2" />
        <rect x="13" y="13" width="8" height="8" fill="currentColor" rx="1" />
        {/* Top-Right Finder */}
        <rect x="72" y="6" width="22" height="22" fill="currentColor" rx="4" />
        <rect x="76" y="10" width="14" height="14" fill="#FAF2F0" rx="2" />
        <rect x="79" y="13" width="8" height="8" fill="currentColor" rx="1" />
        {/* Bottom-Left Finder */}
        <rect x="6" y="72" width="22" height="22" fill="currentColor" rx="4" />
        <rect x="10" y="76" width="14" height="14" fill="#FAF2F0" rx="2" />
        <rect x="13" y="79" width="8" height="8" fill="currentColor" rx="1" />
        {/* Medical Emblem in center */}
        <circle cx="50" cy="50" r="14" fill="#112F21" />
        <rect x="48.5" y="42" width="3" height="16" fill="#FAF2F0" rx="1" />
        <rect x="42" y="48.5" width="16" height="3" fill="#FAF2F0" rx="1" />
        {/* Realistic bits and pieces */}
        <path d="M 32 8 L 36 8 L 36 12 L 32 12 Z M 40 8 L 44 8 L 44 16 L 40 16 Z M 48 8 L 56 8 L 56 12 L 48 12 Z M 60 8 L 68 8 L 68 12 L 60 12 Z 
                 M 32 16 L 36 16 L 36 24 L 32 24 Z M 48 16 L 52 16 L 52 20 L 48 20 Z M 56 16 L 68 16 L 68 20 L 56 20 Z 
                 M 32 28 L 44 28 L 44 32 L 32 32 Z M 5 32 L 12 32 L 12 36 L 5 36 Z M 16 32 L 24 32 L 24 36 L 16 36 Z 
                 M 68 32 L 76 32 L 76 44 L 68 44 Z M 80 32 L 95 32 L 95 36 L 80 36 Z M 84 40 L 92 40 L 92 48 L 84 48 Z 
                 M 5 48 L 12 48 L 12 56 L 5 56 Z M 16 48 L 20 48 L 20 52 L 16 52 Z M 32 56 L 40 56 L 40 64 L 32 64 Z 
                 M 44 56 L 48 56 L 48 68 L 44 68 Z M 68 48 L 72 48 L 72 56 L 68 56 Z M 76 48 L 80 48 L 80 64 L 76 64 Z 
                 M 84 52 L 95 52 L 95 56 L 84 56 Z M 5 60 L 16 60 L 16 64 L 5 64 Z M 68 60 L 72 60 L 72 68 L 68 68 Z 
                 M 84 60 L 88 60 L 88 68 L 84 68 Z M 92 60 L 95 60 L 95 68 L 92 68 Z 
                 M 32 68 L 36 68 L 36 76 L 32 76 Z M 40 72 L 56 72 L 56 76 L 40 76 Z M 60 72 L 64 72 L 64 80 L 60 80 Z 
                 M 32 80 L 44 80 L 44 84 L 32 84 Z M 48 80 L 52 80 L 52 92 L 48 92 Z M 56 80 L 68 80 L 68 84 L 56 84 Z 
                 M 72 80 L 80 80 L 80 88 L 72 88 Z" fill="currentColor" />
      </svg>
    </div>
  );
};

export default function App() {
  // Localization state (Defaulting to Bengali, toggleable to English)
  const [lang, setLang] = useState<"BN" | "EN">("BN");

  // Mobile menu control toggler
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active review tab or modal state
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem("dr_nipa_reviews");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DOCTOR_DATA.testimonials;
      }
    }
    return DOCTOR_DATA.testimonials;
  });

  // Booking states
  const [appointments, setAppointments] = useState<any[]>(() => {
    const saved = localStorage.getItem("dr_nipa_appointments");
    return saved ? JSON.parse(saved) : [];
  });

  // Active booking form data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    chamber: DOCTOR_DATA.chambers[0].id,
    message: ""
  });

  // Feedback states
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Review submission state
  const [newReview, setNewReview] = useState({
    author: "",
    location: "",
    rating: 5,
    text: "",
    patientTag: ""
  });
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Interactive FAQ filter state
  const [faqCategory, setFaqCategory] = useState<"all" | "appointment" | "chamber" | "general">("all");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Gallery view control lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Health article reading modal state
  const [readingArticle, setReadingArticle] = useState<any | null>(null);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: "", phone: "", message: "" });
  const [contactSuccess, setContactSuccess] = useState(false);

  // Auto-scroll track for sticky glass header border
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("dr_nipa_reviews", JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem("dr_nipa_appointments", JSON.stringify(appointments));
  }, [appointments]);

  // Handle standard translations helper
  const t = (transObj: { en: string; bn: string }) => {
    return lang === "EN" ? transObj.en : transObj.bn;
  };

  // Appointment handle submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      setAlertMessage(lang === "EN" ? "Please fill in all mandatory fields." : "দয়া করে তারকা চিহ্নিত প্রয়োজনীয় ঘরগুলো পূরণ করুন।");
      return;
    }

    const matchedChamber = DOCTOR_DATA.chambers.find(c => c.id === formData.chamber);
    const newBooking = {
      id: "book_" + Date.now(),
      name: formData.name,
      phone: formData.phone,
      date: formData.date,
      chamberId: formData.chamber,
      chamberName: matchedChamber ? t(matchedChamber.name) : "",
      message: formData.message,
      timestamp: new Date().toLocaleString(),
    };

    setAppointments([newBooking, ...appointments]);
    setBookingSuccess(true);
    setAlertMessage("");

    // Clear form
    setFormData({
      name: "",
      phone: "",
      date: "",
      chamber: DOCTOR_DATA.chambers[0].id,
      message: ""
    });

    setTimeout(() => setBookingSuccess(false), 8000);
  };

  // Delete live appointments helper
  const cancelAppointment = (id: string) => {
    setAppointments(appointments.filter(app => app.id !== id));
  };

  // Render review form submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.text) {
      return;
    }

    const reviewToAdd = {
      id: "rev_" + Date.now(),
      author: { en: newReview.author, bn: newReview.author },
      location: { en: newReview.location || "Bangladesh", bn: newReview.location || "বাংলাদেশ" },
      rating: newReview.rating,
      text: { en: newReview.text, bn: newReview.text },
      date: new Date().toLocaleDateString(lang === "EN" ? "en-US" : "bn-BD", { year: "numeric", month: "long", day: "numeric" }),
      tag: { en: newReview.patientTag || "Verified Patient", bn: newReview.patientTag || "যাচাইকৃত রোগী" }
    };

    setReviews([reviewToAdd, ...reviews]);
    setReviewSuccess(true);
    setNewReview({ author: "", location: "", rating: 5, text: "", patientTag: "" });
    setTimeout(() => setReviewSuccess(false), 6000);
  };

  // Contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) return;
    setContactSuccess(true);
    setContactForm({ name: "", phone: "", message: "" });
    setTimeout(() => setContactSuccess(false), 6000);
  };

  // Generate WhatsApp text for booking
  const getWhatsAppMessageUrl = (appInfo: any) => {
    const matchedChamber = DOCTOR_DATA.chambers.find(c => c.id === appInfo.chamberId);
    const chamberName = matchedChamber ? t(matchedChamber.name) : appInfo.chamberName;
    const text = lang === "EN" 
      ? `Hello Dr. Syeda Nipa Nahida Support Team,\nI would like to request an appointment:\n\n👤 Patient Name: ${appInfo.name}\n📞 Contact Phone: ${appInfo.phone}\n📅 Requested Date: ${appInfo.date}\n🏥 Selected Chamber: ${chamberName}\n💬 Patient Note: ${appInfo.message || "None"}\n\nPlease confirm my queue slot. Thank you!`
      : `আসসালামু আলাইকুম, অধ্যাপক ডা. সৈয়দা নীপা নাহিদা চেম্বার সহকারী,\nআমি একটি সিরিয়াল বুকিংয়ের আবেদন জানাচ্ছি:\n\n👤 রোগীর নাম: ${appInfo.name}\n📞 যোগাযোগের নম্বর: ${appInfo.phone}\n📅 বুকিংয়ের তারিখ: ${appInfo.date}\n🏥 মনেনানীত চেম্বার: ${chamberName}\n💬 জটিলতা/মেসেজ: ${appInfo.message || "নেই"}\n\nদয়া করে সময় নির্ধারণপূর্বক সিরিয়ালটি নিশ্চিত করুন। ধন্যবাদ!`;
    return `https://wa.me/8801711000111?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-green selection:text-white bg-rose-blush">
      
      {/* 1. SEAMLESS ACCESSIBLE LANGUAGE STICKY HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-header py-3 shadow-sm bg-white/70" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 group">
            <span className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-content justify-center text-rose-blush font-serif font-bold text-lg transition-transform group-hover:scale-105 shadow-inner">
              N
            </span>
            <div>
              <div className="font-serif font-bold text-brand-green text-sm sm:text-base leading-tight tracking-wide">
                {t({ en: "Dr. Syeda Nipa Nahida", bn: "ডা. সৈয়দা নীপা নাহিদা" })}
              </div>
              <div className="text-[10px] sm:text-xs text-rose-gold tracking-widest font-medium uppercase">
                {t({ en: "Gynecology Specialist", bn: "গাইনী ও প্রসূতি বিশেষজ্ঞ" })}
              </div>
            </div>
          </a>

          {/* Large Screen Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-sm font-medium text-brand-green-light hover:text-brand-accent transition-colors">
              {t({ en: "About", bn: "পরিচিতি" })}
            </a>
            <a href="#services" className="text-sm font-medium text-brand-green-light hover:text-brand-accent transition-colors">
              {t({ en: "Services", bn: "চিকিৎসাসমূহ" })}
            </a>
            <a href="#chambers" className="text-sm font-medium text-brand-green-light hover:text-brand-accent transition-colors">
              {t({ en: "Chambers", bn: "চেম্বার সমূহ" })}
            </a>
            <a href="#appointment" className="text-sm font-medium text-brand-green-light hover:text-brand-accent transition-colors">
              {t({ en: "Book Appointment", bn: "সিরিয়াল নির্ধারণ" })}
            </a>
            <a href="#articles" className="text-sm font-medium text-brand-green-light hover:text-brand-accent transition-colors">
              {t({ en: "Health Tips", bn: "স্বাস্থ্যালাপ" })}
            </a>
            <a href="#gallery" className="text-sm font-medium text-brand-green-light hover:text-brand-accent transition-colors">
              {t({ en: "Gallery", bn: "গ্যালারি" })}
            </a>
            <a href="#faq" className="text-sm font-medium text-brand-green-light hover:text-brand-accent transition-colors">
              {t({ en: "FAQ", bn: "প্রশ্নোত্তর" })}
            </a>
          </nav>

          {/* Language Toggle & Book Button */}
          <div className="flex items-center gap-3">
            <div className="inline-flex glass-pill p-1 rounded-full border border-brand-green/10 shadow-inner">
              <button 
                id="btn-lang-bn"
                onClick={() => setLang("BN")}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${lang === "BN" ? "bg-brand-green text-rose-blush shadow-sm" : "text-brand-green-light hover:text-brand-accent"}`}
              >
                বাংলা
              </button>
              <button 
                id="btn-lang-en"
                onClick={() => setLang("EN")}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${lang === "EN" ? "bg-brand-green text-rose-blush shadow-sm" : "text-brand-green-light hover:text-brand-accent"}`}
              >
                EN
              </button>
            </div>

            <a 
              href="#appointment" 
              id="cta-nav-appointment"
              className="hidden lg:inline-flex items-center justify-center bg-brand-green text-rose-blush px-5 py-2 rounded-full text-xs font-semibold tracking-wide hover:bg-brand-green-light transition-all shadow-md transform hover:-translate-y-0.5"
            >
              {t({ en: "Book Now", bn: "সিরিয়াল দিন" })}
            </a>

            {/* Mobile menu Button */}
            <button 
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-brand-green p-1 hover:bg-rose-blush-dark rounded-full transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden animate-fade-in bg-rose-blush/95 backdrop-blur-xl border-b border-brand-green/10 absolute top-full left-0 right-0 p-5 shadow-lg flex flex-col gap-4">
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-brand-green text-center py-2 border-b border-brand-green/5 hover:text-brand-accent transition-all"
            >
              {t({ en: "About", bn: "পরিচিতি" })}
            </a>
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-brand-green text-center py-2 border-b border-brand-green/5 hover:text-brand-accent transition-all"
            >
              {t({ en: "Services", bn: "চিকিৎসাসমূহ" })}
            </a>
            <a 
              href="#chambers" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-brand-green text-center py-2 border-b border-brand-green/5 hover:text-brand-accent transition-all"
            >
              {t({ en: "Chambers", bn: "চেম্বার সমূহ" })}
            </a>
            <a 
              href="#appointment" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-brand-green text-center py-2 border-b border-brand-green/5 hover:text-brand-accent transition-all"
            >
              {t({ en: "Book Appointment", bn: "সিরিয়াল নির্ধারণ" })}
            </a>
            <a 
              href="#articles" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-brand-green text-center py-2 border-b border-brand-green/5 hover:text-brand-accent transition-all"
            >
              {t({ en: "Health Tips", bn: "স্বাস্থ্যালাপ" })}
            </a>
            <a 
              href="#gallery" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-brand-green text-center py-2 border-b border-brand-green/5 hover:text-brand-accent transition-all"
            >
              {t({ en: "Gallery", bn: "গ্যালারি" })}
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-brand-green text-center py-2 hover:text-brand-accent transition-all"
            >
              {t({ en: "FAQ", bn: "প্রশ্নোত্তর" })}
            </a>
          </div>
        )}
      </header>

      {/* 2. PREMIUM HERO SECTION WITH HAND-DRAWN BOTANICAL OVERLAY */}
      <section id="hero" className="relative pt-32 pb-20 md:py-36 bg-[#FCF8F7] overflow-hidden">
        {/* Soft botanical overlay backgrounds */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <img 
            src="/src/assets/images/botanical_banner_1781874262796.jpg" 
            alt="Botanical Watercolor Banner background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        {/* Subtle romantic blush gradient circles */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-rose-blush-dark rounded-full filter blur-3xl opacity-40 pointer-events-none"></div>
        <div className="absolute bottom-1/8 -right-32 w-120 h-110 bg-brand-accent/20 rounded-full filter blur-3xl opacity-30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Description Text */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-brand-green glass-pill w-fit text-xs font-semibold uppercase tracking-widest animate-pulse border border-rose-gold/20">
                <Sparkles size={14} className="text-brand-accent" />
                {t({ en: "Award-winning Gynaecology Specialist", bn: "স্বর্ণপদকপ্রাপ্ত স্ত্রী রোগ ও বন্ধ্যাত্ব বিশেষজ্ঞ" })}
              </div>

              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-brand-green leading-[1.1] tracking-tight">
                {t(DOCTOR_DATA.name)}
              </h1>

              <div className="font-sans text-brand-accent font-medium text-base sm:text-lg tracking-wide uppercase max-w-2xl border-l-2 border-brand-accent pl-3">
                {t(DOCTOR_DATA.title)}
              </div>

              <div className="text-xs sm:text-sm text-brand-green-light font-medium leading-relaxed max-w-xl italic">
                {t(DOCTOR_DATA.degrees)}
              </div>

              <p className="text-slate-600 font-sans text-base leading-relaxed max-w-2xl">
                {t(DOCTOR_DATA.introLine)}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4">
                <a 
                  id="btn-hero-book"
                  href="#appointment" 
                  className="flex items-center justify-center gap-2 bg-brand-green text-rose-blush px-8 py-4 rounded-full font-semibold transition-all hover:bg-brand-green-light shadow-lg transform hover:-translate-y-0.5 cursor-pointer text-center"
                >
                  <Calendar size={18} />
                  {t({ en: "Book Appointment Now", bn: "অনলাইন সিরিয়াল দিন" })}
                </a>
                
                <a 
                  id="btn-hero-call"
                  href={`tel:${DOCTOR_DATA.phone}`} 
                  className="flex items-center justify-center gap-2 bg-[#F2DDD8] text-brand-green px-6 py-4 rounded-full font-semibold hover:bg-rose-blush-dark transition-all transform hover:-translate-y-0.5 text-center border border-rose-gold/10"
                >
                  <Phone size={16} />
                  {t({ en: "Call Assistant", bn: "সহকারীকে কল দিন" })}
                </a>

                <a 
                  id="btn-hero-wa"
                  href={`https://wa.me/8801711000111`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-4 rounded-full font-semibold hover:bg-emerald-700 transition-all transform hover:-translate-y-0.5 text-center shadow-md"
                >
                  <Share2 size={16} />
                  {t({ en: "WhatsApp", bn: "হোয়াটসঅ্যাপ" })}
                </a>
              </div>

              {/* Patient Trust Counts */}
              <div className="grid grid-cols-3 gap-4 border-t border-rose-gold/25 pt-8 mt-4 max-w-md">
                <div>
                  <div className="font-serif font-bold text-2xl sm:text-3xl text-brand-green">২২+</div>
                  <div className="text-slate-500 text-xs mt-1">{t({ en: "Years Practice", bn: "বছরের অভিজ্ঞতা" })}</div>
                </div>
                <div>
                  <div className="font-serif font-bold text-2xl sm:text-3xl text-brand-green">৩৪,০০০+</div>
                  <div className="text-slate-500 text-xs mt-1">{t({ en: "Happy Mothers", bn: "সুস্থ ডেলিভারি" })}</div>
                </div>
                <div>
                  <div className="font-serif font-bold text-2xl sm:text-3xl text-brand-green">৩+</div>
                  <div className="text-slate-500 text-xs mt-1">{t({ en: "Core Centers", bn: "শীর্ষ হাসপাতাল" })}</div>
                </div>
              </div>
            </div>

            {/* Doctor Photo Side - Organic Mask with frames */}
            <div className="lg:col-span-5 flex justify-center relative mt-8 lg:mt-0">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                
                {/* Visual Organic Blob Behind */}
                <div className="absolute inset-0 bg-rose-blush-dark organic-mask-1 float-anim opacity-60 scale-102 transform rotate-12 bg-gradient-to-tr from-rose-blush-dark to-[#FAF2F0]"></div>
                
                {/* Visual Gold Border Ring */}
                <div className="absolute inset-2 border-2 border-dashed border-rose-gold/50 organic-mask-2 float-anim animation-delay-2000"></div>

                {/* Main Image Mask Container */}
                <div className="absolute inset-4 overflow-hidden organic-mask-1 shadow-2xl bg-slate-100 ring-4 ring-white">
                  <img 
                    src="/src/assets/images/doctor_portrait_1781874247616.jpg" 
                    alt="Prof. Dr. Syeda Nipa Nahida Portrait" 
                    className="w-full h-full object-cover scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Mini Award Badge Overlay */}
                <div className="absolute -bottom-2 -left-2 bg-brand-green text-rose-blush px-4 py-3 rounded-2xl flex items-center gap-2 shadow-xl border border-rose-gold/40 max-w-xs scale-90 sm:scale-100">
                  <Award size={20} className="text-brand-accent shrink-0 animate-bounce" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#D4A396]">GOLD MEDALIST</div>
                    <div className="font-serif text-xs font-bold leading-tight">{t({ en: "Maternal Welfare Excellence", bn: "জাতীয় স্বাস্থ্য পদকপ্রাপ্ত" })}</div>
                  </div>
                </div>

                {/* Consultation Badge Overlay */}
                <div className="absolute -top-3 -right-3 bg-white text-brand-green px-4 py-3 rounded-2xl flex items-center gap-2 shadow-xl border border-rose-blush-dark max-w-xs scale-90 sm:scale-100">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                  <div className="text-xs font-bold tracking-tight">
                    {t({ en: "Available Today", bn: "চেম্বার উন্মুক্ত" })}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. ABOUT DOCTOR — BIOGRAPHY, TIMELINES & CERTIFICATIONS */}
      <section id="about" className="py-20 bg-rose-blush relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-brand-green inline-block relative px-2">
              {t({ en: "Professional Profile", bn: "চিকিৎসক পরিচিতি" })}
              <span className="absolute left-1/4 right-1/4 bottom-0 h-[2px] bg-brand-accent"></span>
            </h2>
            <p className="text-slate-500 font-sans text-xs sm:text-sm uppercase tracking-widest mt-3">
              {t({ en: "Credentials, Education Pathway & Royal Awards", bn: "শিক্ষাগত যোগ্যতা, দীর্ঘ অভিজ্ঞতা এবং স্বর্ণপদক বোর্ড" })}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Description Text Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="glass-card p-8 rounded-[28px] border-rose-gold/10 relative overflow-hidden text-left shadow-lg">
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#F5E6E3] rounded-full filter blur-xl opacity-80"></div>
                <div className="text-brand-accent font-serif text-7xl leading-none absolute -top-2 left-4 opacity-15">“</div>
                
                <h3 className="font-serif font-bold text-2xl text-brand-green mt-4 mb-4">
                  {t({ en: "Empathetic Patient Care First", bn: "সহমর্মিতার সাথে বিশেষজ্ঞ পরামর্শ" })}
                </h3>

                {DOCTOR_DATA.bio.map((para, idx) => (
                  <p key={idx} className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed mb-4">
                    {t(para)}
                  </p>
                ))}

                <div className="mt-6 p-4 rounded-2xl bg-rose-blush border border-rose-gold/25 flex items-center gap-4">
                  <FileCheck2 className="text-brand-green shrink-0" size={32} />
                  <div>
                    <h4 className="font-semibold text-brand-green text-sm">{t({ en: "BMDC Registry ID", bn: "বিএমডিসি লাইসেন্স নম্বর" })}</h4>
                    <p className="text-xs text-slate-500">{t({ en: "Approved Gynaecologist: Reg: A-31205", bn: "নিবন্ধিত প্রসূতি সার্জন: রেজি নং A-31205" })}</p>
                  </div>
                </div>
              </div>

              {/* Memberships block */}
              <div className="glass-card p-6 rounded-[24px] border-rose-gold/15 text-left shadow-md">
                <h4 className="font-serif font-bold text-lg text-brand-green mb-4 flex items-center gap-2">
                  <BookmarkCheck className="text-brand-accent" size={20} />
                  {t({ en: "Societies & Fellowships", bn: "একাডেমিক সদস্যপদ সমূহ" })}
                </h4>
                <ul className="flex flex-col gap-3">
                  {DOCTOR_DATA.memberships.map((membership, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-xs sm:text-sm text-slate-600">
                      <CheckCircle2 size={16} className="text-brand-green shrink-0 mt-0.5" />
                      <span>{t(membership)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Timelines Column */}
            <div className="lg:col-span-7 flex flex-col gap-8 text-left">
              
              {/* Academic Timeline */}
              <div className="bg-white p-8 rounded-[28px] shadow-sm border border-rose-gold/10">
                <h3 className="font-serif font-bold text-xl text-brand-green mb-6 flex items-center gap-2">
                  <BookOpen className="text-brand-accent" size={22} />
                  {t({ en: "Medical Education Timeline", bn: "শিক্ষাগত অর্জন" })}
                </h3>
                <div className="relative border-l-2 border-brand-accent/20 pl-6 ml-3 flex flex-col gap-6">
                  {DOCTOR_DATA.education.map((edu, idx) => (
                    <div key={idx} className="relative">
                      {/* Node point */}
                      <span className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-white border-2 border-brand-accent flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                      </span>
                      <div className="inline-block bg-[#FAF2F0] text-brand-green text-xs font-bold px-3 py-1 rounded-full mb-1">
                        {edu.year}
                      </div>
                      <h4 className="font-serif font-bold text-base text-brand-green">
                        {t(edu.title)}
                      </h4>
                      <p className="text-slate-500 text-xs sm:text-sm mt-1">
                        {t(edu.institution)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional Experience */}
              <div className="bg-white p-8 rounded-[28px] shadow-sm border border-rose-gold/10">
                <h3 className="font-serif font-bold text-xl text-brand-green mb-6 flex items-center gap-2">
                  <Stethoscope className="text-brand-accent" size={22} />
                  {t({ en: "Experience Timeline", bn: "অভিজ্ঞতা ও কর্মজীবন" })}
                </h3>
                <div className="relative border-l-2 border-brand-green/20 pl-6 ml-3 flex flex-col gap-6">
                  {DOCTOR_DATA.experience.map((exp, idx) => (
                    <div key={idx} className="relative">
                      {/* Node point */}
                      <span className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-white border-2 border-brand-green flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                      </span>
                      <div className="inline-block bg-[#E3EBE7] text-brand-green text-xs font-bold px-3 py-1 rounded-full mb-1">
                        {exp.year}
                      </div>
                      <h4 className="font-serif font-bold text-base text-brand-green-light">
                        {t(exp.title)}
                      </h4>
                      <p className="text-slate-500 text-xs sm:text-sm mt-1">
                        {t(exp.institution)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Awards Board */}
              <div className="bg-[#112F21] text-rose-blush p-8 rounded-[28px] mt-2 relative overflow-hidden shadow-xl">
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
                  <Award size={200} />
                </div>
                <h3 className="font-serif font-bold text-xl text-brand-accent mb-6 flex items-center gap-2">
                  <Award className="text-brand-accent animate-spin-slow" size={22} />
                  {t({ en: "Prestigious Honours & Recognitions", bn: "সম্মাননা ও স্বর্ণপদক বোর্ড" })}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {DOCTOR_DATA.awards.map((award, idx) => (
                    <div key={idx} className="border-l border-rose-gold/30 pl-4 py-1">
                      <span className="text-brand-accent text-xs font-bold font-mono tracking-wider block mb-1">{award.year}</span>
                      <h4 className="font-serif font-bold text-base text-white">{t(award.title)}</h4>
                      <p className="text-rose-blush/80 text-xs mt-1 leading-relaxed">{t(award.desc)}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. SERVICES — "যে রোগগুলোর চিকিৎসা করেন" WITH ACCESSIBLE TABS */}
      <section id="services" className="py-20 bg-[#FAF2F0] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-rose-blush-dark rounded-full filter blur-3xl opacity-30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-brand-green inline-block relative px-2">
              {t({ en: "Specialized Treatment Services", bn: "যে রোগগুলোর চিকিৎসা করেন" })}
              <span className="absolute left-1/4 right-1/4 bottom-0 h-[2px] bg-brand-accent"></span>
            </h2>
            <p className="text-slate-500 font-sans text-xs sm:text-sm uppercase tracking-widest mt-3">
              {t({ en: "Comprehensive Female Healthcare Solutions", bn: "নারী স্বাস্থ্যের সুরক্ষা ও জটিল গাইনী সমস্যার আধুনিক কেবিন সেবা" })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DOCTOR_DATA.services.map((srv, idx) => (
              <div 
                key={srv.id} 
                className="bg-white rounded-[26px] p-8 border border-rose-gold/10 hover:border-brand-accent transition-all duration-300 shadow-sm hover:shadow-xl transform hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  {/* Decorative Icon Container */}
                  <div className="w-14 h-14 rounded-2xl bg-[#FCF8F7] text-brand-accent group-hover:bg-brand-green group-hover:text-rose-blush flex items-center justify-center mb-6 transition-all shadow-inner">
                    <DynamicIcon name={srv.icon} className="w-7 h-7" />
                  </div>

                  <h3 className="font-serif font-bold text-xl text-brand-green mb-3 group-hover:text-brand-green transition-colors leading-tight">
                    {t(srv.title)}
                  </h3>

                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                    {t(srv.desc)}
                  </p>
                </div>

                {/* Sub treatments list nested in compact manner */}
                <div className="border-t border-slate-100 pt-4 mt-2">
                  <h4 className="text-xs font-bold text-[#D4A396] uppercase tracking-wider mb-2">
                    {t({ en: "Treatment Focus:", bn: "বিশেষ উদ্যোগসমূহ:" })}
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {srv.treatments.map((tr, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 shrink-0" />
                        <span>{t(tr)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Quick CTA banner */}
          <div className="glass-card mt-16 p-8 rounded-[28px] border-rose-gold/20 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-lg">
            <div className="max-w-xl">
              <h4 className="font-serif font-bold text-brand-green text-xl md:text-2xl mb-2">
                {t({ en: "Need specialized Infertility or Laparoscopic advice?", bn: "জটিল বন্ধ্যাত্ব বা ল্যাপারোস্কপিক সার্জারি বিষয়ক কথা বলতে চান?" })}
              </h4>
              <p className="text-slate-600 text-sm">
                {t({ en: "Connect on WhatsApp or call our patient coordinators directly for hassle-free serial checkups.", bn: "উভয় চেম্বারেই সিরিয়াল নেওয়ার পদ্ধতি অত্যন্ত সহজ। সরাসরি আমাদের সহকারীকে কল করে আপনার সময় নিশ্চিত করুন।" })}
              </p>
            </div>
            <a 
              href="#appointment" 
              className="px-8 py-3.5 bg-brand-green text-rose-blush font-semibold rounded-full hover:bg-brand-green-light transition-all shadow-md shrink-0 border border-transparent whitespace-nowrap text-sm"
            >
              {t({ en: "Easy Serial Booking", bn: "সিরিয়াল বুক করুন" })}
            </a>
          </div>

        </div>
      </section>

      {/* 5. CHAMBERS SECTION — DETAILS, MULTIPLE LOCATION TABLES & SPECIAL SLOTS */}
      <section id="chambers" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-brand-green inline-block relative px-2">
              {t({ en: "Visiting Chambers", bn: "চেম্বার সমূহ ও সময়" })}
              <span className="absolute left-1/4 right-1/4 bottom-0 h-[2px] bg-brand-accent"></span>
            </h2>
            <p className="text-slate-500 font-sans text-xs sm:text-sm uppercase tracking-widest mt-3">
              {t({ en: "Choose your nearest health facility location", bn: "আপনার সুবিধাজনক চেম্বার বেছে নিয়ে সুস্থতা নিশ্চিত করুন" })}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {DOCTOR_DATA.chambers.map((ch) => (
              <div 
                key={ch.id} 
                className="bg-[#FCF8F7] border border-rose-gold/15 rounded-[32px] p-6 sm:p-8 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Decorative Pill Badge */}
                <div className="absolute top-4 right-4 bg-brand-green text-rose-blush px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
                  {t({ en: ch.id === "ch-01" ? "DHANMONDI" : "UTTARA", bn: ch.id === "ch-01" ? "ধানমন্ডি" : "উত্তরা" })}
                </div>

                <h3 className="font-serif font-bold text-2xl text-brand-green mb-2 pr-20 leading-snug">
                  {t(ch.hospital)}
                </h3>

                <p className="text-[#D4A396] font-semibold text-xs tracking-wider uppercase flex items-center gap-1 mb-4">
                  <MapPin size={14} className="text-brand-accent shrink-0" />
                  {t(ch.address)}
                </p>

                {/* Info Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  <div className="bg-white p-4 rounded-2xl flex items-center gap-3 border border-rose-gold/5 shadow-sm">
                    <Clock size={18} className="text-brand-accent shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">{t({ en: "VISITING DAYS", bn: "রোগী দেখার দিন" })}</div>
                      <div className="text-xs font-bold text-brand-green">{t(ch.days)}</div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl flex items-center gap-3 border border-rose-gold/5 shadow-sm">
                    <Calendar size={18} className="text-emerald-600 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">{t({ en: "VISITING HOURS", bn: "রোগী দেখার সময়" })}</div>
                      <div className="text-xs font-bold text-brand-green">{t(ch.hours)}</div>
                    </div>
                  </div>
                </div>

                {/* Weekly Schedule Table */}
                <div className="bg-white rounded-2xl p-4 border border-rose-gold/10 shadow-sm mb-6">
                  <h4 className="text-xs font-bold text-brand-green uppercase tracking-wider mb-2 pb-2 border-b border-rose-gold/10">
                    {t({ en: "Weekly Schedule Table", bn: "সাপ্তাহিক রোগী দেখার রুটিন" })}
                  </h4>
                  <div className="flex flex-col gap-2">
                    {ch.schedule.map((item, keyIdx) => (
                      <div key={keyIdx} className="flex justify-between items-center text-xs py-1 hover:bg-slate-50 rounded px-2 transition-colors">
                        <span className="font-bold text-slate-700">{t(item.day)}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500 font-mono text-[11px]">{t(item.time)}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            t(item.status) === "Available" || t(item.status) === "খোলা আছে"
                              ? "bg-emerald-50 text-emerald-700"
                              : t(item.status) === "Closed" || t(item.status) === "বন্ধ"
                              ? "bg-rose-50 text-rose-600"
                              : "bg-amber-50 text-amber-700 font-semibold"
                          }`}>
                            {t(item.status)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Staff Hotline contact */}
                <div className="p-4 rounded-2xl bg-brand-green text-rose-blush flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-left">
                    <User size={20} className="text-brand-accent shrink-0" />
                    <div>
                      <div className="text-[10px] text-[#D4A396] font-bold uppercase">{t({ en: "CHAMBER ASSISTANT", bn: "সিরিয়ালের সহযোগিতাকারী" })}</div>
                      <div className="text-xs font-bold text-white">{t(ch.assistantName)}</div>
                    </div>
                  </div>
                  <a 
                    href={`tel:${ch.assistantPhone}`} 
                    className="inline-flex items-center justify-center gap-2 bg-[#E58C7A] px-4 py-2 hover:bg-brand-accent transition-colors rounded-xl text-xs font-bold text-white shadow-sm shrink-0"
                  >
                    <Phone size={14} />
                    {lang === "EN" ? ch.assistantPhone : t({ en: ch.assistantPhone, bn: "+৮৮০ ১৭১১-০০০১১১" })}
                  </a>
                </div>

                {/* Sub Actions map */}
                <div className="flex gap-3 mt-4 text-xs">
                  <a 
                    href="#location"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-rose-gold/20 text-brand-green font-bold hover:bg-rose-blush-dark transition-all text-center"
                  >
                    <MapPin size={14} />
                    {t({ en: "View Map Below", bn: "নিচে মানচিত্র দেখুন" })}
                  </a>
                  <a 
                    href={ch.getDirectionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-emerald-800 font-bold border border-emerald-800/10 hover:bg-emerald-50 transition-all text-center"
                  >
                    <ExternalLink size={14} />
                    {t({ en: "Get Directions", bn: "গুগল ডিরেকশন পান" })}
                  </a>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. APPOINTMENT SECTION — BOOKING FORM, PHONE & WHATSAPP SUPPORT */}
      <section id="appointment" className="py-20 bg-[#FAF2F0] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-left">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-brand-green relative inline-block">
              {t({ en: "Book Online Appointment", bn: "অনলাইন অ্যাপয়েন্টমেন্ট বুকিং" })}
              <span className="absolute left-1/4 right-1/4 bottom-0 h-[2px] bg-brand-accent"></span>
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm uppercase tracking-widest mt-2">
              {t({ en: "Secure your time slot instantly in 1 minute", bn: "সহজেই আপনার নাম নিবন্ধন করুন জাদুকরী উপায়ে" })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Booking Form Col */}
            <div className="md:col-span-8 bg-white p-6 sm:p-8 rounded-[32px] border border-rose-gold/10 shadow-xl relative overflow-hidden">
              <h3 className="font-serif font-bold text-xl text-brand-green mb-6 flex items-center gap-2">
                <CalendarCheck2 className="text-brand-accent animate-pulse" size={22} />
                {t({ en: "Submit Appointment Form", bn: "রোগীর নাম ও বিবরণ দিন" })}
              </h3>

              {alertMessage && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2.5 text-xs sm:text-sm">
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{alertMessage}</span>
                </div>
              )}

              {bookingSuccess && (
                <div className="mb-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex flex-col gap-2 shadow-inner">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={24} className="text-emerald-600 shrink-0" />
                    <span className="font-bold text-sm sm:text-base">{t({ en: "Registration Logged Successfully!", bn: "নাম নিবন্ধন সফলভাবে সম্পন্ন হয়েছে!" })}</span>
                  </div>
                  <p className="text-xs text-emerald-700 leading-relaxed ml-[34px]">
                    {t({ 
                      en: "Your appointment slot has been reserved in our system. Below you can view your scheduled entry. We recommend tapping the 'Share via WhatsApp' button below to instantly notify our assistant rcoordinators for express confirmation.", 
                      bn: "সফলভাবে আবেদনটি আমাদের ডেটাবেজে সংরক্ষিত হয়েছে। সিরিয়ালটি দ্রুত চূড়ান্ত করতে নিচে তালিকাভুক্ত সক্রিয় অ্যাপয়েন্টমেন্টের 'হোয়াটসঅ্যাপে পাঠান' বাটনে চাপ দিন।" 
                    })}
                  </p>
                </div>
              )}

              <form onSubmit={handleBookingSubmit} className="flex flex-col gap-5 text-xs sm:text-sm">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">{t({ en: "Patient Full Name *", bn: "রোগীর সম্পূর্ণ নাম *" })}</label>
                  <input 
                    type="text" 
                    placeholder={t({ en: "e.g. Farhana Sultana", bn: "উদাঃ ফারহানা সুলতানা" })}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-rose-blush border border-rose-gold/25 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">{t({ en: "Mobile Phone Number *", bn: "মোবাইল নম্বর *" })}</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. +880 17XX XXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-rose-blush border border-rose-gold/25 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">{t({ en: "Request Appointment Date *", bn: "চেম্বার পরিদর্শনের তারিখ *" })}</label>
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-4 py-3 bg-rose-blush border border-rose-gold/25 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">{t({ en: "Select Chamber Hospital *", bn: "পছন্দনীয় চেম্বার সিলেক্ট করুন *" })}</label>
                  <select 
                    value={formData.chamber}
                    onChange={(e) => setFormData({...formData, chamber: e.target.value})}
                    className="w-full px-4 py-3 bg-rose-blush border border-rose-gold/25 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green transition-all cursor-pointer font-bold text-brand-green"
                  >
                    {DOCTOR_DATA.chambers.map(ch => (
                      <option key={ch.id} value={ch.id}>{t(ch.hospital)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">{t({ en: "Write Patient Short Note (Optional)", bn: "প্রধান শারীরিক অসুবিধা বা মেসেজ" })}</label>
                  <textarea 
                    rows={3}
                    placeholder={t({ en: "e.g. 5 months prenatal care checkup, uterine issue, infertility counseling...", bn: "উদাঃ ৫ মাসের গর্ভকালীন চেকআপ, পলিসিস্টিক ওভারি, পূর্বে সিজার বা হরমোনাল সমস্যা..." })}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 bg-rose-blush border border-rose-gold/25 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green transition-all resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  id="btn-submit-booking"
                  className="w-full py-4 bg-brand-green text-rose-blush font-serif tracking-wider font-bold rounded-xl hover:bg-brand-green-light transition-all shadow-md transform hover:-translate-y-0.5 cursor-pointer text-center text-base"
                >
                  {t({ en: "Submit Appointment Application", bn: "নিবন্ধন সম্পন্ন করুন" })}
                </button>
              </form>
            </div>

            {/* Support Hotline Info Col */}
            <div className="md:col-span-4 flex flex-col gap-6">
              
              {/* Help support info */}
              <div className="bg-brand-green text-rose-blush p-6 rounded-[28px] border border-rose-gold/25 shadow-lg text-left">
                <h4 className="font-serif font-bold text-lg text-brand-accent mb-3 flex items-center gap-2">
                  <Phone size={18} className="animate-bounce" />
                  {t({ en: "Changer Helpers", bn: "জরুরি টেলিফোন সহায়তা" })}
                </h4>
                <p className="text-xs text-rose-blush/80 leading-relaxed mb-6">
                  {t({ 
                    en: "If you face any issues while filling the online layout, please directly call our serial assistances to record your booking on the ledger manually.", 
                    bn: "অনলাইনে তথ্য দিতে সমস্যা হলে সরাসরি সিরিয়াল রেজিস্ট্রারে কল করুন। তারা তাৎক্ষণিক ফোন রিসিভ করে নাম এন্ট্রি করে দেবে।" 
                  })}
                </p>

                <div className="flex flex-col gap-4">
                  <a href="tel:+8801711000111" className="bg-[#FAF2F0]/10 hover:bg-[#FAF2F0]/20 transition-colors p-3.5 rounded-xl block border border-white/15">
                    <span className="text-[10px] text-brand-accent uppercase block font-bold tracking-wider">{t({ en: "LABAID DHANMONDI SLOT ASSISTANT", bn: "ল্যাবএইড ধানমন্ডি (সহকারী নম্বর)" })}</span>
                    <span className="font-serif text-sm font-bold block mt-1">+৮৮০ ১৭১১-০০০১১১</span>
                  </a>

                  <a href="tel:+8801812000222" className="bg-[#FAF2F0]/10 hover:bg-[#FAF2F0]/20 transition-colors p-3.5 rounded-xl block border border-white/15">
                    <span className="text-[10px] text-[#A2D5C6] uppercase block font-bold tracking-wider">{t({ en: "IBN SINA UTTARA SLOT ASSISTANT", bn: "ইবনে সিনা উত্তরা (সহকারী নম্বর)" })}</span>
                    <span className="font-serif text-sm font-bold block mt-1">+৮৮০ ১৮১২-০০০২২২</span>
                  </a>
                </div>
              </div>

              {/* Secure note */}
              <div className="glass-card p-6 rounded-[24px] border-rose-gold/15 text-left text-slate-600 shadow-sm">
                <div className="flex items-start gap-2 text-xs">
                  <Lock size={16} className="text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-slate-800">{t({ en: "Absolute Privacy Guaranteed", bn: "তথ্যের পূর্ণ গোপনীয়তা রক্ষা" })}</span>
                    {t({ en: "Your personal medical queries and contacts are highly confidential under the HIPAA health directives.", bn: "রোগীর প্রতিটি তথ্য আমাদের চেম্বার কম্পিউটারে নিরাপদ ও পাসওয়ার্ড প্রটেক্টেড থাকে। গাইনোকোলজিক্যাল তথ্যের পূর্ণ মর্যাদা রক্ষা করা হয়।" })}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 6.1 PATIENT ACTIVE LOBBY / BOOKINGS MANAGER (REVELATIVE FEEDBACK FOR PREVIEW INTERACTIVE VALIDITY) */}
          {appointments.length > 0 && (
            <div className="mt-12 bg-white rounded-[32px] p-6 border border-rose-gold/25 shadow-xl">
              <div className="flex items-center justify-between border-b border-rose-blush-dark pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="text-brand-green" size={20} />
                  <h4 className="font-serif font-bold text-base sm:text-lg text-brand-green">
                    {t({ en: "Your Active Appointments Console", bn: "আপনার সক্রিয় সিরিয়াল সমূহ" })}
                  </h4>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full">
                  {appointments.length} {t({ en: "Pending", bn: "নিবন্ধিত" })}
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {appointments.map((app) => (
                  <div key={app.id} className="bg-rose-blush/40 p-4 rounded-2xl border border-rose-gold/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs sm:text-sm">
                    <div className="text-left flex-1">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="font-bold text-slate-800 text-base">{app.name}</span>
                        <span className="bg-brand-green text-rose-blush text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                          {app.chamberName}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-slate-500 mt-1">
                        <div>📅 {t({ en: "Visiting Date:", bn: "পরিদর্শনের তারিখ:" })} <span className="font-semibold text-slate-700">{app.date}</span></div>
                        <div>📞 {t({ en: "Phone Contact:", bn: "রোগীর মোবাইল নম্বর:" })} <span className="font-semibold text-slate-700">{app.phone}</span></div>
                      </div>
                      {app.message && <div className="text-slate-500 mt-2 text-xs italic bg-white/70 p-2 rounded-lg border border-rose-gold/5">“{app.message}”</div>}
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <a 
                        href={getWhatsAppMessageUrl(app)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-all shadow-sm shrink-0"
                      >
                        <SendHorizontal size={14} />
                        {t({ en: "WhatsApp Confirm", bn: "সহকারীকে হোয়াটস্যাপে পাঠান" })}
                      </a>
                      <button 
                        onClick={() => cancelAppointment(app.id)}
                        className="px-3.5 py-2.5 rounded-xl border border-rose-gold/25 text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                        title={lang === "EN" ? "Cancel Serial" : "সিরিয়াল বাতিল করুন"}
                      >
                        {t({ en: "Cancel", bn: "রদ করুন" })}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 7. CHAMBER LOCATION MAPS IFRAMES */}
      <section id="location" className="py-20 bg-white border-t border-rose-blush-dark flex flex-col items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-brand-green inline-block relative px-2">
              {t({ en: "Chambers Map Location", bn: "চেম্বারের গুগল মানচিত্র" })}
              <span className="absolute left-1/4 right-1/4 bottom-0 h-[2px] bg-brand-accent"></span>
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm uppercase tracking-widest mt-2">
              {t({ en: "Tap Get Directions for prompt GPS guidance on Google Maps", bn: "নিচের মানচিত্র দিয়ে চেম্বারের ভৌগলিক অবস্থান নিশ্চিত হোন" })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {DOCTOR_DATA.chambers.map((ch) => (
              <div key={ch.id} className="bg-rose-blush/20 p-5 rounded-[32px] border border-rose-gold/15 shadow-sm text-left flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-xl text-brand-green mb-1">{t(ch.hospital)}</h3>
                  <p className="text-xs text-slate-500 mb-4">{t(ch.address)}</p>
                  
                  {/* Google Map Embedded Frame */}
                  <div className="w-full h-80 rounded-[22px] overflow-hidden border border-rose-gold/15 bg-slate-100 shadow-inner relative">
                    <iframe 
                      title={t(ch.hospital)}
                      src={ch.mapEmbedUrl} 
                      className="w-full h-full border-0 absolute inset-0"
                      allowFullScreen={true}
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <a 
                    href={ch.getDirectionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-brand-green hover:bg-brand-green-light transition-colors rounded-xl text-xs font-bold text-rose-blush shadow-md"
                  >
                    <ExternalLink size={14} />
                    {t({ en: "Open Google Maps Navigation", bn: "গুগল ম্যাপে নেভিগেশন চালু করুন" })}
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. TESTIMONIALS & REVIEWS SECTION — STAR RATED CARDS + WRITE REVIEW TRIGGER */}
      <section id="testimonials" className="py-20 bg-rose-blush relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-brand-green inline-block relative px-2">
              {t({ en: "Patient Success Stories", bn: "রোগীদের সুস্থ হয়ে ওঠার গল্প" })}
              <span className="absolute left-1/4 right-1/4 bottom-0 h-[2px] bg-brand-accent"></span>
            </h2>
            <p className="text-slate-500 font-sans text-xs sm:text-sm uppercase tracking-widest mt-3">
              {t({ en: "Honest Reviews and Success Stories of Mothers and Laparoscopy recoveries", bn: "সুস্থ ডেলিভারি ও সফল জটিল অপারেশনের অভিজ্ঞতা নিয়ে রোগীদের স্বতঃস্ফূর্ত মনোভাব" })}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Show reviews lists */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {reviews.map((el: any) => (
                <div key={el.id} className="bg-white p-6 sm:p-8 rounded-[28px] shadow-sm border border-rose-gold/10 relative transition-transform hover:scale-101 duration-300">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-rose-blush-dark text-brand-green flex items-center justify-center font-serif font-bold text-lg border border-rose-gold/30">
                        {t(el.author).charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-base text-brand-green leading-snug">{t(el.author)}</h4>
                        <div className="text-slate-400 text-xs flex items-center gap-1">
                          <span>{t(el.location)}</span>
                          <span>•</span>
                          <span>{el.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      {/* Interactive Stars */}
                      <div className="flex text-amber-400">
                        {Array.from({ length: el.rating }).map((_, stIdx) => (
                          <Star key={stIdx} size={14} fill="currentColor" />
                        ))}
                      </div>
                      <span className="bg-[#FAF2F0] text-brand-accent text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full border border-rose-gold/10">
                        {t(el.tag)}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed italic pr-4">
                    “{t(el.text)}”
                  </p>
                </div>
              ))}
            </div>

            {/* Write a review col Form */}
            <div className="lg:col-span-5">
              <div className="glass-card p-6 sm:p-8 rounded-[32px] border-rose-gold/25 relative sticky top-28 shadow-lg">
                <h3 className="font-serif font-bold text-xl text-brand-green mb-2 flex items-center gap-1.5">
                  <MessageSquare size={22} className="text-brand-accent shrink-0" />
                  {t({ en: "Write Your Review", bn: "আপনার সুস্থতার অভিজ্ঞতা লিখুন" })}
                </h3>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  {t({ en: "Your personal words and feedback encourage other mothers in search of professional medical help.", bn: "আপনার একটি সুন্দর সৎ মন্তব্য জরায়ুর টিউমার বা বন্ধ্যাত্ব সমস্যায় আক্রান্ত অন্যান্য রোগীদের মনে নতুন সাহস জোগাতে পারে।" })}
                </p>

                {reviewSuccess && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2.5 text-xs">
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                    <span>{t({ en: "Your hospitality rating has been added live to our portal!", bn: "আপনার গুরুত্বপূর্ণ মন্তব্যটি সফলভাবে যুক্ত করা হয়েছে!" })}</span>
                  </div>
                )}

                <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4 text-xs sm:text-sm">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">{t({ en: "Your Name *", bn: "আপনার নাম *" })}</label>
                    <input 
                      type="text" 
                      required
                      placeholder={t({ en: "e.g. Mrs. Taslima Chowdhury", bn: "উদাঃ মিসেস তাসলিমা চৌধুরী" })}
                      value={newReview.author}
                      onChange={(e) => setNewReview({...newReview, author: e.target.value})}
                      className="w-full px-4 py-2.5 bg-rose-blush border border-rose-gold/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">{t({ en: "Living Location", bn: "বাসস্থান" })}</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Gulshan, Dhaka"
                        value={newReview.location}
                        onChange={(e) => setNewReview({...newReview, location: e.target.value})}
                        className="w-full px-4 py-2.5 bg-rose-blush border border-rose-gold/20 rounded-xl focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">{t({ en: "Treatment Benefit Tag", bn: "চিকিৎসার ক্যাটাগরি" })}</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Normal Delivery, IVF Success"
                        value={newReview.patientTag}
                        onChange={(e) => setNewReview({...newReview, patientTag: e.target.value})}
                        className="w-full px-4 py-2.5 bg-rose-blush border border-rose-gold/20 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">{t({ en: "Rating Stars", bn: "আপনার রেটিং প্রদান করুন" })}</label>
                    <div className="flex gap-2 text-amber-400 mt-1">
                      {[1, 2, 3, 4, 5].map((stars) => (
                        <button 
                          key={stars}
                          type="button"
                          onClick={() => setNewReview({...newReview, rating: stars})}
                          className="hover:scale-125 transition-transform cursor-pointer"
                        >
                          <Star size={24} fill={stars <= newReview.rating ? "currentColor" : "none"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">{t({ en: "Your Experience *", bn: "সুস্থতার অভিজ্ঞতা ও মতামত *" })}</label>
                    <textarea 
                      rows={3}
                      required
                      placeholder={t({ en: "Share how Dr. Syeda Nipa Nahida managed your treatment with her professional approach.", bn: "ম্যামের কাউন্সেলিং, অস্ত্রোপচার অভিজ্ঞতা ও চেম্বারের পরিবেশ নিয়ে আপনার বাস্তবমুখী মতামত দিন।" })}
                      value={newReview.text}
                      onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                      className="w-full px-4 py-2.5 bg-rose-blush border border-rose-gold/20 rounded-xl focus:outline-none resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3 bg-brand-green hover:bg-brand-green-light text-rose-blush font-semibold rounded-xl transition-all shadow-md mt-1 cursor-pointer"
                  >
                    {t({ en: "Publish My Review", bn: "মন্তব্য পোস্ট করুন" })}
                  </button>
                </form>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 9. HEALTH ARTICLES & BLOG TIPS SECTION — ACCESSIBLE MODAL DRAWER LIGHTBOX */}
      <section id="articles" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-brand-green inline-block relative px-2">
              {t({ en: "Gynae Care & Pregnant Tips", bn: "নারী স্বাস্থ্য বিষয়ক প্রবন্ধ এবং টিপস" })}
              <span className="absolute left-1/4 right-1/4 bottom-0 h-[2px] bg-brand-accent"></span>
            </h2>
            <p className="text-slate-500 font-sans text-xs sm:text-sm uppercase tracking-widest mt-3">
              {t({ en: "Free medical literature and advice authored by Dr. Nipa", bn: "গর্ভকালীন মায়েদের জটিল রোগ প্রতিরোধে ম্যামের নিজস্ব মেডিকেল পরামর্শ" })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DOCTOR_DATA.articles.map((art) => (
              <div 
                key={art.id} 
                className="bg-[#FCF8F7] border border-rose-gold/10 rounded-[32px] overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  {/* Photo container */}
                  <div className="w-full h-52 overflow-hidden relative bg-slate-100">
                    <img 
                      src={art.image} 
                      alt={t(art.title)} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-3 left-3 bg-[#112F21]/80 text-rose-blush text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full backdrop-blur-sm">
                      {t(art.category)}
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Time & date metadata */}
                    <div className="flex justify-between text-[11px] text-[#D4A396] font-bold uppercase tracking-wider mb-3">
                      <span>{art.date}</span>
                      <span>{t(art.readTime)}</span>
                    </div>

                    <h3 className="font-serif font-bold text-lg sm:text-xl text-brand-green mb-3 group-hover:text-brand-accent transition-colors leading-snug">
                      {t(art.title)}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                      {t(art.excerpt)}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <button 
                    onClick={() => setReadingArticle(art)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green hover:text-brand-accent transition-colors group/btn cursor-pointer py-1"
                  >
                    <span>{t({ en: "Read Full Article", bn: "পুরো বিষয়টি পড়তে ক্লিক করুন" })}</span>
                    <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* 9.1 INTEGRATIVE HEALTH ARTICLE DRAWER MODAL */}
        {readingArticle && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in text-left">
            <div className="bg-white rounded-[32px] max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-rose-gold/20 shadow-2xl relative">
              {/* Close pin */}
              <button 
                onClick={() => setReadingArticle(null)}
                className="absolute top-4 right-4 bg-brand-green text-rose-blush w-9 h-9 rounded-full flex items-center justify-center hover:bg-brand-accent transition-colors shadow z-10 cursor-pointer"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="w-full h-64 overflow-hidden relative">
                <img 
                  src={readingArticle.image} 
                  alt={t(readingArticle.title)} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-5 left-5 right-5 text-left">
                  <span className="bg-brand-accent text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full mb-2.5 inline-block">
                    {t(readingArticle.category)}
                  </span>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white leading-tight">
                    {t(readingArticle.title)}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 text-xs sm:text-base leading-relaxed text-slate-700">
                <div className="flex justify-between text-slate-400 text-xs pb-4 mb-6 border-b border-rose-blush-dark">
                  <span>✍️ {t({ en: "Authored by prof. Dr. Syeda Nipa Nahida", bn: "লিখেছেন: অধ্যাপক ডা. সৈয়দা নীপা নাহিদা" })}</span>
                  <span>⏱️ {t(readingArticle.readTime)}</span>
                </div>

                <div className="whitespace-pre-line font-sans flex flex-col gap-4 text-slate-600">
                  {t(readingArticle.body)}
                </div>

                <div className="mt-8 pt-6 border-t border-rose-blush-dark flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left font-serif text-sm font-bold text-brand-green">
                    {t({ en: "Was this clinical article helpful?", bn: "প্রবন্ধটি কি গর্ভকালীন সুরক্ষার জন্য সাহায্য করেছে?" })}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => alert(lang === "EN" ? "Thank you for upvoting!" : "উৎসাহ দেওয়ার জন্য ধন্যবাদ!")}
                      className="inline-flex items-center gap-1 bg-[#EEF5F1] text-brand-green border border-brand-green/15 px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-50 transition-colors cursor-pointer"
                    >
                      <ThumbsUp size={14} />
                      {t({ en: "Helpful", bn: "সহায়ক হয়েছে" })}
                    </button>
                    <button 
                      onClick={() => setReadingArticle(null)}
                      className="px-4 py-2 text-xs font-bold border border-rose-gold/25 text-slate-500 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      {t({ en: "Dismiss Content", bn: "বন্ধ করুন" })}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 10. PHOTO GALLERY — LIGHTBOX SUPPORT FOR AWARDS & CLINICS */}
      <section id="gallery" className="py-20 bg-rose-blush relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="text-center max-w-3xl mx-auto col-span-3 mb-16">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-brand-green inline-block relative px-2">
              {t({ en: "Certificates & Chamber Gallery", bn: "চিকিৎসা গ্যালারি ও অর্জন" })}
              <span className="absolute left-1/4 right-1/4 bottom-0 h-[2px] bg-brand-accent"></span>
            </h2>
            <p className="text-slate-500 font-sans text-xs sm:text-sm uppercase tracking-widest mt-2">
              {t({ en: "A visual record of medical fellowships and public healthcare seminars", bn: "চেম্বারের পরিবেশ, জার্মান ফেলোশিপ অর্জন ও সেমিনার স্মরণাতীত দৃশ্যপট" })}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOCTOR_DATA.gallery.map((it, idx) => (
              <div 
                key={it.id} 
                onClick={() => setLightboxIndex(idx)}
                className="bg-white rounded-[24px] overflow-hidden border border-rose-gold/10 hover:border-brand-accent shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer relative"
              >
                <div className="w-full h-64 overflow-hidden relative">
                  <img 
                    src={it.image} 
                    alt={t(it.title)} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-green/10 group-hover:bg-brand-green/0 transition-colors"></div>
                  
                  {/* Plus Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-brand-green/40 backdrop-blur-xs">
                    <span className="w-12 h-12 rounded-full bg-rose-blush text-brand-green flex items-center justify-center shadow">
                      <Plus size={24} />
                    </span>
                  </div>
                </div>

                <div className="p-5 text-left">
                  <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest block mb-1">
                    {t(it.category)}
                  </span>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-brand-green leading-snug group-hover:text-brand-accent transition-colors">
                    {t(it.title)}
                  </h4>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* 10.1 INTERACTIVE CUSTOM LIGHTBOX OVERLAY */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4 animate-fade-in">
            {/* Close trigger */}
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white hover:text-brand-accent transition-colors bg-white/10 p-2.5 rounded-full z-50 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X size={26} />
            </button>

            <div className="max-w-4xl w-full flex items-center justify-between gap-4 relative">
              
              {/* Prev control */}
              <button 
                onClick={() => setLightboxIndex((lightboxIndex - 1 + DOCTOR_DATA.gallery.length) % DOCTOR_DATA.gallery.length)}
                className="bg-white/15 text-white hover:bg-white/20 p-3 rounded-full cursor-pointer transition-colors shrink-0"
              >
                <ArrowLeft size={24} />
              </button>

              {/* Central image view */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <img 
                  src={DOCTOR_DATA.gallery[lightboxIndex].image} 
                  alt={t(DOCTOR_DATA.gallery[lightboxIndex].title)} 
                  className="max-h-[70vh] max-w-full object-contain rounded-2xl border border-white/10 shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Label */}
                <div className="text-center mt-6 max-w-lg">
                  <span className="text-brand-accent text-xs font-bold uppercase tracking-wider block mb-1">
                    {t(DOCTOR_DATA.gallery[lightboxIndex].category)}
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl text-white font-bold leading-tight">
                    {t(DOCTOR_DATA.gallery[lightboxIndex].title)}
                  </h4>
                  <div className="text-slate-400 text-xs mt-2">
                    {lightboxIndex + 1} / {DOCTOR_DATA.gallery.length} {t({ en: "Gallery Slides", bn: "গ্যালারি স্লাইড" })}
                  </div>
                </div>
              </div>

              {/* Next control */}
              <button 
                onClick={() => setLightboxIndex((lightboxIndex + 1) % DOCTOR_DATA.gallery.length)}
                className="bg-white/15 text-white hover:bg-white/20 p-3 rounded-full cursor-pointer transition-colors shrink-0"
              >
                <ArrowRight size={24} />
              </button>

            </div>
          </div>
        )}
      </section>

      {/* 11. FAQ ACCORDION — QUESTIONS CLASSIFIED FOR COMFICIENCY */}
      <section id="faq" className="py-20 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-left">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-brand-green inline-block relative px-2">
              {t({ en: "Frequently Asked Questions", bn: "সাধারণ জিজ্ঞাসাসমূহ (FAQ)" })}
              <span className="absolute left-1/4 right-1/4 bottom-0 h-[2px] bg-brand-accent"></span>
            </h2>
            <p className="text-slate-500 font-sans text-xs sm:text-sm uppercase tracking-widest mt-2">
              {t({ en: "Fast clarifications regarding serial queues, checkups, and protocols", bn: "রোগীর মনে স্বাভাবিকভাবে উঠে আসা গাইনী ও চেম্বার বিষয়ক প্রশ্নাবলি" })}
            </p>
          </div>

          {/* Interactive Classification selectors */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {(["all", "appointment", "chamber", "general"] as const).map((cat) => (
              <button 
                key={cat}
                onClick={() => {
                  setFaqCategory(cat);
                  setExpandedFaq(null);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                  faqCategory === cat 
                    ? "bg-brand-green text-rose-blush border-transparent shadow" 
                    : "bg-rose-blush/35 text-brand-green-light border-rose-gold/10 hover:bg-rose-blush-dark"
                }`}
              >
                {t({
                  all: { en: "All Questions", bn: "সবগুলো জিজ্ঞাসা" },
                  appointment: { en: "Appointments & Serials", bn: "সিরিয়াল ও টিকিট" },
                  chamber: { en: "Chambers & Hours", bn: "চেম্বার ও সময়" },
                  general: { en: "Clinical Concerns", bn: "ব্যথামুক্ত ডেলিভারি ও সার্জারি" }
                }[cat])}
              </button>
            ))}
          </div>

          {/* Render grouped FAQ items */}
          <div className="flex flex-col gap-4">
            {DOCTOR_DATA.faqs
              .filter(fq => faqCategory === "all" || fq.category === faqCategory)
              .map((fq) => {
                const isOpen = expandedFaq === fq.id;
                return (
                  <div 
                    key={fq.id} 
                    className="border border-rose-gold/15 rounded-2xl overflow-hidden bg-rose-blush/10 hover:bg-rose-blush/20 transition-all shadow-sm"
                  >
                    <button 
                      onClick={() => setExpandedFaq(isOpen ? null : fq.id)}
                      className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 font-serif font-bold text-[#112F21] text-base sm:text-lg cursor-pointer"
                    >
                      <span>{t(fq.question)}</span>
                      <ChevronDown 
                        size={20} 
                        className={`text-brand-accent shrink-0 transition-transform duration-300 mt-1 ${isOpen ? "rotate-180" : ""}`} 
                      />
                    </button>
                    
                    {isOpen && (
                      <div className="px-5 pb-6 sm:px-6 sm:pb-8 text-xs sm:text-sm text-slate-600 font-sans border-t border-rose-blush-dark pt-4 leading-relaxed animate-slide-down">
                        {t(fq.answer)}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

        </div>
      </section>

      {/* 12. CONTACT FORM AND CO-ORDINATION CARDS */}
      <section id="contact" className="py-20 bg-[#FAF2F0] relative overflow-hidden">
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-rose-blush-dark rounded-full filter blur-3xl opacity-30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-brand-green inline-block relative px-2">
              {t({ en: "Get In Touch", bn: "সরাসরি যোগাযোগ করুন" })}
              <span className="absolute left-1/4 right-1/4 bottom-0 h-[2px] bg-brand-accent"></span>
            </h2>
            <p className="text-slate-500 font-sans text-xs sm:text-sm uppercase tracking-widest mt-2">
              {t({ en: "Have queries or health tips request? Drop private message", bn: "যেকোনো প্রশ্নের জন্য আমাদের মেডিকেল সাপোর্ট ইমেইলে বার্তা পাঠান" })}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Quick parameters col */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-rose-gold/10 text-left shadow-sm">
                <h3 className="font-serif font-bold text-xl text-brand-green mb-6">{t({ en: "Official Contact Details", bn: "যোগাযোগের মূল ঠিকানা" })}</h3>
                
                <div className="flex flex-col gap-5 text-sm sm:text-base">
                  <div className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-xl bg-rose-blush text-brand-accent flex items-center justify-center shrink-0 shadow-inner">
                      <Phone size={18} />
                    </span>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{t({ en: "CALL SUPPORT OFFICE", bn: "হেল্পডেস্ক নম্বর" })}</span>
                      <a href={`tel:${DOCTOR_DATA.phone}`} className="font-bold text-brand-green hover:text-brand-accent transition-colors block mt-0.5">+৮৮০ ১৭১১-০০০১১১</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-xl bg-rose-blush text-[#22C55E] flex items-center justify-center shrink-0 shadow-inner">
                      <Share2 size={18} />
                    </span>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{t({ en: "WHATSAPP CHANNEL", bn: "হোয়াটসঅ্যাপ হেল্পলাইন" })}</span>
                      <a href="https://wa.me/8801711000111" target="_blank" rel="noreferrer" className="font-bold text-brand-green hover:text-brand-accent transition-colors block mt-0.5">+৮৮০ ১৭১১-০০০১১১</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-xl bg-rose-blush text-brand-accent flex items-center justify-center shrink-0 shadow-inner">
                      <Mail size={18} />
                    </span>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{t({ en: "EMAIL INQUIRIES", bn: "মেডিকেল ইমেইল" })}</span>
                      <a href={`mailto:${DOCTOR_DATA.email}`} className="font-bold text-brand-green hover:text-brand-accent transition-colors block mt-0.5">{DOCTOR_DATA.email}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-xl bg-rose-blush text-indigo-600 flex items-center justify-center shrink-0 shadow-inner">
                      <Globe size={18} />
                    </span>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{t({ en: "WEBSITE ADDRESS", bn: "ওয়েবসাইট ঠিকানা" })}</span>
                      <span className="font-bold text-brand-green block mt-0.5">www.drnipanahida.com</span>
                    </div>
                  </div>
                </div>

                {/* Social media connections */}
                <div className="mt-8 pt-6 border-t border-rose-blush-dark">
                  <h4 className="text-xs font-bold text-[#D4A396] uppercase tracking-wider text-slate-400 mb-3">{t({ en: "Connect on Social Portals", bn: "সামাজিক যোগাযোগ ফোরামে আমাদের ফলো করুন" })}</h4>
                  <div className="flex gap-3">
                    <a href={DOCTOR_DATA.socials.facebook} target="_blank" rel="noreferrer" className="w-11 h-11 bg-[#FAF2F0] hover:bg-[#1877F2]/10 text-slate-700 hover:text-[#1877F2] transition-all rounded-full flex items-center justify-center border border-rose-gold/10 shadow-sm">
                      <Facebook size={20} />
                    </a>
                    <a href={DOCTOR_DATA.socials.linkedin} target="_blank" rel="noreferrer" className="w-11 h-11 bg-[#FAF2F0] hover:bg-[#0077B5]/10 text-slate-700 hover:text-[#0077B5] transition-all rounded-full flex items-center justify-center border border-rose-gold/10 shadow-sm">
                      <Linkedin size={20} />
                    </a>
                    <a href={DOCTOR_DATA.socials.youtube} target="_blank" rel="noreferrer" className="w-11 h-11 bg-[#FAF2F0] hover:bg-[#FF0000]/10 text-slate-700 hover:text-[#FF0000] transition-all rounded-full flex items-center justify-center border border-rose-gold/10 shadow-sm">
                      <Youtube size={20} />
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Message Form Col */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-[32px] border border-rose-gold/10 shadow-xl relative text-left">
              <h3 className="font-serif font-bold text-xl text-brand-green mb-6">{t({ en: "Send Private Inquiry Message", bn: "আমাদের ঠিকানায় বার্তা পাঠান" })}</h3>
              
              {contactSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2 text-xs">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                  <span>{t({ en: "Inquiry Sent! Thank you, our assistant will address it soon.", bn: "আপনার বার্তা পাঠানো হয়েছে! আমাদের দল দ্রুত যুক্ত হবে।" })}</span>
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="flex flex-col gap-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t({ en: "Full Name *", bn: "আপনার নাম *" })}</label>
                  <input 
                    type="text" 
                    required
                    placeholder={t({ en: "e.g. Mrs. Sharmin Akhter", bn: "উদাঃ মিসেস শারমিন আক্তার" })}
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-4 py-2.5 bg-rose-blush border border-rose-gold/20 rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t({ en: "Active Phone Number *", bn: "যোগাযোগ মোবাইল নম্বর *" })}</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="e.g. +880 17XX XXXXXX"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    className="w-full px-4 py-2.5 bg-rose-blush border border-rose-gold/20 rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t({ en: "Detailed Message *", bn: "আপনার প্রশ্ন বা পরামর্শ *" })}</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder={t({ en: "Request specialized health guides or provide clinical updates...", bn: "অতিরিক্ত তথ্য জানতে বা পরামর্শ শেয়ার করতে বিশদ লিখুন..." })}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full px-4 py-2.5 bg-rose-blush border border-rose-gold/20 rounded-xl focus:outline-none resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-brand-green hover:bg-brand-green-light text-rose-blush font-serif tracking-wider font-bold rounded-xl transition-all shadow-md cursor-pointer text-center text-sm"
                >
                  {t({ en: "Send Private Inquiry", bn: "বার্তা পাঠান" })}
                </button>
              </form>
            </div>

          </div>

        </div>
      </section>

      {/* 13. FOOTER — QUICK LINKS AND STYLISH GENERATED QR SCANNER CARD */}
      <footer className="bg-brand-green text-rose-blush border-t border-rose-gold/25 relative z-10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start justify-between">
            
            {/* Column 1 - Brand & intro */}
            <div className="md:col-span-5 flex flex-col gap-4 text-left">
              <a href="#hero" className="flex items-center gap-2 group">
                <span className="w-10 h-10 rounded-full bg-rose-blush text-brand-green flex items-center justify-center font-serif font-bold text-lg hover:scale-105 transition-transform shadow-inner">
                  N
                </span>
                <div>
                  <div className="font-serif font-bold text-white text-base leading-tight tracking-wide">
                    {t(DOCTOR_DATA.name)}
                  </div>
                  <div className="text-[10px] text-brand-accent tracking-widest font-medium uppercase mt-0.5">
                    {t(DOCTOR_DATA.title)}
                  </div>
                </div>
              </a>

              <p className="text-rose-blush/70 text-xs sm:text-sm leading-relaxed max-w-sm mt-3">
                {t({ 
                  en: "Dedicated female healthcare with clinical precision. Offering advanced Laparoscopic surgery & state-of-the-art Infertility guidance under total confidentiality.", 
                  bn: "সুনিপুণ যত্ন ও আন্তর্জাতিক মানের গাইনিকোলজিক্যাল চিকিৎসাসেবা। নারীদের নিরাপদ মাতৃত্ব ও সুস্থ জীবন গঠনে আমরা অঙ্গীকারবদ্ধ।" 
                })}
              </p>

              {/* Badges of Safety */}
              <div className="flex gap-4 items-center mt-2 text-[#D4A396] text-xs">
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={14} />
                  <span>ISO Approved</span>
                </div>
                <span>|</span>
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={14} />
                  <span>BMDC Registered</span>
                </div>
              </div>
            </div>

            {/* Column 2 - Navigation index */}
            <div className="md:col-span-4 col-span-1 border-rose-blush/10 text-left">
              <h4 className="font-serif font-bold text-lg text-white mb-6 tracking-wide">{t({ en: "Quick Portals Map", bn: "দ্রুত লিঙ্কসমূহ" })}</h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 font-sans text-xs sm:text-sm text-rose-blush/80">
                <a href="#about" className="hover:text-brand-accent transition-colors flex items-center gap-1">
                  <ChevronRight size={12} />
                  {t({ en: "About Bio", bn: "পরিচিতি" })}
                </a>
                <a href="#services" className="hover:text-brand-accent transition-colors flex items-center gap-1">
                  <ChevronRight size={12} />
                  {t({ en: "Specialties", bn: "চিকিৎসা সেবা" })}
                </a>
                <a href="#chambers" className="hover:text-brand-accent transition-colors flex items-center gap-1">
                  <ChevronRight size={12} />
                  {t({ en: "Chambers", bn: "চেম্বার গাইড" })}
                </a>
                <a href="#appointment" className="hover:text-brand-accent transition-colors flex items-center gap-1">
                  <ChevronRight size={12} />
                  {t({ en: "Online Booking", bn: "সিরিয়াল বুকিং" })}
                </a>
                <a href="#articles" className="hover:text-brand-accent transition-colors flex items-center gap-1">
                  <ChevronRight size={12} />
                  {t({ en: "Health Tips", bn: "স্বাস্থ্যালাপ" })}
                </a>
                <a href="#gallery" className="hover:text-brand-accent transition-colors flex items-center gap-1">
                  <ChevronRight size={12} />
                  {t({ en: "Gallery Photos", bn: "অ্যালবাম" })}
                </a>
                <a href="#faq" className="hover:text-brand-accent transition-colors flex items-center gap-1">
                  <ChevronRight size={12} />
                  {t({ en: "General FAQs", bn: "জিজ্ঞাসা বোর্ড" })}
                </a>
                <a href="#contact" className="hover:text-brand-accent transition-colors flex items-center gap-1">
                  <ChevronRight size={12} />
                  {t({ en: "Contact Help", bn: "যোগাযোগ" })}
                </a>
              </div>
            </div>

            {/* Column 3 - Live QR Scan Box */}
            <div className="md:col-span-3 text-center md:text-right flex flex-col md:items-end justify-center">
              <div className="bg-white/5 border border-white/10 p-5 rounded-[28px] max-w-xs md:max-w-none text-left">
                <h5 className="font-serif font-bold text-sm text-white mb-2 flex items-center gap-1.5 uppercase tracking-wide">
                  <Sparkles size={14} className="text-brand-accent" />
                  {t({ en: "QR Code Presets", bn: "ফোন স্ক্যানার কিউআর" })}
                </h5>
                <p className="text-[10px] text-rose-blush/75 mb-3 leading-relaxed">
                  {t({ en: "Scan QR Code with mobile camera to bookmark this live schedule of Dr. Syeda Nipa Nahida instantly.", bn: "মোবাইল ক্যামেরা দিয়ে এই কিউআর (QR) কোডটি স্ক্যান করে ম্যামের সরাসরি বুকিং সাইট মোবাইলে সংরক্ষণ করুন।" })}
                </p>
                
                {/* SVG Rendered QR Code */}
                <div className="flex justify-center md:justify-start">
                  <MedicalQRCodeSVG value="https://ais-dev-ukg5bk3oozc7lvgzodhrf3-461111286402.asia-east1.run.app" />
                </div>
              </div>
            </div>

          </div>

          <div className="border-t border-rose-blush/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-rose-blush/60 font-sans text-center">
            <div>
              © {new Date().getFullYear()} Dr. Syeda Nipa Nahida Portfolio. {t({ en: "All rights reserved.", bn: "সর্বস্বত্ব সংরক্ষিত।" })}
            </div>
            <div>
              {t({ en: "Design & Development with total precision.", bn: "ডিজাইন ও উন্নয়ন: সর্বোচ্চ সূক্ষ্মতা ম্যামের টিম।" })}
            </div>
          </div>
        </div>
      </footer>

      {/* 14. FLOATING WHATSAPP CHAT BUBBLE */}
      <a 
        id="whatsapp-bubble"
        href="https://wa.me/8801711000111" 
        target="_blank" 
        rel="noreferrer" 
        className="fixed bottom-6 right-6 z-50 bg-[#22C55E] hover:bg-emerald-600 transition-all duration-300 p-3.5 rounded-full text-white shadow-2xl hover:scale-110 flex items-center justify-center pulse-whatsapp group"
        aria-label="Direct WhatsApp Link"
        title={lang === "EN" ? "Direct Whatsapp Booking Support" : "সরাসরি চেম্বার হোয়াটসঅ্যাপ হেল্প"}
      >
        <span className="absolute right-full mr-3 text-xs font-bold leading-none bg-[#112F21] text-rose-blush py-1.5 px-3 rounded-full shadow border border-rose-gold/10 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {t({ en: "WhatsApp Helper ✅", bn: "সরাসরি চ্যাট করুন ✅" })}
        </span>
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-11.507c-.124-.208-.464-.33-.978-.588-.514-.258-3.04-1.502-3.515-1.67-.475-.172-.822-.258-1.164.258-.34.515-1.322 1.67-1.621 2.012-.292.341-.588.38-.1.122.396-.15 1.747-.578 3.328-1.993 1.223-1.092 2.05-2.443 2.29-2.857.24-.419.025-.641-.184-.897-.189-.23-.414-.479-.621-.722-.207-.24-.275-.41-.1-.67.172-.259.773-3.189.941-3.541.171-.351.341-.301.469-.301.121 0 .258-.01.396-.01.139 0 .363.05.553.258.19.208.729.712.729 1.735 0 1.02-.746 2.01-1.077 2.459-.331.45-1.47 2.24-3.56 3.14-.497.217-.887.347-1.19.44.5.156.953.125 1.312.071.4-.059 1.223-.501 1.394-1.01.171-.509.171-.941.121-1.011-.05-.07-.19-.109-.504-.15-.315-.04-1.85-.91-2.13-1.01z"/>
        </svg>
      </a>

    </div>
  );
}
