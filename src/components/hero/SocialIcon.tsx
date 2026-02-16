import React from 'react';

interface SocialIcon {
  icon: string;
  filled?: boolean;
  href?: string;
}

interface SocialIconsProps {
  icons?: SocialIcon[];
}

const defaultIcons: SocialIcon[] = [
  { icon: 'ti-brand-facebook', filled: true, href: '#' },
  { icon: 'ti-brand-reddit', href: '#' },
  { icon: 'ti-brand-twitter', href: '#' },
  { icon: 'ti-brand-discord', href: '#' }
];

const SocialIcons: React.FC<SocialIconsProps> = ({ icons = defaultIcons }) => {
  return (
    <nav className="flex gap-4 items-center" aria-label="Social media links">
      {icons.map((socialIcon, index) => (
        <a
          key={index}
          href={socialIcon.href || '#'}
          className={`flex justify-center items-center cursor-pointer h-[60px] w-[60px] transition-colors hover:opacity-80 ${
            socialIcon.filled
              ? 'bg-black'
              : 'border-2 border-black hover:bg-black hover:text-white'
          }`}
          aria-label={`Visit our ${socialIcon.icon.replace('ti-brand-', '')} page`}
          target="_blank"
          rel="noreferrer"
        >
          <i className={`ti ${socialIcon.icon} text-3xl ${socialIcon.filled ? 'text-white' : 'text-black'}`} />
        </a>
      ))}
    </nav>
  );
};
export default SocialIcons;
