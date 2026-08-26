import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuSearch, LuUser, LuLogOut, LuShoppingBag, LuMenu, LuX } from 'react-icons/lu';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const NAV_LINKS = ['New Drops', 'Home Decor', 'Desk', 'Phone', 'Gaming', 'Gifts'];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-foreground bg-background">
      <div className="mx-auto grid max-w-[1500px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-10 w-10 shrink-0 -rotate-3 place-items-center border-[3px] border-foreground bg-brand-blue font-display text-xl text-brand-blue-foreground ink-shadow-sm">
            M
          </span>
          <span className="truncate font-display text-2xl tracking-tight sm:text-3xl">MADE WEIRD</span>
        </Link>

        <nav className="hidden justify-center gap-7 lg:flex">
          {NAV_LINKS.map((label) => (
            <a
              key={label}
              href="#shop"
              className="relative text-[0.72rem] font-black uppercase tracking-[0.18em] after:absolute after:-bottom-1.5 after:left-0 after:h-[3px] after:w-0 after:bg-brand-red after:transition-all hover:after:w-full"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="col-start-3 flex shrink-0 items-center gap-1 sm:gap-2">
          <button aria-label="Search" className="grid h-10 w-10 place-items-center hover:text-brand-red">
            <LuSearch className="h-5 w-5" />
          </button>

          {user ? (
            <button
              aria-label="Log out"
              title={`Log out (${user.name})`}
              onClick={logout}
              className="hidden h-10 w-10 place-items-center hover:text-brand-red sm:grid"
            >
              <LuLogOut className="h-5 w-5" />
            </button>
          ) : (
            <Link aria-label="Log in" title="Log in" to="/login" className="hidden h-10 w-10 place-items-center hover:text-brand-red sm:grid">
              <LuUser className="h-5 w-5" />
            </Link>
          )}

          <Link
            aria-label="Cart"
            to="/cart"
            className="relative grid h-10 w-10 place-items-center border-[3px] border-foreground bg-foreground text-primary-foreground"
          >
            <LuShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-2.5 -top-2.5 grid h-5 w-5 place-items-center border-[3px] border-foreground bg-brand-red text-[0.6rem] font-black text-brand-red-foreground">
                {count}
              </span>
            )}
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center lg:hidden"
          >
            {open ? <LuX className="h-6 w-6" /> : <LuMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t-[3px] border-foreground bg-background px-4 py-3 lg:hidden">
          {NAV_LINKS.map((label) => (
            <a
              key={label}
              href="#shop"
              onClick={() => setOpen(false)}
              className="block border-b-2 border-foreground/15 py-3 font-display text-3xl"
            >
              {label}
            </a>
          ))}
          {user ? (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="block w-full border-b-2 border-foreground/15 py-3 text-left font-display text-3xl"
            >
              Log out
            </button>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="block border-b-2 border-foreground/15 py-3 font-display text-3xl">
              Log in
            </Link>
          )}
          <p className="pt-4 text-[0.65rem] font-black uppercase tracking-[0.2em] text-brand-red">
            Normal was never the plan ✱
          </p>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
