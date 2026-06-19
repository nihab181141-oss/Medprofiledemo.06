export interface Translation {
  en: string;
  bn: string;
}

export interface TimelineItem {
  year: string;
  institution: Translation;
  title: Translation;
}

export interface AwardItem {
  year: string;
  title: Translation;
  desc: Translation;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: Translation;
  desc: Translation;
  treatments: Translation[];
}

export interface ChamberItem {
  id: string;
  name: Translation;
  hospital: Translation;
  address: Translation;
  days: Translation;
  hours: Translation;
  assistantName: Translation;
  assistantPhone: string;
  mapEmbedUrl: string;
  getDirectionsUrl: string;
  schedule: {
    day: Translation;
    time: Translation;
    status: Translation;
  }[];
}

export interface TestimonialItem {
  id: string;
  author: Translation;
  location: Translation;
  rating: number;
  text: Translation;
  date: string;
  tag: Translation;
}

export interface ArticleItem {
  id: string;
  image: string;
  title: Translation;
  excerpt: Translation;
  body: Translation;
  category: Translation;
  readTime: Translation;
  date: string;
}

export interface FAQItem {
  id: string;
  category: "appointment" | "chamber" | "general";
  question: Translation;
  answer: Translation;
}

export interface DoctorConfig {
  name: Translation;
  title: Translation;
  degrees: Translation;
  introLine: Translation;
  phone: string;
  whatsapp: string;
  email: string;
  socials: {
    facebook: string;
    linkedin: string;
    youtube: string;
  };
  bio: Translation[];
  education: TimelineItem[];
  experience: TimelineItem[];
  memberships: Translation[];
  awards: AwardItem[];
  services: ServiceItem[];
  chambers: ChamberItem[];
  testimonials: TestimonialItem[];
  articles: ArticleItem[];
  faqs: FAQItem[];
  gallery: {
    id: string;
    image: string;
    title: Translation;
    category: Translation;
  }[];
}
