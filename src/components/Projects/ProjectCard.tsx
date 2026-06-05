import { motion } from "framer-motion";
import ProjectImage from "./ProjectImage";
import { FaHeart, FaComment, FaShare, FaExternalLinkAlt } from "react-icons/fa";

interface ProjectCardProps {
  number: string;
  title: string;
  description: string | string[];
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  liveUrl: string;
}

export default function ProjectCard({
  number,
  title,
  description,
  imageSrc,
  imageAlt,
  liveUrl,
}: ProjectCardProps) {

  const renderDescription = () => {
    if (Array.isArray(description)) {
      return description.map((text, index) => (
        <p
          key={`${number}-desc-${index}`}
          className="text-slate-400 mb-2 text-sm leading-relaxed"
        >
          {text}
        </p>
      ));
    }

    return (
      <p className="text-slate-400 mb-2 text-sm leading-relaxed">
        {description}
      </p>
    );
  };

  return (
    <motion.article
      className="glass-panel rounded-2xl overflow-hidden border border-white/5 shadow-lg flex flex-col group hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/30 group-hover:border-blue-400/50 transition-colors shadow-[0_0_10px_rgba(59,130,246,0.2)]">
            {number}
          </div>
          <div>
            <h3 className="font-bold text-slate-100 group-hover:text-blue-300 transition-colors">{title}</h3>
            <p className="text-xs text-slate-500">Project Highlight • Just now</p>
          </div>
        </div>
        <div className="text-slate-500 cursor-pointer hover:text-white hover:bg-white/10 p-2 rounded-full transition-all">
          <FaExternalLinkAlt size={12} />
        </div>
      </div>

      {/* Post Content (Description) */}
      <div className="px-4 pt-4 relative z-10">
        {renderDescription()}
      </div>

      {/* Post Image */}
      <div className="mt-4 px-3">
        <div className="rounded-xl overflow-hidden border border-white/10 bg-slate-900/50 relative group/img cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity z-10 flex items-end justify-center pb-4">
            <span className="text-white text-sm font-bold bg-blue-600/80 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/20">View Details</span>
          </div>
          <ProjectImage src={imageSrc} alt={imageAlt} />
        </div>
      </div>

      {/* Post Actions */}
      <div className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-slate-400 hover:text-pink-500 transition-colors group">
              <FaHeart className="group-active:scale-125 transition-transform" />
              <span className="text-xs font-medium">24</span>
            </button>
            <button className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors">
              <FaComment />
              <span className="text-xs font-medium">12</span>
            </button>
            <button className="flex items-center gap-2 text-slate-400 hover:text-green-400 transition-colors">
              <FaShare />
              <span className="text-xs font-medium">8</span>
            </button>
          </div>
          <a 
            href={liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-bold text-blue-400 hover:underline flex items-center gap-1"
          >
            Live Demo <FaExternalLinkAlt size={10} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
