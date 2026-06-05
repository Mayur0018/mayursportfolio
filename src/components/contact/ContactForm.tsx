"use client";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import FormInput  from "./FormInput";
import  SocialButton  from "./SocialButton";
import ContactInfo  from "./ContactInfo";

export  function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    message: ''
  });
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      setStatus("error");
      return;
    }
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nWebsite: ${formData.website}\n\nMessage:\n${message}`);
    const mailto = `mailto:mayurnish18@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;
    setStatus("success");
  };

  const updateField = (field: keyof typeof formData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.main
      id="contact"
      className="flex flex-col items-center px-4 py-8 w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="w-full glass-panel rounded-2xl p-6 md:p-10 border border-white/5 shadow-xl max-w-4xl">
        <header className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100">
            Let's <span className="text-blue-400">Connect</span>
          </h2>
          <p className="text-slate-400 mt-2 text-sm">Have a project in mind? Send me a message!</p>
        </header>

        <div className="flex flex-wrap gap-12 justify-between">
          <section className="flex flex-col flex-1 min-w-[300px]">
            <motion.form
              className="flex flex-col w-full"
              onSubmit={handleSubmit}
              variants={containerVariants}
            >
              <motion.div className="w-full" variants={itemVariants}>
                <FormInput
                  placeholder="Your name"
                  value={formData.name}
                  onChange={updateField('name')}
                />
              </motion.div>

              <motion.div className="w-full" variants={itemVariants}>
                <FormInput
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={updateField('email')}
                />
              </motion.div>

              <motion.div className="w-full" variants={itemVariants}>
                <FormInput
                  placeholder="Your website (If exists)"
                  type="url"
                  value={formData.website}
                  onChange={updateField('website')}
                />
              </motion.div>

              <motion.div className="w-full" variants={itemVariants}>
                <FormInput
                  placeholder="How can I help?*"
                  value={formData.message}
                  onChange={updateField('message')}
                  multiline
                />
              </motion.div>

              <motion.div className="mt-8 flex gap-4 items-center" variants={itemVariants}>
                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 active:scale-95"
                >
                  Send Message
                </button>
                {status === 'success' && (
                  <span className="text-green-400 text-sm font-medium">Message sent!</span>
                )}
              </motion.div>
            </motion.form>
          </section>

          <section className="flex flex-col flex-1 min-w-[300px] gap-8">
            <ContactInfo />
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-slate-200">Social Links</h3>
              <div className="flex flex-wrap gap-3">
                <SocialButton company="github" />
                <SocialButton company="linkedin" />
                <SocialButton company="twitter" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.main>
  );
}

export default ContactForm;
