const Footer: React.FC = () => {
  return (
    <footer className="glass rounded-2xl p-6 border border-white/10 text-center space-y-4">
      <div className="text-xl font-black bg-gradient-to-r from-red-500 to-gray-500 bg-clip-text text-transparent inline-block">
        MN
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">
        Built with React, Tailwind & Framer Motion. <br />
        Inspired by social platforms.
      </p>
      <div className="pt-4 border-t border-white/5 flex justify-center gap-4">
        <span className="text-[10px] text-slate-600 hover:text-red-400 cursor-pointer transition-colors">About</span>
        <span className="text-[10px] text-slate-600 hover:text-red-400 cursor-pointer transition-colors">Privacy</span>
        <span className="text-[10px] text-slate-600 hover:text-red-400 cursor-pointer transition-colors">Terms</span>
      </div>
      <p className="text-[10px] text-slate-700">© 2026 Mayur Nishad</p>
    </footer>
  );
};

export default Footer;
