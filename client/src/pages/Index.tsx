import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import PopularServicesSection from "@/components/PopularServicesSection";
import FeaturesSection from "@/components/FeaturesSection";
import BookingFeaturesSection from "@/components/BookingFeaturesSection";
import MembershipSection from "@/components/MembershipSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ServicesGrid from "@/components/ServicesGrid";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ServicesGrid />
      <HeroSection />
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp}>
          <CategoriesSection />
        </motion.div>
      </motion.div>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp}>
          <PopularServicesSection />
        </motion.div>
      </motion.div>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp}>
          <FeaturesSection />
        </motion.div>
      </motion.div>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp}>
          <BookingFeaturesSection />
        </motion.div>
      </motion.div>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp}>
          <MembershipSection />
        </motion.div>
      </motion.div>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp}>
          <ContactSection />
        </motion.div>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default Index;
