import ComprehensionA from "./page5_ComprehensionA";
import ComprehensionB from "./page5_ComprehensionB";

import imgReading from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page5/SVG/Asset 30.svg";
import readingAudio from "../../../assets/audio/ClassBook/Grade 4/cd3pg5-reading-adult-lady_sHccBvXt.mp3";
import ReadingSection from "../ReadingSection";

import img from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page5/SVG/Asset 31.svg";

const ReadingSection_U1 = () => {

  const captions = [
    {
      start: 0.12,
      end: 5.16,
      text: "Page 5 reading. What would you like to see invented in the future?",
    },
    {
      start: 5.16,
      end: 8.06,
      text: "Do you have an idea for a future invention?",
    },
    {
      start: 8.06,
      end: 10.24,
      text: "Inventions of the Future.",
    },
    {
      start: 11.42,
      end: 14.18,
      text: "What kinds of things will be invented in the future?",
    },
    {
      start: 14.18,
      end: 18.52,
      text: "Many people like to talk about what will happen in the future.",
    },
    {
      start: 18.52,
      end: 21.04,
      text: "Will there be things that we won't use anymore?",
    },
    {
      start: 22.24,
      end: 25.08,
      text: "There are some people who like to think about the future.",
    },
    {
      start: 25.08,
      end: 26.9,
      text: "They are building a museum.",
    },
    {
      start: 26.9,
      end: 30.74,
      text: "It will be called The Museum of Future Inventions.",
    },
    {
      start: 32.12,
      end: 36.12,
      text: "This museum will show scientists' ideas about future technology.",
    },
    {
      start: 37.28,
      end: 41.0,
      text: "There will be tiny phones, and their screens will be projected.",
    },
    {
      start: 41.0,
      end: 44.7,
      text: "There will be new computers and games at this museum.",
    },
    {
      start: 44.7,
      end: 52.02,
      text: "Some of the items won't actually work because they haven't been invented yet, but they will be possibilities for the future.",
    },
    {
      start: 53.2,
      end: 56.62,
      text: "There will be a large room, like a library, for the future.",
    },
    {
      start: 56.62,
      end: 60.66,
      text: "Do you think there will be more books or more computers in that room?",
    },
    {
      start: 62.62,
      end: 66.68,
      text: "There will be ideas for a future cinema at this museum, too.",
    },
    {
      start: 66.68,
      end: 70.36,
      text: "There will even be an idea room for students.",
    },
    {
      start: 71.54,
      end: 75.2,
      text: "They will be able to give their ideas for future inventions.",
    },
    {
      start: 77.52,
      end: 81.64,
      text: "The museum will choose the best ideas and put them in the museum.",
    },
    {
      start: 81.64,
      end: 86.32,
      text: "Is there an idea that you would like to send to the Museum of Future Inventions?",
    },
  ];

  // Measured against the actual 540 x 248.32 SVG artwork.
  // Each caption may span several line rectangles; all coordinates are percentages.
  const sentenceHighlights = [
    {
      captionIndex: 3,
      boxes: [{ x: 43.1333, y: 13.5269, width: 44.837, height: 4.8526 }],
    },
    {
      captionIndex: 4,
      boxes: [
        { x: 88.5056, y: 13.6517, width: 5, height: 4.7278 },
        { x: 40.6111, y: 19.3259, width: 49.2611, height: 4.8526 },
      ],
    },
    {
      captionIndex: 5,
      boxes: [
        { x: 90.3963, y: 19.338, width: 3.7278, height: 4.023 },
        { x: 40.4574, y: 25.1973, width: 38.25, height: 4.7801 },
      ],
    },
    {
      captionIndex: 6,
      boxes: [
        { x: 79.1889, y: 25.1973, width: 13.7518, height: 3.9264 },
        { x: 40.6111, y: 30.9238, width: 36.2852, height: 4.8526 },
      ],
    },
    {
      captionIndex: 7,
      boxes: [
        { x: 77.4278, y: 30.9963, width: 17.337, height: 4.7801 },
        { x: 40.5667, y: 37.8544, width: 7.3259, height: 2.8632 },
      ],
    },
    {
      captionIndex: 8,
      boxes: [{ x: 48.4019, y: 36.7228, width: 42.5944, height: 4.015 }],
    },
    {
      captionIndex: 9,
      boxes: [{ x: 43.1407, y: 45.2118, width: 55.0093, height: 4.8486 }],
    },
    {
      captionIndex: 10,
      boxes: [{ x: 40.5167, y: 51.0793, width: 53.8926, height: 5.0177 }],
    },
    {
      captionIndex: 11,
      boxes: [{ x: 40.5167, y: 56.8782, width: 49.2407, height: 4.7801 }],
    },
    {
      captionIndex: 12,
      boxes: [
        { x: 90.3148, y: 56.838, width: 4.8852, height: 4.015 },
        { x: 40.5352, y: 62.6087, width: 52.0722, height: 4.8486 },
        { x: 40.55, y: 68.4077, width: 48.7, height: 4.8486 },
      ],
    },
    {
      captionIndex: 13,
      boxes: [
        { x: 89.7815, y: 68.4762, width: 5.0037, height: 3.9183 },
        { x: 2.1926, y: 74.2067, width: 42.313, height: 4.8486 },
      ],
    },
    {
      captionIndex: 14,
      boxes: [
        { x: 45.1259, y: 74.2711, width: 52.3463, height: 4.7842 },
        { x: 2.1333, y: 80.0741, width: 9.463, height: 3.9264 },
      ],
    },
    {
      captionIndex: 15,
      boxes: [{ x: 12.0778, y: 80.0056, width: 51.5537, height: 3.9948 }],
    },
    {
      captionIndex: 16,
      boxes: [
        { x: 64.163, y: 80.0056, width: 31.9407, height: 4.011 },
        { x: 2.1889, y: 85.8731, width: 7.5185, height: 3.9264 },
      ],
    },
    {
      captionIndex: 17,
      boxes: [{ x: 10.2389, y: 85.8046, width: 50.3389, height: 4.8486 }],
    },
    {
      captionIndex: 18,
      boxes: [
        { x: 61.1093, y: 85.8731, width: 33.7519, height: 3.9264 },
        { x: 2.2444, y: 91.672, width: 24.9278, height: 4.7801 },
      ],
    },
    {
      captionIndex: 19,
      boxes: [{ x: 27.6815, y: 91.6036, width: 69.837, height: 4.8486 }],
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="w-[60%]">
        <ReadingSection
          mainTitle="What would you like to see invented in the future?  
Do you have an idea for a future invention?"
          title="Inventions of the Future"
          image={imgReading}
          image1={img}
          question="Do you think new inventions will be good or bad for Earth?"
          sound={readingAudio}
          captions={captions}
          sentenceHighlights={sentenceHighlights}
          stopAtSecond={8}
          titleHeader={"Listen and read along: Inventions of the Future."}
          subTitle={
            "Press Play, follow the text in Inventions of the Future, then pause or replay any part you need to hear again."
          }
          pageId={"sb-unit1-page5-reading-activty"}
        />
      </div>
      <div className="w-[60%] mt-4 space-y-6 mb-7">
        <ComprehensionA />
        <ComprehensionB />
      </div>
    </div>
  );
};

export default ReadingSection_U1;
