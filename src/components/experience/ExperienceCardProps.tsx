import { motion } from 'framer-motion';
import CompanyLogo from './CompanyLogoProps';

interface ExperienceCardProps {
  company: string;
  title: string;
  period: string;
  description: string;
  highlighted?: boolean;
}

export default function ExperienceCard({
  company,
  title,
  period,
  description,
  highlighted = false,
}: ExperienceCardProps) {
  return (
    <motion.article
      className={`relative pl-8 pb-12 last:pb-0 group`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-800/50 group-last:bg-transparent">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0F172A] border-2 border-blue-500 z-10 shadow-[0_0_8px_rgba(59,130,246,0.5)] group-hover:bg-blue-500 transition-colors duration-300"></div>
      </div>

      <div className="glass-panel rounded-2xl p-6 border border-white/5 shadow-lg group-hover:border-blue-500/30 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300 relative overflow-hidden">
        {highlighted && (
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full pointer-events-none"></div>
        )}
        <header className="flex justify-between items-start mb-4 flex-wrap gap-2 relative z-10">
          <div className="flex gap-4 items-center">
            <div className="p-2 rounded-xl bg-slate-800/50 border border-white/5 shadow-inner">
              <CompanyLogo company={company} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                {title}
              </h3>
              <time className="text-xs font-medium text-slate-400">
                {period}
              </time>
            </div>
          </div>
          {highlighted && (
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
              Current
            </span>
          )}
        </header>
        <p className="text-sm leading-relaxed text-slate-400 relative z-10 group-hover:text-slate-300 transition-colors">{description}</p>
      </div>
    </motion.article>
  );
}
