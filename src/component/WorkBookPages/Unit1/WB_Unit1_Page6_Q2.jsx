import clipPage6H10 from "../../../assets/audio/WorkBook/Unit 1/Page 6 - H/Item_010_false.mp3";
import clipPage6H9 from "../../../assets/audio/WorkBook/Unit 1/Page 6 - H/Item_009_true.mp3";
import clipPage6H8 from "../../../assets/audio/WorkBook/Unit 1/Page 6 - H/Item_008_Hansel_will_play_soccer._He_won't_read_a_book.mp3";
import clipPage6H7 from "../../../assets/audio/WorkBook/Unit 1/Page 6 - H/Item_007_John_won't_read_a_book._He_will_run_in_a_race.mp3";
import clipPage6H6 from "../../../assets/audio/WorkBook/Unit 1/Page 6 - H/Item_006_Stella_won't_fly_a_kite._She_will_read_a_book.mp3";
import clipPage6H5 from "../../../assets/audio/WorkBook/Unit 1/Page 6 - H/Item_005_Sarah_will_go_to_the_beach._She_won't_ride_a_bike.mp3";
import clipPage6H4 from "../../../assets/audio/WorkBook/Unit 1/Page 6 - H/Item_004_Hansel.mp3";
import clipPage6H3 from "../../../assets/audio/WorkBook/Unit 1/Page 6 - H/Item_003_Stella.mp3";
import clipPage6H2 from "../../../assets/audio/WorkBook/Unit 1/Page 6 - H/Item_002_John.mp3";
import clipPage6H1 from "../../../assets/audio/WorkBook/Unit 1/Page 6 - H/Item_001_Sarah.mp3";
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

// ─────────────────────────────────────────────
//  🖼️  IMAGES — غيّر المسارات حسب مشروعك
// ─────────────────────────────────────────────
import sarahImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 6/SVG/Asset 5.svg";
import stellaImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 6/SVG/image.png";
import johnImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 6/SVG/jack.png";
import hanselImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 6/SVG/joan.png";
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
function renderExerciseAudioGroup({
  audio,
  id,
  src,
  label,
  children,
  style,
  key: renderKey,
  ...props
}) {
  if (!src || (Array.isArray(src) && !src.some(Boolean)))
    return (
      <div key={renderKey} {...props} style={style}>
        {children}
      </div>
    );
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
    <div
      key={renderKey}
      {...props}
      role="group"
      aria-roledescription="sentence audio"
      tabIndex={0}
      data-listening={id}
      aria-label={label}
      onKeyDown={keys}
      onKeyUp={keys}
      onClick={(event) => {
        if (
          event.target.closest('input,select,textarea,button,[role="button"]')
        )
          return;
        event.stopPropagation();
        audio.play(id, src);
      }}
      style={{
        ...style,
        position: style?.position || "relative",
        borderRadius: style?.borderRadius || 6,
        boxShadow: playing ? "0 0 0 3px #2563eb" : style?.boxShadow,
        backgroundColor: playing ? "#dbeafe" : style?.backgroundColor,
      }}
    >
      {children}
      {playing && renderExerciseSpeaker()}
    </div>
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

// بيانات الشخصيات — الترتيب: Sarah يسار فوق | John يمين فوق | Stella يسار تحت | Hansel يمين تحت
const CHARACTERS = [
  { name: "Sarah", img: null, position: "top-left" },
  { name: "John", img: null, position: "top-right" },
  { name: "Stella", img: null, position: "bottom-left" },
  { name: "Hansel", img: null, position: "bottom-right" },
];

// ─────────────────────────────────────────────
//  🎨  COLORS — كلها قابلة للتعديل
// ─────────────────────────────────────────────
const SELECTED_CIRCLE_COLOR = "#2096a6"; // لون الدائرة حول الكلمة المختارة
const SELECTED_TEXT_COLOR = "#2096a6"; // لون نص الكلمة المختارة
const WRONG_CIRCLE_COLOR = "#ef4444"; // لون الدائرة عند الخطأ — أحمر
const DEFAULT_TEXT_COLOR = "#2b2b2b"; // لون نص true/false العادي
const SENTENCE_TEXT_COLOR = "#2b2b2b"; // لون نص الجملة
const NUMBER_COLOR = "#2b2b2b"; // لون الأرقام (bold فقط)

const WRONG_BADGE_BG = "#ef4444"; // خلفية badge الخطأ
const WRONG_BADGE_TEXT_COLOR = "#ffffff"; // نص badge الخطأ

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correct: "true" | "false"
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    text: "Sarah will go to the beach. She won't ride a bike.",
    correct: "true",
  },
  {
    id: 2,
    text: "Stella won't fly a kite. She will read a book.",
    correct: "false",
  },
  {
    id: 3,
    text: "John won't read a book. He will run in a race.",
    correct: "false",
  },
  {
    id: 4,
    text: "Hansel will play soccer. He won't read a book.",
    correct: "true",
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadCircleTrueFalse_QH() {
  const listening = useExerciseListening("wb_unit1_page6_q2");

  const [answers, setAnswers] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [results, setResults] = useState({});
  const [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);
  const checkDisabled =
    showAns || ITEMS.every((item) => results[item.id] === "correct");

  const isLocked = checkDisabled;

  // ── handlers ──────────────────────────────
  const handleSelect = (id, value) => {
    if (showAns || results[id] === "correct") return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setAnnouncement("Selection updated.");
  };

  const handleCheck = () => {
    if (checkDisabled) return;
    listening.stop();
    if (
      !ITEMS.every(
        (item) =>
          answers[item.id] !== undefined &&
          answers[item.id] !== null &&
          answers[item.id] !== "",
      )
    ) {
      ValidationAlert.info("Please choose an answer for each question.");
      setAnnouncement("Please choose an answer for each question.");
      return;
    }
    const next = Object.fromEntries(
      ITEMS.map((item) => [
        item.id,
        results[item.id] === "correct" || answers[item.id] === item.correct
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
      `Score: ${score} out of ${ITEMS.length}. Correct answers are locked; incorrect answers can be changed.`,
    );
    if (score === ITEMS.length) {
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score)
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    listening.stop();
    setAnswers(Object.fromEntries(ITEMS.map((i) => [i.id, i.correct])));
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
    setAnnouncement("Selections cleared.");
  };

  // ── helpers ───────────────────────────────
  const isWrong = (item) => !showAns && results[item.id] === "wrong";

  // ── render one option (true or false) ─────
  const renderOption = (item, optionValue) => {
    const selected = answers[item.id] === optionValue;
    const wrong = isWrong(item) && selected;
    const showCorrect = showAns && item.correct === optionValue;
    const isCircled = selected || showCorrect;

    return (
      <div
        data-listening={`option-${item.id}-${optionValue}`}
        role="button"
        tabIndex={0}
        data-keyboard-choice
        {...activationKeys}
        aria-label={`Question ${item.id}. ${item.text} Choose ${optionValue}.`}
        aria-pressed={answers[item.id] === optionValue}
        aria-disabled={showAns || results[item.id] === "correct"}
        key={optionValue}
        className="ltf-option-wrap"
        onClick={(e) => {
          listening.play(
            `option-${item.id}-${optionValue}`,
            optionValue === "true" ? clipPage6H9 : clipPage6H10,
          );
          (() => handleSelect(item.id, optionValue))(e);
        }}
        style={((base) => ({
          ...base,
          position: "relative",
          boxShadow:
            listening.activeId === `option-${item.id}-${optionValue}`
              ? "0 0 0 3px #2563eb"
              : base.boxShadow,
        }))(
          ((base) => ({
            ...base,
            borderRadius: 999,
            background:
              answers[item.id] === optionValue &&
              !showAns &&
              results[item.id] === undefined
                ? "#dbeafe"
                : base.background,
            boxShadow:
              answers[item.id] === optionValue
                ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}`
                : undefined,
          }))({
            ...{ cursor: isLocked ? "default" : "pointer" },
            borderRadius:
              { cursor: isLocked ? "default" : "pointer" }.borderRadius ||
              "6px",
            background:
              answers[item.id] === optionValue &&
              !showAns &&
              results[item.id] === undefined
                ? "#dbeafe"
                : { cursor: isLocked ? "default" : "pointer" }.background,
            boxShadow:
              answers[item.id] === optionValue
                ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}`
                : undefined,
          }),
        )}
      >
        <span
          className={`ltf-option ${isCircled ? "ltf-option--circled" : ""} ${wrong ? "ltf-option--wrong" : ""}`}
          style={{
            // borderColor:
            //   answers[item.id] === optionValue && (showAns || results[item.id])
            //     ? showAns || results[item.id] === "correct"
            //       ? "#16a34a"
            //       : "#ef4444"
            //     : undefined,
          }}
        >
          {optionValue}
        </span>

        {/* ✕ badge على الاختيار الغلط */}
        {wrong && <div className="ltf-badge">✕</div>}
        {listening.activeId === `option-${item.id}-${optionValue}` &&
          renderExerciseSpeaker()}
      </div>
    );
  };

  // ── render ────────────────────────────────
  return (
    <div
      data-adapt-scope="Unit1_WB_Unit1_Page6_Q2"
      className="main-container-component"
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="Unit1_WB_Unit1_Page6_Q2"] input:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page6_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page6_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page6_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="Unit1_WB_Unit1_Page6_Q2"] [data-grid-cell]:focus-visible {outline-offset:-4px;position:relative;z-index:1;} [data-adapt-scope="Unit1_WB_Unit1_Page6_Q2"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        /* ── Characters Scene ── */
   .ltf-scene {
  width: 100%;
  max-width: clamp(500px, 90vw, 1100px);
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;
  gap: clamp(10px, 2vw, 30px);
}

/* كل شخصية: صورة + اسم */
.ltf-char {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(4px, 0.6vw, 8px);
}

        /* Sarah: top-left — تتحرك شوي لليسار */
        .ltf-char--sarah  { width : clamp(160px, 0.6vw, 160px)  }
        /* John: top-right — تتحرك شوي لليمين */
        .ltf-char--john   { width : clamp(160px, 0.6vw, 160px)}
        /* Stella: bottom-left — في المنتصف بين sarah وjohn */
        .ltf-char--stella { width : clamp(160px, 0.6vw, 160px)}
        /* Hansel: bottom-right */
        .ltf-char--hansel { width : clamp(140px, 0.6vw, 140px) }

        .ltf-char-img {
          width: clamp(130px, 18vw, 220px);
          height: auto;
          object-fit: contain;
          display: block;
        }

        .ltf-char-name {
          font-size: clamp(14px, 1.8vw, 20px);
          font-weight: 700;
          color: #2b2b2b;
          text-align: center;
          line-height: 1;
        }

        /* ── Items list ── */
        .ltf-list {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 2vw, 22px);
          width: 100%;
  
    margin-top: 15px;
        }

        /* ── Single row: num | sentence | true | false ── */
        .ltf-row {
          display: grid;
          grid-template-columns:
            clamp(18px, 2vw, 26px)    /* number */
            minmax(0, 1fr)             /* sentence */
            clamp(50px, 7vw, 80px)    /* true */
            clamp(56px, 8vw, 90px);   /* false */
          gap: clamp(8px, 1.2vw, 16px);
          align-items: center;
          width: 100%;
        }

        /* Number — bold فقط */
        .ltf-num {
          font-size: clamp(15px, 1.9vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1.5;
        }

        /* Sentence — no bold */
        .ltf-sentence {
          font-size: clamp(20px, 1.9vw, 20px);
          color: ${SENTENCE_TEXT_COLOR};
          line-height: 1.5;
        }

        /* Option wrapper — for badge positioning */
        .ltf-option-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* true / false text */
        .ltf-option {
          font-size: clamp(20px, 1.9vw, 20px);
          line-height: 1.5;
          padding: clamp(3px, 0.5vw, 6px) clamp(8px, 1.2vw, 14px);
          border-radius: 999px;
          border: 2px solid transparent;
          user-select: none;
          white-space: nowrap;
          transition: border-color 0.15s, color 0.15s;
          display: inline-block;
        }

        /* Circled — correct selection or show answer */
        // .ltf-option--circled {
        //   border-color: ${SELECTED_CIRCLE_COLOR};
        // }

        /* Wrong selection */
        // .ltf-option--wrong {
        //   border-color: ${WRONG_CIRCLE_COLOR};
        // }

        /* ✕ badge */
        .ltf-badge {
          position: absolute;
          top: -8px;
          right: -6px;
          width: clamp(16px, 1.8vw, 21px);
          height: clamp(16px, 1.8vw, 21px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT_COLOR};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(9px, 1vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Buttons */
        .ltf-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .ltf-row {
            grid-template-columns:
              clamp(16px, 3vw, 20px)
              minmax(0, 1fr)
              clamp(44px, 12vw, 65px)
              clamp(48px, 13vw, 70px);
            gap: 6px;
          }
          .ltf-sentence { font-size: 20px; }
          .ltf-option   { font-size: 20px; padding: 3px 8px; }
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
          subTitle="Check the picture or text clue carefully, then choose the correct two-way answer for each item."
          sectionLetter="H"
          title={
            <>
              Look, read, and circle{" "}
              <span
                style={{
                  color: "#f89631",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                true
              </span>{" "}
              or{" "}
              <span
                style={{
                  color: "#f89631",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                false
              </span>
              .
            </>
          }
        />

        {/* ── Characters Scene: 2x2 grid ── */}
        <div className="ltf-scene">
          {/* Sarah — top left */}
          <div className="ltf-char ltf-char--sarah">
            <img
              src={sarahImg}
              alt={"Sarah thinking about relaxing on a beach."}
              className="ltf-char-img"
            />
            <span className="ltf-char-name">
              {renderExerciseAudioText({
                audio: listening,
                id: "name-Sarah",
                src: clipPage6H1,
                label: "Sarah",
                children: "Sarah",
              })}
            </span>
          </div>

          {/* John — top right */}
          <div className="ltf-char ltf-char--john">
            <img
              src={johnImg}
              alt={"John thinking about reading a book."}
              className="ltf-char-img"
            />
            <span className="ltf-char-name">
              {renderExerciseAudioText({
                audio: listening,
                id: "name-John",
                src: clipPage6H2,
                label: "John",
                children: "John",
              })}
            </span>
          </div>

          {/* Stella — bottom left-center */}
          <div className="ltf-char ltf-char--stella">
            <img
              src={stellaImg}
              alt={"Stella thinking about flying a kite."}
              className="ltf-char-img"
            />
            <span className="ltf-char-name">
              {renderExerciseAudioText({
                audio: listening,
                id: "name-Stella",
                src: clipPage6H3,
                label: "Stella",
                children: "Stella",
              })}
            </span>
          </div>

          {/* Hansel — bottom right-center */}
          <div className="ltf-char ltf-char--hansel">
            <img
              src={hanselImg}
              alt={"Hansel thinking about playing soccer."}
              className="ltf-char-img"
            />
            <span className="ltf-char-name">
              {renderExerciseAudioText({
                audio: listening,
                id: "name-Hansel",
                src: clipPage6H4,
                label: "Hansel",
                children: "Hansel",
              })}
            </span>
          </div>
        </div>

        {/* ── Items ── */}
        <div className="ltf-list">
          {ITEMS.map((item) =>
            renderExerciseAudioGroup({
              audio: listening,
              id: `sentence-${item.id}`,
              src: [clipPage6H5, clipPage6H6, clipPage6H7, clipPage6H8][
                item.id - 1
              ],
              label: item.text,
              className: "ltf-row",
              style: undefined,
              key: item.id,
              children: (
                <>
                  {/* Number */}
                  <span className="ltf-num">{item.id}</span>

                  {/* Sentence */}
                  <span className="ltf-sentence">{item.text}</span>

                  {/* true */}
                  {renderOption(item, "true")}

                  {/* false */}
                  {renderOption(item, "false")}
                </>
              ),
            }),
          )}
        </div>

        {/* ── Buttons ── */}
        <div className="ltf-buttons">
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
