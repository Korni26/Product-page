import styles from "./Header.module.css";
import Nacho from "../Nacho/Nacho";

const Header = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.Header}>
      <h1>Start the fire!</h1>
      <button onClick={handleScroll}>
        Explore {String.fromCharCode(0x2192)}
      </button>
      <Nacho />
    </div>
  );
};

export default Header;
