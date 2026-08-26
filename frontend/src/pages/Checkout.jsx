import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { apiFetch } from '../config/api';

const FIELDS = [
  { name: 'name', label: 'Full name', span: 2 },
  { name: 'phone', label: 'Phone number', span: 2 },
  { name: 'line1', label: 'Address', span: 2 },
  { name: 'line2', label: 'Apartment, suite, etc. (optional)', span: 2, optional: true },
  { name: 'city', label: 'City', span: 1 },
  { name: 'state', label: 'State', span: 1 },
  { name: 'pincode', label: 'Pincode', span: 1 }
];

const SHIPPING_FLAT = 49;
const FREE_SHIPPING_THRESHOLD = 1499;

const Checkout = () => {
  const { user, ready } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState({ name: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '' });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;

  if (ready && !user) {
    return (
      <Layout>
        <section className="mx-auto max-w-lg px-4 py-24 text-center sm:px-10">
          <h1 className="display-xl text-[3rem] sm:text-[4rem]">Checkout</h1>
          <p className="mt-6 text-muted-foreground">Log in to check out.</p>
          <Link
            to="/login"
            state={{ from: '/checkout' }}
            className="mt-8 inline-flex items-center gap-2 border-[3px] border-foreground bg-foreground px-8 py-4 font-display text-2xl text-primary-foreground ink-shadow-sm hover:bg-brand-red"
          >
            Log in
          </Link>
        </section>
      </Layout>
    );
  }

  if (ready && items.length === 0) {
    return (
      <Layout>
        <section className="mx-auto max-w-lg px-4 py-24 text-center sm:px-10">
          <h1 className="display-xl text-[3rem] sm:text-[4rem]">Checkout</h1>
          <p className="mt-6 text-muted-foreground">Your bag is empty.</p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 border-[3px] border-foreground bg-foreground px-8 py-4 font-display text-2xl text-primary-foreground ink-shadow-sm hover:bg-brand-red"
          >
            Shop the drops
          </Link>
        </section>
      </Layout>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const json = await apiFetch('/api/orders', { method: 'POST', body: JSON.stringify({ address }) });
      await clearCart();
      navigate(`/orders/${json.order._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-10">
        <span className="sticker bg-brand-red text-brand-red-foreground -rotate-2">Almost there</span>
        <h1 className="display-xl mt-5 text-[3rem] sm:text-[4.5rem]">Checkout</h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-2xl">Delivery address</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {FIELDS.map((f) => (
                  <div key={f.name} className={f.span === 2 ? 'sm:col-span-2' : ''}>
                    <label className="text-[0.65rem] font-black uppercase tracking-[0.18em]" htmlFor={f.name}>
                      {f.label}
                    </label>
                    <input
                      id={f.name}
                      type="text"
                      required={!f.optional}
                      value={address[f.name]}
                      onChange={(e) => setAddress((a) => ({ ...a, [f.name]: e.target.value }))}
                      className="mt-2 w-full border-[3px] border-foreground bg-card px-4 py-3 focus:outline-none focus:ring-4 focus:ring-foreground"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl">Payment</h2>
              <label className="mt-4 flex items-center gap-3 border-[3px] border-foreground bg-card p-4">
                <input type="radio" checked readOnly className="h-4 w-4 accent-brand-red" />
                <span className="font-black uppercase tracking-[0.1em]">Cash on delivery</span>
              </label>
              <p className="mt-2 text-xs text-muted-foreground">Pay with cash when your order arrives.</p>
            </div>

            {error && <p className="text-sm font-bold text-brand-red">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full border-[3px] border-foreground bg-foreground px-7 py-4 font-display text-2xl text-primary-foreground ink-shadow-sm transition-colors hover:bg-brand-red disabled:opacity-50"
            >
              {submitting ? 'Placing order…' : 'Place order'}
            </button>
          </form>

          <div className="ink-box ink-shadow-sm h-fit p-5">
            <h2 className="text-2xl">Order summary</h2>
            <div className="mt-4 space-y-3 border-t-[3px] border-foreground pt-4">
              {items.map((item) => (
                <div key={`${item.productId}-${item.color}`} className="flex justify-between gap-3 text-sm">
                  <span className="min-w-0 truncate">
                    {item.name} <span className="text-muted-foreground">× {item.qty}</span>
                  </span>
                  <span className="shrink-0 font-bold">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t-[3px] border-foreground pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between border-t-[3px] border-foreground pt-4">
              <span className="font-black uppercase tracking-[0.1em]">Total</span>
              <span className="font-display text-2xl">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
