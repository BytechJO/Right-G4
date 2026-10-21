import ComprehensionA from "./ComprehensionA";
import ComprehensionB from "./ComprehensionB";

import imgReading from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 11/SVG/Asset 2.svg";
import readingAudio from "../../../assets/audio/ClassBook/Grade 4/cd8pg11-reading-adult-lady_GCwsEHZl.mp3";
import ReadingSection from "../ReadingSection";

import img from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 11/SVG/Asset 3.svg";

const ReadingSection_U1 = () => {
  // const paragraphs = [
  //   "What kinds of things will be invented in the future? Many people like to talk about what will happen in the future. Will there be things that we won't use anymore? There are some people who like to think about the future. They are building a museum. It will be called the Museum of Future Inventions.",
  //   "This museum will show scientists' ideas about future technology. There will be tiny phones, and their screens will be projected. There will be new computers and games at this museum. Some of the items won't actually work because they haven't been invented yet! But they will be possibilities for the future. There will be a large room like a library of the future. Do you think there will be more books or more computers in that room? There will be ideas for a future cinema at this museum too. There will even be an idea room for students. They will be able to give their ideas for future inventions. The museum will choose the best ideas and put them in the museum. Is there an idea that you would like to send to the Museum of Future Inventions?",
  // ];
  const captions = [
    {
      start: 0.78,
      end: 3.28,
      text: "Page 11, Reading.",
    },
    {
      start: 3.28,
      end: 5.66,
      text: "What kind of sports do you like?",
    },
    {
      start: 5.66,
      end: 8.7,
      text: "What kinds of sports do you play during gym class?",
    },
    {
      start: 9.82,
      end: 10.72,
      text: "Sports Day.",
    },
    {
      start: 10.72,
      end: 14.72,
      text: "My class is planning an exciting event.",
    },
    {
      start: 14.72,
      end: 16.74,
      text: "We're going to play sports all day.",
    },
    {
      start: 16.74,
      end: 20.3,
      text: "We are trying to raise money for a charity in our town.",
    },
    {
      start: 21.32,
      end: 23.68,
      text: "This charity helps people find jobs.",
    },
    {
      start: 23.68,
      end: 27.2,
      text: "Our special sports day is going to be next Saturday.",
    },
    {
      start: 27.2,
      end: 33.34,
      text: "All the students in our class are asking their family and friends to sponsor them for the sports day.",
    },
    {
      start: 33.34,
      end: 44.96,
      text: "This means the sponsors are going to give us some money for each hour that we play. After we finish the day, we will take our card that shows how many hours we played to our sponsors.",
    },
    {
      start: 44.96,
      end: 51.04,
      text: "They will give us the money, and we are going to give all the money we get to the charity.",
    },
    {
      start: 51.04,
      end: 54.62,
      text: "Sports day is going to be 12 hours long.",
    },
    {
      start: 54.62,
      end: 58.48,
      text: "We are going to play soccer, basketball, and volleyball.",
    },
    {
      start: 58.48,
      end: 65.16,
      text: "We are going to play for two hours, and then we will take a break for half an hour.",
    },
    {
      start: 65.16,
      end: 69.16,
      text: "After each meal, we will sit and rest for a half an hour.",
    },
    {
      start: 69.16,
      end: 73.54,
      text: "That means we are going to play sports for a total of eight hours that day.",
    },
    {
      start: 74.58,
      end: 79.08,
      text: "I think we're going to be tired at the end of the day, but it's going to be fun.",
    },
  ];
  // Measured from this unit's SVG; coordinates are percentages of its full image.
  // Caption timing groups are preserved, including groups containing several sentences.
  const sentenceHighlights = [
    {
      captionIndex: 4,
      boxes: [{ x: 43.1944, y: 13.5429, width: 33.5111, height: 4.589 }],
    },
    {
      captionIndex: 5,
      boxes: [
        { x: 77.2537, y: 13.4849, width: 18.1815, height: 4.647 },
        { x: 40.513, y: 19.11, width: 12.6963, height: 4.589 },
      ],
    },
    {
      captionIndex: 6,
      boxes: [
        { x: 53.7556, y: 19.0404, width: 43.487, height: 4.6586 },
        { x: 40.4574, y: 25.1759, width: 4.7315, height: 3.2668 },
      ],
    },
    {
      captionIndex: 7,
      boxes: [{ x: 45.7204, y: 24.6076, width: 30.6722, height: 4.8867 }],
    },
    {
      captionIndex: 8,
      boxes: [{ x: 43.1704, y: 32.7844, width: 46.8944, height: 4.6277 }],
    },
    {
      captionIndex: 9,
      boxes: [
        { x: 90.55, y: 32.765, width: 2.4, height: 3.7733 },
        { x: 40.4574, y: 38.3206, width: 54.2056, height: 4.6586 },
        { x: 40.513, y: 43.8877, width: 28.7556, height: 4.6586 },
      ],
    },
    {
      captionIndex: 10,
      boxes: [
        { x: 69.8, y: 43.9573, width: 24.4, height: 4.589 },
        { x: 40.5574, y: 49.4587, width: 55.2481, height: 4.6548 },
        { x: 40.5185, y: 55.022, width: 53.7907, height: 4.6586 },
        { x: 40.5426, y: 60.6588, width: 28.8907, height: 4.589 },
      ],
    },
    {
      captionIndex: 11,
      boxes: [
        { x: 69.9648, y: 60.6588, width: 24.4296, height: 4.589 },
        { x: 40.5685, y: 66.2259, width: 54.4056, height: 4.589 },
      ],
    },
    {
      captionIndex: 12,
      boxes: [{ x: 4.8407, y: 74.3331, width: 38.9296, height: 4.6277 }],
    },
    {
      captionIndex: 13,
      boxes: [{ x: 44.2944, y: 74.3138, width: 49.9519, height: 4.647 }],
    },
    {
      captionIndex: 14,
      boxes: [
        { x: 94.7704, y: 74.3138, width: 3.2611, height: 3.8622 },
        { x: 2.2444, y: 79.8732, width: 70.2667, height: 4.6548 },
      ],
    },
    {
      captionIndex: 15,
      boxes: [
        { x: 72.9944, y: 79.8732, width: 23.6907, height: 3.8352 },
        { x: 2.2444, y: 85.4403, width: 22.0796, height: 3.8352 },
      ],
    },
    {
      captionIndex: 16,
      boxes: [{ x: 24.8556, y: 85.4403, width: 66.1963, height: 4.6548 }],
    },
    {
      captionIndex: 17,
      boxes: [
        { x: 91.5852, y: 85.5022, width: 5.2648, height: 3.7462 },
        { x: 2.1926, y: 91.0075, width: 61.5944, height: 4.6548 },
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="w-[60%]">
        <ReadingSection
          mainTitle="What kinds of sports do you like? What kinds of sports 
do you play during gym class?"
          image={imgReading}
          image1={img}
          sound={readingAudio}
          captions={captions}
          sentenceHighlights={sentenceHighlights}
          pageId="sb_unit2_page11_reading"
          stopAtSecond={9}
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
