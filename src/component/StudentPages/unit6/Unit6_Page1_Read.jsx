import sound1 from "../../../assets/audio/ClassBook/Unit 6/P 46/Pg46_1.1_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 6/P 46/Pg46_1.2_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 6/P 46/Pg46_1.3_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 6/P 46/Pg46_1.4_Adult Lady.mp3";
import Rabbit from "../../../assets/Page 01/Rabbit.svg";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 46-47/1-01.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 46-47/1-02.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 46-47/1-03.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 46-47/1-04.svg";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import longAudio from "../../../assets/audio/ClassBook/Unit 6/P 46/unit6-pg46-listen.mp3";

const Unit6_Page1_Read = () => {
  const imageSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(sound1),
    new Audio(sound2),
    new Audio(sound3),
    new Audio(sound4),
  ];

  const captions = [
    {
      start: 0.219,
      end: 3.379,
      text: "Page 46, listen and read along.",
    },
    {
      start: 4.519,
      end: 6.339,
      text: "F-L, P-L,",
    },
    {
      start: 7.639,
      end: 11.779,
      text: "S-L. Flag, play, sleep",
    },
  ];
  return (
    <>
      <FourImagesWithAudio
        images={[Rabbit, img1, img2, img3, img4]}
        audioSrc={longAudio}
        checkpoints={[0, 4.22,9, 10.16, 11.3]}
        popupOpen={true}
        titleQ={"Listen and read along."}
        audioArr={imageSounds}
        captions={captions}
      />
    </>
  );
};

export default Unit6_Page1_Read;
