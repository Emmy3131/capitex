import React from "react";

const PageLoader = () => {
  const dotStyle = {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "#16a34a", // green color
    display: "inline-block",
    animationName: "zoom",
    animationDuration: "1.5s",
    animationIterationCount: "infinite",
    animationTimingFunction: "ease-in-out",
  };

  return (
    <>
      <style>
        {`
          @keyframes zoom {
            0%, 100% { transform: scale(0.6); opacity: 0.5; }
            50% { transform: scale(1.2); opacity: 1; }
          }
        `}
      </style>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <span style={{ ...dotStyle, animationDelay: "0s" }}></span>
        <span style={{ ...dotStyle, animationDelay: "0.3s" }}></span>
        <span style={{ ...dotStyle, animationDelay: "0.6s" }}></span>
      </div>
    </>
  );
};

export default PageLoader;
