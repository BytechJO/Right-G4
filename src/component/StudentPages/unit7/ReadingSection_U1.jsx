import ComprehensionA from "./ComprehensionA";
import ComprehensionB from "./ComprehensionB";

import imgReading from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 59/SVG/000.svg";
import readingAudio from "../../../assets/audio/ClassBook/Grade 4/cd38pg59-reading-adult-lady_Iy6h4zxg.mp3";
import ReadingSection from "../ReadingSection";

import img from"../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 59/SVG/Asset 20.svg"

const ReadingSection_U1 = () => {
  const paragraphs = [
    "What kinds of things will be invented in the future? Many people like to talk about what will happen in the future. Will there be things that we won't use anymore? There are some people who like to think about the future. They are building a museum. It will be called the Museum of Future Inventions.",
    "This museum will show scientists' ideas about future technology. There will be tiny phones, and their screens will be projected. There will be new computers and games at this museum. Some of the items won't actually work because they haven't been invented yet! But they will be possibilities for the future. There will be a large room like a library of the future. Do you think there will be more books or more computers in that room? There will be ideas for a future cinema at this museum too. There will even be an idea room for students. They will be able to give their ideas for future inventions. The museum will choose the best ideas and put them in the museum. Is there an idea that you would like to send to the Museum of Future Inventions?",
  ];

const captions = [
  {
    start: 0.76,
    end: 10.98,
    text: "Page 59 reading. Would you like to live in a world that is always covered in ice? What kind of things would you need to live on icy land?",
  },
  {
    start: 10.98,
    end: 12.86,
    text: "Is ice nice?",
  },
  {
    start: 12.86,
    end: 23.22,
    text: "From studying rocks, bones, and the Earth's weather, scientists think that there were several times when ice covered lands that are now warmer.",
  },
  {
    start: 24.24,
    end: 26.42,
    text: "They call these times an ice age.",
  },
  {
    start: 26.42,
    end: 32.34,
    text: "What would it be like to live at a time when the Earth was much colder than it is today?",
  },
  {
    start: 33.68,
    end: 35.92,
    text: "There would be some interesting animals to see.",
  },
  {
    start: 35.92,
    end: 48.70,
    text: "During the most recent ice age, scientists believe there weren't any dinosaurs, but there were probably animals like mammoth elephants, giant sloths, and saber-toothed cats.",
  },
  {
    start: 48.70,
    end: 52.68,
    text: "The weather would be colder and different kinds of food would grow.",
  },
  {
    start: 53.78,
    end: 59.58,
    text: "People and animals had to be strong to make the changes they needed for the cold weather.",
  },
  {
    start: 59.58,
    end: 64.74,
    text: "There were fewer animals because not all of them could stay alive in the cold.",
  },
  {
    start: 64.74,
    end: 69.82,
    text: "There was a lot less land because the ice covered so much of it.",
  },
  {
    start: 69.82,
    end: 74.10,
    text: "The ice age would have been an unusual time to live in.",
  },
];
  // Measured from this unit's SVG; coordinates are percentages of its full image.
  // Caption timing groups are preserved, including groups containing several sentences.
  const sentenceHighlights = [
    { captionIndex: 2, boxes: [
      {x: 38.3519,y: 14.3146,width: 58.3,height: 4.9987},
      {x: 35.5963,y: 20.3779,width: 58.7204,height: 4.1193},
      {x: 35.6574,y: 27.5141,width: 7.15,height: 3.0211}
    ] },
    { captionIndex: 3, boxes: [
      {x: 43.3389,y: 26.3738,width: 30.2407,height: 5.0576}
    ] },
    { captionIndex: 4, boxes: [
      {x: 38.2722,y: 34.0486,width: 56.3907,height: 4.2035},
      {x: 35.6537,y: 40.1708,width: 20.2963,height: 4.9945}
    ] },
    { captionIndex: 5, boxes: [
      {x: 56.4315,y: 40.1708,width: 38.1,height: 4.9945},
      {x: 35.6537,y: 47.3365,width: 3.513,height: 2.9917}
    ] },
    { captionIndex: 6, boxes: [
      {x: 39.787,y: 46.1668,width: 58.3944,height: 5.0576},
      {x: 35.7037,y: 52.2848,width: 60.6037,height: 4.9987},
      {x: 35.6981,y: 58.3481,width: 31.8722,height: 4.9945}
    ] },
    { captionIndex: 7, boxes: [
      {x: 68.1019,y: 58.3481,width: 29.8741,height: 4.1025},
      {x: 35.7037,y: 64.3314,width: 31.3315,height: 5.0703}
    ] },
    { captionIndex: 8, boxes: [
      {x: 38.4111,y: 72.0778,width: 55.6093,height: 4.9987},
      {x: 35.6889,y: 78.0653,width: 25.7056,height: 4.1782}
    ] },
    { captionIndex: 9, boxes: [
      {x: 61.9259,y: 78.0653,width: 34.1852,height: 4.1782},
      {x: 2.2444,y: 84.1244,width: 34.063,height: 5.0703}
    ] },
    { captionIndex: 10, boxes: [
      {x: 36.8389,y: 84.1244,width: 55.9574,height: 4.1951}
    ] },
    { captionIndex: 11, boxes: [
      {x: 93.3278,y: 84.2001,width: 3.1537,height: 4.0941},
      {x: 2.1704,y: 90.1961,width: 45.0981,height: 5.0576}
    ] }
  ];

  return (
    
    <div className="flex flex-col items-center">
        <div className="w-[60%]">
      <ReadingSection
        mainTitle="Would you like to live in a world that is always  
covered in ice? What kind of things would you need to 
live on icy land?"
        image={imgReading}
        image1= {img}
        sound={readingAudio}
        captions={captions}
        sentenceHighlights={sentenceHighlights}
        pageId="sb_unit7_page59_reading"
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