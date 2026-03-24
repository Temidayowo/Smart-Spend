"use client";

import Link from "next/link";
import { ChartLine, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { fadeDown, slideLeft, slideRight, scaleIn } from "@/components/ui/MotionWrapper";

const navLinks = ["Features", "How It Works", "Reviews", "Contact"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (isDesktop) setMobileOpen(false);
  }, [isDesktop]);

  const isDark = !scrolled && !mobileOpen;

  return (
    <motion.nav
      variants={fadeDown}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isDark ? "transparent" : "rgba(255,255,255,0.95)",
        backdropFilter: isDark ? "none" : "blur(12px)",
        borderBottom: isDark
          ? "1px solid transparent"
          : "1px solid #e5e7eb",
        boxShadow: scrolled ? "0 1px 24px rgba(33,88,210,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center gap-2.5"
        >
          <motion.span
            whileHover={{ scale: 1.1, rotate: -6 }}
            transition={{ duration: 0.2 }}
            className="bg-[#2158d2] p-1.5 rounded-md inline-flex"
          >
            <ChartLine className="text-white" size={18} />
          </motion.span>
          <span
            className="text-lg font-black tracking-tight transition-colors duration-300"
            style={{ color: isDark ? "#ffffff" : "#0d1b3e" }}
          >
            Spend Smart
          </span>
        </motion.div>

        {/* Desktop nav links */}
        {isDesktop && (
          <motion.div
            className="flex items-center gap-8 text-sm font-medium"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {navLinks.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -1 }}
                className="transition-colors duration-300 hover:text-[#2158d2]"
                style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#4b5563" }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}

        {/* Desktop CTAs */}
        {isDesktop && (
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-3"
          >
            <Link
              href="/login"
              className="text-sm font-semibold px-4 py-2 rounded-lg border transition-all duration-200"
              style={
                isDark
                  ? { color: "#ffffff", borderColor: "rgba(255,255,255,0.4)" }
                  : { color: "#2158d2", borderColor: "#2158d2" }
              }
            >
              Login
            </Link>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/register"
                className="text-sm font-semibold text-white bg-[#2158d2] px-4 py-2 rounded-lg hover:bg-[#1a46b0] transition-colors duration-200 shadow-md shadow-blue-900/30"
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        )}

        {/* Mobile CTA + Hamburger */}
        {!isDesktop && (
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-3"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen((v) => !v)}
              className="p-2 rounded-lg transition-colors duration-200"
              style={{ color: isDark ? "#ffffff" : "#0d1b3e" }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    variants={scaleIn}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    variants={scaleIn}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && !isDesktop && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-gray-100"
          >
            <motion.div
              className="px-6 py-4 flex flex-col gap-1"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {navLinks.map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                  onClick={() => setMobileOpen(false)}
                  variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="block text-sm font-medium text-[#4b5563] hover:text-[#2158d2] py-3 border-b border-gray-50 last:border-0 transition-colors"
                >
                  {item}
                </motion.a>
              ))}
              <motion.div
                className="flex flex-col gap-2 mt-2"
                variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center text-sm font-semibold text-[#2158d2] border border-[#2158d2] px-4 py-2.5 rounded-lg hover:bg-[#2158d2] hover:text-white transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center text-sm font-semibold text-white bg-[#2158d2] px-4 py-2.5 rounded-lg hover:bg-[#1a46b0] transition-colors duration-200"
                >
                  Get Started
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;