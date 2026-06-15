import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUsers, FaProjectDiagram, FaTrash, FaShieldAlt, FaPlus, 
  FaEdit, FaTimes, FaCog, FaBriefcase, FaCode, FaGlobe, 
  FaSignOutAlt, FaHome, FaChevronRight, FaSave, FaUser
} from "react-icons/fa";
import api from "../api/api";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [activeTab, setActiveTab] = useState("settings");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Forms
  const [configForm, setConfigForm] = useState<any>(null);
  const [projectForm, setProjectForm] = useState({ number: "", title: "", description: "", imageSrc: "", imageAlt: "", imagePosition: "left", liveUrl: "" });
  const [experienceForm, setExperienceForm] = useState({ company: "", role: "", duration: "", description: "", logo: "" });
  const [skillForm, setSkillForm] = useState({ name: "", category: "frontend", icon: "" });
  const [contentForm, setContentForm] = useState({ type: "post", title: "", description: "", mediaUrl: "", date: "", location: "" });

  // Queries
  const { data: config } = useQuery({ 
    queryKey: ['config'], 
    queryFn: async () => { 
      const { data } = await api.get('/config'); 
      setConfigForm(data); 
      return data; 
    } 
  });
  const { data: projects } = useQuery({ queryKey: ['projects'], queryFn: async () => { const { data } = await api.get('/projects'); return data; } });
  const { data: experiences } = useQuery({ queryKey: ['experiences'], queryFn: async () => { const { data } = await api.get('/experience'); return data; } });
  const { data: skills } = useQuery({ queryKey: ['skills'], queryFn: async () => { const { data } = await api.get('/skills'); return data; } });
  const { data: contents } = useQuery({ queryKey: ['contents'], queryFn: async () => { const { data } = await api.get('/content'); return data; } });

  // Mutation Helper with instant cache invalidation
  const mutationOptions = (key: string) => ({
    onSuccess: () => {
      // Invalidate both admin and global frontend queries for instant updates
      queryClient.invalidateQueries({ queryKey: [key] });
      queryClient.invalidateQueries({ queryKey: ['config'] }); // Always refresh config just in case
      setIsModalOpen(false);
      setEditingItem(null);
      toast.success('Updated successfully! Your changes are live.');
    },
    onError: (err: any) => toast.error(err.message)
  });

  const updateConfigMutation = useMutation({ mutationFn: (data: any) => api.put('/config', data), ...mutationOptions('config') });
  const projectMutation = useMutation({ mutationFn: ({ id, data }: any) => id ? api.put(`/projects/${id}`, data) : api.post('/projects', data), ...mutationOptions('projects') });
  const experienceMutation = useMutation({ mutationFn: ({ id, data }: any) => id ? api.put(`/experience/${id}`, data) : api.post('/experience', data), ...mutationOptions('experiences') });
  const skillMutation = useMutation({ mutationFn: ({ id, data }: any) => id ? api.put(`/skills/${id}`, data) : api.post('/skills', data), ...mutationOptions('skills') });
  const contentMutation = useMutation({ mutationFn: ({ id, data }: any) => id ? api.put(`/content/${id}`, data) : api.post('/content', data), ...mutationOptions('contents') });

  const deleteMutation = useMutation({
    mutationFn: ({ type, id }: any) => api.delete(`/${type}/${id}`),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [variables.type === 'projects' ? 'projects' : variables.type === 'experience' ? 'experiences' : variables.type === 'skills' ? 'skills' : 'contents'] });
      toast.success('Removed successfully');
    }
  });

  const handleEdit = (item: any, type: string) => {
    setEditingItem(item);
    if (type === 'project') setProjectForm(item);
    else if (type === 'experience') setExperienceForm(item);
    else if (type === 'skill') setSkillForm(item);
    else if (type === 'content') setContentForm({ ...item, date: item.date ? item.date.split('T')[0] : "" });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'projects') projectMutation.mutate({ id: editingItem?._id, data: projectForm });
    else if (activeTab === 'experience') experienceMutation.mutate({ id: editingItem?._id, data: experienceForm });
    else if (activeTab === 'skills') skillMutation.mutate({ id: editingItem?._id, data: skillForm });
    else if (activeTab === 'content') contentMutation.mutate({ id: editingItem?._id, data: contentForm });
    else if (activeTab === 'settings') updateConfigMutation.mutate(configForm);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'project' | 'settings_avatar' | 'settings_about' | 'content') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (type === 'project') setProjectForm({ ...projectForm, imageSrc: base64String });
        else if (type === 'content') setContentForm({ ...contentForm, mediaUrl: base64String });
        else if (type === 'settings_avatar') setConfigForm({ ...configForm, profile: { ...configForm.profile, avatar: base64String } });
        else if (type === 'settings_about') setConfigForm({ ...configForm, aboutMe: { ...configForm.aboutMe, image: base64String } });
        toast.success('Image processed locally. Save to update.');
      };
      reader.readAsDataURL(file);
    }
  };

  const menuItems = [
    { id: "settings", label: "General Settings", icon: <FaCog /> },
    { id: "projects", label: "Project Portfolio", icon: <FaProjectDiagram /> },
    { id: "experience", label: "Work Experience", icon: <FaBriefcase /> },
    { id: "skills", label: "Technical Skills", icon: <FaCode /> },
    { id: "content", label: "Dynamic Content", icon: <FaGlobe /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully');
  };

  return (
    <div className="flex min-h-screen bg-[#020817] text-slate-200">
      {/* Professional Sidebar */}
      <aside className="w-72 bg-[#0F172A] border-r border-white/5 flex flex-col fixed h-screen z-50">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <FaShieldAlt className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-lg font-black text-white tracking-tight">ADMIN PANEL</h1>
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Control Center</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 mt-4">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all group ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
            >
              <span className={`text-lg ${activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'}`}>
                {item.icon}
              </span>
              {item.label}
              {activeTab === item.id && <FaChevronRight className="ml-auto text-[10px] opacity-50" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-slate-400 hover:bg-white/5 hover:text-white transition-all">
            <FaHome className="text-lg text-slate-500" />
            View Website
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-red-400 hover:bg-red-500/10 transition-all">
            <FaSignOutAlt className="text-lg" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72 p-10 relative">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              {menuItems.find(i => i.id === activeTab)?.label}
            </h2>
            <p className="text-slate-400 mt-1">Manage and update your website's {activeTab} section in real-time.</p>
          </div>
          {activeTab !== 'settings' && (
            <button 
              onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-xl shadow-blue-600/20"
            >
              <FaPlus /> Add New Item
            </button>
          )}
        </header>

        {/* Dynamic Content Views */}
        <AnimatePresence mode="wait">
          {activeTab === 'settings' && configForm && (
            <motion.div 
              key="settings"
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="glass p-8 rounded-3xl border border-white/5 bg-[#0F172A]/50 backdrop-blur-xl">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Site Brand Name</label>
                      <input type="text" value={configForm.siteName} onChange={e => setConfigForm({...configForm, siteName: e.target.value})} className="w-full bg-[#1E293B] border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" placeholder="e.g. MN." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Contact Email</label>
                      <input type="email" value={configForm.contactEmail} onChange={e => setConfigForm({...configForm, contactEmail: e.target.value})} className="w-full bg-[#1E293B] border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" placeholder="admin@example.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Hero Section Title</label>
                    <input type="text" value={configForm.heroTitle} onChange={e => setConfigForm({...configForm, heroTitle: e.target.value})} className="w-full bg-[#1E293B] border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" placeholder="Professional Title" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Hero Section Subtitle / Intro</label>
                    <textarea value={configForm.heroSubtitle} onChange={e => setConfigForm({...configForm, heroSubtitle: e.target.value})} className="w-full bg-[#1E293B] border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all h-32 resize-none" placeholder="Detailed introduction..." />
                  </div>

                  <div className="pt-6 border-t border-white/5">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                      <FaGlobe className="text-blue-500" /> Social Connectivity
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">GitHub Profile URL</label>
                        <input type="text" value={configForm.socials?.github || ""} onChange={e => setConfigForm({...configForm, socials: {...configForm.socials, github: e.target.value}})} className="w-full bg-[#1E293B] border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">LinkedIn Profile URL</label>
                        <input type="text" value={configForm.socials?.linkedin || ""} onChange={e => setConfigForm({...configForm, socials: {...configForm.socials, linkedin: e.target.value}})} className="w-full bg-[#1E293B] border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/50" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                      <FaUser className="text-blue-500" /> Left Profile Card
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Display Name</label>
                        <input type="text" value={configForm.profile?.name || ""} onChange={e => setConfigForm({...configForm, profile: {...configForm.profile, name: e.target.value}})} className="w-full bg-[#1E293B] border border-white/10 rounded-xl px-4 py-3 text-white outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Title</label>
                        <input type="text" value={configForm.profile?.title || ""} onChange={e => setConfigForm({...configForm, profile: {...configForm.profile, title: e.target.value}})} className="w-full bg-[#1E293B] border border-white/10 rounded-xl px-4 py-3 text-white outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Location</label>
                        <input type="text" value={configForm.profile?.location || ""} onChange={e => setConfigForm({...configForm, profile: {...configForm.profile, location: e.target.value}})} className="w-full bg-[#1E293B] border border-white/10 rounded-xl px-4 py-3 text-white outline-none" />
                      </div>
                    </div>
                    <div className="mt-6 space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Short Bio</label>
                      <input type="text" value={configForm.profile?.bio || ""} onChange={e => setConfigForm({...configForm, profile: {...configForm.profile, bio: e.target.value}})} className="w-full bg-[#1E293B] border border-white/10 rounded-xl px-4 py-3 text-white outline-none" />
                    </div>
                    <div className="grid grid-cols-3 gap-6 mt-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Posts Count</label>
                        <input type="text" value={configForm.profile?.stats?.posts || ""} onChange={e => setConfigForm({...configForm, profile: {...configForm.profile, stats: {...configForm.profile.stats, posts: e.target.value}}})} className="w-full bg-[#1E293B] border border-white/10 rounded-xl px-4 py-3 text-white outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Followers</label>
                        <input type="text" value={configForm.profile?.stats?.followers || ""} onChange={e => setConfigForm({...configForm, profile: {...configForm.profile, stats: {...configForm.profile.stats, followers: e.target.value}}})} className="w-full bg-[#1E293B] border border-white/10 rounded-xl px-4 py-3 text-white outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Following</label>
                        <input type="text" value={configForm.profile?.stats?.following || ""} onChange={e => setConfigForm({...configForm, profile: {...configForm.profile, stats: {...configForm.profile.stats, following: e.target.value}}})} className="w-full bg-[#1E293B] border border-white/10 rounded-xl px-4 py-3 text-white outline-none" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                      <FaUser className="text-blue-500" /> About Me Section
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">About Title</label>
                        <input type="text" value={configForm.aboutMe?.title || ""} onChange={e => setConfigForm({...configForm, aboutMe: {...configForm.aboutMe, title: e.target.value}})} className="w-full bg-[#1E293B] border border-white/10 rounded-xl px-4 py-3 text-white outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">About Subtitle</label>
                        <input type="text" value={configForm.aboutMe?.subtitle || ""} onChange={e => setConfigForm({...configForm, aboutMe: {...configForm.aboutMe, subtitle: e.target.value}})} className="w-full bg-[#1E293B] border border-white/10 rounded-xl px-4 py-3 text-white outline-none" />
                      </div>
                    </div>
                    <div className="mt-6 space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Main Description</label>
                      <textarea value={configForm.aboutMe?.text || ""} onChange={e => setConfigForm({...configForm, aboutMe: {...configForm.aboutMe, text: e.target.value}})} className="w-full bg-[#1E293B] border border-white/10 rounded-xl px-4 py-3 text-white outline-none h-32 resize-none" />
                    </div>
                    <div className="mt-6 space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Profile Image (Avatar)</label>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                          {configForm.profile?.avatar ? <img src={configForm.profile.avatar} className="w-full h-full object-cover" /> : <FaUser className="text-slate-600" />}
                        </div>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'settings_avatar')} className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500" />
                      </div>
                    </div>
                    <div className="mt-6 space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">About Image</label>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                          {configForm.aboutMe?.image ? <img src={configForm.aboutMe.image} className="w-full h-full object-cover" /> : <FaEdit className="text-slate-600" />}
                        </div>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'settings_about')} className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500" />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black px-10 py-5 rounded-2xl transition-all shadow-xl shadow-blue-600/30 transform hover:-translate-y-1">
                    <FaSave /> Save Changes
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {activeTab !== 'settings' && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="glass rounded-3xl border border-white/5 overflow-hidden bg-[#0F172A]/50"
            >
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/[0.03] text-slate-400 text-[11px] uppercase tracking-widest font-black">
                    <th className="px-8 py-6">Identity</th>
                    <th className="px-8 py-6">Description / Meta</th>
                    <th className="px-8 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {(activeTab === 'projects' ? projects : activeTab === 'experience' ? experiences : activeTab === 'skills' ? skills : contents)?.map((item: any) => (
                    <tr key={item._id} className="hover:bg-white/[0.01] transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#1E293B] flex items-center justify-center border border-white/5 text-blue-400 font-bold">
                            {item.logo || item.icon ? "IMG" : (item.title || item.name || item.company).substring(0, 2).toUpperCase()}
                          </div>
                          <span className="text-slate-100 font-bold group-hover:text-blue-400 transition-colors">{item.title || item.name || item.company}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="max-w-md">
                          <p className="text-slate-400 text-sm line-clamp-1">{item.description || item.role || item.category || item.type}</p>
                          <span className="text-[10px] text-slate-600 font-bold uppercase mt-1 block">{item.duration || item.category || item.type}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-2 mr-4">
                        <img 
                          src={
                            (item.imageSrc && (item.imageSrc.startsWith('http') || item.imageSrc.startsWith('data:'))) 
                            ? item.imageSrc 
                            : "https://via.placeholder.com/40"
                          } 
                          alt="preview" 
                          className="w-8 h-8 rounded-lg object-cover border border-white/10"
                        />
                      </div>
                      <button onClick={() => handleEdit(item, activeTab.slice(0, -1))} className="p-3 text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all"><FaEdit /></button>
                      <button onClick={() => { if(window.confirm('Delete this item?')) deleteMutation.mutate({ type: activeTab === 'projects' ? 'projects' : activeTab === 'experience' ? 'experience' : activeTab === 'skills' ? 'skills' : 'content', id: item._id })}} className="p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"><FaTrash /></button>
                    </div>
                  </td>
                    </tr>
                  ))}
                  {(!projects && activeTab === 'projects') && <tr><td colSpan={3} className="p-20 text-center text-slate-500 italic">No data found in this section.</td></tr>}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }} 
              className="relative bg-[#0F172A] border border-white/10 rounded-[32px] p-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-500 flex items-center justify-center text-sm">
                    {editingItem ? <FaEdit /> : <FaPlus />}
                  </div>
                  {editingItem ? 'Modify' : 'Create'} {activeTab.slice(0, -1)}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all"><FaTimes /></button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {activeTab === 'projects' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Number (e.g. 01)" value={projectForm.number} onChange={e => setProjectForm({...projectForm, number: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500/50" required />
                      <select value={projectForm.imagePosition} onChange={e => setProjectForm({...projectForm, imagePosition: e.target.value})} className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-5 py-4 text-white outline-none">
                        <option value="left">Image Left</option>
                        <option value="right">Image Right</option>
                      </select>
                    </div>
                    <input type="text" placeholder="Project Title" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500/50" required />
                    <textarea placeholder="Detailed Description" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none h-32 resize-none" required />
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Project Image</label>
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                          {projectForm.imageSrc ? <img src={projectForm.imageSrc} className="w-full h-full object-cover" /> : <FaProjectDiagram className="text-slate-600" />}
                        </div>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'project')} className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500" />
                      </div>
                    </div>
                    <input type="text" placeholder="Live Deployment URL" value={projectForm.liveUrl} onChange={e => setProjectForm({...projectForm, liveUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500/50" required />
                  </div>
                )}
                {activeTab === 'experience' && (
                  <div className="space-y-4">
                    <input type="text" placeholder="Company Name" value={experienceForm.company} onChange={e => setExperienceForm({...experienceForm, company: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none" required />
                    <input type="text" placeholder="Your Role" value={experienceForm.role} onChange={e => setExperienceForm({...experienceForm, role: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none" required />
                    <input type="text" placeholder="Duration (e.g. 2021 - Present)" value={experienceForm.duration} onChange={e => setExperienceForm({...experienceForm, duration: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none" required />
                    <textarea placeholder="Job Responsibilities" value={experienceForm.description} onChange={e => setExperienceForm({...experienceForm, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none h-32 resize-none" required />
                  </div>
                )}
                {activeTab === 'skills' && (
                  <div className="space-y-4">
                    <input type="text" placeholder="Skill Name (e.g. React)" value={skillForm.name} onChange={e => setSkillForm({...skillForm, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none" required />
                    <select value={skillForm.category} onChange={e => setSkillForm({...skillForm, category: e.target.value})} className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-5 py-4 text-white outline-none">
                      <option value="frontend">Frontend Stack</option>
                      <option value="backend">Backend Stack</option>
                      <option value="tools">Development Tools</option>
                      <option value="other">Other Expertise</option>
                    </select>
                  </div>
                )}
                {activeTab === 'content' && (
                  <div className="space-y-4">
                    <select value={contentForm.type} onChange={e => setContentForm({...contentForm, type: e.target.value as any})} className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-5 py-4 text-white outline-none">
                      <option value="post">Standard Post</option>
                      <option value="event">Community Event</option>
                      <option value="video">Video Showcase</option>
                    </select>
                    <input type="text" placeholder="Headline" value={contentForm.title} onChange={e => setContentForm({...contentForm, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none" required />
                    <textarea placeholder="Content Body" value={contentForm.description} onChange={e => setContentForm({...contentForm, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none h-24 resize-none" />
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Content Media (Image/Preview)</label>
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                          {contentForm.mediaUrl ? <img src={contentForm.mediaUrl} className="w-full h-full object-cover" /> : <FaGlobe className="text-slate-600" />}
                        </div>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'project')} className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500" />
                      </div>
                    </div>
                  </div>
                )}
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all mt-4 shadow-xl shadow-blue-600/30">
                  {editingItem ? 'Update Live Content' : 'Publish to Website'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
