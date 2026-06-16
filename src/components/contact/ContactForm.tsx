"use client";
import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormInput from "./FormInput";
import SocialButton from "./SocialButton";
import ContactInfo from "./ContactInfo";
import {
  FaEnvelope,
  FaCalendarAlt,
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp,
  FaClock,
  FaVideo,
  FaPhoneAlt,
  FaCheck,
} from "react-icons/fa";

/* ─────────────────── Types ─────────────────────── */
type ContactTab = "message" | "schedule" | "faq";

/* ─────────────────── FAQ Data ──────────────────── */
const FAQS = [
  {
    q: "What technologies do you specialize in?",
    a: "I specialize in React.js, Next.js, TypeScript, Node.js, MongoDB, and Tailwind CSS. I build full-stack web applications with a strong focus on performance and UI/UX.",
  },
  {
    q: "How long does a typical project take?",
    a: "It depends on scope. A landing page takes 1–2 weeks, a full web app typically takes 4–8 weeks. After our initial discussion, I'll provide a detailed timeline estimate.",
  },
  {
    q: "Do you offer freelance or contract work?",
    a: "Yes! I'm open to freelance projects, contract engagements, and full-time opportunities. Feel free to reach out to discuss your requirements.",
  },
  {
    q: "What is your preferred communication method?",
    a: "I prefer email for formal communication and Discord/WhatsApp for quick updates. I aim to respond within 24 hours on business days.",
  },
  {
    q: "Do you work with international clients?",
    a: "Absolutely! I work with clients globally. I'm flexible with time zones and can adjust meeting times to accommodate different regions.",
  },
  {
    q: "Can you maintain or update an existing project?",
    a: "Yes, I handle bug fixes, feature additions, performance optimizations, and tech stack upgrades for existing codebases. Share your project and I'll assess the complexity.",
  },
];

/* ─────────────────── Schedule slots ─────────────── */
const SCHEDULE_TYPES = [
  {
    id: "quick-call",
    label: "Quick Call",
    duration: "15 min",
    icon: <FaPhoneAlt />,
    color: "#38A169",
    desc: "A brief intro call to discuss your project idea or collaboration opportunity.",
  },
  {
    id: "discovery",
    label: "Discovery Call",
    duration: "30 min",
    icon: <FaVideo />,
    color: "#3182CE",
    desc: "Deep-dive into your project requirements, timeline, and budget.",
  },
  {
    id: "code-review",
    label: "Code Review",
    duration: "60 min",
    icon: <FaClock />,
    color: "#805AD5",
    desc: "Walk through your codebase together and identify improvements.",
  },
];

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

/* ─────────────────── Animations ────────────────── */
const tabContentVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

/* ─────────────────── Message Tab ────────────────── */
function MessageTab() {
  const [formData, setFormData] = useState({
    name: "", email: "", website: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const updateField = (field: keyof typeof formData) => (value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!name || !email || !message) { setStatus("error"); return; }
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nWebsite: ${formData.website}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:mayurnish18@gmail.com?subject=${subject}&body=${body}`;
    setStatus("success");
  };

  return (
    <motion.div
      variants={tabContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-wrap gap-10 justify-between"
    >
      {/* Form */}
      <section className="flex flex-col flex-1 min-w-[280px]">
        <motion.form
          className="flex flex-col w-full gap-1"
          onSubmit={handleSubmit}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <FormInput placeholder="Your name" value={formData.name} onChange={updateField("name")} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FormInput placeholder="Email" type="email" value={formData.email} onChange={updateField("email")} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FormInput placeholder="Your website (optional)" type="url" value={formData.website} onChange={updateField("website")} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FormInput placeholder="How can I help you?*" value={formData.message} onChange={updateField("message")} multiline />
          </motion.div>

          {status === "error" && (
            <p className="text-red-400 text-xs mt-1">Please fill in all required fields.</p>
          )}

          <motion.div className="mt-6 flex gap-4 items-center" variants={itemVariants}>
            <button
              type="submit"
              className="px-8 py-3 bg-red-700 hover:bg-red-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-red-700/20 active:scale-95"
            >
              Send Message
            </button>
            {status === "success" && (
              <span className="flex items-center gap-1.5 text-green-400 text-sm font-medium">
                <FaCheck /> Sent successfully!
              </span>
            )}
          </motion.div>
        </motion.form>
      </section>

      {/* Contact Info */}
      <section className="flex flex-col flex-1 min-w-[260px] gap-8">
        <ContactInfo />
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-bold text-slate-200">Social Links</h3>
          <div className="flex flex-wrap gap-3">
            <SocialButton company="github" />
            <SocialButton company="linkedin" />
            <SocialButton company="twitter" />
          </div>
        </div>
      </section>
    </motion.div>
  );
}

/* ─────────────────── Schedule Tab ───────────────── */
function ScheduleTab() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const handleBook = () => {
    if (!selectedType || !selectedSlot) return;
    setBooked(true);
  };

  if (booked) {
    return (
      <motion.div
        key="booked"
        variants={tabContentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="text-center py-12"
      >
        <div className="w-20 h-20 rounded-full bg-green-700/20 border-2 border-green-500/40 flex items-center justify-center mx-auto mb-4">
          <FaCheck className="text-green-400 text-3xl" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Meeting Requested!</h3>
        <p className="text-slate-400 text-sm max-w-sm mx-auto">
          I'll confirm your <strong className="text-slate-200">{selectedType}</strong> at{" "}
          <strong className="text-slate-200">{selectedSlot} IST</strong> shortly via email.
        </p>
        <button
          onClick={() => { setBooked(false); setSelectedType(null); setSelectedSlot(null); }}
          className="mt-6 text-xs text-red-400 hover:text-red-300 underline"
        >
          Schedule another meeting
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="schedule-form"
      variants={tabContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      {/* Step 1 – Pick type */}
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
          1. Choose meeting type
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          {SCHEDULE_TYPES.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedType(s.label)}
              className={`rounded-xl p-4 text-left border transition-all duration-200 ${
                selectedType === s.label
                  ? "border-red-500/60 bg-red-700/10"
                  : "border-white/5 bg-white/[0.03] hover:border-white/15"
              }`}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm mb-2"
                style={{ background: s.color + "25", color: s.color }}
              >
                {s.icon}
              </div>
              <p className="text-sm font-bold text-white">{s.label}</p>
              <p className="text-xs text-slate-400">{s.duration}</p>
              <p className="text-xs text-slate-500 mt-1 leading-snug">{s.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2 – Pick time */}
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
          2. Pick a time slot (IST)
        </p>
        <div className="flex flex-wrap gap-2">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 ${
                selectedSlot === slot
                  ? "bg-red-700 border-red-500 text-white"
                  : "border-white/10 text-slate-400 hover:border-white/25 hover:text-white"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Book button */}
      <button
        onClick={handleBook}
        disabled={!selectedType || !selectedSlot}
        className="px-8 py-3 bg-red-700 hover:bg-red-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-red-700/20 active:scale-95"
      >
        Request Meeting
      </button>
    </motion.div>
  );
}

/* ─────────────────── FAQ Tab ────────────────────── */
function FAQTab() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.div
      key="faq"
      variants={tabContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-3"
    >
      {FAQS.map((item, i) => (
        <div
          key={i}
          className="border border-white/5 rounded-xl overflow-hidden transition-colors hover:border-white/10"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
          >
            <span className="text-sm font-semibold text-slate-200 pr-4">{item.q}</span>
            <span className="text-slate-400 flex-shrink-0">
              {openIndex === i ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                key="answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-4 text-sm text-slate-400 leading-relaxed border-t border-white/5">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
}

/* ─────────────────── Main Export ────────────────── */
export function ContactForm() {
  const [activeTab, setActiveTab] = useState<ContactTab>("message");

  const tabs: { id: ContactTab; label: string; icon: React.ReactNode }[] = [
    { id: "message", label: "Send a Message", icon: <FaEnvelope /> },
    { id: "schedule", label: "Schedule a Call", icon: <FaCalendarAlt /> },
    { id: "faq", label: "FAQ", icon: <FaQuestionCircle /> },
  ];

  return (
    <motion.main
      id="contact"
      className="flex flex-col items-center px-4 py-8 w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full glass-panel rounded-2xl border border-white/5 shadow-xl max-w-4xl overflow-hidden">
        {/* Header */}
        <header className="px-6 md:px-10 pt-8 pb-0 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100">
            Let's <span className="text-red-400">Connect</span>
          </h2>
          <p className="text-slate-400 mt-2 text-sm mb-6">
            Choose how you'd like to get in touch
          </p>
        </header>

        {/* Tabs */}
        <div className="flex border-b border-white/5 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-5 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
                activeTab === tab.id
                  ? "text-red-400"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="contact-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-red-700"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 md:p-10">
          <AnimatePresence mode="wait">
            {activeTab === "message" && <MessageTab key="message" />}
            {activeTab === "schedule" && <ScheduleTab key="schedule" />}
            {activeTab === "faq" && <FAQTab key="faq" />}
          </AnimatePresence>
        </div>
      </div>
    </motion.main>
  );
}

export default ContactForm;
