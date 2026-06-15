import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MySkills from "../components/skills/MySkills";
import ExperienceSection from "../components/experience/ExperienceData";
import AboutMe from "../components/about/AboutMe";
import ProjectsSection from "../components/Projects/projectsData";
import ContactForm from "../components/contact/ContactForm";
import Testimonial from "../components/testimonial/Testimonial";
import { FaHome, FaBell, FaSearch, FaLinkedin, FaGithub, FaPen, FaCommentAlt } from "react-icons/fa";
import useAuthStore from "../store/authStore";
import { Link } from "react-router-dom";
import CreatePost from "../components/feed/CreatePost";
import PostFeed from "../components/feed/PostFeed";
import SearchDropdown from "../components/search/SearchDropdown";
import EditProfileModal from "../components/profile/EditProfileModal";
import api from "../api/api";
import { useQuery } from "@tanstack/react-query";

export default function Portfolio() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState({ users: [], posts: [], projects: [] });
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  
  const userInfo = useAuthStore((state) => state.userInfo);
  const logout = useAuthStore((state) => state.logout);

  const { data: userProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await api.get('/users/profile');
      return data;
    },
    enabled: !!userInfo,
  });

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length > 1) {
        try {
          const { data } = await api.get(`/search?q=${searchQuery}`);
          setSearchResults(data);
          setShowSearchResults(true);
        } catch (error) {
          console.error("Search error:", error);
        }
      } else {
        setShowSearchResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-slate-200 font-sans selection:bg-blue-500/30 relative">
      {/* Top Navigation Bar */}
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
            />
            <AnimatePresence>
              {showSearchResults && (
                <SearchDropdown 
                  results={searchResults} 
                  isVisible={showSearchResults} 
                  onSelect={() => setShowSearchResults(false)} 
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="hidden md:flex gap-8 text-slate-400">
            <a href="#home" className="hover:text-blue-400 hover:scale-110 transition-all"><FaHome size={22} /></a>
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
                <div 
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 p-[2px] cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => setIsEditProfileOpen(true)}
                >
                  <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center text-xs font-bold overflow-hidden">
                    {userProfile?.avatar ? (
                      <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
                    ) : (
                      userInfo.username.substring(0, 2).toUpperCase()
                    )}
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

      <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto flex flex-col md:flex-row gap-8 relative z-10">
        {/* Left Sidebar */}
        <motion.aside className="hidden lg:block w-[280px] sticky top-24 h-fit space-y-6">
          <div className="glass rounded-2xl overflow-hidden border border-white/5 p-6 text-center">
            <div className="w-20 h-20 rounded-2xl bg-slate-900 border-4 border-[#07111F] mx-auto mb-3 flex items-center justify-center overflow-hidden">
               <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-400">MN</div>
            </div>
            <h2 className="font-bold text-lg text-white">Mayur Nishad</h2>
            <p className="text-sm text-blue-400 mb-4">Frontend Developer</p>
            <div className="flex justify-center gap-3 mb-6">
                <a href="#" className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white border border-white/5"><FaGithub size={18} /></a>
                <a href="#" className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-blue-400 border border-white/5"><FaLinkedin size={18} /></a>
            </div>
            <button className="w-full py-2 rounded-xl bg-blue-600 text-white text-sm font-bold">View Profile</button>
          </div>
        </motion.aside>

        {/* Main Feed */}
        <div className="flex-1 space-y-8 max-w-[680px]">
            <CreatePost />
            <PostFeed />
            <AboutMe />
            <ExperienceSection />
            <MySkills />
            <ProjectsSection />
            <Testimonial />
            <ContactForm />
        </div>

        {/* Right Sidebar */}
        <motion.aside className="hidden xl:block w-[300px] sticky top-24 h-fit space-y-6">
            <div className="glass rounded-2xl p-5 border border-white/5">
                <h3 className="font-bold text-white mb-4">Trending</h3>
                <div className="space-y-4">
                    <p className="text-sm text-slate-400">#ReactJS</p>
                    <p className="text-sm text-slate-400">#TailwindCSS</p>
                    <p className="text-sm text-slate-400">#Web3</p>
                </div>
            </div>
        </motion.aside>
      </main>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <button className="w-14 h-14 rounded-full bg-blue-500 shadow-lg shadow-blue-500/40 flex items-center justify-center text-white text-xl">
          <FaPen />
        </button>
      </div>

      {/* Modals */}
      <EditProfileModal 
        isOpen={isEditProfileOpen} 
        onClose={() => setIsEditProfileOpen(false)} 
        user={userProfile} 
      />
    </div>
  );
}
