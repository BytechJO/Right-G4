import ComprehensionA from "./ComprehensionA";
import ComprehensionB from "./ComprehensionB";

import imgReading from "../../../assets/imgs/pages/Class Book//Right 4 Unit 8 I Lived in the Library Folder/Page 65/SVG/Asset 1.svg";
import img from"../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 65/SVG/Asset 2.svg"
import readingAudio from "../../../assets/audio/ClassBook/Grade 4/cd43pg65-reading-adult-lady_odl1Yvbd.mp3";
import ReadingSection from "../ReadingSection";


const ReadingSection_U1 = () => {
  const paragraphs = [
    "What kinds of things will be invented in the future? Many people like to talk about what will happen in the future. Will there be things that we won't use anymore? There are some people who like to think about the future. They are building a museum. It will be called the Museum of Future Inventions.",
    "This museum will show scientists' ideas about future technology. There will be tiny phones, and their screens will be projected. There will be new computers and games at this museum. Some of the items won't actually work because they haven't been invented yet! But they will be possibilities for the future. There will be a large room like a library of the future. Do you think there will be more books or more computers in that room? There will be ideas for a future cinema at this museum too. There will even be an idea room for students. They will be able to give their ideas for future inventions. The museum will choose the best ideas and put them in the museum. Is there an idea that you would like to send to the Museum of Future Inventions?",
  ];

const captions = [
  {
    start: 0.76,
    end: 2.42,
    text: "Page 65, Reading.",
  },
  {
    start: 2.42,
    end: 14.36,
    text: "How old were you when you walked for the first time? How old were you when you first went to school? Was there anything special that you did before your classmates?",
  },
  {
    start: 15.48,
    end: 17.28,
    text: "How smart is smart?",
  },
  {
    start: 18.42,
    end: 22.36,
    text: "You might be a smart student, but are you like other children in history?",
  },
  {
    start: 22.36,
    end: 26.62,
    text: "Most of us grow up doing the same things at the same times.",
  },
  {
    start: 26.62,
    end: 29.72,
    text: "We walked when we were about one year old.",
  },
  {
    start: 29.72,
    end: 31.88,
    text: "We talked when we were two.",
  },
  {
    start: 31.88,
    end: 37.28,
    text: "We started school when we were five, and we will complete high school when we are eighteen.",
  },
  {
    start: 38.84,
    end: 41.64,
    text: "Some children started doing things much earlier, though.",
  },
  {
    start: 41.64,
    end: 44.80,
    text: "These people are called child prodigies.",
  },
  {
    start: 44.80,
    end: 48.78,
    text: "Here are some examples of smart children throughout history.",
  },
  {
    start: 49.84,
    end: 54.72,
    text: "Wolfgang Mozart was born in Austria in 1756.",
  },
  {
    start: 54.72,
    end: 57.28,
    text: "He loved music when he was very young.",
  },
  {
    start: 57.28,
    end: 61.06,
    text: "He started playing the piano when he was four years old.",
  },
  {
    start: 61.06,
    end: 65.18,
    text: "He started writing his own songs when he was five years old.",
  },
  {
    start: 67.40,
    end: 71.42,
    text: "Jay Luo was born in America in 1970.",
  },
  {
    start: 71.42,
    end: 76.64,
    text: "He graduated from Boise State University with honors when he was twelve years old.",
  },
  {
    start: 76.64,
    end: 80.16,
    text: "He was the youngest university graduate in U.S. history.",
  },
  {
    start: 81.46,
    end: 89.88,
    text: "Asad Ullah Qayyum was born in Pakistan in 1998. He speaks in many different languages.",
  },
  {
    start: 89.88,
    end: 95.10,
    text: "When he was just seven years old, he gave speeches in twelve languages.",
  },
];
  // Measured from this unit's SVG; coordinates are percentages of its full image.
  // Caption timing groups are preserved, including groups containing several sentences.
  const sentenceHighlights = [
    { captionIndex: 3, boxes: [
      {x: 37.1364,y: 19.4488,width: 55.3982,height: 3.9208},
      {x: 34.5368,y: 24.2046,width: 6.7248,height: 3.9208}
    ] },
    { captionIndex: 4, boxes: [
      {x: 41.7967,y: 24.1485,width: 53.0504,height: 3.9769}
    ] },
    { captionIndex: 5, boxes: [
      {x: 34.5035,y: 28.9109,width: 41.8615,height: 3.9637}
    ] },
    { captionIndex: 6, boxes: [
      {x: 76.8298,y: 28.9538,width: 17.149,height: 3.2211},
      {x: 34.5109,y: 34.1353,width: 8.7374,height: 3.4092}
    ] },
    { captionIndex: 7, boxes: [
      {x: 43.7112,y: 33.6535,width: 52.4857,height: 3.9769},
      {x: 34.5368,y: 38.429,width: 24.9551,height: 3.9538}
    ] },
    { captionIndex: 8, boxes: [
      {x: 60.0474,y: 38.4323,width: 35.5941,height: 3.9505},
      {x: 34.5368,y: 43.2145,width: 12.9571,height: 3.9175}
    ] },
    { captionIndex: 9, boxes: [
      {x: 48.0253,y: 43.2145,width: 35.6866,height: 3.9175}
    ] },
    { captionIndex: 10, boxes: [
      {x: 84.3359,y: 43.2607,width: 13.0534,height: 3.1716},
      {x: 34.5368,y: 47.9109,width: 40.7265,height: 3.9769}
    ] },
    { captionIndex: 11, boxes: [
      {x: 37.1271,y: 54.835,width: 41.3579,height: 4.0066}
    ] },
    { captionIndex: 12, boxes: [
      {x: 79.109,y: 54.9241,width: 18.2581,height: 3.231},
      {x: 34.5368,y: 59.6766,width: 17.0027,height: 3.9175}
    ] },
    { captionIndex: 13, boxes: [
      {x: 52.1635,y: 59.6172,width: 41.5931,height: 3.9769},
      {x: 34.5202,y: 64.429,width: 8.88,height: 3.9175}
    ] },
    { captionIndex: 14, boxes: [
      {x: 44.0241,y: 64.3696,width: 53.4041,height: 3.9769}
    ] },
    { captionIndex: 15, boxes: [
      {x: 37.1531,y: 71.3333,width: 33.1334,height: 3.967}
    ] },
    { captionIndex: 16, boxes: [
      {x: 70.9104,y: 71.3234,width: 22.4129,height: 3.9769},
      {x: 34.535,y: 76.1023,width: 48.2771,height: 3.9505}
    ] },
    { captionIndex: 17, boxes: [
      {x: 83.4361,y: 76.1353,width: 9.7262,height: 3.2145},
      {x: 34.5202,y: 80.8548,width: 38.2825,height: 3.9505}
    ] },
    { captionIndex: 18, boxes: [
      {x: 4.7677,y: 87.7855,width: 80.1644,height: 3.9736}
    ] },
    { captionIndex: 19, boxes: [
      {x: 85.4561,y: 87.7921,width: 12.0739,height: 3.297},
      {x: 2.1478,y: 92.5611,width: 49.2196,height: 4.1452}
    ] }
  ];

  return (
    
    <div className="flex flex-col items-center">
        <div className="w-[60%]">
      <ReadingSection
        mainTitle="How old were you when you walked for the first time? 
How old were you when you first went to school? Was 
there anything special that you did before your classmates?"
        image={imgReading}
        image1= {img}
        sound={readingAudio}
        captions={captions}
        sentenceHighlights={sentenceHighlights}
        pageId="sb_unit8_page65_reading"
        stopAtSecond={2.42}
        textLen = {31}     />

 </div>
      <div className="w-[60%] mt-4 space-y-6 mb-7">
        <ComprehensionA />
        <ComprehensionB />
      </div>
     
    </div>
  );
};

export default ReadingSection_U1;