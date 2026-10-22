import React from "react";
import page_5 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 11.png";
import "./Unit2_Page1.css";
import ReadingSection_U1 from "./ReadingSection_U1";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";

const pageKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat)
      event.currentTarget.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true }),
      );
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  },
};

const Page5 = ({ openPopup }) => {
  return (
    <>
      <div
        className="page1-img-wrapper"
        data-unit2-scope="Unit2_Page2"
        style={{ backgroundImage: `url(${page_5})` }}
      >
        <div
          className="click-icon-page5 hover:scale-110 transition"
          style={{ overflow: "visible" }}
        >
          <svg
            role="button"
            tabIndex={0}
            data-keyboard-choice
            aria-label={"Open reading and comprehension"}
            {...pageKeys}
            width="22"
            height="22"
            viewBox="0 0 90 90"
            onClick={() => openPopup("html", <ReadingSection_U1 />)}
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
    </>
  );
};

export default Page5;
