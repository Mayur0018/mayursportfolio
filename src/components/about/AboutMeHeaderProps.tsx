import { motion } from "framer-motion";

interface AboutMeHeaderProps {
  className?: string;
}

export default function AboutMeHeader({ className = "" }: AboutMeHeaderProps) {
  return (
    <motion.header 
      className={`flex flex-wrap gap-4 items-start py-5 w-full text-3xl tracking-tighter leading-none text-slate-100 whitespace-nowrap max-md:max-w-full ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2 className="text-slate-100">
        About
      </h2>
      <h2 className="font-extrabold text-blue-400">
        Me
      </h2>
    </motion.header>
  );
}
