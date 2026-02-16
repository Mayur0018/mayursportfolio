export default function ContactInfo() {
  return (
    <section className="flex overflow-hidden flex-col flex-1 shrink justify-center py-5 basis-0 min-w-60 max-md:max-w-full">
      <div className="flex flex-col flex-1 justify-center w-full max-md:max-w-full">
        <div className="w-full max-md:max-w-full">
          <header className="w-full text-5xl font-extrabold tracking-tighter leading-none max-md:max-w-full max-md:text-4xl">
            <div className="flex flex-wrap gap-4 items-start w-full whitespace-nowrap max-md:max-w-full max-md:text-4xl">
              <h1 className="text-black max-md:text-4xl">
                Let's
              </h1>
              <span className="border-black border-solid border-[3px] max-md:text-4xl px-2">
                talk
              </span>
              <span className="text-black max-md:text-4xl">
                for
              </span>
            </div>
            <h2 className="mt-3 text-black max-md:max-w-full max-md:text-4xl">
              Something special
            </h2>
          </header>
          <p className="mt-5 text-base tracking-wide leading-6 text-zinc-500 max-md:max-w-full">
            I seek to push the limits of creativity to create high-engaging,
            user-friendly, and memorable interactive experiences.
          </p>
        </div>
        <address className="mt-10 w-full text-3xl font-semibold tracking-tight leading-none text-black whitespace-nowrap max-md:max-w-full not-italic">
          <a href="mailto:youremail@gmail.com" className="text-black max-md:max-w-full hover:underline">
            youremail@gmail.com
          </a>
          <a href="tel:1234567890" className="mt-4 block text-black max-md:max-w-full hover:underline">
            1234567890
          </a>
        </address>
      </div>
    </section>
  );
}
