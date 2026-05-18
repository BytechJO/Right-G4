import React from "react";

const ComprehensionB = () => {
  const leftItems = [
    { id: 1, text: "desert" },
    { id: 2, text: "rainforest" },
    { id: 3, text: "Arctic" },
  ];

  const rightItems = [
    { text: "icy and cold" },
    { text: "hot and dry" },
    { text: "hot and wet" },
  ];

  return (
    <div className="mb-6 mx-auto">
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Match each place to the word that describes it.
      </h5>

      <div className="flex gap-8 items-start">
        {/* Left: numbered places */}
        <div className="flex flex-col gap-5">
          {leftItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <span
                style={{
                  fontWeight: "400",
                  WebkitTextStroke: "1px black",
                  color: "#1a1a1a",
                  fontSize: "18px",
                  minWidth: "18px",
                }}
              >
                {item.id}
              </span>
              <span style={{ fontSize: "18px", color: "#1a1a1a" }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Right: descriptions with dots */}
        <div className="flex flex-col gap-5 ml-auto">
          {rightItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                style={{
                  width: "13px",
                  height: "13px",
                  borderRadius: "50%",
                  background: "#f89631",
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: "18px", color: "#1a1a1a" }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComprehensionB;