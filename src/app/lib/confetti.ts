import { gsap } from "gsap";

const CONFETTI_COLORS = [
  "#ec4899",
  "#f472b6",
  "#fb7185",
  "#fda4af",
  "#fbbf24",
  "#db2777",
  "#be185d",
  "#f43f5e",
  "#e11d48",
  "#ef4444",
  "#dc2626",
  "#f87171",
  "#d4896a",
  "#e8a870",
  "#c07840",
];

interface ConfettiOptions {
  originX?: number;
  originY?: number;
  count?: number;
}

export function launchLetterConfetti({
  originX,
  originY,
  count = 120,
}: ConfettiOptions = {}) {
  const x = originX ?? window.innerWidth / 2;
  const y = originY ?? window.innerHeight * 0.4;

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement("div");
    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    const size = Math.random() * 12 + 8;
    const isCircle = Math.random() > 0.5;

    confetti.style.position = "fixed";
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.backgroundColor = color;
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;
    confetti.style.pointerEvents = "none";
    confetti.style.zIndex = "9999";
    if (isCircle) confetti.style.borderRadius = "50%";

    document.body.appendChild(confetti);

    gsap.to(confetti, {
      x: (Math.random() - 0.5) * 1400,
      y: (Math.random() - 0.5) * 1000 - 200,
      opacity: 0,
      rotation: Math.random() * 720,
      duration: 2.5 + Math.random() * 1.5,
      ease: "power2.out",
      onComplete: () => confetti.remove(),
    });
  }
}
