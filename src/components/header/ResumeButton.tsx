 

interface ResumeButtonProps {
  className?: string;
  onClick?: () => void;
  href?: string;
}

export default function ResumeButton({ className = "", onClick, href = "/resume.pdf" }: ResumeButtonProps) {
  if (href) {
    return (
      <a
        href={href}
        download
        className={`flex gap-2 items-center px-6 py-3 text-white bg-black rounded-lg cursor-pointer max-sm:hidden hover:bg-gray-800 transition-colors ${className}`}
      >
        <span className="text-base font-medium">Resume</span>
        <i className="ti ti-download text-xl" />
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      className={`flex gap-2 items-center px-6 py-3 text-white bg-black rounded-lg cursor-pointer max-sm:hidden hover:bg-gray-800 transition-colors ${className}`}
    >
      <span className="text-base font-medium">Resume</span>
      <i className="ti ti-download text-xl" />
    </button>
  );
}
