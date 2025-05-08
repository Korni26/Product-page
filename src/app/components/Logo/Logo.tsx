import { forwardRef, useRef } from "react";
import gsap from "gsap";

const Logo = forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>((props, ref) => {
  const imageRef = useRef(null);

  const handleMouseEnter = (imageRef) => {
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
    <img
      ref={ref}
      src="images\fire.png"
      alt="fire-icon"
    //   onMouseEnter={() => handleMouseEnter(ref)}
    //   onMouseOut={() => handleMouseOut(ref)}
    />
  );
});

export default Logo;
