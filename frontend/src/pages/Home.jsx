import Layout from '../components/Layout';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import CategoryGrid from '../components/CategoryGrid';
import BrandPhilosophy from '../components/BrandPhilosophy';
import WeirdlyUseful from '../components/WeirdlyUseful';
import RealRooms from '../components/RealRooms';
import UnderProduction from '../components/UnderProduction';
import ProcessSteps from '../components/ProcessSteps';
import Testimonials from '../components/Testimonials';
import InstagramGrid from '../components/InstagramGrid';
import Newsletter from '../components/Newsletter';

const Home = () => (
  <Layout>
    <Hero />
    <FeaturedProducts />
    <CategoryGrid />
    <BrandPhilosophy />
    <WeirdlyUseful />
    <RealRooms />
    <UnderProduction />
    <ProcessSteps />
    <Testimonials />
    <InstagramGrid />
    <Newsletter />
  </Layout>
);

export default Home;
