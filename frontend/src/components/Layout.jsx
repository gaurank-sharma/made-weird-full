import MarqueeBar from './MarqueeBar';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div className="paper min-h-screen">
    <MarqueeBar />
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
