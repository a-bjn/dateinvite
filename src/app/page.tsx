"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import type { Place } from "./data/places";
import { sendConfirmation } from "./lib/sendConfirmation";

const ThrowFlowers = dynamic(() => import("./components/ThrowFlowers"), { ssr: false });
const FloatingBouquets = dynamic(() => import("./components/FloatingBouquets"), { ssr: false });
const FlowerDivider = dynamic(() => import("./components/FlowerDivider"), { ssr: false });
const CherryBlossomLottie = dynamic(
  () => import("./components/CherryBlossomLottie"),
  { ssr: false }
);
const HeroBlossom = dynamic(
  () => import("./components/CherryBlossomLottie").then((m) => m.HeroBlossom),
  { ssr: false }
);
const DateCalendar = dynamic(() => import("./components/DateCalendar"), { ssr: false });
const PlaceCards = dynamic(() => import("./components/PlaceCards"), { ssr: false });

type Step = "invite" | "calendar" | "places" | "done";

const EMOJIS = ["🌸", "🌺", "🌷", "🌹", "🌼", "💐"];

interface Petal {
  id: number;
  emoji: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("ro-RO", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function StepProgress({ step }: { step: Step }) {
  const steps: Step[] = ["calendar", "places", "done"];
  const current = step === "invite" ? -1 : steps.indexOf(step);

  return (
    <div className="step-progress">
      {steps.map((s, i) => (
        <div
          key={s}
          className={`step-dot ${i === current ? "step-dot--active" : ""} ${i < current ? "step-dot--done" : ""}`}
        />
      ))}
    </div>
  );
}

export default function DateInvite() {
  const [step, setStep] = useState<Step>("invite");
  const [noCount, setNoCount] = useState(0);
  const [petals, setPetals] = useState<Petal[]>([]);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [throwTrigger, setThrowTrigger] = useState(false);
  const [flowerCount, setFlowerCount] = useState(42);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [visible, setVisible] = useState({
    hero: false,
    divider: false,
    details: false,
    invite: false,
  });
  const petalIdRef = useRef(0);

  useEffect(() => {
    setFlowerCount(window.innerWidth < 640 ? 18 : 42);
    setTimeout(() => setVisible((v) => ({ ...v, hero: true })), 200);
    setTimeout(() => setVisible((v) => ({ ...v, divider: true })), 800);
    setTimeout(() => setVisible((v) => ({ ...v, details: true })), 1100);
    setTimeout(() => setVisible((v) => ({ ...v, invite: true })), 1800);
    setTimeout(() => setThrowTrigger(true), 600);
  }, []);

  const spawnPetals = useCallback(() => {
    const newPetals: Petal[] = Array.from({ length: 20 }, (_, i) => ({
      id: petalIdRef.current++,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: Math.random() * 100,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 1.5,
      size: 1 + Math.random() * 1.2,
    }));
    setPetals((prev) => [...prev, ...newPetals]);
    setTimeout(() => {
      setPetals((prev) =>
        prev.filter((p) => !newPetals.find((np) => np.id === p.id))
      );
    }, 9000);
  }, []);

  const handleYes = () => {
    spawnPetals();
    setTimeout(spawnPetals, 600);
    setStep("calendar");
  };

  const moveNoButton = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const range = (isMobile ? 90 : 160) + noCount * (isMobile ? 12 : 18);
    const angle = Math.random() * 2 * Math.PI;
    const maxX = isMobile ? Math.min(100, window.innerWidth * 0.28) : 200;
    const maxY = isMobile ? Math.min(80, window.innerHeight * 0.12) : 150;
    const x = Math.max(-maxX, Math.min(maxX, Math.cos(angle) * (50 + Math.random() * range)));
    const y = Math.max(-maxY, Math.min(maxY, Math.sin(angle) * (40 + Math.random() * range)));
    setNoPos({ x, y });
    setNoCount((c) => c + 1);
  };

  const noMessages = [
    "Ești sigură? 🥺",
    "Chiar chiar sigură? 🌸",
    "Mai gândește-te... 🌷",
    "Încă o șansă! 🌺",
    "Te rog frumos? 🌹",
    "Promit că o să fie frumos! 💐",
    "Ultima șansă! 🌸",
  ];

  const showInviteLayout = step === "invite";

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #fdf6f0 0%, #fce8d8 40%, #fdf0e8 70%, #fff5f0 100%)",
      }}
    >
      <CherryBlossomLottie />
      {step === "invite" && <ThrowFlowers trigger={throwTrigger} count={flowerCount} />}
      <FloatingBouquets />

      <div
        className="pointer-events-none fixed w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]"
        style={{
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232,168,112,0.12) 0%, transparent 70%)",
          top: "-100px",
          left: "-100px",
          animation: "drift 8s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none fixed w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px]"
        style={{
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,137,106,0.1) 0%, transparent 70%)",
          bottom: "-80px",
          right: "-80px",
          animation: "drift 10s ease-in-out infinite reverse",
        }}
      />

      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            top: "-30px",
            fontSize: `${p.size}rem`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.emoji}
        </div>
      ))}

      <main className="relative z-20 flex flex-col items-center justify-center min-h-[100dvh] px-4 sm:px-6 py-10 sm:py-16 md:py-20 pb-[max(2.5rem,env(safe-area-inset-bottom))]">

        {/* ── INVITE FLOW ── */}
        {showInviteLayout && (
          <>
            <section
              className="text-center mb-8"
              style={{
                opacity: visible.hero ? 1 : 0,
                transform: visible.hero ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 1s ease, transform 1s ease",
              }}
            >
              <HeroBlossom />
              <h1
                className="text-4xl sm:text-5xl md:text-7xl font-light tracking-wide mb-4"
                style={{ color: "#7a4030", letterSpacing: "0.04em" }}
              >
                Hei, <span className="shimmer-text font-normal">tu</span>
              </h1>
              <p
                className="text-lg sm:text-xl md:text-2xl font-light"
                style={{ color: "#a06050", letterSpacing: "0.05em" }}
              >
                Am ceva să te întreb&nbsp;🌷
              </p>
            </section>

            <div
              style={{
                opacity: visible.divider ? 1 : 0,
                transform: visible.divider ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.9s ease, transform 0.9s ease",
                width: "100%",
                marginBottom: "2.5rem",
              }}
            >
              <FlowerDivider />
            </div>

            <section
              className="mb-14 w-full max-w-md"
              style={{
                opacity: visible.details ? 1 : 0,
                transform: visible.details ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 1s ease, transform 1s ease",
              }}
            >
              <div
                className="glass-card gentle-pulse-card rounded-3xl px-5 sm:px-8 py-8 sm:py-10 text-center"
              >
                <p
                  className="text-lg font-light mb-8"
                  style={{ color: "#8a5040", lineHeight: 1.8 }}
                >
                  Mă bucur că imaginația mea a devenit realitate 🌸
                </p>

                <div className="flex flex-col gap-5">
                  {[
                    { icon: "🌺", label: "Când", value: "Tu alegi ziua" },
                    { icon: "🌸", label: "Unde", value: "Tu alegi locul" },
                    { icon: "🌼", label: "Ținută", value: "Ceva care te face să zâmbești" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-4 rounded-2xl px-5 py-3"
                      style={{ background: "rgba(212, 137, 106, 0.07)" }}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div className="text-left">
                        <p
                          className="text-xs uppercase tracking-widest mb-0.5"
                          style={{ color: "#b07050" }}
                        >
                          {item.label}
                        </p>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#6a3828" }}
                        >
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section
              className="text-center w-full max-w-sm"
              style={{
                opacity: visible.invite ? 1 : 0,
                transform: visible.invite ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 1s ease, transform 1s ease",
              }}
            >
              <p
                className="text-xl sm:text-2xl font-light mb-8 px-2"
                style={{ color: "#7a4030" }}
              >
                {noCount === 0
                  ? "Deci… vrei să ieșim la o întâlnire? 🌸"
                  : noMessages[Math.min(noCount - 1, noMessages.length - 1)]}
              </p>

              <div className="relative flex flex-col items-center gap-4 w-full max-w-xs mx-auto">
                <button
                  onClick={handleYes}
                  className="btn-yes text-white rounded-full px-12 py-4 text-lg font-medium tracking-wide w-full max-w-[13rem] min-h-[3rem]"
                >
                  Da! 🌸
                </button>

                <button
                  onMouseEnter={moveNoButton}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    moveNoButton();
                  }}
                  onClick={moveNoButton}
                  className="btn-no rounded-full px-10 py-3.5 text-sm tracking-wide w-full max-w-[11rem] min-h-[2.75rem]"
                  style={{
                    transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                    transition:
                      "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    cursor: "default",
                  }}
                >
                  Nu, mulțumesc
                </button>
              </div>
            </section>

            <footer
              className="mt-12 sm:mt-20 flex gap-3 sm:gap-4 text-xl sm:text-2xl"
              style={{
                opacity: visible.invite ? 0.5 : 0,
                transition: "opacity 1s ease 2s",
              }}
            >
              {["🌸", "🌷", "🌺", "🌼", "🌹"].map((f, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    animation: `sway ${3 + i * 0.4}s ease-in-out ${i * 0.3}s infinite`,
                  }}
                >
                  {f}
                </span>
              ))}
            </footer>
          </>
        )}

        {/* ── CALENDAR STEP ── */}
        {step === "calendar" && (
          <div className="relative z-30 w-full flex flex-col items-center">
            <StepProgress step={step} />
            <DateCalendar
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSelectDate={setSelectedDate}
              onSelectTime={setSelectedTime}
              onContinue={() => setStep("places")}
            />
          </div>
        )}

        {/* ── PLACES STEP ── */}
        {step === "places" && (
          <div className="relative z-30 w-full flex flex-col items-center">
            <StepProgress step={step} />
            <PlaceCards
              selectedPlace={selectedPlace}
              onSelect={setSelectedPlace}
              onContinue={() => {
                spawnPetals();
                if (selectedDate && selectedTime && selectedPlace) {
                  sendConfirmation({
                    date: formatDate(selectedDate),
                    time: selectedTime,
                    place: selectedPlace.name,
                    placeTagline: selectedPlace.tagline,
                  }).catch(console.error);
                }
                setStep("done");
              }}
              onBack={() => setStep("calendar")}
            />
          </div>
        )}

        {/* ── CONFIRMATION ── */}
        {step === "done" && selectedDate && selectedTime && selectedPlace && (
          <div className="relative z-30 w-full flex flex-col items-center">
          <div
            className="w-full max-w-md text-center animate-fade-in-up"
          >
            <StepProgress step={step} />
            <div className="text-6xl mb-4" style={{ animation: "heartbeat 1.2s ease-in-out infinite" }}>
              🌹
            </div>
            <h2 className="text-3xl sm:text-4xl font-light mb-3 px-2 break-words" style={{ color: "#7a3030" }}>
              It&apos;s a dateeee!!
            </h2>
            <p className="text-lg font-light mb-8" style={{ color: "#a06050" }}>
              See you soon!
            </p>

            <div className="glass-card rounded-3xl px-5 sm:px-8 py-6 sm:py-8 text-left space-y-5 w-full">
              <div className="flex items-start gap-4">
                <span className="text-2xl">📅</span>
                <div>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#b07050" }}>
                    Când
                  </p>
                  <p className="text-sm font-medium" style={{ color: "#6a3828" }}>
                    {formatDate(selectedDate)}
                  </p>
                  <p className="text-sm mt-0.5" style={{ color: "#8a5040" }}>
                    {selectedTime}
                  </p>
                </div>
              </div>

              <div className="h-px" style={{ background: "rgba(212, 137, 106, 0.15)" }} />

              <div className="flex items-start gap-4">
                <span className="text-2xl">🌺</span>
                <div>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#b07050" }}>
                    Unde
                  </p>
                  <p className="text-sm font-medium" style={{ color: "#6a3828" }}>
                    {selectedPlace.name}
                  </p>
                  <p className="text-sm mt-0.5 font-light" style={{ color: "#8a5040" }}>
                    {selectedPlace.tagline}
                  </p>
                </div>
              </div>

            </div>
          </div>
          </div>
        )}
      </main>
    </div>
  );
}
