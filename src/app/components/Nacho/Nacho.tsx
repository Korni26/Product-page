"use client";

import { useEffect } from "react";
import styles from "./Nacho.module.css";
import gsap from "gsap";

const Nacho = () => {
  useEffect(() => {
    gsap.fromTo(
      `.${styles.Nacho}`,
      { y: 0 },
      { y: -30, duration: 0.8, ease: "power2", repeat: -1, yoyo: true }
    );
  });

  return <img src="/images/nacho.png" alt="" className={styles.Nacho} />;
};

export default Nacho;
