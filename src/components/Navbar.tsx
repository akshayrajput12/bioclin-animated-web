import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { NavBar } from "./ui/tubelight-navbar";
import { Home, User, Briefcase, FileText } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "About", url: "/about", icon: User },
    { name: "Career", url: "/career", icon: Briefcase },
    { name: "Services", url: "/services", icon: FileText },
    { name: "Contact", url: "/contact", icon: FileText },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="BioClinPharm Logo" className="w-12 h-12 object-contain" />
            <div className="flex flex-col">
              <span className="font-playfair text-xl font-bold text-gray-800">BioClinPharm</span>
              <span className="font-plusJakarta text-sm text-gray-600">A Data Science Company</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <NavBar items={navItems} className="hidden md:flex space-x-8" />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-secondary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        className="md:hidden overflow-hidden bg-white"
      >
        <div className="container mx-auto px-4 py-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.url}
              className="block py-2 text-secondary hover:text-primary transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;