import SectionHeader from './SectionHeader';

const IMAGES = [
  '/images/life-desk.jpg',
  '/images/life-shelf.jpg',
  '/images/hero-objects.jpg',
  '/images/process-printer.jpg',
  '/images/life-shelf.jpg',
  '/images/life-desk.jpg'
];

const InstagramGrid = () => (
  <section className="border-b-[3px] border-foreground bg-secondary px-4 py-20 sm:px-10 lg:py-28">
    <div className="mx-auto max-w-[1500px]">
      <SectionHeader
        kicker="@madeweird"
        title="From the internet"
        note="Your desk, your shelf, your weird. Tag us and you might end up on this wall."
        link="Follow us"
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {IMAGES.map((src, i) => (
          <a
            key={i}
            href="#"
            className={`group relative block aspect-square overflow-hidden border-[3px] border-foreground ${
              i % 2 ? 'rotate-1' : '-rotate-1'
            } transition-transform hover:rotate-0`}
          >
            <img
              src={src}
              alt="Made Weird objects shared by the community on Instagram"
              loading="lazy"
              width={800}
              height={800}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <span className="absolute inset-0 hidden place-items-center bg-brand-blue/85 text-[0.68rem] font-black uppercase tracking-[0.16em] text-brand-blue-foreground group-hover:grid">
              View post
            </span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default InstagramGrid;
