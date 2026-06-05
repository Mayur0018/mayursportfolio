"use client";
import { useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  text: string;
}

interface TestimonialItem {
  name: string;
  title: string;
  message: string;
  image: string;
}

const Testimonial: React.FC = () => {
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const testimonials: TestimonialItem[] = [
    {
      name: "John Doe",
      title: "Frontend Developer",
      message:
        "Integrating this component into our project was seamless and saved us countless hours of development and testing. Highly recommended!",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    },
    {
      name: "Jane Smith",
      title: "Full Stack Engineer",
      message:
        "This solution not only simplified our workflow but also improved our UI consistency across the board. Excellent tool for modern teams.",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    },
    {
      name: "Bonnie Green",
      title: "UX Designer",
      message:
        "I was impressed with how intuitive and flexible the design was. It allowed us to rapidly prototype and launch features with confidence.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    },
  ];

  const handleMouseMove = (
    e: MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const bounds = cardRefs.current[index]?.getBoundingClientRect();
    if (!bounds) return;

    setTooltip({
      visible: true,
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
      text: testimonials[index].name,
    });
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section 
      id="testimonials"
      className="flex flex-col items-center px-4 py-8 w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="w-full glass-panel rounded-2xl p-6 md:p-10 border border-white/5 shadow-xl">
        <header className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100">
            Client <span className="text-blue-400">Feedback</span>
          </h2>
          <p className="text-slate-400 mt-2 text-sm">What people are saying about our collaboration</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="glass p-6 rounded-2xl border border-white/5 relative group hover:border-blue-500/30 transition-all duration-300"
              variants={itemVariants}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full border-2 border-blue-500/20 object-cover"
                />
                <div>
                  <h4 className="font-bold text-slate-100">{t.name}</h4>
                  <p className="text-xs text-slate-500">{t.title}</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 italic leading-relaxed">
                "{t.message}"
              </p>
              
              <div className="mt-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xs">★</span>
                ))}
              </div>
              
              {tooltip.visible && tooltip.text === t.name && (
                <div 
                  className="absolute pointer-events-none z-50 bg-blue-500 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap"
                  style={{ top: tooltip.y + 10, left: tooltip.x + 10 }}
                >
                  Verified Client
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonial;
