import { LuArrowRight } from 'react-icons/lu';

const Hero = () => (
  <section className="border-b-[3px] border-foreground">
    <div className="mx-auto grid max-w-[1500px] items-stretch gap-0 lg:grid-cols-[1.1fr_1fr]">
      <div className="relative flex flex-col justify-center px-4 py-16 sm:px-10 lg:border-r-[3px] lg:border-foreground lg:py-28">
        <div className="flex flex-wrap items-center gap-3">
          <span className="sticker bg-brand-red text-brand-red-foreground -rotate-3">Drop 04 — Live now</span>
          <span className="sticker rotate-2 bg-background">Only 40 printed</span>
        </div>
        <h1 className="display-xl mt-8 text-[3.4rem] sm:text-[5.4rem] lg:text-[6.4rem]">
          Bold. <span className="text-brand-red">Weird.</span>
          <br />
          3D-Printed.
          <br />
          <span className="text-brand-blue">Made to</span> stand out.
        </h1>
        <p className="mt-8 max-w-md text-lg text-muted-foreground sm:text-xl">
          We make weirdly useful objects for your home, desk and everyday life.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#shop"
            className="inline-flex items-center gap-2 border-[3px] border-foreground bg-foreground px-8 py-4 font-display text-2xl text-primary-foreground ink-shadow-sm transition-all hover:-translate-x-1 hover:-translate-y-1 hover:bg-brand-red"
          >
            Shop the weird <LuArrowRight className="h-6 w-6" />
          </a>
          <a
            href="#process"
            className="inline-flex items-center gap-2 border-[3px] border-foreground px-8 py-4 font-display text-2xl transition-colors hover:bg-brand-blue hover:text-brand-blue-foreground"
          >
            How it's made
          </a>
        </div>
        <div className="mt-14 flex flex-wrap gap-x-10 gap-y-3 text-[0.7rem] font-black uppercase tracking-[0.2em]">
          <span>★ 4.9 / 2,400+ reviews</span>
          <span>Printed on demand</span>
          <span>Ships in 48h</span>
        </div>
      </div>

      <div className="relative border-t-[3px] border-foreground bg-secondary lg:border-t-0">
        <img
          src="/images/hero-objects.jpg"
          alt="Red 3D-printed wavy vase, blue phone stand and cream desk organizer floating on a cream background"
          width={1408}
          height={1408}
          className="h-full w-full object-cover"
        />
        <span className="sticker absolute bottom-6 left-6 rotate-3 bg-background text-foreground">
          Perfectly unnecessary
        </span>
        <span className="sticker absolute right-6 top-6 -rotate-6 bg-brand-blue text-brand-blue-foreground">
          No two exactly alike
        </span>
      </div>
    </div>
  </section>
);

export default Hero;
