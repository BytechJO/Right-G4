import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 81/Ex D 1.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 81/Ex D 3.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 81/Ex D 4.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 81/Asset 63.svg";

const Unit9_Page6_Q1 = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [locked, setLocked] = useState(false);

  const [checked, setChecked] = useState(false);

  const questions = [
    {
      id: 1,
      image: img1,
      sentence: "Where were they yesterday?",
      word1: ["the train stop", "the airport"],
      word2: ["are at", "were at", "are in", "were in"],
    },
    {
      id: 2,
      image: img2,
      sentence: "Where are they now?",
      word1: ["work", "the clinic"],
      word2: ["are at", "were at", "are in", "were in"],
    },
    {
      id: 3,
      image: img3,
      sentence: "Where are they now?",
      word1: ["the library", "the bus stop"],
      word2: ["are at", "were at", "are in", "were in"],
    },
    {
      id: 4,
      image: img4,
      sentence: "Where were they yesterday?",
      word1: ["the theater", "the bakery"],
      word2: ["are at", "were at", "are in", "were in"],
    },
  ];
  const correctAnswers = {
    1: { word1: "the train stop", word2: "were at" },
    2: { word1: "the clinic", word2: "are at" },
    3: { word1: "the bus stop", word2: "are at" },
    4: { word1: "the theater", word2: "were at" },
  };
  const handleChange = (id, field, value) => {
    if (locked) return;

    setUserAnswers((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };
  const showAnswer = () => {
    setUserAnswers(correctAnswers);
    setLocked(true);
    setChecked(true);
  };
  const checkAnswers = () => {
    if (locked) return;

    // ✅ التحقق إذا في فراغ
    const empty = questions.some(
      (q) => !userAnswers[q.id]?.word1 || !userAnswers[q.id]?.word2,
    );

    if (empty) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    Object.keys(correctAnswers).forEach((id) => {
      // ✅ أول select
      if (userAnswers[id]?.word2 === correctAnswers[id].word2) {
        score += 1;
      }

      // ✅ ثاني select
      if (userAnswers[id]?.word1 === correctAnswers[id].word1) {
        score += 1;
      }
    });

    const total = Object.keys(correctAnswers).length * 2; // = 8

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${score} / ${total}
      </span>
    </div>
  `;

    setChecked(true);
    setLocked(true);

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };
  const handleStartAgain = () => {
    setUserAnswers({});
    setChecked(false);
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
      <div className="div-forall">
        <h5 className="header-title-page8">
          <span className="ex-A" style={{ marginRight: "10px" }}>
            D
          </span>
          Read and answer the questions.
        </h5>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "900px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* الأسئلة بالصور */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "12px",
              }}
            >
              {questions.map((q) => (
                <div
                  key={q.id}
                  style={{
                    padding: "12px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      color: "black",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      fontWeight: "bold",
                      zIndex: 2,
                    }}
                  >
                    {q.id}
                  </div>

                  <img
                    src={q.image}
                    alt={`q${q.id}`}
                    style={{
                      width: "70%",
                      height: "auto",
                      objectFit: "cover",
                      marginTop: "10px",
                    }}
                  />

                  <div
                    style={{
                      marginTop: "8px",
                      fontWeight: "500",
                      marginBottom: 15,
                    }}
                  >
                    {q.sentence}
                  </div>

                  <div
                    style={{
                      marginTop: "5px",
                      borderBottom: "2px solid black",
                      paddingBottom: "3px",
                      minWidth: "220px",
                      display: "flex",
                      alignItems: "baseline",
                      gap: "6px",
                      fontSize: "16px",
                    }}
                  >
                    They
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <select
                        value={userAnswers[q.id]?.word2 || ""}
                        onChange={(e) =>
                          handleChange(q.id, "word2", e.target.value)
                        }
                        disabled={locked}
                        style={{
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none",

                          border: "none",
                          borderBottom: "1px dashed #aaa",
                          backgroundColor: "transparent",

                          fontSize: "inherit",
                          fontWeight: "600",
                          color: userAnswers[q.id]?.word2 ? "#1e3a8a" : "#aaa",

                          padding: "2px 18px 2px 4px",
                          minWidth: "90px",

                          cursor: locked ? "not-allowed" : "pointer",
                        }}
                      >
                        <option value="" disabled hidden>
                          Select
                        </option>
                        {q.word2.map((w, i) => (
                          <option key={i} value={w}>
                            {w}
                          </option>
                        ))}
                      </select>
                      {checked &&
                        userAnswers[q.id]?.word2 &&
                        userAnswers[q.id]?.word2 !== correctAnswers[q.id].word2 && (
                          <div
                            style={{
                              position: "absolute",
                              top: "-6px",
                              right: "-6px",
                              transform: "translateY(-50%)",
                              width: "22px",
                              height: "22px",
                              background: "#ef4444",
                              color: "white",
                              borderRadius: "50%",
                              fontSize: "12px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: "bold",
                              border: "2px solid white",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                              pointerEvents: "none",
                            }}
                          >
                            ✕
                          </div>
                        )}
                      <span
                        style={{
                          position: "absolute",
                          right: "4px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                          fontSize: "10px",
                          color: "#666",
                        }}
                      >
                        ▾
                      </span>
                    </div>
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <select
                        value={userAnswers[q.id]?.word1 || ""}
                        onChange={(e) =>
                          handleChange(q.id, "word1", e.target.value)
                        }
                        disabled={locked}
                        style={{
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none",

                          border: "none",
                          borderBottom: "1px dashed #aaa",
                          backgroundColor: "transparent",

                          fontSize: "inherit",
                          fontWeight: "600",
                          color: userAnswers[q.id]?.word1 ? "#1e3a8a" : "#aaa",

                          padding: "2px 18px 2px 4px",
                          minWidth: "90px",

                          cursor: locked ? "not-allowed" : "pointer",
                        }}
                      >
                        <option value="" disabled hidden>
                          Select
                        </option>
                        {q.word1.map((w, i) => (
                          <option key={i} value={w}>
                            {w}
                          </option>
                        ))}
                      </select>
                      {checked &&
                        userAnswers[q.id]?.word1 &&
                        userAnswers[q.id]?.word1 !== correctAnswers[q.id].word1 && (
                          <div
                            style={{
                              position: "absolute",
                              top: "-6px",
                              right: "-6px",
                              transform: "translateY(-50%)",
                              width: "22px",
                              height: "22px",
                              background: "#ef4444",
                              color: "white",
                              borderRadius: "50%",
                              fontSize: "12px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: "bold",
                              border: "2px solid white",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                              pointerEvents: "none",
                            }}
                          >
                            ✕
                          </div>
                        )}
                      <span
                        style={{
                          position: "absolute",
                          right: "4px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                          fontSize: "10px",
                          color: "#666",
                        }}
                      >
                        ▾
                      </span>
                    </div>
                    .
                  </div>
                </div>
              ))}
            </div>
            <Button
              handleShowAnswer={showAnswer}
              handleStartAgain={handleStartAgain}
              checkAnswers={checkAnswers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unit9_Page6_Q1;
