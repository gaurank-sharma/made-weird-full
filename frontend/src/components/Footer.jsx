import { LuInstagram, LuYoutube, LuTwitter } from 'react-icons/lu';

const SOCIALS = [LuInstagram, LuYoutube, LuTwitter];

const COLUMNS = [
  { title: 'Shop', links: ['New Drops', 'Home Decor', 'Desk Accessories', 'Phone', 'Gaming', 'Gifts'] },
  { title: 'Made Weird', links: ['Our Story', 'The Print Lab', 'Materials', 'Sustainability', 'Careers'] },
  { title: 'Help', links: ['Shipping', 'Returns', 'Track Order', 'Care Guide', 'Contact'] }
];

const Footer = () => (
  <footer className="torn-top -mt-3 border-t-[3px] border-foreground bg-foreground text-primary-foreground">
    <div className="mx-auto max-w-[1500px] px-4 pb-14 pt-16 sm:px-8">
      <p className="display-xl text-[15vw] leading-[0.78] sm:text-[11vw]">
        MADE <span className="text-brand-red">WEIRD</span>
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))]">
        <div className="min-w-0">
          <p className="max-w-xs text-sm text-primary-foreground/70">
            Weirdly useful objects for your home, desk and everyday life. Printed on demand, never mass-produced.
          </p>
          <div className="mt-5 flex gap-2">
            {SOCIALS.map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-11 w-11 place-items-center border-[3px] border-primary-foreground transition-colors hover:border-brand-red hover:bg-brand-red"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title} className="min-w-0">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.22em] text-brand-red">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-primary-foreground/75 transition-colors hover:text-brand-blue">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <div className="overflow-hidden border-y-[3px] border-primary-foreground/25 py-4">
      <div className="marquee-track">
        {[0, 1].map((loop) => (
          <div key={loop} className="flex shrink-0">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="whitespace-nowrap px-6 font-display text-4xl opacity-90">
                BOLD BY NATURE <span className="text-brand-red">✱</span> WEIRD BY CHOICE
                <span className="text-brand-blue"> ✱ </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>

    <div className="mx-auto flex max-w-[1500px] flex-col gap-2 px-4 py-6 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <p>© {new Date().getFullYear()} Made Weird. All rights weird.</p>
      <p className="flex gap-5">
        <a href="#" className="hover:text-primary-foreground">Privacy</a>
        <a href="#" className="hover:text-primary-foreground">Terms</a>
        <a href="#" className="hover:text-primary-foreground">Refunds</a>
      </p>
    </div>
  </footer>
);

export default Footer;
