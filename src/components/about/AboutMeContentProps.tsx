interface AboutMeContentProps {
  className?: string;
}

export default function AboutMeContent({ className = "" }: AboutMeContentProps) {
  return (
    <article className={`flex flex-col justify-center mt-5 max-w-full text-base tracking-wide leading-6 text-zinc-500 w-[610px] ${className}`}>
      <p className="text-zinc-500 max-md:max-w-full">
        I'm a passionate, self-proclaimed designer who specializes in full
        stack development (React.js & Node.js). I am very enthusiastic
        about bringing the technical and visual aspects of digital
        products to life. User experience, pixel perfect design, and
        writing clear, readable, highly performant code matters to me.
      </p>
      <p className="mt-5 text-zinc-500 max-md:max-w-full">
        I began my journey as a web developer in 2015, and since then,
        I've continued to grow and evolve as a developer, taking on new
        challenges and learning the latest technologies along the way.
        Now, in my early thirties, 7 years after starting my web
        development journey, I'm building cutting-edge web applications
        using modern technologies such as Next.js, TypeScript, Nestjs,
        Tailwindcss, Supabase and much more.
      </p>
      <p className="mt-5 text-zinc-500 max-md:max-w-full">
        When I'm not in full-on developer mode, you can find me hovering
        around on twitter or on indie hacker, witnessing the journey of
        early startups or enjoying some free time. You can follow me on
        Twitter where I share tech-related bites and build in public, or
        you can follow me on GitHub.
      </p>
    </article>
  );
}
