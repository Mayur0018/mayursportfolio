import React from "react";
import ExperienceCard from "./ExperienceCardProps";

const experienceData = [
  {
    company: "codage" as const,
    title: "Frontend Engineer at Codage Habitation",
    period: "April 2024 - October 2024",
    description:
      "Worked as a Frontend Engineer developing responsive and scalable web applications using React and Tailwind CSS. Collaborated with backend teams to integrate REST APIs and improve application performance.",
    highlighted: false,
  },
  {
    company: "abbacus" as const,
    title: "Web Designer at Abbacus Technologies",
    period: "November 2025 - December 2025",
    description:
      "Designed modern and user-focused web interfaces. Created UI/UX layouts, responsive designs, and improved visual consistency across projects using design systems and frontend technologies.",
    highlighted: false,
  },
  {
    company: "webscluds" as const,
    title: "Full Stack Developer at Webs Cluds",
    period: "December 2025 - Present",
    description:
      "Currently working as a Full Stack Developer building scalable MERN stack applications. Responsible for frontend architecture, backend API development, authentication systems, and database management using MongoDB.",
    highlighted: true,
  },
];

export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="flex flex-col items-center px-5 py-20 bg-black min-h-screen max-sm:px-4 max-sm:py-10"
    >
      <header className="mb-20 text-4xl font-bold leading-tight text-white max-sm:mb-10 max-sm:text-4xl">
        <h1>
          <span>My</span> Experience
        </h1>
      </header>

      <div className="flex flex-col gap-8 w-full max-w-[1096px]">
        {experienceData.map((experience, index) => (
          <ExperienceCard
            key={`${experience.company}-${index}`}
            company={experience.company}
            title={experience.title}
            period={experience.period}
            description={experience.description}
            highlighted={experience.highlighted}
          />
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
