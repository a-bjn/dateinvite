"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function FloatingBouquets() {
  const bouquet1Ref = useRef<HTMLImageElement>(null);
  const bouquet2Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!bouquet1Ref.current || !bouquet2Ref.current) return;

    gsap.to(bouquet1Ref.current, {
      y: -45,
      rotation: 20,
      duration: 3.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    gsap.to(bouquet2Ref.current, {
      y: 45,
      rotation: -20,
      duration: 4.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Left bouquet */}
      <img
        ref={bouquet1Ref}
        src="/bouquet.png"
        alt=""
        className="absolute object-contain opacity-30 select-none"
        style={{
          width: "360px",
          left: "-60px",
          top: "50%",
          transform: "translateY(-50%) rotate(15deg)",
        }}
      />
      {/* Right bouquet */}
      <img
        ref={bouquet2Ref}
        src="/romantic-bouquet-pink-roses.png"
        alt=""
        className="absolute object-contain opacity-30 select-none"
        style={{
          width: "400px",
          right: "-60px",
          top: "50%",
          transform: "translateY(-50%) rotate(-15deg)",
        }}
      />
    </div>
  );
}
