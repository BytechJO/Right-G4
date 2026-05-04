import sound1 from "../../../assets/audio/ClassBook/Unit 8/P 64/Pg64_1.1_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 8/P 64/Pg64_1.2_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 8/P 64/Pg64_1.3_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 8/P 64/Pg64_1.4_Adult Lady.mp3"
import sound5 from "../../../assets/audio/ClassBook/Unit 8/P 64/Pg64_1.5_Adult Lady.mp3"
import Rabbit from "../../../assets/Page 01/Rabbit.svg";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 64-65/1-01.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 64-65/1-02.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 64-65/1-03.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 64-65/1-04.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 64-65/1-05.svg";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import longAudio from "../../../assets/audio/ClassBook/Unit 8/P 64/unit8-pg64-listen.mp3";

const Unit8_Page1_Read = () => {
  const imageSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(sound1),
    new Audio(sound2),
    new Audio(sound3),
    new Audio(sound4),
    new Audio(sound5)
  
  ];

const captions = [
   { start: 0, end: 3.30, text: "Page 64. Listen and read along." },
    { start: 3.94, end: 6.14, text: "E-S. Boxes, buses, brushes, sandwiches" },
    
  ];
  return (
    <>
      <FourImagesWithAudio
        images={[Rabbit, img1, img2, img3,img4,img5]}
        audioSrc={longAudio}
        checkpoints={[0, 3.84, 5.3, 6.42, 7.84,9.36]}
        popupOpen={true}
        titleQ={"Listen and read along."}
        audioArr={imageSounds}
        captions={captions}
      />
    </>
  );
};

export default Unit8_Page1_Read;
