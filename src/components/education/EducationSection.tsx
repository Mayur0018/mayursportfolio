import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGraduationCap,
  FaCertificate,
  FaBook,
  FaMedal,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";

/* ─── Types ─────────────────────────────────────── */
type Tab = "degrees" | "certifications" | "courses";

/* ─── Real Data from LinkedIn ────────────────────── */
const DEGREES = [
  {
    degree: "Master of Computer Applications",
    field: "MCA – Computer Applications",
    institution: "Gujarat Technological University (GTU)",
    location: "Gujarat, India",
    period: "Sep 2023 – Jul 2025",
    grade: "Pursuing",
    status: "Completed",
    color: "#E53E3E",
    highlights: ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "MongoDB", "PHP", "SQL", "Python", "DBMS", "OS", "DSA"],
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/GTU_logo.png/180px-GTU_logo.png",
  },
  {
    degree: "Bachelor of Computer Applications",
    field: "BCA – Computer Engineering",
    institution: "Gujarat University",
    location: "Gujarat, India",
    period: "Sep 2020 – Apr 2023",
    grade: "Completed",
    status: "Completed",
    color: "#3182CE",
    highlights: ["PHP", "SQL", "HTML5", "CSS3", "JavaScript", "C++"],
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Gujarat_University_Logo.png/180px-Gujarat_University_Logo.png",
  },
];

const CERTIFICATIONS = [
  {
    name: "Complete Web Development Course",
    issuer: "Udemy",
    date: "2024",
    expires: "No Expiry",
    credentialId: "Udemy Course Completion Certificate",
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "MongoDB"],
    color: "#A435F0",
    logo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg",
    logoFallback: "https://ui-avatars.com/api/?name=Udemy&background=A435F0&color=fff&bold=true",
    link: "#",
  },
  {
    name: "Figma UI UX Design Essentials",
    issuer: "Udemy",
    date: "Jul 2025",
    expires: "No Expiry",
    credentialId: "Udemy Course Completion Certificate",
    skills: ["Figma", "UI Design", "UX Design", "Prototyping", "Wireframing"],
    color: "#F24E1E",
    logo: "https://ui-avatars.com/api/?name=Figma&background=F24E1E&color=fff&bold=true",
    link: "#",
  },
  {
    name: "Node Certification Test – YouTube Course",
    issuer: "Complete Coding by Prashant Sir",
    date: "May 2025",
    expires: "No Expiry",
    credentialId: "KgCoding Certificate",
    skills: ["Node.js", "Express.js", "REST APIs", "Backend Dev"],
    color: "#68A063",
    logo: "https://ui-avatars.com/api/?name=Node&background=68A063&color=fff&bold=true",
    link: "#",
  },
  {
    name: "React Hooks Crash Course",
    issuer: "GreatStack",
    date: "Mar 2025",
    expires: "No Expiry",
    credentialId: "rhkscQt1W65lVXbnYMHelB0M9kqFWTL2",
    skills: ["React", "React Hooks", "useState", "useEffect", "useContext"],
    color: "#61DAFB",
    logo: "https://ui-avatars.com/api/?name=GS&background=20232A&color=61DAFB&bold=true",
    link: "https://greatstack.dev",
  },
  {
    name: "JavaScript Fundamentals",
    issuer: "GreatStack",
    date: "Mar 2025",
    expires: "No Expiry",
    credentialId: "jsbscQt1W65lVXbnYMHelB0M9kqFWTL2",
    skills: ["JavaScript", "ES6+", "DOM", "Async/Await", "Closures"],
    color: "#F7DF1E",
    logo: "https://ui-avatars.com/api/?name=JS&background=F7DF1E&color=111&bold=true",
    link: "https://greatstack.dev",
  },
  {
    name: "Namaste JavaScript",
    issuer: "NamasteDev.com",
    date: "Mar 2025",
    expires: "No Expiry",
    credentialId: "EF8048A61E2BE00AE52866C2848",
    skills: ["JavaScript", "Event Loop", "Closures", "Prototypes", "Scope Chain"],
    color: "#FF6B35",
    logo: "https://ui-avatars.com/api/?name=NJ&background=FF6B35&color=fff&bold=true",
    link: "https://namastedev.com",
  },
  {
    name: "React & Redux Certification Test",
    issuer: "Complete Coding by Prashant Sir",
    date: "Mar 2024",
    expires: "No Expiry",
    credentialId: "YVFA96AN",
    skills: ["React", "Redux", "RTK Query", "State Management"],
    color: "#764ABC",
    logo: "https://ui-avatars.com/api/?name=Redux&background=764ABC&color=fff&bold=true",
    link: "#",
  },
];

const COURSES = [
  {
    name: "Complete Web Development Bootcamp",
    platform: "Udemy",
    instructor: "Full Stack Curriculum",
    duration: "60+ hours",
    status: "Completed",
    topics: ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "MongoDB"],
    color: "#A435F0",
    logo: "https://ui-avatars.com/api/?name=Udemy&background=A435F0&color=fff&bold=true",
    progress: 100,
  },
  {
    name: "Figma UI UX Design Essentials",
    platform: "Udemy",
    instructor: "Design Curriculum",
    duration: "15+ hours",
    status: "Completed",
    topics: ["Figma", "UI Design", "UX Research", "Prototyping"],
    color: "#F24E1E",
    logo: "https://ui-avatars.com/api/?name=Figma&background=F24E1E&color=fff&bold=true",
    progress: 100,
  },
  {
    name: "Namaste JavaScript (Deep Dive)",
    platform: "NamasteDev.com",
    instructor: "Akshay Saini",
    duration: "20+ hours",
    status: "Completed",
    topics: ["JavaScript", "Event Loop", "Closures", "Promises", "Async"],
    color: "#FF6B35",
    logo: "https://ui-avatars.com/api/?name=NJ&background=FF6B35&color=fff&bold=true",
    progress: 100,
  },
  {
    name: "React Hooks & Redux Mastery",
    platform: "GreatStack + YouTube",
    instructor: "GreatStack / Prashant Sir",
    duration: "25+ hours",
    status: "Completed",
    topics: ["React Hooks", "Redux Toolkit", "RTK Query", "Context API"],
    color: "#61DAFB",
    logo: "https://ui-avatars.com/api/?name=React&background=20232A&color=61DAFB&bold=true",
    progress: 100,
  },
];

/* ─── Animations ─────────────────────────────────── */
const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.08 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

/* ─── Degree Card ────────────────────────────────── */
function DegreeCard({ d }: { d: (typeof DEGREES)[0] }) {
  return (
    <motion.div
      variants={cardVariants}
      className="glass rounded-2xl p-5 border border-white/5 flex flex-col sm:flex-row gap-5 hover:border-red-500/30 transition-all duration-300 group"
    >
      <div className="flex-shrink-0">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center border-2 overflow-hidden bg-white"
          style={{ borderColor: d.color + "60" }}
        >
          <img
            src={d.logo}
            alt={d.institution}
            className="w-12 h-12 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(d.institution.substring(0, 2))}&background=${d.color.replace("#", "")}&color=fff&bold=true`;
            }}
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-bold text-white text-base leading-tight">{d.degree}</h3>
            <p className="text-sm font-semibold mt-0.5" style={{ color: d.color }}>
              {d.field}
            </p>
          </div>
          <span
            className="text-xs font-bold px-3 py-1 rounded-full flex-shrink-0"
            style={{ background: d.color + "20", color: d.color }}
          >
            {d.status}
          </span>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-slate-400 mb-3">
          <span className="flex items-center gap-1.5">
            <FaMapMarkerAlt style={{ color: d.color }} /> {d.institution} · {d.location}
          </span>
          <span className="flex items-center gap-1.5">
            <FaCalendarAlt style={{ color: d.color }} /> {d.period}
          </span>
          <span className="flex items-center gap-1.5">
            <FaMedal style={{ color: d.color }} /> {d.grade}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {d.highlights.map((h) => (
            <span
              key={h}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-lg"
              style={{ background: d.color + "15", color: d.color + "ee" }}
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Cert Card ──────────────────────────────────── */
function CertCard({ c }: { c: (typeof CERTIFICATIONS)[0] }) {
  return (
    <motion.div
      variants={cardVariants}
      className="glass rounded-2xl p-5 border border-white/5 hover:border-white/20 transition-all duration-300"
    >
      <div className="flex items-start gap-4 mb-4">
        <img
          src={c.logo}
          alt={c.issuer}
          className="w-12 h-12 rounded-xl object-contain border-2 border-white/10 bg-white/5 p-1"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white text-sm leading-tight">{c.name}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{c.issuer}</p>
        </div>
        {c.link !== "#" && (
          <a
            href={c.link}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors flex-shrink-0"
          >
            <FaExternalLinkAlt size={12} />
          </a>
        )}
      </div>
      <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-3">
        <span className="flex items-center gap-1">
          <FaCalendarAlt /> Issued {c.date}
        </span>
        <span className="flex items-center gap-1">
          <FaCertificate style={{ color: "#F6AD55" }} /> {c.expires}
        </span>
      </div>
      {c.credentialId && c.credentialId.length < 50 && (
        <p className="text-[10px] text-slate-600 mb-3 font-mono truncate">ID: {c.credentialId}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {c.skills.map((s) => (
          <span
            key={s}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/5 text-slate-300"
          >
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Course Card ────────────────────────────────── */
function CourseCard({ c }: { c: (typeof COURSES)[0] }) {
  return (
    <motion.div
      variants={cardVariants}
      className="glass rounded-2xl p-5 border border-white/5 hover:border-white/20 transition-all duration-300"
    >
      <div className="flex items-start gap-4 mb-3">
        <img
          src={c.logo}
          alt={c.platform}
          className="w-12 h-12 rounded-xl object-contain border-2 border-white/10 bg-white/5 p-1"
        />
        <div className="flex-1">
          <h3 className="font-bold text-white text-sm leading-tight">{c.name}</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {c.platform} · {c.instructor}
          </p>
        </div>
        <span
          className="text-[11px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
          style={{
            background: c.status === "Completed" ? "#22543D30" : "#2A4365",
            color: c.status === "Completed" ? "#68D391" : "#90CDF4",
          }}
        >
          {c.status}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Progress</span>
          <span style={{ color: c.color }}>{c.progress}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${c.progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${c.color}, ${c.color}99)` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-3">
        <span className="flex items-center gap-1">
          <FaBook style={{ color: c.color }} /> {c.duration}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {c.topics.map((t) => (
          <span
            key={t}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg"
            style={{ background: c.color + "18", color: c.color + "cc" }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Main Component ──────────────────────────────── */
export default function EducationSection() {
  const [activeTab, setActiveTab] = useState<Tab>("degrees");

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    { id: "degrees", label: "Degrees", icon: <FaGraduationCap />, count: DEGREES.length },
    { id: "certifications", label: "Certifications", icon: <FaCertificate />, count: CERTIFICATIONS.length },
    { id: "courses", label: "Courses", icon: <FaBook />, count: COURSES.length },
  ];

  return (
    <div id="education" className="glass rounded-2xl border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-red-700/20 flex items-center justify-center text-red-400">
            <FaGraduationCap />
          </div>
          <h2 className="text-xl font-bold text-white">Education</h2>
        </div>
        <p className="text-sm text-slate-400 ml-11">
          Academic background, certifications & ongoing learning
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2 px-5 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
              activeTab === tab.id ? "text-red-400" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab.icon}
            {tab.label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-md font-bold transition-colors ${
                activeTab === tab.id ? "bg-red-700/30 text-red-300" : "bg-white/5 text-slate-500"
              }`}
            >
              {tab.count}
            </span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="edu-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-red-700"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-5">
        <AnimatePresence mode="wait">
          {activeTab === "degrees" && (
            <motion.div
              key="degrees"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4"
            >
              {DEGREES.map((d) => (
                <DegreeCard key={d.degree} d={d} />
              ))}
            </motion.div>
          )}

          {activeTab === "certifications" && (
            <motion.div
              key="certifications"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid sm:grid-cols-2 gap-4"
            >
              {CERTIFICATIONS.map((c) => (
                <CertCard key={c.name} c={c} />
              ))}
            </motion.div>
          )}

          {activeTab === "courses" && (
            <motion.div
              key="courses"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid sm:grid-cols-2 gap-4"
            >
              {COURSES.map((c) => (
                <CourseCard key={c.name} c={c} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
