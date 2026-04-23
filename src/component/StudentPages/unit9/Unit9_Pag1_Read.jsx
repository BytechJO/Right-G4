import sound1 from "../../../assets/audio/ClassBook/Unit 9/P 76/Pg76_1.1_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 9/P 76/Pg76_1.2_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 9/P 76/Pg76_1.3_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 9/P 76/Pg76_1.4_Adult Lady.mp3";
import Rabbit from "../../../assets/Page 01/Rabbit.svg";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 76-77/1-01.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 76-77/1-02.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 76-77/1-03.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 76-77/1-04.svg";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import longAudio from "../../../assets/audio/ClassBook/Unit 9/P 76/unit9-pg76-listen.mp3";

const Unit5_Page1_Read = () => {
  const imageSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(sound1),
    new Audio(sound2),
    new Audio(sound3),
    new Audio(sound4),
  ];

  const captions = [
    {
      start: 0.299,
      end: 3.259,
      text: "Page 76. Listen and read along.",
    },
    {
      start: 4,
      end: 8.639,
      text: "S. Caps, cats, ducks",
    },
  ];
  return (
    <>
      <FourImagesWithAudio
        images={[Rabbit, img1, img2, img3, img4]}
        audioSrc={longAudio}
        checkpoints={[0, 3.6, 5.94, 6.96, 8.08]}
        popupOpen={true}
        titleQ={"Listen and read along."}
        audioArr={imageSounds}
        captions={captions}
      />
    </>
  );
};

export default Unit5_Page1_Read;
