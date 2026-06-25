"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const DIVIDER_FLOWERS = [
  "/carnation-flower (2).png",
  "/iris-flower.png",
  "/snapdragon-flower.png",
  "/orchid-flower (1).png",
  "/lavender-flower.png",
  "/carnation-flower (2) (1).png",
  "/iris-flower (1).png",
  "/snapdragon-flower (1).png",
  "/orchid-flower (1) (1).png",
];

export default function FlowerDivider() {
  const flowerRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    flowerRefs.current.forEach((el, i) => {
      if (!el) return;
      const dir = i % 2 === 0 ? 1 : -1;
      gsap.to(el, {
        rotation: dir * 360,
        duration: 6 + i * 0.4,
        ease: "none",
        repeat: -1,
      });
      gsap.to(el, {
        y: -8,
        duration: 1.8 + i * 0.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
  }, []);

  return (
    <div className="relative flex items-center justify-center gap-3 py-2 px-4 w-full max-w-2xl mx-auto">
      {/* Left line */}
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(192,120,64,0.3))" }} />

      {/* Flower row */}
      <div className="flex items-center gap-3">
        {DIVIDER_FLOWERS.map((src, i) => (
          <img
            key={i}
            ref={(el) => { flowerRefs.current[i] = el; }}
            src={src}
            alt=""
            className="select-none pointer-events-none"
            style={{
              width: i === 4 ? "44px" : i % 2 === 0 ? "32px" : "28px",
              height: "auto",
              opacity: i === 4 ? 0.9 : 0.7,
            }}
          />
        ))}
      </div>

      {/* Right line */}
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(192,120,64,0.3))" }} />
    </div>
  );
}
