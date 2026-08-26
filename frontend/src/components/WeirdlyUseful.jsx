import useFetch from '../hooks/useFetch';
import ProductCard from './ProductCard';
import SectionHeader from './SectionHeader';

const WeirdlyUseful = () => {
  const { data: products, loading } = useFetch('/api/products?featured=false');

  return (
    <section className="border-b-[3px] border-foreground px-4 py-20 sm:px-10 lg:py-28">
      <div className="mx-auto max-w-[1500px]">
        <SectionHeader
          kicker="Function, but more fun"
          title="Weirdly useful"
          note="Objects that solve a real problem and still start a conversation."
        />

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WeirdlyUseful;
