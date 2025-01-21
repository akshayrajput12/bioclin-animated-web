import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Microscope, Database, ChartBar, ClipboardList, ScrollText, FileText } from "lucide-react";
import { Button3D } from "./ui/button-3d";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Clinical Research Services",
    description: "Expert study design, data collection, and analysis for high-quality research outcomes. Supporting every phase of clinical trials.",
    icon: Microscope,
    color: "bg-gradient-to-br from-primary/80 to-primary"
  },
  {
    title: "Data and Analysis Services",
    description: "Comprehensive data management and statistical analysis providing accurate, actionable insights for informed decision-making.",
    icon: Database,
    color: "bg-gradient-to-br from-secondary/80 to-secondary"
  },
  {
    title: "Biostatistics Programming",
    description: "Advanced statistical methods and programming expertise supporting clinical research and regulatory compliance.",
    icon: ChartBar,
    color: "bg-gradient-to-br from-accent/80 to-accent"
  },
  {
    title: "Trial Management",
    description: "End-to-end clinical trial management ensuring efficient, ethical, and compliant research execution.",
    icon: ClipboardList,
    color: "bg-gradient-to-br from-primary/80 via-secondary/80 to-accent"
  },
  {
    title: "Regulatory Services",
    description: "Strategic guidance and support for regulatory documentation and submissions across global markets.",
    icon: ScrollText,
    color: "bg-gradient-to-br from-secondary/80 via-accent/80 to-primary"
  },
  {
    title: "Medical Writing",
    description: "Professional medical and scientific writing services for protocols, reports, and publications.",
    icon: FileText,
    color: "bg-gradient-to-br from-accent/80 via-primary/80 to-secondary"
  }
];

const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="group relative overflow-hidden rounded-3xl p-8 h-full transform-gpu"
      style={{ perspective: "1000px" }}
    >
      <div 
        className={`absolute inset-0 ${service.color} opacity-10 group-hover:opacity-20 
                   transition-opacity transform group-hover:rotate-2 duration-300`} 
      />
      <div className="relative z-10 transform transition-transform duration-300 group-hover:translate-z-10">
        <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-6 
                        transform transition-transform duration-300 group-hover:scale-110`}>
          <service.icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{service.title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
      </div>
      <div className="absolute inset-0 border border-gray-200 dark:border-gray-800 rounded-3xl pointer-events-none 
                    transform group-hover:rotate-2 transition-transform duration-300" />
    </motion.div>
  );
};

const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity, scale }}
      className="py-24 bg-gray-50 dark:bg-gray-900/50"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent"
          >
            Our Comprehensive Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 mb-8"
          >
            Empowering healthcare research with cutting-edge data science solutions and comprehensive clinical trial support.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <Button3D onClick={() => navigate("/services")} className="w-64">
              Explore Services
            </Button3D>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;
