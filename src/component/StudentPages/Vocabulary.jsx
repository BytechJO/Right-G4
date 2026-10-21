import React, { useState } from "react";
import QuestionAudioPlayer from "../QuestionAudioPlayer";

const Vocabulary = ({
  words = [],
  sound,
  captions,
  stopAtSecond,
  wordTimings = [],
  pageId,
}) => {
  const mainAudioRef = React.useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  if (words.length === 0) return null;

  const playWordAtTime = (index) => {
    const timing = wordTimings[index];
    const audio = mainAudioRef.current;
    if (!audio || !timing) return;

    audio.currentTime = timing.start;
    audio.play();

    // وقف عند نهاية الكلمة
    const checkEnd = setInterval(() => {
      if (audio.currentTime >= timing.end) {
        audio.pause();
        clearInterval(checkEnd);
      }
    }, 50);

    audio.onended = () => clearInterval(checkEnd);
  };

  const columns = chunkWords(words, 3);
  const perCol = Math.ceil(words.length / 3);

  const activeIndex = wordTimings.findIndex(
    (w) => currentTime >= w.start && currentTime <= w.end,
  );

  return (
    <div
      style={{ margin: "2% 0" }}
      className="vocabulary-panel relative bg-[#e8eff1] backdrop-blur-sm border-2 border-[#2195a6] rounded-2xl shadow-lg p-6 pt-8 w-full max-w-[60%] "
    >
      <style>{`
        .vocabulary-panel .vocabulary-word:focus-visible {
          outline: 4px solid #2563eb;
          outline-offset: 3px;
        }
      `}</style>
      {/* Header */}
      <div className="absolute top-0 left-0 bg-[#2195a6] text-white font-bold px-4 py-1 rounded-tl-2xl">
        VOCABULARY
      </div>

      {/* Subtitle */}
      <h2 className="mb-5 pl-4 mt-4 font-bold">
        Listen and repeat. Find the words and expressions in the conversation
        above.
      </h2>
      <div style={{ margin: "3em 0 2em" }}>
        {/* Audio */}
        <QuestionAudioPlayer
          ref={mainAudioRef}
          src={sound}
          captions={captions}
          stopAtSecond={stopAtSecond}
          onTimeUpdate={(t) => setCurrentTime(t)}
          pageId={pageId}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-3">
            {col.map((word, i) => {
              const num = colIndex * perCol + i + 1;
              const isActive = activeIndex === num - 1;

              return (
                <div
                  key={i}
                  role="button"
                  tabIndex={0}
                  aria-label={`Hear ${word}`}
                  onKeyDown={(event) => {
                    if (event.key !== "Enter" && event.key !== " ") return;
                    event.preventDefault();
                    event.stopPropagation();
                    if (!event.repeat) playWordAtTime(num - 1);
                  }}
                  onKeyUp={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      event.stopPropagation();
                    }
                  }}
                  onClick={() => playWordAtTime(num - 1)}
                  className={`vocabulary-word group flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer transition-all duration-300 shadow-sm
                    ${
                      isActive
                        ? "bg-[#2195a6] text-white border-[#2195a6] shadow-md scale-[1.02]"
                        : "bg-[#f5fdff] hover:bg-[#2195a6] border-transparent hover:border-[#2195a6]"
                    }`}
                >
                  <div className="flex items-center">
                    <span
                      className={`font-bold text-sm mr-3 ${
                        isActive
                          ? "text-white"
                          : "text-[#2195a6] group-hover:text-white"
                      }`}
                    >
                      {num}.
                    </span>
                    <span
                      className={`font-medium ${
                        isActive
                          ? "text-white"
                          : "text-gray-700 group-hover:text-white"
                      }`}
                    >
                      {word}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const chunkWords = (words, cols) => {
  const perCol = Math.ceil(words.length / cols);
  return Array.from({ length: cols }, (_, i) =>
    words.slice(i * perCol, (i + 1) * perCol),
  );
};

export default Vocabulary;
