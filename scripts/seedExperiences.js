require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || process.env.NEXT_PUBLIC_MONGO_URI;
if (!MONGO_URI) {
  console.error('MONGO_URI not set in environment');
  process.exit(1);
}

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Experience = mongoose.models.Experience || mongoose.model('Experience', experienceSchema);

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

async function seed() {
  await mongoose.connect(MONGO_URI, { bufferCommands: false });
  const count = await Experience.countDocuments();
  if (count > 0) {
    console.log(`Experience collection already has ${count} documents. Skipping seed.`);
    process.exit(0);
  }

  await Experience.insertMany(defaultExperiences);
  console.log('Inserted default experiences.');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
