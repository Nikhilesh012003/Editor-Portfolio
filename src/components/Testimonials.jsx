import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "YouTube Creator — 200K Subscribers",
    avatar: "PS",
    avatarColor: "bg-pink-200 text-pink-700",
    rating: 5,
    text: "Raj completely transformed my channel's look. My watch time doubled after his edits. He has an incredible eye for pacing and storytelling that just hooks viewers. Highly recommend!",
  },
  {
    name: "Arjun Mehta",
    role: "Founder, Mehta Apparel Brand",
    avatar: "AM",
    avatarColor: "bg-blue-200 text-blue-700",
    rating: 5,
    text: "We needed a high-end commercial for our brand launch and Raj delivered beyond expectations. The color grading alone made our products look like they belonged in a luxury magazine shoot.",
  },
  {
    name: "Neha Joshi",
    role: "Wedding Planner & Influencer",
    avatar: "NJ",
    avatarColor: "bg-amber-200 text-amber-700",
    rating: 5,
    text: "The wedding reel Raj created made the couple cry with joy! He captured emotions so beautifully and his music sync was absolutely perfect. He's my go-to editor for all events now.",
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const prev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((i) => (i + 1) % testimonials.length);

  const t = testimonials[idx];

  return (
    <section id="testimonials" className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-500 font-semibold text-sm tracking-widest uppercase">Reviews</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-stone-800 mt-2 mb-4">
            What Clients Say
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {/* Main card */}
          <div className="relative bg-linear-to-br from-amber-50 to-orange-50 rounded-3xl p-10 border border-amber-100 shadow-xl shadow-amber-100/50">
            <Quote className="text-amber-300 mb-6" size={48} />

            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-amber-500 fill-amber-500" />
                  ))}
                </div>

                <p className="text-stone-600 text-lg leading-relaxed mb-8 italic">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${t.avatarColor} flex items-center justify-center font-bold text-sm`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-stone-800">{t.name}</div>
                    <div className="text-stone-500 text-sm">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prev}
              className="w-11 h-11 bg-white border-2 border-stone-200 rounded-full flex items-center justify-center hover:border-amber-400 hover:text-amber-600 transition-all hover:shadow-md"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === idx ? "w-8 h-3 bg-amber-500" : "w-3 h-3 bg-stone-200 hover:bg-amber-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 bg-white border-2 border-stone-200 rounded-full flex items-center justify-center hover:border-amber-400 hover:text-amber-600 transition-all hover:shadow-md"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* All 3 mini cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid sm:grid-cols-3 gap-4 mt-12"
        >
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`p-5 rounded-2xl text-left border-2 transition-all duration-300 ${
                i === idx
                  ? "border-amber-400 bg-amber-50 shadow-lg shadow-amber-100"
                  : "border-stone-100 bg-stone-50 hover:border-amber-200 hover:bg-amber-50/50"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-full ${t.avatarColor} flex items-center justify-center font-bold text-xs`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-stone-700 text-sm">{t.name}</div>
                </div>
              </div>
              <p className="text-stone-500 text-xs line-clamp-2">{t.text}</p>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
