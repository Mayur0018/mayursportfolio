import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { FaUsers, FaFileAlt, FaProjectDiagram, FaTrash, FaShieldAlt, FaChartLine, FaPlus, FaEdit, FaTimes } from "react-icons/fa";
import api from "../api/api";
import { format } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [projectForm, setProjectForm] = useState({
    number: "",
    title: "",
    description: "",
    imageSrc: "",
    imageAlt: "",
    imagePosition: "left",
    liveUrl: ""
  });

  const { data: analytics, isLoading: isAnalyticsLoading } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: async () => {
      const { data } = await api.get('/admin/analytics');
      return data;
    },
  });

  const { data: users, isLoading: isUsersLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data } = await api.get('/admin/users');
      return data;
    },
  });

  const { data: projects, isLoading: isProjectsLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      const { data } = await api.get('/projects');
      return data;
    },
  });

  const createProjectMutation = useMutation({
    mutationFn: (newProject: any) => api.post('/projects', newProject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      setIsProjectModalOpen(false);
      resetForm();
      toast.success('Project created!');
    }
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, data }: any) => api.put(`/projects/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      setIsProjectModalOpen(false);
      setEditingProject(null);
      resetForm();
      toast.success('Project updated!');
    }
  });

  const deleteProjectMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast.success('Project deleted!');
    }
  });

  const resetForm = () => {
    setProjectForm({
      number: "",
      title: "",
      description: "",
      imageSrc: "",
      imageAlt: "",
      imagePosition: "left",
      liveUrl: ""
    });
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setProjectForm({
      number: project.number,
      title: project.title,
      description: project.description,
      imageSrc: project.imageSrc,
      imageAlt: project.imageAlt,
      imagePosition: project.imagePosition,
      liveUrl: project.liveUrl
    });
    setIsProjectModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      updateProjectMutation.mutate({ id: editingProject._id, data: projectForm });
    } else {
      createProjectMutation.mutate(projectForm);
    }
  };

  if (isAnalyticsLoading || isUsersLoading || isProjectsLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#07111F]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto space-y-10 min-h-screen bg-[#07111F]">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <FaShieldAlt className="text-blue-500" />
            Admin <span className="text-blue-400">Dashboard</span>
          </h1>
          <p className="text-slate-400 mt-2">Manage your platform, users, and projects.</p>
        </div>
        <button 
          onClick={() => { setEditingProject(null); resetForm(); setIsProjectModalOpen(true); }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 w-fit"
        >
          <FaPlus /> Add New Project
        </button>
      </header>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard title="Total Users" value={analytics?.totals.users} icon={<FaUsers />} color="blue" />
        <AnalyticsCard title="Total Posts" value={analytics?.totals.posts} icon={<FaFileAlt />} color="purple" />
        <AnalyticsCard title="Total Projects" value={projects?.length} icon={<FaProjectDiagram />} color="green" />
        <AnalyticsCard title="Activity" value="High" icon={<FaChartLine />} color="orange" />
      </div>

      {/* Projects Management */}
      <section className="glass rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold text-white">Project Management</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.02] text-slate-400 text-xs uppercase font-bold">
                <th className="px-6 py-4">Number</th>
                <th className="px-6 py-4">Project Title</th>
                <th className="px-6 py-4">Position</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects?.map((project: any) => (
                <tr key={project._id} className="hover:bg-white/[0.01] transition-colors">
                  <td className="px-6 py-4 text-slate-300">{project.number}</td>
                  <td className="px-6 py-4 text-slate-100 font-bold">{project.title}</td>
                  <td className="px-6 py-4 text-slate-400 uppercase text-xs">{project.imagePosition}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleEdit(project)} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"><FaEdit /></button>
                      <button onClick={() => deleteProjectMutation.mutate(project._id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsProjectModalOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-slate-900 border border-white/10 rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
                <button onClick={() => setIsProjectModalOpen(false)} className="text-slate-400 hover:text-white"><FaTimes /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Number (e.g. 01)</label>
                    <input type="text" value={projectForm.number} onChange={(e) => setProjectForm({...projectForm, number: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Image Position</label>
                    <select value={projectForm.imagePosition} onChange={(e) => setProjectForm({...projectForm, imagePosition: e.target.value})} className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50" required>
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Project Title</label>
                  <input type="text" value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                  <textarea value={projectForm.description} onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 h-32 resize-none" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Image URL</label>
                  <input type="text" value={projectForm.imageSrc} onChange={(e) => setProjectForm({...projectForm, imageSrc: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Live URL</label>
                  <input type="text" value={projectForm.liveUrl} onChange={(e) => setProjectForm({...projectForm, liveUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50" required />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all mt-4">
                  {editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AnalyticsCard({ title, value, icon, color }: any) {
  const colors: any = {
    blue: "text-blue-500 bg-blue-500/10",
    purple: "text-purple-500 bg-purple-500/10",
    green: "text-green-500 bg-green-500/10",
    orange: "text-orange-500 bg-orange-500/10",
  };
  return (
    <div className="glass p-6 rounded-2xl border border-white/5">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colors[color]}`}>{icon}</div>
      </div>
      <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-white mt-1">{value || 0}</p>
    </div>
  );
}
