const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const checkProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const projects = await Project.find({});
    console.log('Total Projects in DB:', projects.length);
    console.log('Projects:', JSON.stringify(projects, null, 2));

    process.exit(0);
  } catch (error) {
    console.error('Error checking projects:', error.message);
    process.exit(1);
  }
};

checkProjects();
