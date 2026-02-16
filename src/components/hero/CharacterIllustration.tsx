import React from 'react';
import { motion } from 'framer-motion';
import heroimg from "../../assets/heroimg.svg"
const CharacterIllustration: React.FC = () => {
  return (
    <motion.figure
      className="flex relative flex-1 justify-center items-center max-md:w-full"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ rotateZ: -1, scale: 1.02 }}
    >
      <img src={heroimg} alt="Hero illustration" className="w-full max-w-full md:max-w-full h-auto" />
    </motion.figure>
  );
};


export default CharacterIllustration
