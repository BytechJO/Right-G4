import page_2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 17.png";
import "./Review1_Page2.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
// import Unit4_Page6_Q2 from "./Unit4_Page6_Q2";
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

const Review1_Page2 = ({ openPopup }) => {
  return (
    <div
      data-review-launcher="Review1_Page2"
      className="page1-img-wrapper"
      // onClick={handleImageClick}
      style={{ backgroundImage: `url(${page_2})` }}
    >
 
      {/* <img src={page_2} /> */}

      <div
        className="click-icon-review1-page2-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          role="button"
          tabIndex={0}
          aria-label="Open exercise 1 on Review1 Page2"
          {...pageKeys}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 13 })}
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
        className="click-icon-review1-page2-2  hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          role="button"
          tabIndex={0}
          aria-label="Open exercise 2 on Review1 Page2"
          {...pageKeys}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 14 })}
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
        className="click-icon-review1-page2-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          role="button"
          tabIndex={0}
          aria-label="Open exercise 3 on Review1 Page2"
          {...pageKeys}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 15 })}
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

export default Review1_Page2;
