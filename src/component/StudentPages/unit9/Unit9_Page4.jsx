import React from "react";
import page_4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 9 Tom Has Nothing to Do Folder/Page 79.png";
import "./Unit9_Page4.css";
import WritingSection_U1 from "./page7_WritingSection_U1";
import arrowBtn from "../../../assets/Page 01/Audio btn.svg";
const pageKeys = {onKeyDown:event=>{if(event.key!=="Enter" && event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true,cancelable:true}));},onKeyUp:event=>{if(event.key==="Enter" || event.key===" "){event.preventDefault();event.stopPropagation();}}};


const Page7 = ({ openPopup }) => {
  return (
    <div data-page-scope="unit9_Unit9_Page4" role="group" aria-label="Unit 9 page with activity launchers"
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_4})` }}
    ><style>{`[data-page-scope="unit9_Unit9_Page4"] :focus-visible {outline:3px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="headset-icon-CD-page7 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg role="button" tabIndex={0} data-keyboard-choice {...pageKeys} aria-label={"Open writing"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("html", <WritingSection_U1 />)}
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
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

export default Page7;
