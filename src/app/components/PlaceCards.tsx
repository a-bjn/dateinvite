"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import type { Place } from "../data/places";
import { PLACES } from "../data/places";

interface PlaceCardsProps {
  selectedPlace: Place | null;
  onSelect: (place: Place) => void;
  onContinue: () => void;
  onBack: () => void;
}

const GREAT_CHOICE_MESSAGES = [
  "Great choice! 🌸",
  "Love it! 🌺",
  "Perfect pick! 🌷",
  "Ooh, nice one! 💐",
  "Sounds amazing! 🌹",
];

const CONFETTI_COLORS = [
  "#d4896a", "#c07840", "#e8a870", "#f4c4a0",
  "#a06050", "#8a5a38", "#f0d0b0", "#e0a880",
];

const CONFETTI_SHAPES = ["●", "★", "✦", "◆", "✿", "❋"];

function PlaceImage({ place }: { place: Place }) {
  const [hasImage, setHasImage] = useState(true);

  if (!hasImage) {
    return (
      <div
        className="place-card-placeholder"
        style={{ background: `linear-gradient(145deg, ${place.accent}22, ${place.accent}44)` }}
      >
        <span className="text-4xl opacity-60">🌸</span>
        <span className="text-xs mt-2 opacity-50" style={{ color: "#8a5040" }}>
          Photo coming soon
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <Image
        src={place.image}
        alt={place.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 400px"
        onError={() => setHasImage(false)}
      />
      <div className="place-card-image-overlay" />
    </div>
  );
}

export default function PlaceCards({ selectedPlace, onSelect, onContinue, onBack }: PlaceCardsProps) {
  const [toastPlace, setToastPlace] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState("");
  const confettiRef = useRef<HTMLDivElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const launchConfetti = useCallback((originX: number, originY: number) => {
    if (!confettiRef.current) return;
    const container = confettiRef.current;

    for (let i = 0; i < 40; i++) {
      const el = document.createElement("span");
      el.textContent = CONFETTI_SHAPES[Math.floor(Math.random() * CONFETTI_SHAPES.length)];
      el.style.position = "fixed";
      el.style.left = `${originX}px`;
      el.style.top = `${originY}px`;
      el.style.fontSize = `${Math.random() * 14 + 10}px`;
      el.style.color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      el.style.pointerEvents = "none";
      el.style.zIndex = "999";
      el.style.userSelect = "none";
      container.appendChild(el);

      gsap.to(el, {
        x: (Math.random() - 0.5) * 320,
        y: (Math.random() - 0.5) * 280 - 80,
        opacity: 0,
        scale: Math.random() * 1.5 + 0.5,
        rotation: Math.random() * 720 - 360,
        duration: Math.random() * 1.2 + 0.8,
        ease: "power2.out",
        onComplete: () => el.remove(),
      });
    }

    // Extra sparkle burst
    for (let i = 0; i < 16; i++) {
      const spark = document.createElement("span");
      spark.textContent = "✦";
      spark.style.position = "fixed";
      spark.style.left = `${originX}px`;
      spark.style.top = `${originY}px`;
      spark.style.fontSize = `${Math.random() * 8 + 6}px`;
      spark.style.color = "#e8a870";
      spark.style.pointerEvents = "none";
      spark.style.zIndex = "999";
      container.appendChild(spark);

      const angle = (i / 16) * Math.PI * 2;
      const dist = Math.random() * 100 + 60;
      gsap.to(spark, {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        opacity: 0,
        scale: 0,
        duration: Math.random() * 0.7 + 0.5,
        ease: "power3.out",
        onComplete: () => spark.remove(),
      });
    }
  }, []);

  const handleSelect = useCallback(
    (place: Place, e: React.MouseEvent<HTMLButtonElement>) => {
      onSelect(place);

      // Launch confetti from click position
      launchConfetti(e.clientX, e.clientY);

      // Show toast
      const msg = GREAT_CHOICE_MESSAGES[Math.floor(Math.random() * GREAT_CHOICE_MESSAGES.length)];
      setToastMsg(msg);
      setToastPlace(place.id);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => setToastPlace(null), 2200);
    },
    [onSelect, launchConfetti]
  );

  return (
    <div className="w-full max-w-4xl animate-fade-in-up relative z-30">
      {/* Confetti container */}
      <div ref={confettiRef} className="fixed inset-0 pointer-events-none z-[999]" />

      {/* Toast message */}
      {toastPlace && (
        <div className="place-toast animate-bloom">
          {toastMsg}
        </div>
      )}

      <div className="text-center mb-10">
        <p className="text-sm uppercase tracking-[0.25em] mb-2" style={{ color: "#b07050" }}>
          Step 2 of 2
        </p>
        <h2 className="text-3xl md:text-4xl font-light mb-2" style={{ color: "#7a4030" }}>
          Where should we go? 🌺
        </h2>
        <p className="text-base font-light" style={{ color: "#a06050" }}>
          Pick a spot — or let me surprise you
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
        {PLACES.map((place, index) => {
          const isSelected = selectedPlace?.id === place.id;

          return (
            <button
              key={place.id}
              type="button"
              onClick={(e) => handleSelect(place, e)}
              className={`place-card group text-left ${isSelected ? "place-card--selected" : ""}`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="place-card-image">
                <PlaceImage place={place} />
                <div className="place-card-badges">
                  <span className="place-badge">{place.cuisine}</span>
                  <span className="place-badge place-badge--vibe">{place.vibe}</span>
                  {place.priceRange && (
                    <span className="place-badge place-badge--price">{place.priceRange}</span>
                  )}
                </div>
                {isSelected && (
                  <div className="place-card-selected-mark">
                    <span>✓</span>
                  </div>
                )}
              </div>

              <div className="place-card-body">
                <p className="place-card-tagline">{place.tagline}</p>
                <h3 className="place-card-title">{place.name}</h3>
                <p className="place-card-desc">{place.description}</p>

                {(place.cuisines?.length || place.mealTypes?.length || place.specialDiets?.length) ? (
                  <div className="place-card-meta">
                    {place.cuisines && (
                      <div className="place-card-meta-row">
                        <span className="place-card-meta-label">Cuisines</span>
                        <div className="place-card-tags">
                          {place.cuisines.map((c) => (
                            <span key={c} className="place-meta-tag">{c}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {place.mealTypes && (
                      <div className="place-card-meta-row">
                        <span className="place-card-meta-label">Meals</span>
                        <div className="place-card-tags">
                          {place.mealTypes.map((meal) => (
                            <span key={meal} className="place-meta-tag">{meal}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {place.specialDiets && (
                      <div className="place-card-meta-row">
                        <span className="place-card-meta-label">Diets</span>
                        <div className="place-card-tags">
                          {place.specialDiets.map((diet) => (
                            <span key={diet} className="place-meta-tag place-meta-tag--diet">{diet}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>

              <div className="place-card-accent" style={{ background: place.accent }} />
            </button>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
        <button
          type="button"
          onClick={onBack}
          className="btn-no rounded-full px-10 py-3.5 text-sm tracking-wide w-44"
        >
          ← Back
        </button>
        <button
          type="button"
          disabled={!selectedPlace}
          onClick={onContinue}
          className="btn-yes text-white rounded-full px-12 py-4 text-lg font-medium tracking-wide w-52 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Confirm 🌹
        </button>
      </div>
    </div>
  );
}
