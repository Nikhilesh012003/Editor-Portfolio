import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import {
  Send,
  Mail,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

const projectTypes = [
  "Cinematic Reel",
  "YouTube Video",
  "Brand Commercial",
  "Short-Form / Reels",
  "Wedding Film",
  "Motion Graphics",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", type: "", message: "" });
  };

  const socials = [
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://www.instagram.com/rajkukde___/",
      color: "hover:text-pink-500 hover:border-pink-300",
    },
    // {
    //   icon: Linkedin,
    //   label: "LinkedIn",
    //   href: "#",
    //   color: "hover:text-blue-600 hover:border-blue-300",
    // },
    {
      icon: Youtube,
      label: "YouTube",
      href: "https://youtube.com/@techtalksbyraj?si=aZ4l0VS-MkDvndkR",
      color: "hover:text-red-500 hover:border-red-300",
    },
    // {
    //   icon: MessageCircle,
    //   label: "WhatsApp",
    //   href: "#",
    //   color: "hover:text-green-500 hover:border-green-300",
    // },
  ];

  return (
    <section id="contact" className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-500 font-semibold text-sm tracking-widest uppercase">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-stone-800 mt-2 mb-4">
            Let's Create Something Amazing
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            Have a project in mind? I'd love to hear about it. Send me a message
            and let's bring your vision to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-display text-2xl font-bold text-stone-800 mb-4">
                Let's Talk
              </h3>
              <p className="text-stone-500 leading-relaxed">
                Whether you need a quick reel or a full commercial production,
                I'm here to make it happen. Typical response time:{" "}
                <strong className="text-stone-700">within 24 hours</strong>.
              </p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100">
              <div className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                <Mail size={20} className="text-amber-600" />
              </div>
              <div>
                <div className="text-xs text-stone-400 font-medium uppercase tracking-wide">
                  Email
                </div>
                <div className="font-semibold text-stone-700">
                  rajkukade20@gmail.com
                </div>
              </div>
            </div>

            {/* Socials */}
            <div>
              <div className="text-sm font-semibold text-stone-600 mb-4">
                Follow My Work
              </div>
              <div className="flex gap-3 flex-wrap">
                {socials.map(({ icon: Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    className={`flex items-center gap-2 px-4 py-2.5 bg-stone-50 border-2 border-stone-100 rounded-xl text-stone-500 text-sm font-medium transition-all duration-300 ${color} hover:shadow-md`}
                  >
                    <Icon size={16} />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="p-5 bg-linear-to-br from-amber-500 to-orange-400 rounded-2xl text-white">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 bg-green-300 rounded-full animate-pulse" />
                <span className="font-semibold text-sm">
                  Currently Available
                </span>
              </div>
              <p className="text-white/80 text-sm">
                Taking on new projects for March 2026 onwards. Book your slot
                early!
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={submit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-stone-600 mb-2">
                    Your Name *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handle}
                    required
                    placeholder="Priya Sharma"
                    className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl text-stone-700 placeholder-stone-300 focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-600 mb-2">
                    Email Address *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handle}
                    required
                    placeholder="priya@example.com"
                    className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl text-stone-700 placeholder-stone-300 focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-600 mb-2">
                  Project Type *
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handle}
                  required
                  className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl text-stone-700 focus:outline-none focus:border-amber-400 focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select project type...</option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-600 mb-2">
                  Tell Me About Your Project *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handle}
                  required
                  rows={5}
                  placeholder="Describe your project, timeline, budget, and any specific requirements..."
                  className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl text-stone-700 placeholder-stone-300 focus:outline-none focus:border-amber-400 focus:bg-white transition-all resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-200 text-sm"
              >
                {sent ? (
                  <>
                    <CheckCircle size={18} />
                    Message Sent! I'll reply within 24 hours.
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
