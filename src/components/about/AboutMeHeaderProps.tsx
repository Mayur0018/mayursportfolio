interface AboutMeHeaderProps {
  className?: string;
}

export default function AboutMeHeader({ className = "" }: AboutMeHeaderProps) {
  return (
    <header className={`flex flex-wrap gap-4 items-start py-5 w-full text-5xl tracking-tighter leading-none text-black whitespace-nowrap max-md:max-w-full max-md:text-4xl ${className}`}>
      <h2 className="text-black max-md:text-4xl">
        About
      </h2>
      <h2 className="font-extrabold text-black max-md:text-4xl">
        Me
      </h2>
    </header>
  );
}
