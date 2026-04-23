import sound1 from "../../../assets/audio/ClassBook/Unit 10/P 82/Pg82_1.1_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 10/P 82/Pg82_1.2_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 10/P 82/Pg82_1.3_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 10/P 82/Pg82_1.4_Adult Lady.mp3"
import Rabbit from "../../../assets/Page 01/Rabbit.svg";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 82-83/1-01.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 82-83/1-02.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 82-83/1-03.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 82-83/1-04.svg";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import longAudio from "../../../assets/audio/ClassBook/Unit 10/P 82/unit10-pg82-listen.mp3";

const Unit8_Page1_Read = () => {
  const imageSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(sound1),
    new Audio(sound2),
    new Audio(sound3),
    new Audio(sound4)
  
  ];

const captions = [
   { start: 0, end: 3.05, text: "Page 82. Listen and read along." },
    { start: 3.6, end: 6.14, text: "CR, DR, TR. Crab. Dream. Tree" },
    
  ];
  return (
    <>
      <FourImagesWithAudio
        images={[Rabbit, img1, img2, img3,img4]}
        audioSrc={longAudio}
        checkpoints={[0, 3.4, 7.8, 9, 10.14]}
        popupOpen={true}
        titleQ={"Listen and read along."}
        audioArr={imageSounds}
        captions={captions}
      />
    </>
  );
};

export default Unit8_Page1_Read;
