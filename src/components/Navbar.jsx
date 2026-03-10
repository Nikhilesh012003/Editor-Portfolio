import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Film } from "lucide-react";

const links = ["Home", "About", "Services", "Portfolio", "Skills", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Film size={16} className="text-white" />
          </div>
          <span className="font-display font-bold text-lg text-stone-800">
            Raj Kukade
          </span>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l}>
              <button
                onClick={() => scrollTo(l)}
                className="nav-link text-sm font-medium text-stone-600 hover:text-amber-600 transition-colors"
              >
                {l}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => scrollTo("contact")}
          className="hidden md:block bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-amber-200 hover:-translate-y-0.5"
        >
          Hire Me
        </button>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-stone-700 hover:text-amber-600 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-stone-100 overflow-hidden"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <li key={l}>
                  <button
                    onClick={() => scrollTo(l)}
                    className="w-full text-left text-stone-700 font-medium hover:text-amber-600 transition-colors py-1"
                  >
                    {l}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => scrollTo("contact")}
                  className="w-full bg-amber-500 text-white font-semibold py-3 rounded-xl hover:bg-amber-600 transition-colors"
                >
                  Hire Me
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
