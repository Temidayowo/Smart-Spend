"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import {
  AnimateOnScroll,
  StaggerContainer,
  StaggerItem,
  scaleIn,
} from "@/components/ui/MotionWrapper";

const reviews = [
  {
    name: "Adaeze Okafor",
    role: "Freelance Designer",
    avatar: "AO",
    text: "I've tried six budget apps. Spend Smart is the only one I actually stuck with. The UI is clean and the insights are genuinely useful.",
  },
  {
    name: "Chukwuemeka Eze",
    role: "Software Engineer",
    avatar: "CE",
    text: "As someone who hated tracking expenses, this app changed everything. Took me two minutes to set up and I was instantly hooked.",
  },
  {
    name: "Fatima Al-Hassan",
    role: "MBA Student",
    avatar: "FA",
    text: "The recurring expense tracker alone saved me ₦40k in forgotten subscriptions. Worth every second.",
  },
  {
    name: "Blessing Nwosu",
    role: "Small Business Owner",
    avatar: "BN",
    text: "I use it for both personal and business finances. The category system is flexible enough for everything.",
  },
  {
    name: "Tunde Adeyemi",
    role: "Financial Analyst",
    avatar: "TA",
    text: "I recommended this to my entire team. The spending insights rival tools that cost 10× more.",
  },
  {
    name: "Ngozi Obi",
    role: "Healthcare Professional",
    avatar: "NO",
    text: "Simple, beautiful, and it actually works. I've cut my monthly spending by 20% in three months.",
  },
];

function ReviewCard({
  name,
  role,
  avatar,
  text,
}: {
  name: string;
  role: string;
  avatar: string;
  text: string;
}) {
  return (
    <StaggerItem>
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(33,88,210,0.08)" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative p-7 rounded-2xl bg-white border border-gray-100 h-full overflow-hidden"
        style={{ boxShadow: "0 1px 20px rgba(0,0,0,0.04)" }}
      >
        {/* Hover background blob */}
        <motion.div
          className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-blue-50"
          initial={{ scale: 1, opacity: 0 }}
          whileHover={{ scale: 3.5, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Stars */}
        <div className="flex gap-0.5 mb-4">
          {[...Array(5)].map((_, j) => (
            <motion.div
              key={j}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: j * 0.06, ease: "backOut" }}
            >
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
            </motion.div>
          ))}
        </div>

        {/* Review text */}
        <p className="relative text-gray-600 text-sm leading-relaxed mb-6">
          "{text}"
        </p>

        {/* Author */}
        <div className="relative flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="w-10 h-10 rounded-full bg-[#2158d2] flex items-center justify-center text-white text-xs font-bold shrink-0"
          >
            {avatar}
          </motion.div>
          <div>
            <div className="text-sm font-bold text-[#0d1b3e]">{name}</div>
            <div className="text-xs text-gray-400">{role}</div>
          </div>
        </div>

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

const Reviews = () => {
  return (
    <section id="reviews" className="py-28 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimateOnScroll variants={scaleIn} duration={0.4}>
            <span className="text-xs font-bold uppercase tracking-widest text-[#2158d2] bg-blue-50 px-3 py-1 rounded-full">
              Reviews
            </span>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1} duration={0.6}>
            <h2
              className="text-4xl sm:text-5xl font-black text-[#0d1b3e] mt-4 mb-4 tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Loved by thousands
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2} duration={0.5}>
            <p className="text-gray-500 text-lg">
              Don't take our word for it — hear from real users.
            </p>
          </AnimateOnScroll>
        </div>

        {/* Grid */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.08}
        >
          {reviews.map(({ name, role, avatar, text }) => (
            <ReviewCard
              key={name}
              name={name}
              role={role}
              avatar={avatar}
              text={text}
            />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Reviews;
