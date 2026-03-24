"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  AnimateOnScroll,
  StaggerContainer,
  StaggerItem,
  scaleIn,
} from "@/components/ui/MotionWrapper";

const steps = [
  {
    num: "01",
    title: "Create your account",
    desc: "Sign up in under 30 seconds — no credit card required.",
  },
  {
    num: "02",
    title: "Add your expenses",
    desc: "Log manually or let Spend Smart auto-categorise imports.",
  },
  {
    num: "03",
    title: "Set your budgets",
    desc: "Define monthly limits per category that match your lifestyle.",
  },
  {
    num: "04",
    title: "Watch your money grow",
    desc: "Follow the insights dashboard and hit your savings goals.",
  },
];

function StepCard({
  num,
  title,
  desc,
  index,
}: {
  num: string;
  title: string;
  desc: string;
  index: number;
}) {
  return (
    <StaggerItem>
      <motion.div
        whileHover={{ backgroundColor: "rgba(255,255,255,0.12)", y: -4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative p-7 rounded-2xl bg-white/5 border border-white/10 h-full"
      >
        {/* Step number */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="text-5xl font-black text-white/10 mb-4"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {num}
        </motion.div>

        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-blue-200 text-sm leading-relaxed">{desc}</p>

        {/* Animated bottom accent */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-blue-400 to-cyan-400 rounded-full"
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* Arrow between cards */}
        {index < steps.length - 1 && (
          <motion.div
            className="hidden lg:block absolute top-10 -right-3 z-10"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight size={20} className="text-blue-400/40" />
          </motion.div>
        )}
      </motion.div>
    </StaggerItem>
  );
}

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="py-28 bg-[#0d1b3e] relative overflow-hidden"
    >

      {/* Glow */}
      {/* some edits to be done here */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150  rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #2158d2, transparent)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimateOnScroll variants={scaleIn} duration={0.4}>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-300 bg-white/10 px-3 py-1 rounded-full">
              How It Works
            </span>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1} duration={0.6}>
            <h2
              className="text-4xl sm:text-5xl font-black text-white mt-4 mb-4 tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Up and running
              <br />
              in four steps
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2} duration={0.5}>
            <p className="text-blue-200 text-lg max-w-xl mx-auto">
              Getting started takes less than two minutes. No steep learning
              curve.
            </p>
          </AnimateOnScroll>
        </div>

        {/* Steps grid */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          staggerDelay={0.1}
        >
          {steps.map(({ num, title, desc }, i) => (
            <StepCard key={num} num={num} title={title} desc={desc} index={i} />
          ))}
        </StaggerContainer>

        {/* CTA */}
        <AnimateOnScroll delay={0.3} duration={0.5}>
          <div className="mt-12 text-center">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-white text-[#2158d2] font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors duration-200 text-base shadow-xl"
              >
                Get started free <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default HowItWorks;
