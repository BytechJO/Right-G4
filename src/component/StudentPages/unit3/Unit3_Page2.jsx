import React from "react";
import page_5 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 23.png";
import "./Unit3_Page1.css";
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
        data-unit3-scope="Unit3_Page2"
        role="group"
        aria-label="Unit 3, page 23. Reading and comprehension about a bedroom when a child was a baby and their room now."
        style={{ backgroundImage: `url(${page_5})` }}
      >
        <style>{`[data-unit3-scope="Unit3_Page2"] :focus-visible { outline:4px solid #2563eb; outline-offset:3px; border-radius:6px; }`}</style>
        <div
          className="click-icon-page5 hover:scale-110 transition"
          style={{ overflow: "visible" }}
        >
          <svg
            role="button"
            tabIndex={0}
            data-keyboard-choice
            {...pageKeys}
            aria-label={"Open reading and comprehension"}
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
