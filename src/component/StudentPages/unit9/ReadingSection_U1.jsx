import ComprehensionA from "./ComprehensionA";
import ComprehensionB from "./ComprehensionB";

import imgReading from "../../../assets/imgs/pages/Class Book/Right 4 Unit 9 Tom Has Nothing to Do Folder/Page 77/SVG/Asset 1.svg";
import readingAudio from "../../../assets/audio/ClassBook/Grade 4/cd48pg77-reading-adult-lady_oaCVYLur.mp3";
import ReadingSection from "../ReadingSection";

import img from"../../../assets/imgs/pages/Class Book/Right 4 Unit 9 Tom Has Nothing to Do Folder/Page 77/SVG/Asset 23.svg"

const ReadingSection_U1 = () => {
  const paragraphs = [
    "What kinds of things will be invented in the future? Many people like to talk about what will happen in the future. Will there be things that we won't use anymore? There are some people who like to think about the future. They are building a museum. It will be called the Museum of Future Inventions.",
    "This museum will show scientists' ideas about future technology. There will be tiny phones, and their screens will be projected. There will be new computers and games at this museum. Some of the items won't actually work because they haven't been invented yet! But they will be possibilities for the future. There will be a large room like a library of the future. Do you think there will be more books or more computers in that room? There will be ideas for a future cinema at this museum too. There will even be an idea room for students. They will be able to give their ideas for future inventions. The museum will choose the best ideas and put them in the museum. Is there an idea that you would like to send to the Museum of Future Inventions?",
  ];

const captions = [
  {
    start: 0.28,
    end: 2.10,
    text: "Page 77, Reading.",
  },
  {
    start: 2.10,
    end: 10.08,
    text: "What are the things that your parents do to take care of you? Do you think that animals have parents that take care of them, too?",
  },
  {
    start: 10.08,
    end: 12.10,
    text: "A different kind of king.",
  },
  {
    start: 12.10,
    end: 22.24,
    text: "Emperor means king, and the emperor penguins got their name from their large size and the amazing things they do in their lives.",
  },
  {
    start: 22.24,
    end: 28.56,
    text: "Every year, emperor penguins walk for more than one hundred kilometers across the ice.",
  },
  {
    start: 28.56,
    end: 31.98,
    text: "They travel in groups of hundreds of penguins.",
  },
  {
    start: 31.98,
    end: 37.22,
    text: "They walk until they find a good place for the female penguins to lay their eggs.",
  },
  {
    start: 38.62,
    end: 40.78,
    text: "Each female penguin lays one egg.",
  },
  {
    start: 40.78,
    end: 48.46,
    text: "Surprisingly, the father sits on the egg because the mother must walk back to the sea to look for food for the baby.",
  },
  {
    start: 50.20,
    end: 53.04,
    text: "The father waits patiently for the eggs to hatch.",
  },
  {
    start: 53.04,
    end: 60.60,
    text: "They wait sixty-four days. They have to stand close together because it is freezing and windy.",
  },
  {
    start: 62.42,
    end: 65.12,
    text: "The eggs hatch while the mothers are gone.",
  },
  {
    start: 65.12,
    end: 70.68,
    text: "When they come back with food for their babies, the fathers go to find food to eat.",
  },
  {
    start: 70.68,
    end: 72.36,
    text: "They are probably very hungry.",
  },
  {
    start: 72.36,
    end: 78.12,
    text: "The parents find food for their babies until the baby penguins are about four months old.",
  },
  {
    start: 79.60,
    end: 84.34,
    text: "After that, the babies must find their own food and take care of themselves.",
  },
  {
    start: 84.34,
    end: 88.02,
    text: "Emperor penguins are amazing animals.",
  },
];
  // Measured from this unit's SVG; coordinates are percentages of its full image.
  // Caption timing groups are preserved, including groups containing several sentences.
  const sentenceHighlights = [
    { captionIndex: 3, boxes: [
      {x: 34.5667,y: 13.1184,width: 59.6519,height: 4.4854},
      {x: 31.9056,y: 18.4858,width: 57.7833,height: 4.5229}
    ] },
    { captionIndex: 4, boxes: [
      {x: 34.5944,y: 26.3944,width: 63.1537,height: 4.5229},
      {x: 31.8389,y: 31.867,width: 6.3611,height: 3.6596}
    ] },
    { captionIndex: 5, boxes: [
      {x: 38.7315,y: 31.8032,width: 40.9315,height: 4.5192}
    ] },
    { captionIndex: 6, boxes: [
      {x: 80.1944,y: 31.8632,width: 17.3333,height: 4.4591},
      {x: 31.9056,y: 37.2044,width: 53.3259,height: 4.5229}
    ] },
    { captionIndex: 7, boxes: [
      {x: 85.8333,y: 37.2044,width: 10.9092,height: 3.7272},
      {x: 31.9944,y: 42.677,width: 19.5167,height: 4.4554}
    ] },
    { captionIndex: 8, boxes: [
      {x: 52.0685,y: 42.6094,width: 44.5222,height: 4.5229},
      {x: 31.9481,y: 48.0144,width: 56.0944,height: 4.5229}
    ] },
    { captionIndex: 9, boxes: [
      {x: 34.5222,y: 55.9267,width: 42.1648,height: 4.5192}
    ] },
    { captionIndex: 10, boxes: [
      {x: 77.2185,y: 55.893,width: 16.8852,height: 4.553},
      {x: 31.8981,y: 61.3317,width: 59.2759,height: 4.5192}
    ] },
    { captionIndex: 11, boxes: [
      {x: 34.5222,y: 69.3041,width: 38.4037,height: 4.4554}
    ] },
    { captionIndex: 12, boxes: [
      {x: 73.45,y: 69.2516,width: 19.8481,height: 4.5079},
      {x: 31.9,y: 74.6453,width: 53.6259,height: 4.5192}
    ] },
    { captionIndex: 13, boxes: [
      {x: 86.0574,y: 74.7091,width: 7.8648,height: 4.4554},
      {x: 31.9944,y: 80.1141,width: 19.8722,height: 4.4554}
    ] },
    { captionIndex: 14, boxes: [
      {x: 52.4222,y: 80.0503,width: 40.9315,height: 4.5192},
      {x: 31.9963,y: 85.4553,width: 36.9778,height: 4.5192}
    ] },
    { captionIndex: 15, boxes: [
      {x: 69.4593,y: 85.4553,width: 27.5278,height: 4.4253},
      {x: 2.1315,y: 90.8603,width: 38.8889,height: 3.7385}
    ] },
    { captionIndex: 16, boxes: [
      {x: 41.6241,y: 90.9241,width: 35.2685,height: 4.4554}
    ] }
  ];

  return (
    
    <div className="flex flex-col items-center">
        <div className="w-[60%]">
      <ReadingSection
        mainTitle="What are the things that your parents do to take care 
of you? Do you think that animals have parents that 
take care of them, too?"
        image={imgReading}
        image1= {img}
        sound={readingAudio}
        captions={captions}
        sentenceHighlights={sentenceHighlights}
        pageId="sb_unit9_page77_reading"
        stopAtSecond={2.5}
          textLen = {31}
      />

 </div>
      <div className="w-[60%] mt-4 space-y-6 mb-7">
        <ComprehensionA />
        {/* <ComprehensionB /> */}
      </div>
     
    </div>
  );
};

export default ReadingSection_U1;