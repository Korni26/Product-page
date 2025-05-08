"use client";

import { useEffect, useRef, useState } from "react";
import ProductPage from "../ProductPage/ProductPage";
import styles from "./Products.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const Products = ({ onProductsLoaded }) => {
  const sectionRef = useRef(null);
  const [loadedProductPage, setLoadedProductPage] = useState(0);
  const totalProductPages = 3;

  const handleProductPageLoaded = () => {
    setLoadedProductPage((prevCount) => prevCount + 1);
  };

  if (loadedProductPage === totalProductPages) {
    onProductsLoaded();
  }

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "-200vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <div ref={sectionRef} className={styles.Products}>
      <section className={styles.ProductSection}>
        <ProductPage onProductPageLoaded={handleProductPageLoaded} />
      </section>
      <section className={styles.ProductSection}>
        <ProductPage onProductPageLoaded={handleProductPageLoaded} />
      </section>
      <section className={styles.ProductSection}>
        <ProductPage onProductPageLoaded={handleProductPageLoaded} />
      </section>
    </div>
  );
};

export default Products;
