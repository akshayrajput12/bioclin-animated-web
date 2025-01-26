import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ExpertiseSection } from "../components/ExpertiseSection";
import AboutUs from "../components/AboutUs";
import CircularRevealHeading from "../components/ui/circular-about";
import { ThreeDPhotoCarouselDemo } from "../components/ui/carousel-demo";
import { BioclinTimeline } from "../components/BioclinTimeline";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <Navbar />
      <div className="pt-20">
        <CircularRevealHeading 
          items={[
            { 
              text: "Research Excellence", 
              image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1470&auto=format&fit=crop"
            },
            { 
              text: "Clinical Innovation", 
              image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1469&auto=format&fit=crop"
            },
            { 
              text: "Healthcare Quality", 
              image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1470&auto=format&fit=crop"
            },
            { 
              text: "Patient Care", 
              image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop"
            },
            { 
              text: "Advanced Technology", 
              image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?q=80&w=1470&auto=format&fit=crop"
            }
          ]}
          centerText={
            <div className="flex flex-col items-center justify-center space-y-2">
              <span className="text-2xl font-bold">BioClin</span>
              <span className="text-sm text-muted-foreground">Advancing Healthcare</span>
            </div>
          }
          size="lg"
          className="mx-auto"
        />
        <ExpertiseSection />
        <div className="py-16 bg-gradient-to-b from-transparent to-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Our Global Impact</h2>
            <ThreeDPhotoCarouselDemo />
          </div>
        </div>
        <AboutUs />
        <div className="py-16">
          <BioclinTimeline />
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default About;