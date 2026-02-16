import React from 'react';
import { motion } from 'framer-motion';
import SocialIcons from './SocialIcon';

interface PersonalIntroProps {
  name?: string;
  title?: string;
  location?: string;
  description?: string;
}

 const PersonalIntro: React.FC<PersonalIntroProps> = ({
  name = "Mayur Nishad",
  title = "Frontend Developer",
  location = "India",
  description = "I'm Evren Shah Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to specimen book."
}) => {
  return (
    <motion.section
      className="flex-1 max-md:w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <header className="mb-10">
        <p className="mb-6 text-2xl md:text-3xl lg:text-4xl leading-relaxed text-black max-w-[820px]">
          <span>Hello I&apos;m </span>
          <span className="font-bold">{name}</span>
          <span>. </span>
          <span className="font-bold">{title}</span>
          <span>. </span>
          <span>Based in </span>
          <span className="font-bold">{location}</span>
          <span>.</span>
        </p>
      </header>

      <p className="mb-16 text-base leading-relaxed max-w-[520px] text-stone-500">
        {description}
      </p>

      <SocialIcons />
    </motion.section>
  );
};
export default PersonalIntro
