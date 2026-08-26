import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuHeart, LuCheck, LuPlus } from 'react-icons/lu';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [colorIndex, setColorIndex] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const [adding, setAdding] = useState(false);
  const isUnreleased = product.status === 'unreleased';
  const { user } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleQuickAdd = async () => {
    if (!user) {
      navigate('/login', { state: { from: '/' } });
      return;
    }
    setAdding(true);
    try {
      await addItem(product, product.colors[colorIndex]?.name);
      setAdded(true);
      setTimeout(() => setAdded(false), 1400);
    } finally {
      setAdding(false);
    }
  };

  return (
    <article className="group flex h-full flex-col ink-box ink-shadow-sm hover-pop">
      <div className="relative border-b-[3px] border-foreground bg-secondary">
        <img
          src={product.image}
          alt={`${product.name} — 3D-printed ${product.category.toLowerCase()} by Made Weird`}
          loading="lazy"
          width={1000}
          height={1000}
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.04] group-hover:rotate-1"
        />
        <div className="pointer-events-none absolute left-0 top-0 flex flex-col items-start gap-2 p-3">
          {product.badge && (
            <span className="sticker bg-brand-red text-brand-red-foreground -rotate-3">{product.badge}</span>
          )}
          {isUnreleased && (
            <span className="sticker bg-brand-blue text-brand-blue-foreground rotate-2">Under Production</span>
          )}
        </div>
        <button
          type="button"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wishlisted}
          onClick={() => setWishlisted((w) => !w)}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center border-[3px] border-foreground bg-card transition-colors hover:bg-brand-red hover:text-brand-red-foreground"
        >
          <LuHeart className={`h-4 w-4 ${wishlisted ? 'fill-current text-brand-red' : ''}`} />
        </button>
        <span className="pointer-events-none absolute bottom-3 left-3 translate-y-2 border-[3px] border-foreground bg-background px-2 py-1 text-[0.6rem] font-black uppercase tracking-[0.16em] opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
          Certified weird ✱
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="min-w-0">
          <p className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-muted-foreground">
            {product.category}
          </p>
          <h3 className="mt-2 text-2xl leading-[0.9] sm:text-[1.7rem]">{product.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{product.tagline}</p>
        </div>

        <div className="flex items-center gap-2">
          {product.colors.map((c, i) => (
            <button
              key={c.name}
              type="button"
              aria-label={c.name}
              aria-pressed={i === colorIndex}
              onClick={() => setColorIndex(i)}
              style={{ backgroundColor: c.hex }}
              className={`h-6 w-6 rounded-full border-[3px] border-foreground transition-transform ${
                i === colorIndex ? 'scale-110 ring-2 ring-foreground ring-offset-2 ring-offset-card' : ''
              }`}
            />
          ))}
          <span className="ml-1 truncate text-[0.65rem] font-black uppercase tracking-[0.14em] text-muted-foreground">
            {product.colors[colorIndex]?.name}
          </span>
        </div>

        <div className="mt-auto grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 border-t-[3px] border-foreground pt-3">
          <div className="min-w-0">
            {isUnreleased ? (
              <>
                <p className="font-display text-2xl">₹XXX</p>
                <p className="text-[0.6rem] font-black uppercase tracking-[0.16em] text-brand-blue">
                  Price reveal soon
                </p>
              </>
            ) : (
              <p className="flex items-baseline gap-2">
                <span className="font-display text-2xl">₹{product.price?.toLocaleString('en-IN')}</span>
                {product.compareAt && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{product.compareAt.toLocaleString('en-IN')}
                  </span>
                )}
              </p>
            )}
          </div>
          {isUnreleased ? (
            <button
              type="button"
              className="shrink-0 border-[3px] border-foreground bg-brand-blue px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.14em] text-brand-blue-foreground transition-colors hover:bg-foreground"
            >
              Join Waitlist
            </button>
          ) : (
            <button
              type="button"
              disabled={adding}
              onClick={handleQuickAdd}
              className="inline-flex shrink-0 items-center gap-1 border-[3px] border-foreground bg-foreground px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-brand-red disabled:opacity-50"
            >
              {added ? <LuCheck className="h-3.5 w-3.5" /> : <LuPlus className="h-3.5 w-3.5" />}
              {added ? 'In the bag' : 'Quick add'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
