"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import styles from "./HeaderMenu.module.css";
import { gsap } from "gsap";
import Logo from "../Logo/Logo";

const HeaderMenu = forwardRef((_, ref) => {
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const menuText = useRef(null);
  const [menuSize, setMenuSize] = useState(0);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    triggerAnimation: startAnimation,
  }));

  const startAnimation = () => {
    const tl1 = gsap.timeline({ delay: 1 });
    const tl2 = gsap.timeline({ delay: 1 });

    const updateMenuSize = () => {
      const offset1 = image1Ref.current.getBoundingClientRect().right;
      const offset2 = image2Ref.current.getBoundingClientRect().left;
      const distance = offset2 - offset1 + 150;

      setMenuSize(distance);
    };

    const showMenuTimeout = setTimeout(() => {
      setIsMenuVisible(true);
    }, 2000);

    gsap.fromTo(
      menuText.current,
      {
        scale: 0,
      },
      { scale: 1, duration: 1, ease: "power2.out" }
    );

    tl1
      .fromTo(
        image1Ref.current,
        { rotation: 0 },
        {
          rotation: -30,
          duration: 1,
          ease: "power2.out",
          onUpdate: updateMenuSize,
        }
      )
      .to(image1Ref.current, {
        x: -500,
        duration: 1,
        ease: "power2.out",
        onUpdate: updateMenuSize,
      });

    tl2
      .fromTo(
        image2Ref.current,
        { rotation: 0 },
        {
          rotation: 30,
          duration: 1,
          ease: "power2.out",
          onUpdate: updateMenuSize,
        }
      )
      .to(image2Ref.current, {
        x: 500,
        duration: 1,
        ease: "power2.out",
        onUpdate: updateMenuSize,
      });

    return () => clearTimeout(showMenuTimeout);
  };

  const handleMouseEnter = (imageRef) => {
    console.log("first");
    gsap.to(imageRef.current, {
      scale: 1.1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseOut = (imageRef) => {
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div className={styles.HeaderMenu}>
      <div
        className={styles.logoWrap}
        ref={image2Ref}
        onMouseEnter={() => handleMouseEnter(image2Ref)}
        onMouseOut={() => handleMouseOut(image2Ref)}
      >
        <Logo />
      </div>
      <div
        className={styles.logoWrap}
        ref={image1Ref}
        onMouseEnter={() => handleMouseEnter(image1Ref)}
        onMouseOut={() => handleMouseOut(image1Ref)}
      >
        {" "}
        <Logo />
      </div>

      <div className={styles.Menu} style={{ width: `${menuSize}px` }}>
        {isMenuVisible && (
          <>
            <p>inferno products</p>
          </>
        )}
      </div>
    </div>
  );
});

export default HeaderMenu;
