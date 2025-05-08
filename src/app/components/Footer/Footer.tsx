"use client";

import { useEffect, useRef } from "react";
import styles from "./Footer.module.css";
import gsap from "gsap";
import Logo from "../Logo/Logo";

const Footer = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      { scale: 1 },
      { scale: 1.1, duration: 1, ease: "power1", repeat: -1, yoyo: true }
    );
  });

  return (
    <>
      <div className={styles.randomComponent}></div>
      <div className={styles.Footer}>
        <Logo ref={imageRef} />
      </div>
    </>
  );
};

export default Footer;
