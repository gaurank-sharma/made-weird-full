import useFetch from '../hooks/useFetch';
import SectionHeader from './SectionHeader';

const CategoryGrid = () => {
  const { data: categories, loading } = useFetch('/api/categories');

  return (
    <section className="border-b-[3px] border-foreground bg-secondary px-4 py-20 sm:px-10 lg:py-28">
      <div className="mx-auto max-w-[1500px]">
        <SectionHeader kicker="Pick your poison" title="Shop by category" link="All categories" tint="red" />

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href="#shop"
                className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 ink-box ink-shadow-sm hover-pop p-4"
              >
                <div className="min-w-0 pl-2">
                  <h3 className="text-2xl leading-tight sm:text-3xl">{cat.name}</h3>
                  <p className="mt-2 text-[0.65rem] font-black uppercase tracking-[0.2em] text-muted-foreground">
                    {cat.count} objects ✱ zero boring
                  </p>
                </div>
                <div
                  className={`h-20 w-20 shrink-0 border-[3px] border-foreground sm:h-24 sm:w-24 lg:h-28 lg:w-28 ${
                    cat.tint === 'red' ? 'bg-brand-red' : cat.tint === 'blue' ? 'bg-brand-blue' : 'bg-background'
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    width={1000}
                    height={1000}
                    className="h-full w-full object-cover mix-blend-multiply transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryGrid;
