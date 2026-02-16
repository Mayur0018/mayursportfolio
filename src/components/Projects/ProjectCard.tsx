import { motion } from "framer-motion";
import ProjectImage from "./ProjectImage";

interface ProjectCardProps {
  number: string;
  title: string;
  description: string | string[];
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  liveUrl: string;
}

export default function ProjectCard({
  number,
  title,
  description,
  imageSrc,
  imageAlt,
  imagePosition,
  liveUrl,
}: ProjectCardProps) {

  const isLeft = imagePosition === "left";

  const renderDescription = () => {
    if (Array.isArray(description)) {
      return description.map((text, index) => (
        <p
          key={`${number}-desc-${index}`}
          className="text-neutral-400 mb-4 leading-relaxed"
        >
          {text}
        </p>
      ));
    }

    return (
      <p className="text-neutral-400 mb-6 leading-relaxed">
        {description}
      </p>
    );
  };

  return (
    <motion.article
      className="flex items-center gap-16 max-lg:flex-col"
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Image */}
      <div
        className={`flex-1 ${
          isLeft ? "order-1" : "order-2 max-lg:order-1"
        }`}
      >
        <ProjectImage src={imageSrc} alt={imageAlt} />
      </div>

      {/* Content */}
      <div
        className={`flex-1 ${
          isLeft ? "order-2" : "order-1 max-lg:order-2"
        }`}
      >
        <div className="text-5xl font-bold mb-6">{number}</div>

        <h2 className="text-3xl font-semibold mb-6">{title}</h2>

        {renderDescription()}

        <motion.a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-white hover:bg-white hover:text-black transition"
          whileHover={{ rotate: 10, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          →
        </motion.a>
      </div>
    </motion.article>
  );
}
