"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  AnimateOnScroll,
  StaggerContainer,
  StaggerItem,
  scaleIn,
} from "@/components/ui/MotionWrapper";

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  }

  return (
    <section id="contact" className="py-28 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <AnimateOnScroll variants={scaleIn} duration={0.4}>
            <span className="text-xs font-bold uppercase tracking-widest text-[#2158d2] bg-blue-50 px-3 py-1 rounded-full">
              Contact
            </span>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1} duration={0.6}>
            <h2
              className="text-4xl sm:text-5xl font-black text-[#0d1b3e] mt-4 mb-4 tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Get in touch
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2} duration={0.5}>
            <p className="text-gray-500">
              Have a question or feedback? We'd love to hear from you.
            </p>
          </AnimateOnScroll>
        </div>

        {/* Card */}
        <AnimateOnScroll delay={0.25} duration={0.6}>
          <div
            className="rounded-2xl border border-gray-100 bg-white p-8 sm:p-10"
            style={{ boxShadow: "0 4px 40px rgba(33,88,210,0.08)" }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center py-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: "backOut" }}
                    className="w-16 h-16 rounded-full bg-[#2158d2] flex items-center justify-center mx-auto mb-5"
                  >
                    <Mail className="text-white" size={26} />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-xl font-bold text-[#0d1b3e] mb-2"
                  >
                    Message sent!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="text-gray-500 text-sm"
                  >
                    We'll get back to you within 24 hours.
                  </motion.p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <StaggerContainer
                    className="flex flex-col gap-5"
                    staggerDelay={0.08}
                  >
                    {/* Name + Email row */}
                    <StaggerItem className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-[#0d1b3e] block mb-1.5">
                          Name
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Your name"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2158d2] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-[#0d1b3e] block mb-1.5">
                          Email
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2158d2] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                        />
                      </div>
                    </StaggerItem>

                    {/* Message */}
                    <StaggerItem>
                      <label className="text-sm font-semibold text-[#0d1b3e] block mb-1.5">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Tell us what's on your mind..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2158d2] focus:ring-2 focus:ring-blue-100 outline-none text-sm resize-none transition-all"
                      />
                    </StaggerItem>

                    {/* Submit */}
                    <StaggerItem>
                      <motion.button
                        type="submit"
                        disabled={loading}
                        onClick={handleSubmit}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full flex items-center justify-center gap-2 bg-[#2158d2] hover:bg-[#1a46b0] disabled:opacity-60 text-white font-bold px-8 py-4 rounded-xl text-sm transition-colors duration-200 shadow-lg shadow-blue-200"
                      >
                        <AnimatePresence mode="wait">
                          {loading ? (
                            <motion.span
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2"
                            >
                              <motion.div
                                className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              />
                              Sending...
                            </motion.span>
                          ) : (
                            <motion.span
                              key="idle"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2"
                            >
                              <Mail size={16} /> Send Message
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </StaggerItem>
                  </StaggerContainer>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default Contact;
