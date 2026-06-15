import { motion } from 'framer-motion';
import SocialIcons from './SocialIcon';
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

interface PersonalIntroProps {
  name?: string;
  title?: string;
  location?: string;
  description?: string;
}

 const PersonalIntro: React.FC<PersonalIntroProps> = () => {
  const { data: config } = useQuery({
    queryKey: ['config'],
    queryFn: async () => {
      const { data } = await api.get('/config');
      return data;
    }
  });

  const name = "Mayur Nishad";
  const title = config?.heroTitle || "Frontend Developer";
  const location = "India";
  const description = config?.heroSubtitle || "I'm Evren Shah Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to specimen book.";
  return (
    <motion.section
      className="flex-1 max-md:w-full"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <header className="mb-10">
        <motion.p 
          className="mb-6 text-2xl leading-snug text-black max-w-[820px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span>Hello I&apos;m </span>
          <span className="font-bold">{name}</span>
          <span>. </span>
          <span className="font-bold">{title}</span>
          <span>. </span>
          <span>Based in </span>
          <span className="font-bold">{location}</span>
          <span>.</span>
        </motion.p>
      </header>

      <motion.p 
        className="mb-16 text-base leading-relaxed max-w-[520px] text-stone-500"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        {description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <SocialIcons />
      </motion.div>
    </motion.section>
  );
};
export default PersonalIntro
