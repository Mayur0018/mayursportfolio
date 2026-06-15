const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ number: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res) => {
  try {
    console.log('Create Project Request Body:', req.body);
    const { number, title, description, imageSrc, imageAlt, imagePosition, liveUrl } = req.body;
    const project = await Project.create({
      number: number || "00",
      title,
      description,
      imageSrc,
      imageAlt: imageAlt || title,
      imagePosition: imagePosition || 'left',
      liveUrl,
    });
    res.status(201).json(project);
  } catch (error) {
    console.error('Create Project Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      project.number = req.body.number || project.number;
      project.title = req.body.title || project.title;
      project.description = req.body.description || project.description;
      project.imageSrc = req.body.imageSrc || project.imageSrc;
      project.imageAlt = req.body.imageAlt || project.imageAlt;
      project.imagePosition = req.body.imagePosition || project.imagePosition;
      project.liveUrl = req.body.liveUrl || project.liveUrl;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      await project.deleteOne();
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProjects, createProject, updateProject, deleteProject };
