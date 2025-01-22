import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const careerPositions = [
  {
    title: "Senior Biostatistician",
    department: "Clinical Research",
    location: "Remote / Hybrid",
    type: "Full-time",
    description: "Looking for an experienced biostatistician to lead statistical analysis in clinical trials."
  },
  {
    title: "Clinical Data Manager",
    department: "Data Management",
    location: "Hybrid",
    type: "Full-time",
    description: "Seeking a data manager to oversee clinical trial data collection and quality control."
  },
  {
    title: "Statistical Programmer",
    department: "Programming",
    location: "Remote",
    type: "Full-time",
    description: "Join our team to develop and maintain statistical programming for clinical trials."
  }
];

const Career = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Be part of a team that's revolutionizing clinical research through innovative data science solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerPositions.map((position, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                    {position.department}
                  </span>
                  <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-full text-sm">
                    {position.location}
                  </span>
                  <span className="bg-accent/10 text-accent px-2 py-1 rounded-full text-sm">
                    {position.type}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 flex-grow">
                  {position.description}
                </p>
                <Button className="mt-4 w-full">Apply Now</Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Career;