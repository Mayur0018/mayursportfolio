import { motion } from "framer-motion";
 import { type ElementType, createElement } from "react";

 interface SkillCardProps {
   title: string;
  icon?: string;
   variant?: 'light' | 'dark';
  iconType?: 'svg' | 'text' | 'react';
   iconText?: string;
  iconComponent?: ElementType;
 }
 
 export default function SkillCard({
  title,
  icon,
  iconType = 'svg',
  iconText,
  iconComponent
}: SkillCardProps) {
  return (
    <motion.article
      className="group flex flex-col justify-center items-center p-4 glass-panel rounded-2xl border border-white/5 aspect-square transition-all duration-300 relative overflow-hidden"
      whileHover={{ 
        scale: 1.05, 
        backgroundColor: "rgba(30, 41, 59, 0.8)",
        borderColor: "rgba(59, 130, 246, 0.4)",
        boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.3)"
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {iconType === 'react' && iconComponent ? (
        <div className="mb-4 flex items-center justify-center w-12 h-12 text-slate-400 group-hover:text-blue-400 transition-all duration-300 relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
          {createElement(iconComponent, {
            className: "w-8 h-8"
          })}
        </div>
      ) : iconType === 'svg' ? (
        <div className="mb-4 flex items-center justify-center w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all duration-300 relative z-10">
          <div
            dangerouslySetInnerHTML={{
              __html: icon || "",
            }}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center mb-4 w-12 h-12 text-slate-400 group-hover:text-blue-400 relative z-10">
          <div className="text-lg font-bold">
            {iconText}
          </div>
        </div>
      )}
      <h3 className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors relative z-10">
        {title}
      </h3>
    </motion.article>
  );
}
