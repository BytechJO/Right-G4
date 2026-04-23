import sound1 from "../../../assets/audio/ClassBook/Unit 7/P 58/Pg58_1.1_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 7/P 58/Pg58_1.2_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 7/P 58/Pg58_1.3_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 7/P 58/Pg58_1.4_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 7/P 58/Pg58_1.5_Adult Lady.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 7/P 58/Pg58_1.6_Adult Lady.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 7/P 58/Pg58_1.7_Adult Lady.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 7/P 58/Pg58_1.8_Adult Lady.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 7/P 58/Pg58_1.9_Adult Lady.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 7/P 58/Pg58_1.10_Adult Lady.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 7/P 58/Pg58_1.11_Adult Lady.mp3";
import Rabbit from "../../../assets/Page 01/Rabbit.svg";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/1-01.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/1-02.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/1-03.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/1-04.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/1-05.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/1-06.svg";
import img7 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/1-07.svg";
import img8 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/1-08.svg";
import img9 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/1-09.svg";
import img10 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/1-10.svg";
import img11 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/1-11.svg";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import longAudio from "../../../assets/audio/ClassBook/Unit 7/P 58/unit7-pg58-listen.mp3";

const Unit5_Page1_Read = () => {
  const imageSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(sound1),
    new Audio(sound2),
    new Audio(sound3),
    new Audio(sound4),
    new Audio(sound5),
    new Audio(sound6),
    new Audio(sound7),
    new Audio(sound8),
    new Audio(sound9),
    new Audio(sound10),
    new Audio(sound11),
  ];

  const captions = [
    { start: 0, end: 3.56, text: "Page 58. Listen and read along." },
    {
      start: 4.38,
      end: 14.9,
      text: " Consonant review. Nurse, door, tape, horse, window, popcorn, bird, gum, key, meat",
    },
  ];
  return (
    <>
      <FourImagesWithAudio
        images={[
          Rabbit,
          img1,
          img2,
          img3,
          img4,
          img5,
          img6,
          img7,
          img8,
          img9,
          img10,
          img11,
        ]}
        audioSrc={longAudio}
        checkpoints={[
          0, 4.38, 6.34, 7.16, 7.92, 8.82, 9.76, 10.72, 11.86, 12.64, 13.52,
          14.5,
        ]}
        popupOpen={true}
        titleQ={"Listen and read along."}
        audioArr={imageSounds}
        captions={captions}
      />
    </>
  );
};

export default Unit5_Page1_Read;
