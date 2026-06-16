import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import api from "../../api/api";

import mayurposhak from "../../assets/mayurposhak.png";
import skullcandy from "../../assets/skullcandy.png";
import doctorbooking from "../../assets/healthbuddy.png";

interface Project {
  _id?: string;
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  liveUrl: string;
}

const defaultProjects: Project[] = [
  {
    number: "01",
    title: "Mayur Poshak – Ecommerce Website",
    description:
      "A full-featured ecommerce application with cart system, authentication, and responsive UI built using React and Tailwind CSS.",
    imageSrc: mayurposhak.src,
    imageAlt: "Mayur Poshak Ecommerce",
    imagePosition: "left",
    liveUrl: "https://mayur-poshak.vercel.app/",
  },
  {
    number: "02",
    title: "Skull Candy – Product Landing Website",
    description:
      "A modern product landing page with clean UI and responsive layout built using React and Tailwind CSS.",
    imageSrc: skullcandy.src,
    imageAlt: "Skull Candy Website",
    imagePosition: "right",
    liveUrl: "https://skull-candy-je8x.vercel.app/",
  },
  {
    number: "03",
    title: "Doctor Appointment Booking System",
    description:
      "A doctor appointment booking platform with authentication, scheduling system, and backend integration using MERN stack.",
    imageSrc: doctorbooking.src,
    imageAlt: "Doctor Appointment Booking",
    imagePosition: "left",
    liveUrl: "https://doctor-appointment-booking-pink.vercel.app/",
  },
];

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching projects from backend...");
        const { data } = await api.get("/projects");
        console.log("Projects data received:", data);
        
        if (data && Array.isArray(data) && data.length > 0) {
          // No more mapping needed, everything is in the DB
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects from backend:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 w-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

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
            My <span className="text-red-400">Projects</span>
          </h2>
          <p className="text-slate-400 mt-2 text-sm">A collection of my recent work and side projects</p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project._id || project.number}
              {...project}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectsSection;
