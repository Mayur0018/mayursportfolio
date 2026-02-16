import AboutMeHeader from "./AboutMeHeaderProps";
import AboutMeContent from "./AboutMeContentProps";
import AboutMeImage from "./AboutMeImageProps";
import { motion } from "framer-motion";

export function AboutMe() {
  return (
    <motion.section
      id="about"
      className="flex overflow-hidden justify-center items-center px-20 py-16 max-md:px-5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="flex overflow-hidden flex-wrap gap-10 justify-between items-center w-full max-w-screen-xl px-8 my-auto max-md:px-5">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <AboutMeImage />
        </motion.div>
        <motion.div
          className="self-stretch my-auto w-full md:w-[610px] max-md:max-w-full"
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <AboutMeHeader />
          <AboutMeContent />
        </motion.div>
      </div>
    </motion.section>
  );
}

export default AboutMe;
