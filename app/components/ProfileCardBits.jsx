"use client";

import { useRef } from "react";
import styles from "./ProfileCardBits.module.css";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function ProfileCardBits({
  imageSrc,
  imageAlt,
  name,
  role,
  meta,
  enableMobileTilt = true
}) {
  const cardRef = useRef(null);

  const updateTilt = (clientX, clientY) => {
    const card = cardRef.current;
    if (!card) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const px = (clientX - rect.left) / rect.width;
    const py = (clientY - rect.top) / rect.height;
    const rotateY = clamp((px - 0.5) * 20, -10, 10);
    const rotateX = clamp((0.5 - py) * 18, -9, 9);

    card.style.setProperty("--rotate-x", `${rotateX.toFixed(2)}deg`);
    card.style.setProperty("--rotate-y", `${rotateY.toFixed(2)}deg`);
    card.style.setProperty("--glare-x", `${(px * 100).toFixed(2)}%`);
    card.style.setProperty("--glare-y", `${(py * 100).toFixed(2)}%`);
    card.style.setProperty("--glare-opacity", "1");
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) {
      return;
    }

    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
    card.style.setProperty("--glare-x", "50%");
    card.style.setProperty("--glare-y", "50%");
    card.style.setProperty("--glare-opacity", "0");
  };

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onMouseLeave={resetTilt}
      onMouseMove={(event) => updateTilt(event.clientX, event.clientY)}
      onTouchEnd={resetTilt}
      onTouchMove={(event) => {
        if (!enableMobileTilt || !event.touches?.[0]) {
          return;
        }

        updateTilt(event.touches[0].clientX, event.touches[0].clientY);
      }}
    >
      <div className={styles.inner}>
        <div className={styles.imageWrap}>
          <img alt={imageAlt} className={styles.image} src={imageSrc} />
        </div>
        <div className={styles.glare} />
        <div className={styles.grid} />
        <div className={styles.frame} />

        {/* <div className={styles.content}>
          <div className={styles.copy}>
            <p className={styles.role}>{role}</p>
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.meta}>{meta}</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
