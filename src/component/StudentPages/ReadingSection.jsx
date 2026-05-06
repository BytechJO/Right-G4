import React from "react";
import QuestionAudioPlayer from "../QuestionAudioPlayer";
import SectionBanner from "./SectionBanner";
const ReadingSection = ({
  mainTitle,
  image,
  image1,
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
        <div style={{marginTop:"10px"}}>
        <QuestionAudioPlayer
          src={sound}
          captions={captions}
          stopAtSecond={stopAtSecond}
        />
      </div>
      </div>

      {/* ✅ شلنا الـ title badge والـ paragraphs، والصورة تملأ كل شي */}
      <div className="w-[100%] mt-2">
        <img
          src={image}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      <div className="w-[100%]  my-5">
        <img
          style={{ width: "100%", height: "auto", display: "block" }}
          src={image1}
          alt="think"
        />
      </div>

      <div className="mt-3 space-y-6 w-[100%] mb-3">
        <div className="flex items-center gap-4">
          <SectionBanner title="Comprehension" />
          <h2 style={{ display: "flex", flexDirection: "row", gap: "10px", whiteSpace: "nowrap", marginLeft: "auto" }} className="font-bold text-[18px] text-black nowrap">
            {mainTitle}
          </h2>
        </div>
      
      </div>
    </div>
  );
};
export default ReadingSection;
