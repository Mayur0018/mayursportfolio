const Content = require('../models/Content');

const getAllContent = async (req, res) => {
  try {
    const content = await Content.find({}).sort({ date: -1, order: 1 });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createContent = async (req, res) => {
  try {
    const content = await Content.create(req.body);
    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteContent = async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);
    res.json({ message: 'Content removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllContent, createContent, updateContent, deleteContent };
