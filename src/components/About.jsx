import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Clock, Zap, Heart } from "lucide-react";

const tools = ["Capcut", "Adobe Premiere Pro", "DaVinci Resolve"];

const values = [
  {
    icon: Award,
    label: "Quality First",
    desc: "Every frame polished to perfection",
  },
  {
    icon: Clock,
    label: "On-Time Delivery",
    desc: "Deadlines are sacred to me",
  },
  { icon: Zap, label: "Fast Turnaround", desc: "Quick revisions, no delays" },
  { icon: Heart, label: "Passion-Driven", desc: "I love what I do — it shows" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-4/5 bg-linear-to-br from-amber-100 to-orange-100 flex items-center justify-center">
              {/* Placeholder portrait */}
              {/* <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-amber-200 mx-auto mb-4 flex items-center justify-center">
                  <span className="font-display text-4xl font-bold text-amber-600">
                    RK
                  </span>
                </div>
                <p className="text-stone-400 text-sm">
                  <img
                    src="/profile.jpeg"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </p>
              </div> */}
              {/* Profile Image */}
              <img
                src="/profile.jpeg"
                alt="Raj Kukade"
                className="w-full h-full object-cover"
              />
              {/* Decorative corner */}
              <div className="absolute top-4 right-4 w-16 h-16 border-4 border-amber-400 rounded-2xl opacity-40" />
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-amber-400/20 rounded-full" />
              {/* Decorative corner */}
              <div className="absolute top-4 right-4 w-16 h-16 border-4 border-amber-400 rounded-2xl opacity-40" />
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-amber-400/20 rounded-full" />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 bg-amber-500 text-white rounded-2xl p-4 shadow-xl shadow-amber-200"
            >
              <div className="font-display text-3xl font-bold">3+</div>
              <div className="text-xs opacity-90">Years Editing</div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <span className="text-amber-500 font-semibold text-sm tracking-widest uppercase">
              About Me
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-stone-800 mt-2 mb-6">
              The Editor Behind <br />
              the Magic
            </h2>
            <p className="text-stone-500 text-lg leading-relaxed mb-6">
              I am a video editor based in Pune, specializing in creating
              engaging content for Instagram Reels and YouTube Shorts. I work as
              a freelance editor and have collaborated with 5 clients within my
              first two months, delivering fast-paced content for digital
              audiences
            </p>
            <p className="text-stone-500 leading-relaxed mb-8">
              I also run a tech YouTube channel with 8,000+ subscribers, 2M+
              total views, and 3 years of experience creating content on
              YouTube.
            </p>

            {/* Tools */}
            <div className="mb-8">
              <h3 className="font-semibold text-stone-700 mb-3">
                Tools I Work With
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((t) => (
                  <span
                    key={t}
                    className="bg-amber-50 border border-amber-200 text-amber-700 text-sm px-3 py-1.5 rounded-full font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4">
              {values.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-4 bg-stone-50 rounded-2xl hover:bg-amber-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-amber-100 group-hover:bg-amber-200 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                    <Icon size={18} className="text-amber-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-stone-700 text-sm">
                      {label}
                    </div>
                    <div className="text-stone-400 text-xs mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
