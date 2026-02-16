"use client";
import Header  from "./components/header/Header";
import HeroSection from "./components/hero/HeroSection";
import MySkills from "./components/skills/MySkills";
import ExperienceSection from "./components/experience/ExperienceData";
import AboutMe from "./components/about/AboutMe";
import ProjectsSection from "./components/Projects/projectsData";
import ContactForm from "./components/contact/ContactForm";
import Footer from "./components/footer/Footer";
import Testimonial from "./components/testimonial/Testimonial";
import Background3D from "./components/background/Background3D";
export default function app() {

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      />
      <div className="relative w-full bg-white min-h-screen overflow-x-hidden">
        <Background3D />
        <div className="relative z-10">
          <Header />
          <HeroSection />
          <MySkills />
          <ExperienceSection />
          <AboutMe />
          <ProjectsSection />
          <Testimonial />
          <ContactForm />
          <Footer />
        </div>
      </div>
    </>
  );
}
