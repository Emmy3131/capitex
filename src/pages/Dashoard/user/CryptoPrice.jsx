import { useEffect, useRef, useState } from "react";
import axios from "axios";

const CryptoPrices = () => {
  const [coins, setCoins] = useState([]);
  const previousPrices = useRef({});

  const fetchPrices = async () => {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
          },
        }
      );

      const updated = res.data.map((coin) => {
        const prev = previousPrices.current[coin.id] || coin.current_price;

        const trend =
          coin.current_price > prev
            ? "up"
            : coin.current_price < prev
            ? "down"
            : "same";

        previousPrices.current[coin.id] = coin.current_price;

        return {
          ...coin,
          trend,
        };
      });

      setCoins(updated);
    } catch (err) {
      console.error("Failed to fetch crypto prices", err);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 10000); // update every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-gray-900 border border-gray-700 text-white">
      <div className="relative flex">
        <div className="flex animate-ticker gap-8 px-6 py-3">
          {[...coins, ...coins].map((coin, index) => (
            <div
              key={index}
              className="flex items-center gap-3 min-w-max"
            >
              <img
                src={coin.image}
                alt={coin.name}
                className="w-5 h-5"
              />

              <span className="font-semibold text-sm">
                {coin.symbol.toUpperCase()}
              </span>

              <span className="text-sm">
                ${coin.current_price.toLocaleString()}
              </span>

              <span
                className={`text-xs font-medium ${
                  coin.trend === "up"
                    ? "text-emerald-600"
                    : coin.trend === "down"
                    ? "text-red-600"
                    : "text-gray-400"
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoPrices;
