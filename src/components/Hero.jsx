import { motion } from "framer-motion";
import { Play, ArrowDown, Sparkles } from "lucide-react";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20"
      style={{
        background:
          "linear-gradient(135deg, #fdfaf6 0%, #fef3e0 40%, #fff8f0 100%)",
      }}
    >
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-amber-100/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-56 h-56 rounded-full bg-orange-100/50 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full border border-amber-200/40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-225 h-225 rounded-full border border-amber-100/30 pointer-events-none" />

      {/* Floating film strip element */}
      <motion.div
        className="absolute top-32 left-8 hidden lg:flex flex-col gap-1 opacity-20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-12 h-8 border-2 border-stone-400 rounded-sm flex items-center justify-center"
          >
            <div className="w-6 h-4 bg-stone-300 rounded-xs" />
          </div>
        ))}
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div variants={stagger} initial="hidden" animate="show">
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-white/80 border border-amber-200 text-amber-700 text-sm font-medium px-4 py-2 rounded-full mb-6 shadow-sm"
          >
            <Sparkles size={14} />
            Available for freelance projects
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-stone-800 leading-tight mb-4"
          >
            Crafting Stories With{" "}
            <span className="relative inline-block">
              <span className="text-amber-500">Raj Kukade</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
              >
                <path
                  d="M2 8 Q75 2 150 8 Q225 14 298 8"
                  stroke="#d4a853"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            className="text-stone-500 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Hi, I'm <strong className="text-stone-700">Raj Kukade</strong> — a
            freelance video editor turning raw footage into cinematic
            experiences. Specializing in reels, YouTube content & brand
            commercials.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-4 justify-center"
          >
            <button
              onClick={() =>
                document
                  .getElementById("portfolio")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-amber-200 hover:shadow-amber-300 transition-all hover:-translate-y-1"
            >
              <Play size={16} fill="white" />
              View My Work
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-2 bg-white hover:bg-stone-50 text-stone-700 font-semibold px-7 py-3.5 rounded-full border border-stone-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              Let's Collaborate
            </button>
          </motion.div>

          {/* Stats */}
          {/* <motion.div
            variants={fadeUp}
            className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
          >
            {[
              { value: "50+", label: "Projects Done" },
              { value: "3+", label: "Years Experience" },
              { value: "30+", label: "Happy Clients" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl font-bold text-amber-600">
                  {s.value}
                </div>
                <div className="text-stone-500 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div> */}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
}
