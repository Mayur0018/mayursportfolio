import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RocketLoader from "./components/RocketLoader";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaDownload,
  FaArrowRight,
  FaFolder,
  FaCode,
  FaUsers,
  FaEye,
  FaShieldAlt,
  FaDesktop,
  FaLightbulb,
  FaTachometerAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import api from "./api/api";
import heroImg from "./assets/heroimg.png";
import mayurposhak from "./assets/mayurposhak.png";
import skullcandy from "./assets/skullcandy.png";
import doctorbooking from "./assets/healthbuddy.png";
const fade = (delay = 0, y = 30) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } as any,
});

const slideLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } as any,
});

const slideRight = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } as any,
});

const scaleUp = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.8, y: 20 },
  whileInView: { opacity: 1, scale: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } as any,
});

const DEFAULT_TECHS = [
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "Framer Motion",
];

const DEFAULT_PROJECTS = [
  {
    title: "Mayur Poshak – Ecommerce Website",
    description: "A full-featured ecommerce application with cart system, authentication, and responsive UI built using React and Tailwind CSS.",
    tech: ["React", "Tailwind"],
    imageSrc: mayurposhak.src,
    liveUrl: "https://mayur-poshak.vercel.app/"
  },
  {
    title: "Skull Candy – Product Landing Website",
    description: "A modern product landing page with clean UI and responsive layout built using React and Tailwind CSS.",
    tech: ["React", "Tailwind"],
    imageSrc: skullcandy,
    liveUrl: "https://skull-candy-je8x.vercel.app/"
  },
  {
    title: "Doctor Appointment Booking System",
    description: "A doctor appointment booking platform with authentication, scheduling system, and backend integration using MERN stack.",
    tech: ["MERN", "React"],
    imageSrc: doctorbooking.src,
    liveUrl: "https://doctor-appointment-booking-pink.vercel.app/"
  }
];

const ARTICLES = [
  {
    title: "Why Next.js 14 is a Game Changer for Developers",
    img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
    date: "May 15, 2026",
  },
  {
    title: "State Management in React: Zustand vs Redux",
    img: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&q=80",
    date: "May 10, 2026",
  },
  {
    title: "Tips to Write Better UI with Tailwind CSS",
    img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80",
    date: "May 03, 2026",
  },
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: config } = useQuery({
    queryKey: ["config"],
    queryFn: async () => (await api.get("/config")).data,
  });
  const { data: projectsData } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => (await api.get("/projects")).data,
  });
  const { data: skillsData } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => (await api.get("/skills")).data,
  });
  const {
    data: experienceData,
    isLoading: isExperienceLoading,
    isError: isExperienceError,
    error: experienceError,
  } = useQuery({
    queryKey: ["experience"],
    queryFn: async () => (await api.get("/experience")).data,
    retry: 1,
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error("/api/experience fetch failed", error);
    },
  });

  const projects =
    projectsData && projectsData.length > 0 ? projectsData : DEFAULT_PROJECTS;
  const experiences = Array.isArray(experienceData) ? experienceData : [];
  const techs =
    skillsData && skillsData.length > 0
      ? skillsData.map((s: any) => s.name)
      : DEFAULT_TECHS;

  return (
    <>
      {/* 3D Rocket Loader */}
      {loading && <RocketLoader onDone={() => setLoading(false)} />}

      <div
        className="bg-[#F5F5F5] text-[#111] overflow-x-hidden"
        style={{ fontFamily: "'Inter',sans-serif" }}
      >
        {/* ── NAVBAR ── */}
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between px-6 md:px-16 py-6 relative z-50"
        >
          <span
            style={{ fontFamily: "'Playfair Display',serif" }}
            className="text-3xl md:text-4xl font-black tracking-tight"
          >
            {config?.siteName || "MN."}
          </span>
          <button
            className="md:hidden text-[#111] p-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <FaBars size={24} />
          </button>
          <div className="hidden md:flex items-center gap-10 text-sm font-semibold">
            {[
              "Home",
              "About",
              "Education",
              "Projects",
              "Articles",
              "Contact",
            ].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="nav-link hover:text-[#E53E3E] transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="hidden md:flex items-center bg-[#111] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#E53E3E] transition-colors duration-300"
          >
            Let's Connect
          </a>
        </motion.nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-[100] bg-[#F5F5F5] flex flex-col p-6 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            >
              <div className="flex justify-between items-center mb-12">
                <span
                  style={{ fontFamily: "'Playfair Display',serif" }}
                  className="text-3xl font-black tracking-tight text-[#111]"
                >
                  {config?.siteName || "MN."}
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#111] p-2"
                >
                  <FaTimes size={28} />
                </button>
              </div>

              <nav className="flex flex-col gap-8 text-2xl font-black text-[#111] uppercase tracking-wider text-center flex-1 justify-center">
                {[
                  "Home",
                  "About",
                  "Education",
                  "Projects",
                  "Articles",
                  "Contact",
                ].map((l) => (
                  <a
                    key={l}
                    href={`#${l.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-[#E53E3E] transition-colors"
                  >
                    {l}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 mx-auto inline-block bg-[#111] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[#E53E3E] transition-colors w-fit"
                >
                  Let's Connect
                </a>
              </nav>

              <div className="flex justify-center gap-6 mt-auto py-8">
                {[
                  {
                    icon: <FaGithub />,
                    href:
                      config?.socials?.github || "https://github.com/mayur0018",
                  },
                  {
                    icon: <FaLinkedin />,
                    href:
                      config?.socials?.linkedin ||
                      "https://www.linkedin.com/in/mayur-nishad-bb0751236/?skipRedirect=true",
                  },
                  {
                    icon: <FaTwitter />,
                    href: config?.socials?.twitter || "#",
                  },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-2xl text-gray-800 hover:text-[#E53E3E]"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── HERO ── */}
        <section
          id="home"
          className="py-12 md:py-20 px-6 md:px-16 max-w-7xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
            {/* Left – illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex-1 w-full max-w-md"
            >
              <div className="bg-[#FFC83D] rounded-[32px] overflow-hidden aspect-square flex items-end justify-center w-full relative">
                <img
                  src={heroImg.src}
                  alt="Developer"
                  className="w-[90%] h-[95%] object-contain object-bottom"
                />
              </div>
            </motion.div>

            {/* Right – text */}
            <div className="flex-1 space-y-6 md:space-y-8">
              <motion.h1
                {...fade(0.1)}
                style={{ fontFamily: "'Playfair Display',serif" }}
                className="text-3xl md:text-4xl lg:text-5xl font-black leading-[1.2] uppercase"
              >
                Frontend
                <br />
                Developer
                <br />
              </motion.h1>
              <motion.p
                {...fade(0.2)}
                className="text-gray-700 text-base max-w-md leading-relaxed"
              >
                {config?.aboutMe?.text ||
                  "I build modern, responsive and user-friendly web applications with clean code and great attention to detail."}
              </motion.p>
              <motion.div
                {...fade(0.3)}
                className="flex flex-wrap items-center gap-4"
              >
                <a
                  href="#"
                  className="flex items-center gap-2 bg-[#E53E3E] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-red-600 transition-colors"
                >
                  Download Resume <FaDownload className="text-xs" />
                </a>
                <a
                  href="#projects"
                  className="flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-full text-sm font-bold hover:border-[#111] transition-colors group"
                >
                  <span className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center group-hover:border-[#111] transition-colors">
                    <FaArrowRight className="text-[10px]" />
                  </span>
                  View My Work
                </a>
              </motion.div>
              <motion.div
                {...fade(0.4)}
                className="flex items-center gap-6 pt-2"
              >
                {[
                  {
                    icon: <FaGithub />,
                    href:
                      config?.socials?.github || "https://github.com/mayur0018",
                  },
                  {
                    icon: <FaLinkedin />,
                    href:
                      config?.socials?.linkedin ||
                      "https://www.linkedin.com/in/mayur-nishad-bb0751236/?skipRedirect=true",
                  },
                  {
                    icon: <FaTwitter />,
                    href: config?.socials?.twitter || "#",
                  },
                  { icon: <FaGlobe />, href: "#" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xl text-gray-800 hover:text-[#E53E3E] transition-colors"
                  >
                    {s.icon}
                  </a>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── DOUBLE MARQUEE RIBBON ── */}
        <div
          className="relative mt-8 mb-20 overflow-hidden"
          style={{ margin: "2rem -2rem" }}
        >
          <div className="relative py-12">
            {/* Black ribbon (behind) */}
            <div
              className="absolute inset-0 top-1/2 -translate-y-1/2 bg-[#111] py-4 w-full"
              style={{ transform: "rotate(2deg) scale(1.1)" }}
            >
              <div className="marquee-track-reverse">
                {[...techs, ...techs, ...techs, ...techs, ...techs].map(
                  (t, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-6 px-6 opacity-40"
                    >
                      <div className="w-2 h-2 bg-gray-500 rounded-full flex-shrink-0" />
                      <span className="text-gray-400 font-bold text-lg md:text-xl tracking-wider">
                        {t}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
            {/* Pink ribbon (front) */}
            <div
              className="relative bg-[#C53030] py-4 w-full"
              style={{ transform: "rotate(-2deg) scale(1.1)" }}
            >
              <div className="marquee-track">
                {[...techs, ...techs, ...techs, ...techs, ...techs].map(
                  (t, i) => (
                    <div key={i} className="flex items-center gap-6 px-6">
                      <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
                      <span className="text-white font-bold text-lg md:text-xl tracking-wider">
                        {t}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── ABOUT ME ── */}
        <section id="about" className="py-16 px-6 md:px-16 max-w-5xl mx-auto">
          <motion.h2
              {...slideLeft()}
            style={{ fontFamily: "'Playfair Display',serif" }}
            className="text-3xl md:text-4xl font-black mb-6 uppercase"
          >
            About Me
          </motion.h2>
          <motion.p
            {...fade(0.1)}
            className="text-gray-700 max-w-2xl text-sm md:text-base leading-relaxed mb-10"
          >
            I am a passionate Frontend Developer who loves building beautiful
            and functional web experiences. I enjoy turning ideas into reality
            using modern technologies. Dedicated to writing clean code and
            delivering high-quality solutions that solve real-world problems.
          </motion.p>

          {/* Skill highlights */}
          <motion.div
            {...fade(0.2)}
            className="flex flex-wrap gap-4 md:gap-8 mb-12"
          >
            {[
              {
                icon: <FaShieldAlt className="text-[#C53030] text-lg" />,
                t: "Clean Code",
              },
              {
                icon: <FaDesktop className="text-[#C53030] text-lg" />,
                t: "Responsive Design",
              },
              {
                icon: <FaLightbulb className="text-[#C53030] text-lg" />,
                t: "Problem Solver",
              },
              {
                icon: <FaTachometerAlt className="text-[#C53030] text-lg" />,
                t: "Performance Focused",
              },
            ].map((h) => (
              <div key={h.t} className="flex items-center gap-3">
                {h.icon} <span className="font-bold text-sm">{h.t}</span>
              </div>
            ))}
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            {...fade(0.3)}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              {
                v: projects.length + "+",
                l: "Projects Completed",
                icon: <FaFolder className="text-[#E53E3E]" />,
                bg: "bg-red-50",
              },
              {
                v: "25+",
                l: "Repositories",
                icon: <FaCode className="text-green-500" />,
                bg: "bg-green-50",
              },
              {
                v: config?.profile?.stats?.followers || "1.2K+",
                l: "Followers",
                icon: <FaUsers className="text-orange-500" />,
                bg: "bg-orange-50",
              },
              {
                v: "4.8K+",
                l: "Profile Views",
                icon: <FaEye className="text-gray-500" />,
                bg: "bg-purple-50",
              },
            ].map((s) => (
              <div
                key={s.l}
                className="bg-white rounded-2xl p-6 border border-gray-100 flex items-center gap-4 card-lift"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${s.bg}`}
                >
                  {s.icon}
                </div>
                <div>
                  <div className="font-black text-xl">{s.v}</div>
                  <div className="text-[10px] md:text-xs text-gray-500 font-semibold uppercase">
                    {s.l}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── WORKING PROCESS ── */}
        <section className="bg-[#111] text-white py-24 px-6 md:px-16 mt-16">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              {...slideLeft()}
              style={{ fontFamily: "'Playfair Display',serif" }}
              className="text-3xl md:text-4xl font-black uppercase text-center mb-16"
            >
              My Working Process
            </motion.h2>

            <div className="relative">
              <div className="hidden md:block absolute left-[30%] top-2 bottom-2 w-px bg-gray-800" />
              <div className="space-y-12 md:space-y-16">
                {isExperienceError && (
                  <div className="text-center text-red-400 mb-8">
                    Experience section failed to load. Check the browser console or API logs.
                  </div>
                )}
                {!isExperienceError && !isExperienceLoading && experiences.length === 0 && (
                  <div className="text-center text-slate-400 mb-8">
                    No experience records found. Please verify the production database and `/api/experience` response.
                  </div>
                )}
                {experiences.map((s: any, i: number) => (
                  <motion.div
                    key={i}
                    {...fade(i * 0.1)}
                    className="flex flex-col md:flex-row gap-6 md:gap-0 relative group"
                  >
                    {/* Left Column - Number & Title */}
                    <div className="md:w-[30%] flex items-start md:pr-10 relative">
                      <span className="text-xs font-bold text-[#E53E3E] mr-3 mt-1">
                        0{i + 1}.
                      </span>
                      <h3
                        className={`text-xl md:text-2xl font-bold ${i === 0 ? "text-[#E53E3E]" : "text-white"} group-hover:text-[#E53E3E] transition-colors`}
                      >
                        {s.role || s.title || `Step ${i + 1}`}
                      </h3>
                    </div>

                    {/* Center Dot */}
                    <div className="hidden md:flex absolute left-[30%] -ml-[4px] top-2 w-2 h-2 rounded-full bg-white group-hover:bg-[#E53E3E] group-hover:scale-150 transition-all z-10" />

                    {/* Right Column - Description */}
                    <div className="md:w-[70%] md:pl-10">
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── EDUCATION ── */}
        <section
          id="education"
          className="py-24 px-6 md:px-16 max-w-6xl mx-auto"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <motion.h2
              {...slideLeft()}
              style={{ fontFamily: "'Playfair Display',serif" }}
              className="text-3xl md:text-4xl font-black uppercase leading-[1.2] max-w-xl"
            >
              Education &amp;
              <br className="hidden md:block" /> Certifications
            </motion.h2>
            <motion.p {...slideRight(0.1)} className="text-gray-500 text-sm max-w-xs">
              My academic background and continuous learning journey.
            </motion.p>
          </div>

          {/* Degrees */}
          <motion.div {...fade(0.1)} className="mb-12">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#C53030] mb-6">
              Academic Degrees
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  degree: "Master of Computer Applications",
                  field: "MCA – Computer Applications",
                  institution: "Gujarat Technological University (GTU)",
                  period: "Sep 2023 – Jul 2025",
                  grade: "Completed",
                  highlights: [
                    "HTML5",
                    "CSS3",
                    "JavaScript",
                    "React",
                    "Node.js",
                    "MongoDB",
                    "DSA",
                    "DBMS",
                  ],
                  emoji: "🎓",
                },
                {
                  degree: "Bachelor of Computer Applications",
                  field: "BCA – Computer Engineering",
                  institution: "Gujarat University",
                  period: "Sep 2020 – Apr 2023",
                  grade: "Completed",
                  highlights: [
                    "PHP",
                    "SQL",
                    "HTML5",
                    "CSS3",
                    "JavaScript",
                    "C++",
                  ],
                  emoji: "🏛️",
                },
              ].map((d, i) => (
                <motion.div
                  key={i}
                  {...scaleUp(i * 0.15)}
                  className="bg-white rounded-2xl p-6 border border-gray-100 card-lift"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-[#C53030] text-xl flex-shrink-0">
                      {d.emoji}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-base text-[#111]">
                        {d.degree}
                      </h4>
                      <p className="text-[#C53030] text-sm font-semibold">
                        {d.field}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {d.institution} · {d.period} · {d.grade}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {d.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-xs font-semibold px-3 py-1 rounded-full bg-red-50 text-[#C53030]"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div {...fade(0.2)} className="mb-12">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#C53030] mb-6">
              Licenses & Certifications
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[
                {
                  name: "Complete Web Development Course",
                  issuer: "Udemy",
                  date: "2024",
                  emoji: "🌐",
                },
                {
                  name: "Figma UI UX Design Essentials",
                  issuer: "Udemy",
                  date: "Jul 2025",
                  emoji: "🎨",
                },
                {
                  name: "Node Certification Test",
                  issuer: "Complete Coding · Prashant Sir",
                  date: "May 2025",
                  emoji: "🟢",
                },
                {
                  name: "React Hooks Crash Course",
                  issuer: "GreatStack",
                  date: "Mar 2025",
                  emoji: "⚛️",
                },
                {
                  name: "JavaScript Fundamentals",
                  issuer: "GreatStack",
                  date: "Mar 2025",
                  emoji: "⚡",
                },
                {
                  name: "Namaste JavaScript",
                  issuer: "NamasteDev.com",
                  date: "Mar 2025",
                  emoji: "🙏",
                },
                {
                  name: "React & Redux Certification",
                  issuer: "Complete Coding · Prashant Sir",
                  date: "Mar 2024",
                  emoji: "🔁",
                },
              ].map((c, i) => (
                <motion.div
                  key={i}
                  {...fade(i * 0.08)}
                  className="bg-white rounded-2xl p-5 border border-gray-100 card-lift text-center"
                >
                  <div className="text-3xl mb-3">{c.emoji}</div>
                  <h4 className="font-black text-sm text-[#111] mb-1 leading-tight">
                    {c.name}
                  </h4>
                  <p className="text-xs text-gray-500">{c.issuer}</p>
                  <p className="text-xs text-[#C53030] font-semibold mt-2">
                    {c.date}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Courses */}
          <motion.div {...fade(0.3)}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#C53030] mb-6">
              Courses & Self-Learning
            </h3>
            <div className="space-y-4">
              {[
                {
                  name: "Complete Web Development Bootcamp",
                  platform: "Udemy",
                  progress: 100,
                  hours: "60h+",
                },
                {
                  name: "Namaste JavaScript (Deep Dive)",
                  platform: "NamasteDev.com · Akshay Saini",
                  progress: 100,
                  hours: "20h+",
                },
                {
                  name: "React Hooks & Redux Mastery",
                  platform: "GreatStack + YouTube",
                  progress: 100,
                  hours: "25h+",
                },
                {
                  name: "Figma UI UX Design Essentials",
                  platform: "Udemy",
                  progress: 100,
                  hours: "15h+",
                },
              ].map((c, i) => (
                <motion.div
                  key={i}
                  {...slideLeft(i * 0.1)}
                  className="bg-white rounded-2xl px-6 py-4 border border-gray-100 flex flex-col sm:flex-row sm:items-center gap-4 card-lift"
                >
                  <div className="flex-1">
                    <p className="font-bold text-sm text-[#111]">{c.name}</p>
                    <p className="text-xs text-gray-500">
                      {c.platform} · {c.hours}
                    </p>
                  </div>
                  <div className="sm:w-40">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="font-bold text-[#C53030]">
                        {c.progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#C53030] to-[#E53E3E] rounded-full"
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── PROJECTS ── */}
        <section
          id="projects"
          className="py-24 px-6 md:px-16 max-w-7xl mx-auto"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <motion.h2
              {...slideLeft()}
              style={{ fontFamily: "'Playfair Display',serif" }}
              className="text-3xl md:text-4xl font-black uppercase leading-[1.2] max-w-xl"
            >
              Take A Look At My <br className="hidden md:block" /> Recent
              Project
            </motion.h2>
            <motion.a
              {...fade(0.1)}
              href="#"
              className="flex items-center gap-2 bg-[#E53E3E] text-white px-8 py-3.5 rounded-full text-sm font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-700/20"
            >
              Browse All <FaArrowRight />
            </motion.a>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((p: any, i: number) => (
              <motion.div
                key={p._id || i}
                {...fade(i * 0.05)}
                className="bg-transparent rounded-[24px] p-6 md:p-8 border border-black/10 flex flex-col sm:flex-row items-center gap-6 md:gap-8 hover:border-black/20 hover:bg-black/[0.02] transition-all cursor-pointer group"
                onClick={() => window.open(p.liveUrl || "#", "_blank")}
              >
                {/* Text Side */}
                <div className="flex-1 w-full sm:w-1/2 flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl font-black mb-4 text-[#111]">
                    {p.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed line-clamp-3">
                    {p.description ||
                      "I have done this awesome website development project in the recent time with passion.."}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-black text-[#111] group-hover:text-[#E53E3E] transition-colors">
                    Case Study <FaArrowRight className="text-xs" />
                  </span>
                </div>
                {/* Image Side */}
                <div className="w-full sm:w-1/2 flex items-center justify-center overflow-hidden">
                  <img
                    src={
                      p.imageSrc ||
                      p.img ||
                      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80"
                    }
                    alt={p.title}
                    className="w-full h-auto rounded-xl shadow-sm group-hover:scale-[1.03] transition-transform duration-500 object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── STATISTICS RIBBON ── */}
        <section className="bg-[#C53030] py-12 px-6 border-y-2 border-[#111]">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-around items-center gap-8 text-center text-white">
            {[
              {
                v: config?.profile?.stats?.followers || "1.2K+",
                l: "Happy Followers",
              },
              { v: "100%", l: "Client Satisfaction" },
              { v: projects.length + "+", l: "Projects Completed" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                {...fade(i * 0.1)}
                className="flex-1 border-b md:border-b-0 md:border-r border-white/20 last:border-0 pb-6 md:pb-0"
              >
                <div className="text-4xl md:text-5xl font-black mb-1">
                  {s.v}
                </div>
                <div className="text-white font-bold text-xs md:text-sm">
                  {s.l}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-24 px-6 md:px-16 max-w-5xl mx-auto">
          <motion.h2
              {...slideLeft()}
            style={{ fontFamily: "'Playfair Display',serif" }}
            className="text-2xl md:text-3xl font-black uppercase mb-12"
          >
            What My Clients Are Saying
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                quote:
                  "Mayur is a fantastic developer! He delivered exactly what we needed with great quality and on time. Highly recommended.",
                name: "John Doe",
                role: "CEO, TechCorp",
                img: "https://ui-avatars.com/api/?name=John+Doe&background=random",
              },
              {
                quote:
                  "Amazing work and attention to detail. The project was smooth, responsive and exceeded our expectations.",
                name: "Sarah Johnson",
                role: "Product Manager",
                img: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=random",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.1)}
                className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 card-lift"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-black text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  "{t.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── BLOG ── */}
        <section
          id="articles"
          className="py-16 px-6 md:px-16 max-w-7xl mx-auto"
        >
          <div className="flex justify-between items-center mb-12">
            <motion.h2
              {...slideLeft()}
              style={{ fontFamily: "'Playfair Display',serif" }}
              className="text-2xl md:text-3xl font-black uppercase leading-[1.2] max-w-xs md:max-w-none"
            >
              Latest News From
              <br className="md:hidden" /> The IT Industry
            </motion.h2>
            <motion.a
              {...fade(0.1)}
              href="#"
              className="hidden sm:flex items-center gap-2 bg-[#E53E3E] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-red-600 transition-colors"
            >
              Browse All <FaArrowRight />
            </motion.a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ARTICLES.map((a, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.1)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 card-lift"
              >
                <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                  <img
                    src={a.img}
                    alt={a.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-[10px] text-gray-500 font-semibold mb-3">
                    {a.date} &bull; 5 min read
                  </div>
                  <h3 className="text-base font-black mb-4 leading-snug group-hover:text-[#E53E3E] transition-colors">
                    {a.title}
                  </h3>
                  <span className="text-xs font-bold text-gray-800 flex items-center gap-2 group-hover:text-[#E53E3E] transition-colors">
                    Read More <FaArrowRight className="text-[10px]" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── BOTTOM DOUBLE MARQUEE & FOOTER ── */}
        <div
          className="relative mt-20 overflow-hidden"
          style={{ margin: "0 -2rem" }}
        >
          <div className="relative py-12">
            {/* Black ribbon (behind) */}
            <div
              className="absolute inset-0 top-1/2 -translate-y-1/2 bg-[#111] py-4 w-full"
              style={{ transform: "rotate(2deg) scale(1.1)" }}
            >
              <div className="marquee-track-reverse">
                {[...techs, ...techs, ...techs, ...techs, ...techs].map(
                  (t, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-6 px-6 opacity-40"
                    >
                      <div className="w-2 h-2 bg-gray-500 rounded-full flex-shrink-0" />
                      <span className="text-gray-400 font-bold text-lg md:text-xl tracking-wider">
                        {t}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
            {/* Pink ribbon (front) */}
            <div
              className="relative bg-[#C53030] py-4 w-full"
              style={{ transform: "rotate(-2deg) scale(1.1)" }}
            >
              <div className="marquee-track">
                {[...techs, ...techs, ...techs, ...techs, ...techs].map(
                  (t, i) => (
                    <div key={i} className="flex items-center gap-6 px-6">
                      <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
                      <span className="text-white font-bold text-lg md:text-xl tracking-wider">
                        {t}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <section id="contact" className="py-24 px-6 md:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2
              {...slideLeft()}
                style={{ fontFamily: "'Playfair Display',serif" }}
                className="text-3xl md:text-4xl font-black uppercase mb-3"
              >
                Let's Work Together
              </motion.h2>
              <motion.p {...slideRight(0.1)} className="text-gray-500 text-sm">
                Reach out via message, book a call, or find quick answers below.
              </motion.p>
            </div>

            {/* Contact Cards row */}
            <motion.div
              {...fade(0.15)}
              className="grid sm:grid-cols-3 gap-5 mb-12"
            >
              {[
                {
                  emoji: "✉️",
                  title: "Email Me",
                  detail: "mayurnish18@gmail.com",
                  href: "mailto:mayurnish18@gmail.com",
                  sub: "Reply within 24h",
                },
                {
                  emoji: "💼",
                  title: "LinkedIn",
                  detail: "linkedin.com/in/mayur-nishad-bb0751236",
                  href:
                    config?.socials?.linkedin ||
                    "https://www.linkedin.com/in/mayur-nishad-bb0751236/?skipRedirect=true",
                  sub: "Connect professionally",
                },
                {
                  emoji: "🐙",
                  title: "GitHub",
                  detail: "github.com/mayur0018",
                  href:
                    config?.socials?.github || "https://github.com/mayur0018",
                  sub: "See my code",
                },
              ].map((c, i) => (
                <motion.a
                  key={i}
                  {...fade(i * 0.1)}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white rounded-2xl p-6 border border-gray-100 card-lift flex flex-col items-center text-center hover:border-[#C53030]/30 transition-all group"
                >
                  <div className="text-3xl mb-3">{c.emoji}</div>
                  <h4 className="font-black text-sm text-[#111] mb-1">
                    {c.title}
                  </h4>
                  <p className="text-xs text-[#C53030] font-semibold break-all">
                    {c.detail}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{c.sub}</p>
                </motion.a>
              ))}
            </motion.div>

            {/* Contact form */}
            <motion.div
              {...scaleUp(0.2)}
              className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 mb-8"
            >
              <div className="grid md:grid-cols-2 gap-10">
                {/* Form */}
                <div>
                  <h3
                    style={{ fontFamily: "'Playfair Display',serif" }}
                    className="text-xl font-black mb-6"
                  >
                    Send a Message
                  </h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const fd = new FormData(e.target as HTMLFormElement);
                      const name = fd.get("name") as string;
                      const email = fd.get("email") as string;
                      const msg = fd.get("message") as string;
                      if (!name || !email || !msg) return;
                      window.location.href = `mailto:mayurnish18@gmail.com?subject=${encodeURIComponent(`Portfolio contact from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`)}`;
                    }}
                    className="flex flex-col gap-4"
                  >
                    <input
                      name="name"
                      required
                      placeholder="Your Name"
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C53030] transition-colors"
                    />
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="Email Address"
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C53030] transition-colors"
                    />
                    <textarea
                      name="message"
                      required
                      placeholder="Your message..."
                      rows={4}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C53030] transition-colors resize-none"
                    />
                    <button
                      type="submit"
                      className="bg-[#111] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-[#C53030] transition-colors w-fit"
                    >
                      Send Message
                    </button>
                  </form>
                </div>

                {/* FAQ */}
                <div>
                  <h3
                    style={{ fontFamily: "'Playfair Display',serif" }}
                    className="text-xl font-black mb-6"
                  >
                    Frequently Asked
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        q: "What is your tech stack?",
                        a: "React, Next.js, TypeScript, Node.js, MongoDB, and Tailwind CSS.",
                      },
                      {
                        q: "Are you available for freelance?",
                        a: "Yes! I'm open to freelance, contract, and full-time roles.",
                      },
                      {
                        q: "How long does a project take?",
                        a: "Landing pages: 1–2 weeks. Full apps: 4–8 weeks depending on scope.",
                      },
                      {
                        q: "Do you work internationally?",
                        a: "Absolutely. I work with clients globally and am flexible with time zones.",
                      },
                    ].map((item, i) => (
                      <details
                        key={i}
                        className="group border border-gray-100 rounded-xl overflow-hidden"
                      >
                        <summary className="flex items-center justify-between px-5 py-3.5 cursor-pointer list-none text-sm font-bold text-[#111] hover:bg-gray-50">
                          {item.q}
                          <span className="text-gray-400 group-open:rotate-180 transition-transform duration-200 text-xs">
                            ▼
                          </span>
                        </summary>
                        <p className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100">
                          {item.a}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div {...fade(0.3)} className="text-center">
              <div className="flex justify-center gap-4 mb-6">
                {[
                  {
                    icon: <FaGithub />,
                    href:
                      config?.socials?.github || "https://github.com/mayur0018",
                  },
                  {
                    icon: <FaLinkedin />,
                    href: config?.socials?.linkedin || "https://www.linkedin.com/in/mayur-nishad-bb0751236/?skipRedirect=true"
                  },
                  {
                    icon: <FaTwitter />,
                    href: config?.socials?.twitter || "#",
                  },
                  { icon: <FaGlobe />, href: "#" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-[#111] hover:text-white hover:border-[#111] transition-all"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
              <div className="text-gray-400 text-xs font-medium">
                © 2026 {config?.siteName || "Mayur Nishad"}. All Rights
                Reserved.
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
