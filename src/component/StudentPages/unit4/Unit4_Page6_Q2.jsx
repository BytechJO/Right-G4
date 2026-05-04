import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
const SentenceBuilder = ({
  id,
  scrambled,
  correct,
  onUpdate,
  showResult,
  forceAnswer,
  index,
  weatherAnswer,
}) => {
  const [availableWords, setAvailableWords] = useState(
    scrambled
      .split(" ")
      .map((word, index) => ({ id: `${id}-word-${index}`, text: word })),
  );

  const [chosenWords, setChosenWords] = useState([]);

  React.useEffect(() => {
    if (forceAnswer) {
      const words = correct
        .replace(/[.,!?]/g, "")
        .split(" ")
        .map((word, index) => ({
          id: `${id}-word-${index}`,
          text: word,
        }));
      setChosenWords(words);
      setAvailableWords([]);
    }
  }, [forceAnswer, correct, id]);

  const handleWordClick = (wordToAdd) => {
    const newChosenWords = [...chosenWords, wordToAdd];
    setChosenWords(newChosenWords);

    setAvailableWords(availableWords.filter((w) => w.id !== wordToAdd.id));
    onUpdate(newChosenWords.map((w) => w.text).join(" "));
  };

  const handleRemoveWord = (wordToRemove) => {
    const newChosenWords = chosenWords.filter((w) => w.id !== wordToRemove.id);
    setChosenWords(newChosenWords);

    setAvailableWords((prev) =>
      [...prev, wordToRemove].sort((a, b) => a.id.localeCompare(b.id)),
    );

    onUpdate(newChosenWords.map((w) => w.text).join(" "));
  };

  const getBoxClassName = () => {
    if (!showResult) {
      return "border-gray-300 bg-white";
    }

    const userAnswer = chosenWords
      .map((w) => w.text)
      .join(" ")
      .replace(/[.,!?]/g, "")
      .trim()
      .toLowerCase();

    const correctAnswer = correct
      .replace(/[.,!?]/g, "")
      .trim()
      .toLowerCase();

    if (userAnswer.length === 0) {
      return "border-gray-300 bg-white";
    }

    return userAnswer === correctAnswer
      ? "border-gray-300 bg-white"
      : "border-gray-300 bg-white";
  };

  const isIncorrectAnswer = () => {
    if (!showResult) return false;

    const userAnswer = chosenWords
      .map((w) => w.text)
      .join(" ")
      .replace(/[.,!?]/g, "")
      .trim()
      .toLowerCase();

    const correctAnswer = correct
      .replace(/[.,!?]/g, "")
      .trim()
      .toLowerCase();

    if (!userAnswer) return false;

    return userAnswer !== correctAnswer;
  };
  const correctWords = correct.split(" ");
  const userSentence = chosenWords
    .map((w) => w.text)
    .join(" ")
    .replace(/[.,!?]/g, "")
    .trim()
    .toLowerCase();

  const correctSentence = correct
    .replace(/[.,!?]/g, "")
    .trim()
    .toLowerCase();

  const sentenceCorrect = userSentence === correctSentence;

  const correctWeatherWord = correct.split(" ").slice(-1)[0]; // مش مهم فعلياً

  const weatherCorrect = weatherAnswer
    ? weatherAnswer.toLowerCase() ===
      (index === 0
        ? "cold"
        : index === 1
          ? "hot"
          : index === 2
            ? "cool"
            : "warm")
    : false;
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 p-3 bg-gray-100 rounded-lg min-h-[50px] items-center">
        {availableWords.length > 0 ? (
          availableWords.map((word) => (
            <button
              key={word.id}
              onClick={() => handleWordClick(word)}
              className="px-3 py-1 bg-white border border-gray-400 rounded-md shadow-sm hover:bg-blue-100 hover:border-blue-500 transition-all text-gray-800 font-medium"
            >
              {word.text}
            </button>
          ))
        ) : (
          <p className="text-gray-400 text-sm"></p>
        )}
      </div>

      <div className="relative">
        <div
          className={`flex flex-wrap gap-2 p-3 border-2 rounded-lg min-h-[60px] transition-colors duration-300 items-center ${getBoxClassName()}`}
        >
          {/* 🔥 منطقة الجملة (تتمدد) */}
          {correctWords.map((word, i) => {
            const chosen = chosenWords[i];

            return (
              <span key={i}>
                {chosen ? (
                  <button
                    onClick={() => handleRemoveWord(chosen)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md"
                  >
                    {chosen.text}
                  </button>
                ) : (
                  <span
                    className="px-3 py-1 inline-block min-w-[40px]"
                    style={{ borderBottom: "2px solid #999" }}
                  ></span>
                )}
              </span>
            );
          })}

          {/* 🔥 النهاية دايماً على اليمين */}
          <span className="text-lg font-bold">?</span>

          <span className="ml-2 font-semibold">It’s</span>

          <Droppable droppableId={`weather-${index}`}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  minWidth: "80px",
                  borderBottom: `2px solid ${
                    showResult && weatherAnswer && !weatherCorrect
                      ? "red"
                      : "black"
                  }`,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#1C398E",
                }}
              >
                {weatherAnswer}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {isIncorrectAnswer() && (
          <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 flex items-center justify-center shadow-md z-10 border-2 border-white">
            <span className="text-white text-sm font-bold leading-none">✕</span>
          </div>
        )}
      </div>
    </div>
  );
};
const Unit4_Page6_Q2 = () => {
  const exerciseSentences = [
    {
      id: "s1",
      scrambled: "weather what’s winter in like the",
      correct: "What’s the weather like in winter",
      weather: "cold",
    },
    {
      id: "s2",
      scrambled: "like summer the what’s in weather",
      correct: "What’s the weather like in summer",
      weather: "hot",
    },
    {
      id: "s3",
      scrambled: "the in weather like what’s autumn",
      correct: "What’s the weather like in autumn",
      weather: "cool",
    },
    {
      id: "s4",
      scrambled: "in what’s spring weather the like",
      correct: "What’s the weather like in spring",
      weather: "warm",
    },
  ];
  const weatherBank = ["cool", "hot", "cold", "warm"];
  const [weatherAnswers, setWeatherAnswers] = useState(
    Array(exerciseSentences.length).fill(""),
  );

  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    // إذا السحب من الطقس
    if (draggableId.startsWith("weather-")) {
      const value = draggableId.replace("weather-", "");
      const index = Number(destination.droppableId.replace("weather-", ""));

      const updated = [...weatherAnswers];
      updated[index] = value;
      setWeatherAnswers(updated);
    }
  };

  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  const handleAnswerUpdate = (id, answer) => {
    setUserAnswers((prev) => ({ ...prev, [id]: answer }));
    if (showResults) {
      setShowResults(false);
      setScore(null);
    }
  };

  const checkAnswers = () => {
    if (showResults || showAnswers) return;
    const hasEmptySentence = exerciseSentences.some((sentence, i) => {
      const userSentence = userAnswers[sentence.id];
      const userWeather = weatherAnswers[i];

      return !userSentence || userSentence.trim() === "" || !userWeather;
    });

    if (hasEmptySentence) {
      ValidationAlert.info();
      return;
    }

    setShowResults(true);

    let score = 0;
    exerciseSentences.forEach((sentence, i) => {
      const userWords = userAnswers[sentence.id]
        .replace(/[.,!?]/g, "")
        .trim()
        .toLowerCase()
        .split(/\s+/);

      const correctWords = sentence.correct
        .replace(/[.,!?]/g, "")
        .trim()
        .toLowerCase()
        .split(/\s+/);

      const correctSentence =
        userWords.length === correctWords.length &&
        userWords.every((word, idx) => word === correctWords[idx]);

      const correctWeather =
        weatherAnswers[i]?.toLowerCase() === sentence.weather.toLowerCase();

      if (correctSentence) score++; // +1 للجملة
      if (correctWeather) score++; // +1 للطقس
    });

    setScore({ correct: score, total: exerciseSentences.length * 2 });

    const total = exerciseSentences.length * 2;

    if (score === total) {
      ValidationAlert.success(`Score: ${score}/${total}`);
    } else if (score === 0) {
      ValidationAlert.error(`Score: ${score}/${total}`);
    } else {
      ValidationAlert.warning(`Score: ${score}/${total}`);
    }
  };

  const handleStartAgain = () => {
    setUserAnswers({});
    setWeatherAnswers(Array(exerciseSentences.length).fill("")); // 🔥 مهم

    setShowResults(false);
    setScore(null);
    setShowAnswers(false);

    setResetKey((prevKey) => prevKey + 1);
  };
  const handleShowAnswer = () => {
    setShowAnswers(true);

    const allAnswers = {};
    const allWeather = [];

    exerciseSentences.forEach((sentence) => {
      allAnswers[sentence.id] = sentence.correct;
      allWeather.push(sentence.weather);
    });

    setUserAnswers(allAnswers);
    setWeatherAnswers(allWeather); // 🔥 مهم جداً

    setShowResults(true);
    setScore({
      correct: exerciseSentences.length,
      total: exerciseSentences.length,
    });
  };
  const usedWeather = weatherAnswers;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="main-container-component">
        <div className="div-forall">
          <h5 className="header-title-page8" style={{ marginBottom: "10px" }}>
            <span className="ex-A mr-3">E</span>Look, unscramble, and answer. Use the
            words below.
          </h5>
          <Droppable droppableId="weather-bank" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "10px",
                  border: "2px dashed #ccc",
                  borderRadius: "10px",
                  marginTop: "20px",
                  justifyContent: "center",
                  width: "100%",
                  marginBottom: "20px",
                }}
              >
                {weatherBank.map((word, index) => (
                  <Draggable
                    key={word}
                    draggableId={`weather-${word}`}
                    index={index}
                  >
                    {(provided) => {
                      const isUsed = usedWeather.includes(word);

                      return (
                        <span
                          ref={provided.innerRef}
                          {...(!isUsed ? provided.draggableProps : {})}
                          {...(!isUsed ? provided.dragHandleProps : {})}
                          style={{
                            padding: "7px 14px",
                            border: "2px solid #2c5287",
                            borderRadius: "8px",
                            background: isUsed ? "#eee" : "white",
                            fontWeight: "bold",
                            cursor: isUsed ? "not-allowed" : "grab",
                            opacity: isUsed ? 0.5 : 1,
                            fontSize: "16px",
                            ...provided.draggableProps.style,
                          }}
                        >
                          {word}
                        </span>
                      );
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="space-y-8">
            {exerciseSentences.map((sentence, index) => (
              <div
                key={sentence.id}
                className="flex items-start gap-4 p-4 rounded-xl transition-all hover:bg-gray-50"
              >
                <span className="font-bold text-blue-600 text-xl pt-2">
                  {index + 1}.
                </span>
                <div className="flex-1">
                  <SentenceBuilder
                    key={`${sentence.id}-${resetKey}`}
                    id={sentence.id}
                    scrambled={sentence.scrambled}
                    correct={sentence.correct}
                    onUpdate={(answer) =>
                      handleAnswerUpdate(sentence.id, answer)
                    }
                    showResult={showResults}
                    forceAnswer={showAnswers}
                    index={index}
                    weatherAnswer={weatherAnswers[index]}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <Button
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleStartAgain}
              checkAnswers={checkAnswers}
            />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Unit4_Page6_Q2;
