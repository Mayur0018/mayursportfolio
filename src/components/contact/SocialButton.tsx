import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

interface SocialButtonProps {
  company?: 'github' | 'linkedin' | 'twitter';
  onClick?: () => void;
  href?: string;
}

const companyIcons = {
  github: { icon: FaGithub, link: 'https://github.com/mayur0018', color: 'hover:text-white hover:bg-slate-800' },
  linkedin: { icon: FaLinkedin, link: 'https://www.linkedin.com/in/mayur-nishad-bb0751236/?skipRedirect=true', color: 'hover:text-red-400 hover:bg-blue-400/10' },
  twitter: { icon: FaTwitter, link: 'https://twitter.com', color: 'hover:text-blue-300 hover:bg-blue-300/10' },
};

export default function SocialButton({ company, onClick, href }: SocialButtonProps) {
  const Icon = company ? companyIcons[company].icon : null;
  const targetHref = href || (company ? companyIcons[company].link : '#');
  const hoverStyles = company ? companyIcons[company].color : 'hover:bg-white/10';

  const baseClasses = `flex items-center justify-center w-12 h-12 rounded-xl border border-white/10 glass transition-all duration-300 active:scale-90 ${hoverStyles} text-slate-400`;

  if (targetHref) {
    return (
      <a
        href={targetHref}
        target="_blank"
        rel="noreferrer"
        className={baseClasses}
      >
        {Icon && <Icon size={20} />}
      </a>
    );
  }

  return (
    <button
      className={baseClasses}
      onClick={onClick}
      type="button"
    >
      {Icon && <Icon size={20} />}
    </button>
  );
}
