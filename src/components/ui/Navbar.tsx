"use client";

import { useState } from "react";
import Link from "next/link";
import { ChartLine, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  fadeDown,
  fadeIn,
  slideLeft,
  slideRight,
  staggerContainer,
} from "./MotionWrapper";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const links = [
    { name: "Features", href: "/features" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Reviews", href: "/reviews" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md">
      <motion.div
        variants={fadeDown}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex items-center justify-between py-6 px-6 md:px-16 border-b-[0.5px] border-b-gray-200"
      >
        {/* Logo */}
        <div className="flex gap-3 items-center">
          <span className="bg-[#2158d2] p-1.5 inline-block rounded">
            <ChartLine className="text-white" size={20} />
          </span>
          <h1 className="text-xl font-bold text-[#2158d2]">Spend Smart</h1>
        </div>

        {/* Desktop nav links */}
        {!isMobile && (
          <nav>
            <ul className="flex gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-800 hover:text-[#2158d2] font-medium transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Desktop buttons */}
        {!isMobile && (
          <div className="flex gap-3 items-center">
            <Link
              href="/login"
              className="py-2 px-5 border-[1.5px] border-[#2158d2] text-[#2158d2] hover:bg-[#2158d2] hover:text-white text-sm font-medium rounded-lg transition-all duration-200"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="py-[9.5px] px-5 bg-[#2158d2] hover:bg-[#1a3fa0] text-white text-sm font-medium rounded-lg transition-all duration-200"
            >
              Get started
            </Link>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#2158d2] p-1"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        )}
      </motion.div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden bg-white border-t border-gray-100 shadow-md"
          >
            <div className="px-6 py-6 flex flex-col gap-6">
              <ul className="flex flex-col gap-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-gray-800 hover:text-[#2158d2] font-medium transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-2.5 px-5 border-[1.5px] border-[#2158d2] text-[#2158d2] hover:bg-[#2158d2] hover:text-white text-sm font-medium rounded-lg transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-2.5 px-5 bg-[#2158d2] hover:bg-[#1a3fa0] text-white text-sm font-medium rounded-lg transition-all duration-200"
                >
                  Get started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
