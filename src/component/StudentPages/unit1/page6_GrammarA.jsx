import React from "react";
import img from "../../../assets/Page 01/Rabbit.svg";
const GrammarA = () => {
  return (
    <div>
      {/* العنوان */}
      <div className="flex items-center gap-2 mb-5 mt-5">
        <h5 className="header-title-page8-read pb-2.5">
          <span className="ex-A-read" style={{ marginRight: "10px" }}>
            A
          </span>
          Read and say. Replace the highlighted words with the new words.
        </h5>
      </div>

      {/* السؤال 1 */}
      <div className="mb-4">
        <div className="flex items-start gap-2 mt-7">
          <img
            src={img}
            alt=""
            style={{ width: "40px", height: "40px", marginTop: -6 }}
          />

          <div>
            <p className=" text-[18px]">
              The students{" "}
              <span className="text-[#12C8F9]">
                {" "}
                who design the best roller coaster{" "}
              </span>{" "}
              get a special trophy.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px] w-[900px]">
              <span>
                <b>1</b> who win the race
              </span>
              <span>
                <b>2</b> who help with the charity project
              </span>
              <span>
                <b>3</b> who were on the winning team
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* السؤال 2 */}
      <div>
        <div className="flex items-start gap-5 mt-7">
          <img
            src={img}
            alt=""
            style={{ width: "40px", height: "40px", marginTop: -6 }}
          />

          <div>
            <p className=" text-[18px]">
              Did you ride the elephant{" "}
              <span className="text-[#12C8F9]">
                {" "}
                that has the bells on its feet
              </span>{" "}
              ?
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px] w-[900px]">
              <span>
                <b>1</b> that ate the peanuts
              </span>
              <span>
                <b>2</b> that has the big ears
              </span>
              <span>
                <b>3</b> that touched me with its trunk
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;
