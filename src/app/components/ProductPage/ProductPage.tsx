import styles from "./ProductPage.module.css";
import ThreeDModel from "@/app/3D/ThreeDModel";

const ProductPage = ({ onProductPageLoaded }) => {
  const handleModelLoaded = () => {
    onProductPageLoaded();
  };

  return (
    <div className={styles.ProductPage}>
      <div className={styles.description}>
        <h1>The infero touch</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius eaque
          dignissimos fugiat, suscipit repellat a saepe non. Pariatur, facilis.
          Cum perspiciatis asperiores repellendus? Adipisci tempora velit
          mollitia repellendus. Nam fuga nemo nobis. Quia placeat dicta amet
          cumque consequuntur, repudiandae doloribus distinctio modi saepe, quae
          maiores explicabo id sapiente asperiores at?
        </p>
      </div>
      <div className={styles.model}>
        <ThreeDModel onModelLoaded={handleModelLoaded} />
      </div>
    </div>
  );
};

export default ProductPage;