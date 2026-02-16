import { motion } from "framer-motion";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = "" }: NavigationProps) {
  const navItems = [
    { label: "About Me", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Project", href: "#project" },
    { label: "Contact Me", href: "#contact" },
  ];

  return (
    <nav className={`flex gap-12 items-center max-sm:hidden ${className}`}>
      {navItems.map((item) => (
        <motion.a
          key={item.label}
          href={item.href}
          className="relative text-base font-medium text-black cursor-pointer transition"
          whileHover={{ y: -2 }}
        >
          {item.label}
          <motion.span
            className="absolute left-0 -bottom-0.5 h-[2px] w-full bg-black"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.2 }}
            style={{ originX: 0 }}
          />
        </motion.a>
      ))}
    </nav>
  );
}
