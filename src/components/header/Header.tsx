import { motion } from "framer-motion";
import Logo from "./Logo";
import Navigation from "./Navigation";
import ResumeButton from "./ResumeButton";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <motion.header
      className="flex justify-between items-center px-32 py-6 max-md:px-10 max-sm:px-5"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Logo />
      <Navigation />
      <div className="flex gap-4 items-center">
        <MobileMenu />
        <ResumeButton />
      </div>
    </motion.header>
  );
}
