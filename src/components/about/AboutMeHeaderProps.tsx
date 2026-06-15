import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

interface AboutMeHeaderProps {
  className?: string;
}

export default function AboutMeHeader({ className = "" }: AboutMeHeaderProps) {
  const { data: config } = useQuery({
    queryKey: ['config'],
    queryFn: async () => {
      const { data } = await api.get('/config');
      return data;
    }
  });

  const fullTitle = config?.aboutMe?.title || "About Me";
  const titleParts = fullTitle.split(" ");
  const firstPart = titleParts[0];
  const lastPart = titleParts.slice(1).join(" ");

  return (
    <motion.header 
      className={`flex flex-wrap gap-4 items-start py-5 w-full text-3xl tracking-tighter leading-none text-slate-100 whitespace-nowrap max-md:max-w-full ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2 className="text-slate-100">
        {firstPart}
      </h2>
      {lastPart && (
        <h2 className="font-extrabold text-blue-400">
          {lastPart}
        </h2>
      )}
    </motion.header>
  );
}
