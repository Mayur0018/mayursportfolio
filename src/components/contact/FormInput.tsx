interface FormInputProps {
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}

export default function FormInput({ placeholder, type = "text", value, onChange, multiline = false }: FormInputProps) {
  const baseClasses = "w-full px-6 py-5 text-base tracking-tight leading-none rounded border-black border-solid border-[1.4px] text-zinc-500 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-black max-md:px-5";

  if (multiline) {
    return (
      <div className="mt-5 w-full max-w-md text-base tracking-tight leading-5 text-zinc-500">
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClasses} min-h-[140px] resize-none leading-5`}
          rows={6}
        />
      </div>
    );
  }

  return (
    <div className="mt-5 first:mt-0 w-full max-w-md text-base tracking-tight leading-none text-zinc-500">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${baseClasses} min-h-14`}
      />
    </div>
  );
}
