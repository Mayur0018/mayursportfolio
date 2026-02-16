interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex gap-3 items-center ${className}`}>
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V28C16 29.1046 15.1046 30 14 30H10C8.89543 30 8 29.1046 8 28V4Z" fill="#000000"></path><path d="M18 12C18 10.8954 18.8954 10 20 10H22C23.1046 10 24 12V28C24 29.1046 23.1046 30 22 30H20C18.8954 30 18 29.1046 18 28V12Z" fill="#000000"></path></svg>',
          }}
        />
      </div>
      <h1 className="text-xl font-semibold text-black">Personal</h1>
    </div>
  );
}
