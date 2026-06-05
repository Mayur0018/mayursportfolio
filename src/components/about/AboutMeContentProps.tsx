import { motion } from "framer-motion";

interface AboutMeContentProps {
  className?: string;
}

export default function AboutMeContent({ className = "" }: AboutMeContentProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.article 
      className={`flex flex-col justify-center mt-5 max-w-full text-base tracking-wide leading-6 text-slate-400 w-[610px] ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.p className="text-slate-400 max-md:max-w-full" variants={itemVariants}>
        I'm a passionate, self-proclaimed designer who specializes in full
        stack development (React.js & Node.js). I am very enthusiastic
        about bringing the technical and visual aspects of digital
        products to life. User experience, pixel perfect design, and
        writing clear, readable, highly performant code matters to me.
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
    </motion.article>
  );
}
