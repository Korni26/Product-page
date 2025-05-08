import { useEffect, useRef } from "react";
import styles from "./LoadingPage.module.css";
import gsap from "gsap";

const LoadingPage = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });

    tl.to(imageRef.current, {
      rotate: 360,
      duration: 2,
      ease: "linear",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className={styles.LoadingPage}>
      <img ref={imageRef} src="images/nacho.png" alt="Nacho" />
    </div>
  );
};

export default LoadingPage;
