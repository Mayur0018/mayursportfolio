import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

interface AboutMeContentProps {
  className?: string;
}

export default function AboutMeContent({ className = "" }: AboutMeContentProps) {
  const { data: config } = useQuery({
    queryKey: ['config'],
    queryFn: async () => {
      const { data } = await api.get('/config');
      return data;
    }
  });

  const defaultSubtitle = "Curious about me? Here you have it:";
  const subtitle = config?.aboutMe?.subtitle || defaultSubtitle;
  
  const defaultAbout = "I'm a passionate, self-proclaimed designer who specializes in full stack development (React.js & Node.js). I am very enthusiastic about bringing the technical and visual aspects of digital products to life. User experience, pixel perfect design, and writing clear, readable, highly performant code matters to me.";
  const text = config?.aboutMe?.text || defaultAbout;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className={`flex flex-col gap-6 w-full ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { transition: { staggerChildren: 0.2 } }
      }}
    >
      <motion.h3 className="text-xl font-bold text-slate-100" variants={itemVariants}>
        {subtitle}
      </motion.h3>

      <motion.p className="text-slate-400 max-md:max-w-full" variants={itemVariants}>
        {text}
      </motion.p>
      <motion.p className="mt-5 text-slate-400 max-md:max-w-full" variants={itemVariants}>
        I began my journey as a web developer in 2015, and since then,
        I've continued to grow and evolve as a developer, taking on new
        challenges and learning the latest technologies along the way.
        Now, in my early thirties, 7 years after starting my web
        development journey, I'm building cutting-edge web applications
        using modern technologies such as Next.js, TypeScript, Nestjs,
        Tailwindcss, Supabase and much more.
      </motion.p>
      <motion.p className="mt-5 text-slate-400 max-md:max-w-full" variants={itemVariants}>
        When I'm not in full-on developer mode, you can find me hovering
        around on twitter or on indie hacker, witnessing the journey of
        early startups or enjoying some free time. You can follow me on
        Twitter where I share tech-related bites and build in public, or
        you can follow me on GitHub.
      </motion.p>
    </motion.div>
  );
}
