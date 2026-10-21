import ComprehensionA from "./ComprehensionA";
import ComprehensionB from "./ComprehensionB";

import imgReading from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 47/SVG/SVG/Asset 2.svg";
import readingAudio from "../../../assets/audio/ClassBook/Grade 4/cd33pg47-reading-adult-lady_5Efd1RGA.mp3";
import ReadingSection from "../ReadingSection";

import img from"../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 47/SVG/SVG/Asset 21.svg"

const ReadingSection_U1 = () => {
  const paragraphs = [
    "What kinds of things will be invented in the future? Many people like to talk about what will happen in the future. Will there be things that we won't use anymore? There are some people who like to think about the future. They are building a museum. It will be called the Museum of Future Inventions.",
    "This museum will show scientists' ideas about future technology. There will be tiny phones, and their screens will be projected. There will be new computers and games at this museum. Some of the items won't actually work because they haven't been invented yet! But they will be possibilities for the future. There will be a large room like a library of the future. Do you think there will be more books or more computers in that room? There will be ideas for a future cinema at this museum too. There will even be an idea room for students. They will be able to give their ideas for future inventions. The museum will choose the best ideas and put them in the museum. Is there an idea that you would like to send to the Museum of Future Inventions?",
  ];
const captions = [
  {
    start: 0.20,
    end: 6.62,
    text: "Page 47, reading. Do you eat vegetables every day? What is your favorite vegetable?",
  },
  {
    start: 6.62,
    end: 8.64,
    text: "A yummy way to work.",
  },
  {
    start: 8.64,
    end: 13.04,
    text: "Do you eat vegetables? Do you think you should eat more vegetables?",
  },
  {
    start: 13.04,
    end: 17.56,
    text: "One way to get delicious vegetables is to start your own garden.",
  },
  {
    start: 17.56,
    end: 20.66,
    text: "Here are some things you should know about starting a garden.",
  },
  {
    start: 20.66,
    end: 30.08,
    text: "First, you should have good soil and a sunny place. You can make your own rich soil, or maybe the soil in your garden is already good.",
  },
  {
    start: 31.58,
    end: 37.08,
    text: "You should loosen the soil by digging it up and turning it over to break up large bunches of dirt.",
  },
  {
    start: 37.08,
    end: 40.64,
    text: "You should take out the rocks and then rake the soil.",
  },
  {
    start: 40.64,
    end: 44.04,
    text: "If you could, plant vegetables in pots.",
  },
  {
    start: 44.04,
    end: 46.86,
    text: "You shouldn't plant without planning first.",
  },
  {
    start: 46.86,
    end: 53.18,
    text: "Make a map of your garden. Think about things you like to eat and are healthy for you.",
  },
  {
    start: 54.38,
    end: 57.66,
    text: "Once you have your garden planned, you should plant your seeds.",
  },
  {
    start: 57.66,
    end: 62.30,
    text: "You should water your plants regularly and check for harmful insects.",
  },
  {
    start: 63.78,
    end: 69.84,
    text: "Maybe when your vegetables are ready, then you can pick them and invite your friends over to eat them with you.",
  },
];
  // Measured from this unit's SVG; coordinates are percentages of its full image.
  // Caption timing groups are preserved, including groups containing several sentences.
  const sentenceHighlights = [
    { captionIndex: 2, boxes: [
      {x: 31.9556,y: 13.1273,width: 62.0889,height: 4.8704}
    ] },
    { captionIndex: 3, boxes: [
      {x: 29.2722,y: 18.998,width: 57.3056,height: 4.9032}
    ] },
    { captionIndex: 4, boxes: [
      {x: 87.2037,y: 19.0923,width: 7.9963,height: 3.9357},
      {x: 29.2389,y: 24.9344,width: 47.4982,height: 4.8704}
    ] },
    { captionIndex: 5, boxes: [
      {x: 31.9389,y: 33.1584,width: 61.9815,height: 4.8705},
      {x: 29.2611,y: 39.0661,width: 56.0963,height: 4.8664}
    ] },
    { captionIndex: 6, boxes: [
      {x: 85.8907,y: 39.0661,width: 9.2759,height: 3.9972},
      {x: 29.337,y: 44.9656,width: 67.9296,height: 4.8705},
      {x: 29.2611,y: 50.8035,width: 6.1759,height: 4.0669}
    ] },
    { captionIndex: 7, boxes: [
      {x: 35.9722,y: 50.8691,width: 45.5852,height: 4.0013}
    ] },
    { captionIndex: 8, boxes: [
      {x: 82.0667,y: 50.8035,width: 16.1019,height: 4.936},
      {x: 29.2185,y: 56.7768,width: 16.6648,height: 4.8664}
    ] },
    { captionIndex: 9, boxes: [
      {x: 31.8685,y: 64.9311,width: 35.9241,height: 4.9401}
    ] },
    { captionIndex: 10, boxes: [
      {x: 68.3759,y: 64.9311,width: 25.9648,height: 4.9401},
      {x: 29.2426,y: 70.8347,width: 51.25,height: 4.9401}
    ] },
    { captionIndex: 11, boxes: [
      {x: 31.8963,y: 79.0956,width: 58.6611,height: 4.9032}
    ] },
    { captionIndex: 12, boxes: [
      {x: 91.0907,y: 79.1899,width: 3.2074,height: 3.9398},
      {x: 2.1889,y: 84.9623,width: 56.9648,height: 4.9401}
    ] },
    { captionIndex: 13, boxes: [
      {x: 59.7389,y: 85.0361,width: 36.4,height: 4.8664},
      {x: 2.1315,y: 90.87,width: 64.1185,height: 4.936}
    ] }
  ];

  return (
    
    <div className="flex flex-col items-center">
        <div className="w-[60%]">
      <ReadingSection
        mainTitle="Do you eat vegetables every day? What is your  
favorite vegetable?"
        image={imgReading}
        image1= {img}
        question="Do you think new inventions will be good or bad for Earth?"
        sound={readingAudio}
        captions={captions}
        sentenceHighlights={sentenceHighlights}
        pageId="sb_unit6_page47_reading"
        stopAtSecond={6.62}
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