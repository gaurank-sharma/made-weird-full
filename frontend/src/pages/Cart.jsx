import { Link, useNavigate } from 'react-router-dom';
import { LuMinus, LuPlus, LuX } from 'react-icons/lu';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const CartRow = ({ item }) => {
  const { updateQty, removeItem } = useCart();

  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-b-[3px] border-foreground p-4 sm:p-5">
      <img src={item.image} alt={item.name} className="h-20 w-20 shrink-0 border-[3px] border-foreground object-cover" />
      <div className="min-w-0">
        <h3 className="text-xl leading-tight">{item.name}</h3>
        {item.color && <p className="mt-1 text-[0.65rem] font-black uppercase tracking-[0.14em] text-muted-foreground">{item.color}</p>}
        <p className="mt-1 font-display text-xl">₹{item.price.toLocaleString('en-IN')}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <button aria-label="Remove item" onClick={() => removeItem(item.productId)} className="text-muted-foreground hover:text-brand-red">
          <LuX className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 border-[3px] border-foreground">
          <button
            aria-label="Decrease quantity"
            onClick={() => updateQty(item.productId, item.qty - 1)}
            className="grid h-8 w-8 place-items-center hover:bg-foreground hover:text-primary-foreground"
          >
            <LuMinus className="h-3.5 w-3.5" />
          </button>
          <span className="w-6 text-center font-black">{item.qty}</span>
          <button
            aria-label="Increase quantity"
            onClick={() => updateQty(item.productId, item.qty + 1)}
            className="grid h-8 w-8 place-items-center hover:bg-foreground hover:text-primary-foreground"
          >
            <LuPlus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { user, ready } = useAuth();
  const { items, subtotal } = useCart();
  const navigate = useNavigate();

  if (ready && !user) {
    return (
      <Layout>
        <section className="mx-auto max-w-lg px-4 py-24 text-center sm:px-10">
          <h1 className="display-xl text-[3rem] sm:text-[4rem]">Your bag</h1>
          <p className="mt-6 text-muted-foreground">Log in to see what's in your bag.</p>
          <Link
            to="/login"
            state={{ from: '/cart' }}
            className="mt-8 inline-flex items-center gap-2 border-[3px] border-foreground bg-foreground px-8 py-4 font-display text-2xl text-primary-foreground ink-shadow-sm hover:bg-brand-red"
          >
            Log in
          </Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-10">
        <span className="sticker bg-brand-blue text-brand-blue-foreground -rotate-2">Your stuff</span>
        <h1 className="display-xl mt-5 text-[3rem] sm:text-[4.5rem]">Your bag</h1>

        {items.length === 0 ? (
          <div className="mt-10">
            <p className="text-muted-foreground">Nothing weird in here yet.</p>
            <Link
              to="/#shop"
              className="mt-6 inline-flex items-center gap-2 border-[3px] border-foreground bg-foreground px-6 py-3 font-display text-xl text-primary-foreground ink-shadow-sm hover:bg-brand-red"
            >
              Shop the drops
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-10 ink-box ink-shadow-sm">
              {items.map((item) => (
                <CartRow key={`${item.productId}-${item.color}`} item={item} />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between border-t-[3px] border-foreground pt-6">
              <span className="text-lg font-black uppercase tracking-[0.1em]">Subtotal</span>
              <span className="font-display text-3xl">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="mt-6 w-full border-[3px] border-foreground bg-foreground px-7 py-4 font-display text-2xl text-primary-foreground ink-shadow-sm transition-colors hover:bg-brand-red"
            >
              Checkout
            </button>
          </>
        )}
      </section>
    </Layout>
  );
};

export default Cart;
