import React from "react";
import page_6 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 9 Tom Has Nothing to Do Folder/Page 81.png";
// import song from "../../../assets/img_unit5/sounds-unit5/Pg15.Sing_Adult Lady.mp3";
import "./Unit9_Page6.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
const pageKeys = {onKeyDown:event=>{if(event.key!=="Enter" && event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true,cancelable:true}));},onKeyUp:event=>{if(event.key==="Enter" || event.key===" "){event.preventDefault();event.stopPropagation();}}};


const Unit9_Page6 = ({ openPopup }) => {
  return (
    <div data-page-scope="unit9_Unit9_Page6" role="group" aria-label="Unit 9 page with activity launchers"
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_6})` }}
    ><style>{`[data-page-scope="unit9_Unit9_Page6"] :focus-visible {outline:3px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
      {/* <img src={page_6} /> */}

      <div
        className="click-icon-unit9-page6-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg role="button" tabIndex={0} data-keyboard-choice {...pageKeys} aria-label={"Open exercise 1"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 95 })}
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
      <div
        className="click-icon-unit9-page6-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg role="button" tabIndex={0} data-keyboard-choice {...pageKeys} aria-label={"Open exercise 2"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 96 })}
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
    </div>
  );
};

export default Unit9_Page6;
