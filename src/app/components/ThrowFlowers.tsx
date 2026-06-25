"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const FLOWER_IMAGES = [
  "/orchid-flower (1) (1).png",
  "/lavender-flower.png",
  "/iris-flower (1).png",
  "/carnation-flower (2) (1).png",
  "/snapdragon-flower (1).png",
  "/orchid-flower (1).png",
  "/iris-flower.png",
  "/carnation-flower (2).png",
  "/snapdragon-flower.png",
];

interface ThrowFlowersProps {
  trigger?: boolean;
  count?: number;
}

export default function ThrowFlowers({ trigger = true, count = 40 }: ThrowFlowersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasThrown = useRef(false);

  const throwFlowers = () => {
    if (!containerRef.current) return;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        if (!containerRef.current) return;

        const img = document.createElement("img");
        const src = FLOWER_IMAGES[Math.floor(Math.random() * FLOWER_IMAGES.length)];
        img.src = src;
        img.style.position = "absolute";
        img.style.width = `${Math.random() * 40 + 35}px`;
        img.style.height = "auto";
        img.style.zIndex = "110";
        img.style.pointerEvents = "none";

        const fromLeft = Math.random() > 0.5;
        img.style.left = fromLeft ? "3%" : "97%";
        img.style.top = `${Math.random() * 50 + 10}%`;

        containerRef.current.appendChild(img);

        gsap.to(img, {
          x: fromLeft
            ? Math.random() * window.innerWidth * 0.8 + 150
            : -(Math.random() * window.innerWidth * 0.8 + 150),
          y: Math.random() * window.innerHeight * 0.7 + 200,
          rotation: Math.random() * 1080 - 540,
          opacity: 0,
          scale: Math.random() * 1.6 + 0.5,
          duration: Math.random() * 2.5 + 2.5,
          ease: "power2.out",
          onComplete: () => img.remove(),
        });
      }, i * 45);
    }
  };

  useEffect(() => {
    if (trigger && !hasThrown.current) {
      hasThrown.current = true;
      setTimeout(throwFlowers, 400);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[110] pointer-events-none"
    />
  );
}
