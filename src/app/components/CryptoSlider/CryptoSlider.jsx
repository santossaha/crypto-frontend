"use client";
import React from "react";

const tickers = [
  { symbol: "BTC", price: "$34,500", change: "+2.3%" },
  { symbol: "ETH", price: "$1,850", change: "+1.1%" },
  { symbol: "SOL", price: "$28.40", change: "-0.8%" },
  { symbol: "ADA", price: "$0.43", change: "+0.6%" },
  { symbol: "BNB", price: "$235.00", change: "+0.9%" },
  { symbol: "XRP", price: "$0.52", change: "-1.2%" },
];

const CryptoTickerItem = ({ t }) => (
  <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 border border-white/5">
    <div className="text-sm font-semibold">{t.symbol}</div>
    <div className="text-sm text-white/80">{t.price}</div>
    <div className={`text-sm ${t.change.startsWith("+") ? "text-emerald-400" : "text-rose-400"}`}>{t.change}</div>
  </div>
);

const CryptoSlider = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex gap-4 py-4 will-change-transform">
        {tickers.concat(tickers).map((t, idx) => (
          <div key={idx} className="inline-block mr-4">
            <CryptoTickerItem t={t} />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CryptoSlider;
