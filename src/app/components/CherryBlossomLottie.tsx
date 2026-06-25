"use client";

import Lottie from "lottie-react";
import cherryBlossomAnimation from "../../../public/cherry-blossom.json";

const BLOSSOMS = [
  { top: "8%", left: "4%", width: "7rem", opacity: 0.45 },
  { top: "18%", right: "6%", width: "9rem", opacity: 0.4 },
  { top: "35%", left: "2%", width: "8rem", opacity: 0.35 },
  { top: "52%", right: "4%", width: "10rem", opacity: 0.38 },
  { top: "68%", left: "6%", width: "7.5rem", opacity: 0.32 },
  { top: "82%", right: "8%", width: "8.5rem", opacity: 0.36 },
  { top: "28%", left: "12%", width: "6rem", opacity: 0.28 },
  { top: "58%", right: "12%", width: "7rem", opacity: 0.3 },
];

export function HeroBlossom() {
  return (
    <div className="mx-auto mb-4" style={{ width: "5.5rem", opacity: 0.95 }}>
      <Lottie
        animationData={cherryBlossomAnimation}
        loop
        autoplay
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}

export default function CherryBlossomLottie() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {BLOSSOMS.map((blossom, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: blossom.top,
            left: blossom.left,
            right: blossom.right,
            width: blossom.width,
            opacity: blossom.opacity,
          }}
        >
          <Lottie
            animationData={cherryBlossomAnimation}
            loop
            autoplay
            style={{ width: "100%", height: "auto", pointerEvents: "none" }}
          />
        </div>
      ))}
    </div>
  );
}
