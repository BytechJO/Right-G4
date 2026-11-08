import clipC8 from "../../../assets/audio/ClassBook/Unit 3/Page 26 - C/Item_008_The_tree_house_had_a_desk.mp3";
import clipC7 from "../../../assets/audio/ClassBook/Unit 3/Page 26 - C/Item_007_It_had_large_windows.mp3";
import clipC6 from "../../../assets/audio/ClassBook/Unit 3/Page 26 - C/Item_006_It_had_beds_and_tables.mp3";
import clipC5 from "../../../assets/audio/ClassBook/Unit 3/Page 26 - C/Item_005_The_tree_house_had_a_TV.mp3";
import clipC4 from "../../../assets/audio/ClassBook/Unit 3/Page 26 - C/Item_004_the_weekends.mp3";
import clipC3 from "../../../assets/audio/ClassBook/Unit 3/Page 26 - C/Item_003_bookcases_in_the_tree_house._We_had_a_TV,_so_we_could_watch_movies_on.mp3";
import clipC2 from "../../../assets/audio/ClassBook/Unit 3/Page 26 - C/Item_002_big._It_had_chairs_and_tables._It_had_large_windows._There_were_two.mp3";
import clipC1 from "../../../assets/audio/ClassBook/Unit 3/Page 26 - C/Item_001_Two_years_ago,_my_friends_and_I_built_a_tree_house_in_my_backyard._It_wa.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import sound from "../../../assets/audio/ClassBook/Grade 4/cd18pg26-instruction1-adult-lady_6tvKwa0U.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

// ─────────────────────────────────────────────
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 26/SVG/Asset 5.svg";

function useExerciseListening(pageId) {
  const coordinator = useAudio();
  const audioRef = useListeningRef(null),
    generation = useListeningRef(0);
  const [activeId, setActiveId] = useListeningState(null),
    [error, setError] = useListeningState("");
  const clearOwned = () => {
    const current = audioRef.current;
    if (current) {
      current.onended = current.onplaying = current.onerror = current.onpause = null;
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
    const queue = (Array.isArray(sources) ? sources : [sources]).filter(Boolean);
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
      const current = () => token === generation.current && audioRef.current === media;
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
      document.querySelectorAll("audio,video").forEach(other => {
        if (other !== media) other.pause();
      });
      coordinator?.registerAudio(media, null, pageId);
      media.play().catch(fail);
    };
    next();
  };
  useListeningEffect(() => () => {
    generation.current++;
    const media = audioRef.current;
    if (media) {
      media.onended = media.onplaying = media.onerror = media.onpause = null;
      media.pause();
      media.remove();
      audioRef.current = null;
    }
  }, []);
  return {
    play,
    stop,
    activeId,
    error
  };
}
function renderExerciseSpeaker() {
  return <span aria-hidden="true" style={{
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
    zIndex: 3
  }}><ListeningSpeakerIcon size={12} /></span>;
}
function renderExerciseAudioText({
  audio,
  id,
  src,
  label,
  children
}) {
  if (!src || Array.isArray(src) && !src.some(Boolean)) return children;
  const playing = audio.activeId === id;
  const keys = event => {
    if (event.target !== event.currentTarget || event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "keydown" && !event.repeat) audio.play(id, src);
  };
  return <span role="button" tabIndex={0} data-listening={id} aria-label={label} onClick={event => {
    event.stopPropagation();
    audio.play(id, src);
  }} onKeyDown={keys} onKeyUp={keys} style={{
    position: "relative",
    cursor: "pointer",
    borderRadius: 6,
    boxShadow: playing ? "0 0 0 3px #2563eb" : undefined,
    backgroundColor: playing ? "#dbeafe" : undefined
  }}>{children}{playing && renderExerciseSpeaker()}</span>;
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
  if (!src || Array.isArray(src) && !src.some(Boolean)) return <div key={renderKey} {...props} style={style}>{children}</div>;
  const playing = audio.activeId === id;
  const keys = event => {
    if (event.target !== event.currentTarget || event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "keydown" && !event.repeat) audio.play(id, src);
  };
  return <div key={renderKey} {...props} role="group" aria-roledescription="sentence audio" tabIndex={0} data-listening={id} aria-label={label} onKeyDown={keys} onKeyUp={keys} onClick={event => {
    if (event.target.closest('input,select,textarea,button,[role="button"]')) return;
    event.stopPropagation();
    audio.play(id, src);
  }} style={{
    ...style,
    position: style?.position || "relative",
    borderRadius: style?.borderRadius || 6,
    boxShadow: playing ? "0 0 0 3px #2563eb" : style?.boxShadow,
    backgroundColor: playing ? "#dbeafe" : style?.backgroundColor
  }}>{children}{playing && renderExerciseSpeaker()}</div>;
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
const BOX_BORDER_DEFAULT = "#2096a6";
const BOX_BORDER_WRONG = "#2096a6";
const BOX_TEXT_DEFAULT = "#2b2b2b";
const BOX_TEXT_ANSWER = "#c81e1e";
const SENTENCE_COLOR = "#2b2b2b";
const NUMBER_COLOR = "#2b2b2b";
const PARA_COLOR = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  PARAGRAPH
// ─────────────────────────────────────────────
const PARAGRAPH = `Two years ago, my friends and I built a tree house in my backyard. It was big. It had chairs and tables. It had large windows. There were two bookcases in the tree house. We had a TV, so we could watch movies on the weekends.`;

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    sentence: "The tree house had a TV.",
    correct: ["true", "True"],
    answer: "True",
  },
  {
    id: 2,
    sentence: "It had beds and tables.",
    correct: ["false", "False"],
    answer: "False",
  },
  {
    id: 3,
    sentence: "It had large windows.",
    correct: ["true", "True"],
    answer: "True",
  },
  {
    id: 4,
    sentence: "The tree house had a desk.",
    correct: ["false", "False"],
    answer: "False",
  },
];
const captions = [
  {
    start: 0.44,
    end: 2.88,
    text: "Page 26, write activities.",
  },
  {
    start: 2.88,
    end: 9.74,
    text: "Exercise C. Listen, read, and write. True or false.",
  },
  {
    start: 9.74,
    end: 19.98,
    text: "Two years ago, my friends and I built a tree house in my backyard. It was big. It had chairs and tables. It had large windows.",
  },
  {
    start: 21.4,
    end: 27.58,
    text: "There were two bookcases in the tree house. We had a TV so we could watch movies on the weekends.",
  },
];
// ─────────────────────────────────────────────
//  🔧  HELPERS
// ─────────────────────────────────────────────
const isCorrect = (value, alternatives) =>
  alternatives.some(
    (answer) => normalizeAnswer(value) === normalizeAnswer(answer),
  );

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ListenReadTrueFalse_QC() {
  const listening=useExerciseListening("sb_unit3_page5_q3");

  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);

  const [showAns, setShowAns] = useState(false);
  const checkDisabled =
    showAns || ITEMS.every((item) => results[item.id] === "correct");

  const handleChange = (id, value) => {
    if (
      showAns ||
      results[id] === "correct" ||
      !ITEMS.some((item) => item.id === id)
    )
      return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleCheck = () => {
    if (checkDisabled) return;listening.stop();
    if (!ITEMS.every((item) => answers[item.id]?.trim())) {
      setAnnouncement("Please complete all answers first.");
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    const next = Object.fromEntries(
      ITEMS.map((item) => [
        item.id,
        results[item.id] === "correct" ||
        isCorrect(answers[item.id] || "", item.correct)
          ? "correct"
          : "wrong",
      ]),
    );
    const score = Object.values(next).filter(
      (result) => result === "correct",
    ).length;
    setResults(next);
    setAnnouncement(
      `Score: ${score} out of ${ITEMS.length}. Correct answers are locked; incorrect answers can be changed.`,
    );
    if (score === ITEMS.length) {
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {listening.stop();
    const filled = {};
    ITEMS.forEach((item) => {
      filled[item.id] = item.answer;
    });
    setAnswers(filled);
    setResults({});
    setShowAns(true);
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {listening.stop();
    setAnswers({});
    setResults({});
    setShowAns(false);
    setAnnouncement("Answers and feedback cleared.");
  };

  const isWrong = (item) => !showAns && results[item.id] === "wrong";
  const isDisabled = (item) => showAns || results[item.id] === "correct";

  return (
    <div data-listening-scope={"sb_unit3_page5_q3"} data-unit3-scope="Unit3_Page5_Q3" className="main-container-component"><style>{`[data-listening-scope="sb_unit3_page5_q3"] [data-listening]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
     <style>{`[data-unit3-scope="Unit3_Page5_Q3"] input:focus-visible, [data-unit3-scope="Unit3_Page5_Q3"] [data-keyboard-choice]:focus-visible { outline: 4px solid #2563eb; outline-offset: 3px; border-radius: 6px; }`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        /* ── Top: paragraph + image ── */
        .lrtf-top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(12px, 1.8vw, 22px);
          align-items: flex-start;
          width: 100%;
        }

        .lrtf-para {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${PARA_COLOR};
          line-height: 1.8;
          margin: 0;
        }

        .lrtf-img {
          width: clamp(160px, 22vw, 280px);
          height: auto;
          display: block;
          border-radius: 8px;
          flex-shrink: 0;
        }

        /* ── Items list ── */
        .lrtf-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 16px);
          width: 100%;
        }

        /* Single row: num | sentence | box */
        .lrtf-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
        }

        .lrtf-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .lrtf-sentence {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
        }

        /* Input box */
        .lrtf-input-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .lrtf-input {
          width: clamp(70px, 9vw, 110px);
          height: clamp(34px, 4.2vw, 46px);
          border: 2px solid ${BOX_BORDER_DEFAULT};
          border-radius: 8px;
          background: #fff;
          text-align: center;
          font-size: clamp(13px, 1.6vw, 18px);
          font-weight: 600;
          color: ${BOX_TEXT_DEFAULT};
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
          padding: 0 4px;
          box-sizing: border-box;
          cursor: text;
        }
        .lrtf-input:disabled   { opacity: 1; cursor: default; }
        .lrtf-input--wrong     { border-color: ${BOX_BORDER_WRONG}; }
        .lrtf-input--answer    { color: ${BOX_TEXT_ANSWER}; }

        /* ✕ badge */
        .lrtf-badge {
          position: absolute;
          top: -8px; right: -8px;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Buttons */
        .lrtf-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .lrtf-top { grid-template-columns: 1fr; }
          .lrtf-img { width: 100%; }
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
          sectionLetter="C"
          title={"Listen, read, and write true or false."}
          subTitle={
            "Listen once, replay if needed, then compare each statement with what you heard before choosing the two-way answer."
          }
        />
        <div style={{ marginTop: "10px" }}>
          <QuestionAudioPlayer
            pageId="sb_unit3_page5_q3"
            src={sound}
            captions={captions}
            stopAtSecond={10}
          />
        </div>
        {/* ── Paragraph + Image ── */}
        <div className="lrtf-top">
          <p className="lrtf-para">{renderExerciseAudioText({"audio":listening,"id":"paragraph-0","src":clipC1,"label":"Hear Two years ago, my friends and I built a tree house in my backyard. It was ",children:<>{"Two years ago, my friends and I built a tree house in my backyard. It was "}</>})}{renderExerciseAudioText({"audio":listening,"id":"paragraph-1","src":clipC2,"label":"Hear big. It had chairs and tables. It had large windows. There were two ",children:<>{"big. It had chairs and tables. It had large windows. There were two "}</>})}{renderExerciseAudioText({"audio":listening,"id":"paragraph-2","src":clipC3,"label":"Hear bookcases in the tree house. We had a TV, so we could watch movies on ",children:<>{"bookcases in the tree house. We had a TV, so we could watch movies on "}</>})}{renderExerciseAudioText({"audio":listening,"id":"paragraph-3","src":clipC4,"label":"Hear the weekends.",children:<>{"the weekends."}</>})}</p>
          <img
            src={imgScene}
            alt="A wooden tree house with a ladder, door and windows."
            className="lrtf-img"
          />
        </div>

        {/* ── Items ── */}
        <div className="lrtf-list">
          {ITEMS.map((item) => {
            const wrong = isWrong(item);
            const value = answers[item.id] || "";
            const tColor = BOX_TEXT_DEFAULT;
            const bColor = wrong
              ? BOX_BORDER_WRONG
              : isDisabled(item)
                ? "#16a34a"
                : BOX_BORDER_DEFAULT;
            const disabled = isDisabled(item);

            return (
              renderExerciseAudioGroup({"label":`Hear sentence ${item.id}`,"src":[clipC5,clipC6,clipC7,clipC8][item.id-1],"id":`sentence-${item.id}`,"audio":listening,"key":item.id,"className":"lrtf-row",children:<>
                <span className="lrtf-num">{item.id}</span>
                <span className="lrtf-sentence">{item.sentence}</span>
                <div className="lrtf-input-wrap">
                  <input
                    {...fieldKeys}
                    aria-label={`Statement ${item.id}. ${item.sentence} Write true or false.`}
                    title={`Statement ${item.id}. ${item.sentence} Write true or false.`}
                    type="text"
                    className={[
                      "lrtf-input",
                      wrong ? "lrtf-input--wrong" : "",
                      showAns ? "lrtf-input--answer" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderColor: bColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                    placeholder="true / false"
                  />
                  {wrong && <div className="lrtf-badge">✕</div>}
                </div>
              </>})
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrtf-buttons">
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
