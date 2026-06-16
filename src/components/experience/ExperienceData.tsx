import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";
import ExperienceCard from "./ExperienceCardProps";



const defaultExperiences = [
  {
    company: "codage" as const,
    role: "Frontend Engineer at Codage Habitation",
    duration: "April 2024 - October 2024",
    description:
      "Worked as a Frontend Engineer developing responsive and scalable web applications using React and Tailwind CSS. Collaborated with backend teams to integrate REST APIs and improve application performance.",
  },
  {
    company: "abbacus" as const,
    role: "Web Designer at Abbacus Technologies",
    duration: "November 2025 - December 2025",
    description:
      "Designed modern and user-focused web interfaces. Created UI/UX layouts, responsive designs, and improved visual consistency across projects using design systems and frontend technologies.",
  },
  {
    company: "webscluds" as const,
    role: "Full Stack Developer at Webs Cluds",
    duration: "December 2025 - Present",
    description:
      "Currently working as a Full Stack Developer building scalable MERN stack applications. Responsible for frontend architecture, backend API development, authentication systems, and database management using MongoDB.",
  },
];

export const ExperienceSection: React.FC = () => {
  const { data: experiences, isLoading } = useQuery({
    queryKey: ['experiences'],
    queryFn: async () => {
      const { data } = await api.get('/experience');
      return data;
    }
  });

  // Use API data if it's an array (even if empty). Only fall back to defaults
  // when the API response is not available (undefined/null or non-array).
  const displayData = Array.isArray(experiences) ? experiences : defaultExperiences;

  if (isLoading) return null;

  return (
    <section
      id="experience"
      className="flex flex-col items-center px-4 py-8 w-full"
    >
      <div className="w-full glass-panel rounded-2xl p-6 md:p-10 border border-white/5 shadow-xl">
        <header className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100">
            Professional <span className="text-red-400">Journey</span>
          </h2>
          <p className="text-slate-400 mt-2 text-sm">Where I've been and what I've built</p>
        </header>

        <div className="flex flex-col max-w-3xl mx-auto">
          {displayData.map((exp: any, index: number) => (
            <ExperienceCard
              key={exp._id || index}
              company={exp.company}
              title={exp.role}
              period={exp.duration}
              description={exp.description}
              highlighted={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
