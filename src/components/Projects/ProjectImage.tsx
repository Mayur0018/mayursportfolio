import React from "react";
import { motion } from "framer-motion";

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ProjectImage: React.FC<ProjectImageProps> = ({
  src,
  alt,
  className = "",
}) => {
  return (
    <motion.div
      className={`rounded-2xl overflow-hidden shadow-xl ${className}`}
      whileHover={{ scale: 1.02, rotateZ: -0.5 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover"
      />
    </motion.div>
  );
};

export default ProjectImage;
