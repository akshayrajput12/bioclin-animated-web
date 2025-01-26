import React, { useState } from "react";
import { Home, User, Briefcase, Phone, FileText, Menu, X } from "lucide-react";
import { TubelightNavbar } from "./ui/tubelight-navbar";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", url: "/", icon: Home },
  { name: "About", url: "/about", icon: User },
  { name: "Services", url: "/services", icon: Briefcase },
  { name: "Career", url: "/career", icon: FileText },
  { name: "Contact", url: "/contact", icon: Phone },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          <Link 
            to="/" 
            className="flex items-center space-x-4 group"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <img 
                src={logo} 
                alt="BioClinPharm Logo" 
                className="w-16 h-16 object-contain transition-transform duration-300 group-hover:rotate-6" 
              />
            </motion.div>
            <motion.div 
              className="flex flex-col"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="font-playfair text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                BioClinPharm
              </span>
              <span className="font-plusJakarta text-sm text-gray-600 dark:text-gray-300">
                A Data Science Company
              </span>
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <TubelightNavbar items={navItems} />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-lg bg-primary/10 text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4">
                <TubelightNavbar 
                  items={navItems} 
                  className="flex flex-col items-center space-y-2"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;