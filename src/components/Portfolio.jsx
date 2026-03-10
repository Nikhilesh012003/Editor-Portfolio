import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import {
  Play,
  ExternalLink,
  X,
  Youtube,
  Instagram,
  Film,
  Video,
  Users,
  PlayCircle,
} from "lucide-react";

const categories = ["All", "YouTube", "Brand Commercial", "Short-Form"];

// ─────────────────────────────────────────────
// HOW TO ADD YOUR VIDEOS:
//
// type: "youtube"   → videoId: "dQw4w9WgXcQ"  (the part after ?v= in YouTube URL)
// type: "vimeo"     → videoId: "123456789"     (the number at end of vimeo.com/XXXXXX)
// type: "instagram" → videoId: "ABC123xyz"     (the part after /reel/ in Instagram URL)
// type: "local"     → videoId: "/your-video.mp4" (drop file in public/ folder)
// type: "none"      → shows placeholder (no video yet)
//
// thumbnail: optional image URL for the card preview
// ─────────────────────────────────────────────
const projects = [
  {
    id: 1,
    title: "Parotha Factory",
    category: "Brand Commercial",
    duration: "0:15",
    color: "from-amber-200 to-orange-300",
    type: "instagram",
    videoId: "DVJUavcExXL", // ← replace with your YouTube video ID
    thumbnail: null,
  },
  {
    id: 2,
    title: "Food Stall",
    category: "Brand Commercial",
    duration: "0:25",
    color: "from-sky-200 to-blue-300",
    type: "local",
    videoId: "/foodstall.mp4", // ← replace with your Vimeo video ID
    thumbnail: null,
  },
  {
    id: 3,
    title: "Bloom Event Campaign",
    category: "Brand Commercial",
    duration: "0:19",
    color: "from-rose-200 to-pink-300",
    type: "local",
    videoId: "/bloom.mp4", // ← replace with your YouTube video ID
    thumbnail: null,
  },
  {
    id: 4,
    title: "Hi Choice Fashion",
    category: "Brand Commercial",
    duration: "0:33",
    color: "from-violet-200 to-purple-300",
    type: "local",
    videoId: "/botiqe.mp4", // ← replace with your Instagram reel ID
    thumbnail: null,
  },
  {
    id: 5,
    title: "Mens Wear",
    category: "Brand Commercial",
    duration: "0:28",
    color: "from-teal-200 to-emerald-300",
    type: "local",
    videoId: "/men.mp4", // ← drop your .mp4 in public/ folder
    thumbnail: null,
  },
];

// Platform icon
function PlatformBadge({ type }) {
  const map = {
    youtube: { icon: Youtube, label: "YouTube", bg: "bg-red-100 text-red-600" },
    vimeo: { icon: Video, label: "Vimeo", bg: "bg-blue-100 text-blue-600" },
    instagram: {
      icon: Instagram,
      label: "Instagram",
      bg: "bg-pink-100 text-pink-600",
    },
    local: { icon: Film, label: "Video", bg: "bg-amber-100 text-amber-600" },
  };
  const p = map[type];
  if (!p) return null;
  const Icon = p.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${p.bg}`}
    >
      <Icon size={11} />
      {p.label}
    </span>
  );
}

// // Video embed inside modal
// function VideoEmbed({ project }) {
//   if (project.type === "youtube") {
//     return (
//       <iframe
//         src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&rel=0`}
//         title={project.title}
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//         className="w-full h-full rounded-2xl"
//       />
//     );
//   }
//   if (project.type === "vimeo") {
//     return (
//       <iframe
//         src={`https://player.vimeo.com/video/${project.videoId}?autoplay=1`}
//         title={project.title}
//         allow="autoplay; fullscreen; picture-in-picture"
//         allowFullScreen
//         className="w-full h-full rounded-2xl"
//       />
//     );
//   }
//   if (project.type === "instagram") {
//     return (
//       <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-pink-50 to-rose-50 rounded-2xl p-8 text-center">
//         <Instagram size={48} className="text-pink-500 mb-4" />
//         <p className="font-semibold text-stone-700 mb-2">{project.title}</p>
//         <p className="text-stone-500 text-sm mb-6">
//           Instagram Reels can't be embedded directly.
//           <br />
//           Click below to watch on Instagram.
//         </p>
//         <a
//           href={`https://www.instagram.com/reel/${project.videoId}/`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-flex items-center gap-2 bg-linear-to-r from-pink-500 to-rose-500 text-white font-semibold px-6 py-3 rounded-full hover:shadow-lg transition-all"
//         >
//           <ExternalLink size={16} />
//           Watch on Instagram
//         </a>
//       </div>
//     );
//   }
//   if (project.type === "local") {
//     return (
//       <video
//         src={project.videoId}
//         controls
//         autoPlay
//         className="w-full h-full rounded-2xl object-contain bg-black"
//       />
//     );
//   }
//   return (
//     <div className="w-full h-full flex items-center justify-center bg-stone-100 rounded-2xl">
//       <p className="text-stone-400">No video attached yet</p>
//     </div>
//   );
// }

// Modal
function VideoModal({ project, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Modal box */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <PlatformBadge type={project.type} />
              <div>
                <h3 className="font-semibold text-stone-800 text-sm">
                  {project.title}
                </h3>
                <span className="text-xs text-stone-400">
                  {project.category} · {project.duration}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 bg-stone-100 hover:bg-red-100 hover:text-red-600 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Video area */}
          <div className="aspect-video w-full p-3 bg-stone-900">
            <VideoEmbed project={project} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Thumbnail
function ProjectCard({ project, onClick, index }) {
  const youtubeThumbnail =
    project.type === "youtube"
      ? `https://img.youtube.com/vi/${project.videoId}/mqdefault.jpg`
      : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      onClick={() => onClick(project)}
    >
      {/* Thumbnail */}
      <div
        className={`aspect-video relative flex items-center justify-center overflow-hidden ${!youtubeThumbnail ? `bg-linear-to-br ${project.color}` : ""}`}
      >
        {youtubeThumbnail ? (
          <img
            src={youtubeThumbnail}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <video
            src={project.videoId}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            muted
            loop
            playsInline
            onMouseEnter={(e) => e.target.play()}
            onMouseLeave={(e) => {
              e.target.pause();
              e.target.currentTime = 0;
            }}
          />
        )}

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-amber-500 transition-all duration-300">
            <Play
              size={20}
              className="text-amber-600 group-hover:text-white ml-1 transition-colors"
              fill="currentColor"
            />
          </div>
        </div>

        {/* Duration */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm font-medium">
          {project.duration}
        </div>

        {/* Platform badge */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <PlatformBadge type={project.type} />
        </div>
      </div>

      {/* Thumbnail */}
      {/* <div
        className={`aspect-video relative flex items-center justify-center overflow-hidden ${!youtubeThumbnail ? `bg-linear-to-br ${project.color}` : ""}`}
      >
        {youtubeThumbnail ? (
          <img
            src={youtubeThumbnail}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full grid grid-cols-4 gap-1 p-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-black/30 rounded-sm" />
              ))}
            </div>
          </div>
        )}
        Dark overlay on hover */}
      {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" /> */}
      {/* Play button */}
      {/* <div className="absolute inset-0 flex items-center justify-center"> */}
      {/* <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-amber-500 transition-all duration-300">
            <Play
              size={20}
              className="text-amber-600 group-hover:text-white ml-1 transition-colors"
              fill="currentColor"
            />
          </div>
        </div> */}
      {/* Duration */}
      {/* <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm font-medium">
          {project.duration}
        </div> */}
      {/* Platform badge */}
      {/* <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <PlatformBadge type={project.type} />
        </div>
      </div> */}

      {/* Info */}
      <div className="p-4 bg-stone-50 group-hover:bg-amber-50 transition-colors">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-stone-800 text-sm mb-1.5">
              {project.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-600 font-medium bg-amber-100 px-2 py-0.5 rounded-full">
                {project.category}
              </span>
            </div>
          </div>
          <div className="w-8 h-8 bg-white border border-stone-200 rounded-lg flex items-center justify-center group-hover:border-amber-400 group-hover:text-amber-600 transition-colors shrink-0 mt-0.5">
            <Play size={12} fill="currentColor" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
// function YouTubeChannelCard({ inView }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.6, delay: 0.35 }}
//       className="mt-14 mb-8"
//     >
//       <p className="text-center text-stone-400 text-sm font-medium mb-5 tracking-wide uppercase">
//         Find me on YouTube
//       </p>

//       <a
//         href="https://youtube.com/@techtalksbyraj?si=aZ4l0VS-MkDvndkR"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="group block max-w-2xl mx-auto rounded-3xl overflow-hidden border-2 border-stone-100 hover:border-red-300 shadow-md hover:shadow-xl hover:shadow-red-100 transition-all duration-300"
//       >
//         {/* Banner — replicates the dark ocean wave art from your channel */}
//         <div className="relative h-28 sm:h-36 overflow-hidden bg-linear-to-br from-slate-800 via-slate-700 to-slate-900">
//           <svg
//             className="absolute inset-0 w-full h-full"
//             viewBox="0 0 800 150"
//             preserveAspectRatio="xMidYMid slice"
//           >
//             <defs>
//               <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
//                 <stop offset="0%" stopColor="#1e293b" />
//                 <stop offset="100%" stopColor="#334155" />
//               </linearGradient>
//               <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
//                 <stop offset="0%" stopColor="#475569" stopOpacity="0.8" />
//                 <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.6" />
//                 <stop offset="100%" stopColor="#334155" stopOpacity="0.8" />
//               </linearGradient>
//               <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
//                 <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.15" />
//                 <stop offset="60%" stopColor="#e2e8f0" stopOpacity="0.25" />
//                 <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.1" />
//               </linearGradient>
//             </defs>
//             <rect width="800" height="150" fill="url(#sky)" />
//             {/* Dark rolling waves */}
//             <path
//               d="M0,60 Q100,30 200,55 Q300,80 400,50 Q500,20 600,55 Q700,85 800,60 L800,150 L0,150 Z"
//               fill="url(#wave1)"
//             />
//             <path
//               d="M0,80 Q150,50 280,75 Q400,100 520,70 Q650,40 800,80 L800,150 L0,150 Z"
//               fill="#1e293b"
//               fillOpacity="0.7"
//             />
//             <path
//               d="M0,100 Q200,70 380,95 Q520,115 680,85 Q750,70 800,100 L800,150 L0,150 Z"
//               fill="#0f172a"
//               fillOpacity="0.9"
//             />
//             {/* White foam highlights */}
//             <path
//               d="M0,62 Q100,35 200,57 Q300,79 400,52"
//               stroke="url(#wave2)"
//               strokeWidth="2"
//               fill="none"
//             />
//             <path
//               d="M400,52 Q500,22 600,57 Q700,87 800,62"
//               stroke="url(#wave2)"
//               strokeWidth="1.5"
//               fill="none"
//             />
//           </svg>
//           {/* YouTube pill */}
//           <div className="absolute top-3 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
//             <Youtube size={12} />
//             YouTube
//           </div>
//         </div>

//         {/* Channel info */}
//         <div className="bg-white px-5 sm:px-7 py-5 flex items-center gap-4 sm:gap-5">
//           {/* Avatar */}
//           <div className="relative shrink-0">
//             <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 border-2 border-white ring-2 ring-amber-200">
//               <span className="font-display text-xl sm:text-2xl font-bold text-white">
//                 R
//               </span>
//             </div>
//             <div className="absolute bottom-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
//           </div>

//           {/* Text */}
//           <div className="flex-1 min-w-0">
//             <h3 className="font-display text-base sm:text-lg font-bold text-stone-800 group-hover:text-red-600 transition-colors truncate leading-tight">
//               Techtalks by Raj
//             </h3>
//             <p className="text-stone-400 text-xs sm:text-sm mt-0.5">
//               @techtalksbyraj
//             </p>
//             <div className="flex flex-wrap items-center gap-3 mt-2">
//               <span className="flex items-center gap-1 text-stone-500 text-xs font-medium">
//                 <Users size={12} className="text-amber-500" />
//                 8.66K subscribers
//               </span>
//               <span className="flex items-center gap-1 text-stone-500 text-xs font-medium">
//                 <PlayCircle size={12} className="text-amber-500" />
//                 14 videos
//               </span>
//             </div>
//           </div>

//           {/* Subscribe CTA */}
//           <div className="shrink-0 hidden sm:block">
//             <div className="bg-red-600 group-hover:bg-red-700 text-white text-sm font-bold px-5 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 shadow group-hover:shadow-lg group-hover:shadow-red-200">
//               <Youtube size={14} />
//               Subscribe
//             </div>
//           </div>
//         </div>

//         {/* Bio strip */}
//         <div className="bg-stone-50 border-t border-stone-100 px-5 sm:px-7 py-3 flex items-center justify-between gap-3">
//           <p className="text-stone-500 text-xs truncate">
//             Hi this is Raj Kukade — Stay updated with tech 🎮 Subscribe Now 🐱
//           </p>
//           <ExternalLink
//             size={13}
//             className="text-stone-300 group-hover:text-red-400 transition-colors shrink-0"
//           />
//         </div>
//       </a>
//     </motion.div>
//   );
// }

// export default function Portfolio() {
//   const [active, setActive] = useState("All");
//   const [selected, setSelected] = useState(null);
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-100px" });

//   const filtered =
//     active === "All" ? projects : projects.filter((p) => p.category === active);

//   return (
//     <section id="portfolio" className="py-24 bg-white" ref={ref}>
//       <div className="max-w-6xl mx-auto px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <span className="text-amber-500 font-semibold text-sm tracking-widest uppercase">
//             My Work
//           </span>
//           <h2 className="font-display text-4xl lg:text-5xl font-bold text-stone-800 mt-2 mb-4">
//             Portfolio & Showreel
//           </h2>
//           <p className="text-stone-500 text-lg max-w-xl mx-auto">
//             Click any project to watch the video. Works with YouTube &
//             Instagram.
//           </p>

//           {/* Platform legend */}
//           <div className="flex flex-wrap justify-center gap-3 mt-4">
//             {[
//               {
//                 icon: Youtube,
//                 label: "YouTube",
//                 bg: "bg-red-50 text-red-500 border-red-200",
//               },
//               // {
//               //   icon: Video,
//               //   label: "Vimeo",
//               //   bg: "bg-blue-50 text-blue-500 border-blue-200",
//               // },
//               {
//                 icon: Instagram,
//                 label: "Instagram",
//                 bg: "bg-pink-50 text-pink-500 border-pink-200",
//               },
//               // {
//               //   icon: Film,
//               //   label: "Local Video",
//               //   bg: "bg-amber-50 text-amber-500 border-amber-200",
//               // },
//             ].map(({ icon: Icon, label, bg }) => (
//               <span
//                 key={label}
//                 className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${bg}`}
//               >
//                 <Icon size={12} />
//                 {label}
//               </span>
//             ))}
//           </div>
//         </motion.div>

//         {/* Filter Tabs */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="flex flex-wrap justify-center gap-3 mb-10"
//         >
//           {categories.map((c) => (
//             <button
//               key={c}
//               onClick={() => setActive(c)}
//               className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
//                 active === c
//                   ? "bg-amber-500 text-white shadow-lg shadow-amber-200"
//                   : "bg-stone-100 text-stone-600 hover:bg-amber-50 hover:text-amber-600"
//               }`}
//             >
//               {c}
//             </button>
//           ))}
//         </motion.div>

//         {/* Grid */}
//         <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           <AnimatePresence mode="popLayout">
//             {filtered.map((p, i) => (
//               <ProjectCard
//                 key={p.id}
//                 project={p}
//                 onClick={setSelected}
//                 index={i}
//               />
//             ))}
//           </AnimatePresence>
//         </motion.div>

//         {/* CTA */}
//         {/* <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="text-center mt-12"
//         >
//           <a
//             href="https://youtube.com/@techtalksbyraj?si=aZ4l0VS-MkDvndkR"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-2 border-2 border-amber-400 text-amber-600 font-semibold px-7 py-3.5 rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-amber-200"
//           >
//             <Youtube size={18} />
//             Watch More on YouTube
//           </a>
//         </motion.div>
//       </div> */}
//       {/* YouTube Channel Card */}
//         <YouTubeChannelCard inView={inView} />

//         {/* CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="text-center"
//         >

//            <a href="https://youtube.com/@techtalksbyraj?si=aZ4l0VS-MkDvndkR"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-2 border-2 border-amber-400 text-amber-600 font-semibold px-7 py-3.5 rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-amber-200"
//           >
//             <Youtube size={18} />
//             Watch More on YouTube
//           </a>
//         </motion.div>

//       {/* Video Modal */}
//       {selected && (
//         <VideoModal project={selected} onClose={() => setSelected(null)} />
//       )}
//     </section>
//   );
// }

function YouTubeChannelCard({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.35 }}
      className="mt-14 mb-8"
    >
      <p className="text-center text-stone-400 text-sm font-medium mb-5 tracking-wide uppercase">
        Find me on YouTube
      </p>

      <a
        href="https://youtube.com/@techtalksbyraj?si=aZ4l0VS-MkDvndkR"
        target="_blank"
        rel="noopener noreferrer"
        className="group block max-w-3xl mx-auto rounded-3xl overflow-hidden border-2 border-stone-100 hover:border-red-300 shadow-md hover:shadow-xl hover:shadow-red-100 transition-all duration-300"
      >
        <img
          src="/youtube-channel.png"
          alt="Techtalks by Raj - YouTube Channel"
          className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/800x200?text=Image+Not+Found";
          }}
        />
      </a>
    </motion.div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-amber-500 font-semibold text-sm tracking-widest uppercase">
            My Work
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-stone-800 mt-2 mb-4">
            Portfolio & Showreel
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            Click any project to watch the video. Works with YouTube &
            Instagram.
          </p>

          {/* Platform legend */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {[
              {
                icon: Youtube,
                label: "YouTube",
                bg: "bg-red-50 text-red-500 border-red-200",
              },
              {
                icon: Instagram,
                label: "Instagram",
                bg: "bg-pink-50 text-pink-500 border-pink-200",
              },
            ].map(({ icon: Icon, label, bg }) => (
              <span
                key={label}
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${bg}`}
              >
                <Icon size={12} />
                {label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                active === c
                  ? "bg-amber-500 text-white shadow-lg shadow-amber-200"
                  : "bg-stone-100 text-stone-600 hover:bg-amber-50 hover:text-amber-600"
              }`}
            >
              {c}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                onClick={setSelected}
                index={i}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* YouTube Channel Card */}
        <YouTubeChannelCard inView={inView} />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <a
            href="https://youtube.com/@techtalksbyraj?si=aZ4l0VS-MkDvndkR"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-amber-400 text-amber-600 font-semibold px-7 py-3.5 rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-amber-200"
          >
            <Youtube size={18} />
            Watch More on YouTube
          </a>
        </motion.div>
      </div>

      {/* Video Modal */}
      {selected && (
        <VideoModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
