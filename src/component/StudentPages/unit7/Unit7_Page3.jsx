import React from "react";
import page_3 from"../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 60.png";
import "./Unit7_Page3.css";
import GrammarSection_U1 from "./GrammarSection_U1";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
const pageKeys = {onKeyDown:event=>{if(event.key!=="Enter" && event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true,cancelable:true}));},onKeyUp:event=>{if(event.key==="Enter" || event.key===" "){event.preventDefault();event.stopPropagation();}}};


const Page6 = ({ openPopup }) => {

  return (
    <div data-page-scope="unit7_Unit7_Page3" role="group" aria-label="Unit 7 page with activity launchers"
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_3})` }}
    ><style>{`[data-page-scope="unit7_Unit7_Page3"] :focus-visible {outline:3px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="headset-icon-CD-page6 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg role="button" tabIndex={0} data-keyboard-choice {...pageKeys} aria-label={"Open grammar"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("html", <GrammarSection_U1 />)}
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={audioBtn}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>
    </div>
  );
};

export default Page6;
