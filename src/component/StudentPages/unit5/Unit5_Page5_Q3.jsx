import clipPage44C9 from "../../../assets/audio/ClassBook/Unit 5/Page 44 - C/Item_009_in_the_house.mp3";
import clipPage44C8 from "../../../assets/audio/ClassBook/Unit 5/Page 44 - C/Item_008_in_the_bookcase.mp3";
import clipPage44C7 from "../../../assets/audio/ClassBook/Unit 5/Page 44 - C/Item_007_into_a_box.mp3";
import clipPage44C6 from "../../../assets/audio/ClassBook/Unit 5/Page 44 - C/Item_006_from_a_bucket.mp3";
import clipPage44C5 from "../../../assets/audio/ClassBook/Unit 5/Page 44 - C/Item_005_until_they_shined.mp3";
// import clipPage44C4 from "../../../assets/audio/ClassBook/Unit 5/Page 44 - C/Item_004_from_a_bucket._The_house_looks_great_now.mp3";
// import clipPage44C3 from "../../../assets/audio/ClassBook/Unit 5/Page 44 - C/Item_003_in_the_bookcase._The_windows_were_easy_and_only_needed_a_little_soap_and.mp3";
// import clipPage44C2 from "../../../assets/audio/ClassBook/Unit 5/Page 44 - C/Item_002_floors_until_they_shined._I_dusted_everything_in_the_house._I_organized.mp3";
// import clipPage44C1 from "../../../assets/audio/ClassBook/Unit 5/Page 44 - C/Item_001_On_Tuesday,_I_cleaned_the_house._I_packed_my_old_clothes_and_books_into.mp3";
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
//  🖼️  IMAGE + 🔊 AUDIO
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 5 Under the Weather Folder/Page 44/SVG/Asset 1.svg";
import sound from "../../../assets/audio/ClassBook/Grade 4/cd30pg44-instruction1-adult-lady_aY69WP8I.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
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

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR = "#2b2b2b";
const CIRCLE_IDLE = "#ef4444"; // لون الدائرة لما الطالب يحدد
const CIRCLE_CORRECT = "#ef4444"; // صح
const CIRCLE_WRONG = "#ef4444"; // غلط — نفس اللون، بس badge يظهر
const DRAG_HIGHLIGHT = "rgba(239,68,68,0.13)";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";
const BULLET_COLOR = "#ff9500ff";
const LIST_TEXT_COLOR = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  AUDIO CAPTIONS
// ─────────────────────────────────────────────
const captions = [
  {
    start: 0.1,
    end: 9.54,
    text: "Page 44, Write Activities Exercise C. Listen, read, and circle the prepositional phrases.",
  },
  {
    start: 9.54,
    end: 11.48,
    text: "On Tuesday, I cleaned the house.",
  },
  {
    start: 11.48,
    end: 15.5,
    text: "I packed my old clothes and books into a box.",
  },
  {
    start: 15.5,
    end: 19.42,
    text: "I washed the floors until they shined.",
  },
  {
    start: 19.42,
    end: 24.96,
    text: "I dusted everything in the house. I organized the books in the bookcase.",
  },
  {
    start: 24.96,
    end: 29.56,
    text: "The windows were easy and only needed a little soap and water from a bucket.",
  },
  {
    start: 29.56,
    end: 31.46,
    text: "The house looks great now.",
  },
];

// ─────────────────────────────────────────────
//  📝  WORDS — كل كلمة لها id فريد
//  correctGroup: لو الكلمة جزء من عبارة صحيحة → اسم المجموعة
//                null → عادية
// ─────────────────────────────────────────────
// العبارات الصحيحة:
//  "into a box" | "until they shined" | "in the house" | "in the bookcase" | "from a bucket"

const WORDS = [
  { id: 1, w: "On", g: null },
  { id: 2, w: "Tuesday,", g: null },
  { id: 3, w: "I", g: null },
  { id: 4, w: "cleaned", g: null },
  { id: 5, w: "the", g: null },
  { id: 6, w: "house.", g: null },
  { id: 7, w: "I", g: null },
  { id: 8, w: "packed", g: null },
  { id: 9, w: "my", g: null },
  { id: 10, w: "old", g: null },
  { id: 11, w: "clothes", g: null },
  { id: 12, w: "and", g: null },
  { id: 13, w: "books", g: null },
  { id: 14, w: "into", g: "into_a_box" },
  { id: 15, w: "a", g: "into_a_box" },
  { id: 16, w: "box.", g: "into_a_box" },
  { id: 17, w: "I", g: null },
  { id: 18, w: "washed", g: null },
  { id: 19, w: "the", g: null },
  { id: 20, w: "floors", g: null },
  { id: 21, w: "until", g: "until_shined" },
  { id: 22, w: "they", g: "until_shined" },
  { id: 23, w: "shined.", g: "until_shined" },
  { id: 24, w: "I", g: null },
  { id: 25, w: "dusted", g: null },
  { id: 26, w: "everything", g: null },
  { id: 27, w: "in", g: "in_the_house" },
  { id: 28, w: "the", g: "in_the_house" },
  { id: 29, w: "house.", g: "in_the_house" },
  { id: 30, w: "I", g: null },
  { id: 31, w: "organized", g: null },
  { id: 32, w: "the", g: null },
  { id: 33, w: "books", g: null },
  { id: 34, w: "in", g: "in_bookcase" },
  { id: 35, w: "the", g: "in_bookcase" },
  { id: 36, w: "bookcase.", g: "in_bookcase" },
  { id: 37, w: "The", g: null },
  { id: 38, w: "windows", g: null },
  { id: 39, w: "were", g: null },
  { id: 40, w: "easy", g: null },
  { id: 41, w: "and", g: null },
  { id: 42, w: "only", g: null },
  { id: 43, w: "needed", g: null },
  { id: 44, w: "a", g: null },
  { id: 45, w: "little", g: null },
  { id: 46, w: "soap", g: null },
  { id: 47, w: "and", g: null },
  { id: 48, w: "water", g: null },
  { id: 49, w: "from", g: "from_bucket" },
  { id: 50, w: "a", g: "from_bucket" },
  { id: 51, w: "bucket.", g: "from_bucket" },
  { id: 52, w: "The", g: null },
  { id: 53, w: "house", g: null },
  { id: 54, w: "looks", g: null },
  { id: 55, w: "great", g: null },
  { id: 56, w: "now.", g: null },
];

// الـ groups الصحيحة
const CORRECT_GROUPS = new Set([
  "into_a_box",
  "until_shined",
  "in_the_house",
  "in_bookcase",
  "from_bucket",
]);

const PHRASE_LIST = [
  "until they shined",
  "from a bucket",
  "into a box",
  "in the bookcase",
  "in the house",
];

// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────
// لما الطالب يحدد كلمات، احسب أي groups محددة بالكامل
// group محددة = كل كلماتها محددة
const getFullySelectedGroups = (selectedIds) => {
  const groups = {};
  WORDS.forEach((w) => {
    if (!w.g) return;
    if (!groups[w.g]) groups[w.g] = { total: 0, selected: 0 };
    groups[w.g].total++;
    if (selectedIds.has(w.id)) groups[w.g].selected++;
  });
  const full = new Set();
  Object.entries(groups).forEach(([g, { total, selected }]) => {
    if (selected === total) full.add(g);
  });
  return full;
};

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ListenReadCircle_QC() {
  const listening = useExerciseListening("sb_unit5_page5_q3");

  // selectedIds: كلمات يحددها الطالب بالسحب
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const dragging = useRef(null),
    resetButtonRef = useRef(null);
  const [lockedGroups, setLockedGroups] = useState(new Set()),
    [announcement, setAnnouncement] = useState("");
  const checkDisabled = showAns || lockedGroups.size === CORRECT_GROUPS.size;
  const wordLocked = (id) =>
    showAns || lockedGroups.has(WORDS.find((w) => w.id === id)?.g);
  const pointerStart = (event) => {
    if (isLocked || (event.button !== 0 && event.pointerType === "mouse"))
      return;
    const el = event.target.closest("[data-word-id]");
    if (!el) return;
    event.preventDefault();
    const id = Number(el.dataset.wordId);
    keyboardSelection.current = null;
    dragging.current = { pointer: event.pointerId, start: id, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const pointerMove = (event) => {
    const drag = dragging.current;
    if (!drag || drag.pointer !== event.pointerId) return;
    const el = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest("[data-word-id]");
    if (!el || !event.currentTarget.contains(el)) return;
    const id = Number(el.dataset.wordId);
    if (id !== drag.start) {
      drag.moved = true;
      addWord(drag.start);
      addWord(id);
    }
  };
  const pointerEnd = (event) => {
    const drag = dragging.current;
    if (!drag || drag.pointer !== event.pointerId) return;
    if (!drag.moved) handleWordClick(drag.start);
    dragging.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const keyboardSelection = useRef(null);
  const wordRefs = useRef({});

  const extendKeyboardSelection = (id) => {
    const selection = keyboardSelection.current;
    if (!selection) return;
    const start = WORDS.findIndex((word) => word.id === selection.anchor);
    const end = WORDS.findIndex((word) => word.id === id);
    const next = new Set(selection.before);
    WORDS.slice(Math.min(start, end), Math.max(start, end) + 1).forEach(
      (word) => {
        if (!wordLocked(word.id)) next.add(word.id);
      },
    );
    setSelectedIds(next);
    setAnnouncement(
      "Selected: " +
        WORDS.slice(Math.min(start, end), Math.max(start, end) + 1)
          .map((word) => word.w)
          .join(" "),
    );
  };

  const onWordKeyDown = (event, id) => {
    if (event.key === "Tab" && keyboardSelection.current) {
      const index = WORDS.findIndex((word) => word.id === id);
      const next = WORDS[index + (event.shiftKey ? -1 : 1)];
      if (!next) {
        keyboardSelection.current = null;
        return; // Let Tab leave the paragraph at its ends.
      }
      event.preventDefault();
      event.stopPropagation();
      extendKeyboardSelection(next.id);
      wordRefs.current[next.id]?.focus({ preventScroll: true });
      return;
    }
    if (event.key === "Escape" && keyboardSelection.current) {
      event.preventDefault();
      event.stopPropagation();
      const selection = keyboardSelection.current;
      keyboardSelection.current = null;
      setSelectedIds(selection.before);
      wordRefs.current[selection.anchor]?.focus({ preventScroll: true });
      setAnnouncement("Selection cancelled.");
      return;
    }
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (event.repeat || isLocked || wordLocked(id)) return;
    if (keyboardSelection.current) {
      keyboardSelection.current = null;
      setAnnouncement(
        "Phrase selected. Tab to another word to start a new selection.",
      );
    } else if (selectedIds.has(id)) {
      handleWordClick(id);
      setAnnouncement("Word removed from the selection.");
    } else {
      keyboardSelection.current = { anchor: id, before: new Set(selectedIds) };
      extendKeyboardSelection(id);
    }
  };

  const isLocked = checkDisabled;

  // ── Drag ──
  const addWord = (id) => {
    if (!id || isLocked || wordLocked(id)) return;
    setSelectedIds((prev) => {
      if (prev.has(id)) return prev;
      return new Set([...prev, id]);
    });
  };

  // ── Click toggle single word ──
  const handleWordClick = (id) => {
    if (isLocked || !id || wordLocked(id)) return;
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // ── Buttons ──
  const handleCheck = () => {
    if (isLocked) return;
    keyboardSelection.current = null;
    listening.stop();
    if (selectedIds.size === 0) {
      ValidationAlert.info("Please circle the prepositional phrases.");
      return;
    }
    const fullySelected = getFullySelectedGroups(selectedIds);
    const score = [...fullySelected].filter((g) =>
      CORRECT_GROUPS.has(g),
    ).length;
    const total = CORRECT_GROUPS.size;
    setShowResults(true);
    setLockedGroups(new Set([...lockedGroups, ...fullySelected]));
    dragging.current = null;
    setAnnouncement(`Score: ${score} out of ${total}.`);
    if (score === total) {
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    keyboardSelection.current = null;
    listening.stop();
    // تحديد كل كلمات الـ groups الصحيحة
    const ids = new Set();
    WORDS.forEach((w) => {
      if (w.g && CORRECT_GROUPS.has(w.g)) ids.add(w.id);
    });
    setSelectedIds(ids);
    setShowResults(false);
    setShowAns(true);
    dragging.current = null;
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnnouncement("Correct phrases shown and locked.");
  };

  const handleReset = () => {
    keyboardSelection.current = null;
    listening.stop();
    setSelectedIds(new Set());
    setShowResults(false);
    setShowAns(false);
    dragging.current = null;
    setLockedGroups(new Set());
    setAnnouncement("Selections cleared.");
  };

  // ── Word display state ──
  // كل كلمة: selected / correct / wrong / idle
  const getWordState = (word) => {
    const isSel = selectedIds.has(word.id);
    if (!isSel) return "idle";
    if (showAns) return "correct";
    if (showResults) {
      // صح لو كلمتها في group صحيحة وكل مجموعتها محددة
      if (word.g && CORRECT_GROUPS.has(word.g)) {
        const fullySelected = getFullySelectedGroups(selectedIds);
        return fullySelected.has(word.g) ? "correct" : "partial";
      }
      return "wrong"; // كلمة عادية محددة = غلط
    }
    return "selected";
  };

  // ── Render ──
  // نجمع كلمات نفس الـ group المتجاورة في span واحد (للدائرة)
  const renderWords = () => {
    const elements = [];
    let i = 0;
    while (i < WORDS.length) {
      const w = WORDS[i];

      // لو الكلمة جزء من group → اجمع كل كلمات المجموعة في span
      if (w.g) {
        const g = w.g;
        const groupWords = [];
        while (i < WORDS.length && WORDS[i].g === g) {
          groupWords.push(WORDS[i]);
          i++;
        }

        // state المجموعة = state أول كلمة فيها
        const st = getWordState(groupWords[0]);
        const isWrong = st === "wrong";
        const isPartial = st === "partial";

        // هل كل المجموعة محددة؟
        const allSel = groupWords.every((gw) => selectedIds.has(gw.id));

        elements.push(
          <span
            key={`group-${g}`}
            className={[
              "lrc-group",
              allSel &&
              (st === "selected" ||
                st === "correct" ||
                st === "partial" ||
                st === "wrong")
                ? "lrc-group--circled"
                : "",
              st === "correct" ? "lrc-group--correct" : "",
              st === "wrong" ? "lrc-group--wrong" : "",
              st === "partial" ? "lrc-group--wrong" : "",
              isLocked ? "lrc-group--locked" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {groupWords.map((gw, gi) => (
              <span
                key={gw.id}
                data-word-id={gw.id}
                className={[
                  "lrc-word-span",
                  selectedIds.has(gw.id) ? "lrc-word-span--selected" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                role="button"
                tabIndex={0}
                data-keyboard-choice
                aria-pressed={selectedIds.has(gw.id)}
                aria-disabled={wordLocked(gw.id)}
                onClick={(event) => {
                  if (event.detail === 0) handleWordClick(gw.id);
                }}
                ref={(el) => {
                  wordRefs.current[gw.id] = el;
                }}
                onKeyDown={(event) => onWordKeyDown(event, gw.id)}
                onKeyUp={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                }}
                aria-describedby="lrc-keyboard-help"
              >
                {gw.w}
                {gi < groupWords.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
            {(isWrong || isPartial) && allSel && showResults && !showAns && (
              <span className="lrc-badge">✕</span>
            )}
          </span>,
        );
        // مسافة بعد المجموعة
        elements.push(
          <span key={`sp-g-${g}`} className="lrc-space">
            {" "}
          </span>,
        );
      } else {
        // كلمة عادية
        const st = getWordState(w);
        elements.push(
          <span
            key={w.id}
            data-word-id={w.id}
            className={[
              "lrc-word-span",
              st === "selected" || st === "wrong"
                ? "lrc-word-span--selected"
                : "",
              st === "wrong" ? "lrc-word-span--wrong" : "",
              isLocked ? "lrc-word-span--locked" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            role="button"
            tabIndex={0}
            data-keyboard-choice
            aria-pressed={selectedIds.has(w.id)}
            aria-disabled={wordLocked(w.id)}
            onClick={(event) => {
              if (event.detail === 0) handleWordClick(w.id);
            }}
            ref={(el) => {
              wordRefs.current[w.id] = el;
            }}
            onKeyDown={(event) => onWordKeyDown(event, w.id)}
            onKeyUp={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                event.stopPropagation();
              }
            }}
            aria-describedby="lrc-keyboard-help"
          >
            {w.w}{" "}
            {st === "wrong" && showResults && !showAns && (
              <span className="lrc-badge-inline">✕</span>
            )}
          </span>,
        );
        i++;
      }
    }
    return elements;
  };

  return (
    <div
      data-adapt-scope="unit5_Unit5_Page5_Q3"
      className="main-container-component"
      onPointerDown={pointerStart}
      onPointerMove={pointerMove}
      onPointerUp={pointerEnd}
      onPointerCancel={() => {
        dragging.current = null;
      }}
      onLostPointerCapture={() => {
        dragging.current = null;
      }}
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="unit5_Unit5_Page5_Q3"] input:focus-visible, [data-adapt-scope="unit5_Unit5_Page5_Q3"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit5_Unit5_Page5_Q3"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        /* ── Paragraph ── */
        .lrc-para {
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${TEXT_COLOR};
          line-height: 2.6;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          cursor: crosshair;
          user-select: none;
          -webkit-user-select: none;
        }

        .lrc-space {
          font-size: clamp(14px, 1.7vw, 20px);
          white-space: pre;
          pointer-events: none;
        }

        /* Plain word */
        .lrc-word-span { touch-action:none;
          position: relative;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${TEXT_COLOR};
          cursor: crosshair;
          white-space: nowrap;
          padding: 1px 2px;
          border-radius: 3px;
          transition: background 0.1s;
        }
        .lrc-word-span--locked  { cursor: default; }
        .lrc-word-span--selected { background: ${DRAG_HIGHLIGHT}; }
        .lrc-word-span--wrong    { background: rgba(239,68,68,0.08); }

        /* Group span — oval دائرة */
        .lrc-group {
          position: relative;
          display: inline-flex;
          align-items: baseline;
          padding: 1px clamp(5px, 0.7vw, 9px);
          transition: border-color 0.12s, background 0.12s;
          cursor: crosshair;
          white-space: nowrap;
        }
        .lrc-group--locked  { cursor: default; }
        .lrc-group--circled { background: ${DRAG_HIGHLIGHT}; }
        .lrc-group--correct { ; background: ${DRAG_HIGHLIGHT}; }
        .lrc-group--wrong   { border-color: ${CIRCLE_WRONG}; }

        /* ✕ badge على المجموعة */
        .lrc-badge {
          position: absolute;
          top: -7px; right: -7px;
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

        /* ✕ badge inline على الكلمة العادية */
        .lrc-badge-inline {
          position: absolute;
          top: -7px; right: -4px;
          width: clamp(13px, 1.5vw, 16px);
          height: clamp(13px, 1.5vw, 16px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: inline-flex; align-items: center; justify-content: center;
          font-size: clamp(6px, 0.7vw, 9px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* ── Hint ── */
        .lrc-hint {
          font-size: clamp(11px, 1.3vw, 14px);
          color: #6b7280;
          font-style: italic;
          margin-top: -6px;
        }

        /* ── Bottom: list + image ── */
        .lrc-bottom {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: start;
          width: 100%;
        }

        .lrc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.1vw, 14px);
        }

        .lrc-list-item {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1vw, 12px);
        }

        .lrc-bullet {
          width: clamp(8px, 1vw, 11px);
          height: clamp(8px, 1vw, 11px);
          border-radius: 50%;
          background: ${BULLET_COLOR};
          flex-shrink: 0;
        }

        .lrc-list-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${LIST_TEXT_COLOR};
          line-height: 1.4;
        }

        .lrc-scene-img {
          width: 100%;
          height: auto;
          display: block;
          flex-shrink: 0;
          pointer-events: none;
        }

        .lrc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lrc-bottom { grid-template-columns: 1fr; }
          .lrc-scene-img { width: clamp(100px, 40vw, 160px); margin: 0 auto; }
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
          subTitle="Listen to each sentence, follow the text, then select only the complete prepositional phrase you hear."
          sectionLetter="C"
          title={<>Listen, read, and circle the prepositional phrases.</>}
        />

        {/* ── Audio ── */}
        <div style={{ marginTop: "4px" }}>
          <QuestionAudioPlayer
            pageId="sb_unit5_page5_q3"
            src={sound}
            captions={captions}
            stopAtSecond={9.54}
          />
        </div>

        {/* ── Hint ── */}

        {/* ── Paragraph ── */}
        <div id="lrc-keyboard-help" className="sr-only">
          Press Enter or Space on the first word of a phrase, Tab to extend the
          selection, Shift+Tab to shorten it, then Enter or Space to finish.
          Escape cancels. Tab without a pending selection moves between words
          without selecting them.
        </div>
        <div
          className="lrc-para"
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              keyboardSelection.current = null;
          }}
          onClick={(event) => {
            if (event.target.closest("[data-word-id]")) return;
            // listening.play("paragraph", [
            //   clipPage44C1,
            //   clipPage44C2,
            //   clipPage44C3,
            //   clipPage44C4,
            // ]);
          }}
          role="group"
          tabIndex={0}
          data-keyboard-choice
          aria-label="Listen to the complete paragraph. Then select words to circle the phrases."
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            // if (event.key === "Enter" || event.key === " ") {
            //   event.preventDefault();
            //   event.stopPropagation();
            //   if (!event.repeat)
            //     listening.play("paragraph", [
            //       clipPage44C1,
            //       clipPage44C2,
            //       clipPage44C3,
            //       clipPage44C4,
            //     ]);
            // }
          }}
          onKeyUp={(event) => {
            if (
              event.target === event.currentTarget &&
              (event.key === "Enter" || event.key === " ")
            ) {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
          style={{
            position: "relative",
            // boxShadow:
            //   listening.activeId === "paragraph"
            //     ? "0 0 0 3px #2563eb"
            //     : undefined,
            backgroundColor:
              listening.activeId === "paragraph" ? "#dbeafe" : undefined,
            borderRadius: 6,
          }}
        >
          {" "}
          {listening.activeId === "paragraph" && renderExerciseSpeaker()}
          {renderWords()}
        </div>

        {/* ── Bottom: list + image ── */}
        <div className="lrc-bottom">
          <div className="lrc-list">
            {PHRASE_LIST.map((phrase) => (
              <div key={phrase} className="lrc-list-item">
                <div className="lrc-bullet" />
                <span className="lrc-list-text">
                  {renderExerciseAudioText({
                    audio: listening,
                    id: `phrase-${phrase}`,
                    src: [
                      clipPage44C5,
                      clipPage44C6,
                      clipPage44C7,
                      clipPage44C8,
                      clipPage44C9,
                    ][PHRASE_LIST.indexOf(phrase)],
                    label: phrase,
                    children: phrase,
                  })}
                </span>
              </div>
            ))}
          </div>
          <img
            src={imgScene}
            alt="A boy packing books into a cardboard box."
            className="lrc-scene-img"
          />
        </div>

        {/* ── Buttons ── */}
        <div className="lrc-buttons action-buttons-container">
          <button
            type="button"
            {...activationKeys}
            ref={resetButtonRef}
            aria-label="Start Again"
            onClick={handleReset}
            className="try-again-button"
          >
            Start Again ↻
          </button>
          <button
            type="button"
            {...activationKeys}
            aria-label="Show Answer"
            onClick={handleShowAnswer}
            className="show-answer-btn"
          >
            Show Answer
          </button>
          <button
            type="button"
            {...activationKeys}
            aria-label="Check Answer"
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
  );
}
