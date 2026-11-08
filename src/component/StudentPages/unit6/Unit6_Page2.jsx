import React from "react";
import page_5 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 47.png";
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
        data-page-scope="unit6_Unit6_Page2"
        role="group"
        aria-label="Unit 6 page with activity launchers"
        className="page1-img-wrapper"
        style={{ backgroundImage: `url(${page_5})` }}
      >
        <style>{`[data-page-scope="unit6_Unit6_Page2"] :focus-visible {outline:3px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
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
