import type { JourneyItem } from "@/lib/types";

export const journeyTypes = [
  "Experience",
  "Education",
  "Certification",
  "Competition",
] as const;

export const journey: JourneyItem[] = [
  /* ---------- Full-Time ---------- */
  {
    slug: "freelance-full-stack",
    type: "Full-Time",
    startDate: "2024-01",
    endDate: "Present",
    title: "Freelance Full-Stack Developer",
    subtitle: "Self-Employed",
    description: [
      "Design, develop, deploy, and maintain web and mobile applications throughout the full software development lifecycle (SDLC).",
      "Build and customize solutions based on client requirements, focusing on performance, scalability, and maintainability.",
    ],
    tools: ["Next.js", "TypeScript", "Flutter", "Go"],
  },

  /* ---------- Part-Time ---------- */
  {
    slug: "smks-jakarta1-it-support",
    type: "Part-Time",
    startDate: "2024-10",
    endDate: "2024-12",
    title: "IT Support & Teaching Assistant Intern",
    subtitle: "SMKS Jakarta 1 Pondok Kopi",
    description: [
      "Developed and implemented an integrated student admission (PPDB) system with payment gateway integration.",
      "Built an academic website that streamlined student data management and administrative workflows.",
      "Maintained laboratory IT infrastructure and provided network troubleshooting and technical support.",
    ],
    tools: ["PHP", "CodeIgniter", "MySQL", "Bootstrap"],
  },
  {
    slug: "milagros-admin",
    type: "Part-Time",
    startDate: "2021-02",
    endDate: "2024-12",
    title: "Operational Administrator & Stockist",
    subtitle: "Milagros Pondok Kelapa",
    description: [
      "Prepared daily and monthly sales reports while maintaining 100% inventory accuracy.",
      "Managed inventory distribution and logistics for up to 60 product boxes per month.",
      "Processed more than 20 customer orders per week while ensuring operational efficiency.",
    ],
    tools: ["Inventory Management", "Reporting", "Logistics"],
  },

  /* ---------- Education ---------- */
  {
    slug: "ubsi-s1-ti",
    type: "Education",
    startDate: "2021-08",
    endDate: "2025-12",
    title: "Bachelor of Information Technology",
    subtitle: "Universitas Bina Sarana Informatika, Jakarta",
    description: [
      "Thesis: Development of an Integrated Web-Based Student Admission (PPDB) Information System with Payment Gateway Integration.",
      "Published research on secure online student admission systems with integrated payment gateway functionality.",
    ],
    tools: ["Web Development", "Research", "Payment Gateway"],
  },
  {
    slug: "smks-jakarta1-rpl",
    type: "Education",
    startDate: "2018-07",
    endDate: "2021-06",
    title: "Software Engineering",
    subtitle: "SMKS Jakarta 1 Pondok Kopi, Jakarta",
    description: [
      "Graduated as the top-ranked student in the Software Engineering program.",
      "Active member of the Student Council (OSIS).",
      "Achieved the highest score in the BNSP competency assessment for Software Engineering.",
    ],
    tools: ["PHP", "CodeIgniter", "MySQL", "OOP"],
  },

  /* ---------- Certification (BNSP) ---------- */
  {
    slug: "bnsp-network-administrator-madya",
    type: "Certification",
    startDate: "2025-08",
    endDate: "2028-08",
    title: "Network Administrator Madya",
    subtitle: "Badan Nasional Sertifikasi Profesi (BNSP)",
    caption: "Credential ID TIK.1241.00732 2025 · Valid 2025–2028",
    description: [
      "National competency certification from the National Professional Certification Agency (BNSP) validating professional skills in computer network administration based on the Indonesian SKKNI.",
      "Covered topics: network addressing, network security, disaster recovery planning, wireless network deployment, switch & routing configuration, and network security monitoring.",
    ],
    tools: ["ISP", "Network Administration"],
  },
  {
    slug: "bnsp-program-analyst",
    type: "Certification",
    startDate: "2024-05",
    endDate: "2027-05",
    title: "Program Analyst",
    subtitle: "Badan Nasional Sertifikasi Profesi (BNSP)",
    caption: "Credential ID TIK.1241.01755 2024 · Valid 2024–2027",
    description: [
      "Certified as a Program Analyst by the National Professional Certification Agency (BNSP), proving software development competency based on the Indonesian SKKNI.",
      "Covered topics: SQL, database access, programming algorithms, code documentation, software implementation, debugging, testing, version control, and software maintenance.",
    ],
    tools: ["PHP", "Programming"],
  },
  {
    slug: "bnsp-software-engineering-kkni-ii",
    type: "Certification",
    startDate: "2021-06",
    endDate: "2024-06",
    title: "Software Engineering Competency (KKNI Level II)",
    subtitle: "Badan Nasional Sertifikasi Profesi (BNSP)",
    caption: "Credential ID J1060000542021 · Valid 2021–2024 (expired)",
    description: [
      "Professional certification issued by BNSP validating Software Engineering competency at KKNI Level II.",
      "Covered topics: programming and Object-Oriented Programming (OOP).",
    ],
    tools: ["Programming", "OOP"],
  },

  /* ---------- Competition (datang menyusul) ---------- */
];
