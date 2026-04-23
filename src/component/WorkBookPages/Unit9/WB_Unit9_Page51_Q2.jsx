import React, { useMemo, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const ITEMS = [
  {
    id: 1,
    prompt: "you / swimming pool / yesterday",
    words: ["You", "were", "at", "the", "swimming", "pool", "yesterday."],
  },
  {
    id: 2,
    prompt: "she / museum / 4:00 p.m.",
    words: ["She", "was", "at", "the", "museum", "at", "4:00", "p.m."],
  },
  {
    id: 3,
    prompt: "they / restaurant / last night",
    words: ["They", "were", "at", "the", "restaurant", "last", "night."],
  },
  {
    id: 4,
    prompt: "he / library / 12:00 p.m.",
    words: ["He", "was", "at", "the", "library", "at", "12:00", "p.m."],
  },
  {
    id: 5,
    prompt: "I / school / 9:00 a.m.",
    words: ["I", "was", "at", "school", "at", "9:00", "a.m."],
  },
  {
    id: 6,
    prompt: "they / circus / last week",
    words: ["They", "were", "at", "the", "circus", "last", "week."],
  },
];

export default function WB_Unit8_Page45_QB() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [wordBanksSeed, setWordBanksSeed] = useState(0);

  const shuffledBanks = useMemo(() => {
    const banks = {};
    ITEMS.forEach((item) => {
      banks[item.id] = shuffleArray(item.words);
    });
    return banks;
  }, [wordBanksSeed]);

  const handleSelectWord = (itemId, wordIndex) => {
    if (showAns) return;

    const currentAnswer = answers[itemId] || [];
    const selectedWord = shuffledBanks[itemId][wordIndex];

    if (!selectedWord) return;

    setAnswers((prev) => ({
      ...prev,
      [itemId]: [...currentAnswer, selectedWord],
    }));

    if (checked) {
      setChecked(false);
    }
  };

  const handleRemoveWord = (itemId, answerIndex) => {
    if (showAns) return;

    const currentAnswer = [...(answers[itemId] || [])];
    currentAnswer.splice(answerIndex, 1);

    setAnswers((prev) => ({
      ...prev,
      [itemId]: currentAnswer,
    }));

    if (checked) {
      setChecked(false);
    }
  };

  const getVisibleBankWords = (item) => {
    const chosenWords = answers[item.id] || [];
    const tempChosen = [...chosenWords];

    return shuffledBanks[item.id].map((word) => {
      const foundIndex = tempChosen.indexOf(word);

      if (foundIndex !== -1) {
        tempChosen.splice(foundIndex, 1);
        return null;
      }

      return word;
    });
  };

  const isSentenceComplete = (item) => {
    return (answers[item.id] || []).length === item.words.length;
  };

  const isSentenceCorrect = (item) => {
    return (answers[item.id] || []).join(" ") === item.words.join(" ");
  };

  const handleCheck = () => {
    if (showAns) return;

    const allCompleted = ITEMS.every((item) => isSentenceComplete(item));

    if (!allCompleted) {
      ValidationAlert.info("Please complete all sentences first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (isSentenceCorrect(item)) {
        score++;
      }
    });

    setChecked(true);

    if (score === ITEMS.length) {
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const solved = {};
    ITEMS.forEach((item) => {
      solved[item.id] = [...item.words];
    });

    setAnswers(solved);
    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
    setWordBanksSeed((prev) => prev + 1);
  };

  return (
  <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(18px,2.5vw,28px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">B</span>
          Read and build the sentences.
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            width: "100%",
          }}
        >
          {ITEMS.map((item) => {
            const builtWords = answers[item.id] || [];
            const visibleWords = getVisibleBankWords(item);
            const wrong = checked && isSentenceComplete(item) && !isSentenceCorrect(item);

            return (
              <div
                key={item.id}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  padding: "12px 14px",
                  border: "1px solid #f39b42",
                  borderRadius: "14px",
                  backgroundColor: "#fff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#111",
                      minWidth: "20px",
                    }}
                  >
                    {item.id}
                  </span>

                  <span
                    style={{
                      fontSize: "18px",
                      color: "#444",
                      lineHeight: "1.5",
                    }}
                  >
                    {item.prompt}
                  </span>
                </div>

                {/* built answer */}
                <div
                  style={{
                    minHeight: "52px",
                    borderBottom: "2px solid #8f8f8f",
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "8px",
                    paddingBottom: "6px",
                  }}
                >
                  {builtWords.map((word, index) => (
                    <button
                      key={`${item.id}-built-${index}-${word}`}
                      onClick={() => handleRemoveWord(item.id, index)}
                      style={{
                        padding: "6px 10px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#f39b42",
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: "500",
                        cursor: showAns ? "default" : "pointer",
                      }}
                    >
                      {word}
                    </button>
                  ))}
                </div>

                {/* word bank */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {visibleWords.map((word, index) =>
                    word ? (
                      <button
                        key={`${item.id}-bank-${index}-${word}`}
                        onClick={() => handleSelectWord(item.id, index)}
                        style={{
                          padding: "6px 10px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          backgroundColor: "#f8fafc",
                          color: "#111827",
                          fontSize: "15px",
                          fontWeight: "500",
                          cursor: showAns ? "default" : "pointer",
                        }}
                      >
                        {word}
                      </button>
                    ) : null
                  )}
                </div>

                {wrong && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: "#ef4444",
                    borderBottom: "2px solid #ffffffff",

                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: "700",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8px",
          }}
        >
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
            checkAnswers={handleCheck}
          />
        </div>
      </div>
    </div>
  );
}