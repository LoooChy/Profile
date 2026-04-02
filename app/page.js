"use client";

import { useEffect, useMemo, useState } from "react";
import ParticleHeadingCanvas from "./components/ParticleHeading";
import ProfileCardBits from "./components/ProfileCardBits";
import SkillBadge from "./components/SkillBadge";

const navItems = [
  { label: "Info", href: "#hero" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#work" },
  { label: "Contact", href: "#contact" }
];

const skillBadges = [
  { name: "React", className: "bg-primary text-on-primary px-6 md:px-12 py-3 md:py-6 rounded-full text-xl md:text-4xl font-black" },
  { name: "Next.js", className: "bg-surface-container-highest text-on-surface px-4 md:px-8 py-2 md:py-4 rounded-full text-base md:text-2xl font-bold", delay: "0.1s" },
  { name: "TypeScript", className: "bg-on-primary-container text-on-primary px-5 md:px-10 py-2.5 md:py-5 rounded-full text-lg md:text-3xl font-extrabold", delay: "0.2s" },
  { name: "Tailwind CSS", className: "bg-surface-container-lowest text-primary border-2 border-primary px-4 md:px-7 py-2 md:py-3 rounded-full text-sm md:text-xl font-medium", delay: "0.3s" },
  { name: "Vue 2/3", className: "bg-secondary-container text-on-secondary-container px-8 md:px-14 py-4 md:py-8 rounded-full text-2xl md:text-5xl font-black", delay: "0.4s" },
  { name: "Redux / MobX", className: "bg-surface-container-highest text-on-surface px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-lg font-normal", delay: "0.5s" },
  { name: "Jest + RTL", className: "bg-primary-container text-on-primary-container px-5 md:px-9 py-2.5 md:py-4 rounded-full text-lg md:text-2xl font-bold", delay: "0.6s" },
  { name: "Canvas / ECharts", className: "bg-surface-container-lowest text-on-surface px-6 md:px-12 py-3 md:py-6 rounded-full text-xl md:text-3xl font-black", delay: "0.7s" },
  { name: "AWS", className: "bg-on-secondary-container text-white px-5 md:px-8 py-2.5 md:py-4 rounded-full text-sm md:text-xl font-bold", delay: "0.8s" }
];

const experiences = [
  {
    year: "2024",
    icon: "public",
    tag: "Freelance Project",
    title: "Full-Stack Developer",
    company: "MOSO TEA",
    description:
      "Worked with a small team to design and ship a commercial booking website, covering requirement discussions, UX planning, frontend implementation, booking interactions, and deployment on Vercel.",
    chips: ["Next.js", "Booking Flow"],
    cardClass: "card-slide-right bg-on-primary-container text-on-primary",
    titleClass: "",
    descriptionClass: "text-on-surface",
    chipClass: "bg-white/10",
    tagClass: "bg-surface-container-lowest/10"
  },
  {
    year: "2020",
    icon: "work",
    tag: "Oct 2020 - Oct 2023",
    title: "Senior Frontend Developer",
    company: "Jfhealthcare Technology Co., Ltd",
    description:
      "Led the migration of a CT/MRI annotation platform from jQuery to React, rebuilt the canvas rendering architecture, and improved performance for lower-bandwidth clinic environments by 30%.",
    chips: ["React Migration", "Canvas"],
    cardClass: "card-slide-left bg-surface-container-lowest/80 backdrop-blur-md",
    titleClass: "text-on-surface",
    descriptionClass: "text-on-surface-variant",
    chipClass: "bg-surface-container",
    tagClass: "bg-primary-container text-on-primary-container"
  },
  {
    year: "2018",
    icon: "terminal",
    tag: "Mar 2018 - Oct 2020",
    title: "Intermediate Frontend Developer",
    company: "FHSS Technology Co., Ltd",
    description:
      "Delivered 30+ web applications and internal platforms for public-sector digital transformation, built data-intensive monitoring dashboards with React and ECharts, contributed to a React-based low-code platform, and modernised legacy jQuery/JSP systems into reusable Webpack-based frontend architecture.",
    chips: ["Data Dashboards", "Low-Code Platform"],
    cardClass: "card-slide-right bg-on-primary-container text-on-primary",
    titleClass: "",
    descriptionClass: "text-on-surface",
    chipClass: "bg-white/10",
    tagClass: "bg-surface-container-lowest/10"
  },
  {
    year: "2016",
    icon: "brush",
    tag: "Jul 2016 - Mar 2018",
    title: "Junior Frontend Developer",
    company: "Jiangsu Suwei Technology Co., Ltd",
    description:
      "Built features for robot inspection and online education platforms, including trajectory visualisation, historical monitoring records, reusable table components, and operations dashboards.",
    chips: ["Visualisation", "Operations UI"],
    cardClass: "card-slide-left bg-surface-container-lowest/80 backdrop-blur-md",
    titleClass: "text-on-surface",
    descriptionClass: "text-on-surface-variant",
    chipClass: "bg-surface-container",
    tagClass: "bg-surface-container text-primary"
  }
];

const educationCards = [
  {
    type: "Master / 2024-2025",
    title: "Master of Information Technology",
    school: "Whitireia & WelTec",
    description: "Advanced study in software engineering, modern web architecture, and applied product development.",
    accent: "border-primary text-primary",
    icon: "school"
  },
  {
    type: "Bachelor / 2011-2015",
    title: "Bachelor of Communication Engineering",
    school: "Nanjing University of Posts and Telecommunications",
    description: "Built a strong technical foundation in engineering systems, communications, and structured problem solving.",
    accent: "border-secondary text-secondary",
    icon: "architecture"
  }
];

const skillsHeading = [
  { text: "CORE", size: 138, color: "#e2e0f6" },
  { text: "SKILLS", size: 138, color: "#ffb300" }
];

const experienceHeading = [
  { text: "WORK", size: 138, color: "#e2e0f6" },
  { text: "EXPERIENCE", size: 138, color: "#ffb300" }
];

const projectsHeading = [
  { text: "PROJECT", size: 138, color: "#e2e0f6" },
  { text: "SHOWCASE", size: 138, color: "#ffb300" }
];

const educationHeading = [
  { text: "EDUCATION", size: 138, color: "#e2e0f6" }
];

const particleHeadings = {
  education: { lines: educationHeading, scale: 0.48 },
  experience: { lines: experienceHeading, scale: 0.55 },
  skills: { lines: skillsHeading, scale: 0.65 },
  work: { lines: projectsHeading, scale: 0.55 }
};

function StaggeredLine({ text, className = "" }) {
  return (
    <span className={`block ${className}`}>
      {text.split("").map((char, index) => (
        <span key={`${text}-${index}`} className="reveal-char">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function HomePage() {
  const [activeHeadingKey, setActiveHeadingKey] = useState(null);
  const [activeNavHref, setActiveNavHref] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const parallaxBg = document.getElementById("parallax-bg");
    const slider = document.getElementById("journey-slider");
    const nextBtn = document.getElementById("journey-next");
    const prevBtn = document.getElementById("journey-prev");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("active");
          if (entry.target.id === "stagger-reveal") {
            entry.target.querySelectorAll(".reveal-char").forEach((char, index) => {
              window.setTimeout(() => {
                char.classList.add("active");
              }, index * 30);
            });
          }
        });
      },
      { threshold: 0.05 }
    );

    const animElements = document.querySelectorAll(
      ".scroll-reveal, .badge-float, .year-draw, .card-slide-left, .card-slide-right, .zoom-reveal-container, .skew-reveal, #stagger-reveal"
    );
    animElements.forEach((element) => observer.observe(element));

    function handleScroll() {
      setShowBackToTop(window.scrollY > 480);
      if (parallaxBg && window.innerWidth > 768) {
        parallaxBg.style.transform = `translateY(${window.pageYOffset * 0.3}px)`;
      }

      const headingSectionKeys = ["skills", "experience", "work", "education"];
      const navSections = [
        { href: "#hero", id: "hero" },
        { href: "#skills", id: "skills" },
        { href: "#experience", id: "experience" },
        { href: "#work", id: "work" },
        { href: "#contact", id: "contact" }
      ];
      const anchorY = window.innerHeight * 0.6;
      let nextHeadingKey = null;

      for (let i = 0; i < headingSectionKeys.length; i += 1) {
        const section = document.getElementById(headingSectionKeys[i]);
        if (!section) {
          continue;
        }

        const rect = section.getBoundingClientRect();
        if (rect.top <= anchorY && rect.bottom >= anchorY) {
          nextHeadingKey = headingSectionKeys[i];
          break;
        }
      }

      let nextNavHref = null;
      let nearestNavHref = null;
      let nearestDistance = Number.POSITIVE_INFINITY;

      for (let i = 0; i < navSections.length; i += 1) {
        const section = document.getElementById(navSections[i].id);
        if (!section) {
          continue;
        }

        const rect = section.getBoundingClientRect();
        if (rect.top <= anchorY && rect.bottom >= anchorY) {
          nextNavHref = navSections[i].href;
          break;
        }

        const centerY = rect.top + rect.height / 2;
        const distance = Math.abs(centerY - anchorY);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestNavHref = navSections[i].href;
        }
      }

      if (!nextNavHref) {
        nextNavHref = nearestNavHref;
      }

      setActiveHeadingKey((current) => (current === nextHeadingKey ? current : nextHeadingKey));
      setActiveNavHref((current) => (current === nextNavHref ? current : nextNavHref));
    }

    const scrollAmount = () => (window.innerWidth < 768 ? window.innerWidth - 32 : 450);
    const nextHandler = () => slider?.scrollBy({ left: scrollAmount(), behavior: "smooth" });
    const prevHandler = () => slider?.scrollBy({ left: -scrollAmount(), behavior: "smooth" });

    nextBtn?.addEventListener("click", nextHandler);
    prevBtn?.addEventListener("click", prevHandler);

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      nextBtn?.removeEventListener("click", nextHandler);
      prevBtn?.removeEventListener("click", prevHandler);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <ParticleHeadingCanvas activeKey={activeHeadingKey} headings={particleHeadings} />

      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,75,226,0.08)]">
        <div className="flex justify-between items-center w-full px-4 md:px-8 py-4 md:py-6 max-w-screen-2xl mx-auto">
          <a className="text-xl md:text-2xl font-black tracking-tighter text-blue-700 dark:text-blue-500 hover:scale-105 transition-transform font-['Manrope']" href="#hero">EDDIE.LU</a>
          <div className="hidden md:flex gap-10 items-center font-['Manrope'] font-bold tracking-tight">
            {navItems.map((item) => {
              const isActive = activeNavHref === item.href;

              return (
                <a
                  key={item.href}
                  className={isActive ? "text-blue-700 dark:text-blue-400 border-b-2 border-blue-600 pb-1 hover:scale-110 hover:italic transition-all duration-300" : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 pb-1 border-b-2 border-transparent hover:scale-110 hover:italic transition-all duration-300"}
                  href={item.href}
                  onClick={() => setActiveNavHref(item.href)}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
          <a className="bg-primary text-on-primary px-5 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base font-bold hover:scale-105 duration-300 ease-out shadow-lg" download href="/Qingyi_Lu_CV.docx">Download CV</a>
        </div>
      </nav>

      <main className="pt-20 md:pt-24 overflow-x-hidden relative z-10 w-full">
        <section className="relative min-h-screen flex items-center px-6 md:px-20 py-16 md:py-24" id="hero">
          <div className="absolute inset-0 z-0 flex flex-col justify-center items-center pointer-events-none opacity-5 transition-transform duration-75" id="parallax-bg">
            <span className="clamp-bg-text font-black leading-none text-primary uppercase select-none">EDDIE</span>
            <span className="clamp-bg-text font-black leading-none text-primary uppercase select-none text-outline -mt-10 md:-mt-20">LU</span>
          </div>
          <div className="relative z-10 w-full max-w-screen-2xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 text-center md:text-left">
              <div className="inline-block px-4 md:px-6 py-1.5 md:py-2 bg-primary-container text-on-primary-container rounded-full mb-6 md:mb-8 font-bold tracking-widest text-[10px] md:text-xs uppercase transform -rotate-2 scroll-reveal">Wellington-based Frontend Developer</div>
              <h1 className="clamp-hero-title font-black leading-[0.95] md:leading-[0.9] tracking-tighter mb-8 md:mb-10 text-on-primary-container" id="stagger-reveal">
                <StaggeredLine text="Building" />
                <StaggeredLine text="Frontend" className="text-primary italic" />
                <StaggeredLine text="Interfaces." />
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-xl mx-auto md:mx-0 mb-10 md:mb-12 font-medium leading-relaxed scroll-reveal" style={{ transitionDelay: "0.4s" }}>
                With 7 years of experience across React, TypeScript, and Next.js, I build scalable, accessible web applications, modernise legacy systems, and translate complex product requirements into maintainable frontend architecture.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start scroll-reveal" style={{ transitionDelay: "0.6s" }}>
                <a className="bg-primary text-on-primary px-8 md:px-10 py-4 md:py-5 rounded-full text-base md:text-lg font-extrabold hover:scale-110 transition-transform shadow-xl w-full sm:w-auto" href="#experience">View Experience</a>
                <a className="bg-surface-container-high text-on-surface px-8 md:px-10 py-4 md:py-5 rounded-full text-base md:text-lg font-extrabold hover:scale-110 transition-transform w-full sm:w-auto" href="#contact">Contact Me</a>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center relative scroll-reveal" style={{ transitionDelay: "0.2s" }}>
              <ProfileCardBits
                enableMobileTilt
                imageAlt="Eddie Lu portrait artwork"
                imageSrc="/photo.png"
                meta="React, TypeScript, Next.js and design-system thinking."
                name="Eddie Lu"
                role="Frontend Developer"
              />
              <div className="absolute bottom-5 right-0 md:bottom-10 md:-right-10 bg-surface-container-lowest p-4 md:p-6 rounded-xl shadow-xl transform rotate-6 max-w-[150px] md:max-w-[200px]">
                <span className="material-symbols-outlined text-primary text-3xl md:text-4xl mb-1 md:mb-2">code</span>
                <p className="text-[10px] md:text-sm font-bold text-on-surface leading-tight">React, TypeScript, Next.js and design-system thinking.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 px-6 md:px-8 overflow-hidden" id="skills">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6 md:gap-8">
              <h2 className="sr-only">Core Skills</h2><div aria-hidden="true" className="h-[132px] sm:h-[150px] md:h-[220px] skew-reveal" />
            </div>
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-10">
              {skillBadges.map((badge) => (
                <SkillBadge key={badge.name} className={badge.className} delay={badge.delay} label={badge.name} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-transparent overflow-hidden" id="experience">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-8 mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8">
            <div>
              <h2 className="sr-only">Work Experience</h2><div aria-hidden="true" className="h-[132px] sm:h-[150px] md:h-[220px] skew-reveal" />
              <p className="text-on-surface-variant font-black text-[10px] md:text-sm uppercase tracking-widest mt-2 md:mt-4 scroll-reveal">7 years across product, platform and delivery teams</p>
            </div>
            <div className="hidden md:flex gap-4 scroll-reveal">
              <button className="w-16 h-16 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300" id="journey-prev" type="button"><span className="material-symbols-outlined font-black">arrow_back</span></button>
              <button className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 transition-all duration-300" id="journey-next" type="button"><span className="material-symbols-outlined font-black">arrow_forward</span></button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:overflow-x-auto pb-10 md:pb-20 px-6 md:px-8 gap-10 md:gap-12 snap-y md:snap-x no-scrollbar scroll-smooth" id="journey-slider">
            {experiences.map((experience, index) => (
              <div key={`${experience.year}-${experience.company}`} className={`min-w-full md:min-w-[450px] snap-center relative ${index === 1 ? "md:mt-24" : ""}`}>
                <span className="absolute -top-12 -left-4 md:-top-16 md:-left-4 text-7xl md:text-9xl font-black text-surface-container-highest/50 select-none z-0 year-draw">{experience.year}</span>
                <div className={`relative z-10 p-6 md:p-10 rounded-xl shadow-2xl ${experience.cardClass}`}>
                  <div className="flex justify-between items-start mb-6 md:mb-10">
                    <span className="material-symbols-outlined text-primary text-4xl md:text-5xl">{experience.icon}</span>
                    <span className={`text-[8px] md:text-xs font-black uppercase tracking-widest py-1 px-3 rounded-full ${experience.tagClass}`}>{experience.tag}</span>
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-black mb-2 ${experience.titleClass}`}>{experience.title}</h3>
                  <p className="text-primary font-bold mb-4 md:mb-6 text-sm md:text-base">{experience.company}</p>
                  <p className={`text-sm md:text-base leading-relaxed mb-6 md:mb-8 ${experience.descriptionClass}`}>{experience.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {experience.chips.map((chip) => (
                      <span key={chip} className={`text-[9px] md:text-[10px] font-black uppercase px-2 py-1 rounded ${experience.chipClass}`}>{chip}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="py-20 md:py-32 px-6 md:px-8 bg-surface-container-highest/10" id="work">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-16 md:mb-24 gap-4">
              <h2 className="sr-only">Project Showcase</h2><div aria-hidden="true" className="h-[132px] sm:h-[150px] md:h-[220px] skew-reveal" />
              <p className="text-on-surface-variant font-black text-[10px] md:text-sm uppercase tracking-widest border-l-4 border-primary pl-4 scroll-reveal">Public launches and selected disclosed work</p>
            </div>
            <div className="grid md:grid-cols-12 gap-6 md:gap-10">
              <div className="md:col-span-8 group zoom-reveal-container">
                <div className="relative bg-surface-container-lowest rounded-xl overflow-hidden shadow-xl aspect-square sm:aspect-video md:aspect-[21/9]">
                  <img alt="MOSO TEA" className="w-full h-full object-cover" src="/tea-journey.jpg" />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-primary-container/80 to-transparent" />
                  <div className="absolute top-4 left-4 md:top-8 md:left-8 text-5xl md:text-8xl font-black text-white/20 select-none">01</div>
                  <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6">
                    <div>
                      <h3 className="text-2xl md:text-4xl font-black text-white mb-2 md:mb-4">MOSO TEA</h3>
                      <p className="text-slate-100 mb-4 max-w-2xl text-sm md:text-base leading-relaxed">Custom booking website for a tea culture studio in Wellington, covering UX, full-stack development, deployment, and booking flow design.</p>
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {['Next.js', 'TypeScript', 'PostgreSQL'].map((tag) => (
                          <span key={tag} className="px-3 md:px-4 py-1 bg-primary text-on-primary rounded-full text-[9px] md:text-xs font-bold uppercase tracking-widest">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <a className="bg-surface-container-lowest text-on-surface w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors self-end" href="https://mosotea.co.nz" rel="noreferrer" target="_blank">
                      <span className="material-symbols-outlined">arrow_outward</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 group zoom-reveal-container">
                <a className="block relative bg-surface-container-lowest rounded-xl overflow-hidden shadow-xl aspect-square" href="http://intl.jfhealthcare.com/en/" rel="noreferrer" target="_blank">
                  <img alt="CT/MRI annotation platform" className="w-full h-full object-cover" src="/ct.png" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 left-4 md:top-8 md:left-8 text-5xl md:text-8xl font-black text-on-surface/5 select-none">02</div>
                  <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
                    <h3 className="text-xl md:text-3xl font-black text-on-surface group-hover:text-white transition-colors">CT/MRI ANNOTATION PLATFORM</h3>
                    <p className="text-[9px] md:text-sm font-bold text-on-surface-variant group-hover:text-on-primary-container transition-colors uppercase tracking-widest">Medical Imaging Platform</p>
                  </div>
                </a>
              </div>

              <div className="md:col-span-5 group zoom-reveal-container">
                <a className="block relative bg-on-primary-container rounded-xl overflow-hidden shadow-xl aspect-square" href="https://www.fhss.com.cn/" rel="noreferrer" target="_blank">
                  <img alt="Data visualisation and security solutions" className="absolute w-full h-full object-cover" src="/fhss.png" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 overflow-hidden"><div className="w-full h-full bg-primary blob-shape animate-pulse" /></div>
                  <div className="absolute top-4 left-4 md:top-8 md:left-8 text-5xl md:text-8xl font-black text-white/10 select-none">03</div>
                  <div className="relative z-10 p-6 md:p-12 h-full flex flex-col justify-end">
                    <h3 className="text-2xl md:text-4xl font-black text-white mb-2 md:mb-4">DATA VISUALISATION & SECURITY</h3>
                    <p className="text-surface-variant mb-6 md:mb-8 text-sm md:text-lg font-medium">Delivered enterprise web platforms focused on data visualisation, data protection, and information security workflows, helping operational teams monitor critical systems and manage sensitive information with greater clarity.</p>
                    <div className="flex gap-3 md:gap-4 flex-wrap">
                      {['Data Visualisation', 'Data Security', 'InfoSec'].map((tag) => (
                        <span key={tag} className="px-3 md:px-4 py-1.5 md:py-2 bg-white/10 text-white rounded-full text-[9px] md:text-xs font-black uppercase">{tag}</span>
                      ))}
                    </div>
                  </div>
                </a>
              </div>

              <div className="md:col-span-7 group zoom-reveal-container">
                <div className="relative bg-surface-container-lowest rounded-xl overflow-hidden shadow-xl aspect-square md:aspect-video">
                  <img alt="Robot inspection platform" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASrD7vMDRZl7kY9cTheShhxMHKrbWdpI9lG4b4863QqfuJCDJLGvUmNG1A7BdADN_yk4iWLmQTYgxSQ8W1M0z7MtAFp8N_wGWrxM6hQJy-HozLY0LWt9UsWZedJcC9gItJyGMG1DuP5M9HZHciBPH6aML393oTcfb_eLVhUPEspN5wzPBTiVaYBRRM27y-gkba0eyUfW-NK3ECtVoZDZ-J8SxV22Ikmydm4MD3TjW4gmmyx0N6gCN-zJL9hdf815C8voBCiDTRMwKH" />
                  <div className="absolute top-4 right-4 md:top-8 md:right-8 text-5xl md:text-8xl font-black text-black/10 select-none">04</div>
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-center p-6 md:p-8">
                      <h3 className="text-3xl md:text-5xl font-black text-on-surface mb-2">ROBOT INSPECTION PLATFORM</h3>
                      <p className="text-primary font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] mb-6 md:mb-8 text-xs md:text-sm">Enterprise Delivery</p>
                      <button className="bg-primary text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base font-bold" type="button">Confidential Delivery</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 px-6 md:px-8 text-white" id="education">
          <div className="max-w-screen-2xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h2 className="sr-only">Education</h2><div aria-hidden="true" className="mb-8 md:mb-10 h-[132px] sm:h-[150px] md:h-[220px] skew-reveal" />
              <p className="text-slate-400 text-lg md:text-xl font-medium max-w-md leading-relaxed skew-reveal">Formal study in New Zealand and China, backed by hands-on delivery experience across enterprise products, platform modernisation, and production frontend engineering.</p>
            </div>
            <div className="space-y-6 md:space-y-8">
              {educationCards.map((item) => (
                <div key={item.title} className={`bg-slate-800 backdrop-blur-sm p-6 md:p-8 rounded-xl border-l-8 relative overflow-hidden skew-reveal ${item.accent}`}>
                  <div className="relative z-10">
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-3 md:mb-4 block">{item.type}</span>
                    <h3 className="text-2xl md:text-3xl font-black mb-1 md:mb-2 text-white">{item.title}</h3>
                    <p className="text-slate-400 font-bold mb-3 md:mb-4 uppercase tracking-widest text-xs md:text-sm">{item.school}</p>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{item.description}</p>
                  </div>
                  <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-7xl md:text-[10rem] opacity-5 text-white">{item.icon}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 md:py-32 px-6 md:px-8 bg-transparent overflow-hidden" id="contact">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] gap-14 md:gap-20 items-start">
              <div className="scroll-reveal">
                <h2 className="text-5xl sm:text-6xl md:text-[6rem] font-black tracking-tighter text-on-surface leading-[0.95] md:leading-[0.85] mb-8 md:mb-12">LET&apos;S BUILD <br />YOUR NEXT <br /><span className="text-primary italic">PRODUCT.</span></h2>
                {/* <p className="text-on-surface-variant text-lg md:text-2xl font-medium max-w-2xl leading-relaxed">
                  Available for frontend engineering, product interface work, and selected 3D web experiences across product, platform, and commercial website projects.
                </p> */}
              </div>
              <div className="scroll-reveal lg:pt-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-8 md:gap-10">
                  <div>
                    <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-primary mb-2 md:mb-4">Location</p>
                    <p className="text-2xl md:text-3xl font-bold text-on-surface">Wellington, New Zealand<span className="block text-base md:text-lg text-on-surface-variant mt-2">Open Work Visa (NZ)</span></p>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-primary mb-2 md:mb-4">Contact</p>
                    <a className="block text-2xl md:text-4xl font-black text-on-surface hover:text-primary transition-colors underline decoration-2 md:decoration-4 underline-offset-4 md:underline-offset-8 break-all" href="mailto:qylu9527@gmail.com">qylu9527@gmail.com</a>
                    <a className="block mt-4 text-lg md:text-2xl font-bold text-on-surface-variant hover:text-primary transition-colors" href="tel:+64273550336">+64 27 355 0336</a>
                  </div>
                </div>
                <div className="pt-8 md:pt-10">
                  <div className="flex flex-wrap gap-4 md:gap-6">
                    <a className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-[0_12px_24px_rgba(248,193,0,0.22)] transition-transform hover:scale-105" href="tel:+64273550336"><span className="material-symbols-outlined text-sm">call</span></a>
                    <a className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-[0_12px_24px_rgba(248,193,0,0.22)] transition-transform hover:scale-105" href="mailto:qylu9527@gmail.com"><span className="material-symbols-outlined text-sm">alternate_email</span></a>
                    <a className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-[0_12px_24px_rgba(248,193,0,0.22)] transition-transform hover:scale-105" href="#work"><span className="material-symbols-outlined text-sm">work_history</span></a>
                    <a className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-[0_12px_24px_rgba(248,193,0,0.22)] transition-transform hover:scale-105 text-sm font-black" href="https://www.linkedin.com/in/eddie-lu-0a9570304/" rel="noreferrer" target="_blank">in</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative w-full overflow-hidden flex flex-col items-start justify-end gap-16 md:gap-20 bg-slate-900/90 dark:bg-black/90 min-h-[300px] md:min-h-[400px] p-6 md:p-12 z-20">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none flex items-center justify-center">
          <span className="clamp-footer-text font-black leading-none text-white dark:text-slate-100 opacity-10 select-none font-['Manrope'] whitespace-nowrap">EDDIE LU</span>
        </div>
        <div className="w-full max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-end gap-10 md:gap-12 relative z-10">
          <div className="flex flex-col gap-4 md:gap-6 w-full md:w-auto">
            <a className="text-3xl sm:text-4xl md:text-7xl font-black text-white hover:text-primary transition-colors duration-500 tracking-tighter" href="mailto:qylu9527@gmail.com">LET&apos;S BUILD.</a>
            <div className="flex flex-wrap gap-4 md:gap-8 font-['Manrope'] uppercase tracking-[0.15em] md:tracking-[0.2em] text-[10px] md:text-sm">
              <a className="text-slate-400 hover:text-white transition-colors hover:tracking-[0.25em] md:hover:tracking-[0.3em] transition-all duration-500" href="#work">Projects</a>
              <a className="text-slate-400 hover:text-white transition-colors hover:tracking-[0.25em] md:hover:tracking-[0.3em] transition-all duration-500" href="#experience">Experience</a>
              <a className="text-slate-400 hover:text-white transition-colors hover:tracking-[0.25em] md:hover:tracking-[0.3em] transition-all duration-500" href="#contact">Contact</a>
            </div>
          </div>
          <div className="text-right flex flex-col items-end gap-3 md:gap-4">
            <p className="font-['Manrope'] uppercase tracking-[0.15em] md:tracking-[0.2em] text-slate-400 text-[9px] md:text-xs">Copyright {year} Eddie Lu. All rights reserved.</p>
            <div className="w-16 md:w-20 h-1.5 md:h-2 bg-primary" />
          </div>
        </div>
      </footer>

      <button
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-[60] w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary text-on-primary shadow-2xl flex items-center justify-center transition-all duration-300 ${showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        type="button"
      >
        <span className="material-symbols-outlined">arrow_upward</span>
      </button>
    </>
  );
}














