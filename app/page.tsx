import Navbar from "./components/topBar";
import Herosection from "./components/hero-section";
import Feature from "./components/featured-section";
import SmartFeature from "./components/smartFeature";
import HowItWorks from "./components/working";
import SeeItInAction from "./components/wVideo";
import Pricing from "./components/pricing-section";
import FAQSection from "./components/faq-section";
import TestimonialSection from "./components/testmonial-section";
import ContactSection from "./components/contactSection";
import Footer from "./components/footer";


export default function Home() {
  return (
    <div>
      <Navbar />
      <Herosection/>
      <Feature />
      <HowItWorks />
      <SeeItInAction />
      <SmartFeature />
      <Pricing />
      <FAQSection/>
      <TestimonialSection/>
      <div className="relative py-16">
        <ContactSection/>
      </div>
      <Footer/>

    </div>
  );
}