import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import ProductCard from './ProductCard';
import SectionHeader from './SectionHeader';
import { API_URL } from '../config/api';

const WaitlistForm = ({ prototype }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch(`${API_URL}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, prototypeId: prototype.id })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Something went wrong');
      setStatus({ type: 'success', message: json.message });
      setEmail('');
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="min-w-0 flex-1 border-[3px] border-foreground bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-foreground"
        />
        <button
          type="submit"
          disabled={submitting}
          className="shrink-0 border-[3px] border-foreground bg-foreground px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-brand-red disabled:opacity-50"
        >
          {submitting ? '...' : 'Notify me'}
        </button>
      </div>
      {status && (
        <p className={`mt-2 text-xs font-bold ${status.type === 'success' ? 'text-brand-blue' : 'text-brand-red'}`}>
          {status.message}
        </p>
      )}
    </form>
  );
};

const UnderProduction = () => {
  const { data: prototypes, loading } = useFetch('/api/prototypes');

  return (
    <section className="border-b-[3px] border-foreground bg-secondary px-4 py-20 sm:px-10 lg:py-28">
      <div className="mx-auto max-w-[1500px]">
        <SectionHeader
          kicker="Not ready. Still loud."
          title="Under production"
          note="Prototypes currently arguing with a print bed. Join the waitlist, get first dibs."
          link="See the lab"
          tint="red"
        />

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {prototypes.map((proto) => (
              <div key={proto.id} className="flex h-full flex-col">
                <ProductCard product={proto} />
                <WaitlistForm prototype={proto} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UnderProduction;
