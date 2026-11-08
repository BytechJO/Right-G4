import clipPage73E10 from "../../../assets/audio/ClassBook/Unit 8/Page 73 - E/Item_010_goodbye_to_her_friends.mp3";
import clipPage73E9 from "../../../assets/audio/ClassBook/Unit 8/Page 73 - E/Item_009_party_came_to_an_end,_and_Cynthia(wave).mp3";
import clipPage73E8 from "../../../assets/audio/ClassBook/Unit 8/Page 73 - E/Item_008_many_games_with_her_friends._The_birthday.mp3";
import clipPage73E7 from "../../../assets/audio/ClassBook/Unit 8/Page 73 - E/Item_007_opening_the_gifts,_Cynthia(play).mp3";
import clipPage73E6 from "../../../assets/audio/ClassBook/Unit 8/Page 73 - E/Item_006_her_many_gifts_and_presents._After.mp3";
import clipPage73E5 from "../../../assets/audio/ClassBook/Unit 8/Page 73 - E/Item_005_as_she(open).mp3";
import clipPage73E4 from "../../../assets/audio/ClassBook/Unit 8/Page 73 - E/Item_004_as_she_blew_out_the_candles_on_her_cake._Cynthia_was_extremely(excite).mp3";
import clipPage73E3 from "../../../assets/audio/ClassBook/Unit 8/Page 73 - E/Item_003_a_delicious_chocolate_and_vanilla_cake._Her_family_and_friends(clap).mp3";
import clipPage73E2 from "../../../assets/audio/ClassBook/Unit 8/Page 73 - E/Item_002_her_birthday_in_August._Her_mom(bake).mp3";
import clipPage73E1 from "../../../assets/audio/ClassBook/Unit 8/Page 73 - E/Item_001_Cynthia(celebrate).mp3";
import {
  useEffect as useListeningEffect,
  useRef as useListeningRef,
  useState as useListeningState,
} from "react";
import { useAudio } from "../../../context/AudioContext";
import { FaVolumeUp as ListeningSpeakerIcon } from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
function useExerciseListening(pageId) {
  const coordinator = useAudio();
  const audioRef = useListeningRef(null),
    generation = useListeningRef(0);
  const [activeId, setActiveId] = useListeningState(null),
    [error, setError] = useListeningState("");
  const clearOwned = () => {
    const current = audioRef.current;
    if (current) {
      current.onended =
        current.onplaying =
        current.onerror =
        current.onpause =
          null;
      current.pause();
      current.remove();
      audioRef.current = null;
    }
  };
  const stop = () => {
    generation.current++;
    clearOwned();
    setActiveId(null);
    setError("");
  };
  const play = (id, sources) => {
    const queue = (Array.isArray(sources) ? sources : [sources]).filter(
      Boolean,
    );
    if (!queue.length) return;
    stop();
    const token = generation.current;
    let index = 0;
    const next = () => {
      if (token !== generation.current) return;
      clearOwned();
      if (index >= queue.length) {
        setActiveId(null);
        return;
      }
      const media = new Audio(queue[index++]);
      media.hidden = true;
      media.dataset.exerciseListening = pageId;
      document.body.appendChild(media);
      audioRef.current = media;
      const current = () =>
        token === generation.current && audioRef.current === media;
      const fail = () => {
        if (!current()) return;
        generation.current++;
        clearOwned();
        setActiveId(null);
        setError("Audio could not be played. Please try again.");
      };
      media.onplaying = () => {
        if (current()) setActiveId(id);
      };
      media.onended = () => {
        if (current()) next();
      };
      media.onerror = fail;
      media.onpause = () => {
        if (!current()) return;
        generation.current++;
        clearOwned();
        setActiveId(null);
      };
      document.querySelectorAll("audio,video").forEach((other) => {
        if (other !== media) other.pause();
      });
      coordinator?.registerAudio(media, null, pageId);
      media.play().catch(fail);
    };
    next();
  };
  useListeningEffect(
    () => () => {
      generation.current++;
      const media = audioRef.current;
      if (media) {
        media.onended = media.onplaying = media.onerror = media.onpause = null;
        media.pause();
        media.remove();
        audioRef.current = null;
      }
    },
    [],
  );
  return {
    play,
    stop,
    activeId,
    error,
  };
}
function renderExerciseSpeaker() {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        top: -10,
        right: -10,
        width: 22,
        height: 22,
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
        color: "black",
        boxShadow: "0 1px 3px rgba(0,0,0,.25)",
        pointerEvents: "none",
        zIndex: 3,
      }}
    >
      <ListeningSpeakerIcon size={12} />
    </span>
  );
}
function renderExerciseAudioText({ audio, id, src, label, children }) {
  if (!src || (Array.isArray(src) && !src.some(Boolean))) return children;
  const playing = audio.activeId === id;
  const keys = (event) => {
    if (
      event.target !== event.currentTarget ||
      (event.key !== "Enter" && event.key !== " ")
    )
      return;
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "keydown" && !event.repeat) audio.play(id, src);
  };
  return (
    <span
      role="button"
      tabIndex={0}
      data-listening={id}
      aria-label={label}
      onClick={(event) => {
        event.stopPropagation();
        audio.play(id, src);
      }}
      onKeyDown={keys}
      onKeyUp={keys}
      style={{
        position: "relative",
        cursor: "pointer",
        borderRadius: 6,
        boxShadow: playing ? "0 0 0 3px #2563eb" : undefined,
        backgroundColor: playing ? "#dbeafe" : undefined,
      }}
    >
      {children}
      {playing && renderExerciseSpeaker()}
    </span>
  );
}

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
const fieldKeys = {
  onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
};
const normalizeAnswer = (value) =>
  value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u2018\u2019\u201A\u201B\u0060\u00B4']/g, "")
    .replace(/[.,!?;:\u2026\u201c\u201d"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANSWER_COLOR = "#c81e1e";
const TEXT_COLOR = "#2b2b2b";
const VERB_COLOR = "#e07b00";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  STORY PARTS
//
//  المصفوفة تمثل القصة كلها جزء جزء:
//  { t: "text",  v: "..." }              → نص عادي
//  { t: "verb",  v: "(celebrate)" }      → الفعل بالأقواس باللون البرتقالي
//  { t: "given", v: "celebrated" }       → إجابة معطاة (أول فعل — مثال)
//  { t: "input", id, correct, answer }   → input يكتبه الطالب
//  { t: "br" }                           → سطر جديد
// ─────────────────────────────────────────────
const PARTS = [
  { t: "text", v: "Cynthia" },
  { t: "verb", v: "(celebrate)" },
  {
    t: "input",
    id: "celebrate",
    correct: ["celebrated"],
    answer: "celebrated",
  },
  { t: "text", v: "her birthday in August. Her mom" },
  { t: "verb", v: "(bake)" },
  { t: "input", id: "bake", correct: ["baked"], answer: "baked" },
  {
    t: "text",
    v: "a delicious chocolate and vanilla cake. Her family and friends",
  },
  { t: "verb", v: "(clap)" },
  { t: "input", id: "clap", correct: ["clapped"], answer: "clapped" },
  {
    t: "text",
    v: "as she blew out the candles on her cake. Cynthia was extremely",
  },
  { t: "verb", v: "(excite)" },
  { t: "input", id: "excite", correct: ["excited"], answer: "excited" },
  { t: "text", v: "as she" },
  { t: "verb", v: "(open)" },
  { t: "input", id: "open", correct: ["opened"], answer: "opened" },
  {
    t: "text",
    v: "her many gifts and presents. After opening the gifts, Cynthia",
  },
  { t: "verb", v: "(play)" },
  { t: "input", id: "play", correct: ["played"], answer: "played" },
  {
    t: "text",
    v: "many games with her friends. The birthday party came to an end, and Cynthia",
  },
  { t: "verb", v: "(wave)" },
  { t: "input", id: "wave", correct: ["waved"], answer: "waved" },
  { t: "text", v: "goodbye to her friends." },
];

const ALL_INPUTS = PARTS.filter((p) => p.t === "input");

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadCompleteStory_QE() {
  const listening = useExerciseListening("sb_review8_page2_q3");

  const [answers, setAnswers] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [results, setResults] = useState({});
  const [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);
  const answerTargets = ALL_INPUTS.map((item) => ({
    key: item.id,
    correct: Array.isArray(item.correct) ? item.correct : [item.correct],
    answer: item.answer ?? item.correct,
    label: `Blank ${ALL_INPUTS.indexOf(item) + 1}. Write the past-tense form of ${item.id} in the story.`,
  }));
  const checkDisabled =
    showAns || answerTargets.every((item) => results[item.key] === "correct");

  const handleChange = (key, value) => {
    if (showAns || results[key] === "correct") return;
    if (!answerTargets.some((item) => item.key === key)) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleCheck = () => {
    if (checkDisabled) return;
    listening.stop();
    if (!answerTargets.every((item) => answers[item.key]?.trim())) {
      setAnnouncement("Please complete all answers first.");
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    const next = Object.fromEntries(
      answerTargets.map((item) => [
        item.key,
        results[item.key] === "correct" ||
        item.correct.some(
          (answer) =>
            normalizeAnswer(answers[item.key] || "") ===
            normalizeAnswer(answer),
        )
          ? "correct"
          : "wrong",
      ]),
    );
    const score = Object.values(next).filter(
      (value) => value === "correct",
    ).length;
    setResults(next);
    setShowResults(true);
    setAnnouncement(
      `Score: ${score} out of ${answerTargets.length}. Correct answers are locked; incorrect answers can be changed.`,
    );
    if (score === answerTargets.length) {
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);
    } else if (score)
      ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);
    else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);
  };

  const handleShowAnswer = () => {
    listening.stop();
    setAnswers(
      Object.fromEntries(answerTargets.map((item) => [item.key, item.answer])),
    );
    setResults({});
    setShowResults(false);
    setShowAns(true);
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {
    listening.stop();
    setAnswers({});
    setResults({});
    setShowResults(false);
    setShowAns(false);
    setAnnouncement("Answers and feedback cleared.");
  };

  const isWrongPart = (item) => !showAns && results[item.id] === "wrong";

  const renderPart = (part, i) => {
    if (part.t === "text") {
      return (
        <span key={i} className="rcs-text">
          {part.v}
        </span>
      );
    }

    if (part.t === "verb") {
      return (
        <span key={i} className="rcs-verb">
          {part.v}
        </span>
      );
    }

    if (part.t === "given") {
      return (
        <span key={i} className="rcs-given">
          {part.v}
        </span>
      );
    }

    // input
    const wrong = isWrongPart(part);

    const value = answers[part.id] || "";
    const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

    return (
      <span key={part.id} className="rcs-input-wrap">
        <input
          placeholder="Answer"
          aria-invalid={results[part.id] === "wrong"}
          title={
            answerTargets.find((target) => target.key === part.id)?.label ||
            "Write an answer"
          }
          aria-label={
            answerTargets.find((target) => target.key === part.id)?.label ||
            "Write an answer"
          }
          {...fieldKeys}
          type="text"
          className={[
            "rcs-input",
            wrong ? "rcs-input--wrong" : "",
            showAns ? "rcs-input--answer" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          value={value}
          disabled={showAns || results[part.id] === "correct"}
          onChange={(e) => handleChange(part.id, e.target.value, part.correct)}
          style={{
            ...{ borderBottomColor: uColor, color: tColor },
            borderBottomColor:
              showAns || results[part.id] === "correct"
                ? "#16a34a"
                : results[part.id] === "wrong"
                  ? "#ef4444"
                  : undefined,
          }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <span className="rcs-badge">✕</span>}
      </span>
    );
  };

  return (
    <div
      data-adapt-scope="review7&8_Review8_Page2_Q3"
      className="main-container-component"
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="review7&8_Review8_Page2_Q3"] input:focus-visible, [data-adapt-scope="review7&8_Review8_Page2_Q3"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review7&8_Review8_Page2_Q3"] [data-grid-cell]:focus-visible, [data-adapt-scope="review7&8_Review8_Page2_Q3"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}
[data-adapt-scope="review7&8_Review8_Page2_Q3"] input[aria-invalid="true"]:focus {border-bottom-color:#ef4444 !important;}
`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        /* ── Story paragraph ── */
        .rcs-story {
          font-size: clamp(14px, 1.7vw, 20px);
          line-height: 2.8;
          color: ${TEXT_COLOR};
          width: 100%;
          word-break: break-word;
                    margin : 4% 0 ;

        }

        .rcs-text {
          color: ${TEXT_COLOR};
        }

        .rcs-verb {
          color: ${VERB_COLOR};
          font-style: normal;
        }

        /* معطى — أول فعل مثال */
        .rcs-given {
          color: ${TEXT_COLOR};
          border-bottom: 1.5px solid ${INPUT_UNDERLINE_DEFAULT};
          padding: 0 clamp(10px, 1.5vw, 20px);
          display: inline-block;
          min-width: clamp(60px, 8vw, 110px);
          text-align: center;
        }

        /* Input wrap */
        .rcs-input-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          min-width: clamp(70px, 9vw, 130px);
          margin: 0 2px;
        }

        .rcs-input {
          width: 230px;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
          text-align: center;
          min-width: clamp(70px, 9vw, 130px);
        }
        .rcs-input:disabled  { opacity: 1; cursor: default; }
        .rcs-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rcs-input--answer   { color: ${INPUT_ANSWER_COLOR}; font-weight: 700; }

        /* ✕ badge */
        .rcs-badge {
          position: absolute;
          top: -8px; right: -4px;
          width: clamp(14px, 1.6vw, 18px);
          height: clamp(14px, 1.6vw, 18px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        .rcs-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px, 2vw, 22px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* ── Header ── */}
        <ExerciseHeader
          subTitle="Read the story for meaning first, then change each verb in parentheses to the correct past-tense form."
          isReview
          sectionLetter="E"
          title={
            <>
              Read and complete the story. Write the past tense of each verb in
              parenthesis.
            </>
          }
        />

        {/* ── Story ── */}
        <div className="rcs-story">
          {renderExerciseAudioText({
            audio: listening,
            id: "story-1",
            src: clipPage73E1,
            label: [PARTS[0], PARTS[1]].map((part) => part.v).join(" "),
            children: (
              <>{[PARTS[0], PARTS[1]].map((part, i) => renderPart(part, i))}</>
            ),
          })}
          {renderPart(PARTS[2], 2)}
          {renderExerciseAudioText({
            audio: listening,
            id: "story-2",
            src: clipPage73E2,
            label: [PARTS[3], PARTS[4]].map((part) => part.v).join(" "),
            children: (
              <>{[PARTS[3], PARTS[4]].map((part, i) => renderPart(part, i))}</>
            ),
          })}
          {renderPart(PARTS[5], 5)}
          {renderExerciseAudioText({
            audio: listening,
            id: "story-3",
            src: clipPage73E3,
            label: [PARTS[6], PARTS[7]].map((part) => part.v).join(" "),
            children: (
              <>{[PARTS[6], PARTS[7]].map((part, i) => renderPart(part, i))}</>
            ),
          })}
          {renderPart(PARTS[8], 8)}
          {renderExerciseAudioText({
            audio: listening,
            id: "story-4",
            src: clipPage73E4,
            label: [PARTS[9], PARTS[10]].map((part) => part.v).join(" "),
            children: (
              <>{[PARTS[9], PARTS[10]].map((part, i) => renderPart(part, i))}</>
            ),
          })}
          {renderPart(PARTS[11], 11)}
          {renderExerciseAudioText({
            audio: listening,
            id: "story-5",
            src: clipPage73E5,
            label: [PARTS[12], PARTS[13]].map((part) => part.v).join(" "),
            children: (
              <>
                {[PARTS[12], PARTS[13]].map((part, i) => renderPart(part, i))}
              </>
            ),
          })}
          {renderPart(PARTS[14], 14)}
          {renderExerciseAudioText({
            audio: listening,
            id: "story-6",
            src: clipPage73E6,
            label: [
              {
                ...PARTS[15],
                v: PARTS[15].v.slice(0, PARTS[15].v.indexOf("opening")),
              },
            ]
              .map((part) => part.v)
              .join(" "),
            children: (
              <>
                {[
                  {
                    ...PARTS[15],
                    v: PARTS[15].v.slice(0, PARTS[15].v.indexOf("opening")),
                  },
                ].map((part, i) => renderPart(part, i))}
              </>
            ),
          })}
          {renderExerciseAudioText({
            audio: listening,
            id: "story-7",
            src: clipPage73E7,
            label: [
              {
                ...PARTS[15],
                v: PARTS[15].v.slice(PARTS[15].v.indexOf("opening")),
              },
              PARTS[16],
            ]
              .map((part) => part.v)
              .join(" "),
            children: (
              <>
                {[
                  {
                    ...PARTS[15],
                    v: PARTS[15].v.slice(PARTS[15].v.indexOf("opening")),
                  },
                  PARTS[16],
                ].map((part, i) => renderPart(part, i))}
              </>
            ),
          })}
          {renderPart(PARTS[17], 17)}
          {renderExerciseAudioText({
            audio: listening,
            id: "story-8",
            src: clipPage73E8,
            label: [
              {
                ...PARTS[18],
                v: PARTS[18].v.slice(0, PARTS[18].v.indexOf("party")),
              },
            ]
              .map((part) => part.v)
              .join(" "),
            children: (
              <>
                {[
                  {
                    ...PARTS[18],
                    v: PARTS[18].v.slice(0, PARTS[18].v.indexOf("party")),
                  },
                ].map((part, i) => renderPart(part, i))}
              </>
            ),
          })}
          {renderExerciseAudioText({
            audio: listening,
            id: "story-9",
            src: clipPage73E9,
            label: [
              {
                ...PARTS[18],
                v: PARTS[18].v.slice(PARTS[18].v.indexOf("party")),
              },
              PARTS[19],
            ]
              .map((part) => part.v)
              .join(" "),
            children: (
              <>
                {[
                  {
                    ...PARTS[18],
                    v: PARTS[18].v.slice(PARTS[18].v.indexOf("party")),
                  },
                  PARTS[19],
                ].map((part, i) => renderPart(part, i))}
              </>
            ),
          })}
          {renderPart(PARTS[20], 20)}
          {renderExerciseAudioText({
            audio: listening,
            id: "story-10",
            src: clipPage73E10,
            label: [PARTS[21]].map((part) => part.v).join(" "),
            children: <>{[PARTS[21]].map((part, i) => renderPart(part, i))}</>,
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rcs-buttons">
          <div className="action-buttons-container">
            <button
              type="button"
              aria-label="Start Again"
              {...activationKeys}
              ref={resetButtonRef}
              onClick={handleReset}
              className="try-again-button"
            >
              Start Again ↻
            </button>
            <button
              type="button"
              aria-label="Show Answer"
              {...activationKeys}
              onClick={handleShowAnswer}
              className="show-answer-btn swal-continue"
            >
              Show Answer
            </button>
            <button
              type="button"
              aria-label="Check Answer"
              {...activationKeys}
              onClick={handleCheck}
              disabled={checkDisabled}
              style={{ cursor: checkDisabled ? "not-allowed" : "pointer" }}
              className="check-button2"
            >
              Check Answer ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
