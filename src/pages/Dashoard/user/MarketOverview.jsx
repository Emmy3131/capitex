const MarketOverview = () => {
  return (
    <section className=" mx-auto my-6">
      <div className="col-xl-12">
      <div
        className="tradingview-widget-container"
        style={{ width: "100%", height: "660px" }}
      >
        <iframe
          title="TradingView Market Overview"
          src="https://www.tradingview-widget.com/embed-widget/market-overview/?locale=en#%7B%22colorTheme%22%3A%22light%22%2C%22dateRange%22%3A%2212M%22%2C%22showChart%22%3Atrue%2C%22width%22%3A%22100%25%22%2C%22height%22%3A660%7D"
          frameBorder="0"
          allowTransparency={true}
          scrolling="yes"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
      </div>
    </div>

    </section>
  );
};

export default MarketOverview;
