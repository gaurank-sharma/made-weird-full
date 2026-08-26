import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LuCircleCheck } from 'react-icons/lu';
import Layout from '../components/Layout';
import { apiFetch } from '../config/api';

const OrderConfirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch(`/api/orders/${id}`)
      .then((json) => setOrder(json.order))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <Layout>
        <section className="mx-auto max-w-lg px-4 py-24 text-center sm:px-10">
          <h1 className="display-xl text-[3rem] sm:text-[4rem]">Order not found</h1>
          <p className="mt-6 text-muted-foreground">{error}</p>
          <Link to="/" className="mt-8 inline-block font-black underline-scribble">Back home</Link>
        </section>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <section className="mx-auto max-w-lg px-4 py-24 text-center sm:px-10">
          <p className="text-muted-foreground">Loading…</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-10">
        <LuCircleCheck className="h-14 w-14 text-brand-blue" />
        <span className="mt-4 block sticker bg-brand-blue text-brand-blue-foreground -rotate-2">Order placed</span>
        <h1 className="display-xl mt-5 text-[3rem] sm:text-[4rem]">You're getting weird.</h1>
        <p className="mt-4 text-muted-foreground">
          Order <span className="font-black text-foreground">#{order._id.slice(-8).toUpperCase()}</span> is confirmed — pay with cash when it arrives.
        </p>

        <div className="mt-10 ink-box ink-shadow-sm p-5">
          <h2 className="text-2xl">Items</h2>
          <div className="mt-4 space-y-3 border-t-[3px] border-foreground pt-4">
            {order.items.map((item) => (
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
              <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{order.shipping === 0 ? 'Free' : `₹${order.shipping}`}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t-[3px] border-foreground pt-4">
            <span className="font-black uppercase tracking-[0.1em]">Total</span>
            <span className="font-display text-2xl">₹{order.total.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="mt-8 ink-box ink-shadow-sm p-5">
          <h2 className="text-2xl">Delivering to</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {order.address.name} · {order.address.phone}
            <br />
            {order.address.line1}
            {order.address.line2 ? `, ${order.address.line2}` : ''}
            <br />
            {order.address.city}, {order.address.state} {order.address.pincode}
          </p>
          <p className="mt-3 text-[0.65rem] font-black uppercase tracking-[0.16em] text-brand-blue">Cash on delivery</p>
        </div>

        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-2 border-[3px] border-foreground bg-foreground px-8 py-4 font-display text-2xl text-primary-foreground ink-shadow-sm hover:bg-brand-red"
        >
          Back to shop
        </Link>
      </section>
    </Layout>
  );
};

export default OrderConfirmation;
