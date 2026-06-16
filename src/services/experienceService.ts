import connectMongo from '../lib/mongodb';
import Experience from '../models/Experience';

const defaultExperiences = [
  {
    company: 'codage',
    role: 'Frontend Engineer at Codage Habitation',
    duration: 'April 2024 - October 2024',
    description:
      'Worked as a Frontend Engineer developing responsive and scalable web applications using React and Tailwind CSS. Collaborated with backend teams to integrate REST APIs and improve application performance.',
  },
  {
    company: 'abbacus',
    role: 'Web Designer at Abbacus Technologies',
    duration: 'November 2025 - December 2025',
    description:
      'Designed modern and user-focused web interfaces. Created UI/UX layouts, responsive designs, and improved visual consistency across projects using design systems and frontend technologies.',
  },
  {
    company: 'webscluds',
    role: 'Full Stack Developer at Webs Cluds',
    duration: 'December 2025 - Present',
    description:
      'Currently working as a Full Stack Developer building scalable MERN stack applications. Responsible for frontend architecture, backend API development, authentication systems, and database management using MongoDB.',
  },
];

export async function getExperiencesService() {
  await connectMongo();
  return Experience.find({}).sort({ order: 1 });
}

export async function ensureDefaultExperiences() {
  await connectMongo();
  const count = await Experience.countDocuments();
  if (count === 0) {
    return Experience.insertMany(defaultExperiences);
  }
  return [];
}

export async function createExperienceService(data: any) {
  await connectMongo();
  return Experience.create(data);
}

export async function updateExperienceService(id: string, data: any) {
  await connectMongo();
  return Experience.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteExperienceService(id: string) {
  await connectMongo();
  await Experience.findByIdAndDelete(id);
  return { message: 'Experience removed' };
}
