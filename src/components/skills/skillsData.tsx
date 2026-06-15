
import { motion } from "framer-motion";
import  SkillCard  from "./SkillCard";
import { SiReact, SiNodedotjs, SiTailwindcss, SiMongodb, SiCss3, SiHtml5, SiJavascript, SiFigma, SiGit, SiNextdotjs } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

 const defaultSkills = [
  { name: "React", iconComponent: SiReact },
  { name: "Node.js", iconComponent: SiNodedotjs },
  { name: "Tailwind CSS", iconComponent: SiTailwindcss },
  { name: "CSS", iconComponent: SiCss3 },
  { name: "MongoDB", iconComponent: SiMongodb },
  { name: "HTML", iconComponent: SiHtml5 },
  { name: "JavaScript", iconComponent: SiJavascript },
  { name: "Figma", iconComponent: SiFigma },
  { name: "Git", iconComponent: SiGit },
  { name: "Next.js", iconComponent: SiNextdotjs },
];

const iconMap: Record<string, any> = {
  "React": SiReact,
  "Node.js": SiNodedotjs,
  "Tailwind CSS": SiTailwindcss,
  "CSS": SiCss3,
  "MongoDB": SiMongodb,
  "HTML": SiHtml5,
  "JavaScript": SiJavascript,
  "Figma": SiFigma,
  "Git": SiGit,
  "Next.js": SiNextdotjs,
};
 
export default function SkillsSection() {
  const { data: skills, isLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data } = await api.get('/skills');
      return data;
    }
  });

  const displayData = skills && skills.length > 0 ? skills : defaultSkills;

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

  if (isLoading) return null;

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
            Technical <span className="text-red-400">Toolkit</span>
          </h2>
          <p className="text-slate-400 mt-2 text-sm">Technologies I use to bring ideas to life</p>
        </motion.header>
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          variants={containerVariants}
        >
          {displayData.map((skill: any, index: number) => (
            <motion.div key={skill._id || index} variants={itemVariants}>
              <SkillCard
                title={skill.name}
                icon={""}
                variant="dark"
                iconType="react"
                iconText={""}
                iconComponent={iconMap[skill.name] || SiReact}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
 }
