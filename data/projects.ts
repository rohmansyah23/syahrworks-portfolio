import type { Project } from "@/lib/types";

export const projectCategories = [
  "All",
  "Web Development",
  "Mobile",
  "AI & Data",
  "Desktop & Tools",
] as const;

export const projects: Project[] = [
  {
    id: "crocode-marketplace",
    title: "CroCode Marketplace",
    description:
      "A modern digital platform for selling high-quality website and application source code. Serves as both a product catalog and primary transaction gateway.",
    coverImage: "/projects/crocode.png",
    tags: ["Web Development"],
    role: "Full-Stack Developer",
    techStack: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "AOS", "GLightbox"],
    githubUrl: "https://github.com/rohmansyah23/Crocode",
    liveUrl: "https://rohmansyah23.github.io/Crocode/",
    gallery: ["/projects/crocode.png"],
  },
  {
    id: "pawscare-portal",
    title: "PawsCare Portal",
    description:
      "Pet Health Portal — a health information portal for pets and dogs featuring admin CMS, gallery, and search functionality. Built with CodeIgniter 3 and Ion Auth.",
    coverImage: "/projects/pawscare.png",
    tags: ["Web Development"],
    role: "Full-Stack Developer",
    techStack: ["CodeIgniter 3", "Bootstrap 4", "MySQL", "Ion Auth", "jQuery DataTables", "SweetAlert2"],
    githubUrl: "https://github.com/rohmansyah23/portal-paswcare",
    gallery: ["/projects/pawscare.png"],
  },
  {
    id: "qc-mobile-app",
    title: "QC Mobile App",
    description:
      "O&C Financial — a full-stack personal finance tracking app for couples. Flat-minimalist Scandinavian-style UI with real-time Supabase integration and Riverpod state management.",
    coverImage: "/projects/oc.png",
    tags: ["Mobile"],
    role: "Mobile Developer",
    techStack: ["Flutter", "Dart", "Riverpod", "Supabase"],
    githubUrl: "https://github.com/rohmansyah23/QC-Mobile-App",
    gallery: ["/projects/oc.png"],
  },
  {
    id: "auto-refresh-bot",
    title: "Auto-Refresh Bot",
    description:
      "A mini browser app built with Flutter featuring a Floating Menu UI. Equipped with Cloudflare Anti-Bot bypass, Multi-Popup Auth, Desktop Mode, and dynamic-scale zoom using flutter_inappwebview.",
    coverImage: "/projects/auto-refresh.png",
    tags: ["Mobile"],
    role: "Mobile Developer",
    techStack: ["Flutter", "Dart", "flutter_inappwebview"],
    githubUrl: "https://github.com/rohmansyah23/flutter-auto-refresh-bot",
    gallery: ["/projects/auto-refresh.png"],
  },
  {
    id: "red-line-guardian-ai",
    title: "Red Line Guardian AI",
    description:
      "A complete ecosystem consisting of a high-reflex reaction game (Pygame) and an advanced Computer Vision Agent (OpenCV + PID Control) designed to simulate professional-level human gameplay.",
    coverImage: "/projects/red-line-bot-game.png",
    tags: ["AI & Data", "Desktop & Tools"],
    role: "AI & Automation Developer",
    techStack: ["Python", "Pygame", "OpenCV", "MSS", "PID Control", "Pynput", "Tkinter"],
    githubUrl: "https://github.com/rohmansyah23/red-line-guardian-ai",
    gallery: ["/projects/red-line-bot-game.png"],
  },
  {
    id: "pustaka-booking-ubsi",
    title: "Pustaka Booking UBSI",
    description:
      "Library Booking System — a web-based library book borrowing and returning application built with CodeIgniter 3, developed for a Web Programming course at BSI.",
    coverImage: "/projects/pustaka-booking.png",
    tags: ["Web Development"],
    role: "Full-Stack Developer",
    techStack: ["PHP", "CodeIgniter 3", "MySQL"],
    githubUrl: "https://github.com/rohmansyah23/pustaka-booking-ubsi",
    gallery: ["/projects/pustaka-booking.png"],
  },
  {
    id: "ai-go-warehouse-chatbot",
    title: "AI Go — Warehouse Chatbot",
    description:
      "Warehouse assistant chatbot built with Go (Gin Gonic) and integrated with Google Gemini API. Two modes: rule-based (Chatms) and AI-powered (Chatga) with Function Calling.",
    coverImage: "/projects/ai-go.png",
    tags: ["Web Development", "AI & Data"],
    role: "Backend Developer",
    techStack: ["Go", "Gin Gonic", "MySQL", "GORM", "Google Gemini API", "Tailwind CSS", "jQuery"],
    githubUrl: "https://github.com/rohmansyah23/ai-go",
    gallery: ["/projects/ai-go.png"],
  },
  {
    id: "eat-scroll",
    title: "Eat Scroll",
    description:
      "Hands-free auto scrolling for Android. Read Threads, comics, articles, Reddit, and more while eating, commuting, or using one hand.",
    coverImage: "/projects/eat-scroll.png",
    tags: ["Mobile"],
    role: "Mobile Developer",
    techStack: ["Dart", "Kotlin"],
    githubUrl: "https://github.com/rohmansyah23/eat-scroll",
    gallery: ["/projects/eat-scroll.png"],
  },
  {
    id: "taskbar-navigator",
    title: "Taskbar Navigator",
    description:
      "A lightweight and smart Windows automation tool that re-maps taskbar navigation to the Alt key. Ensures applications switch focus and pop to the foreground, solving the minimized window issue.",
    coverImage: "/projects/taskbar-navigation.png",
    tags: ["Desktop & Tools"],
    role: "Desktop Automation Developer",
    techStack: ["Python", "Windows Automation"],
    githubUrl: "https://github.com/rohmansyah23/taskbar-navigator",
    gallery: ["/projects/taskbar-navigation.png"],
  },
  {
    id: "catering-mama-akbar",
    title: "Catering Mama Akbar",
    description:
      "Modern Catering & Menu Management System for Catering Mama Akbar Pondok Kelapa. Integrates an interactive menu catalog with a JWT-authenticated back-office admin panel.",
    coverImage: "/projects/catering-mama-akbar.png",
    tags: ["Web Development"],
    role: "Full-Stack Developer",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Neon Postgres", "Cloudinary", "shadcn/ui", "JWT", "bcryptjs"],
    liveUrl: "https://catering-mama-akbar.vercel.app/",
    gallery: ["/projects/catering-mama-akbar.png"],
  },
  {
    id: "milagros-web",
    title: "Milagros Web",
    description:
      "A modern website for an authorized Milagros agent featuring a landing page, interactive product catalog, and admin panel for stock and media management. Uses Prisma ORM and shadcn/ui.",
    coverImage: "/projects/milagros-web.png",
    tags: ["Web Development"],
    role: "Full-Stack Developer",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Zustand", "Cloudinary", "shadcn/ui"],
    liveUrl: "https://milagros-web.vercel.app/",
    gallery: ["/projects/milagros-web.png"],
  },
  {
    id: "shress",
    title: "Shress",
    description:
      "Multi-tenant financial reporting for Indonesian SMEs. A production-grade, offline-aware Flutter application with real-time financial insights, transaction tracking, debt management, QRIS payments, and multi-business oversight.",
    coverImage: "/projects/sheress.png",
    tags: ["Mobile"],
    role: "Mobile Developer",
    techStack: ["Flutter", "Dart", "Riverpod", "Supabase", "PostgreSQL", "Firebase"],
    githubUrl: "https://github.com/rohmansyah23/Shress",
    gallery: ["/projects/sheress.png"],
  },
];
