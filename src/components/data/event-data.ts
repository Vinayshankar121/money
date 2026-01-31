
export interface Event {
  id: string;
  name: string;
  code: string;
  category: "Technical" | "Cultural" | "Sports" | "Fun Events";
  date: string;
  entryFee: string;
  poster: string;
  rules: string[];
  type: "Individual" | "Team" | "Team Men" | "Singles Men" | "Singles Women" | "Team Women" | "Individual / Team" | "Single/Doubles Men" | "Single/Doubles Women" | "Individual/ Duo / Team ";
}
  


const events: Event[] = [
  {
    id: "1",
    name: "PPT Presentation (CSE)",
    code: "TECH001",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
    rules: [
      "Team size: 2–4 members.",
      "Choose 1 topic.",
      "Presentation duration: 8–10 minutes.",
      "Slides must be original (no plagiarism).",
      "Q&A session mandatory.",
      "Stick strictly to your selected topic."
    ],
    type: "Team"
  },
  {
    id: "2",
    name: "Poster Presentation (CSE)",
    code: "TECH002",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
    rules: [
      "Maximum team size: 2 members.",
      "Poster size must be A2 or A3.",
      "Poster should be clear, neat, and well-presented.",
      "Hand-made or digital posters are allowed.",
      "Poster must be based on a relevant CSE domain.",
      "Explanation time: 4–5 minutes per team."
    ],
    type: "Team"
  },
  {
    id: "3",
    name: "Coding Contest (CSE)",
    code: "TECH003",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
    rules: [
      "Maximum team size: 2 members.",
      "Solve programming problems within the given time.",
      "Ranking is based on the number of problems solved.",
      "In case of ties, the least time taken will decide the winner.",
      "Competition consists of multiple rounds."
    ],
    type: "Team"
  },
  {
    id: "4",
    name: "PPT Presentation (CSC)",
    code: "TECH004",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1522199710521-72d69614c702?w=800",
    rules: [
      "Team size: 2–4 members.",
      "Choose any one topic.",
      "Presentation time: 8–10 minutes.",
      "Slides must be original and plagiarism-free.",
      "Q&A session will follow the presentation."
    ],
    type: "Team"
  },
  {
    id: "5",
    name: "Poster Presentation (CSC)",
    code: "TECH005",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800",
    rules: [
      "Maximum team size: 2 members.",
      "Poster must be A2 or A3 size.",
      "Content should be clear and neatly presented.",
      "Explanation time: 2–3 minutes per team."
    ],
    type: "Team"
  },
  {
    id: "6",
    name: "CTF Competition (CSC)",
    code: "TECH006",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800",
    rules: [
      "Maximum team size: 2 members.",
      "Solve cybersecurity challenges to earn points.",
      "Highest total score wins.",
      "No attacking event infrastructure or other teams.",
      "Follow all competition and ethical guidelines."
    ],
    type: "Team"
  },
  {
    id: "7",
    name: "PPT Presentation (EEE)",
    code: "TECH007",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1522199710521-72d69614c702?w=800",
    rules: [
      "Team size: 2–4 members.",
      "Choose any relevant EEE topic.",
      "Presentation time: 8–10 minutes.",
      "Slides must be original and free of plagiarism.",
      "Q&A session will follow the presentation."
    ],
    type: "Team"
  },
  {
    id: "8",
    name: "Poster Presentation (EEE)",
    code: "TECH008",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800",
    rules: [
      "Maximum team size: 2 members.",
      "Poster must be A2 or A3 size.",
      "Poster content should be neat, clear, and well-presented.",
      "Explanation time: 2–3 minutes per team."
    ],
    type: "Team"
  },
  {
    id: "9",
    name: "Project Expo (EEE)",
    code: "TECH009",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1581091012184-7c140f7f9b50?w=800",
    rules: [
      "Team size: 2–4 members.",
      "Projects must include a working model or demonstration.",
      "Explanation time: 5–7 minutes per team.",
      "Ensure the project setup is safe for display.",
      "Judging will be based on innovation, clarity, and execution."
    ],
    type: "Team"
  },
  {
    id: "10",
    name: "PPT Presentation (IT)",
    code: "TECH010",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1522199710521-72d69614c702?w=800",
    rules: [
      "Team size: 2–4 members.",
      "Choose any one topic.",
      "Presentation duration: 8–10 minutes.",
      "Slides must be original and free from plagiarism.",
      "Q&A session may follow the presentation."
    ],
    type: "Team"
  },
  {
    id: "11",
    name: "Poster Presentation (IT)",
    code: "TECH011",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800",
    rules: [
      "Maximum team size: 2 members.",
      "Poster must be A2 or A3 size.",
      "Content must be clear, neat, and well-structured.",
      "Handmade or digital posters are allowed."
    ],
    type: "Team"
  },
  {
    id: "12",
    name: "Reverse Coding (IT)",
    code: "TECH012",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
    rules: [
      "Maximum team size: 2 members.",
      "Decode the given output or logic.",
      "Write the correct program based on the behavior.",
      "Strictly no plagiarism or code copying."
    ],
    type: "Team"
  },

  {
    id: "13",
    name: "PPT Presentation (CSM)",
    code: "TECH013",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1522199710521-72d69614c702?w=800",
    rules: [
      "Team size: 2–4 members.",
      "Choose any one topic related to CSM.",
      "Presentation duration: 8–10 minutes.",
      "Slides must be original and well-structured.",
      "Q&A session will follow the presentation."
    ],
    type: "Team"
  },
  {
    id: "14",
    name: "Poster Presentation (CSM)",
    code: "TECH014",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800",
    rules: [
      "Maximum team size: 2 members.",
      "Poster must be A2 or A3 size.",
      "Content should be clear and neatly presented.",
      "Explanation time: 2–3 minutes per team."
    ],
    type: "Team"
  },
  {
    id: "15",
    name: "Coding Quiz (AI/ML) – CSM",
    code: "TECH015",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=800",
    rules: [
      "Maximum team size: 2 members.",
      "Quiz format will be MCQs based on AI & ML.",
      "Fastest and most accurate team wins.",
      "No external help or devices allowed."
    ],
    type: "Team"
  },
  {
    id: "16",
    name: "PPT Presentation (CSD)",
    code: "TECH016",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
    rules: [
      "Team size: 2–4 members.",
      "Choose any topic related to CSD.",
      "Presentation duration: 8–10 minutes.",
      "Slides must be original and clearly presented.",
      "Q&A session will follow the presentation."
    ],
    type: "Team"
  },
  {
    id: "17",
    name: "Poster Presentation (CSD)",
    code: "TECH017",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    rules: [
      "Maximum team size: 2 members.",
      "Poster must be A2 or A3 size.",
      "Content should be neat and well-structured.",
      "Explanation time: 2–3 minutes."
    ],
    type: "Team"
  },
  {
    id: "18",
    name: "Coding Autometa (CSD)",
    code: "TECH018",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    rules: [
      "Maximum team size: 2 members.",
      "MCQ-based coding logic quiz.",
      "Highest score in the least time wins.",
      "No external help or plagiarism allowed."
    ],
    type: "Team"
  },

  {
    id: "19",
    name: "PPT Presentation (ECE)",
    code: "TECH019",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1581091870627-3c097df7b1fb?w=800",
    rules: [
      "Maximum team size: 2 members.",
      "Presentation time: 8 minutes followed by Q&A.",
      "Participants must submit an abstract before the event.",
      "Bring the PPT on a pen drive for presentation.",
      "Slides must be original and well-structured."
    ],
    type: "Team"
  },
  {
    id: "20",
    name: "Poster Presentation (ECE)",
    code: "TECH020",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1509223197845-458d87318791?w=800",
    rules: [
      "Maximum team size: 2 members.",
      "Poster must follow IEEE format.",
      "Size allowed: A2 or A3.",
      "Explanation time: 5 minutes per team.",
      "Content should be clear, technical, and neatly presented."
    ],
    type: "Team"
  },
  {
    id: "21",
    name: "Project Expo (ECE)",
    code: "TECH021",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1581092808364-3a86f2a5ba52?w=800",
    rules: [
      "Maximum team size: 4 members.",
      "Project must include a working model or live demonstration.",
      "A PPT explaining the project is mandatory.",
      "Components used must be safe and well-insulated.",
      "Evaluation is based on innovation, clarity, and execution."
    ],
    type: "Team"
  },
  {
    id: "22",
    name: "PPT Presentation (Civil)",
    code: "TECH022",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1590490359683-826fe7f2d0f3?w=800",
    rules: [
      "Maximum team size: 2 members.",
      "Presentation time: 8 minutes followed by Q&A.",
      "Submit abstract prior to the event.",
      "Slides must be original and well-organized."
    ],
    type: "Team"
  },
  {
    id: "23",
    name: "Poster Presentation (Civil)",
    code: "TECH023",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1453873531674-2151bcd01707?w=800",
    rules: [
      "Maximum team size: 2 members.",
      "Poster must follow IEEE format.",
      "Size allowed: A2 or A3.",
      "Explanation time: 5 minutes per team.",
      "Content must be neat and clear."
    ],
    type: "Team"
  },
  {
    id: "24",
    name: "Project Expo (Civil)",
    code: "TECH024",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800",
    rules: [
      "Maximum team size: 4 members.",
      "Project must include a working model.",
      "PPT describing the project is mandatory.",
      "Judging based on innovation and clarity."
    ],
    type: "Team"
  },
  {
    id: "25",
    name: "PPT Presentation (Mech)",
    code: "TECH025",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1508898578281-774ac4893c0c?w=800",
    rules: [
      "Maximum team size: 2 members.",
      "Presentation time: 8 minutes + Q&A.",
      "Abstract submission is mandatory.",
      "Slides must be original and technical."
    ],
    type: "Team"
  },
  {
    id: "26",
    name: "Poster Presentation (Mech)",
    code: "TECH026",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1503676382389-4809596d5290?w=800",
    rules: [
      "Maximum team size: 2 members.",
      "Poster must follow IEEE guidelines.",
      "Content must be clear and neatly presented.",
      "Technical accuracy is required."
    ],
    type: "Team"
  },
  {
    id: "27",
    name: "Project Expo (Mech)",
    code: "TECH027",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1581092333181-2983a46d8a1b?w=800",
    rules: [
      "Maximum team size: 4 members.",
      "Project must include a working physical model.",
      "PPT describing the project is required.",
      "Safety measures must be ensured."
    ],
    type: "Team"
  },
  {
    id: "28",
    name: "Designathon (Mech)",
    code: "TECH028",
    category: "Technical",
    date: "",
    entryFee: "",
    poster: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    rules: [
      "Team size: 1–3 members.",
      "On-spot design challenge will be given.",
      "Work must be original and self-created.",
      "Judges' decision will be final."
    ],
    type: "Team"
  },
  {
    id: "29",
    name: "Battle of Beats",
    code: "CUL029",
    category: "Cultural",
    date: "",
    entryFee: "350",
    poster: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=800",
    rules: [
      "Open to all college students with valid college ID.",
      "Group size: 5–12 members.",
      "Performance time: 4–5 mins.",
      "Music must be submitted in advance.",
      "Props allowed only with prior approval; must be safe."
    ],
    type: "Team"
  },
  {
    id: "30",
    name: "Rhythm of One",
    code: "CUL030",
    category: "Cultural",
    date: "",
    entryFee: "150",
    poster: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
    rules: [
      "Solo dance; one entry per participant.",
      "Valid college ID required during registration.",
      "Performance time: 2–3 mins.",
      "Music must be submitted in advance.",
      "Props allowed only with prior approval."
    ],
    type: "Individual"
  },
  {
    id: "31",
    name: "Art Gallery",
    code: "CUL031",
    category: "Cultural",
    date: "",
    entryFee: "100",
    poster: "https://images.unsplash.com/photo-1500336624523-d727130c3328?w=800",
    rules: [
      "One artwork per student.",
      "Theme: Colours of Imagination.",
      "Student must bring their own materials.",
      "Artwork must be original and appropriate."
    ],
    type: "Individual"
  },
  {
    id: "32",
    name: "Echoes of Soul",
    code: "CUL032",
    category: "Cultural",
    date: "",
    entryFee: "150",
    poster: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
    rules: [
      "Solo, duet, or group singing allowed.",
      "No lip-sync or recorded vocals.",
      "Time limit: 3–5 mins.",
      "Song must be appropriate.",
      "Valid college ID required."
    ],
    type: "Individual / Team"
  },
  {
    id: "33",
    name: "Echoes of Sound",
    code: "CUL033",
    category: "Cultural",
    date: "",
    entryFee: "150",
    poster: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800",
    rules: [
      "Only live instruments; no backing tracks.",
      "One entry per participant/band.",
      "Time limit: 3–6 mins.",
      "Valid college ID required."
    ],
    type: "Team"
  },
  {
    id: "34",
    name: "Laugh Tales",
    code: "CUL034",
    category: "Cultural",
    date: "",
    entryFee: "150",
    poster: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800",
    rules: [
      "Solo comedy performance only.",
      "Time limit: 3–5 mins.",
      "Languages: English, Hindi, or Telugu.",
      "Content must be clean and original."
    ],
    type: "Individual"
  },
  {
    id: "35",
    name: "Cricket Men",
    code: "SPT035",
    category: "Sports",
    date: "",
    entryFee: "3000",
    poster: "/events-posters/SPT035.png",
    rules: [
      "11 players + 4 subs.",
      "10 overs per side; 2 overs max per bowler.",
      "Free hit for no-ball; tie → Super Over.",
      "White leather ball.",
      "Umpire decision final.",
      "Overs may change for semis & finals."
    ],
    type: "Team Men"
  },
  {
    id: "36",
    name: "Kabaddi Men",
    code: "SPT036",
    category: "Sports",
    date: "",
    entryFee: "2000",
    poster: "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=800",
    rules: [
      "7 on court + 5 subs.",
      "2 halves of 20 mins; 5-min break.",
      "Continuous chant; 30 sec per raid.",
      "All-out = bonus points.",
      "Revive 1 player per point.",
      "Referee decision final."
    ],
    type: "Team Men"
  },
  {
    id: "37",
    name: "Volleyball Men",
    code: "SPT037",
    category: "Sports",
    date: "",
    entryFee: "2000",
    poster: "https://images.unsplash.com/photo-1519500528352-2d1460418d2e?w=800",
    rules: [
      "6 on court + 6 subs.",
      "Best of 3 sets to 25 points.",
      "Max 3 touches; no net touch.",
      "Referee decision final."
    ],
    type: "Team Men"
  },
  {
    id: "38",
    name: "Chess Men",
    code: "SPT038",
    category: "Sports",
    date: "",
    entryFee: "200",
    poster: "https://images.unsplash.com/photo-1529694157871-3e1b79d8d5a0?w=800",
    rules: [
      "Swiss/Knockout format.",
      "15 mins per player.",
      "FIDE rules apply.",
      "Silence required.",
      "Mobile use = disqualification."
    ],
    type: "Singles Men"
  },
  {
    id: "39",
    name: "Carroms Men",
    code: "SPT039",
    category: "Sports",
    date: "",
    entryFee: "200",
    poster: "https://images.unsplash.com/photo-1600699260179-5a4d0adf8dfe?w=800",
    rules: [
      "Singles; best of 3 boards.",
      "Queen must be covered.",
      "1st to 25 pts or 2 boards wins.",
      "Standard fouls apply."
    ],
    type: "Singles Men"
  },
  {
    id: "40",
    name: "Table Tennis Men",
    code: "SPT040",
    category: "Sports",
    date: "",
    entryFee: "300",
    poster: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800",
    rules: [
      "Singles; best of 3 or 5 games.",
      "11 pts per game; win by 2.",
      "Rally scoring.",
      "ITTF rules apply."
    ],
    type: "Team Men"
  },
  {
    id: "41",
    name: "Handball Men",
    code: "SPT041",
    category: "Sports",
    date: "",
    entryFee: "1000",
    poster: "https://images.unsplash.com/photo-1581767934313-8bfa5d6e6c67?w=800",
    rules: [
      "6 + GK + 5 subs.",
      "2×20 mins; 5-min break.",
      "3 steps / 3 sec rule.",
      "Major fouls → 7m throw.",
      "Card penalties for rough play."
    ],
    type: "Team Men"
  },
  {
    id: "42",
    name: "Throwball Women",
    code: "SPT042",
    category: "Sports",
    date: "",
    entryFee: "1500",
    poster: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    rules: [
      "9 on court + 3 subs.",
      "Best of 3 sets to 25.",
      "Clean catch & throw within 3 sec.",
      "No holding/double touch."
    ],
    type: "Team Women"
  },
  {
    id: "43",
    name: "Kabaddi Women",
    code: "SPT043",
    category: "Sports",
    date: "",
    entryFee: "1500",
    poster: "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=800",
    rules: [
      "7 on court + 5 subs.",
      "2 halves of 20 mins.",
      "Continuous chant, 30 sec raid.",
      "All-out bonus applies.",
      "Referee decision final."
    ],
    type: "Team Women"
  },
  {
    id: "44",
    name: "Volleyball Women",
    code: "SPT044",
    category: "Sports",
    date: "",
    entryFee: "1500",
    poster: "https://images.unsplash.com/photo-1519500528352-2d1460418d2e?w=800",
    rules: [
      "6 on court + 6 subs.",
      "Best of 3 sets.",
      "No net touch or crossing line."
    ],
    type: "Team Women"
  },
  {
    id: "45",
    name: "Chess Women",
    code: "SPT045",
    category: "Sports",
    date: "",
    entryFee: "200",
    poster: "https://images.unsplash.com/photo-1529694157871-3e1b79d8d5a0?w=800",
    rules: [
      "15 mins per player.",
      "FIDE rules apply.",
      "No mobile use allowed."
    ],
    type: "Singles Women"
  },
  {
    id: "46",
    name: "Carroms Women",
    code: "SPT046",
    category: "Sports",
    date: "",
    entryFee: "200",
    poster: "https://images.unsplash.com/photo-1600699260179-5a4d0adf8dfe?w=800",
    rules: [
      "Singles, best of 3 boards.",
      "Queen must be covered.",
      "Standard fouls apply."
    ],
    type: "Singles Women"
  },
  {
    id: "47",
    name: "Tennikoit Women",
    code: "SPT047",
    category: "Sports",
    date: "",
    entryFee: "200",
    poster: "https://images.unsplash.com/photo-1531928351158-2f736078e0c5?w=800",
    rules: [
      "Singles; best of 3 sets to 21.",
      "Underhand serve only.",
      "Fault if ring outside/net touch."
    ],
    type: "Singles Women"
  }




];

export { events };
