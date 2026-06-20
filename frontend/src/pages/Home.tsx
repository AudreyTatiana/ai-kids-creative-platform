import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ExamplesSection from "../components/ExamplesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import ProductsSection from "../components/ProductsSection";
import InfoBanner from "../components/InfoBanner";
import Layout from "../components/Layout";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <Layout>
        <Navbar />
        <HeroSection />
        <ExamplesSection />
        <HowItWorksSection />
        <ProductsSection />
        <InfoBanner />
      </Layout>
    </div>
  );
}

export default Home;
