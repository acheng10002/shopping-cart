import { useState, useEffect } from "react";

function ProductCard({ productId, singleItemCount, onChange, handleAddClick }) {
  const [productData, setProductData] = useState({
    image: "",
    price: "",
    title: "",
    rating: "",
    count: "",
    description: "",
    category: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const value = event.target.value;

    if (value === "") {
      onChange(value);
    } else if (/^\d+$/.test(value)) {
      onChange(Number(value));
    }

    setError(null);
  };

  const handleAddInCard = () => {
    if (singleItemCount > productData.count) {
      setError(`Cannot add more than ${productData.count} items.`);
    } else {
      setError(null);
      handleAddClick(productData.price);
    }
  };

  useEffect(() => {
    async function fetchProductData() {
      const url = `https://fakestoreapi.com/products/${productId}`;
      try {
        const response = await fetch(url, { mode: "cors" });
        if (!response.ok) {
          throw new Error(`HTTP error: Status: ${response.status}`);
        }
        const data = await response.json();
        setProductData({
          image: data.image,
          price: data.price,
          title: data.title,
          rating: data.rating.rate,
          count: data.rating.count,
          description: data.description,
          category: data.category,
        });
      } catch (error) {
        console.error("Error fetching Product data:", error);
        setError("Failed to load Product data");
      }
    }

    fetchProductData();
  }, [productId]);

  return (
    <div className="card">
      <div className="card-contents">
        <div className="image-container">
          <img
            src={productData.image}
            alt={`${productId}`}
            className="product-image"
          />
        </div>
        <h3 className="price">${Number(productData.price).toFixed(2)}</h3>
        <div className="product-details">
          <h4>{productData.title}</h4>
          <p className="rating">{productData.rating} out of 5 </p>
          <p className="description">{productData.description}</p>
          <p className="category">category: {productData.category}</p>
        </div>
        <div className="button-container">
          <div className="input-container">
            <input
              type="number"
              value={singleItemCount == 0 ? "" : singleItemCount}
              onChange={handleInputChange}
              min="0"
              className="always-visible-spinner"
            ></input>
            {error && <p className="error-message"> {error}</p>}
          </div>
          <button className="add-button" onClick={handleAddInCard}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
