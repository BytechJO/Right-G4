/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import sound1 from "../../../assets/audio/ClassBook/Unit 2/P 14/CD12.Pg14_Instruction1_Adult Lady.mp3";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import WrongMark from "../../WrongMark";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

const Unit2_Page5_Q2 = () => {
  const groups = [
    { words: ["tune", "run", "June"], correct: [0, 2] },
    { words: ["cube", "gum", "hut"], correct: [1, 2] },
    { words: ["blue", "duck", "up"], correct: [1, 2] },
    { words: ["sun", "glue", "fun"], correct: [0, 2] },
    { words: ["spun", "cute", "tube"], correct: [1, 2] },
    { words: ["Sue", "blue", "bus"], correct: [0, 1] },
  ];
  const [showResult2, setShowResult2] = useState(false);
  const [selected, setSelected] = useState(groups.map(() => []));
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);

  const audioRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const stopAtSecond = 9;

  // إعدادات الصوت
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);
  const settingsRef = useRef(null);
  const [forceRender, setForceRender] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showCaption, setShowCaption] = useState(false);

  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    {
      start: 0,
      end: 9.04,
      text: "Page 53, exercise E. Which picture begins with a different sound? Listen and write X.",
    },
    { start: 9.06, end: 13.14, text: "1. goose, gate, kiwi," },
    { start: 13.16, end: 17.17, text: "2. kick, goat, kite," },
    { start: 17.19, end: 22.06, text: "3. king, garlic, game,  " },
    { start: 22.08, end: 27.09, text: "4. kangaroo, key, grapes. " },
  ];
  const showAnswers = () => {
    const correctSelections = groups.map((g) => g.correct);

    setSelected(correctSelections);
    setShowResult2(true);
    setLocked(true);
  };

  const checkAnswers = () => {
    if (locked || showResult2) return;
    const hasEmpty = selected.some((arr) => arr.length === 0);

    if (hasEmpty) {
      ValidationAlert.info();
      return;
    }
    let correctCount = 0;
    let total = 0;

    groups.forEach((group, index) => {
      total += group.correct.length;

      group.correct.forEach((correctIndex) => {
        if (selected[index].includes(correctIndex)) {
          correctCount++;
        }
      });
    });

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="font-weight:bold;">
        Score: ${correctCount} / ${total}
      </span>
    </div>
  `;

    if (correctCount === total) ValidationAlert.success(msg);
    else if (correctCount === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setShowResult2(true);
    setLocked(true);
  };

  const reset = () => {
    setSelected(groups.map(() => []));
    setShowResult(false);
    setShowResult2(false);
    setLocked(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <h5 className="header-title-page8">
          <span style={{ color: "#2e3192", marginRight: "10px" }}>2</span>
          Listen and circle the words with the same
          <span style={{ color: "#2e3192" }}>u sound</span>.
        </h5>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <QuestionAudioPlayer
            src={sound1}
            captions={captions}
            stopAtSecond={11}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "35px",
            marginTop: "30px",
          }}
        >
          {groups.map((group, index) => (
            <div
              key={index}
              style={{
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "-20px",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {index + 1}
              </div>

              <div
                style={{
                  background: "#FEF3E6",
                  padding: "1vw 2.5vw",
                  borderRadius: "1vw",
                  minWidth: "7vw",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {group.words.map((word, i) => {
                  const isSelected = selected[index].includes(i);
                  const isCorrect = group.correct.includes(i);

                  return (
                    <div
                      key={i}
                      onClick={() => {
                        if (locked) return;

                        const newSelected = [...selected];

                        if (newSelected[index].includes(i)) {
                          newSelected[index] = newSelected[index].filter(
                            (x) => x !== i,
                          );
                        } else {
                          newSelected[index].push(i);
                        }

                        setSelected(newSelected);
                      }}
                      style={{
                        fontSize: "18px",
                        cursor: "pointer",
                        position: "relative",
                      }}
                    >
                      {word}

                      {isSelected && (
                        <>
                          {isSelected && (
                            <div
                              style={{
                                position: "absolute",
                                top: "-4px",
                                left: "-6px",
                                right: "-6px",
                                bottom: "-4px",
                                border: isSelected
                                  ? showResult2
                                    ? isCorrect
                                      ? "2px solid #1C398E" 
                                      : "2px solid #ef4444" 
                                    : "2px solid #1C398E" 
                                  : "none",
                                borderRadius: "20px",
                                pointerEvents: "none",
                              }}
                            />
                          )}

                          {/* ❌ علامة الغلط */}
                          {showResult2 && !isCorrect && <WrongMark />}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button
        handleShowAnswer={showAnswers}
        handleStartAgain={reset}
        checkAnswers={checkAnswers}
      />
    </div>
  );
};

export default Unit2_Page5_Q2;
