"use client";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

import mayurposhak from "../../assets/mayurposhak.png";
import skullcandy from "../../assets/skullcandy.png";
import doctorbooking from "../../assets/healthbuddy.png";

const projectsData = [
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
      className="text-white bg-black min-h-screen"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="px-6 md:px-20 py-20 mx-auto max-w-7xl">
        <motion.header
          className="mb-24 text-center"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl font-light">
            My <span className="font-bold">Projects</span>
          </h1>
        </motion.header>

        {/* Projects */}
        <div className="flex flex-col space-y-32">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={index}
              number={project.number}
              title={project.title}
              description={project.description}
              imageSrc={project.imageSrc}
              imageAlt={project.imageAlt}
              imagePosition={project.imagePosition}
              liveUrl={project.liveUrl}
            />
          ))}
        </div>

      </div>
    </motion.section>
  );
};

export default ProjectsSection;
