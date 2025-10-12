import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X } from "lucide-react";

const MIDNIGHT_BG = "bg-[#0a1630]";
const MIDNIGHT_GRAD = "bg-gradient-to-b from-[#0a1630]/90 via-[#1e2747]/80 to-[#0a1630]";

const team = [
  {
    name: "Jack Tergesen",
    classYear: "'27",
    type: "Executive",
    roles: [
      "Head Anchor",
      "Pitch Editor",
      "Executive Producer (Pre-Production)",
      "Producer (Production, Marketing & Post-Production)",
      "Marketer",
      "Lead News Writer",
    ],
    bio: "Commonly seen figurehead anchoring stories. Oversees Pre-Production scheduling and planning while revising scripts and mentoring writers across all departments.",
  },
  {
    name: "Zane Wolf",
    classYear: "'27",
    type: "Executive",
    roles: [
      "Executive Managing Producer",
      "Executive Producer (Production, Marketing & Post-Production)",
      "Executive Digital Operations Producer",
    ],
    bio: "Oversees daily operations, handling scheduling and coordination between anchors, reporters, and editors. Manages TNN's digital backbone including the website and internal workflows.",
  },
  {
    name: "Takuo Yamamoto",
    classYear: "'27",
    type: "Executive",
    roles: [
      "Executive Producer (Production & Post-Production)",
      "Assistant Managing Producer",
    ],
    bio: "Oversees Production and Post-Production departments, handling scheduling and coordination to ensure broadcasts run smoothly with creative direction and logistical management.",
  },
  {
    name: "Annarose Grizzle",
    classYear: "'27",
    type: "Executive",
    roles: ["Pitch Editor", "Head Anchor", "Executive Producer (Pre-Production)", "Lead News Writer"],
    bio: "Directs the pitching process by reviewing story ideas and ensuring they align with TNN's editorial standards. Anchors stories and mentors club members interested in script writing.",
  },
  {
    name: "Eric Law",
    classYear: "'27",
    type: "Executive",
    roles: ["Graphic Designer", "Video Editor"],
    bio: "Creates visual assets including overlays, title cards, and infographics. Assembles footage into finished pieces with cuts, transitions, and effects while maintaining TNN's visual style.",
  },
  {
    name: "Nicholas Chan",
    classYear: "'27",
    type: "Executive",
    roles: [
      "Content Strategist",
      "Video Editor",
      "Executive Producer (Marketing Team)",
      "Marketer",
      "Executive Treasurer",
    ],
    bio: "Plans TNN's overall content approach and manages finances. Leads marketing efforts and polishes footage while ensuring every piece aligns with TNN's mission and maintains audience engagement.",
  },
  {
    name: "Ibrahim Chaudhri",
    classYear: "'27",
    type: "Executive",
    roles: ["Video Director", "Video Editor", "VFX Lead"],
    bio: "Oversees the creative vision of TNN's productions, directing anchors and camera operators. Designs visual effects and motion graphics while maintaining narrative flow and production quality.",
  },
  {
    name: "Theo Mikesell",
    classYear: "'27",
    type: "Executive",
    roles: ["Head Anchor", "Marketer", "Lead News Writer"],
    bio: "Anchors stories with presence and promotes TNN content across platforms. Creates campaigns and organizes events while mentoring club members in script writing.",
  },
  {
    name: "Alex Wolfowitz",
    classYear: "'28",
    type: "Upper Associate",
    roles: ["Content Strategist", "Marketer"],
    bio: "Plans content approach and decides which stories to cover and platforms to prioritize. Promotes TNN across social media while maintaining consistent branding.",
  },
  {
    name: "Richard Eng",
    classYear: "'27",
    type: "Upper Associate",
    roles: ["Pitch Editor", "Lead News Writer"],
    bio: "Revises scripts and provides feedback during the editing process. Creates news scripts and mentors club members interested in writing.",
  },
  {
    name: "Jinhu Hong",
    classYear: "'27",
    type: "Upper Associate",
    roles: ["Head Anchor", "Lead News Writer"],
    bio: "Anchors stories as a commonly seen figurehead. Creates news scripts incrementally and serves as a mentor for aspiring writers.",
  },
  {
    name: "Máximo Gomez",
    classYear: "'28",
    type: "Lower Associate",
    roles: ["Executive Audio Producer"],
    bio: "Creates and manages all sounds and music for TNN productions, ensuring high-quality audio across every broadcast and segment.",
  },
  {
    name: "Isaiah Ferguson",
    classYear: "'27",
    type: "Lower Associate",
    roles: ["Head Anchor"],
    bio: "Commonly seen figurehead anchoring stories from news writers, delivering on-camera content with confidence and presence.",
  },
];

const weekInMotion = [
  {
    day: "Monday",
    title: "Pre-Production: Where Stories Begin",
    desc:
      "Research, pitch, and refine. Producers and pitch editors approve scripts while writers craft compelling content with clarity and voice. The vision is locked and ready before anything is filmed.",
    video: "https://cdn.coverr.co/videos/coverr-news-anchor-3472/1080p.mp4",
  },
  {
    day: "Thursday",
    title: "Production & Post: Bringing It Together",
    desc:
      "From set to screen. Directors oversee filming while editors cut, add graphics, and polish audio. The result: clean, high-quality footage ready for web, YouTube, and Instagram.",
    video: "https://cdn.coverr.co/videos/coverr-breaking-news-3473/1080p.mp4",
  },
];

export default function InfoPage() {
  const [selected, setSelected] = useState(null);
  const [popup, setPopup] = useState(null);
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const fadeInUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.8, delay },
  });

  return (
    <div className={`overflow-x-hidden ${MIDNIGHT_BG} text-white`}>
      {/* HERO */}
      <section className="relative h-screen flex flex-col justify-center items-center select-none">
        <video
          className="absolute inset-0 object-cover w-full h-full opacity-60"
          src="https://cdn.coverr.co/videos/coverr-news-anchor-3472/1080p.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className={`absolute inset-0 ${MIDNIGHT_GRAD}`} />
        <motion.h1
          {...fadeInUp()}
          className="z-10 text-4xl md:text-6xl font-serif text-center max-w-3xl leading-tight drop-shadow-lg px-4"
          onClick={() => setPopup("hero")}
          style={{ cursor: "pointer" }}
        >
          Student-led journalism.<br /> Professional standards.
        </motion.h1>
        <motion.p
          {...fadeInUp(0.2)}
          className="z-10 text-lg md:text-xl text-blue-200 text-center max-w-2xl mt-6 px-4"
        >
          High-quality video content that informs, engages, and strengthens the school community.
        </motion.p>
        <motion.div
          style={{ scaleX: yRange }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 h-1 w-1/3 bg-[#3b82f6] origin-left shadow-[0_0_12px_#3b82f6]"
        />
        <AnimatePresence>
          {popup === "hero" && (
            <motion.div
              key="hero-popup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
              onClick={() => setPopup(null)}
            >
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.32 }}
                className="bg-gradient-to-br from-[#0b1324] via-[#1e3a8a] to-[#1e3a8a]/90 rounded-2xl p-8 w-full max-w-2xl text-white relative shadow-2xl border border-[#3b82f6]/40"
                style={{ backdropFilter: "blur(16px)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-blue-100 hover:text-[#3b82f6] transition"
                  onClick={() => setPopup(null)}
                  aria-label="Close"
                >
                  <X size={28} />
                </button>
                <h2 className="text-3xl font-bold mb-3">Our Mission</h2>
                <p className="text-blue-100 text-lg leading-relaxed">
                  To produce high-quality, student-led video content that informs, engages, and strengthens the school community while serving as a platform for aspiring journalists, filmmakers, broadcasters, and media professionals. Each story is produced individually for our website, YouTube, and Instagram.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* CORE DIVISIONS */}
      <section className="py-28 bg-[#10182b]">
        <motion.h2 {...fadeInUp()} className="text-center text-3xl md:text-5xl font-serif mb-10">
          Three divisions, one newsroom
        </motion.h2>
        <p className="text-center text-lg text-blue-200 mb-16 max-w-2xl mx-auto px-4">
          Pre-Production plans it. Production films it. Post-Production polishes it.
        </p>
        <div className="grid md:grid-cols-3 gap-8 px-6 md:px-20">
          {[
            {
              title: "Pre-Production",
              subtitle: "Where stories are born",
              desc: "Research, pitching, and script development. Producers coordinate logistics while pitch editors refine ideas and approve final scripts. The vision is locked before filming begins.",
              roles: ["News Writers", "Producers", "Pitch Editors"],
              color: "border-[#1e3a8a]",
            },
            {
              title: "Production",
              subtitle: "Where ideas become reality",
              desc: "On set and on location. Directors guide creative vision, manage cameras and lighting, while anchors deliver with confidence. Clean, professional footage is the goal.",
              roles: ["Directors", "Segment Managers", "Anchors & Hosts"],
              color: "border-[#3b82f6]",
            },
            {
              title: "Post-Production",
              subtitle: "Where it all comes together",
              desc: "Editors cut and arrange footage, designers create graphics, and sound designers polish audio. The result: broadcast-ready pieces that meet TNN's technical and creative standards.",
              roles: ["Video Editors", "Graphic Designers", "Sound Designers"],
              color: "border-[#3b82f6]",
            },
          ].map((div, i) => (
            <motion.div
              key={i}
              {...fadeInUp(i * 0.1)}
              className={`bg-[#0a1a2f] border ${div.color} rounded-2xl p-8 shadow-lg hover:shadow-[0_0_32px_#3b82f6] transition`}
            >
              <h3 className="text-2xl font-bold text-white mb-2">{div.title}</h3>
              <p className="text-[#3b82f6] text-sm font-semibold mb-4 uppercase tracking-wide">{div.subtitle}</p>
              <p className="text-blue-100 mb-6 leading-relaxed">{div.desc}</p>
              <div className="flex flex-wrap gap-2">
                {div.roles.map((role, j) => (
                  <span key={j} className="px-3 py-1 bg-[#1e3a8a]/50 rounded-full text-sm text-blue-200">
                    {role}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WEEK IN MOTION */}
      <section className="py-28 bg-[#0a1a2f]">
        <motion.h2 {...fadeInUp()} className="text-center text-3xl md:text-5xl font-serif mb-10">
          Our week in motion
        </motion.h2>
        <p className="text-center text-lg text-blue-200 mb-16 max-w-2xl mx-auto px-4">
          Monday: Pre-Production—pitches, scripts, and planning. Thursday: Production & Post—filming, editing, and publishing across platforms.
        </p>
        <div className="flex flex-col md:flex-row gap-10 px-6 md:px-20 justify-center">
          {weekInMotion.map((w, i) => (
            <motion.div
              key={i}
              {...fadeInUp(i * 0.1)}
              className="relative flex-1 bg-[#10182b] rounded-2xl overflow-hidden shadow-xl border border-[#1e3a8a]/30 group"
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative h-72 md:h-80">
                <video
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                  src={w.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/90 to-transparent" />
                <div className="absolute top-5 left-5 bg-[#2563eb]/80 text-white px-4 py-1 rounded-full font-bold shadow-lg text-md tracking-wide">
                  {w.day}
                </div>
              </div>
              <div className="p-8 pb-6">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow">{w.title}</h3>
                <p className="text-blue-100 text-base font-medium leading-relaxed">{w.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SEGMENTS */}
      <section className="bg-[#101218] py-28">
        <motion.h2 {...fadeInUp()} className="text-center text-3xl md:text-5xl font-serif mb-12">
          Four formats, one standard
        </motion.h2>
        <p className="text-center text-lg text-blue-200 mb-16 max-w-2xl mx-auto px-4">
          Desk reporting, on-scene coverage, field journalism, and breaking shorts—clarity drives every segment.
        </p>
        <div className="grid md:grid-cols-3 gap-10 px-6 md:px-20">
          {[
            {
              title: "Traditional",
              desc: "Anchors sit in the newsroom delivering information with graphics and footage overlays. Formal, polished, and focused on clarity.",
              img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
              icon: (
                // Camera-style icon (same as Desk Reporting)
                <svg className="w-8 h-8 text-[#3b82f6]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M8 7V5a4 4 0 0 1 8 0v2" />
                </svg>
              ),
            },
            {
              title: "Walk-and-Talk Anchors",
              desc: "Anchors deliver news while walking through hallways or outdoor areas, adding motion, flow, and energy to the segment.",
              img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
              icon: (
                // Mic/walking-style icon (same as On-Scene Reporting)
                <svg className="w-8 h-8 text-[#3b82f6]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M15 10l4.553-2.276A2 2 0 0 1 22 9.618V14.382a2 2 0 0 1-2.447 1.894L15 14" />
                </svg>
              ),
            },
            {
              title: "On-Site Stand-Ups",
              desc: "Reporters present stories directly from event locations like clubs, games, or classrooms. Brings immediacy and context.",
              img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
              icon: (
                // Map pin-style icon (same as Field Reporting)
                <svg className="w-8 h-8 text-[#3b82f6]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              ),
            },
            {
              title: "Vox Pops",
              desc: "Quick student responses to a single question, edited together with captions and fast cuts. Casual and authentic.",
              img: "https://images.unsplash.com/photo-1603791452906-b7b49bafedc2",
              icon: (
                // Vertical phone-style icon (same as Breaking Shorts)
                <svg className="w-8 h-8 text-[#3b82f6]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="7" y="2" width="10" height="20" rx="3" />
                  <circle cx="12" cy="18" r="1" />
                </svg>
              ),
            },
            {
              title: "Interview Segments",
              desc: "One-on-one or small group interviews in informal but quiet settings with students, staff, or administrators.",
              img: "https://images.unsplash.com/photo-1551836022-4c4c79ecde52",
              icon: (
                // User-group SVG icon
                <svg className="w-8 h-8 text-[#3b82f6]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="9" cy="7" r="4" />
                  <circle cx="17" cy="11" r="3" />
                  <path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
                  <path d="M17 14c2.21 0 4 1.79 4 4v3" />
                </svg>
              ),
            },
            {
              title: "Anchor Desk Transitions",
              desc: "Used briefly to introduce or wrap up segments, connecting multiple stories together smoothly.",
              img: "https://images.unsplash.com/photo-1573497161157-fa7b22f182ea",
              icon: (
                // News desk SVG icon
                <svg className="w-8 h-8 text-[#3b82f6]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="4" y="15" width="16" height="5" rx="2" />
                  <rect x="7" y="4" width="10" height="7" rx="2" />
                  <path d="M12 11v4" />
                </svg>
              ),
            },
            {
              title: "Montage Recaps",
              desc: "Music-backed visual summaries of recent events or themed content. Perfect for short-form highlights.",
              img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
              icon: (
                // Play icon SVG
                <svg className="w-8 h-8 text-[#3b82f6]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10,8 16,12 10,16 10,8" fill="currentColor" stroke="none"/>
                </svg>
              ),
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              className="relative h-80 overflow-hidden rounded-2xl shadow-lg border border-[#1e3a8a]/20 group"
              whileHover={{ scale: 1.06 }}
              {...fadeInUp(i * 0.1)}
            >
              <motion.img
                src={s.img}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-75 transition"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/80 to-transparent" />
              <div className="absolute top-5 right-5 z-20 bg-[#0a1a2f]/80 rounded-full p-2 shadow-lg">
                {s.icon}
              </div>
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-2">{s.title}</h3>
                <p className="text-blue-100 text-base font-medium leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STORY TYPES */}
      <section className="bg-[#0a1a2f] py-28">
        <motion.h2
          {...fadeInUp()}
          className="text-center text-3xl md:text-5xl font-serif mb-12"
          onClick={() => setPopup("stories")}
          style={{ cursor: "pointer" }}
        >
          Stories that resonate
        </motion.h2>
        <p className="text-center text-lg text-blue-200 mb-16 max-w-2xl mx-auto px-4">
          Hard news, local impact, heartwarming moments, short docs, and features—produced fast, published across platforms.
        </p>
        <div className="grid md:grid-cols-3 gap-8 px-8 md:px-20">
          {[
            {
              title: "Hard News",
              color: "bg-[#1e3a8a]/90",
              icon: (
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="4" y="7" width="16" height="13" rx="2" />
                  <path d="M8 7V5a4 4 0 0 1 8 0v2" />
                </svg>
              ),
              desc: "Breaking developments with urgency, interviews, and clear analysis.",
            },
            {
              title: "Local Impact",
              color: "bg-[#172554]/90",
              icon: (
                <svg className="w-7 h-7 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              ),
              desc: "Neighborhood voices, campus stories, and the community's ripple effects.",
            },
            {
              title: "Heartwarming",
              color: "bg-[#2563eb]/80",
              icon: (
                <svg className="w-7 h-7 text-pink-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              ),
              desc: "Reunions, kindness, and hope—told with cinematic warmth.",
            },
            {
              title: "Short Docs",
              color: "bg-[#1e40af]/90",
              icon: (
                <svg className="w-7 h-7 text-[#3b82f6]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 3v4M8 3v4" />
                </svg>
              ),
              desc: "Mini-documentaries with pacing, depth, and narrative structure.",
            },
            {
              title: "Features",
              color: "bg-[#3b82f6]/70",
              icon: (
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ),
              desc: "Evergreen profiles and behind-the-scenes looks at school life.",
            },
          ].map((story, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08 }}
              className={`${story.color} h-56 rounded-2xl flex flex-col items-start justify-end font-semibold text-xl shadow-md hover:shadow-[0_0_36px_#3b82f6] transition relative overflow-hidden group`}
              {...fadeInUp(i * 0.08)}
            >
              <div className="absolute top-4 right-4 bg-[#0b1324]/80 rounded-full p-2 z-10">
                {story.icon}
              </div>
              <div className="p-6 z-20">
                <span className="text-white drop-shadow text-2xl font-bold">{story.title}</span>
                <p className="text-blue-100 text-base font-medium mt-1 leading-relaxed">{story.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {popup === "stories" && (
            <motion.div
              key="stories-popup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
              onClick={() => setPopup(null)}
            >
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.32 }}
                className="bg-gradient-to-br from-[#0b1324] via-[#1e3a8a] to-[#1e3a8a]/90 rounded-2xl p-8 w-full max-w-2xl text-white relative shadow-2xl border border-[#3b82f6]/40"
                style={{ backdropFilter: "blur(16px)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-blue-100 hover:text-[#3b82f6] transition"
                  onClick={() => setPopup(null)}
                  aria-label="Close"
                >
                  <X size={28} />
                </button>
                <h2 className="text-3xl font-bold mb-3">Stories that matter</h2>
                <p className="text-blue-100 text-lg leading-relaxed">
                  We cover what affects the school community—from breaking news to heartwarming features. Every story is crafted with clear structure, strong pacing, and platform-native formats for web, YouTube, and Instagram.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* WORKFLOW */}
      <section className="bg-[#101218] py-28">
        <motion.h2 {...fadeInUp()} className="text-center text-3xl md:text-5xl font-serif mb-12">
          From script to screen
        </motion.h2>
        <p className="text-center text-lg text-blue-200 mb-16 max-w-3xl mx-auto px-4">
          Pre-production sharpens ideas, production captures them, and post-production brings them to life—fast, consistent, and professional.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 px-8 md:px-24">
          {[
            {
              phase: "Pre-Production",
              desc: "Research, pitches, and script edits. Schedules and logistics align creative vision with practical constraints so every shoot has clear intent and purpose.",
              color: "border-[#1e3a8a]",
              accent: "text-[#3b82f6]",
            },
            {
              phase: "Production",
              desc: "On set and on location. Directors, anchors, and camera operators work in sync to capture strong audio, clean visuals, and professional presence.",
              color: "border-[#3b82f6]",
              accent: "text-[#1e3a8a]",
            },
            {
              phase: "Post-Production",
              desc: "Edit, sound design, color grading, graphics, and export. Marketing and digital teams queue the release for web, YouTube, and Instagram.",
              color: "border-[#3b82f6]",
              accent: "text-[#3b82f6]",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className={`relative border ${step.color} rounded-xl p-8 flex-1 bg-[#0f1115] shadow-lg hover:shadow-[0_0_32px_#3b82f6] transition`}
            >
              <h3 className={`text-xl font-semibold mb-3 ${step.accent}`}>{step.phase}</h3>
              <p className="text-blue-100 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-[#0a1a2f] py-28">
        <motion.h2 {...fadeInUp()} className="text-center text-3xl md:text-5xl font-serif mb-10 text-white drop-shadow-lg">
          The team behind the work
        </motion.h2>
        <p className="text-center text-lg text-blue-100 mb-12 max-w-2xl mx-auto px-4">
          Anchors, editors, strategists, designers—students building professional newsroom habits.
        </p>

        <motion.h3 {...fadeInUp()} className="text-center text-2xl md:text-3xl font-serif mb-8 text-blue-100">
          Executives
        </motion.h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 md:px-24 mb-16">
          {team.filter(m => m.type === "Executive").map((member, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.07 }}
              onClick={() => setSelected(team.indexOf(member))}
              className="cursor-pointer bg-[#10182b] border border-[#1e3a8a]/50 rounded-xl p-6 flex flex-col justify-end relative overflow-hidden group shadow-md hover:shadow-[0_0_32px_#3b82f6] transition"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#3b82f6]/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <h3 className="font-semibold text-lg text-white drop-shadow">{member.name}</h3>
              <p className="text-[#3b82f6] text-sm font-medium">{member.roles[0]}</p>
              <span className="text-blue-200 text-xs mt-1">Executive</span>
            </motion.div>
          ))}
        </div>

        <motion.h3 {...fadeInUp()} className="text-center text-2xl md:text-3xl font-serif mb-8 text-blue-100">
          Associates
        </motion.h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 md:px-24">
          {team.filter(m => m.type !== "Executive").map((member, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.07 }}
              onClick={() => setSelected(team.indexOf(member))}
              className="cursor-pointer bg-[#10182b] border border-[#1e3a8a]/50 rounded-xl p-6 flex flex-col justify-end relative overflow-hidden group shadow-md hover:shadow-[0_0_32px_#3b82f6] transition"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#3b82f6]/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <h3 className="font-semibold text-lg text-white drop-shadow">{member.name}</h3>
              <p className="text-[#3b82f6] text-sm font-medium">{member.roles[0]}</p>
              <span className="text-blue-200 text-xs mt-1">{member.type}</span>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selected !== null && (
            <motion.div
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-[#0b1324] via-[#1e3a8a] to-[#1e3a8a]/90 rounded-2xl p-8 w-full max-w-2xl text-white relative shadow-2xl border border-[#3b82f6]/40"
                style={{ backdropFilter: "blur(16px)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-blue-100 hover:text-[#3b82f6] transition"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                >
                  <X size={28} />
                </button>
                <h3 className="text-2xl font-bold mb-1 text-white drop-shadow-lg">{team[selected].name}</h3>
                <p className="text-blue-200 mb-4 font-medium">Class {team[selected].classYear} • {team[selected].type}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {team[selected].roles.map((r, j) => (
                    <span key={j} className="px-3 py-1 rounded-full bg-[#2563eb] text-white text-sm font-semibold shadow">
                      {r}
                    </span>
                  ))}
                </div>
                <p className="text-blue-100 leading-relaxed text-lg font-medium">
                  {team[selected].bio}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#0a1a2f] py-28 text-center text-white">
        <motion.h2 {...fadeInUp()} className="text-4xl md:text-6xl font-serif mb-8 drop-shadow-lg px-4">
          Start your story with us
        </motion.h2>
        <p className="text-lg text-blue-100 mb-10 max-w-xl mx-auto px-4">
          Ready to collaborate, create, and make an impact? Join a team where your voice shapes the news and your ideas become reality.
        </p>
        <motion.a
          href="/join"
          whileHover={{ scale: 1.05, boxShadow: "0 0 24px #3b82f6" }}
          className="inline-block border border-white px-8 py-3 rounded-full font-medium text-lg bg-[#1e3a8a]/70 hover:bg-[#3b82f6]/80 transition"
        >
          Join TNN
        </motion.a>
      </section>
    </div>
  );
}