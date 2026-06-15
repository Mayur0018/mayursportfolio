import { motion } from "framer-motion";
import { FaUser, FaFileAlt, FaCode } from "react-icons/fa";

interface SearchResults {
  users: any[];
  posts: any[];
  projects: any[];
}

interface SearchDropdownProps {
  results: SearchResults;
  isVisible: boolean;
  onSelect: () => void;
}

export default function SearchDropdown({ results, isVisible, onSelect }: SearchDropdownProps) {
  if (!isVisible) return null;

  const hasResults = results.users.length > 0 || results.posts.length > 0 || results.projects.length > 0;

  return (
    <motion.div
      className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-[60] overflow-hidden max-h-[400px] overflow-y-auto"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {!hasResults ? (
        <div className="p-4 text-center text-slate-500 text-sm">No results found</div>
      ) : (
        <div className="p-2 space-y-4">
          {results.users.length > 0 && (
            <div>
              <h4 className="px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Developers</h4>
              <div className="mt-1">
                {results.users.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                    onClick={onSelect}
                  >
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 border border-red-500/20 overflow-hidden">
                      {user.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /> : <FaUser size={14} />}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-100">{user.name}</div>
                      <div className="text-[10px] text-slate-500">@{user.username} • {user.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.projects.length > 0 && (
            <div>
              <h4 className="px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Projects</h4>
              <div className="mt-1">
                {results.projects.map((project) => (
                  <div
                    key={project._id}
                    className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                    onClick={onSelect}
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-gray-400 border border-purple-500/20 overflow-hidden">
                      <FaCode size={14} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-100">{project.title}</div>
                      <div className="text-[10px] text-slate-500 truncate w-48">{project.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.posts.length > 0 && (
            <div>
              <h4 className="px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Posts</h4>
              <div className="mt-1">
                {results.posts.map((post) => (
                  <div
                    key={post._id}
                    className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                    onClick={onSelect}
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 border border-green-500/20 overflow-hidden">
                      <FaFileAlt size={14} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-100 truncate w-48">{post.content}</div>
                      <div className="text-[10px] text-slate-500">by {post.user.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
