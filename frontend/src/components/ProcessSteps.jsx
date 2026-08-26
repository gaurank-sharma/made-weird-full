import useFetch from '../hooks/useFetch';

const ProcessSteps = () => {
  const { data: steps, loading } = useFetch('/api/process');

  return (
    <section id="process" className="border-b-[3px] border-foreground">
      <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[1fr_1.1fr]">
        <div className="border-b-[3px] border-foreground px-4 py-16 sm:px-10 lg:border-b-0 lg:border-r-[3px] lg:py-28">
          <span className="sticker bg-brand-red text-brand-red-foreground -rotate-3">The making</span>
          <h2 className="display-xl mt-5 text-[3.2rem] sm:text-[5.5rem]">One layer at a time</h2>

          {loading ? (
            <p className="mt-12 text-muted-foreground">Loading...</p>
          ) : (
            <ol className="mt-12 space-y-8">
              {steps.map((s, i) => (
                <li key={s.id} className="grid grid-cols-[auto_minmax(0,1fr)] gap-5">
                  <span className="grid h-14 w-14 shrink-0 -rotate-3 place-items-center border-[3px] border-foreground bg-brand-blue font-display text-2xl text-brand-blue-foreground ink-shadow-sm">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-3xl">{s.step}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
        <img
          src="/images/process-printer.jpg"
          alt="Close-up of a 3D printer nozzle extruding bright red filament"
          loading="lazy"
          width={1200}
          height={912}
          className="h-full min-h-[340px] w-full object-cover"
        />
      </div>
    </section>
  );
};

export default ProcessSteps;
