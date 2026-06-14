import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Journey from "@/app/components/Journey";
import PortfolioGrid from "@/app/components/PortfolioGrid";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Journey />
        <PortfolioGrid />
      </main>
      <Footer />
    </>
  );
}
