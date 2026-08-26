import { LuSparkles } from 'react-icons/lu';

const PILLARS = ['Designed in-house', 'Printed on demand', 'Zero mass production'];

const BrandPhilosophy = () => (
  <section className="torn-top torn-bottom -my-3 bg-brand-red px-4 py-24 text-brand-red-foreground sm:px-10 lg:py-36">
    <div className="mx-auto max-w-[1200px] text-center">
      <LuSparkles className="mx-auto h-10 w-10 spin-slow" />
      <h2 className="display-xl mt-8 text-[3.4rem] sm:text-[7rem] lg:text-[8.5rem]">Normal was never the plan.</h2>
      <p className="mx-auto mt-8 max-w-2xl text-lg">
        We started with one printer, too many ideas and a refusal to make boring things. Every object is designed
        in-house, printed on demand and built to make your space look like someone actually lives there.
      </p>
      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        {PILLARS.map((p, i) => (
          <span
            key={p}
            className={`border-[3px] border-brand-red-foreground px-4 py-5 font-display text-2xl ${
              i === 1 ? 'rotate-1' : '-rotate-1'
            }`}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default BrandPhilosophy;
