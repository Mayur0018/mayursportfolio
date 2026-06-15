import { motion } from "framer-motion";

export default function ContactInfo() {
  return (
    <motion.section 
      className="flex flex-col justify-center"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <div className="space-y-6">
        <header className="text-slate-100">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
            Let&apos;s talk for <br />
            <span className="text-red-400">Something special</span>
          </h2>
        </header>
        <p className="text-sm md:text-base leading-relaxed text-slate-400 max-w-md">
          I seek to push the limits of creativity to create high-engaging,
          user-friendly, and memorable interactive experiences.
        </p>
        
        <div className="pt-6 space-y-4">
          <motion.a 
            href="mailto:mayurnish18@gmail.com" 
            className="text-base md:text-lg font-semibold text-slate-200 hover:text-red-400 transition-colors block"
            whileHover={{ x: 5 }}
          >
            mayurnish18@gmail.com
          </motion.a>
          <motion.a 
            href="tel:9106481092" 
            className="text-base md:text-lg font-semibold text-slate-200 hover:text-red-400 transition-colors block"
            whileHover={{ x: 5 }}
          >
            +91 91064 81092
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
}
