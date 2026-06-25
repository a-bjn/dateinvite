export interface Place {
  id: string;
  name: string;
  tagline: string;
  cuisine: string;
  vibe: string;
  description: string;
  image: string;
  accent: string;
  cuisines?: string[];
  mealTypes?: string[];
  specialDiets?: string[];
  priceRange?: string;
}

export const PLACES: Place[] = [
  {
    id: "basilisco",
    name: "Basilisco",
    tagline: "Terasă sub viță",
    cuisine: "Italian · European",
    vibe: "Romantic",
    description:
      "O terasă frumoasă cu scaune din răchită, flori atârnate și lumina caldă de la apus — perfectă pentru o cină lungă, fără grabă.",
    image: "/places/basilisco.png",
    accent: "#8a5a38",
    mealTypes: ["Mic dejun", "Prânz", "Cină", "Brunch", "Târziu noaptea", "Băuturi"],
    specialDiets: ["Vegetarian"],
    cuisines: ["Italian", "European"],
  },
  {
    id: "urban-house",
    name: "Urban House",
    tagline: "Neon și seri la grătar",
    cuisine: "Grill · Românesc",
    vibe: "Viu",
    description:
      "Vibe industrial-chic, luminițe, fripturi de pe grătar și energie de pub — genul de loc unde cina se transformă într-o seară întreagă.",
    image: "/places/urban-house.png",
    accent: "#6b3a28",
    cuisines: [
      "Steakhouse",
      "Bar",
      "Pizza",
      "Internațional",
      "Grătar",
      "European",
      "Grill",
      "Pub",
      "Românesc",
    ],
    mealTypes: ["Prânz", "Cină"],
    priceRange: "$$ – $$$",
  },
  {
    id: "pardon-cafe",
    name: "Pardon Cafe",
    tagline: "Luminițe și nopți târzii",
    cuisine: "European · Românesc",
    vibe: "Cald",
    description:
      "Un loc cald, cu luminițe, ferestre pline de stickere și energie de cafenea — perfect pentru o seară relaxată împreună.",
    image: "/places/pardon-cafe.png",
    accent: "#9a7030",
    cuisines: ["European", "Românesc"],
    mealTypes: ["Prânz", "Cină", "Băuturi"],
    priceRange: "$$ – $$$",
  },
  {
    id: "parcul-carol",
    name: "Parcul Carol",
    tagline: "O plimbare pe lac",
    cuisine: "Parc · București",
    vibe: "Liniștit",
    description:
      "Plimbă-te pe podul de peste lac, printre garduri verzi și copaci bătrâni — unul dintre cele mai frumoase parcuri din București, mai ales la apus.",
    image: "/places/parcul-carol.png",
    accent: "#4a7a50",
  },
  {
    id: "parcul-drumul-taberei",
    name: "Parcul Drumul Taberei",
    tagline: "Lac, fântână și cer deschis",
    cuisine: "Parc · București",
    vibe: "Liniștit",
    description:
      "O oază verde în mijlocul orașului — plimbare pe lac, fântâna arteziană și podul, pe măsură ce soarele apune.",
    image: "/places/parcul-drumul-taberei.png",
    accent: "#3d6b48",
  },
];

export const TIME_SLOTS = [
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
];
