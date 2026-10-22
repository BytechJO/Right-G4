import page_5 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 32.png";
import "./Unit4_Page5.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
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

const Unit4_Page5 = ({ openPopup }) => {
  return (
    <div
      data-page-scope="unit4_Unit4_Page5"
      role="group"
      aria-label="Unit 4 page with activity launchers"
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_5})` }}
    >
      <style>{`[data-page-scope="unit4_Unit4_Page5"] :focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      {/* <img src={page_5} /> */}

      <div
        className="click-icon-unit4-page5-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          role="button"
          tabIndex={0}
          data-keyboard-choice
          {...pageKeys}
          aria-label={"Open exercise 1"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 28 })}
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
        className="click-icon-unit4-page5-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          role="button"
          tabIndex={0}
          data-keyboard-choice
          {...pageKeys}
          aria-label={"Open exercise 2"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 30 })}
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
        className="click-icon-unit4-page5-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          role="button"
          tabIndex={0}
          data-keyboard-choice
          {...pageKeys}
          aria-label={"Open exercise 3"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 29 })}
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
        className="click-icon-unit4-page5-4 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          role="button"
          tabIndex={0}
          data-keyboard-choice
          {...pageKeys}
          aria-label={"Open exercise 4"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 31 })}
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

export default Unit4_Page5;
