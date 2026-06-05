"use client";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

import mayurposhak from "../../assets/mayurposhak.png";
import skullcandy from "../../assets/skullcandy.png";
import doctorbooking from "../../assets/healthbuddy.png";

interface Project {
  number: string;
  title: string;
  description: string | string[];
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  liveUrl: string;
}

const projectsData: Project[] = [
  {
    number: "01",
    title: "Mayur Poshak – Ecommerce Website",
    description:
      "A full-featured ecommerce application with cart system, authentication, and responsive UI built using React and Tailwind CSS.",
    imageSrc: mayurposhak,
    imageAlt: "Mayur Poshak Ecommerce",
    imagePosition: "left",
    liveUrl: "https://mayur-poshak-ifcj.vercel.app/",
  },
  {
    number: "02",
    title: "Skull Candy – Product Landing Website",
    description:
      "A modern product landing page with clean UI and responsive layout built using React and Tailwind CSS.",
    imageSrc: skullcandy,
    imageAlt: "Skull Candy Website",
    imagePosition: "right",
    liveUrl: "https://skull-candy-je8x.vercel.app/",
  },
  {
    number: "03",
    title: "Doctor Appointment Booking System",
    description:
      "A doctor appointment booking platform with authentication, scheduling system, and backend integration using MERN stack.",
    imageSrc: doctorbooking,
    imageAlt: "Doctor Appointment Booking",
    imagePosition: "left",
    liveUrl: "https://doctor-appointment-booking-pink.vercel.app/",
  },
];

const ProjectsSection = () => {
  return (
    <motion.section
      id="project"
      className="flex flex-col items-center px-4 py-8 w-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="w-full glass-panel rounded-2xl p-6 md:p-10 border border-white/5 shadow-xl">
        <motion.header
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100">
            My <span className="text-blue-400">Projects</span>
          </h2>
          <p className="text-slate-400 mt-2 text-sm">A collection of my recent work and side projects</p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.number}
              {...project}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectsSection;
