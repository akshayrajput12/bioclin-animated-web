import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "Clinical Research Services",
    description: `Our dedicated team has vast experience in coordinating phase II to IV trials on both national and international scales. We perform all stages of clinical trials – from feasibility to final study report – to the highest quality standards.

    Our core expertise includes:
    • Wide therapeutic experience
    • Excellent cooperation with site staff
    • In-depth knowledge of local requirements
    • Focus on South and South East Asia
    • Global coverage through partner CROs
    • Bilingual CRAs with extensive training
    • Real-time monitoring and response
    
    Clinical services include:
    • Study document development
    • CRA management and quality control
    • Clinical monitoring and site management
    • Clinical Trial Management System
    • Investigator meeting planning
    • Third-party vendor management
    • Quality training of clinical associates`,
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1470&h=800&fit=crop",
    alt: "Clinical research laboratory"
  },
  {
    title: "Data and Analysis Services",
    description: `The way you establish, collect, manage, interpret, and prepare clinical trial data can be the difference between success and failure. Our industry-leading team provides:

    Clinical Data Management:
    • On-shore and off-shore services
    • EDC and Paper Trial Set-Up & Management
    • Certified Medidata RAVE Builders
    • Data Management Plan development
    • CRF/eCRF design and development
    • Medical Coding
    • Real-time data viewing and reporting

    Using Insight — our powerful clinical trial management system — you gain access to real-time trial status at any time.`,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&h=800&fit=crop",
    alt: "Data analysis and visualization"
  },
  {
    title: "Trial Management and Site Management",
    description: `Our clinical trials team provides a global platform with focus on key aspects:
    • Site performance monitoring
    • Timeline management
    • Budget adherence
    • Risk assessment and mitigation
    • Quality compliance

    Our Project Managers feature:
    • Hands-on experience
    • Therapeutic area expertise
    • Medical team-driven compliance
    • Proven track record
    
    Site Management Services:
    • Network of 100+ GCP trained Investigator sites
    • Infrastructure setup and management
    • Site resource training
    • Regulatory compliance support`,
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1470&h=800&fit=crop",
    alt: "Clinical trial management"
  },
  {
    title: "Biostatistics and Statistical Programming",
    description: `Our expert team provides comprehensive statistical services including:

    • Pre-Clinical Studies support
    • Protocol Input and study design
    • Randomization/Unblinding services
    • Statistical Analysis Plan (SAP)
    • CDISC compliance
    • PK/PD Analysis
    • Meta Analysis
    • Interim Analysis/DSMBs
    • ISS/ISE integration
    
    We optimize the use of our Consultant Statisticians to ensure innovative approaches to increase the chances of a successful trial.`,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1470&h=800&fit=crop",
    alt: "Statistical analysis visualization"
  },
  {
    title: "Regulatory Services",
    description: `Our Strategic Regulatory team provides end-to-end solutions for navigating regulatory processes throughout your product's life cycle.

    Key Services:
    • Clinical trial authorizations (CTA)
    • Competent authority meetings
    • IND/IDE/BLA applications
    • Local representative services
    • Pediatric investigation plans (PIP)
    • Product labeling
    • Regulatory consultancy
    • Safety risk minimization plans
    • Scientific advice and protocol assistance
    
    We focus on mitigating risk and ensuring swift responses to help you avoid non-compliance issues.`,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1470&h=800&fit=crop",
    alt: "Regulatory compliance and documentation"
  },
  {
    title: "Medical Writing",
    description: `Our experienced medical writing team provides comprehensive documentation services:

    • Study Protocols
    • Regulatory Submissions
    • Clinical Study Reports
    • Safety Reports
    • Scientific Publications
    • Patient Information
    • Training Materials
    
    We ensure all documentation meets regulatory requirements while maintaining scientific accuracy and clarity. Our team collaborates closely with regulatory experts to deliver high-quality submissions that support your product's journey to market.`,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&h=800&fit=crop",
    alt: "Medical documentation and writing"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.3,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 1
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: 45 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 1
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

export function ServiceDetails() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, scale }}
      className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      {/* Background Animation */}
      <motion.div 
        className="absolute inset-0 opacity-10"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-5xl md:text-6xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-300% animate-gradient font-playfair"
        >
          Comprehensive Clinical Research Solutions
        </motion.h2>
        
        <div className="space-y-40">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-12 items-center group`}
            >
              <motion.div
                variants={imageVariants}
                className="w-full lg:w-1/2 perspective-1000"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl transform-gpu transition-all duration-500 group-hover:shadow-primary/20">
                  <motion.img
                    src={service.image}
                    alt={service.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute bottom-0 left-0 right-0 p-6 text-white"
                  >
                    <h4 className="text-xl font-semibold font-playfair">{service.title}</h4>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                className="w-full lg:w-1/2 space-y-6"
                variants={titleVariants}
              >
                <motion.h3
                  className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-playfair"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {service.title}
                </motion.h3>
                <motion.p
                  className="text-lg text-gray-600 dark:text-gray-300 whitespace-pre-line font-plusJakarta leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {service.description}
                </motion.p>
                <motion.div
                  className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: 80 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 