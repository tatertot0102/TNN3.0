// src/App.tsx
import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  Flame,
  PlayCircle,
  Search,
  Menu,
  X,
  Youtube,
  Instagram,
  Twitter,
  ExternalLink,
  Info,
  BarChart2,
  Sparkles,
  ShieldCheck,
  BarChart3,
  Bell,
} from "lucide-react";
import logo from "./assets/logo.svg";
import "./index.css";
import InfoPage from "./InfoPage";


/* ===============================
   STYLES & THEMING
================================== */
const colors = {
  accent: "#c2122b",
  dark: "#0b0f1a",
  text: "#1e1e1e",
};

const CATEGORIES = [
  "Breaking",
  "Hard News",
  "Local",
  "Heartwarming",
  "Features",
  "Documentaries",
] as const;

type Category = (typeof CATEGORIES)[number];

/* ===============================
   HEADER (Collapsible)
================================== */
const Header: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Notification structure: must have unique id (number or string)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "TNN is currently in beta",
      message:
        "All stories, videos, and data are placeholders as we finalize our new platform experience.",
      read: false,
    },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastTimeout, setToastTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Notification toast logic with localStorage persistence
  useEffect(() => {
    // Only run after notifications are initialized
    const newest = notifications[0];
    if (!newest) return;
    const storedId = localStorage.getItem("lastSeenNotificationId");
    // If the newest notification's id is not the stored one, show toast and mark as unread
    if (String(newest.id) !== storedId) {
      // Mark as unread if not already
      if (newest.read) {
        setNotifications((prev) =>
          prev.map((n, i) =>
            i === 0 ? { ...n, read: false } : n
          )
        );
      }
      setShowToast(true);
      if (toastTimeout) clearTimeout(toastTimeout);
      const timeout = setTimeout(() => setShowToast(false), 5000);
      setToastTimeout(timeout);
    } else {
      // Already seen, ensure notification marked as read and do not show toast
      if (!newest.read) {
        setNotifications((prev) =>
          prev.map((n, i) =>
            i === 0 ? { ...n, read: true } : n
          )
        );
      }
      setShowToast(false);
    }
    // eslint-disable-next-line
    // Only run when notifications[0]?.id changes or notifications[0]?.read changes
  }, [notifications[0]?.id]);

  useEffect(() => {
    // Ensure that if notification is marked as read (e.g., via Dismiss or Mark all read), update localStorage
    const newest = notifications[0];
    if (newest && newest.read) {
      localStorage.setItem("lastSeenNotificationId", String(newest.id));
    }
  }, [notifications[0]?.read, notifications[0]?.id]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Count of unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Mark all notifications as read and update localStorage
  const markAllRead = () => {
    setNotifications((prev) => {
      if (prev.length === 0) return prev;
      // Update localStorage with newest notification id
      localStorage.setItem("lastSeenNotificationId", String(prev[0].id));
      return prev.map((n) => ({ ...n, read: true }));
    });
    setShowToast(false);
  };

  // Info page section links for lower bar
  const infoSections = [
    { label: "Overview", id: "overview" },
    { label: "Filming", id: "filming" },
    { label: "Story Types", id: "story-types" },
    { label: "Team", id: "team" },
    { label: "Join", id: "join" },
  ];

  return (
    <>
      <header
        className={
          [
            "fixed top-0 z-50 w-full transition-all duration-500",
            scrolled
              ? "bg-white/90 dark:bg-[#0b0f1a]/90 backdrop-blur border-b border-gray-200 dark:border-neutral-800"
              : "bg-white dark:bg-[#0b0f1a]",
            // Responsive header height
            scrolled
              ? "h-[56px] sm:h-[60px]"
              : "h-[64px] sm:h-[80px] md:h-[120px]",
          ].join(" ")
        }
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 flex flex-col justify-center h-full">
          {/* Top Row */}
          <div
            className={
              [
                "flex items-center justify-between transition-all duration-500",
                scrolled
                  ? "h-[56px] sm:h-[60px]"
                  : "h-[64px] sm:h-[80px] md:h-[100px]",
              ].join(" ")
            }
          >
            {/* Left: Navigation */}
            <nav className="flex items-center gap-4 sm:gap-6">
              <button
                className="md:hidden text-gray-700 dark:text-gray-200"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="h-6 w-6 sm:h-7 sm:w-7" /> : <Menu className="h-6 w-6 sm:h-7 sm:w-7" />}
              </button>

              <div className="hidden md:flex items-center gap-6">
                <a
                  href="/TNN3.0/"
                  className="text-sm font-medium text-gray-800 dark:text-gray-300 hover:text-[#c2122b] transition-colors"
                >
                  Home
                </a>
                <a
                  href="/TNN3.0/#/info"
                  className="text-sm font-medium text-gray-800 dark:text-gray-300 hover:text-[#c2122b] transition-colors"
                >
                  Info
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-gray-800 dark:text-gray-300 hover:text-[#c2122b] transition-colors"
                >
                  Join
                </a>
              </div>
            </nav>

            {/* Center: Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
              <img
                src={logo}
                alt="TNN Logo"
                className={`transition-all duration-300 object-contain ${
                  scrolled ? "w-16" : "w-28"
                }`}
                style={{
                  transitionProperty: "width, max-width, min-width",
                  willChange: "width",
                }}
              />
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 relative flex-nowrap">
              {/* Search button */}
              <button
                className="inline-flex items-center justify-center rounded-md text-gray-700 dark:text-gray-300 hover:text-[#c2122b] transition-colors h-8 w-8 sm:h-8 sm:w-8 md:h-9 md:w-9"
                aria-label="Search"
              >
                <Search className="h-[17px] w-[17px] sm:h-[18px] sm:w-[18px] md:h-[19px] md:w-[19px]" />
              </button>
              {/* Notification bell */}
              <div className="relative">
                <button
                  className="inline-flex items-center justify-center rounded-md text-gray-700 dark:text-gray-300 hover:text-[#c2122b] transition-colors h-8 w-8 sm:h-8 sm:w-8 md:h-9 md:w-9 focus:outline-none"
                  aria-label="Notifications"
                  onClick={() => setShowNotifications((v) => !v)}
                >
                  <Bell className="h-[18px] w-[18px] sm:h-[19px] sm:w-[19px] md:h-[20px] md:w-[20px]" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#0b0f1a] animate-pulse" />
                  )}
                </button>
                {/* Dropdown */}
                {showNotifications && (
                  <div
                    className="absolute right-0 mt-2 w-80 max-w-xs bg-white dark:bg-[#181b22] shadow-xl border border-gray-200 dark:border-neutral-800 rounded-lg z-50 animate-fadein"
                    style={{ minWidth: "260px" }}
                  >
                    <div className="p-3 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between">
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">
                        Notifications
                      </span>
                      <button
                        className="text-xs text-[#c2122b] hover:underline font-semibold"
                        onClick={markAllRead}
                        disabled={unreadCount === 0}
                      >
                        Mark all read
                      </button>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-6 text-sm text-gray-500 text-center">
                          No notifications.
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            className={`px-4 py-3 border-b last:border-b-0 border-gray-100 dark:border-neutral-800 ${
                              !n.read ? "bg-[#fff4f5] dark:bg-[#2a1a1e]" : ""
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`h-2 w-2 rounded-full ${
                                  n.read ? "bg-gray-300 dark:bg-neutral-700" : "bg-red-500 animate-pulse"
                                }`}
                              />
                              <span className="font-semibold text-gray-900 dark:text-white text-sm">
                                {n.title}
                              </span>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                              {n.message}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* Subscribe button */}
              <a
                href="#"
                className="hidden sm:inline-flex items-center gap-2 px-3 sm:px-4 h-8 sm:h-9 rounded-md bg-[#c2122b] text-white text-xs sm:text-sm font-semibold hover:bg-red-700 transition-colors shadow-sm"
              >
                Subscribe
              </a>
            </div>
          </div>

          {/* Lower Dynamic Bar: categories or InfoPage sections */}
          {!scrolled && (
            <div className="flex justify-center border-t border-gray-200 dark:border-neutral-800 pt-2 mt-2">
              {location.pathname === "/TNN3.0/info" ? (
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  {infoSections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="relative group transition-colors hover:text-[#c2122b]"
                    >
                      {section.label}
                      <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-[2px] bg-[#c2122b] transition-all duration-300"></span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  {CATEGORIES.map((cat) => (
                    <a
                      key={cat}
                      href="#catalog"
                      className="relative group transition-colors hover:text-[#c2122b]"
                    >
                      {cat}
                      <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-[2px] bg-[#c2122b] transition-all duration-300"></span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-[#0b0f1a] border-t border-gray-200 dark:border-neutral-800 py-3">
            <div className="flex flex-col items-center gap-1">
              <a
                href="/TNN3.0/"
                className="w-full py-3 px-4 text-center text-gray-700 dark:text-gray-200 hover:text-[#c2122b] text-sm rounded transition-all active:bg-gray-100 dark:active:bg-neutral-900"
                style={{ minHeight: "44px" }}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="/TNN3.0/#/info/"
                className="w-full py-3 px-4 text-center text-gray-700 dark:text-gray-200 hover:text-[#c2122b] text-sm rounded transition-all active:bg-gray-100 dark:active:bg-neutral-900"
                style={{ minHeight: "44px" }}
                onClick={() => setMenuOpen(false)}
              >
                Info
              </a>
              <a
                href="#"
                className="w-full py-3 px-4 text-center text-gray-700 dark:text-gray-200 hover:text-[#c2122b] text-sm rounded transition-all active:bg-gray-100 dark:active:bg-neutral-900"
                style={{ minHeight: "44px" }}
              >
                Join
              </a>
              {CATEGORIES.map((cat) => (
                <a
                  key={cat}
                  href="#catalog"
                  className="w-full py-3 px-4 text-center text-gray-700 dark:text-gray-200 hover:text-[#c2122b] text-sm rounded transition-all active:bg-gray-100 dark:active:bg-neutral-900"
                  style={{ minHeight: "44px" }}
                >
                  {cat}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
      {/* Toast notification */}
      {showToast && notifications[0] && !notifications[0].read && (
        <div
          className="fixed bottom-7 left-1/2 transform -translate-x-1/2 z-[100] animate-fadein transition-all"
          style={{ minWidth: 320, maxWidth: 400 }}
        >
          <div className="flex items-start gap-3 bg-white dark:bg-[#181b22] border border-[#c2122b] shadow-2xl px-5 py-4 rounded-xl">
            <div className="pt-1">
              <Bell className="w-6 h-6 text-[#c2122b]" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 dark:text-white text-sm">
                {notifications[0].title}
              </div>
              <div className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                {notifications[0].message}
              </div>
            </div>
            <button
              className="ml-2 text-xs px-2 py-1 rounded text-[#c2122b] hover:bg-[#ffd7db] dark:hover:bg-[#2a1a1e] transition"
              onClick={markAllRead}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
      {/* Animations */}
      <style>
        {`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fadein {
          animation: fadein 0.5s cubic-bezier(.4,0,.2,1);
        }
        `}
      </style>
    </>
  );
};

/* ===============================
   BREAKING TICKER
================================== */
const BreakingTicker: React.FC = () => (
  <div className="bg-[#0b0f1a] text-white py-2 mt-[64px] sm:mt-[80px] md:mt-[120px] overflow-hidden border-b border-[#c2122b]/40">
    <div className="flex items-center gap-4 px-6">
      <span className="text-[#c2122b] font-semibold tracking-wider text-sm flex items-center gap-1">
        <Flame className="h-4 w-4" /> BREAKING
      </span>
      <div className="overflow-hidden flex-1">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mr-8">• School budget restructured for 2025</span>
          <span className="mr-8">• Students launch sustainability campaign</span>
          <span className="mr-8">• Robotics club advances to state finals</span>
        </div>
      </div>
    </div>
  </div>
);

/* ===============================
   HERO SECTION
================================== */
const Hero: React.FC = () => {
  const handleScroll = () => {
    const catalog = document.getElementById("catalog");
    if (catalog) {
      const offset = catalog.getBoundingClientRect().top + window.scrollY - 100; // scroll slightly above
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };
  return (
    <section className="relative bg-[#0b0f1a] text-white h-[65vh] flex items-center justify-center pb-8">
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        autoPlay
        muted
        loop
        src="https://assets.mixkit.co/videos/preview/mixkit-breaking-news-video-17959-large.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      <div className="relative z-10 px-6 text-center max-w-3xl">
        <span className="text-[13px] font-semibold tracking-[0.2em] text-[#ffd7db]">
          HIGHLIGHT
        </span>
        <h1 className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight font-serif">
          Inside the Tech News Revolution
        </h1>
        <p className="mt-4 text-gray-300 text-sm md:text-base">
          Watch how a new generation of journalists reshapes media — right from the classroom.
        </p>
        <a
          href="#catalog"
          className="mt-6 inline-block text-sm font-semibold underline underline-offset-4 decoration-[#c2122b] hover:text-white/90"
        >
          Explore the Catalog →
        </a>
      </div>
      {/* Scroll down indicator */}
      <button
        onClick={handleScroll}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-white transition animate-bounce"
        aria-label="Scroll to catalog"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </section>
  );
}

/* ===============================
   CATALOG (Washington Post–style)
   - Single unified explorer
   - Same categories as header
   - Switches content without full-page scroll
================================== */

type VideoItem = {
  id: string;
  title: string;
  category: Category;
  thumb: string;
  date: string;
  length?: string;
  views?: number;
  platform?: "YouTube" | "Instagram";
  url?: string;
  blurb?: string;
};

const catalogData: Record<Category, VideoItem[]> = {
  Breaking: [
    {
      id: "b1",
      title: "Emergency School Board Meeting: Budget Overhaul",
      category: "Breaking",
      thumb: "https://static.photos/office/1280x720/403",
      date: "Oct 6, 2025",
      length: "08:42",
      views: 32000,
      platform: "YouTube",
      url: "https://youtube.com",
      blurb: "Exclusive look at immediate changes impacting student programs.",
    },
    {
      id: "b2",
      title: "Transit Delay Affects Citywide Competitions",
      category: "Breaking",
      thumb: "https://static.photos/cityscape/1280x720/504",
      date: "Oct 5, 2025",
      length: "02:17",
      views: 14000,
      platform: "Instagram",
      url: "https://instagram.com",
    },
    {
      id: "b3",
      title: "New Cafeteria Vendor Switches Menus",
      category: "Breaking",
      thumb: "https://static.photos/people/1280x720/401",
      date: "Oct 4, 2025",
      length: "01:09",
      views: 12500,
      platform: "YouTube",
      url: "https://youtube.com",
    },
    {
      id: "b4",
      title: "Principal Announces Campus Renovation Phase 2",
      category: "Breaking",
      thumb: "https://static.photos/technology/1280x720/402",
      date: "Oct 4, 2025",
      length: "03:51",
      views: 9800,
      platform: "YouTube",
      url: "https://youtube.com",
    },
    {
      id: "b5",
      title: "Power Outage Cuts After-School Activities",
      category: "Breaking",
      thumb: "https://static.photos/cityscape/1280x720/502",
      date: "Oct 3, 2025",
      length: "00:59",
      views: 8600,
      platform: "Instagram",
      url: "https://instagram.com",
    },
    {
      id: "b6",
      title: "Security Policy Updated for Large Events",
      category: "Breaking",
      thumb: "https://static.photos/office/1280x720/503",
      date: "Oct 2, 2025",
      length: "04:26",
      views: 7500,
      platform: "YouTube",
      url: "https://youtube.com",
    },
    {
      id: "b7",
      title: "Varsity Match Postponed — New Date TBD",
      category: "Breaking",
      thumb: "https://static.photos/cityscape/1280x720/505",
      date: "Oct 2, 2025",
      length: "01:28",
      views: 6200,
      platform: "Instagram",
      url: "https://instagram.com",
    },
    {
      id: "b8",
      title: "Teacher Contract Negotiations See Movement",
      category: "Breaking",
      thumb: "https://static.photos/people/1280x720/402",
      date: "Oct 1, 2025",
      length: "09:15",
      views: 5800,
      platform: "YouTube",
      url: "https://youtube.com",
    },
  ],
  "Hard News": [
    {
      id: "h1",
      title: "Inside the 2025 Budget: What Got Cut, What Stayed",
      category: "Hard News",
      thumb: "https://static.photos/office/1280x720/401",
      date: "Oct 4, 2025",
      length: "12:15",
      views: 40500,
      platform: "YouTube",
      url: "https://youtube.com",
      blurb: "A line-by-line breakdown with commentary from student leaders.",
    },
    {
      id: "h2",
      title: "New Academic Policy: GPA Weighting Explained",
      category: "Hard News",
      thumb: "https://static.photos/technology/1280x720/401",
      date: "Oct 3, 2025",
      length: "06:22",
      views: 20100,
      platform: "YouTube",
      url: "https://youtube.com",
    },
    {
      id: "h3",
      title: "City Council Vote: How It Impacts Our District",
      category: "Hard News",
      thumb: "https://static.photos/cityscape/1280x720/509",
      date: "Oct 3, 2025",
      length: "07:09",
      views: 18300,
      platform: "YouTube",
      url: "https://youtube.com",
    },
    {
      id: "h4",
      title: "Data: Attendance Trends Over 3 Years",
      category: "Hard News",
      thumb: "https://static.photos/office/1280x720/405",
      date: "Oct 2, 2025",
      length: "03:57",
      views: 16020,
      platform: "YouTube",
      url: "https://youtube.com",
    },
    {
      id: "h5",
      title: "Exam Reform: What Students Think",
      category: "Hard News",
      thumb: "https://static.photos/people/1280x720/410",
      date: "Oct 2, 2025",
      length: "04:13",
      views: 14420,
      platform: "Instagram",
      url: "https://instagram.com",
    },
    {
      id: "h6",
      title: "Teacher Spotlight: AP Chem Revamp",
      category: "Hard News",
      thumb: "https://static.photos/office/1280x720/410",
      date: "Oct 1, 2025",
      length: "05:33",
      views: 11890,
      platform: "YouTube",
      url: "https://youtube.com",
    },
  ],
  Local: [
    {
      id: "l1",
      title: "Neighborhood Gallery Opens New Youth Exhibit",
      category: "Local",
      thumb: "https://static.photos/people/1280x720/451",
      date: "Oct 4, 2025",
      length: "05:20",
      views: 6100,
      platform: "YouTube",
      url: "https://youtube.com",
      blurb: "Students curate original work across neighborhoods.",
    },
    {
      id: "l2",
      title: "Transit Week: Student Commuter Stories",
      category: "Local",
      thumb: "https://static.photos/cityscape/1280x720/520",
      date: "Oct 3, 2025",
      length: "03:58",
      views: 5200,
      platform: "Instagram",
      url: "https://instagram.com",
    },
    {
      id: "l3",
      title: "Local Team Wins Semi-Finals",
      category: "Local",
      thumb: "https://static.photos/people/1280x720/460",
      date: "Oct 2, 2025",
      length: "02:49",
      views: 4900,
      platform: "YouTube",
      url: "https://youtube.com",
    },
    {
      id: "l4",
      title: "Cafés with Study Discounts (Map)",
      category: "Local",
      thumb: "https://static.photos/office/1280x720/420",
      date: "Oct 1, 2025",
      length: "04:01",
      views: 4100,
      platform: "YouTube",
      url: "https://youtube.com",
    },
    {
      id: "l5",
      title: "Weekend Markets: What’s Fresh",
      category: "Local",
      thumb: "https://static.photos/office/1280x720/421",
      date: "Sep 30, 2025",
      length: "01:44",
      views: 3600,
      platform: "Instagram",
      url: "https://instagram.com",
    },
    {
      id: "l6",
      title: "Local Park Renovations: Timeline",
      category: "Local",
      thumb: "https://static.photos/cityscape/1280x720/530",
      date: "Sep 29, 2025",
      length: "06:22",
      views: 3350,
      platform: "YouTube",
      url: "https://youtube.com",
    },
  ],
  Heartwarming: [
    {
      id: "hw1",
      title: "Fundraiser Surpasses Goal for Library",
      category: "Heartwarming",
      thumb: "https://static.photos/people/1280x720/470",
      date: "Oct 4, 2025",
      length: "03:05",
      views: 15800,
      platform: "YouTube",
      url: "https://youtube.com",
      blurb: "Community rallies to expand student access to books.",
    },
    {
      id: "hw2",
      title: "Senior Mentorship Program Launch",
      category: "Heartwarming",
      thumb: "https://static.photos/office/1280x720/430",
      date: "Oct 3, 2025",
      length: "02:12",
      views: 9000,
      platform: "Instagram",
      url: "https://instagram.com",
    },
    {
      id: "hw3",
      title: "Volunteer Day: 300+ Students Join",
      category: "Heartwarming",
      thumb: "https://static.photos/people/1280x720/471",
      date: "Oct 2, 2025",
      length: "04:01",
      views: 8100,
      platform: "YouTube",
      url: "https://youtube.com",
    },
    {
      id: "hw4",
      title: "Band Hosts Free Concert at Park",
      category: "Heartwarming",
      thumb: "https://static.photos/people/1280x720/472",
      date: "Oct 1, 2025",
      length: "07:11",
      views: 6000,
      platform: "YouTube",
      url: "https://youtube.com",
    },
    {
      id: "hw5",
      title: "Teacher-Student Art Collaboration",
      category: "Heartwarming",
      thumb: "https://static.photos/office/1280x720/440",
      date: "Sep 30, 2025",
      length: "01:58",
      views: 4900,
      platform: "Instagram",
      url: "https://instagram.com",
    },
    {
      id: "hw6",
      title: "Alumni Scholarship Success Stories",
      category: "Heartwarming",
      thumb: "https://static.photos/people/1280x720/473",
      date: "Sep 29, 2025",
      length: "08:45",
      views: 4700,
      platform: "YouTube",
      url: "https://youtube.com",
    },
  ],
  Features: [
    {
      id: "f1",
      title: "Inside the Robotics Lab: Meet the Builders",
      category: "Features",
      thumb: "https://static.photos/technology/1280x720/460",
      date: "Oct 5, 2025",
      length: "10:58",
      views: 28800,
      platform: "YouTube",
      url: "https://youtube.com",
      blurb: "From schematics to victories — a season in the making.",
    },
    {
      id: "f2",
      title: "New Theater Production: Backstage Rehearsals",
      category: "Features",
      thumb: "https://static.photos/people/1280x720/490",
      date: "Oct 3, 2025",
      length: "06:11",
      views: 12200,
      platform: "YouTube",
      url: "https://youtube.com",
    },
    {
      id: "f3",
      title: "Student Chef Spotlight",
      category: "Features",
      thumb: "https://static.photos/office/1280x720/450",
      date: "Oct 2, 2025",
      length: "05:01",
      views: 9000,
      platform: "Instagram",
      url: "https://instagram.com",
    },
    {
      id: "f4",
      title: "Tech Fair: Winners & Standouts",
      category: "Features",
      thumb: "https://static.photos/technology/1280x720/461",
      date: "Oct 1, 2025",
      length: "07:40",
      views: 8550,
      platform: "YouTube",
      url: "https://youtube.com",
    },
    {
      id: "f5",
      title: "Debate Club Preps for Regionals",
      category: "Features",
      thumb: "https://static.photos/people/1280x720/495",
      date: "Sep 30, 2025",
      length: "04:20",
      views: 7200,
      platform: "YouTube",
      url: "https://youtube.com",
    },
    {
      id: "f6",
      title: "Esports: The New Varsity",
      category: "Features",
      thumb: "https://static.photos/technology/1280x720/462",
      date: "Sep 29, 2025",
      length: "08:06",
      views: 6900,
      platform: "YouTube",
      url: "https://youtube.com",
    },
  ],
  Documentaries: [
    {
      id: "d1",
      title: "The Long Game: Building a Team from Scratch",
      category: "Documentaries",
      thumb: "https://static.photos/people/1280x720/520",
      date: "Oct 5, 2025",
      length: "22:40",
      views: 54000,
      platform: "YouTube",
      url: "https://youtube.com",
      blurb: "An intimate profile of perseverance, team-building, and growth.",
    },
    {
      id: "d2",
      title: "The Neighborhood Beat",
      category: "Documentaries",
      thumb: "https://static.photos/cityscape/1280x720/560",
      date: "Oct 4, 2025",
      length: "18:12",
      views: 22600,
      platform: "YouTube",
      url: "https://youtube.com",
    },
    {
      id: "d3",
      title: "Study After Dark: Night School Stories",
      category: "Documentaries",
      thumb: "https://static.photos/office/1280x720/560",
      date: "Oct 2, 2025",
      length: "25:51",
      views: 20150,
      platform: "YouTube",
      url: "https://youtube.com",
    },
    {
      id: "d4",
      title: "Underground Arts",
      category: "Documentaries",
      thumb: "https://static.photos/people/1280x720/521",
      date: "Oct 1, 2025",
      length: "16:22",
      views: 17990,
      platform: "YouTube",
      url: "https://youtube.com",
    },
    {
      id: "d5",
      title: "The Commute",
      category: "Documentaries",
      thumb: "https://static.photos/cityscape/1280x720/561",
      date: "Sep 30, 2025",
      length: "30:01",
      views: 15040,
      platform: "YouTube",
      url: "https://youtube.com",
    },
    {
      id: "d6",
      title: "Paper Trail: Student Journalism 101",
      category: "Documentaries",
      thumb: "https://static.photos/office/1280x720/561",
      date: "Sep 28, 2025",
      length: "19:34",
      views: 13320,
      platform: "YouTube",
      url: "https://youtube.com",
    },
  ],
};

function kFmt(n?: number) {
  if (!n && n !== 0) return "";
  if (n < 1000) return `${n}`;
  if (n < 1_000_000) return `${(n / 1000).toFixed(1)}K`;
  return `${(n / 1_000_000).toFixed(1)}M`;
}

/** Tile UI */
function Tile({
  item,
  variant,
}: {
  item: VideoItem;
  variant: "feature" | "medium" | "small";
}) {
  const sizeCls =
    variant === "feature"
      ? "h-[320px] md:h-[420px]"
      : variant === "medium"
      ? "h-[200px] md:h-[220px]"
      : "h-[160px] md:h-[180px]";

  return (
    <a
      href={item.url || "#"}
      target="_blank"
      rel="noreferrer"
      className="group relative overflow-hidden rounded-lg bg-black"
    >
      <img
        src={item.thumb}
        alt={item.title}
        className={`w-full ${sizeCls} object-cover opacity-90 group-hover:opacity-100 transition duration-500`}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90"></div>

      {/* Top-left platform pill */}
      {item.platform && (
        <span className="absolute top-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[11px] uppercase text-white">
          {item.platform}
        </span>
      )}

      {/* Feature/Medium text */}
      {variant !== "small" && (
        <div className="absolute left-0 right-0 bottom-0 p-4 text-white">
          <span className="inline-block text-[11px] tracking-widest text-[#ffd7db] font-semibold">
            {item.category.toUpperCase()}
          </span>
          <h3 className="mt-1 font-serif font-extrabold leading-tight text-lg md:text-xl line-clamp-2">
            {item.title}
          </h3>
          <p className="mt-1 text-xs text-white/80">
            {item.date}
            {item.length ? ` • ${item.length}` : ""}
            {item.views ? ` • ${kFmt(item.views)} views` : ""}
          </p>
          {item.blurb && (
            <p className="mt-2 text-sm text-white/90 line-clamp-2">{item.blurb}</p>
          )}
        </div>
      )}

      {/* Hover play button */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
        <div className="w-14 h-14 bg-[#c2122b]/90 rounded-full flex items-center justify-center">
          <PlayCircle className="text-white w-7 h-7" />
        </div>
      </div>
    </a>
  );
}

/** Category metrics */
function CategoryMetrics({ items }: { items: VideoItem[] }) {
  const totalViews = useMemo(
    () => items.reduce((sum, v) => sum + (v.views || 0), 0),
    [items]
  );
  return (
    <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
      <span className="inline-flex items-center gap-1">
        <BarChart2 className="h-4 w-4 text-[#c2122b]" /> {kFmt(totalViews)} total views
      </span>
      <span className="opacity-50">•</span>
      <span>{items.length} videos</span>
    </div>
  );
}

/** Catalog Section (Explorer) */
function CatalogSection() {
  const [active, setActive] = useState<Category>("Breaking");
  const [sort, setSort] = useState<"recent" | "views">("recent");

  const items = useMemo(() => {
    const base = [...catalogData[active]];
    if (sort === "views") base.sort((a, b) => (b.views || 0) - (a.views || 0));
    else
      base.sort(
        (a, b) => +new Date(b.date || "") - +new Date(a.date || "")
      );
    return base;
  }, [active, sort]);

  // Pick layout slices safely
  const feature = items[0];
  const mediums = items.slice(1, 3);
  const smalls = items.slice(3, 7);

  return (
    <section id="catalog" className="bg-white dark:bg-[#0b0f1a] py-10 border-t border-gray-200 dark:border-neutral-800">
      <div className="px-6">
        {/* Control Bar */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-[28px] font-serif font-extrabold text-gray-900 dark:text-white">
              Catalog
            </h2>
            <CategoryMetrics items={items} />
          </div>
          <div className="flex flex-wrap items-center gap-3 md:gap-5">
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-3">
              {CATEGORIES.map((cat) => {
                const activeTab = cat === active;
                return (
                  <button
                    key={cat}
                    onClick={() => setActive(cat)}
                    className={`relative text-sm font-semibold transition-colors ${
                      activeTab
                        ? "text-[#c2122b]"
                        : "text-gray-700 dark:text-gray-300 hover:text-[#c2122b]"
                    }`}
                  >
                    {cat}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] transition-all ${
                        activeTab ? "w-full bg-[#c2122b]" : "w-0 bg-transparent"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            {/* Sort control */}
            <div className="ml-0 md:ml-4 flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Sort:</span>
              <div className="flex items-center gap-[6px] rounded-full border border-gray-200 dark:border-neutral-700 p-[3px]">
                <button
                  onClick={() => setSort("recent")}
                  className={`px-3 py-1 text-xs rounded-full transition ${
                    sort === "recent"
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
                  }`}
                >
                  Recent
                </button>
                <button
                  onClick={() => setSort("views")}
                  className={`px-3 py-1 text-xs rounded-full transition ${
                    sort === "views"
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
                  }`}
                >
                  Most Viewed
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mosaic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Feature (spans 2 cols on lg) */}
          <div className="lg:col-span-2">
            {feature ? (
              <Tile item={feature} variant="feature" />
            ) : (
              <div className="h-[320px] md:h-[420px] rounded-lg border border-dashed border-gray-200 dark:border-neutral-700 flex items-center justify-center text-sm text-gray-500">
                No videos in this category yet.
              </div>
            )}
          </div>

          {/* Right: Medium list */}
          <div className="space-y-6">
            {mediums.length ? (
              mediums.map((m) => <Tile key={m.id} item={m} variant="medium" />)
            ) : (
              <div className="h-[200px] rounded-lg border border-dashed border-gray-200 dark:border-neutral-700 flex items-center justify-center text-sm text-gray-500">
                More videos coming soon.
              </div>
            )}
          </div>
        </div>

        {/* Bottom: Small grid */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {smalls.map((s) => (
            <Tile key={s.id} item={s} variant="small" />
          ))}
        </div>

        {/* Legitimacy strip */}
        <div className="mt-8 flex items-center justify-between border-t border-gray-200 dark:border-neutral-800 pt-4">
          <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <Info className="h-4 w-4 text-[#c2122b]" />
            Content curated by TNN editorial team. Video rights © respective platforms.
          </div>
          <a
            href="#"
            className="text-xs font-semibold text-gray-800 dark:text-gray-200 hover:text-[#c2122b] inline-flex items-center gap-1"
          >
            Submit a tip <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ===============================
   NEWSLETTER CTA
================================== */
const Newsletter: React.FC = () => (
  <section className="rounded-2xl bg-white dark:bg-neutral-900 p-6 md:p-8 text-gray-900 dark:text-white border border-gray-200 dark:border-neutral-800 my-12 mx-6 text-center">
    <h3 className="text-xl font-serif font-bold mb-2">Stay Ahead of the Story</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
      Get our latest reports and video stories straight to your inbox.
    </p>
    <form className="flex justify-center gap-2">
      <input
        type="email"
        placeholder="Your email"
        className="h-10 w-64 rounded border border-gray-300 dark:border-neutral-700 bg-transparent px-3 text-sm"
      />
      <button className="h-10 rounded bg-[#c2122b] px-4 text-sm font-semibold text-white hover:bg-red-700">
        Subscribe
      </button>
    </form>
  </section>
);

/* ===============================
   FOOTER
================================== */
const Footer: React.FC = () => (
  <footer className="mt-12 border-t bg-white dark:bg-neutral-950 border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-white">
    <div className="container mx-auto px-6 py-8 text-center">
      <div className="flex justify-center gap-6 mb-4">
        <a href="#" className="hover:text-[#c2122b]">
          <Youtube />
        </a>
        <a href="#" className="hover:text-[#c2122b]">
          <Instagram />
        </a>
        <a href="#" className="hover:text-[#c2122b]">
          <Twitter />
        </a>
      </div>
      <p className="text-xs text-gray-500">© 2025 Tech News Network. All rights reserved.</p>
    </div>
  </footer>
);


/* ===============================
   TRENDING LEADERBOARD (Horizontal)
================================== */
const TrendingLeaderboard: React.FC = () => {
  // Flatten all videos and sort by views descending
  const allVideos: VideoItem[] = Object.values(catalogData).flat();
  const trending = [...allVideos]
    .filter((v) => typeof v.views === "number")
    .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, 10);

  // Accent colors for top 3
  const accentGlows = [
    "shadow-[0_0_24px_2px_#c2122b80] border-[#c2122b] ring-2 ring-[#c2122b]",
    "shadow-[0_0_12px_1px_#c2122b40] border-[#c2122b]/70 ring-1 ring-[#c2122b]/70",
    "shadow-[0_0_8px_1px_#c2122b33] border-[#c2122b]/50",
  ];

  return (
    <section className="bg-[#15171e] dark:bg-[#181b22] py-5 sm:py-8 px-0 border-b border-gray-200 dark:border-neutral-800">
      <div className="px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between mb-3 sm:mb-4 gap-2">
        <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-extrabold text-white">
          Trending Leaderboard
        </h2>
        <span className="text-xs sm:text-xs text-[#ffd7db] font-semibold uppercase tracking-widest">
          Top {trending.length} Videos
        </span>
      </div>
      {/* Swipe hint for mobile */}
      <div className="block sm:hidden px-4 pb-2 text-xs text-white/60 font-medium select-none">
        <span className="animate-pulse">Swipe to explore →</span>
      </div>
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#c2122b]/60 scrollbar-track-transparent">
        <div
          className="flex gap-3 sm:gap-6 md:gap-8 px-3 sm:px-6 pb-2 snap-x snap-mandatory scroll-smooth"
          style={{ WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory" }}
        >
          {trending.map((video, idx) => (
            <a
              key={video.id}
              href={video.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={
                "snap-center group relative flex-shrink-0 w-44 sm:w-56 md:w-72 cursor-pointer bg-[#181b22] rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-transform duration-200 hover:scale-105 " +
                (accentGlows[idx] || "border-transparent")
              }
              style={{
                minWidth: "11.5rem", // 184px (w-44)
                maxWidth: "18rem",   // 288px (w-72)
                width: "clamp(11.5rem, 35vw, 18rem)",
                minHeight: "190px",
              }}
            >
              <img
                src={video.thumb}
                alt={video.title}
                className="w-full h-28 sm:h-36 md:h-40 object-cover opacity-90 group-hover:opacity-100 transition duration-300"
                loading="lazy"
                style={{
                  height: "clamp(7rem, 22vw, 10rem)" // 112px-160px
                }}
              />
              {/* Ranking badge */}
              <div
                className={`absolute top-2 left-2 flex items-center justify-center rounded-full w-7 h-7 sm:w-9 sm:h-9 font-extrabold text-base sm:text-lg ${
                  idx === 0
                    ? "bg-[#c2122b] text-white shadow-lg"
                    : idx === 1
                    ? "bg-[#ffd7db] text-[#c2122b] shadow"
                    : idx === 2
                    ? "bg-[#fff1f3] text-[#c2122b] shadow"
                    : "bg-black/70 text-white"
                }`}
              >
                #{idx + 1}
              </div>
              {/* Info overlay */}
              <div className="absolute inset-x-0 bottom-0 p-2 sm:p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                <h3 className="text-sm sm:text-base font-serif font-bold text-white line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[11px] sm:text-xs text-white/80 mt-0.5 sm:mt-1">
                  <span>{video.category}</span>
                  <span>•</span>
                  <span>{kFmt(video.views)} views</span>
                  {video.platform && (
                    <>
                      <span>•</span>
                      <span className="uppercase">{video.platform}</span>
                    </>
                  )}
                </div>
              </div>
              {/* Hover Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-[#c2122b]/90 rounded-full flex items-center justify-center">
                  <PlayCircle className="text-white w-5 h-5 sm:w-7 sm:h-7" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ===============================
   PARTNERSHIPS (Refined Section)
================================== */
const Partnerships: React.FC = () => {
  // chips
  const sections = [
    "Hard News",
    "Opinions",
    "Features",
    "Arts & Entertainment",
    "STEM",
    "Sports",
    "Surveycasts",
  ];

  // stats (moved here from LiveStats)
  const stats = [
    {
      icon: <BarChart2 className="w-6 h-6 text-[#c2122b]" />,
      label: "Stories Published",
      value: 128,
      color: "text-[#c2122b]",
    },
    {
      icon: <Flame className="w-6 h-6 text-[#f59e42]" />,
      label: "Viewers Online",
      value: 432,
      color: "text-[#f59e42]",
    },
    {
      icon: <Info className="w-6 h-6 text-[#1e90ff]" />,
      label: "Reporters Active",
      value: 17,
      color: "text-[#1e90ff]",
    },
  ] as const;

  // simple count-up animation
  const [counts, setCounts] = React.useState(stats.map(() => 0));
  React.useEffect(() => {
    let frame: number;
    const durations = [900, 1200, 1000];
    const ends = stats.map((s) => s.value);
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      setCounts(
        ends.map((end, i) =>
          Math.min(end, Math.floor((end * Math.min(elapsed, durations[i])) / durations[i]))
        )
      );
      if (elapsed < Math.max(...durations)) frame = requestAnimationFrame(tick);
      else setCounts(ends);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="relative py-16 overflow-hidden bg-[#f8f7f5] dark:bg-[#15171e] border-b border-gray-200 dark:border-neutral-800">
      {/* subtle brand glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(60% 50% at 50% 0%, rgba(194,18,43,0.12) 0%, rgba(194,18,43,0.0) 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* two-column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Association card */}
          <div className="relative group rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-[#0f1424]/70 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,.12)] p-6 md:p-8">
            {/* mini badge */}
            <div className="absolute -top-3 left-6 inline-flex items-center gap-2 rounded-full bg-black text-white dark:bg-white dark:text-black px-3 py-1 text-[11px] uppercase tracking-widest shadow">
              In Association With
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
              {/* Logo card */}
              <div className="relative">
                <div className="absolute inset-0 -z-10 rounded-2xl bg-[#1b2b5b]/25 blur-2xl scale-110" />
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-white ring-1 ring-black/5 overflow-hidden shadow-xl grid place-items-center transition-transform duration-500 group-hover:scale-[1.02]">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/9/9b/Bthslogo.JPG"
                    alt="Brooklyn Technical High School Logo"
                    className="w-[80%] h-[80%] object-contain select-none"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Copy + chips + CTA */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-serif font-extrabold text-gray-900 dark:text-white">
                  The Brooklyn Tech Survey
                </h3>
                <p className="mt-2 text-sm md:text-base text-gray-700 dark:text-gray-300 max-w-xl">
                  Brooklyn Tech’s official, student‑run newspaper — well known on campus for
                  clear reporting, sharp opinion, and vibrant coverage of school life.
                </p>

                {/* section chips */}
                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                  {sections.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 dark:border-neutral-700 px-3 py-1 text-xs text-gray-700 dark:text-gray-300 bg-white/60 dark:bg-white/5"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-5">
                  <a
                    href="https://www.bths.edu/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-[#0b4ea2] text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-[#0a3f88] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0b4ea2]"
                  >
                    Visit The Survey
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Live Stats (moved here) */}
          <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-[#0f1424]/70 backdrop-blur-md p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,.12)] flex flex-col justify-center">
            <h4 className="text-lg md:text-xl font-serif font-extrabold text-gray-900 dark:text-white mb-6">
              TNN at a glance
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex flex-col items-center text-center">
                  <div className="mb-2">{stat.icon}</div>
                  <span className={`text-3xl md:text-4xl font-extrabold font-serif ${stat.color}`}>
                    {counts[i]}
                  </span>
                  <span className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
            {/* fine print */}
            <div className="mt-6 text-[11px] text-gray-500 dark:text-gray-400 text-center">
              Updated weekly • Includes cross‑platform views and internal publication counts
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ===============================
   DYNAMIC COMMENTS (Top Comments)
================================== */
const testimonialData = [
  {
    quote:
      "This breakdown was 🔥! I never understood the school budget until now. Subscribed!",
    author: "Jordan M.",
    platform: "YouTube",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    time: "2 hours ago",
    likes: 24,
    replies: 1,
  },
  {
    quote:
      "Shared this on my story—everyone needs to see how cool student news can be.",
    author: "Samira R.",
    platform: "Instagram",
    avatar: "https://randomuser.me/api/portraits/women/43.jpg",
    time: "3h",
    likes: 12,
    replies: 0,
  },
  {
    quote:
      "Such a clear explanation! Our class discussion was way better after watching.",
    author: "Mr. Patel",
    platform: "YouTube",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    time: "5 hours ago",
    likes: 17,
    replies: 2,
  },
  {
    quote:
      "The editing and graphics are next level. Respect to the TNN team 👏",
    author: "Alex T.",
    platform: "Instagram",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    time: "1h",
    likes: 8,
    replies: 0,
  },
  {
    quote:
      "Found this through a hashtag—now I can’t stop watching your news recaps.",
    author: "Lila S.",
    platform: "Instagram",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    time: "45m",
    likes: 7,
    replies: 0,
  },
];

const DynamicComments: React.FC = () => {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const int = setInterval(() => {
      setIdx((prev) => (prev + 1) % testimonialData.length);
    }, 5000);
    return () => clearInterval(int);
  }, []);

  // Platform icon strip for the title
const platformIcons = (
  <div className="flex justify-center gap-2 mt-1 mb-2">
    <span className="inline-flex items-center">
      <Youtube className="w-4 h-4 text-[#c2122b]">
        <title>YouTube</title>
      </Youtube>
    </span>
    <span className="inline-flex items-center">
      <Instagram className="w-4 h-4 text-pink-500">
        <title>Instagram</title>
      </Instagram>
    </span>
    <span className="inline-flex items-center">
      <Twitter className="w-4 h-4 text-sky-500">
        <title>Twitter</title>
      </Twitter>
    </span>
  </div>
);

  return (
    <section className="bg-[#f8f7f5] dark:bg-[#181b22] py-12 border-b border-gray-200 dark:border-neutral-800">
      <div className="max-w-xl mx-auto px-6">
        <h3 className="text-2xl font-serif font-extrabold text-gray-900 dark:text-white mb-2 text-center flex items-center justify-center gap-2">
          <span role="img" aria-label="fire" className="text-[#c2122b] text-lg">🔥</span>
          Top Comments
        </h3>
        {platformIcons}
        <div className="relative h-48 flex items-center justify-center">
          {testimonialData.map((t, i) => {
            // YouTube style
            if (t.platform === "YouTube") {
              return (
                <div
                  key={i}
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
                    i === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                  aria-hidden={i !== idx}
                >
                  <div className="flex items-start w-full max-w-lg px-2">
                    {/* Avatar */}
                    <img
                      src={t.avatar}
                      alt={t.author}
                      className="w-11 h-11 rounded-full object-cover mr-4 border border-gray-200 dark:border-neutral-700 flex-shrink-0"
                      loading="lazy"
                    />
                    {/* Comment Card */}
                    <div className="flex-1 bg-white dark:bg-neutral-900 rounded-lg border border-gray-200 dark:border-neutral-800 px-4 py-3 shadow-sm">
                      <div className="flex items-center mb-1">
                        <span className="font-semibold text-sm text-gray-900 dark:text-white mr-2">{t.author}</span>
                        <Youtube className="w-4 h-4 text-[#c2122b] mr-1">
                          <title>YouTube</title>
                        </Youtube>
                        <span className="text-xs text-gray-400">{t.time}</span>
                      </div>
                      <div className="text-[15px] text-gray-900 dark:text-gray-100 leading-snug mb-2">{t.quote}</div>
                      <div className="flex items-center gap-3 mt-1">
                        {/* Like/thumbs-up */}
                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <svg width="16" height="16" fill="none" stroke="#c2122b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14 9V5a3 3 0 0 0-6 0v4"></path><path d="M5 15V9a2 2 0 0 1 2-2h8.28a2 2 0 0 1 1.94 2.5l-1.38 5.5A2 2 0 0 1 14 17H7a2 2 0 0 1-2-2z"></path></svg>
                          {t.likes}
                        </span>
                        {/* Heart */}
                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <svg width="14" height="14" fill="#c2122b" viewBox="0 0 24 24"><path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12z" /></svg>
                        </span>
                        {/* Reply */}
                        <span className="text-xs text-gray-400 hover:underline cursor-pointer">Reply</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-400">{t.replies} replies</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            // Instagram style
            else if (t.platform === "Instagram") {
              return (
                <div
                  key={i}
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
                    i === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                  aria-hidden={i !== idx}
                >
                  <div className="flex items-start w-full max-w-lg px-2">
                    {/* Avatar */}
                    <img
                      src={t.avatar}
                      alt={t.author}
                      className="w-10 h-10 rounded-full object-cover mr-3 border border-pink-400 flex-shrink-0"
                      loading="lazy"
                    />
                    {/* Comment Card */}
                    <div className="flex-1 rounded-lg px-0 py-2 bg-gradient-to-r from-pink-500/10 to-purple-500/10 dark:bg-gradient-to-r dark:from-pink-500/10 dark:to-purple-500/10">
                      <div className="flex items-center mb-1">
                        <span className="font-semibold text-sm text-pink-600 dark:text-pink-400 mr-2">{t.author}</span>
                        <Instagram className="w-4 h-4 text-pink-500 mr-1">
                          <title>Instagram</title>
                        </Instagram>
                        <span className="text-xs text-gray-400">{t.time}</span>
                      </div>
                      <div className="text-[15px] text-gray-900 dark:text-white leading-snug mb-1">{t.quote}</div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-pink-500 font-semibold">
                          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12z" /></svg>
                          {t.likes} likes
                        </span>
                        <span className="text-xs text-gray-400 hover:underline cursor-pointer">Reply</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            // fallback (shouldn't hit)
            return null;
          })}
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {testimonialData.map((_, i) => (
            <button
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === idx ? "bg-[#c2122b] opacity-90" : "bg-gray-300 dark:bg-neutral-700 opacity-60"
              }`}
              aria-label={`Show comment ${i + 1}`}
              onClick={() => setIdx(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


/* ===============================
   MISSION STATEMENT
================================== */
const MissionStatement: React.FC = () => (
  <section className="py-12 px-6 bg-[#f8f7f5] dark:bg-[#181b22] border-b border-gray-200 dark:border-neutral-800">
    <div className="max-w-3xl mx-auto rounded-xl p-8 bg-white/70 dark:bg-[#232634]/70 shadow-sm">
      <h2 className="text-2xl md:text-3xl font-serif font-extrabold mb-4 text-gray-900 dark:text-white text-center">
        Our Mission
      </h2>
      <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 mb-4 leading-relaxed text-center">
        <span className="font-serif font-bold text-[#c2122b]">TNN</span> exists to empower the next generation of journalists—amplifying student voices and delivering trusted, timely, and transformative news coverage. We believe in the power of storytelling to inform, inspire, and unite our community.
      </p>
      <p className="text-base text-gray-700 dark:text-gray-300 text-center">
        Our vision is to foster transparency, curiosity, and critical thinking—preparing young reporters to lead with integrity and purpose. Every story is a step toward a more informed and connected future.
      </p>
    </div>
  </section>
)

/* ===============================
   APP ROOT
================================== */
// HomeContent component containing homepage sections
const HomeContent: React.FC = () => (
  <div className="font-['Inter'] bg-gray-50 dark:bg-[#0b0f1a] text-gray-800 dark:text-gray-100">
    <BreakingTicker />
    <Hero />
    <TrendingLeaderboard />
    <Partnerships />
    <DynamicComments />
    <MissionStatement />
    <CatalogSection />
    <Newsletter />
    <Footer />
  </div>
);

const App: React.FC = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/info" element={<InfoPage />} />
      </Routes>
    </>
  );
};

export default App;