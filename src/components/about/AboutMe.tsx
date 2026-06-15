import AboutMeHeader from "./AboutMeHeaderProps";
import AboutMeContent from "./AboutMeContentProps";
import AboutMeImage from "./AboutMeImageProps";
import { motion } from "framer-motion";

export function AboutMe() {
  return (
    <motion.section
      id="about"
      className="flex overflow-hidden justify-center items-center px-4 py-8 max-md:px-2"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="flex flex-col gap-6 w-full glass-panel rounded-2xl p-6 md:p-10 border border-white/5 shadow-xl">
        <div className="flex flex-wrap gap-10 justify-between items-center w-full">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="shrink-0"
          >
            <AboutMeImage />
          </motion.div>
          <motion.div
            className="flex-1 min-w-0 w-full md:min-w-[300px]"
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <AboutMeHeader />
            <AboutMeContent />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default AboutMe;
