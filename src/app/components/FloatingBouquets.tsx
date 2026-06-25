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
      <img
        ref={bouquet1Ref}
        src="/bouquet.png"
        alt=""
        className="absolute object-contain opacity-20 sm:opacity-30 select-none w-[120px] sm:w-[220px] md:w-[360px] -left-8 sm:-left-12 md:-left-[60px] top-1/2 -translate-y-1/2 rotate-[15deg]"
      />
      <img
        ref={bouquet2Ref}
        src="/romantic-bouquet-pink-roses.png"
        alt=""
        className="absolute object-contain opacity-20 sm:opacity-30 select-none w-[130px] sm:w-[240px] md:w-[400px] -right-8 sm:-right-12 md:-right-[60px] top-1/2 -translate-y-1/2 -rotate-[15deg]"
      />
    </div>
  );
}
