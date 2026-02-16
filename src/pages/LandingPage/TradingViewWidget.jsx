import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget() {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;

    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      displayMode: "regular",
      feedMode: "all_symbols",
      colorTheme: "light",
      isTransparent: true,
      locale: "en",
      width: "100%",
      height: "100%",
    });

    container.current.appendChild(script);
  }, []);

  return (
    <div className="tv-wrapper w-6xl mx-auto my-6">
      <div className="tv-card">
        <div
          ref={container}
          className="tradingview-widget-container tv-widget"
        />
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
