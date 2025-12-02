import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { Benefits } from "@/components/sections/Benefits";
import { Testimonials } from "@/components/sections/Testimonials";
import { Comparison } from "@/components/sections/Comparison";
import { FAQ } from "@/components/sections/FAQ";
import { Pricing } from "@/components/sections/Pricing";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloatButton } from "@/components/WhatsAppFloatButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <Benefits />
      {/* <Testimonials /> */}
      <Comparison />
      <FAQ />
      <Pricing />
      <FinalCTA />
      <Footer />
      <WhatsAppFloatButton />
    </div>
  );
};

export default Index;
