import { LuArrowRight } from 'react-icons/lu';

const SectionHeader = ({ kicker, title, note, link = 'Shop all', tint = 'blue' }) => (
  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 pb-10 sm:pb-14">
    <div className="min-w-0">
      <span
        className={`sticker -rotate-2 ${tint === 'red' ? 'bg-brand-red text-brand-red-foreground' : 'bg-brand-blue text-brand-blue-foreground'}`}
      >
        {kicker}
      </span>
      <h2 className="display-xl mt-5 text-[3.4rem] sm:text-[6rem] lg:text-[7rem]">{title}</h2>
      {note && <p className="mt-4 max-w-xl text-base text-muted-foreground">{note}</p>}
    </div>
    <a
      href="#shop"
      className="hidden shrink-0 items-center gap-2 border-[3px] border-foreground px-5 py-3 text-[0.7rem] font-black uppercase tracking-[0.18em] ink-shadow-sm transition-colors hover:bg-foreground hover:text-primary-foreground sm:inline-flex"
    >
      {link} <LuArrowRight className="h-4 w-4" />
    </a>
  </div>
);

export default SectionHeader;
