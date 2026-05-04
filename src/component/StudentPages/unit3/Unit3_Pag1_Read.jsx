import sound1 from "../../../assets/audio/ClassBook/Unit 3/P 22/Pg22_1.1_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 3/P 22/Pg22_1.2_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 3/P 22/Pg22_1.3_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 3/P 22/Pg22_1.4_Adult Lady.mp3";
import Rabbit from "../../../assets/Page 01/Rabbit.svg";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 22-23/1-01.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 22-23/1-02.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 22-23/1-03.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 22-23/1-04.svg";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import longAudio from "../../../assets/audio/ClassBook/Unit 3/P 22/long.mp3";

const Unit3_Page1_Read = () => {
  const imageSounds = [
    null,
    new Audio(sound1),
    new Audio(sound2),
    new Audio(sound3),
    new Audio(sound4),
  ];

  const captions = [
    { start: 0, end: 3.9, text: "Page 22. Listen and read along." },
    { start: 4, end: 10.38, text: "C-H, ch. T-C-H, ch. S-H, sh." },
    { start: 11.44, end: 13.66, text: "chicken,Kitchen, fish" },
  ];

 

  return (
    <>
      <FourImagesWithAudio
        images={[Rabbit, img1, img2, img3,img4]}
        audioSrc={longAudio}
        checkpoints={[0, 4, 11.44, 11.96, 13.16]}
        popupOpen={true}
        titleQ={"Listen and read along."}
        audioArr={imageSounds}
        captions={captions}
      />
    </>
  );
};

export default Unit3_Page1_Read;
