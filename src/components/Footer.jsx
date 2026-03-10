import { Film, Heart, ArrowUp } from "lucide-react";

export default function Footer() {
  const links = [
    "Home",
    "About",
    "Services",
    "Portfolio",
    "Skills",
    "Pricing",
    "Contact",
  ];
  return (
    <footer className="bg-stone-900 text-stone-400 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                <Film size={15} className="text-white" />
              </div>
              <span className="font-display font-bold text-white text-lg">
                Raj Kukade
              </span>
            </div>
            <p className="text-sm leading-relaxed text-stone-500">
              Freelance video editor crafting cinematic stories through every
              frame. Based in India, working worldwide.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l}>
                  <button
                    onClick={() =>
                      document
                        .getElementById(l.toLowerCase())
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-sm hover:text-amber-400 transition-colors"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Contact</h4>
            <div className="space-y-2 text-sm">
              <p>rajkukade20@gmail.com</p>
              <p>India (Remote Worldwide)</p>
              <div className="flex gap-3 mt-4">
                {["YouTube"].map((s) => (
                  <a
                    key={s}
                    href="https://youtube.com/@techtalksbyraj?si=aZ4l0VS-MkDvndkR"
                    className="text-xs bg-stone-800 hover:bg-amber-500 hover:text-white text-stone-400 px-3 py-1.5 rounded-lg transition-all"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>© 2026 Raj Kukade. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-stone-500">
            Made with{" "}
            <Heart size={13} className="text-amber-500 fill-amber-500" /> by Raj
            Kukade
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 hover:text-amber-400 transition-colors"
          >
            <ArrowUp size={14} /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
