export type EventCategory =
  | "All Events"
  | "Cultural Events"
  | "Technical Events"
  | "Sports"
  | "Arts"
  | "Dance"
  | "Pitch and Talk"
  | "Hackathons"
  | "Music"
  | "Stand up Comedy"
  | "Paper Presentation"
  | "Project Expo"
  | "Spotlight Events";

export type DateTag = "6 Mar" | "7 Mar";

export type Department =
  | "CSE"
  | "CSD"
  | "CSM"
  | "CSC"
  | "CS-IT"
  | "ECE"
  | "EEE"
  | "MECH"
  | "CIVIL"
  | "MBA"
  | "MCA";

export const categories: EventCategory[] = [
  "All Events",
  "Cultural Events",
  "Technical Events",
  "Sports",
  "Arts",
  "Dance",
  "Pitch and Talk",
  "Hackathons",
  "Music",
  "Stand up Comedy",
  "Paper Presentation",
  "Project Expo",
  "Spotlight Events",
];

export const dateTags: DateTag[] = ["6 Mar", "7 Mar"];

export const departments: Department[] = [
  "CSE",
  "CSD",
  "CSM",
  "CSC",
  "CS-IT",
  "ECE",
  "EEE",
  "MECH",
  "CIVIL",
  "MBA",
  "MCA",
];

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  dateTag: DateTag;
  time: string;
  venue: string;
  categories: Exclude<EventCategory, "All Events">[]; // ✅ MULTIPLE
  department: Department | "";
  image: string;
  registrationOpen: boolean;
  teamSize?: string;
  prizes?: string[];
  rules?: string[];
  coordinators?: { name: string; phone: string }[];
}

export function getPrimaryCategory(event: Event): EventCategory {
  return event.categories.length > 0 ? event.categories[0] : "All Events";
}

export const events: Event[] = [

{
    id: "9",
    title: " smart and sustainable cities ",
    description:
      "Innovation Driven by AI is a paper presentation event focused on exploring how Artificial Intelligence is transforming industries and society. Participants present research papers or innovative ideas that highlight AI-driven solutions across domains such as healthcare, education, automation, smart systems, and intelligent decision-making.",
    date: "6th March 2026",
    dateTag: "6 Mar",
    time: "10:30 - 04:00",
    venue: "Seminar Hall / Dept. Venues",
    categories: ["Technical Events", "Paper Presentation"],
    department: "CIVIL",
    image: "/ALL POSTERS/CIVIL.jpg",
    registrationOpen: true,
    teamSize: "2–3 members",
    rules: [
      "Original paper submission is mandatory",
      "Plagiarism leads to disqualification",
      "12–15 slides allowed",
      "PPT/PPTX format only",
      "Report 15 minutes early"
    ],
    coordinators: []
  },
  {
    id: "10",
    title: "Intelligent Manufacturing & Sustainable Mechanical Systems",
    description:
      "Intelligent Manufacturing & Sustainable Mechanical Systems is a paper presentation event that focuses on the integration of advanced manufacturing technologies with sustainable mechanical engineering practices. Participants present research papers or innovative concepts related to smart manufacturing, automation, Industry 4.0, AI-driven production systems, robotics, digital twins, additive manufacturing, and energy-efficient mechanical designs.",
    date: "6th March 2026",
    dateTag: "6 Mar",
    time: "10:30 - 04:00",
    venue: "Seminar Hall / Dept. Venues",
    categories: ["Technical Events", "Paper Presentation"],
    department: "MECH",
    image: "/ALL POSTERS/ME.jpg",
    registrationOpen: true,
    teamSize: "2–3 members",
    rules: [
      "Original paper submission required",
      "12–15 slides allowed",
      "Time limit strictly followed",
      "PPT/PPTX format only"
    ],
    coordinators: []
  },
  {
    id: "11",
    title: "Smart Power Systems & Electric Mobility",
    description:
      " Smart Power Systems & Electric Mobility is a paper presentation event that focuses on advanced electrical power systems and next-generation transportation technologies. Participants present research papers or innovative ideas related to smart grids, renewable energy integration, energy storage systems, power electronics, electric vehicles (EVs), charging infrastructure, and intelligent energy management.   ",
    date: "6th March 2026",
    dateTag: "6 Mar",
    time: "10:30 - 04:00",
    venue: "Seminar Hall / Dept. Venues",
    categories: ["Technical Events", "Paper Presentation"],
    department: "EEE",
    image: "/ALL POSTERS/EEE.jpg",
    registrationOpen: true,
    teamSize: "2–3 members",
    rules: [
      "Original paper submission mandatory",
      "12–15 slides allowed",
      "PPT/PPTX format only",
      "Report 15 minutes early"
    ],
    coordinators: []
  },
  {
    id: "12",
    title: "Embedded and Intelligent Electronic Systems ",
    description:
      "Embedded and Intelligent Electronic Systems is a paper presentation event that focuses on the design and application of smart embedded technologies and intelligent electronic systems. Participants present research papers or innovative ideas related to embedded systems, microcontrollers, IoT devices, real-time systems, AI-enabled electronics, sensor networks, and hardware–software co-design.",
    date: "6th March 2026",
    dateTag: "6 Mar",
    time: "10:30 - 04:00",
    venue: "Seminar Hall / Dept. Venues",
    categories: ["Technical Events", "Paper Presentation"],
    department: "ECE",
    image: "/ALL POSTERS/ECE.jpg",
    registrationOpen: true,
    teamSize: "2–3 members",
    rules: [
      "Original paper submission mandatory",
      "12–15 slides allowed",
      "PPT/PPTX format only",
      "Judges’ decision is final"
    ],
    coordinators: []
  },

  {
    id: "13",
    title: "Next-Generation Computing Technologies ",
    description:
      "Next-Generation Computing Technologies is a paper presentation event that focuses on emerging and advanced computing paradigms shaping the future of technology. Participants present research papers or innovative concepts related to artificial intelligence, quantum computing, edge and cloud computing, high-performance computing, blockchain, cybersecurity, and advanced software architectures.",
    date: "6th March 2026",
    dateTag: "6 Mar",
    time: "10:30 - 04:00",
    venue: "Seminar Hall / Dept. Venues",
    categories: ["Technical Events", "Paper Presentation"],
    department: "CSE",
    image: "/ALL POSTERS/CSE.jpg",
    registrationOpen: true,
    teamSize: "2–3 members",
    rules: [
      "Original paper submission is mandatory",
      "Plagiarism leads to disqualification",
      "12–15 slides allowed",
      "PPT/PPTX format only",
      "Report 15 minutes early",
      "Judges’ decision is final"
    ],
    coordinators: []
  },
  {
    id: "14",
    title: "Cybersecurity, Privacy & Digital Trust",
    description:
      "Cybersecurity, Privacy & Digital Trust is a paper presentation event that focuses on safeguarding digital systems, data, and user trust in an increasingly connected world. Participants present research papers or innovative ideas related to network security, cryptography, data privacy, secure systems, cyber threat intelligence, blockchain security, and trust management frameworks.",
    date: "6th March 2026",
    dateTag: "6 Mar",
    time: "10:30 - 04:00",
    venue: "Seminar Hall / Dept. Venues",
    categories: ["Technical Events", "Paper Presentation"],
    department: "CSC",
    image: "/ALL POSTERS/CSC.jpg",
    registrationOpen: true,
    teamSize: "2–3 members",
    rules: [
      "Original paper submission is mandatory",
      "Plagiarism leads to disqualification",
      "12–15 slides allowed",
      "PPT/PPTX format only",
      "Report 15 minutes early"
    ],
    coordinators: []
  },
  {
    id: "15",
    title: "Artificial Intelligence & Machine Learning Systems",
    description:
      "Artificial Intelligence & Machine Learning Systems is a paper presentation event that focuses on the design, development, and application of intelligent systems powered by AI and ML technologies. Participants present research papers or innovative models related to machine learning algorithms, deep learning, natural language processing, computer vision, reinforcement learning, and AI-driven decision systems.",
    date: "6th March 2026",
    dateTag: "6 Mar",
    time: "10:30 - 04:00",
    venue: "Seminar Hall / Dept. Venues",
    categories: ["Technical Events", "Paper Presentation"],
    department: "CSM",
    image: "/ALL POSTERS/CSM.jpg",
    registrationOpen: true,
    teamSize: "2–3 members",
    rules: [
      "Original paper submission is mandatory",
      "Plagiarism leads to disqualification",
      "12–15 slides allowed",
      "PPT/PPTX format only",
      "Report 15 minutes early"
    ],
    coordinators: []
  },
  {
    id: "16",
    title: "Data Analytics & Scalable Data Engineering",
    description:
      "Data Analytics & Scalable Data Engineering is a paper presentation event that focuses on extracting insights from large-scale data and designing robust, scalable data systems. Participants present research papers or innovative ideas related to big data analytics, data pipelines, distributed systems, data warehousing, real-time processing, cloud-based data platforms, and AI-driven analytics.",
    date: "6th March 2026",
    dateTag: "6 Mar",
    time: "10:30 - 04:00",
    venue: "Seminar Hall / Dept. Venues",
    categories: ["Technical Events", "Paper Presentation"],
    department: "CSD",
    image: "/ALL POSTERS/CSD.jpg",
    registrationOpen: true,
    teamSize: "2–3 members",
    rules: [
      "Original paper submission is mandatory",
      "Plagiarism leads to disqualification",
      "12–15 slides allowed",
      "PPT/PPTX format only",
      "Report 15 minutes early",
      "Judges’ decision is final"
    ],
    coordinators: []
  },
{
    id: "17",
    title: "Cloud Computing & Secure Digital Infrastructure",
    description:
      "Cloud Computing & Secure Digital Infrastructure is a paper presentation event that focuses on modern cloud technologies and secure digital frameworks for efficient, scalable, and reliable computing. Participants present research papers or innovative solutions related to cloud architecture, virtualization, serverless computing, hybrid and multi-cloud strategies, cybersecurity, data protection, and secure network infrastructure..",
    date: "6th March 2026",
    dateTag: "6 Mar",
    time: "10:30 - 04:00",
    venue: "Seminar Hall / Dept. Venues",
    categories: ["Technical Events", "Paper Presentation"],
    department: "CSD",
    image: "/ALL POSTERS/MCA.jpg",
    registrationOpen: true,
    teamSize: "2–3 members",
    rules: [
      "Original paper submission is mandatory",
      "Plagiarism leads to disqualification",
      "12–15 slides allowed",
      "PPT/PPTX format only",
      "Report 15 minutes early",
      "Judges’ decision is final"
    ],
    coordinators: []
  },
{
    id: "18",
    title: "Digital Transformation & Business Innovation",
    description:
      "Digital Transformation & Business Innovation is a paper presentation event that focuses on leveraging digital technologies to transform business processes, models, and strategies. Participants present research papers or innovative solutions related to emerging technologies such as AI, IoT, cloud computing, data analytics, and automation to drive efficiency, competitiveness, and value creation in organizations.",
    date: "6th March 2026",
    dateTag: "6 Mar",
    time: "10:30 - 04:00",
    venue: "Seminar Hall / Dept. Venues",
    categories: ["Technical Events", "Paper Presentation"],
    department: "MCA",
    image: "/ALL POSTERS/MBA.jpg",
    registrationOpen: true,
    teamSize: "2–3 members",
    rules: [
      "Original paper submission is mandatory",
      "Plagiarism leads to disqualification",
      "12–15 slides allowed",
      "PPT/PPTX format only",
      "Report 15 minutes early",
      "Judges’ decision is final"
    ],
    coordinators: []
  },
{
    id: "19",
    title: "Advanced Software Applications with AI & Cloud",
    description:
      "Advanced Software Applications with AI & Cloud is a paper presentation event that focuses on developing innovative software solutions leveraging Artificial Intelligence and cloud technologies. Participants present research papers or projects related to cloud-native applications, AI-integrated software, microservices, serverless architectures, intelligent automation, and scalable distributed systems.",
    date: "6th March 2026",
    dateTag: "6 Mar",
    time: "10:30 - 04:00",
    venue: "Seminar Hall / Dept. Venues",
    categories: ["Technical Events", "Paper Presentation"],
    department: "CS-IT",
    image: "/ALL POSTERS/IT.jpg",
    registrationOpen: true,
    teamSize: "2–3 members",
    rules: [
      "Original paper submission is mandatory",
      "Plagiarism leads to disqualification",
      "12–15 slides allowed",
      "PPT/PPTX format only",
      "Report 15 minutes early",
      "Judges’ decision is final"
    ],
    coordinators: []
  },


  {
    id: "1",
    title: "Pick and Talk",
    description:
      "A technical speaking challenge that tests spontaneity, clarity of thought, and technical awareness.",
    date: "6th March 2026",
    dateTag: "6 Mar",
    time: "10:30 - 04:30",
    venue: "Seminar Hall / Dept. Venues",
    categories: ["Technical Events", "Pitch and Talk"],
    department: "",
    image: "/ALL POSTERS/PIC AND TALK.jpg",
    registrationOpen: true,
    teamSize: "Individual",
    rules: [
      "Topics will be picked randomly",
      "Individual participation only",
      "Slides must be original",
      "No preparation time",
      "Use of mobile phones or notes is prohibited",
      "Exceeding time limit leads to disqualification"
    ],
    coordinators: []
  },
  {
    id: "2",
    title: "3D CAD Model Design",
    description:
      "A hands-on technical event focused on 3D design creativity and CAD tool expertise.",
    date: "6th March 2027",
    dateTag: "6 Mar",
    time: "10:30 - 04:30",
    venue: "Seminar Hall / Dept. Venues",
    categories: ["Technical Events"],
    department: "MECH",
    image: "/ALL POSTERS/3D CAD MODELLING.jpg",
    registrationOpen: true,
    teamSize: "2 members",
    rules: [
      "Only permitted CAD tools may be used",
      "Internet access may be restricted",
      "Designs must be original",
      "Time limit must be followed",
      "Judges’ decision is final"
    ],
    coordinators: []
  },
  {
    id: "3",
    title: "Algorithm Treasure Hunt",
    description:
      "A fun technical event combining algorithms, coding, and logical reasoning.",
    date: "6th March 2028",
    dateTag: "6 Mar",
    time: "10:30 - 04:30",
    venue: "Seminar Hall / Dept. Venues",
    categories: ["Technical Events"],
    department: "",
    image: "/ALL POSTERS/ALGORITHM TRESSURE HUNT.jpg",
    registrationOpen: true,
    teamSize: "2–3 members",
    rules: [
      "Teams must solve clues in sequence",
      "Time limit applies for each round",
      "No external help allowed",
      "Cheating leads to disqualification",
      "Organizers’ decision is final"
    ],
    coordinators: []
  },
  {
    id: "4",
    title: "Agent Building",
    description:
      "Design intelligent agents using AI or rule-based approaches.",
    date: "6th March 2026",
    dateTag: "6 Mar",
    time: "10:30 - 04:30",
    venue: "Seminar Hall / Dept. Venues",
    categories: ["Technical Events"],
    department: "CSM",
    image: "/ALL POSTERS/AI AGENT BUILDING.jpg",
    registrationOpen: true,
    teamSize: "Individual or up to 3 members",
    rules: [
      "Participants must explain agent logic clearly",
      "Internet usage depends on organizers",
      "Pre-built solutions may be restricted",
      "Original ideas are encouraged",
      "Judges’ decision is final"
    ],
    coordinators: []
  },
  {
    id: "5",
    title: "AdZap",
    description:
      "A creative event blending marketing strategy and technical presentation.",
    date: "6th March 2026",
    dateTag: "6 Mar",
    time: "10:30 - 04:30",
    venue: "Seminar Hall / Dept. Venues",
    categories: ["Technical Events"],
    department: "CSD",
    image: "/ALL POSTERS/ADZAP.jpg",
    registrationOpen: true,
    teamSize: "2–4 members",
    rules: [
      "Content must be original",
      "Time limit must be followed",
      "Offensive content is prohibited",
      "Use of multimedia is allowed"
    ],
    coordinators: []
  },
  {
    id: "6",
    title: "Mobile App + IoT Integration",
    description:
      "Build smart systems by integrating mobile apps with IoT devices.",
    date: "6th March 2026",
    dateTag: "6 Mar",
    time: "10:30 - 04:30",
    venue: "Seminar Hall / Dept. Venues",
    categories: ["Technical Events"],
    department: "",
    image: "/ALL POSTERS/MOBILE APP & IPT INTEGRATION.jpg",
    registrationOpen: true,
    teamSize: "2–3 members",
    rules: [
      "Prototype or simulation is acceptable",
      "Architecture explanation is mandatory",
      "Internet usage depends on organizers",
      "Plagiarism leads to disqualification"
    ],
    coordinators: []
  },
  {
    id: "7",
    title: "Bridge Building",
    description:
      "Design and construct a model bridge tested for strength and stability.",
    date: "6th March 2026",
    dateTag: "6 Mar",
    time: "10:30 - 04:30",
    venue: "Seminar Hall / Dept. Venues",
    categories: ["Technical Events"],
    department: "CIVIL",
    image: "/ALL POSTERS/BRIDGE BUILDING.jpg",
    registrationOpen: true,
    teamSize: "2–4 members",
    rules: [
      "Only provided materials may be used",
      "Design must meet size constraints",
      "Structural testing will be conducted",
      "Judges’ decision is final"
    ],
    coordinators: []
  },
  {
    id: "8",
    title: "Logic Gate Master",
    description:
      "Test your understanding of logic gates and digital electronics.",
    date: "6th March 2026",
    dateTag: "6 Mar",
    time: "10:30 - 04:30",
    venue: "Electronics Lab",
    categories: ["Technical Events"],
    department: "",
    image: "/ALL POSTERS/LOGIC GATE MASTER.jpg",
    registrationOpen: true,
    teamSize: "Individual",
    rules: [
      "Mobile phones are not allowed",
      "Calculators may be restricted",
      "Multiple rounds may be conducted",
      "Time limit must be followed"
    ],
    coordinators: []
  },
  



  {
    id: "20",
    title: "Hack Fuzz",
    description:
      "A 24-hour continuous innovation challenge simulating real-world industry problem solving.",
    date: "6th March 2026",
    dateTag: "6 Mar",
    time: "10:00 - 10:00 (24 Hours)",
    venue: "Department Venues",
    categories: ["Technical Events", "Hackathons"],
    department: "",
    image: "/ALL POSTERS/HACK FUZZ.jpeg",
    registrationOpen: true,
    teamSize: "4 members",
    rules: [
      "24-hour continuous hackathon",
      "Teams must work only during allotted time",
      "Solutions must align with given problem statements",
      "Plagiarism or pre-built solutions are not allowed"
    ],
    coordinators: []
  },
  {
    id: "21",
    title: "Startup Stories",
    description:
      "An inspiring session showcasing real-life entrepreneurial journeys and startup experiences.",
    date: "6th March 2026",
    dateTag: "6 Mar",
    time: "10:00 - 04:30",
    venue: "Department Venues",
    categories: ["Spotlight Events"],
    department: "MECH",
    image: "/ALL POSTERS/START UP STORIES.jpg",
    registrationOpen: true,
    teamSize: "4 members",
    rules: [],
    coordinators: []
  },
  {
    id: "22",
    title: "Leadership Talks",
    description:
      "An engaging session focused on leadership qualities, personal growth, and professional development.",
    date: "6th March 2026",
    dateTag: "6 Mar",
    time: "10:00 - 04:30",
    venue: "Department Venues",
    categories: ["Spotlight Events"],
    department: "EEE",
    image: "/ALL POSTERS/LEADERSHIP TALKS.jpg",
    registrationOpen: true,
    teamSize: "2–4 members",
    rules: [],
    coordinators: []
  },
  {
    id: "23",
    title: "Art Gallery",
    description:
      "A creative showcase celebrating artistic expression through paintings, sketches, and photography.",
    date: "6th March 2026",
    dateTag: "6 Mar",
    time: "10:00 - 12:30",
    venue: "Department Venues",
    categories: ["Cultural Events", "Arts"],
    department: "",
    image: "/ALL POSTERS/ART GALLERY.jpg",
    registrationOpen: true,
    teamSize: "",
    rules: [
      "One artwork per student",
      "Theme: Colours of Imagination",
      "Participants must bring their own materials",
      "Artwork must be original and appropriate"
    ],
    coordinators: []
  },
  {
    id: "24",
    title: "Rhythm of One",
    description:
      "A high-energy musical event celebrating rhythm, coordination, and creativity.",
    date: "6th March 2026",
    dateTag: "6 Mar",
    time: "10:00 - 12:30",
    venue: "Department Venues",
    categories: ["Cultural Events", "Music"],
    department: "",
    image: "/ALL POSTERS/RYTHAM OF ONE.jpg",
    registrationOpen: true,
    teamSize: "",
    rules: [
      "Only live instruments allowed",
      "No backing tracks",
      "Time limit: 3–6 minutes",
      "Valid college ID required"
    ],
    coordinators: []
  },
  {
    id: "25",
    title: "Echoes of Soul",
    description:
      "A soulful music event highlighting emotional expression through voice and melody.",
    date: "6th March 2026",
    dateTag: "6 Mar",
    time: "10:00 - 04:00",
    venue: "Auditorium Lobby",
    categories: ["Cultural Events", "Music"],
    department: "",
    image: "/ALL POSTERS/ECHOES OF SOUL.jpg",
    registrationOpen: true,
    teamSize: "",
    rules: [
      "Solo, duet, or group singing allowed",
      "No lip-sync or recorded vocals",
      "Time limit: 3–5 minutes",
      "Song must be appropriate",
      "Valid college ID required"
    ],
    coordinators: []
  },

  {
    id: "26",
    title: "Laugh Tales",
    description:
      "An entertaining event designed to spread joy, humor, and positivity through comedy and storytelling.",
    date: "7th March 2026",
    dateTag: "7 Mar",
    time: "10:00 - 04:30",
    venue: "Department Venues",
    categories: ["Cultural Events", "Stand up Comedy"],
    department: "",
    image: "/ALL POSTERS/LAUGH TALES.jpg",
    registrationOpen: true,
    teamSize: "",
    rules: [
      "Content must be clean and respectful",
      "Vulgar or offensive jokes are prohibited",
      "Performances must stay within the allotted time",
      "Use of props must be pre-approved",
      "Judges’ decision will be final"
    ],
    coordinators: []
  },
  {
    id: "27",
    title: "Idea Pitching",
    description:
      "An innovation-focused event where participants present unique ideas to solve real-world problems.",
    date: "7th March 2026",
    dateTag: "7 Mar",
    time: "10:00 - 04:30",
    venue: "Department Venues",
    categories: ["Spotlight Events"],
    department: "",
    image: "/ALL POSTERS/IDEA PITCHING.jpg",
    registrationOpen: true,
    teamSize: "",
    rules: [],
    coordinators: []
  },
  {
    id: "28",
    title: "Youth Summit",
    description:
      "A thought-provoking event that brings young minds together to discuss social, technological, and national issues.",
    date: "7th March 2026",
    dateTag: "7 Mar",
    time: "10:00 - 04:30",
    venue: "Department Venues",
    categories: ["Spotlight Events"],
    department: "",
    image: "/ALL POSTERS/YOUTH SUMMIT.jpg",
    registrationOpen: true,
    teamSize: "",
    rules: [
      "Participants must respect differing opinions",
      "Topics must align with the summit theme",
      "Time limits must be strictly followed",
      "Inappropriate language or behavior is not allowed",
      "Moderators’ and judges’ decisions are final"
    ],
    coordinators: []
  },
  {
    id: "29",
    title: "Echoes of Sound",
    description:
      "A music-focused event celebrating melody, rhythm, and creative sound performances.",
    date: "7th March 2026",
    dateTag: "7 Mar",
    time: "10:00 - 04:30",
    venue: "Department Venues",
    categories: ["Cultural Events", "Music"],
    department: "",
    image: "/ALL POSTERS/ECHOS OF SOUND.jpg",
    registrationOpen: true,
    teamSize: "",
    rules: [],
    coordinators: []
  },
  {
    id: "30",
    title: "Battle of Beats",
    description:
      "An energetic dance and rhythm competition highlighting coordination, performance, and stage presence.",
    date: "7th March 2026",
    dateTag: "7 Mar",
    time: "10:00 - 04:30",
    venue: "Department Venues",
    categories: ["Cultural Events", "Dance"],
    department: "",
    image: "/ALL POSTERS/BATTLE OF BEATS.jpg",
    registrationOpen: true,
    teamSize: "",
    rules: [],
    coordinators: []
  },
  {
    id: "31",
    title: "Tech Short",
    description:
      "A fast-paced technical speaking event where participants explain a technical concept within a short duration.",
    date: "7th March 2026",
    dateTag: "7 Mar",
    time: "10:00 - 04:30",
    venue: "Department Venues",
    categories: ["Technical Events"],
    department: "",
    image: "/ALL POSTERS/TECH SHORT.jpg",
    registrationOpen: true,
    teamSize: "Individual",
    rules: [
      "Individual participation only",
      "Topic must be technical in nature",
      "Time limit must be strictly followed",
      "Use of notes or mobiles is not allowed",
      "Judges’ decision will be final"
    ],
    coordinators: []
  },
  {
    id: "32",
    title: "Logic Lock",
    description:
      "A brain-teasing technical event that challenges logical and analytical thinking through puzzles.",
    date: "7th March 2026",
    dateTag: "7 Mar",
    time: "10:00 - 04:30",
    venue: "Department Venues",
    categories: ["Technical Events"],
    department: "",
    image: "/ALL POSTERS/LOGIC LOCK.jpg",
    registrationOpen: true,
    teamSize: "Individual",
    rules: [
      "Individual participation only",
      "Puzzles must be solved sequentially",
      "No external help is allowed",
      "Time limit applies for each round",
      "Judges’ decision will be final"
    ],
    coordinators: []
  },
  {
    id: "33",
    title: "Code Crime Scene",
    description:
      "An investigative coding event where participants debug and analyze faulty code.",
    date: "7th March 2026",
    dateTag: "7 Mar",
    time: "10:00 - 05:30",
    venue: "Department Venues",
    categories: ["Technical Events"],
    department: "",
    image: "/ALL POSTERS/CODE CRIME SECENE.jpg",
    registrationOpen: true,
    teamSize: "Individual or 2 per team",
    rules: [
      "Individual or team participation (max 2)",
      "Code must be debugged within the given time",
      "Internet usage may be restricted",
      "Only allowed languages may be used",
      "Judges’ decision will be final"
    ],
    coordinators: []
  },
  {
    id: "34",
    title: "SQL Query Challenge",
    description:
      "A database-focused technical event testing SQL query logic, optimization, and accuracy.",
    date: "7th March 2026",
    dateTag: "7 Mar",
    time: "10:00 - 05:30",
    venue: "Department Venues",
    categories: ["Technical Events"],
    department: "",
    image: "/ALL POSTERS/SQL QUERY CHALLENGE.jpg",
    registrationOpen: true,
    teamSize: "Individual",
    rules: [
      "Individual participation only",
      "Queries must produce correct output",
      "Use of external resources is prohibited",
      "Time limit must be followed",
      "Judges’ decision will be final"
    ],
    coordinators: []
  },
  {
    id: "35",
    title: "Pic Prompt",
    description:
      "A creative technical event where participants build a technical idea inspired by an image prompt.",
    date: "7th March 2026",
    dateTag: "7 Mar",
    time: "10:00 - 04:30",
    venue: "Department Venues",
    categories: ["Technical Events"],
    department: "",
    image: "/ALL POSTERS/PIC PROMPT.jpg",
    registrationOpen: true,
    teamSize: "Individual",
    rules: [
      "Individual participation only",
      "Prompt will be given on the spot",
      "Time limit must be followed",
      "Explanation must be technical",
      "Judges’ decision will be final"
    ],
    coordinators: []
  },
  {
    id: "36",
    title: "Memory Meltdown",
    description:
      "A fun technical event designed to test memory power, concentration, and observation skills.",
    date: "7th March 2026",
    dateTag: "7 Mar",
    time: "10:00 - 04:30",
    venue: "Department Venues",
    categories: ["Technical Events"],
    department: "",
    image: "/ALL POSTERS/MEMORY MELTDOWN.jpg",
    registrationOpen: true,
    teamSize: "Individual",
    rules: [
      "Individual participation only",
      "No writing during observation time",
      "Recall must be done within time limit",
      "No external help allowed",
      "Judges’ decision is final"
    ],
    coordinators: []
  },

  {
    id: "37",
    title: "Tech Dumb Charades",
    description:
      "A technical twist to the classic dumb charades where participants act out technical terms without speaking.",
    date: "7th March 2026",
    dateTag: "7 Mar",
    time: "10:00 - 04:30",
    venue: "Department Venues",
    categories: ["Technical Events"],
    department: "",
    image: "/ALL POSTERS/TECH DUMB SHARADS.jpg",
    registrationOpen: true,
    teamSize: "2–4 members",
    rules: [
      "Team participation (2–4 members)",
      "No speaking or writing allowed",
      "Technical terms only",
      "Time limit per round applies",
      "Judges’ decision is final"
    ],
    coordinators: []
  },
  {
    id: "38",
    title: "UI / UX Design Sprint",
    description:
      "A creative technical event focused on user interface and user experience design.",
    date: "7th March 2026",
    dateTag: "7 Mar",
    time: "10:00 - 04:30",
    venue: "Department Venues",
    categories: ["Technical Events"],
    department: "",
    image: "/ALL POSTERS/UI UX DESIGN SPRINT.jpg",
    registrationOpen: true,
    teamSize: "Individual or 2 members",
    rules: [
      "Individual or team participation (max 2)",
      "Tools must be approved by organizers",
      "Internet usage may be restricted",
      "Design explanation is mandatory",
      "Judges’ decision is final"
    ],
    coordinators: []
  },
  {
    id: "39",
    title: "Cube Solving",
    description:
      "A skill-based event challenging speed, logic, and problem-solving using Rubik’s cubes.",
    date: "7th March 2026",
    dateTag: "7 Mar",
    time: "10:00 - 04:30",
    venue: "Department Venues",
    categories: ["Technical Events"],
    department: "",
    image: "/ALL POSTERS/CUBE SOLVING.jpg",
    registrationOpen: true,
    teamSize: "Individual",
    rules: [
      "Individual participation only",
      "Cube must be solved completely",
      "Time will be recorded accurately",
      "Tampering with cube is not allowed",
      "Judges’ decision is final"
    ],
    coordinators: []
  },
  {
    id: "40",
    title: "Agentix",
    description:
      "A hackathon focused on building intelligent agents and automated systems.",
    date: "7th March 2026",
    dateTag: "7 Mar",
    time: "10:00 - 04:30",
    venue: "Department Venues",
    categories: ["Technical Events", "Hackathons"],
    department: "",
    image: "/ALL POSTERS/AGENTIX.jpg",
    registrationOpen: true,
    teamSize: "2–4 members",
    rules: [
      "Teams must work only during the official hackathon duration",
      "Project must be developed during the event",
      "Internet usage is allowed",
      "Each team must present the solution",
      "Judges’ decision will be final"
    ],
    coordinators: []
  },
  {
    id: "41",
    title: "Webverse",
    description:
      "A hackathon centered on building innovative web-based solutions using modern technologies.",
    date: "7th March 2026",
    dateTag: "7 Mar",
    time: "10:00 - 04:30",
    venue: "Department Venues",
    categories: ["Technical Events", "Hackathons"],
    department: "",
    image: "/ALL POSTERS/WEBVERSE.jpg",
    registrationOpen: true,
    teamSize: "2–4 members",
    rules: [
      "Teams must work only during the official hackathon duration",
      "Project must be developed during the event",
      "Internet usage is allowed",
      "Each team must present the solution",
      "Judges’ decision will be final"
    ],
    coordinators: []
  },
  {
    id: "42",
    title: "Sensecraft",
    description:
      "A hackathon emphasizing smart systems using sensors, data, and intelligent processing.",
    date: "7th March 2026",
    dateTag: "7 Mar",
    time: "10:00 - 04:30",
    venue: "Department Venues",
    categories: ["Technical Events", "Hackathons"],
    department: "",
    image: "/ALL POSTERS/SENSECRAFT.jpg",
    registrationOpen: true,
    teamSize: "2–4 members",
    rules: [
      "Solution must involve sensors, data, or smart systems",
      "Simulation or prototype models are acceptable",
      "Idea should solve a real-world problem",
      "Teams must explain the working clearly"
    ],
    coordinators: []
  },
  {
    id: "43",
    title: "Designathon",
    description:
      "A creativity-driven event focused on mechanical engineering design and innovation.",
    date: "7th March 2026",
    dateTag: "7 Mar",
    time: "10:00 - 04:30",
    venue: "Department Venues",
    categories: ["Technical Events", "Hackathons"],
    department: "MECH",
    image: "/ALL POSTERS/DESIGNATHON.jpg",
    registrationOpen: true,
    teamSize: "2–4 members",
    rules: [
      "Designs must be original and created during the event",
      "Solution should address the given problem statement",
      "Teams must submit and explain the design clearly",
      "Time limits must be strictly followed"
    ],
    coordinators: []
  },
  {
    id: "44",
    title: "Techorbit",
    description:
      "A project expo showcasing innovative technology-based projects and prototypes.",
    date: "7th March 2026",
    dateTag: "7 Mar",
    time: "10:00 - 04:30",
    venue: "Department Venues",
    categories: ["Technical Events", "Project Expo"],
    department: "",
    image: "/ALL POSTERS/TECHORBIT.jpg",
    registrationOpen: true,
    teamSize: "2–4 members",
    rules: [
      "Projects must be original and student-developed",
      "Teams must explain the project clearly",
      "Working models or demos are preferred",
      "Judges’ decision will be final"
    ],
    coordinators: []
  },
  {
    id: "45",
    title: "SignalSphere",
    description:
      "A project expo focusing on electronics, communication, and signal processing systems.",
    date: "7th March 2026",
    dateTag: "7 Mar",
    time: "10:00 - 04:30",
    venue: "Department Venues",
    categories: ["Technical Events", "Project Expo"],
    department: "",
    image: "/ALL POSTERS/SIGNAL SPHERE.jpg",
    registrationOpen: true,
    teamSize: "2–4 members",
    rules: [
      "Projects must relate to electronics or communication",
      "Teams must explain the project clearly",
      "Working models or demos are preferred",
      "Judges’ decision will be final"
    ],
    coordinators: []
  },
  {
    id: "46",
    title: "Energex",
    description:
      "A project expo centered on electrical systems and energy-based solutions.",
    date: "7th March 2026",
    dateTag: "7 Mar",
    time: "10:00 - 04:30",
    venue: "Department Venues",
    categories: ["Technical Events", "Project Expo"],
    department: "EEE",
    image: "/ALL POSTERS/ENERGEX.jpg",
    registrationOpen: true,
    teamSize: "2–4 members",
    rules: [
      "Projects must focus on electrical or energy systems",
      "Teams must explain the project clearly",
      "Working models or demos are preferred",
      "Judges’ decision will be final"
    ],
    coordinators: []
  },
  {
    id: "47",
    title: "Infrasys",
    description:
      "A project expo focused on civil engineering and infrastructure systems.",
    date: "7th March 2026",
    dateTag: "7 Mar",
    time: "10:00 - 04:30",
    venue: "Department Venues",
    categories: ["Technical Events", "Project Expo"],
    department: "CIVIL",
    image: "/ALL POSTERS/INFRASYS.jpg",
    registrationOpen: true,
    teamSize: "2–4 members",
    rules: [
      "Projects must relate to civil or infrastructure systems",
      "Teams must explain the project clearly",
      "Working models or demos are preferred",
      "Judges’ decision will be final"
    ],
    coordinators: []
  },






  {
    id: "48",
    title: "Cricket Men",
    description: "",
    date: "From: 16th Feb To: 25th Feb",
    dateTag: "7 Mar",
    time: "10:00 - 6:00",
    venue: "SV grounds",
    categories: ["Sports"],
    department: "",
    image: "/event-images/sample.png",
    registrationOpen: true,
    teamSize: "11 members + 4 substitutes",
    rules: [
      " Knock-out tournament",
      " A team consists of maximum 15 players(11+4).",
      " A match consists of 10 overs (flexible) played with White ball.",
      " ICC rules and regulations will be followed.",
      " All players must wear colour jersey."
    ],
    coordinators: []
  },
  {
    id: "49",
    title: "Kabaddi Men",
    description: "",
    date: "From: 24th Feb To: 27th Feb",
    dateTag: "7 Mar",
    time: "10:00 - 6:00",
    venue: "SV grounds",
    categories: ["Sports"],
    department: "",
    image: "/event-images/sample.png",
    registrationOpen: true,
    teamSize: "10 members",
    rules: [
      "League-cum-knock-out.",
      "Men - Max: 10 players (7 on-field, 3 substitutes), Min: 7 players.",
      "A match consists of two halves of 20 minutes each with a 5-minute break .",
      "Pro Kabaddi League rules will be followed.",
    ],
    coordinators: []
  },
  {
    id: "50",
    title: "Volleyball Men",
    description: "",
    date: "From: 24th Feb To: 27th Feb",
    dateTag: "7 Mar",
    time: "10:00 - 6:00",
    venue: "SV grounds",
    categories: ["Sports"],
    department: "",
    image: "/event-images/sample.png",
    registrationOpen: true,
    teamSize: " 12 members",
    rules: [
      "Knock-out tournament",
      "A match consists of 3 sets of 25 points.",
      "The deciding set will be 15 points.",
      "All matches will follow Rally Point System with Rotation basis.",
      "VFI rules will be followed.."
    ],
    coordinators: []
  },
  {
    id: "51",
    title: "Chess Men",
    description: "",
    date: "From: 24th Feb To: 27th Feb",
    dateTag: "7 Mar",
    time: "10:00 - 6:00",
    venue: "SV grounds",
    categories: ["Sports"],
    department: "",
    image: "/event-images/sample.png",
    registrationOpen: true,
    teamSize: "Individual",
    rules: [
      " League-cum-knock-out.",
      " Single player matches are conducted.",
      " Player will have a 10-minute time control with a 5-second increment per move.",
      " Use of electronic devices during the game is strictly prohibited.",
      " FIDE (World Chess Federation) rules will be followed."
    ],
    coordinators: []
  },
  {
    id: "52",
    title: "Carroms Men",
    description: "",
    date: "From: 24th Feb To: 27th Feb",
    dateTag: "7 Mar",
    time: "10:00 - 6:00",
    venue: "SV grounds",
    categories: ["Sports"],
    department: "",
    image: "/event-images/sample.png",
    registrationOpen: true,
    teamSize: "",
    rules: [
      " League-cum-knock-out.",
      " A match consists of 3 sets, with each set being a race to 25 points.",
       " The deciding set will be played up to 15 points.",
      " The rally point system will be applied with rotation after each game.",
      " Official Carrom Federation of India (CFI) rules will be followed."
    ],
    coordinators: []
  },
  {
    id: "53",
    title: "Table Tennis Men",
    description: "",
    date: "From: 16th Feb To: 25th Feb",
    dateTag: "7 Mar",
    time: "10:00 - 6:00",
    venue: "SV grounds",
    categories: ["Sports"],
    department: "",
    image: "/event-images/sample.png",
    registrationOpen: true,
    teamSize: "Individual",
    rules: [
     "Matches will be played in Singles format (Best of 5 games).",
     "Each game is played up to 11 points, with a 2-point lead required to win.",
     "Service alternates every 2 points, and the ball must bounce on both sides",
     "The Rally Point Scoring System will be followed.",
     "ITTF rules and standard table tennis equipment (40mm ball) apply."
    ],
    coordinators: []
  },
  {
    id: "54",
    title: "Throwball Women",
    description: "",
    date: "From: 24th Feb To: 27th Feb",
    dateTag: "7 Mar",
    time: "10:00 - 6:00",
    venue: "SV grounds",
    categories: ["Sports"],
    department: "",
    image: "/event-images/sample.png",
    registrationOpen: true,
    teamSize: "9 on court + 3 substitutes",
    rules: [
         "1. Knock-out tournament",
         "2. A match consists of 3 sets of 25 points.",
         "3. The deciding set will be 15 points.",
         "4. All matches will follow Rally Point System with Rotation basis.",
         "5. VFI rules will be followed."
    ],
    coordinators: []
  },
  {
    id: "55",
    title: "Tennikoit(Women)",
    description: "",
    date: "From: 24th Feb To: 27th Feb",
    dateTag: "7 Mar",
    time: "10:00 - 6:00",
    venue: "SV grounds",
    categories: ["Sports"],
    department: "",
    image: "/event-images/sample.png",
    registrationOpen: true,
    teamSize: " Individual ",
    rules: [
      "Matches will be played in Singles format (1 vs 1) on a standard Tennikoit court.",
      "The serve must be underhand, and the ring must cross the net cleanly.",
      "A fault is declared for out-of-bounds throws, failure to cross the net, or double touch.",
      "Matches are Best of 3 sets, each set up to 21 points (win by 2).",
      "The umpire’s decision is final; misbehavior may lead to disqualification."
    ],
    coordinators: []
  },
  {
    id: "56",
    title: "Kabaddi Women",
    description: "",
    date: "From: 24th Feb To: 27th Feb",
    dateTag: "7 Mar",
    time: "10:00 - 6:00",
    venue: "SV grounds",
    categories: ["Sports"],
    department: "",
    image: "/event-images/sample.png",
    registrationOpen: true,
    teamSize: "10 members",
    rules: [
         " League-cum-knock-out.",
         " Women - Max: 10 players (7 on-field, 3 substitutes), Min: 7 players.",
         " A match consists of two halves of 15 minutes each with a 5-minute break.",
         "Pro Kabaddi League rules will be followed."
    ],
    coordinators: []
  },
  {
    id: "57",
    title: "Volleyball Women",
    description: "",
    date: "From: 24th Feb To: 27th Feb",
    dateTag: "7 Mar",
    time: "10:00 - 6:00",
    venue: "SV grounds",
    categories: ["Sports"],
    department: "",
    image: "/event-images/sample.png",
    registrationOpen: true,
    teamSize: "12 members",
    rules: [
      "1. Knock-out tournament",
     "2. A match consists of 3 sets of 25 points.",
     "3. The deciding set will be 15 points.",
     "4. All matches will follow Rally Point System with Rotation basis.",
     "5. VFI rules will be followed.."
    ],
    coordinators: []
  },
  {
    id: "58",
    title: "Chess Women",
    description: "",
    date: "",
    dateTag: "7 Mar",
    time: "",
    venue: "",
    categories: ["Sports"],
    department: "",
    image: "/event-images/sample.png",
    registrationOpen: true,
    teamSize: "Individual",
    rules: [
      "15 minutes per player.",
      "FIDE rules apply.",
      "No mobile use allowed."
    ],
    coordinators: []
  },
  {
    id: "59",
    title: "Carroms Women",
    description: "",
    date: "From: 24th Feb To: 27th Feb",
    dateTag: "7 Mar",
    time: "10:00 - 6:00",
    venue: "SV grounds",
    categories: ["Sports"],
    department: "",
    image: "/event-images/sample.png",
    registrationOpen: true,
    teamSize: "Individual",
    rules: [
     "1. League-cum-knock-out.",
     "2. Single player matches are conducted.",
     "3. Player will have a 10-minute time control with a 5-second increment per move.",
     "4. Use of electronic devices during the game is strictly prohibited.",
     "5. FIDE (World Chess Federation) rules will be followed."
    ],
    coordinators: []
  },
  {
    id: "60",
    title: "Table tennis Women",
    description: "",
    date: "From: 24th Feb To: 27th Feb",
    dateTag: "7 Mar",
    time: "10:00 - 6:00",
    venue: "SV grounds",
    categories: ["Sports"],
    department: "",
    image: "/event-images/sample.png",
    registrationOpen: true,
    teamSize: "Individual",
    rules: [
      "Matches will be played in Singles format (Best of 5 games).",
     "Each game is played up to 11 points, with a 2-point lead required to win.",
     "Service alternates every 2 points, and the ball must bounce on both sides",
     "The Rally Point Scoring System will be followed.",
     "ITTF rules and standard table tennis equipment (40mm ball) apply."
    ],
    coordinators: []
  }
];





