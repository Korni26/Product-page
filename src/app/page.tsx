"use client";

import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import Footer from "./components/Footer/Footer";
import { useRef, useState } from "react";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const headerMenuRef = useRef(null);

  const handleProductsLoaded = () => {
    setLoading(false);
    headerMenuRef.current.triggerAnimation();
  };

  return (
    <>
      {loading && <LoadingPage />}
      <div>
        <HeaderMenu ref={headerMenuRef} />
        <Header />
        <Products onProductsLoaded={handleProductsLoaded} />
        <Footer />
      </div>
    </>
  );
}
