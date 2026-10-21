import React, { useEffect, useState } from "react";
import QuestionAudioPlayer from "../QuestionAudioPlayer";
import SectionBanner from "./SectionBanner";
import { useAudio } from "../../context/AudioContext";
import ExerciseHeader from "../ExerciseHeader";

const ReadingSection = ({
  mainTitle,
  image,
  image1,
  sound,
  captions,
  stopAtSecond,
  // textLen,
  pageId,
  subTitle,
  titleHeader,
  sentenceHighlights = [],
}) => {
  const { stopCurrent } = useAudio();
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => { setCurrentTime(0); }, [sound, pageId]);
  // Coordinates are percentages of the unchanged reading image.
  const activeHighlight = sentenceHighlights.find(({ captionIndex }) => {
    const caption = captions?.[captionIndex];
    return caption && currentTime >= caption.start && currentTime < caption.end;
  });

  return (
    <div className="flex flex-col items-center">
      <div className="w-[100%] mx-auto">
        <ExerciseHeader
          // sectionLetter="D"
          // questionNumber="1"
          title={titleHeader}
          subTitle={subTitle}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            // whiteSpace: "nowrap",
            marginLeft: "auto",
          }}
        >
          <div
            style={{
              whiteSpace: "nowrap",
            }}
          >
            <SectionBanner title="Reading" />
          </div>
          <h2
            style={{
              position: "relative",
              top: "0.5em",
              // whiteSpace: textLen > 20 ? "wrap" : "nowrap",
            }}
            className="font-bold text-[18px] text-black 
 "
          >
            {mainTitle}
          </h2>
        </div>
        <div style={{ margin: "3em 0 2em" }}>
          <QuestionAudioPlayer
            src={sound}
            captions={captions}
            stopAtSecond={stopAtSecond}
            onPlay={stopCurrent}
            pageId={pageId}
            onTimeUpdate={setCurrentTime}
          />
        </div>
      </div>

      <div className="w-[100%] mt-2" style={{ position: "relative" }}>
        <img
          src={image}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        {activeHighlight && (
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              pointerEvents: "none", mixBlendMode: "multiply",
            }}
          >
            {activeHighlight.boxes.map((box, index) => (
              <rect key={index} x={box.x} y={box.y}
                width={box.width} height={box.height}
                rx={0.3} fill="#ffe066" fillOpacity={0.55} />
            ))}
          </svg>
        )}
      </div>

      <div className="w-[100%] my-5">
        <img
          style={{ width: "100%", height: "auto", display: "block" }}
          src={image1}
          alt="think"
        />
      </div>

      <div className="mt-3 space-y-6 w-[100%] mb-3">
        <div className="flex items-center gap-4">
          <SectionBanner title="Comprehension" />
          <h2
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              marginLeft: "auto",
            }}
            className="font-bold text-[18px] text-black"
          ></h2>
        </div>
      </div>
    </div>
  );
};

export default ReadingSection;
