"use client";
import * as React from "react";
import { motion } from "framer-motion";
import FormInput  from "./FormInput";
import  SocialButton  from "./SocialButton";
import ContactInfo  from "./ContactInfo";

export  function ContactForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    website: '',
    message: ''
  });
  const [status, setStatus] = React.useState<"idle" | "error" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      setStatus("error");
      return;
    }
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nWebsite: ${formData.website}\n\nMessage:\n${message}`);
    const mailto = `mailto:youremail@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;
    setStatus("success");
  };

  const updateField = (field: keyof typeof formData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.main
      id="contact"
      className="flex overflow-hidden flex-col justify-center px-20 py-16 bg-white max-md:px-5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="flex overflow-hidden flex-wrap justify-between px-8 max-w-full w-[1280px] max-md:px-5">
        <section className="flex overflow-hidden flex-col flex-1 shrink justify-center py-5 basis-0 min-w-60 max-md:max-w-full">
          <form
            className="flex flex-col items-start w-full max-md:max-w-full"
            onSubmit={handleSubmit}
          >
            <FormInput
              placeholder="Your name"
              value={formData.name}
              onChange={updateField('name')}
            />

            <FormInput
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={updateField('email')}
            />

            <FormInput
              placeholder="Your website (If exists)"
              type="url"
              value={formData.website}
              onChange={updateField('website')}
            />

            <FormInput
              placeholder="How can I help?*"
              value={formData.message}
              onChange={updateField('message')}
              multiline
            />

            <div className="flex flex-wrap gap-6 items-start mt-5 max-md:max-w-full">
              <button
                type="submit"
                className="flex gap-2 justify-center items-center px-5 py-4 text-xl font-semibold tracking-wide leading-tight text-white bg-black rounded min-h-14 hover:bg-gray-800 transition-colors"
              >
                <span className="self-stretch my-auto text-white">
                  Get In Touch
                </span>
              </button>
              {status === "error" && (
                <span className="text-red-600 text-sm">Please fill name, email and message.</span>
              )}
              {status === "success" && (
                <span className="text-green-600 text-sm">Opening your email app…</span>
              )}

              <SocialButton
                icon="https://api.builder.io/api/v1/image/assets/TEMP/c1f0c1721b296aa23bc8afd47513a14f7073868a?placeholderIfAbsent=true&apiKey=cc41b09cf7254ba2b7ac9ef9873ba48a"
                variant="filled"
              />

              <SocialButton
                icon="https://api.builder.io/api/v1/image/assets/TEMP/b6057593893fa0b4b63b26c697fadac633521335?placeholderIfAbsent=true&apiKey=cc41b09cf7254ba2b7ac9ef9873ba48a"
              />

              <SocialButton
                icon="https://api.builder.io/api/v1/image/assets/TEMP/398987ffdc76b87d2dd22b4a1d440a8b9ca63167?placeholderIfAbsent=true&apiKey=cc41b09cf7254ba2b7ac9ef9873ba48a"
              />

              <SocialButton />
            </div>
          </form>
        </section>

        <ContactInfo />
      </div>
    </motion.main>
  );
}

export default ContactForm;
