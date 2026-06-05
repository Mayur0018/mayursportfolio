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
      className="flex flex-col items-center px-4 py-8 w-full"
    >
      <div className="w-full glass-panel rounded-2xl p-6 md:p-10 border border-white/5 shadow-xl">
        <header className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100">
            Professional <span className="text-blue-400">Journey</span>
          </h2>
          <p className="text-slate-400 mt-2 text-sm">Where I've been and what I've built</p>
        </header>

        <div className="flex flex-col max-w-3xl mx-auto">
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
      </div>
    </section>
  );
};

export default ExperienceSection;
