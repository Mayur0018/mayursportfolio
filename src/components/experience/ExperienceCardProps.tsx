import React from 'react';
import { motion } from 'framer-motion';
import CompanyLogo from './CompanyLogoProps';

interface ExperienceCardProps {
  company: string;
  title: string;
  period: string;
  description: string;
  highlighted?: boolean;
}

 const ExperienceCard: React.FC<ExperienceCardProps> = ({
  company,
  title,
  period,
  description,
  highlighted = false,
}) => {
  return (
    <motion.article
      className={`p-12 rounded-2xl border border-solid border-zinc-800 max-sm:p-6 ${highlighted ? 'bg-zinc-900' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <header className="flex justify-between items-start mb-6 max-sm:flex-col max-sm:gap-4">
        <div className="flex gap-4 items-center">
          <CompanyLogo company={company} />
          <h2 className="text-2xl font-semibold leading-tight text-white">
            {title}
          </h2>
        </div>
        <time className="text-base font-medium leading-normal text-neutral-400">
          {period}
        </time>
      </header>
      <p className="text-base leading-relaxed text-stone-300">{description}</p>
    </motion.article>
  );
};
export default ExperienceCard;
