"use client";

import { useEffect, useState } from "react";

const slides = [
  { src: "/screenshots/1.gif", title: "落子与布局", text: "在不断变化的棋盘上，为下一次连线提前铺路。" },
  { src: "/screenshots/3.gif", title: "移动与交锋", text: "移动已有棋子，打破阵型并争夺关键空间。" },
  { src: "/screenshots/2.gif", title: "连线与抉择", text: "不同长度的连线，会触发完全不同的战术效果。" },
  { src: "/screenshots/4.gif", title: "灵魂与胜负", text: "让基础棋飞升为灵魂，把优势转化为最终分数。" },
];

export default function GifCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const showPrevious = () => setActive((current) => (current - 1 + slides.length) % slides.length);
  const showNext = () => setActive((current) => (current + 1) % slides.length);
  const slide = slides[active];

  return (
    <div
      className="gif-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="实机游戏动图"
    >
      <div className="carousel-stage">
        <img key={slide.src} src={slide.src} alt={`${slide.title}实机游戏动图`} width={640} height={359} />
        <div className="carousel-caption" aria-live="polite">
          <span>{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
          <div><h3>{slide.title}</h3><p>{slide.text}</p></div>
        </div>
      </div>
      <div className="carousel-controls">
        <button type="button" onClick={showPrevious} aria-label="上一张动图">←</button>
        <div className="carousel-dots" aria-label="选择动图">
          {slides.map((item, index) => (
            <button
              type="button"
              key={item.src}
              className={index === active ? "active" : ""}
              onClick={() => setActive(index)}
              aria-label={`显示第 ${index + 1} 张动图`}
              aria-current={index === active ? "true" : undefined}
            />
          ))}
        </div>
        <button type="button" onClick={showNext} aria-label="下一张动图">→</button>
      </div>
    </div>
  );
}
