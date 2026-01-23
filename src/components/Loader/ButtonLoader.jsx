import React from "react";

const ButtonLoader = () => {
  return (
    <div
      style={{
        height: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "8px",
          height: "8px",
          border: "6px solid #e5e7eb", // light gray border
          borderTop: "6px solid #16a34a", // green color
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default ButtonLoader;
