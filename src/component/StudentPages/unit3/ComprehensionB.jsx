import ExerciseHeader from "../../ExerciseHeader";
import { useState, useRef, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 23/SVG/Asset 3.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 23/SVG/Asset 4.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 23/SVG/Asset 5.svg";
const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  },
};

const ComprehensionB = () => {
  const images = [
    {
      id: "img1",
      src: img1,
      alt: "A colorful baby rattle.",
      correctWord: "rattle",
    },
    {
      id: "img2",
      src: img2,
      alt: "Hanging stars and a crescent moon above a baby’s bed.",
      correctWord: "mobile",
    },
    {
      id: "img3",
      src: img3,
      alt: "A wooden baby bed with raised sides and pink bedding.",
      correctWord: "crib",
    },
  ];

  const words = ["rattle", "crib", "mobile"];

  const [connections, setConnections] = useState({});
  const [draggingFrom, setDraggingFrom] = useState(null);
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);
  const [showed, setShowed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);
  const imageRefs = useRef({});
  const wordRefs = useRef({});
  const gestureRef = useRef(null);
  const skipClickRef = useRef(false);
  const isImageLocked = (id) => locked || errors[id] === false;
  const isWordLocked = (word) =>
    locked ||
    Object.entries(connections).some(
      ([id, value]) => value === word && errors[id] === false,
    );
  const endpointLocked = (type, id) =>
    type === "img" ? isImageLocked(id) : isWordLocked(id);
  const clearPending = () => {
    const gesture = gestureRef.current;
    gestureRef.current = null;
    if (gesture && containerRef.current?.hasPointerCapture?.(gesture.pointerId))
      containerRef.current.releasePointerCapture(gesture.pointerId);
    setDraggingFrom(null);
    setIsDragging(false);
  };
  const focusCandidate = (type) => {
    const candidates = type === "img" ? images.map((image) => image.id) : words;
    const candidate = candidates.find((id) => !endpointLocked(type, id));
    const point = dotPositions[`${type}_${candidate}`];
    if (point) setMousePos(point);
    (type === "img" ? imageRefs : wordRefs).current[candidate]?.focus({
      preventScroll: true,
    });
  };
  const connect = (imageId, word, keyboard = false) => {
    if (isImageLocked(imageId) || isWordLocked(word)) return;
    const affected = [
      imageId,
      ...Object.keys(connections).filter(
        (id) => connections[id] === word && !isImageLocked(id),
      ),
    ];
    setConnections((prev) => {
      const next = { ...prev };
      for (const id of affected) delete next[id];
      next[imageId] = word;
      return next;
    });
    setErrors((prev) => {
      const next = { ...prev };
      for (const id of affected) delete next[id];
      return next;
    });
    clearPending();
    setAnnouncement(
      `Picture ${images.findIndex((image) => image.id === imageId) + 1} matched to ${word}.`,
    );
    if (keyboard) {
      const next = words.find(
        (value) => value !== word && !isWordLocked(value),
      );
      (wordRefs.current[next] || resetButtonRef.current)?.focus({
        preventScroll: true,
      });
    }
  };
  const choose = (type, id, keyboard = false) => {
    if (endpointLocked(type, id)) {
      setAnnouncement("This match is correct and locked.");
      return;
    }
    updateDotPositions();
    if (draggingFrom?.type === type && draggingFrom.id === id) {
      clearPending();
      setAnnouncement("Match cancelled.");
      return;
    }
    if (draggingFrom && draggingFrom.type !== type) {
      connect(
        type === "img" ? id : draggingFrom.id,
        type === "word" ? id : draggingFrom.id,
        keyboard,
      );
      return;
    }
    setDraggingFrom({ type, id });
    setIsDragging(true);
    setAnnouncement(
      type === "img"
        ? "Picture selected. Choose a word."
        : `${id} selected. Choose a picture.`,
    );
    if (keyboard) focusCandidate(type === "img" ? "word" : "img");
  };
  const preview = (type, id) => {
    if (!draggingFrom || draggingFrom.type === type || endpointLocked(type, id))
      return;
    const position = dotPositions[`${type}_${id}`];
    if (position) setMousePos(position);
  };
  const endpointKey = (event, type, id) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      if (!event.repeat) choose(type, id, true);
      return;
    }
    if (event.key === "Escape" && draggingFrom) {
      event.preventDefault();
      event.stopPropagation();
      const source = draggingFrom;
      clearPending();
      (source.type === "img" ? imageRefs : wordRefs).current[source.id]?.focus({
        preventScroll: true,
      });
      setAnnouncement("Match cancelled.");
      return;
    }
    if (
      ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
    ) {
      event.preventDefault();
      event.stopPropagation();
      const list = (
        type === "img" ? images.map((image) => image.id) : words
      ).filter((value) => !endpointLocked(type, value));
      const step =
        event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
      const next = list[(list.indexOf(id) + step + list.length) % list.length];
      (type === "img" ? imageRefs : wordRefs).current[next]?.focus({
        preventScroll: true,
      });
    }
  };
  const pointPosition = (event) => {
    const el = containerRef.current,
      rect = el.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * (el.clientWidth / rect.width),
      y: (event.clientY - rect.top) * (el.clientHeight / rect.height),
    };
  };
  const pointerStart = (event, type, id) => {
    if (
      event.button !== 0 ||
      event.isPrimary === false ||
      gestureRef.current ||
      endpointLocked(type, id)
    )
      return;
    event.preventDefault();
    event.stopPropagation();
    if (draggingFrom && draggingFrom.type !== type) {
      skipClickRef.current = true;
      connect(
        type === "img" ? id : draggingFrom.id,
        type === "word" ? id : draggingFrom.id,
      );
      return;
    }
    updateDotPositions();
    gestureRef.current = {
      pointerId: event.pointerId,
      type,
      id,
      x: event.clientX,
      y: event.clientY,
      moved: false,
    };
    setDraggingFrom({ type, id });
    setIsDragging(true);
    setMousePos(pointPosition(event));
    containerRef.current.setPointerCapture?.(event.pointerId);
  };
  const pointerMove = (event) => {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    gesture.moved ||=
      Math.hypot(event.clientX - gesture.x, event.clientY - gesture.y) > 4;
    setMousePos(pointPosition(event));
  };
  const pointerEnd = (event) => {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    const target = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest("[data-match-type]");
    gestureRef.current = null;
    if (containerRef.current.hasPointerCapture?.(event.pointerId))
      containerRef.current.releasePointerCapture(event.pointerId);
    skipClickRef.current = true;
    if (
      target &&
      containerRef.current.contains(target) &&
      target.dataset.matchType !== gesture.type
    )
      connect(
        gesture.type === "img" ? gesture.id : target.dataset.matchId,
        gesture.type === "word" ? gesture.id : target.dataset.matchId,
      );
    else if (gesture.moved) clearPending();
  };
  const endpointClick = (type, id, event) => {
    if (skipClickRef.current && event.detail !== 0) {
      skipClickRef.current = false;
      return;
    }
    skipClickRef.current = false;
    choose(type, id, event.detail === 0);
  };
  const containerRef = useRef(null);
  const imgDotRefs = useRef({});
  const wordDotRefs = useRef({});
  const [dotPositions, setDotPositions] = useState({});

  const updateDotPositions = () => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const scaleX = container.clientWidth / rect.width,
      scaleY = container.clientHeight / rect.height;
    const positions = {};
    Object.entries(imgDotRefs.current).forEach(([id, el]) => {
      if (el) {
        const r = el.getBoundingClientRect();
        positions[`img_${id}`] = {
          x: (r.left - rect.left + r.width / 2) * scaleX,
          y: (r.top - rect.top + r.height / 2) * scaleY,
        };
      }
    });
    Object.entries(wordDotRefs.current).forEach(([word, el]) => {
      if (el) {
        const r = el.getBoundingClientRect();
        positions[`word_${word}`] = {
          x: (r.left - rect.left + r.width / 2) * scaleX,
          y: (r.top - rect.top + r.height / 2) * scaleY,
        };
      }
    });
    setDotPositions(positions);
  };

  useEffect(() => {
    updateDotPositions();
    window.addEventListener("resize", updateDotPositions);
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateDotPositions)
        : null;
    if (containerRef.current) observer?.observe(containerRef.current);
    return () => {
      window.removeEventListener("resize", updateDotPositions);
      observer?.disconnect();
      gestureRef.current = null;
    };
  }, []);

  const handleCheck = () => {
    if (locked) return;
    clearPending();
    if (Object.keys(connections).length < images.length) {
      ValidationAlert.info("Please match all images.");
      return;
    }

    let correctCount = 0;
    const newErrors = {};
    images.forEach((img) => {
      if (connections[img.id] === img.correctWord) {
        correctCount++;
        newErrors[img.id] = false;
      } else {
        newErrors[img.id] = true;
      }
    });

    setErrors(newErrors);
    setAnnouncement(
      `Score: ${correctCount} out of ${images.length}. Correct matches are locked; incorrect matches can be changed.`,
    );
    const total = images.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;
    if (correctCount === total) {
      setLocked(true);
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const handleShow = () => {
    clearPending();
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnnouncement("Correct matches shown and locked.");
    const correct = {};
    images.forEach((img) => (correct[img.id] = img.correctWord));
    setConnections(correct);
    setErrors({});
    setLocked(true);
    setShowed(true);
    updateDotPositions();
  };

  const handleReset = () => {
    clearPending();
    setAnnouncement("Matches and feedback cleared.");
    setConnections({});
    setErrors({});
    setLocked(false);
    setShowed(false);
    setIsDragging(false);
    setDraggingFrom(null);
  };

  const getLineColor = (imgId) => {
    if (showed) return "#16a34a";
    if (errors[imgId] === false) return "#16a34a";
    if (errors[imgId] === true) return "#ef4444";
    return "#2195a6";
  };

  const getDotColor = (imgId) => {
    if (showed || errors[imgId] === false) return "#16a34a";
    if (errors[imgId] === true) return "#ef4444";
    return "#f89631";
  };

  return (
    <div data-unit3-scope="ComprehensionB" className="mb-6 mx-auto">
      <style>{`[data-unit3-scope="ComprehensionB"] input:focus-visible, [data-unit3-scope="ComprehensionB"] [data-keyboard-choice]:focus-visible { outline: 4px solid #2563eb; outline-offset: 3px; border-radius: 6px; }`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Look, read, and match.
      </h5>
      <div
        ref={containerRef}
        style={{ position: "relative", userSelect: "none" }}
        onPointerMove={pointerMove}
        onPointerUp={pointerEnd}
        onPointerCancel={(event) => {
          if (gestureRef.current?.pointerId === event.pointerId) clearPending();
        }}
        onLostPointerCapture={(event) => {
          if (gestureRef.current?.pointerId === event.pointerId) clearPending();
        }}
      >
        {/* SVG Lines */}
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {/* Drawn connections */}
          {images.map((img) => {
            const from = dotPositions[`img_${img.id}`];
            const to = connections[img.id]
              ? dotPositions[`word_${connections[img.id]}`]
              : null;
            if (!from || !to) return null;
            return (
              <line
                key={img.id}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={getLineColor(img.id)}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            );
          })}

          {/* Dragging line */}
          {isDragging && draggingFrom && (
            <line
              x1={
                dotPositions[`${draggingFrom.type}_${draggingFrom.id}`]?.x || 0
              }
              y1={
                dotPositions[`${draggingFrom.type}_${draggingFrom.id}`]?.y || 0
              }
              x2={mousePos.x}
              y2={mousePos.y}
              stroke="#2195a6"
              strokeWidth="2.5"
              strokeDasharray="6,3"
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* Images Row */}
        <div className="grid grid-cols-3 gap-6 mb-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="flex flex-col items-center gap-2"
              role="button"
              tabIndex={0}
              data-keyboard-choice
              onPointerDownCapture={() => {
                if (!gestureRef.current) skipClickRef.current = false;
              }}
              data-match-type="img"
              data-match-id={img.id}
              ref={(el) => {
                imageRefs.current[img.id] = el;
              }}
              aria-label={`Picture ${images.findIndex((image) => image.id === img.id) + 1}. ${img.alt}${connections[img.id] ? " Matched to " + connections[img.id] + "." : " Unmatched."}${isImageLocked(img.id) ? " Locked." : ""}`}
              aria-pressed={
                draggingFrom?.type === "img" && draggingFrom.id === img.id
              }
              aria-disabled={isImageLocked(img.id)}
              onClick={(event) => endpointClick("img", img.id, event)}
              onKeyDown={(event) => endpointKey(event, "img", img.id)}
              onKeyUp={activationKeys.onKeyUp}
              onFocus={() => preview("img", img.id)}
              onMouseEnter={() => preview("img", img.id)}
              style={{
                borderRadius: "6px",
                boxShadow:
                  draggingFrom?.type === "img" && draggingFrom.id === img.id
                    ? "0 0 0 3px #2563eb"
                    : isImageLocked(img.id)
                      ? "0 0 0 2px #16a34a"
                      : undefined,
                background:
                  draggingFrom?.type === "img" && draggingFrom.id === img.id
                    ? "#dbeafe"
                    : undefined,
              }}
            >
              {/* Image Box */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  onLoad={updateDotPositions}
                  style={{
                    width: "100%",
                    height: "auto ",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* Bottom Dot */}
              <div
                ref={(el) => (imgDotRefs.current[img.id] = el)}
                onPointerDown={(event) => pointerStart(event, "img", img.id)}
                style={{
                  touchAction: "none",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: getDotColor(img.id),
                  cursor: locked ? "default" : "crosshair",
                  zIndex: 20,
                  position: "relative",
                }}
              />
            </div>
          ))}
        </div>

        {/* Words Row */}
        <div className="grid grid-cols-3 gap-6 mt-20">
          {words.map((word) => (
            <div
              key={word}
              className="flex flex-col items-center gap-2"
              role="button"
              tabIndex={0}
              data-keyboard-choice
              onPointerDownCapture={() => {
                if (!gestureRef.current) skipClickRef.current = false;
              }}
              data-match-type="word"
              data-match-id={word}
              ref={(el) => {
                wordRefs.current[word] = el;
              }}
              aria-label={`${word}.${isWordLocked(word) ? " Correct and locked." : " Choose to match."}`}
              aria-pressed={
                draggingFrom?.type === "word" && draggingFrom.id === word
              }
              aria-disabled={isWordLocked(word)}
              onClick={(event) => endpointClick("word", word, event)}
              onKeyDown={(event) => endpointKey(event, "word", word)}
              onKeyUp={activationKeys.onKeyUp}
              onFocus={() => preview("word", word)}
              onMouseEnter={() => preview("word", word)}
              style={{
                borderRadius: "6px",
                boxShadow:
                  draggingFrom?.type === "word" && draggingFrom.id === word
                    ? "0 0 0 3px #2563eb"
                    : isWordLocked(word)
                      ? "0 0 0 2px #16a34a"
                      : undefined,
                background:
                  draggingFrom?.type === "word" && draggingFrom.id === word
                    ? "#dbeafe"
                    : undefined,
              }}
            >
              {/* Top Dot */}
              <div
                ref={(el) => (wordDotRefs.current[word] = el)}
                onPointerDown={(event) => pointerStart(event, "word", word)}
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "#f89631",
                  cursor: "pointer",
                  zIndex: 20,
                  position: "relative",
                }}
              />
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1a1a1a",
                }}
              >
                {word}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-10">
        <div className="relative group">
          <button
            type="button"
            aria-label="Start Again"
            {...activationKeys}
            ref={resetButtonRef}
            onClick={handleReset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <span className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} />
            </span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>

        <div className="relative group">
          <button
            type="button"
            aria-label="Show Answer"
            {...activationKeys}
            onClick={handleShow}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <span className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} />
            </span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Show Answer
          </span>
        </div>

        <div className="relative group">
          <button
            type="button"
            aria-label="Check Answer"
            {...activationKeys}
            disabled={locked}
            style={{ cursor: locked ? "not-allowed" : "pointer" }}
            onClick={handleCheck}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <span className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} />
            </span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Check Answer
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComprehensionB;
