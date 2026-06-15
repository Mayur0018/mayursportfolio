const mongoose = require('mongoose');

const siteConfigSchema = mongoose.Schema(
  {
    siteName: { type: String, default: 'MN.' },
    logo: { type: String, default: '' },
    heroTitle: { type: String, default: 'Building digital products, brands, and experience.' },
    heroSubtitle: { type: String, default: 'A Passionate Full Stack Developer based in India' },
    contactEmail: { type: String, default: 'mayurnishad45@gmail.com' },
    socials: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      instagram: { type: String, default: '' },
    },
    aboutMe: {
      title: { type: String, default: 'About Me' },
      subtitle: { type: String, default: 'Curious about me? Here you have it:' },
      text: { type: String, default: '' },
      image: { type: String, default: '' },
    },
    profile: {
      name: { type: String, default: 'Mayur Nishad' },
      title: { type: String, default: 'Full Stack Developer' },
      location: { type: String, default: 'India' },
      bio: { type: String, default: 'Building digital products, brands, and experience.' },
      avatar: { type: String, default: '' },
      stats: {
        posts: { type: String, default: '12' },
        followers: { type: String, default: '1.2k' },
        following: { type: String, default: '450' }
      }
    }
  },
  { timestamps: true }
);

const SiteConfig = mongoose.model('SiteConfig', siteConfigSchema);
module.exports = SiteConfig;
