import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Upload, Mail, ArrowRight } from "lucide-react";

const jobOpenings = [
  {
    title: "SAS Programmer I",
    experience: "0-5 years of experience",
    type: "Full-time",
    location: "On-site",
    id: "SAS-01",
    description: "Position: SAS Programmer I\nExperience: 0-5 years\nType: Full-time\nLocation: On-site\n\nI am interested in applying for the SAS Programmer I position at BioClinPharm."
  },
  {
    title: "Bio-Statistician I",
    experience: "0-2 years of experience",
    type: "Full-time",
    location: "Hybrid",
    id: "BST-01",
    description: "Position: Bio-Statistician I\nExperience: 0-2 years\nType: Full-time\nLocation: Hybrid\n\nI am interested in applying for the Bio-Statistician I position at BioClinPharm."
  },
  {
    title: "Business Development Analyst",
    experience: "0-4 years of experience",
    type: "Full-time",
    location: "On-site",
    id: "BDA-01",
    description: "Position: Business Development Analyst\nExperience: 0-4 years\nType: Full-time\nLocation: On-site\n\nI am interested in applying for the Business Development Analyst position at BioClinPharm."
  },
  {
    title: "Business Development Manager",
    experience: "6-10 years of experience",
    type: "Full-time",
    location: "Hybrid",
    id: "BDM-01",
    description: "Position: Business Development Manager\nExperience: 6-10 years\nType: Full-time\nLocation: Hybrid\n\nI am interested in applying for the Business Development Manager position at BioClinPharm."
  },
  {
    title: "Clinical Research Coordinator II",
    experience: "2-4 years of experience",
    type: "Full-time",
    location: "On-site",
    id: "CRC-01",
    description: "Position: Clinical Research Coordinator II\nExperience: 2-4 years\nType: Full-time\nLocation: On-site\n\nI am interested in applying for the Clinical Research Coordinator II position at BioClinPharm."
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const JobCard = ({ job }: { job: typeof jobOpenings[0] }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
  };

  const handleApply = () => {
    const mailtoLink = `mailto:hr@bioclinpharm.com?subject=Application for ${job.title} [${job.id}]&body=${encodeURIComponent(job.description)}`;
    window.location.href = mailtoLink;
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
    >
      {/* Gradient spotlight animation */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              rgba(var(--primary-rgb), 0.1),
              transparent 80%
            )
          `
        }}
      />

      <div className="relative flex items-center justify-between">
        <div className="flex-1">
          <motion.h3 
            className="text-xl font-bold mb-2 font-playfair bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {job.title}
          </motion.h3>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300 text-sm font-plusJakarta">
              {job.experience} • {job.type} • {job.location}
            </p>
            <div className="flex gap-2">
              <motion.span 
                className="inline-block px-3 py-1 rounded-full text-xs bg-primary/10 text-primary"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {job.type}
              </motion.span>
              <motion.span 
                className="inline-block px-3 py-1 rounded-full text-xs bg-secondary/10 text-secondary"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {job.location}
              </motion.span>
            </div>
          </div>
        </div>
        <motion.button
          onClick={handleApply}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors duration-300 group/button"
        >
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/button:translate-x-1" />
        </motion.button>
      </div>

      {/* Hover line animation */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const Career = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
            <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-300% animate-gradient font-playfair"
            >
              Join Our Team
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-12 font-plusJakarta"
            >
              We are always looking for talented individuals to join our growing team. Upload your resume or contact our HR directly to explore career opportunities with us.
            </motion.p>
          </div>
        </motion.div>

        {/* Background Animation */}
        <motion.div
          className="absolute inset-0 -z-10 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: "radial-gradient(circle at center, var(--primary) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </section>

      {/* Upload Resume Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* Upload Box */}
              <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-playfair">Upload Your Resume</h3>
                  <label className="block w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary transition-colors duration-300">
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Drop your resume here or click to browse</span>
                  </label>
                </div>
              </motion.div>

              {/* Email Box */}
              <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-playfair">Send via Email</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Or send your resume directly to</p>
                  <a
                    href="mailto:hr@bioclinpharm.com"
                    className="text-primary hover:text-secondary transition-colors duration-300"
                  >
                    hr@bioclinpharm.com
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-16 font-playfair"
          >
            Latest Job Openings
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {jobOpenings.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
};

export default Career;