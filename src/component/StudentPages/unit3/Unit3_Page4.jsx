import React from "react";
import page_4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 25.png";
import "./Unit3_Page4.css";
import WritingSection_U1 from "./page7_WritingSection_U1";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
const pageKeys = { onKeyDown: event => { if(event.key !== "Enter" && event.key !== " ") return; event.preventDefault(); event.stopPropagation(); if(!event.repeat) event.currentTarget.dispatchEvent(new MouseEvent("click", {bubbles:true,cancelable:true})); }, onKeyUp: event => { if(event.key === "Enter" || event.key === " "){event.preventDefault();event.stopPropagation();} } };


const Page7 = ({ openPopup }) => {
  return (
    <div
      className="page1-img-wrapper" data-unit3-scope="Unit3_Page4" role="group" aria-label="Unit 3, page 25. Writing: What My Great-grandpa Had, life in the 1920s, writing tips and practice."
      style={{ backgroundImage: `url(${page_4})` }}
    >
 <style>{`[data-unit3-scope="Unit3_Page4"] :focus-visible { outline:4px solid #2563eb; outline-offset:3px; border-radius:6px; }`}</style>
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
