"use client";

import { ChartLine, Mail, Twitter, Github } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  AnimateOnScroll,
  StaggerContainer,
  StaggerItem,
  fadeUp,
  slideLeft,
} from "@/components/ui/MotionWrapper";

const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Reviews", href: "#reviews" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Login", href: "/login" },
      { label: "Register", href: "/register" },
      { label: "Reset Password", href: "/forgot-password" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

const socials = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Mail, href: "#", label: "Email" },
];

const Footer = () => {
  return (
    <footer className="bg-[#0d1b3e] py-16 px-6 relative overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Top section */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
          {/* Brand */}
          <AnimateOnScroll
            variants={slideLeft}
            duration={0.6}
            className="max-w-xs"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <motion.span
                whileHover={{ scale: 1.1, rotate: -6 }}
                transition={{ duration: 0.2 }}
                className="bg-[#2158d2] p-1.5 rounded-md inline-flex"
              >
                <ChartLine className="text-white" size={18} />
              </motion.span>
              <span className="text-lg font-black text-white tracking-tight">
                Spend Smart
              </span>
            </div>
            <p className="text-blue-300 text-sm leading-relaxed">
              The modern way to track expenses, set budgets, and take control of
              your financial future.
            </p>
          </AnimateOnScroll>

          {/* Links grid */}
          <StaggerContainer
            className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm"
            staggerDelay={0.08}
          >
            {footerLinks.map(({ heading, links }) => (
              <StaggerItem key={heading}>
                <h4 className="text-white font-bold mb-3">{heading}</h4>
                <ul className="space-y-2">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          href={href}
                          className="text-blue-300 hover:text-white transition-colors"
                        >
                          {label}
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-white/10"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Bottom bar */}
        <AnimateOnScroll variants={fadeUp} delay={0.2} duration={0.5}>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-blue-400">
            <span>
              © {new Date().getFullYear()} Spend Smart. All rights reserved.
            </span>
            <div className="flex items-center gap-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.2, color: "#fff" }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="text-blue-400 hover:text-white transition-colors"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </footer>
  );
};

export default Footer;
