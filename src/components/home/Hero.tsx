import Link from "next/link";
import { ArrowRight, ChevronDown, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d1b3e]">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#2158d2 1px,transparent 1px),linear-gradient(90deg,#2158d2 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #2158d2, transparent)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div
          className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8 text-sm text-blue-200 font-medium backdrop-blur-sm"
          style={{ animation: "fadeInDown 0.6s ease both" }}
        >
          <Zap size={14} className="text-yellow-400" />
          Smart expense tracking for modern life
        </div>

        <h1
          className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-6"
          style={{
            animation: "fadeInUp 0.7s ease 0.1s both",
            fontFamily: "'Syne', sans-serif",
          }}
        >
          Take Control of
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #60a5fa, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Your Money
          </span>
        </h1>

        <p
          className="text-lg sm:text-xl text-blue-200 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ animation: "fadeInUp 0.7s ease 0.2s both" }}
        >
          Spend Smart helps you track expenses, set budgets, and uncover
          insights that turn financial stress into financial confidence.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animation: "fadeInUp 0.7s ease 0.3s both" }}
        >
          <Link
            href="/register"
            className="group flex items-center gap-2 bg-[#2158d2] hover:bg-[#1a46b0] text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-xl shadow-blue-900/50"
          >
            Start for Free
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <a
            href="#how-it-works"
            className="flex items-center gap-2 text-blue-200 hover:text-white font-semibold px-6 py-4 transition-colors"
          >
            See how it works <ChevronDown size={16} />
          </a>
        </div>

        {/* Stats */}
        <div
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          style={{ animation: "fadeInUp 0.7s ease 0.4s both" }}
        >
          {[
            ["10k+", "Active Users"],
            ["₦2B+", "Tracked Monthly"],
            ["4.9★", "App Rating"],
          ].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-white">
                {val}
              </div>
              <div className="text-xs text-blue-300 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-blue-300 text-xs"
        style={{ animation: "bounce 2s infinite" }}
      >
        <div className="w-5 h-8 border-2 border-blue-400/50 rounded-full flex items-start justify-center pt-1.5">
          <div
            className="w-1 h-2 bg-blue-400 rounded-full"
            style={{ animation: "scrollDot 1.5s ease-in-out infinite" }}
          />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
        @keyframes fadeInUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeInDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scrollDot { 0%,100% { transform:translateY(0); opacity:1; } 50% { transform:translateY(6px); opacity:0.4; } }
      `}</style>
    </section>
  );
}

export default Hero;