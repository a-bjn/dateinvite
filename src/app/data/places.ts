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
    tagline: "Terrace under the vines",
    cuisine: "Italian · European",
    vibe: "Romantic",
    description:
      "A beautiful outdoor terrace with wicker chairs, hanging flowers, and that golden-hour glow — perfect for a long, unhurried dinner.",
    image: "/places/basilisco.png",
    accent: "#8a5a38",
    mealTypes: ["Breakfast", "Lunch", "Dinner", "Brunch", "Late Night", "Drinks"],
    specialDiets: ["Vegetarian friendly"],
    cuisines: ["Italian", "European"],
  },
  {
    id: "urban-house",
    name: "Urban House",
    tagline: "Neon lights & grill nights",
    cuisine: "Grill · Romanian",
    vibe: "Lively",
    description:
      "Industrial-chic vibes, string lights, steaks off the grill, and pub energy — the kind of place where dinner turns into a whole night out.",
    image: "/places/urban-house.png",
    accent: "#6b3a28",
    cuisines: [
      "Steakhouse",
      "Bar",
      "Pizza",
      "International",
      "Barbecue",
      "European",
      "Grill",
      "Pub",
      "Romanian",
    ],
    mealTypes: ["Lunch", "Dinner"],
    priceRange: "$$ – $$$",
  },
  {
    id: "pardon-cafe",
    name: "Pardon Cafe",
    tagline: "Fairy lights & late nights",
    cuisine: "European · Romanian",
    vibe: "Cozy",
    description:
      "A warm, glowing spot with string lights, sticker-covered windows, and that easygoing cafe energy — perfect for a relaxed evening together.",
    image: "/places/pardon-cafe.png",
    accent: "#9a7030",
    cuisines: ["European", "Romanian"],
    mealTypes: ["Lunch", "Dinner", "Drinks"],
    priceRange: "$$ – $$$",
  },
  {
    id: "parcul-carol",
    name: "Parcul Carol",
    tagline: "A walk by the lake",
    cuisine: "Park · Bucharest",
    vibe: "Peaceful",
    description:
      "Stroll across the bridge over the lake, through green hedges and old trees — one of Bucharest's most beautiful parks, especially at golden hour.",
    image: "/places/parcul-carol.png",
    accent: "#4a7a50",
  },
  {
    id: "parcul-drumul-taberei",
    name: "Parcul Drumul Taberei",
    tagline: "Lake, fountain & open sky",
    cuisine: "Park · Bucharest",
    vibe: "Peaceful",
    description:
      "A wide green escape in the middle of the city — walk by the lake, watch the fountain, and take the bridge as the sun goes down.",
    image: "/places/parcul-drumul-taberei.png",
    accent: "#3d6b48",
  },
  {
    id: "surprise-me",
    name: "Surprise me ✨",
    tagline: "Trust the plan",
    cuisine: "Your pick",
    vibe: "Adventure",
    description: "Leave it to me — I'll pick somewhere I think you'll absolutely love.",
    image: "/places/surprise-me.jpg",
    accent: "#e8a870",
  },
];

export const TIME_SLOTS = [
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
];
