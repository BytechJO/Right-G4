import ComprehensionA from "./ComprehensionA";
import ComprehensionB from "./ComprehensionB";

import imgReading from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 23/SVG/Asset 1.svg";
import readingAudio from "../../../assets/audio/ClassBook/Grade 4/cd16pg23-reading-adult-lady_Feoi9jgI.mp3";
import ReadingSection from "../ReadingSection";

import img from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 23/SVG/Asset 2.svg";

const ReadingSection_U1 = () => {
  const paragraphs = [
    "What kinds of things will be invented in the future? Many people like to talk about what will happen in the future. Will there be things that we won't use anymore? There are some people who like to think about the future. They are building a museum. It will be called the Museum of Future Inventions.",
    "This museum will show scientists' ideas about future technology. There will be tiny phones, and their screens will be projected. There will be new computers and games at this museum. Some of the items won't actually work because they haven't been invented yet! But they will be possibilities for the future. There will be a large room like a library of the future. Do you think there will be more books or more computers in that room? There will be ideas for a future cinema at this museum too. There will even be an idea room for students. They will be able to give their ideas for future inventions. The museum will choose the best ideas and put them in the museum. Is there an idea that you would like to send to the Museum of Future Inventions?",
  ];

const captions = [
  {
    start: 0.52,
    end: 2.14,
    text: "Page 23, Reading.",
  },
  {
    start: 3.82,
    end: 16.84,
    text: "Do you have your own room? What does your room look like? Has your room changed? Has your room ever changed? Is it the same as when you were a baby? Is it different? It probably has changed.",
  },
  {
    start: 16.84,
    end: 24.00,
    text: "When you were small, you had a crib. Your toys were probably different too. You probably have different ones now.",
  },
  {
    start: 25.02,
    end: 34.76,
    text: "Did you have soft toys when you were a baby? Maybe you had a rattle or a mobile. These kinds of toys are fun for babies. What kinds of things do you play with now?",
  },
  {
    start: 35.86,
    end: 42.32,
    text: "Now, you can choose your toys, but when you were little, your parents got your toys. They were probably safe for you.",
  },
  {
    start: 43.64,
    end: 52.66,
    text: "Did you have different colors in your room when you were a baby? Are any of those colors in your room now? Do you share a room or do you have your own room?",
  },
  {
    start: 53.96,
    end: 67.20,
    text: "There are probably many ways your room has changed. Ask your parents or look at old pictures of your room. Find out what you had in your room when you were a baby. Do you remember any of the things?",
  },
];
  // Measured from this unit's SVG; coordinates are percentages of its full image.
  // Caption timing groups are preserved, including groups containing several sentences.
  const sentenceHighlights = [
    { captionIndex: 1, boxes: [
      {x: 43.2333,y: 14.0093,width: 54.9111,height: 4.8866},
      {x: 40.5685,y: 19.8633,width: 43.0574,height: 4.9607}
    ] },
    { captionIndex: 2, boxes: [
      {x: 84.15,y: 19.8757,width: 14.1426,height: 4.9483},
      {x: 40.513,y: 25.7914,width: 54.2482,height: 4.9607},
      {x: 40.5185,y: 31.7196,width: 34.35,height: 4.9607}
    ] },
    { captionIndex: 3, boxes: [
      {x: 43.2296,y: 40.3936,width: 52.1722,height: 4.9607},
      {x: 40.5426,y: 46.3217,width: 56.4074,height: 4.9607},
      {x: 40.5093,y: 52.2539,width: 38.7593,height: 4.9566}
    ] },
    { captionIndex: 4, boxes: [
      {x: 79.8259,y: 52.2539,width: 18.0407,height: 4.9566},
      {x: 40.5278,y: 58.252,width: 54.9815,height: 4.8866},
      {x: 40.5167,y: 64.1102,width: 29.9185,height: 4.9566}
    ] },
    { captionIndex: 5, boxes: [
      {x: 43.2296,y: 72.7842,width: 51.1389,height: 4.9566},
      {x: 2.2407,y: 78.7123,width: 92.5333,height: 4.9566}
    ] },
    { captionIndex: 6, boxes: [
      {x: 2.1889,y: 84.6404,width: 92.2074,height: 4.9566},
      {x: 2.2852,y: 90.5685,width: 90.7167,height: 4.9566}
    ] }
  ];

  return (
    
    <div className="flex flex-col items-center">
        <div className="w-[60%]">
      <ReadingSection
        mainTitle="What would you like to see invented in the future? Do you have an idea for a future invention?"
        title="Inventions of the Future"
        image={imgReading}
        image1= {img}
        question="Do you think new inventions will be good or bad for Earth?"
        sound={readingAudio}
        captions={captions}
        sentenceHighlights={sentenceHighlights}
        pageId="sb_unit3_page23_reading"
        stopAtSecond={2.5}
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