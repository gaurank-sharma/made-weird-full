import { useState } from 'react';
import { API_URL } from '../config/api';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch(`${API_URL}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Something went wrong');
      setSubmitted(true);
      setEmail('');
    } catch (error) {
      setStatus(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="torn-top -mt-3 bg-brand-blue px-4 py-24 text-brand-blue-foreground sm:px-10 lg:py-28">
      <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="min-w-0">
          <h2 className="display-xl text-[3.4rem] sm:text-[6rem]">Get the weird first</h2>
          <p className="mt-6 max-w-md text-base sm:text-lg">
            Drop alerts, waitlist invites and ₹200 off your first order. No spam, just objects.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
          <label className="sr-only" htmlFor="newsletter-email">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@weird.com"
            className="w-full border-[3px] border-foreground bg-background px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-foreground"
          />
          <button
            type="submit"
            disabled={submitting}
            className="border-[3px] border-foreground bg-foreground px-7 py-4 font-display text-2xl text-primary-foreground transition-colors hover:bg-brand-red disabled:opacity-50"
          >
            {submitted ? "You're in ✱" : 'Sign me up'}
          </button>
          <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] sm:col-span-2">
            {status ? status : "Unsubscribe whenever. We'll be weird about it."}
          </p>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
