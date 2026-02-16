"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  className?: string;
}

export default function MobileMenu({ className = "" }: MobileMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    const original = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original;
    }
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  return (
    <div className={`relative hidden max-sm:block ${className}`}>
      <button
        onClick={toggleMenu}
        className="p-2 hover:bg-gray-100 rounded transition-colors"
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
      >
        <i className={`ti ${isOpen ? "ti-x" : "ti-menu-2"} text-2xl text-black`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              id="mobile-nav"
              className="fixed right-0 top-0 h-screen w-[85%] max-w-[360px] bg-white z-50 shadow-2xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-semibold">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <i className="ti ti-x text-2xl" />
                </button>
              </div>
              <div className="flex-1 p-4 space-y-2">
                {[
                  { label: "Home", href: "#home" },
                  { label: "About Me", href: "#about" },
                  { label: "Skills", href: "#skills" },
                  { label: "Projects", href: "#project" },
                  { label: "Contact Me", href: "#contact" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-3 py-4 rounded text-lg text-black hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
