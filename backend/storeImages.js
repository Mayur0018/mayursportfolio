const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config({ path: path.join(__dirname, '.env') });

const imagesToStore = [
  { title: "Mayur Poshak – Ecommerce Website", fileName: "mayurposhak.png" },
  { title: "Skull Candy – Product Landing Website", fileName: "skullcandy.png" },
  { title: "Doctor Appointment Booking System", fileName: "healthbuddy.png" }
];

const convertAndStore = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for image conversion...');

    for (const item of imagesToStore) {
      const filePath = path.join(__dirname, '..', 'src', 'assets', item.fileName);
      
      if (fs.existsSync(filePath)) {
        const base64Image = fs.readFileSync(filePath, { encoding: 'base64' });
        const dataUrl = `data:image/png;base64,${base64Image}`;
        
        await Project.findOneAndUpdate(
          { title: item.title },
          { imageSrc: dataUrl },
          { upsert: true }
        );
        console.log(`Stored image for: ${item.title}`);
      } else {
        console.warn(`File not found: ${filePath}`);
      }
    }

    console.log('All original images are now stored in your database!');
    process.exit(0);
  } catch (error) {
    console.error('Error storing images:', error.message);
    process.exit(1);
  }
};

convertAndStore();
