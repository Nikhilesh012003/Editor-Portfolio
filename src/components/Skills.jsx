import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const skills = [
  { name: "Cap Cut", level: 90, color: "bg-blue-400" },
  { name: "Sound Design", level: 80, color: "bg-rose-400" },
  { name: "Adobe Premiere Pro", level: 70, color: "bg-blue-400" },
  // { name: "After Effects", level: 88, color: "bg-indigo-400" },
  { name: "DaVinci Resolve", level: 60, color: "bg-amber-500" },
  // { name: "Color Grading", level: 90, color: "bg-orange-400" },
  // { name: "Motion Graphics", level: 80, color: "bg-violet-400" },
  // { name: "Adobe Audition", level: 75, color: "bg-teal-400" },
  // { name: "Photoshop", level: 82, color: "bg-sky-400" },
];

const softSkills = [
  "Client Communication",
  "Creative Direction",
  "Quick Turnaround",
  "Attention to Detail",
  "Trend Awareness",
  "Script Visualization",
  "Brand Understanding",
];

function SkillBar({ name, level, color, inView }) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-stone-700 font-medium text-sm">{name}</span>
        <span className="text-amber-600 font-bold text-sm">{level}%</span>
      </div>
      <div className="h-2.5 bg-stone-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      className="py-24"
      style={{
        background: "linear-gradient(180deg, #fff8f0 0%, #fdfaf6 100%)",
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
            Expertise
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-stone-800 mt-2 mb-4">
            Skills & Tools
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            Years of hands-on experience with industry-leading software and
            techniques.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Skill Bars */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <h3 className="font-display text-2xl font-bold text-stone-800 mb-6">
              Technical Skills
            </h3>
            {skills.map((s) => (
              <SkillBar key={s.name} {...s} inView={inView} />
            ))}
          </motion.div>

          {/* Right side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Soft Skills */}
            <h3 className="font-display text-2xl font-bold text-stone-800 mb-6">
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-3 mb-12">
              {softSkills.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
                  className="bg-white border-2 border-amber-200 text-stone-700 font-medium text-sm px-4 py-2 rounded-full hover:border-amber-400 hover:bg-amber-50 transition-all cursor-default"
                >
                  {s}
                </motion.span>
              ))}
            </div>
            {/* Experience card
            <div className="bg-linear-to-br from-amber-500 to-orange-400 rounded-3xl p-8 text-white">
              <div className="font-display text-6xl font-bold mb-2">3+</div>
              <div className="text-xl font-semibold mb-3">
                Years of Professional Editing
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                From wedding films to international brand campaigns, I've honed
                my craft across diverse industries and storytelling formats.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="font-bold text-2xl">+</div>
                  <div className="text-sm text-white/80">
                    Projects Delivered
                  </div>
                </div>
                <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="font-bold text-2xl">30+</div>
                  <div className="text-sm text-white/80">Happy Clients</div>
                </div>
              </div>
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
