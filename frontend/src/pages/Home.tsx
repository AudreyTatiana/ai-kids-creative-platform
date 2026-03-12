import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ExamplesSection from "../components/ExamplesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import ProductsSection from "../components/ProductsSection";
import InfoBanner from "../components/InfoBanner";
import Layout from "../components/Layout";

function Home() {
  return (
    <div style={{ backgroundColor: "#fcfbff", minHeight: "100vh" }}>
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