const SiteConfig = require('../models/SiteConfig');

// @desc    Get site config
// @route   GET /api/config
// @access  Public
const getConfig = async (req, res) => {
  try {
    let config = await SiteConfig.findOne({});
    if (!config) {
      config = await SiteConfig.create({});
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update site config
// @route   PUT /api/config
// @access  Private/Admin
const updateConfig = async (req, res) => {
  try {
    let config = await SiteConfig.findOne({});
    if (config) {
      config.siteName = req.body.siteName || config.siteName;
      config.logo = req.body.logo || config.logo;
      config.heroTitle = req.body.heroTitle || config.heroTitle;
      config.heroSubtitle = req.body.heroSubtitle || config.heroSubtitle;
      config.contactEmail = req.body.contactEmail || config.contactEmail;
      config.socials = req.body.socials || config.socials;
      config.aboutMe = req.body.aboutMe || config.aboutMe;
      config.profile = req.body.profile || config.profile;

      const updatedConfig = await config.save();
      res.json(updatedConfig);
    } else {
      const newConfig = await SiteConfig.create(req.body);
      res.status(201).json(newConfig);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getConfig, updateConfig };
