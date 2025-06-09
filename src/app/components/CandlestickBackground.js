"use client";
import React, { useEffect, useRef, useState } from "react";
import "./CandlestickBackground.css";

const CANDLE_COUNT = 32;
const CHART_HEIGHT = 400;
const CANDLE_WIDTH = 60; // 3x larger
const CHART_SPEED = 18; // seconds for full loop
const GRID_LINE_COUNT = 6;

function randomCandle() {
  const isGreen = Math.random() > 0.5;
  const bodyHeight = 60 + Math.random() * 180;
  const wickTop = Math.random() * 40;
  const wickBottom = Math.random() * 40;
  return {
    isGreen,
    bodyHeight,
    wickTop,
    wickBottom,
  };
}

export default function CandlestickBackground() {
  const [candles, setCandles] = useState(
    Array.from({ length: CANDLE_COUNT }, randomCandle)
  );

  // Animate candles: shift left and add new candle at the end
  useEffect(() => {
    const interval = setInterval(() => {
      setCandles((prev) => {
        const next = prev.slice(1);
        next.push(randomCandle());
        return next;
      });
    }, (CHART_SPEED * 1000) / CANDLE_COUNT);
    return () => clearInterval(interval);
  }, []);

  // Calculate the right-aligned position for each candle
  const totalWidth = CANDLE_COUNT * (CANDLE_WIDTH + 8);
  return (
    <div className="candlestick-bg-chart">
      {/* Grid lines */}
      <div className="candlestick-bg-grid">
        {Array.from({ length: GRID_LINE_COUNT }).map((_, i) => (
          <div
            key={i}
            className="candlestick-bg-gridline"
            style={{
              top: `${(i * 100) / (GRID_LINE_COUNT - 1)}%`,
            }}
          />
        ))}
      </div>
      {/* Candles */}
      <div className="candlestick-bg-track" style={{ height: CHART_HEIGHT }}>
        {candles.map((c, i) => (
          <div
            key={i}
            className={`candle-bg ${c.isGreen ? "green" : "red"}`}
            style={{
              left: `calc(100vw - ${(i + 1) * (CANDLE_WIDTH + 8)}px)`,
              height: c.bodyHeight,
              bottom: 40 + c.wickBottom,
              width: CANDLE_WIDTH,
            }}
          >
            {/* Wick top */}
            <div
              className="wick-bg"
              style={{
                height: c.wickTop,
                bottom: c.bodyHeight,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
            {/* Wick bottom */}
            <div
              className="wick-bg"
              style={{
                height: c.wickBottom,
                top: c.bodyHeight,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
} 