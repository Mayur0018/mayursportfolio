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
  FaRocket,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import api from "./api/api";
import heroImg from "./assets/heroimg.png";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
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
    title: "Portfolio Website",
    description: "Personal portfolio built with Next.js and Tailwind CSS.",
    tech: ["Next.js"],
    imageSrc:
      "https://images.unsplash.com/photo-1507238692062-54e7f3299718?w=700&q=80",
  },
  {
    title: "Task Manager App",
    description: "A task management app with modern UI and drag & drop.",
    tech: ["React.js"],
    imageSrc:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80",
  },
  {
    title: "E-Commerce Store",
    description: "Full featured ecommerce platform with cart and payments.",
    tech: ["Next.js"],
    imageSrc:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80",
  },
  {
    title: "Blog Website",
    description: "A modern blog website to share articles and thoughts.",
    tech: ["Next.js"],
    imageSrc:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=700&q=80",
  },
  {
    title: "Weather App",
    description: "Real-time weather app with clean UI and API integration.",
    tech: ["JavaScript"],
    imageSrc:
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=700&q=80",
  },
  {
    title: "Expense Tracker",
    description: "Track income and expenses with charts and insights.",
    tech: ["React.js"],
    imageSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80",
  },
];

const DEFAULT_EXPERIENCE = [
  {
    role: "Research",
    description:
      "I start by learning and researching based on ideas to find out the best solution for the users, goals, products, and requirements.",
  },
  {
    role: "Planning",
    description:
      "Then I start to plan and structure the project process and budget based on the discovery phase before start the development.",
  },
  {
    role: "Development",
    description:
      "After I completed all the processes, goals, and scopes, I started to do the development process such as creating basic codes and programming.",
  },
  {
    role: "Testing & Launch",
    description: "Finally testing the project and launch it for the users.",
  },
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
  const { data: experienceData } = useQuery({
    queryKey: ["experience"],
    queryFn: async () => (await api.get("/experience")).data,
  });

  const projects =
    projectsData && projectsData.length > 0 ? projectsData : DEFAULT_PROJECTS;
  const experiences =
    experienceData && experienceData.length > 0
      ? experienceData
      : DEFAULT_EXPERIENCE;
  const techs =
    skillsData && skillsData.length > 0
      ? skillsData.map((s: any) => s.name)
      : DEFAULT_TECHS;

  return (
    <>
      {/* 3D Rocket Loader */}
      {loading && <RocketLoader onDone={() => setLoading(false)} />}


      <div
        className="bg-[#F7F4EF] text-[#111] overflow-x-hidden"
        style={{ fontFamily: "'Inter',sans-serif" }}
      >
      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-6 md:px-16 py-6"
      >
        <span
          style={{ fontFamily: "'Playfair Display',serif" }}
          className="text-3xl md:text-4xl font-black tracking-tight"
        >
          {config?.siteName || "MN."}
        </span>
        <div className="hidden md:flex items-center gap-10 text-sm font-semibold">
          {["Home", "About", "Projects", "Articles", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="nav-link hover:text-[#2D9CFF] transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="hidden sm:flex items-center bg-[#111] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#2D9CFF] transition-colors duration-300"
        >
          Let's Connect
        </a>
      </motion.nav>

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
                src={heroImg}
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
              Developer &<br />
              Designer
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
                className="flex items-center gap-2 bg-[#2D9CFF] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-blue-600 transition-colors"
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
            <motion.div {...fade(0.4)} className="flex items-center gap-6 pt-2">
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
                    "https://linkedin.com/in/mayur-nishad",
                },
                { icon: <FaTwitter />, href: config?.socials?.twitter || "#" },
                { icon: <FaGlobe />, href: "#" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xl text-gray-800 hover:text-[#2D9CFF] transition-colors"
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
            className="relative bg-[#FF4F6D] py-4 w-full"
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
          {...fade()}
          style={{ fontFamily: "'Playfair Display',serif" }}
          className="text-3xl md:text-4xl font-black mb-6 uppercase"
        >
          About Me
        </motion.h2>
        <motion.p
          {...fade(0.1)}
          className="text-gray-700 max-w-2xl text-sm md:text-base leading-relaxed mb-10"
        >
          I am a passionate Frontend Developer who loves building beautiful and
          functional web experiences. I enjoy turning ideas into reality using
          modern technologies. Dedicated to writing clean code and delivering
          high-quality solutions that solve real-world problems.
        </motion.p>

        {/* Skill highlights */}
        <motion.div
          {...fade(0.2)}
          className="flex flex-wrap gap-4 md:gap-8 mb-12"
        >
          {[
            {
              icon: <FaShieldAlt className="text-[#FF4F6D] text-lg" />,
              t: "Clean Code",
            },
            {
              icon: <FaDesktop className="text-[#FF4F6D] text-lg" />,
              t: "Responsive Design",
            },
            {
              icon: <FaLightbulb className="text-[#FF4F6D] text-lg" />,
              t: "Problem Solver",
            },
            {
              icon: <FaTachometerAlt className="text-[#FF4F6D] text-lg" />,
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
              icon: <FaFolder className="text-[#2D9CFF]" />,
              bg: "bg-blue-50",
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
              icon: <FaEye className="text-purple-500" />,
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
            {...fade()}
            style={{ fontFamily: "'Playfair Display',serif" }}
            className="text-3xl md:text-4xl font-black uppercase text-center mb-16"
          >
            My Working Process
          </motion.h2>

          <div className="relative">
            <div className="hidden md:block absolute left-[30%] top-2 bottom-2 w-px bg-gray-800" />
            <div className="space-y-12 md:space-y-16">
              {experiences.map((s: any, i: number) => (
                <motion.div
                  key={i}
                  {...fade(i * 0.1)}
                  className="flex flex-col md:flex-row gap-6 md:gap-0 relative group"
                >
                  {/* Left Column - Number & Title */}
                  <div className="md:w-[30%] flex items-start md:pr-10 relative">
                    <span className="text-xs font-bold text-[#2D9CFF] mr-3 mt-1">
                      0{i + 1}.
                    </span>
                    <h3
                      className={`text-xl md:text-2xl font-bold ${i === 0 ? "text-[#2D9CFF]" : "text-white"} group-hover:text-[#2D9CFF] transition-colors`}
                    >
                      {s.role || s.title || `Step ${i + 1}`}
                    </h3>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden md:flex absolute left-[30%] -ml-[4px] top-2 w-2 h-2 rounded-full bg-white group-hover:bg-[#2D9CFF] group-hover:scale-150 transition-all z-10" />

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

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.h2
            {...fade()}
            style={{ fontFamily: "'Playfair Display',serif" }}
            className="text-3xl md:text-4xl font-black uppercase leading-[1.2] max-w-xl"
          >
            Take A Look At My <br className="hidden md:block" /> Recent Project
          </motion.h2>
          <motion.a
            {...fade(0.1)}
            href="#"
            className="flex items-center gap-2 bg-[#2D9CFF] text-white px-8 py-3.5 rounded-full text-sm font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
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
                <span className="inline-flex items-center gap-2 text-sm font-black text-[#111] group-hover:text-[#2D9CFF] transition-colors">
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
      <section className="bg-[#FF4F6D] py-12 px-6 border-y-2 border-[#111]">
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
              <div className="text-4xl md:text-5xl font-black mb-1">{s.v}</div>
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
          {...fade()}
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
      <section id="articles" className="py-16 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <motion.h2
            {...fade()}
            style={{ fontFamily: "'Playfair Display',serif" }}
            className="text-2xl md:text-3xl font-black uppercase leading-[1.2] max-w-xs md:max-w-none"
          >
            Latest News From
            <br className="md:hidden" /> The IT Industry
          </motion.h2>
          <motion.a
            {...fade(0.1)}
            href="#"
            className="hidden sm:flex items-center gap-2 bg-[#2D9CFF] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-600 transition-colors"
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
                <h3 className="text-base font-black mb-4 leading-snug group-hover:text-[#2D9CFF] transition-colors">
                  {a.title}
                </h3>
                <span className="text-xs font-bold text-gray-800 flex items-center gap-2 group-hover:text-[#2D9CFF] transition-colors">
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
            className="relative bg-[#FF4F6D] py-4 w-full"
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

      <section id="contact" className="pt-24 pb-12 px-6 md:px-16 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            {...fade()}
            style={{ fontFamily: "'Playfair Display',serif" }}
            className="text-2xl md:text-3xl font-black uppercase mb-4"
          >
            Interested In Working Together?
          </motion.h2>
          <motion.p {...fade(0.1)} className="text-gray-500 text-sm mb-2">
            Let's build something amazing!
          </motion.p>
          <motion.a
            {...fade(0.2)}
            href="mailto:mayurnishad.dev@gmail.com"
            className="inline-block text-lg md:text-xl font-bold text-[#FF4F6D] hover:text-[#111] transition-colors mb-8"
          >
            mayurnishad.dev@gmail.com
          </motion.a>
          <motion.div
            {...fade(0.3)}
            className="flex justify-center gap-4 mb-12"
          >
            {[
              {
                icon: <FaGithub />,
                href: config?.socials?.github || "https://github.com/mayur0018",
              },
              {
                icon: <FaLinkedin />,
                href:
                  config?.socials?.linkedin ||
                  "https://linkedin.com/in/mayur-nishad",
              },
              { icon: <FaTwitter />, href: config?.socials?.twitter || "#" },
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
          </motion.div>
          <div className="text-gray-400 text-xs font-medium">
            © 2026 {config?.siteName || "Mayur Nishad"}. All Rights Reserved.
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
