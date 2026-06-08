"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import MySkills from "../components/skills/MySkills";
import ExperienceSection from "../components/experience/ExperienceData";
import AboutMe from "../components/about/AboutMe";
import ProjectsSection from "../components/Projects/projectsData";
import ContactForm from "../components/contact/ContactForm";
import Footer from "../components/footer/Footer";
import Testimonial from "../components/testimonial/Testimonial";
import CursorGlow from "../components/background/CursorGlow";
import GradientBlobs from "../components/background/GradientBlobs";
import DotGrid from "../components/background/DotGrid";
import FloatingParticles from "../components/background/FloatingParticles";
import { FaHome, FaUser, FaBriefcase, FaCode, FaBell, FaSearch, FaEllipsisH, FaLinkedin, FaGithub, FaTwitter, FaCamera, FaVideo, FaCalendar, FaPen, FaCommentAlt } from "react-icons/fa";

export default function Portfolio() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const userInfo = useAuthStore((state) => state.userInfo);
  const logout = useAuthStore((state) => state.logout);

  const sections = [
    { id: "home", name: "About Me", icon: <FaUser /> },
    { id: "experience", name: "Experience", icon: <FaBriefcase /> },
    { id: "skills", name: "Skills", icon: <FaCode /> },
    { id: "project", name: "Projects", icon: <FaHome /> },
    { id: "testimonial", name: "Testimonials", icon: <FaBell /> },
    { id: "contact", name: "Contact", icon: <FaUser /> },
  ];

  const filteredSections = sections.filter(section =>
    section.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(e.target.value.length > 0);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setShowSearchResults(false);
      setSearchQuery("");
    }
  };
  return (
    <div className="min-h-screen bg-[#07111F] text-slate-200 font-sans selection:bg-blue-500/30 relative">
      {/* Premium Background Effects */}
      <DotGrid />
      <GradientBlobs />
      <FloatingParticles />
      <CursorGlow />
      
      {/* Top Navigation Bar - Premium Social Style */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 h-16 flex items-center justify-between px-4 md:px-8 shadow-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div 
          className="flex items-center gap-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-md">
            MN.
          </div>
          <div className="hidden md:flex items-center bg-slate-800/40 rounded-full px-4 py-2 border border-white/5 focus-within:border-blue-500/50 focus-within:bg-slate-800/60 transition-all duration-300 relative">
            <FaSearch className="text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search developers, projects, skills..." 
              className="bg-transparent border-none outline-none text-sm w-64 focus:w-80 transition-all duration-300 placeholder-slate-500"
              value={searchQuery}
              onChange={handleSearch}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
            />
            {showSearchResults && filteredSections.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl overflow-hidden z-50"
              >
                {filteredSections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollToSection(section.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                  >
                    <span className="text-blue-400">{section.icon}</span>
                    <span className="text-sm text-slate-200">{section.name}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="hidden md:flex gap-8 text-slate-400">
            <a href="#home" className="hover:text-blue-400 hover:scale-110 transition-all drop-shadow-[0_0_8px_rgba(59,130,246,0)] hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"><FaHome size={22} /></a>
            <Link to="/messages" className="hover:text-blue-400 hover:scale-110 transition-all relative">
              <FaCommentAlt size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            </Link>
            <Link to="/notifications" className="hover:text-blue-400 hover:scale-110 transition-all relative">
              <FaBell size={22} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>
          </div>
          <div className="h-8 w-[1px] bg-white/10 mx-2 hidden md:block"></div>
          <div className="flex items-center gap-4">
            {userInfo ? (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 p-[2px] cursor-pointer hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all">
                  <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center text-xs font-bold">
                    {userInfo.username.substring(0, 2).toUpperCase()}
                  </div>
                </div>
                <button onClick={logout} className="text-xs text-red-400 hover:text-red-300 font-medium">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-all">Login</Link>
            )}
          </div>
        </motion.div>
      </motion.nav>

      <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto flex gap-6 relative z-10">
        {/* Left Sidebar - Premium Profile Card */}
        <motion.aside 
          className="hidden lg:block w-[280px] sticky top-24 h-fit space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div 
            className="glass-panel rounded-2xl overflow-hidden border border-white/5"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-28 bg-gradient-to-r from-blue-600 to-purple-600 relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
            </div>
            <div className="px-6 pb-6 -mt-12 text-center relative">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-2xl bg-slate-900 border-4 border-[#07111F] mx-auto mb-3 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.3)] relative z-10">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-400">MN</div>
                </div>
                <div className="absolute bottom-4 -right-2 w-5 h-5 bg-green-500 border-4 border-[#07111F] rounded-full z-20 shadow-[0_0_10px_rgba(34,197,94,0.8)]" title="Available for work"></div>
              </div>
              
              <h2 className="font-bold text-lg text-white tracking-wide">Mayur Nishad</h2>
              <div className="h-6 mt-1 mb-4">
                <p className="text-sm text-blue-400 font-medium typing-effect inline-block">Frontend Developer & Designer</p>
              </div>
              
              <div className="flex justify-center gap-3 mb-6">
                <a href="https://github.com/mayur0018" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/5"><FaGithub size={18} /></a>
                <a href="https://linkedin.com/in/mayur-nishad" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-blue-400 transition-colors border border-white/5"><FaLinkedin size={18} /></a>
                <a href="#" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-blue-300 transition-colors border border-white/5"><FaTwitter size={18} /></a>
              </div>

              <div className="border-t border-white/5 py-4 text-left text-sm space-y-4">
                <div className="flex justify-between items-center group cursor-pointer">
                  <span className="text-slate-400 group-hover:text-slate-200 transition-colors">Profile views</span>
                  <span className="text-blue-400 font-bold group-hover:text-blue-300">1,248</span>
                </div>
                <div className="flex justify-between items-center group cursor-pointer">
                  <span className="text-slate-400 group-hover:text-slate-200 transition-colors">Post impressions</span>
                  <span className="text-purple-400 font-bold group-hover:text-purple-300">4,892</span>
                </div>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] text-sm font-bold text-white uppercase tracking-wider">
                Download Resume
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            className="glass-panel rounded-2xl p-5 border border-white/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <FaCode className="text-blue-400" /> Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Node.js', 'MongoDB', 'Framer Motion'].map((skill, i) => (
                <motion.span 
                  key={skill} 
                  className="px-3 py-1.5 rounded-lg bg-slate-800/50 text-xs font-medium text-slate-300 border border-white/5 hover:border-blue-500/50 hover:text-blue-400 hover:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition-all cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + (i * 0.05) }}
                  whileHover={{ scale: 1.1 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.aside>

        {/* Main Feed */}
        <motion.div 
          className="flex-1 space-y-8 max-w-[680px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {/* Create Post Style Intro */}
          <motion.div 
            className="glass-panel rounded-2xl p-5 border border-white/5 shadow-lg"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[2px] shrink-0">
                <div className="w-full h-full rounded-full bg-[#07111F] flex items-center justify-center text-xs font-bold text-slate-200">MN</div>
              </div>
              <div className="flex-1 bg-slate-800/30 rounded-2xl px-5 py-3 text-slate-400 text-sm cursor-text border border-white/5 hover:bg-slate-800/50 hover:border-blue-500/30 transition-all group">
                <span className="group-hover:text-slate-300 transition-colors">Share your latest project or update...</span>
              </div>
            </div>
            <div className="flex justify-between px-2 pt-3 border-t border-white/5">
              <button className="flex items-center gap-2 text-slate-400 hover:text-blue-400 text-sm font-medium py-2 px-4 rounded-xl hover:bg-blue-500/10 transition-all">
                <FaCamera className="text-blue-400" size={18} /> <span className="hidden sm:inline">Media</span>
              </button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-green-400 text-sm font-medium py-2 px-4 rounded-xl hover:bg-green-500/10 transition-all">
                <FaVideo className="text-green-400" size={18} /> <span className="hidden sm:inline">Video</span>
              </button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-orange-400 text-sm font-medium py-2 px-4 rounded-xl hover:bg-orange-500/10 transition-all">
                <FaCalendar className="text-orange-400" size={18} /> <span className="hidden sm:inline">Event</span>
              </button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-purple-400 text-sm font-medium py-2 px-4 rounded-xl hover:bg-purple-500/10 transition-all">
                <FaPen className="text-purple-400" size={18} /> <span className="hidden sm:inline">Article</span>
              </button>
            </div>
          </motion.div>

          <motion.div 
            id="home"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AboutMe />
          </motion.div>

          <motion.div 
            id="experience"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ExperienceSection />
          </motion.div>

          <motion.div 
            id="skills"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <MySkills />
          </motion.div>

          <motion.div 
            id="project"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ProjectsSection />
          </motion.div>

          <motion.div 
            id="testimonial"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Testimonial />
          </motion.div>

          <motion.div 
            id="contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ContactForm />
          </motion.div>
        </motion.div>

        {/* Right Sidebar - Premium Widgets */}
        <motion.aside 
          className="hidden xl:block w-[320px] sticky top-24 h-fit space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div 
            className="glass-panel rounded-2xl p-5 border border-white/5"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-200">Trending Topics</h3>
              <FaEllipsisH className="text-slate-500 hover:text-slate-300 cursor-pointer transition-colors" />
            </div>
            <div className="space-y-4">
              {[
                { label: 'React 19 Server Components', posts: '12.4k posts', trend: 'up' },
                { label: 'Tailwind CSS V4', posts: '8.2k posts', trend: 'up' },
                { label: 'AI Code Assistants', posts: '24.1k posts', trend: 'hot' },
                { label: 'Framer Motion Tricks', posts: '3.5k posts', trend: 'stable' },
              ].map((trend, i) => (
                <motion.div 
                  key={i} 
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + (i * 0.1) }}
                >
                  <div className="flex justify-between items-start">
                    <p className="text-xs text-slate-500 mb-1">Tech • Trending</p>
                    {trend.trend === 'hot' && <span className="text-[10px] text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full border border-red-400/20">🔥 Hot</span>}
                  </div>
                  <h4 className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors">#{trend.label}</h4>
                  <p className="text-xs text-slate-400 mt-1">{trend.posts}</p>
                </motion.div>
              ))}
            </div>
            <button className="w-full mt-5 py-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors text-sm font-medium">Show more</button>
          </motion.div>

          <motion.div 
            className="glass-panel rounded-2xl p-5 border border-white/5 relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-500/10 blur-[30px] rounded-full group-hover:bg-purple-500/20 transition-all"></div>
            <h3 className="font-bold text-slate-200 mb-4 relative z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></span>
              Recent Activity
            </h3>
            <div className="space-y-4 relative z-10">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <FaGithub size={14} />
                </div>
                <div>
                  <p className="text-sm text-slate-300">Pushed <span className="font-bold text-white">4 commits</span> to <span className="text-blue-400 cursor-pointer hover:underline">mayur-portfolio</span></p>
                  <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  <FaCode size={14} />
                </div>
                <div>
                  <p className="text-sm text-slate-300">Completed <span className="font-bold text-white">Advanced React Patterns</span></p>
                  <p className="text-xs text-slate-500 mt-1">Yesterday</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="glass-panel rounded-2xl p-5 border border-white/5"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-bold text-slate-200 mb-4">Suggested Connections</h3>
            <div className="space-y-4">
              {[
                { name: 'Github', handle: '@mayur0018', icon: <FaGithub />, link: 'https://github.com/mayur0018', color: 'from-slate-700 to-slate-900' },
                { name: 'LinkedIn', handle: '/in/mayur-nishad', icon: <FaLinkedin />, link: 'https://linkedin.com/in/mayur-nishad', color: 'from-blue-600 to-blue-800' },
                { name: 'Twitter', handle: '@mayur_codes', icon: <FaTwitter />, link: 'https://twitter.com', color: 'from-sky-400 to-sky-600' },
              ].map((conn, i) => (
                <motion.div 
                  key={conn.name} 
                  className="flex items-center justify-between group"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + (i * 0.1) }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${conn.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <span className="text-white">{conn.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{conn.name}</h4>
                      <p className="text-xs text-slate-400">{conn.handle}</p>
                    </div>
                  </div>
                  <a 
                    href={conn.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold px-4 py-1.5 rounded-full border border-slate-600 text-slate-300 hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                  >
                    Connect
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <Footer />
        </motion.aside>
      </main>
    </div>
  );
}
