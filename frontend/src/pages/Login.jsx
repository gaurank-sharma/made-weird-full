import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      navigate(location.state?.from || '/');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="mx-auto max-w-md px-4 py-20 sm:px-10">
        <span className="sticker bg-brand-blue text-brand-blue-foreground -rotate-2">Welcome back</span>
        <h1 className="display-xl mt-5 text-[3rem] sm:text-[4rem]">Log in</h1>

        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          <div>
            <label className="text-[0.65rem] font-black uppercase tracking-[0.18em]" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border-[3px] border-foreground bg-card px-4 py-3 focus:outline-none focus:ring-4 focus:ring-foreground"
            />
          </div>
          <div>
            <label className="text-[0.65rem] font-black uppercase tracking-[0.18em]" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full border-[3px] border-foreground bg-card px-4 py-3 focus:outline-none focus:ring-4 focus:ring-foreground"
            />
          </div>

          {error && <p className="text-sm font-bold text-brand-red">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full border-[3px] border-foreground bg-foreground px-7 py-4 font-display text-2xl text-primary-foreground ink-shadow-sm transition-colors hover:bg-brand-red disabled:opacity-50"
          >
            {submitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          New here?{' '}
          <Link to="/signup" className="font-black text-foreground underline-scribble">
            Create an account
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default Login;
