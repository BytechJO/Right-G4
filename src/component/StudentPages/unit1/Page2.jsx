import React, { useEffect, useRef, useState } from "react";
import pageImage from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page2.png";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import { playGlobalAudio, stopGlobalAudio } from "../../audioManager";
import unit1Audio from "../../../assets/audio/titel G4/Unit 1.mp3";
import unit2Audio from "../../../assets/audio/titel G4/Unit 2.mp3";
import unit3Audio from "../../../assets/audio/titel G4/Unit 3.mp3";
import unit4Audio from "../../../assets/audio/titel G4/Unit 4.mp3";
import unit5Audio from "../../../assets/audio/titel G4/Unit 5.mp3";

const units = [
  {
    number: 1,
    title: "Robots of the Future",
    page: 4,
    audio: unit1Audio,
    top: "11.664%",
    left: "12.3%",
    width: "28.645%",
    height: "2.05%",
  },
  {
    number: 2,
    title: "Welcome to the Big Apple!",
    page: 10,
    audio: unit2Audio,
    top: "28.607%",
    left: "12.3%",
    width: "34.787%",
    height: "2.05%",
  },
  {
    number: 3,
    title: "Harley Ate All the Sweets",
    page: 22,
    audio: unit3Audio,
    top: "45.672%",
    left: "12.3%",
    width: "34.157%",
    height: "2.05%",
  },
  {
    number: 4,
    title: "Joy Makes a Friend",
    page: 28,
    audio: unit4Audio,
    top: "63.045%",
    left: "12.3%",
    width: "27.857%",
    height: "2.05%",
  },
  {
    number: 5,
    title: "Under the Weather",
    page: 40,
    audio: unit5Audio,
    top: "79.926%",
    left: "12.3%",
    width: "27.070%",
    height: "2.05%",
  },
];

export default function Page2({ goToUnit }) {
  const owner = useRef(Symbol("Page2"));
  const generation = useRef(0);
  const mounted = useRef(true);
  const [playingUnit, setPlayingUnit] = useState(null);
  const [message, setMessage] = useState("");
  const stopAudio = () => {
    generation.current += 1;
    stopGlobalAudio(owner.current);
    setPlayingUnit(null);
  };
  const playUnitAudio = (unit) => {
    generation.current += 1;
    const token = generation.current;
    setPlayingUnit(unit.number);
    setMessage(`Playing Unit ${unit.number}: ${unit.title}.`);
    const finish = () => {
      if (!mounted.current || generation.current !== token) return;
      setPlayingUnit(null);
      setMessage("Audio stopped.");
    };
    try {
      playGlobalAudio(unit.audio, { owner: owner.current, onFinish: finish });
    } catch {
      stopAudio();
      setMessage("Audio could not be played. Please try again.");
    }
  };
  const handleGoToUnit = (unit) => {
    stopAudio();
    goToUnit(unit.page);
  };
  const activateKey = (event, action) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) action();
  };
  const releaseKey = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  useEffect(() => {
    mounted.current = true;
    const audioOwner = owner.current;
    return () => {
      mounted.current = false;
      generation.current += 1;
      stopGlobalAudio(audioOwner);
    };
  }, []);

  return (
    <div
      className="page1-img-wrapper"
      role="group"
      aria-label="Student Book contents, Units 1 through 5. Listen to each unit title or use its arrow to open the unit."
      style={{ backgroundImage: `url(${pageImage})`, position: "relative" }}
    >
      <div className="sr-only" role="status" aria-live="polite">
        {message}
      </div>
      {/* Match the printed image height even when the Book wrapper is taller. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          aspectRatio: "1270 / 1629",
          pointerEvents: "none",
        }}
      >
        {units.map((unit) => (
          <React.Fragment key={unit.number}>
            <button
              type="button"
              aria-label={`Play Unit ${unit.number}: ${unit.title} audio`}
              aria-pressed={playingUnit === unit.number}
              onClick={(event) => {
                event.stopPropagation();
                playUnitAudio(unit);
              }}
              onKeyDown={(event) =>
                activateKey(event, () => playUnitAudio(unit))
              }
              onKeyUp={releaseKey}
              className={`absolute cursor-pointer transition-all duration-150 focus-visible:outline-solid! focus-visible:outline-4! focus-visible:outline-[#2563eb]! focus-visible:outline-offset-2! ${playingUnit === unit.number ? "ring-4 ring-green-500" : "hover:ring-2 hover:ring-blue-400"}`}
              style={{
                top: unit.top,
                left: unit.left,
                width: unit.width,
                height: unit.height,
                padding: 0,
                background: "transparent",
                border: "none",
                borderRadius: 8,
                pointerEvents: "auto",
              }}
            >
              {playingUnit === unit.number && (
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: -25,
                    left: 0,
                    background: "#16a34a",
                    color: "#fff",
                    padding: "2px 8px",
                    borderRadius: 5,
                    fontSize: 12,
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                  }}
                >
                  🔊 Playing
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label={`Go to Unit ${unit.number}: ${unit.title}, page ${unit.page}`}
              onClick={(event) => {
                event.stopPropagation();
                handleGoToUnit(unit);
              }}
              onKeyDown={(event) =>
                activateKey(event, () => handleGoToUnit(unit))
              }
              onKeyUp={releaseKey}
              className="absolute z-20 flex items-center justify-center bg-transparent border-0 cursor-pointer transition-all duration-150 hover:scale-110 active:scale-95 focus-visible:outline-solid! focus-visible:outline-4! focus-visible:outline-[#2563eb]! focus-visible:outline-offset-2!"
              style={{
                top: `calc(${unit.top} + 0.7%)`,
                translate: "0 -50%",
                left: `calc(${unit.left} + ${unit.width} + 1%)`,
                width: "4.835%",
                height: "auto",
                aspectRatio: "1",
                maxWidth: 18,
                maxHeight: 18,
                padding: 0,
                borderRadius: "50%",
                pointerEvents: "auto",
              }}
            >
              <img
                src={arrowBtn}
                alt=""
                aria-hidden="true"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  pointerEvents: "none",
                }}
              />
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
