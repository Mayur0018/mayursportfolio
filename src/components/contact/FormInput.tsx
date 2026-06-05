interface FormInputProps {
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}

export default function FormInput({ placeholder, type = "text", value, onChange, multiline = false }: FormInputProps) {
  const baseClasses = "w-full px-6 py-4 text-sm rounded-xl bg-slate-800/50 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-white/20";

  if (multiline) {
    return (
      <div className="mt-4 w-full text-base">
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClasses} min-h-[120px] resize-none leading-relaxed`}
          rows={4}
        />
      </div>
    );
  }

  return (
    <div className="mt-4 first:mt-0 w-full text-base">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${baseClasses} h-12`}
      />
    </div>
  );
}
