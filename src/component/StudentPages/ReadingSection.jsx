import React from "react";
import QuestionAudioPlayer from "../QuestionAudioPlayer";
import SectionBanner from "./SectionBanner";
import think from "../../assets/imgs/think.svg"
const ReadingSection = ({
  mainTitle,
  image,
  sound,
  captions,
  stopAtSecond,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[100%] mx-auto">
        <div style={{ display: "flex", flexDirection: "row", gap: "10px", whiteSpace: "nowrap", marginLeft: "auto" }}>
          <SectionBanner title="Reading" />
          <h2 style={{ position: "relative", top: "0.5em" }} className="font-bold text-[18px] text-black nowrap">
            {mainTitle}
          </h2>
        </div>
        <QuestionAudioPlayer
          src={sound}
          captions={captions}
          stopAtSecond={stopAtSecond}
        />
      </div>

      {/* ✅ شلنا الـ title badge والـ paragraphs، والصورة تملأ كل شي */}
      <div className="w-[100%] mt-2">
        <img
          src={image}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      <div className="w-[100%]  mt-2">
        <img
          style={{ width: "100%", height: "auto", display: "block" }}
          src={think}
          alt="think"
        />
      </div>

      <div className="mt-3 space-y-6">
        <div className="flex items-center gap-4">
          <SectionBanner title="Comprehension" />
          <h2 style={{ position: "relative", top: "0.5em" }} className="font-bold text-[18px] text-black nowrap">
            {mainTitle}
          </h2>
        </div>
      </div>
    </div>
  );
};
export default ReadingSection;
