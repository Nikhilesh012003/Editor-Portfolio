import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Film, Palette, Layers, Music, Smartphone, Star } from "lucide-react";

const services = [
  {
    icon: Film,
    title: "Video Editing",
    desc: "Professional cuts, transitions, and storytelling that keeps your audience hooked from start to finish.",
    color: "bg-amber-50 border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    popular: false,
  },
  // {
  //   icon: Palette,
  //   title: "Color Grading",
  //   desc: "Cinematic color science that transforms your footage — from moody tones to vibrant commercial looks.",
  //   color: "bg-orange-50 border-orange-200",
  //   iconBg: "bg-orange-100",
  //   iconColor: "text-orange-600",
  //   popular: true,
  // },
  // {
  //   icon: Layers,
  //   title: "Motion Graphics",
  //   desc: "Eye-catching titles, lower thirds, and animated graphics that add production value to any project.",
  //   color: "bg-yellow-50 border-yellow-200",
  //   iconBg: "bg-yellow-100",
  //   iconColor: "text-yellow-600",
  //   popular: false,
  // },
  // {
  //   icon: Music,
  //   title: "Sound Design",
  //   desc: "Crisp audio mixing, music syncing, SFX layering — because great video needs great sound.",
  //   color: "bg-rose-50 border-rose-200",
  //   iconBg: "bg-rose-100",
  //   iconColor: "text-rose-500",
  //   popular: false,
  // },
  {
    icon: Smartphone,
    title: "Short-Form Content",
    desc: "Reels, TikToks & YouTube Shorts optimized for maximum engagement and platform algorithms.",
    color: "bg-violet-50 border-violet-200",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    popular: false,
  },
  {
    icon: Star,
    title: "Brand Commercials",
    desc: "Polished, professional brand videos that tell your story and drive conversions.",
    color: "bg-teal-50 border-teal-200",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    popular: false,
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      className="py-24"
      style={{
        background: "linear-gradient(180deg, #fdfaf6 0%, #fff8f0 100%)",
      }}
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-500 font-semibold text-sm tracking-widest uppercase">
            What I Offer
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-stone-800 mt-2 mb-4">
            Services Tailored <br />
            to Your Vision
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            From a single reel to a full commercial campaign, I've got every
            stage of your video covered.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(
            (
              { icon: Icon, title, desc, color, iconBg, iconColor, popular },
              i,
            ) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative p-6 rounded-3xl border-2 ${color} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default group`}
              >
                {popular && (
                  <div className="absolute -top-3 left-6 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div
                  className={`w-12 h-12 ${iconBg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon size={22} className={iconColor} />
                </div>
                <h3 className="font-display text-xl font-bold text-stone-800 mb-2">
                  {title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
