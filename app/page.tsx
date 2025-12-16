import About from "@/components/About";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Workflow from "@/components/Workflow";

export default function Home() {
  return (
   <>
    <HeroSection/>
    <About />
    <Features/>
    <Workflow/>
    <Footer/>
   </>
  );
}
