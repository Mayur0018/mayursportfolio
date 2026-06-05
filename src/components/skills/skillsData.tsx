import React from "react";
import { motion } from "framer-motion";
import  SkillCard  from "./SkillCard";
import { SiReact, SiNodedotjs, SiTailwindcss, SiMongodb, SiCss3, SiHtml5, SiJavascript, SiFigma, SiGit, SiNextdotjs } from "react-icons/si";
 
 type SkillItem = {
  title: string;
  variant: 'light' | 'dark';
  iconType: 'react';
  iconComponent: React.ElementType;
};

 const skillsData: SkillItem[] = [
  { title: "React", variant: 'light' as const, iconType: 'react' as const, iconComponent: SiReact },
  { title: "Node.js", variant: 'light' as const, iconType: 'react' as const, iconComponent: SiNodedotjs },
  { title: "Tailwind CSS", variant: 'light' as const, iconType: 'react' as const, iconComponent: SiTailwindcss },
  { title: "CSS", variant: 'light' as const, iconType: 'react' as const, iconComponent: SiCss3 },
  { title: "MongoDB", variant: 'light' as const, iconType: 'react' as const, iconComponent: SiMongodb },
  { title: "HTML", variant: 'light' as const, iconType: 'react' as const, iconComponent: SiHtml5 },
  { title: "JavaScript", variant: 'light' as const, iconType: 'react' as const, iconComponent: SiJavascript },
  { title: "Figma", variant: 'light' as const, iconType: 'react' as const, iconComponent: SiFigma },
  { title: "Git", variant: 'light' as const, iconType: 'react' as const, iconComponent: SiGit },
  { title: "Next.js", variant: 'light' as const, iconType: 'react' as const, iconComponent: SiNextdotjs },
];
 
export default function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      id="skills"
      className="flex flex-col justify-start items-center px-4 py-8 w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="w-full glass-panel rounded-2xl p-6 md:p-10 border border-white/5 shadow-xl">
        <motion.header
          className="mb-10 text-center"
          variants={itemVariants}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100">
            Technical <span className="text-blue-400">Toolkit</span>
          </h2>
          <p className="text-slate-400 mt-2 text-sm">Technologies I use to bring ideas to life</p>
        </motion.header>
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          variants={containerVariants}
        >
          {skillsData.map((skill, index) => (
            <motion.div key={`${skill.title}-${index}`} variants={itemVariants}>
              <SkillCard
                title={skill.title}
                icon={""}
                variant="dark"
                iconType={skill.iconType}
                iconText={""}
                iconComponent={skill.iconComponent}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
 }
