const mongoose = require('mongoose');
const Project = require('./models/Project');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log("Connected to MongoDB.");
    
    const projects = await Project.find();
    console.log(JSON.stringify(projects, null, 2));
    
    process.exit(0);
}).catch(err => {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
});
