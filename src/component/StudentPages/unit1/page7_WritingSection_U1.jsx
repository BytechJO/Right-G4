import WritingA from "./page7_WritingA";
import WritingB from "./page7_WritingB";
import WritingC from "./page7_WritingC";
import img from "../../../assets/test.svg";
import SectionBanner from "../SectionBanner";

const WritingSection_U1 = () => {
  return (
    <div>
      {/* العنوان */}
      <div className="w-[60%] mx-auto mb-4 flex items-center">
              <SectionBanner title="Writing" />
      </div>

      {/* المحتوى */}
      <div className="flex flex-col  space-y-10">
        <img
          src={img}
          alt=""
          style={{ width: "auto", height: "500px", objectFit: "contain" }}
        />
        <WritingA />
        <WritingB />
        <WritingC />
      </div>
    </div>
  );
};

export default WritingSection_U1;
