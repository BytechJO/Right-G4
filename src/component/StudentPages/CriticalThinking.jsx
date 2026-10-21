import React, { useState } from "react";
import Rabbit from "../../assets/Page 01/Rabbit.svg";
import ExerciseHeader from "../ExerciseHeader";

const CriticalThinking = ({ title }) => {
  const [answer, setAnswer] = useState("");

  const handleReset = () => {
    setAnswer("");
  };

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: "20px",
        }}
      >
        {/* <img
          src={Rabbit}
          style={{ height: "50px", width: "auto", paddingTop: "5px" }}
        /> */}
        {/* <h5 style={{ paddingTop: "8px" }} className="header-title-page8">
          {title}
        </h5> */}
        <ExerciseHeader
          // sectionLetter="D"
          // questionNumber="1"
          title={title}
          subTitle=""
        />
      </div>

      {/* input */}
      <textarea
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your answer here..."
        style={{
          margin: "7% 0",
          width: "60%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "14px",
          minHeight: "260px",
        }}
      />
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default CriticalThinking;
