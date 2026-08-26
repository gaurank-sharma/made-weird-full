import { LuStar } from 'react-icons/lu';
import useFetch from '../hooks/useFetch';
import SectionHeader from './SectionHeader';

const ROTATIONS = ['-rotate-1', 'rotate-1', '-rotate-1'];

const Testimonials = () => {
  const { data: testimonials, loading } = useFetch('/api/testimonials');

  return (
    <section className="border-b-[3px] border-foreground px-4 py-20 sm:px-10 lg:py-28">
      <div className="mx-auto max-w-[1500px]">
        <SectionHeader
          kicker="Receipts"
          title="People are weird about us"
          link="All reviews"
          note="2,400+ reviews and not one of them says “it's fine”."
        />

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <blockquote key={t.id} className={`ink-box ink-shadow-sm hover-pop p-6 ${ROTATIONS[i % ROTATIONS.length]}`}>
                <div className="flex gap-0.5 text-brand-red">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <LuStar key={s} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-lg leading-snug">“{t.quote}”</p>
                <footer className="mt-6 border-t-[3px] border-foreground pt-3 text-[0.68rem] font-black uppercase tracking-[0.16em]">
                  {t.name} — <span className="text-muted-foreground">{t.product}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
