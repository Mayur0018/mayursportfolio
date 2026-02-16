interface SocialButtonProps {
  icon?: string;
  variant?: 'filled' | 'outlined';
  onClick?: () => void;
  href?: string;
}

export default function SocialButton({ icon, variant = 'outlined', onClick, href }: SocialButtonProps) {
  const baseClasses = "flex gap-2 justify-center items-center px-4 w-14 h-14 rounded min-h-14 transition-colors";
  const variantClasses = variant === 'filled'
    ? "bg-black hover:bg-gray-800"
    : "border-2 border-black border-solid hover:bg-gray-50";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`${baseClasses} ${variantClasses}`}
      >
        {icon ? (
          <img
            src={icon}
            alt="Social media icon"
            className="object-contain self-stretch my-auto w-5 aspect-square"
          />
        ) : (
          <div className="flex self-stretch my-auto w-5 min-h-5" />
        )}
      </a>
    );
  }
  return (
    <button
      className={`${baseClasses} ${variantClasses}`}
      onClick={onClick}
      type="button"
    >
      {icon ? (
        <img
          src={icon}
          alt="Social media icon"
          className="object-contain self-stretch my-auto w-5 aspect-square"
        />
      ) : (
        <div className="flex self-stretch my-auto w-5 min-h-5" />
      )}
    </button>
  );
}
