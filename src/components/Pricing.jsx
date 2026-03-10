import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "₹4,999",
    usd: "$60",
    desc: "Perfect for short-form content and simple projects",
    color: "bg-white border-stone-200",
    btnClass: "border-2 border-amber-400 text-amber-600 hover:bg-amber-500 hover:text-white",
    badge: null,
    features: [
      "Up to 3-minute edited video",
      "Basic color correction",
      "Background music sync",
      "2 revision rounds",
      "3-day delivery",
      "1080p export",
    ],
    missing: ["Motion graphics", "Sound design", "Priority support"],
  },
  {
    name: "Standard",
    price: "₹9,999",
    usd: "$120",
    desc: "Great for YouTube creators and brand content",
    color: "bg-gradient-to-br from-amber-500 to-orange-400 border-amber-400",
    btnClass: "bg-white text-amber-600 hover:bg-amber-50",
    badge: "Most Popular",
    white: true,
    features: [
      "Up to 10-minute edited video",
      "Professional color grading",
      "Motion graphics & titles",
      "Sound design & SFX",
      "4 revision rounds",
      "2-day delivery",
      "4K export",
    ],
    missing: ["Priority support"],
  },
  {
    name: "Premium",
    price: "₹19,999",
    usd: "$240",
    desc: "Full-service for brands and commercial productions",
    color: "bg-white border-stone-200",
    btnClass: "border-2 border-amber-400 text-amber-600 hover:bg-amber-500 hover:text-white",
    badge: null,
    features: [
      "Up to 30-minute edited video",
      "Cinematic color grading",
      "Advanced motion graphics",
      "Full sound design mix",
      "Unlimited revisions",
      "Same-day delivery",
      "4K + multiple formats",
      "Priority WhatsApp support",
    ],
    missing: [],
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-24" style={{ background: "linear-gradient(180deg, #fdfaf6 0%, #fff8f0 100%)" }} ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-500 font-semibold text-sm tracking-widest uppercase">Pricing</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-stone-800 mt-2 mb-4">
            Transparent Pricing
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            No hidden fees. No surprises. Just great work at fair prices.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative rounded-3xl border-2 p-8 ${p.color} ${
                p.badge ? "shadow-2xl shadow-amber-200 scale-105 z-10" : "hover:shadow-xl hover:shadow-stone-100"
              } transition-all duration-300`}
            >
              {p.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-amber-600 font-bold text-xs px-4 py-1.5 rounded-full shadow-md flex items-center gap-1">
                  <Zap size={12} fill="currentColor" />
                  {p.badge}
                </div>
              )}

              <div className={p.white ? "text-white" : ""}>
                <h3 className={`font-display text-xl font-bold mb-1 ${p.white ? "text-white" : "text-stone-800"}`}>{p.name}</h3>
                <p className={`text-sm mb-6 ${p.white ? "text-white/80" : "text-stone-500"}`}>{p.desc}</p>

                <div className="mb-8">
                  <span className={`font-display text-4xl font-bold ${p.white ? "text-white" : "text-stone-800"}`}>{p.price}</span>
                  <span className={`text-sm ml-2 ${p.white ? "text-white/70" : "text-stone-400"}`}>/ project · {p.usd}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        p.white ? "bg-white/30" : "bg-amber-100"
                      }`}>
                        <Check size={11} className={p.white ? "text-white" : "text-amber-600"} strokeWidth={3} />
                      </div>
                      <span className={`text-sm ${p.white ? "text-white/90" : "text-stone-600"}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${p.btnClass} hover:shadow-lg`}
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-stone-400 text-sm mt-8"
        >
          Need a custom project? <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="text-amber-600 font-semibold hover:underline">Let's talk →</button>
        </motion.p>
      </div>
    </section>
  );
}
