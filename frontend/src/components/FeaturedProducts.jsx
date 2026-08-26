import useFetch from '../hooks/useFetch';
import ProductCard from './ProductCard';
import SectionHeader from './SectionHeader';

const FeaturedProducts = () => {
  const { data: products, loading } = useFetch('/api/products?featured=true');

  return (
    <section id="shop" className="border-b-[3px] border-foreground px-4 py-20 sm:px-10 lg:py-28">
      <div className="mx-auto max-w-[1500px]">
        <SectionHeader
          kicker="Fresh off the printer"
          title="New Drops"
          note="Small batches, loud shapes. When they're gone, they're gone (and we're not sorry)."
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

export default FeaturedProducts;
