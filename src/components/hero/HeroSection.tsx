"use client";
import React from 'react';
import { motion } from 'framer-motion';
import PersonalIntro from './PersonalIntroProps';
import CharacterIllustration  from './CharacterIllustration';

 const HeroSection: React.FC = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      <motion.main
        id="home"
        className="flex justify-center items-center px-5 py-16 bg-white min-h-screen"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex gap-20 items-center w-full max-w-[1200px] max-md:flex-col max-md:gap-16">
          <PersonalIntro />
          <CharacterIllustration />
        </div>
      </motion.main>
    </>
  );
};

export default HeroSection;
