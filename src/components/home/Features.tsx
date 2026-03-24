"use client";

import { motion } from "motion/react";
import { Bell, PieChart, Repeat, Shield, TrendingUp, Zap } from "lucide-react";
import {
  AnimateOnScroll,
  StaggerContainer,
  StaggerItem,
  scaleIn,
} from "@/components/ui/MotionWrapper";
import { use } from "react";

const features = [
  {
    icon: PieChart,
    title: "Smart Budgeting",
    desc: "Set budgets by category and get real-time alerts before you overspend.",
  },
  {
    icon: Zap,
    title: "Instant Tracking",
    desc: "Log expenses in seconds. Every transaction tagged, categorised, and sorted automatically.",
  },
  {
    icon: TrendingUp,
    title: "Spending Insights",
    desc: "Beautiful charts that reveal exactly where your money goes each month.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    desc: "Timely nudges when you're approaching limits so you stay in control.",
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    desc: "Your data is encrypted end-to-end and never sold to third parties.",
  },
  {
    icon: Repeat,
    title: "Recurring Expenses",
    desc: "Track subscriptions and recurring bills so nothing slips through the cracks.",
  },
];

function FeatureCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <StaggerItem>
      <motion.div
        whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(33,88,210,0.12)" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="group relative overflow-hidden p-7 rounded-2xl border border-gray-100 bg-white cursor-default h-full"
        style={{ boxShadow: "0 1px 20px rgba(0,0,0,0.04)" }}
      >
        {/* Background blob */}
        <motion.div
          className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-blue-50"
          initial={{ scale: 1, opacity: 0 }}
          whileHover={{ scale: 3.5, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Icon */}
        <motion.div
          className="relative w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5"
          whileHover={{ backgroundColor: "#2158d2" }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            whileHover={{ rotate: [0, -12, 8, 0], scale: [1, 1.2, 0.95, 1] }}
            transition={{ duration: 0.4 }}
          >
            <Icon
              size={22}
              className="text-[#2158d2]"
            />
          </motion.div>
        </motion.div>

        {/* Text */}
        <h3 className="relative text-lg font-bold text-[#0d1b3e] mb-2">
          {title}
        </h3>
        <p className="relative text-gray-500 text-sm leading-relaxed">{desc}</p>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-[#2158d2] to-cyan-400 rounded-full"
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </motion.div>
    </StaggerItem>
  );
}

const Features = () => {
  return (
    <section id="features" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimateOnScroll variants={scaleIn} duration={0.4}>
            <span className="text-xs font-bold uppercase tracking-widest text-[#2158d2] bg-blue-50 px-3 py-1 rounded-full">
              Features
            </span>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1} duration={0.6}>
            <h2
              className="text-4xl sm:text-5xl font-black text-[#0d1b3e] mt-4 mb-4 tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Everything you need,
              <br />
              nothing you don't
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2} duration={0.5}>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Purpose-built tools that make managing money feel less like a
              chore.
            </p>
          </AnimateOnScroll>
        </div>

        {/* Grid */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.08}
        >
          {features.map(({ icon, title, desc }) => (
            <FeatureCard key={title} icon={icon} title={title} desc={desc} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Features;
