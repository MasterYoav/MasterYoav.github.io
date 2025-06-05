
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, FolderOpen, User, Mail, Github, Linkedin, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Home", path: createPageUrl("Portfolio"), icon: Home },
    { name: "Projects", path: createPageUrl("Projects"), icon: FolderOpen },
    { name: "About", path: createPageUrl("About"), icon: User },
    { name: "Contact", path: createPageUrl("Contact"), icon: Mail },
  ];

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const linkWrapperVariants = {
    hover: { scale: 1.02 }, // Slight scale on the wrapper for a subtle lift
    tap: { scale: 0.98 },
  };
  
  const iconVariants = {
    hover: { rotate: 5, scale: 1.1 },
    tap: { scale: 0.9 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to={createPageUrl("Portfolio")} className="group">
              <motion.div 
                className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05, x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                Portfolio
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <motion.div
                  key={item.name}
                  variants={linkWrapperVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="relative" // For positioning the active pill
                >
                  <Link
                    to={item.path}
                    className={`block px-4 py-2 rounded-full transition-colors duration-200 ${
                      isActive(item.path)
                        ? "text-blue-600" // Pill provides background
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 bg-blue-50 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        style={{ zIndex: -1 }} // Ensure pill is behind text
                      />
                    )}
                    <span className="relative flex items-center gap-2 font-medium">
                      <motion.div variants={iconVariants} whileHover="hover"> {/* Apply icon hover here if desired */}
                        <item.icon className="w-4 h-4" />
                      </motion.div>
                      {item.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                onClick={toggleMobileMenu}
                className="text-gray-600 hover:text-gray-900 p-2 rounded-md focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={isMobileMenuOpen ? "x" : "menu"}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden mt-4 pt-4 border-t border-gray-100 overflow-hidden"
              >
                <div className="flex flex-col space-y-1"> {/* Reduced space-y for tighter packing */}
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 25 }}
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`relative rounded-xl cursor-pointer group ${
                        isActive(item.path) ? "" : "hover:bg-gray-100"
                      }`} // Apply hover background to the div
                    >
                      <Link
                        to={item.path}
                        className={`block w-full transition-colors duration-200 ${
                            isActive(item.path) ? "text-blue-600" : "text-gray-600 group-hover:text-gray-900"
                        }`}
                      >
                        {isActive(item.path) && (
                          <motion.div
                            layoutId="navbar-mobile-active-pill"
                            className="absolute inset-0 bg-blue-50 rounded-xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            style={{ zIndex: -1 }}
                          />
                        )}
                        <span className="relative flex items-center gap-3 px-4 py-3"> {/* Content within Link for proper spacing and click area */}
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.name}</span>
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                   {/* Social Links in Mobile Menu */}
                  <div className="flex items-center justify-center space-x-6 pt-4">
                    <motion.a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-800 transition-colors"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github className="w-6 h-6" />
                    </motion.a>
                    <motion.a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-600 transition-colors"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Linkedin className="w-6 h-6" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPageName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-32 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Let's Create Something Amazing</h3>
            <p className="text-gray-400 mb-6">
              Always excited to collaborate on new projects and ideas.
            </p>
            <div className="flex justify-center space-x-6">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500 text-sm">
              © 2024 Portfolio. Crafted with passion and precision.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
