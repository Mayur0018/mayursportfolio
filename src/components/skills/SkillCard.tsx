import * as React from "react";
import { motion } from "framer-motion";
 
 interface SkillCardProps {
   title: string;
  icon?: string;
   variant?: 'light' | 'dark';
  iconType?: 'svg' | 'text' | 'react';
   iconText?: string;
  iconComponent?: React.ElementType;
 }
 
 export default function SkillCard({
   title,
   icon,
   variant = 'light',
  iconType = 'svg',
  iconText,
  iconComponent
 }: SkillCardProps) {
 const cardClasses = variant === 'dark'
   ? "group flex flex-col justify-center items-center p-4 bg-black rounded-lg border-black aspect-square border-[3px] transition-colors duration-200 hover:bg-black"
   : "group flex flex-col justify-center items-center p-4 bg-white rounded-lg border-black aspect-square border-[3px] transition-colors duration-200 hover:bg-black";
 
  const titleClasses = variant === 'dark'
    ? "text-lg font-semibold text-white transition-colors"
    : "text-lg font-semibold text-black transition-colors group-hover:text-white";
 
  return (
    <motion.article
      className={cardClasses}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      >
      {iconType === 'react' && iconComponent ? (
        <div className="mb-5 flex items-center justify-center w-14 h-14">
          {React.createElement(iconComponent, {
            className:
              variant === 'dark'
                ? "w-10 h-10 text-white"
                : "w-10 h-10 text-black group-hover:text-white transition-colors duration-200"
          })}
        </div>
      ) : iconType === 'svg' ? (
        <div className="mb-5 flex items-center justify-center w-14 h-14 [&>svg]:w-10 [&>svg]:h-10 [&>svg]:mb-0 filter transition-all duration-200 group-hover:invert">
           <div
             dangerouslySetInnerHTML={{
               __html: icon || "",
             }}
           />
         </div>
      ) : (
        <div className="flex justify-center items-center mb-5 w-14 h-14">
           <div className={variant === 'dark'
            ? "text-lg font-bold text-white"
            : "text-xl font-bold text-black transition-colors duration-200 group-hover:text-white"
           }>
             {iconText}
           </div>
         </div>
      )}
       <h3 className={titleClasses}>{title}</h3>
    </motion.article>
   );
 }
