import connectMongo from '../lib/mongodb';
import SiteConfig from '../models/SiteConfig';

export async function getConfigService() {
  await connectMongo();
  let config = await SiteConfig.findOne({});
  if (!config) config = await SiteConfig.create({});
  return config;
}

export async function updateConfigService(data: any) {
  await connectMongo();
  let config = await SiteConfig.findOne({});
  if (config) {
    config.siteName = data.siteName || config.siteName;
    config.logo = data.logo || config.logo;
    config.heroTitle = data.heroTitle || config.heroTitle;
    config.heroSubtitle = data.heroSubtitle || config.heroSubtitle;
    config.contactEmail = data.contactEmail || config.contactEmail;
    config.socials = data.socials || config.socials;
    config.aboutMe = data.aboutMe || config.aboutMe;
    config.profile = data.profile || config.profile;
    return config.save();
  }
  const newConfig = await SiteConfig.create(data);
  return newConfig;
}
