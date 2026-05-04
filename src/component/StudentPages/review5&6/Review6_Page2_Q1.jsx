import React, { useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex D 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex D 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex D 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex D 6.svg";
import img7 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex D 7.svg";
import qImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Asset 8.svg";
const items = [
  {
    sentence: "onpy",
    scrambled: ["onpy"],
    correct: ["pony"],
  },
  {
    sentence: "dyla",
    scrambled: ["dyla"],
    correct: ["lady"],
  },
  {
    sentence: "nenpy",
    scrambled: ["nenpy"],
    correct: ["penny"],
  },
  {
    sentence: "wentty",
    scrambled: ["wentty"],
    correct: ["twenty"],
  },
  {
    sentence: "icyt",
    scrambled: ["icyt"],
    correct: ["city"],
  },
  {
    sentence: "ejlly",
    scrambled: ["ejlly"],
    correct: ["jelly"],
  },
  {
    sentence: "pyppu",
    scrambled: ["pyppu"],
    correct: ["puppy"],
  },
];
const images = [img1, img2, img3, img4, img5, img6, img7];
export default function Review6_Page2_Q1() {
  // ✨ كل كلمة string بدل array
  const [answers, setAnswers] = useState(
    items.map((item) => Array(item.correct[0].length).fill("")),
  );
  const [lines, setLines] = useState([]);
  const [startDot, setStartDot] = useState(null);

  const imageDotRefs = useRef([]);
  const textDotRefs = useRef([]);
  const containerRef = useRef(null);
  const [locked, setLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleDotClick = (index, type) => {
    if (locked) return; // 🔥 يمنع التوصيل بعد check/show

    if (!startDot) {
      setStartDot({ index, type });
      return;
    }

    if (startDot.type === type) {
      setStartDot(null);
      return;
    }

    const imageIndex = startDot.type === "image" ? startDot.index : index;
    const textIndex = startDot.type === "text" ? startDot.index : index;

    setLines((prev) => {
      let updated = [...prev];

      updated = updated.filter(
        (l) =>
          l.from.index !== imageIndex && // image
          l.to.index !== textIndex, // text
      );

      updated.push({
        from: { index: imageIndex, type: "image" },
        to: { index: textIndex, type: "text" },
      });

      return updated;
    });

    setStartDot(null);
  };

  const correctMatches = {
    0: 1, // onpy → pony → horse
    1: 6, // dyla → lady → 20
    2: 5, // nenpy → penny → ship
    3: 0, // wentty → twenty → coin
    4: 2, // icyt → city → dog
    5: 4, // ejlly → jelly → jar
    6: 3, // pyppu → puppy → ??? (حسب ترتيبك)
  };

  const onDragEnd = (result) => {
    const { destination, draggableId, source } = result;
    if (!destination || locked) return;

    const letterId = draggableId;
    const letter = letterId.split("-")[0];

    // إذا سحب داخل نفس المكان → تجاهل
    if (destination.droppableId === source.droppableId) return;

    // إذا drop على slot
    if (destination.droppableId.startsWith("slot")) {
      const [, qIndex, letterIndex] = destination.droppableId.split("-");

      const updated = [...answers];

      // 🔁 إذا في حرف قديم → احذفه (عشان يرجع يتفعل بالبنك)
      updated[qIndex][letterIndex] = {
        char: letter,
        id: letterId,
      };

      setAnswers(updated);
    }
  };

  const resetAll = () => {
    setAnswers(items.map((item) => Array(item.correct[0].length).fill("")));
    setLines([]); // 🔥 مهم
    setStartDot(null); // 🔥 مهم
    setLocked(false);
    setShowResult(false);
  };

  const showAnswers = () => {
    // ✅ كلمات
    const filledAnswers = items.map((item) =>
      item.correct[0].split("").map((char, index) => ({
        char,
        id: `answer-${index}`,
      })),
    );

    setAnswers(filledAnswers);

    // ✅ خطوط صح
    const correctLines = Object.entries(correctMatches).map(
      ([textIndex, imageIndex]) => ({
        from: { index: Number(imageIndex), type: "image" },
        to: { index: Number(textIndex), type: "text" },
      }),
    );

    setLines(correctLines);

    setLocked(true);
    setShowResult(true);
  };

  const checkAnswers = () => {
    if (locked) return;

    // 🔴 تحقق من الكلمات
    const emptyWords = answers.some((row) => row.some((word) => word === ""));

    if (emptyWords) {
      ValidationAlert.info("Please complete all words.");
      return;
    }

    // 🔵 تحقق من matching
    if (lines.length !== items.length) {
      ValidationAlert.info("Please match all items.");
      return;
    }

    let score = 0;

    answers.forEach((row, i) => {
      const wordCorrect =
        row.map((l) => l.char).join("") === items[i].correct[0];

      const line = lines.find((l) => l.to.index === i);

      const matchCorrect = line && correctMatches[i] === line.from.index;

      // ✅ كل سؤال = 2 علامات
      if (wordCorrect) score++;
      if (matchCorrect) score++;
    });

    const total = items.length * 2;

    const message = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:#2e7d32;font-weight:bold;">
        Score: ${score} / ${total}
      </span>
    </div>
  `;

    if (score === total) ValidationAlert.success(message);
    else if (score === 0) ValidationAlert.error(message);
    else ValidationAlert.warning(message);

    setShowResult(true);
    setLocked(true);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-center p-8">
        <div
          className="div-forall"
          style={{
            touchAction: "manipulation",
          }}
        >
          <h5 className="header-title-page8">
            <span style={{ marginRight: "10px" }}>D</span>

            <div>
              Unscramble the letters to make words with the end sound
              <br />
              you hear in{" "}
              <img
                src={qImage}
                alt=""
                style={{
                  display: "inline-block",
                  width: "40px",
                  height: "auto",
                  margin: "0 6px",
                  verticalAlign: "middle",
                }}
              />
              . Then match each word to its picture.
            </div>
          </h5>

          <div
            ref={containerRef}
            className="relative grid grid-cols-[1fr_150px] gap-20 mb-10"
          >
            {" "}
            <div className="flex flex-col gap-4">
              {items.map((item, i) => {
                return (
                  <div key={i} className="flex items-center gap-2">
                    {/* 🔵 المحتوى */}
                    <div className="flex flex-col gap-1">
                      {/* السطر الأول */}
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base w-5">{i + 1}</span>
                        <span className="text-base">{item.sentence}</span>
                      </div>

                      {/* السطر الثاني */}
                      <div className="flex flex-col gap-2 ml-7 relative w-[350px]">
                        {/* 🔤 الحروف */}
                        <Droppable
                          droppableId={`bank-${i}`}
                          direction="horizontal"
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className="flex gap-1"
                            >
                              {item.scrambled.map((word, wordIndex) => {
                                const letters = word
                                  .split("")
                                  .map((letter, index) => ({
                                    char: letter,
                                    id: `${letter}-${i}-${wordIndex}-${index}`,
                                  }));

                                return (
                                  <div key={wordIndex} className="flex gap-1">
                                    {letters.map((letterObj, letterIndex) => {
                                      const isUsed = answers[i].some(
                                        (l) => l?.id === letterObj.id,
                                      );

                                      return (
                                        <Draggable
                                          key={letterObj.id}
                                          draggableId={letterObj.id}
                                          index={wordIndex * 10 + letterIndex}
                                          isDragDisabled={locked || isUsed}
                                        >
                                          {(provided) => (
                                            <span
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              style={{
                                                touchAction: "none", // 🔥 أهم سطر
                                                userSelect: "none",
                                                WebkitUserDrag: "none",
                                                ...provided.draggableProps
                                                  .style,
                                              }}
                                              className={`w-8 h-8 text-sm flex items-center justify-center rounded border font-bold
                                                ${
                                                  isUsed
                                                    ? "bg-gray-300 opacity-40 cursor-not-allowed"
                                                    : "bg-yellow-200 cursor-grab"
                                                }`}
                                            >
                                              {letterObj.char}
                                            </span>
                                          )}
                                        </Draggable>
                                      );
                                    })}
                                  </div>
                                );
                              })}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>

                        {/* 🔲 البوكسات */}
                        <div className="flex items-center gap-2 ml-0 relative w-[260px]">
                          {item.correct[0].split("").map((_, letterIndex) => {
                            const isCorrect =
                              answers[i][letterIndex]?.char ===
                              item.correct[0][letterIndex];

                            const isWrong =
                              showResult &&
                              answers[i][letterIndex] &&
                              !isCorrect;

                            return (
                              <Droppable
                                droppableId={`slot-${i}-${letterIndex}`}
                                key={letterIndex}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`w-8 h-8 border-b-2 flex items-center justify-center font-bold relative
                ${isWrong ? "border-red-500" : "border-black"}
              `}
                                  >
                                    <span
                                      style={{
                                        color: "#1C398E",
                                      }}
                                    >
                                      {answers[i][letterIndex]?.char}
                                    </span>
                                    {provided.placeholder}
                                  </div>
                                )}
                              </Droppable>
                            );
                          })}
                          <div
                            ref={(el) => (textDotRefs.current[i] = el)}
                            onClick={() => handleDotClick(i, "text")}
                            className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full cursor-pointer transition-all duration-200
                              ${
                                startDot?.index === i &&
                                startDot?.type === "text"
                                  ? "bg-orange-400 ring-4 ring-orange-200 shadow-lg scale-125"
                                  : "bg-orange-400 hover:scale-110"
                              }
                            `}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-4 ml-6 mt-0 shrink-0">
              {images.map((img, i) => {
                const wrongMatch =
                  showResult &&
                  lines.some((l) => l.from.index === i) && // مربوط
                  !lines.some(
                    (l) =>
                      l.from.index === i && correctMatches[l.to.index] === i,
                  );
                return (
                  <div
                    key={i}
                    onClick={() => handleDotClick(i, "image")}
                    className="flex items-center gap-3 cursor-pointer relative h-20"
                  >
                    <div
                      ref={(el) => (imageDotRefs.current[i] = el)}
                      className="w-3 h-3 bg-orange-400 rounded-full shrink-0 z-10"
                    />
                    <img
                      src={img}
                      style={{
                        width: "clamp(60px, 8vw, 100px)",
                        height: "clamp(60px, 8vw, 100px)",
                        objectFit: "contain",
                      }}
                    />
                    {showResult && wrongMatch && (
                      <div
                        style={{
                          position: "absolute",
                          right: "-25px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: "22px",
                          height: "22px",
                          background: "#ef4444",
                          color: "white",
                          borderRadius: "50%",
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
                  </div>
                );
              })}
            </div>{" "}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {lines.map((line, i) => {
                const imgDot = imageDotRefs.current[line.from.index];
                const txtDot = textDotRefs.current[line.to.index];

                if (!imgDot || !txtDot || !containerRef.current) return null;

                const imgRect = imgDot.getBoundingClientRect();
                const txtRect = txtDot.getBoundingClientRect();
                const containerRect =
                  containerRef.current.getBoundingClientRect();

                const x1 =
                  imgRect.left + imgRect.width / 2 - containerRect.left;
                const y1 = imgRect.top + imgRect.height / 2 - containerRect.top;

                const x2 =
                  txtRect.left + txtRect.width / 2 - containerRect.left;
                const y2 = txtRect.top + txtRect.height / 2 - containerRect.top;

                return (
                  <path
                    key={i}
                    d={`M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`}
                    stroke="orange"
                    strokeWidth="3"
                    fill="none"
                  />
                );
              })}
            </svg>
          </div>

          {/* buttons */}
          <div className="action-buttons-container">
            <button className="try-again-button" onClick={resetAll}>
              Start Again ↻
            </button>

            <button onClick={showAnswers} className="show-answer-btn">
              Show Answer
            </button>

            <button className="check-button2" onClick={checkAnswers}>
              Check Answer ✓
            </button>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
