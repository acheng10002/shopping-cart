/* ProductCard.jsx is the app's component for each product card
it's a child of CardsContainer component
memo is a higher-order component that prevents unnecessary re-renders if
the props haven't changed */
import { useState, memo } from "react";

const ProductCard = memo(
  /* productId - unique id for the product
  productData - object containing details about the product
  singleItemCount - number of this specific product currently selected
  onChange - callback function to update the singleItemCount
  handleAddClick - callback function to handle adding the item to the cart
  */
  ({ productId, productData, singleItemCount, onChange, handleAddClick }) => {
    // tracks any validation error messages
    const [error, setError] = useState(null);

    // updates the singleItemCount based on user input
    const handleInputChange = (event) => {
      const value = event.target.value;

      // allow the field to be empty
      if (value === "") {
        onChange(value);
        // ensure the input is a valid number
      } else if (/^\d+$/.test(value)) {
        onChange(Number(value));
      }

      // clears any existing error messages
      setError(null);
    };

    const handleAddInCard = () => {
      // validates whether the selected quantity exceeds the available stock
      if (singleItemCount > productData.rating.count) {
        setError(`Cannot add more than ${productData.rating.count} items.`);
      } else {
        setError(null);
        // if it doesn't, update the cart's total price and item count
        handleAddClick(productData.price);
      }
    };

    return (
      <div className="card">
        <div className="card-contents">
          <div className="image-container">
            {/* display the product image
            defers loading the image until it is visible in the viewport */}
            <img
              src={productData.image}
              alt={`${productId}`}
              className="product-image"
              loading="lazy"
            />
          </div>
          {/* displays product price formated to two decimal places */}
          <h3 className="price">${Number(productData.price).toFixed(2)}</h3>
          <div className="product-details">
            {/* displays product title, average rating, description, and category */}
            <h4>{productData.title}</h4>
            <p className="rating">{productData.rating.rate} out of 5 </p>
            <p className="description">{productData.description}</p>
            <p className="category">category: {productData.category}</p>
          </div>
          <div className="button-container">
            <div className="input-container">
              <input
                type="number"
                // binds input value to singleItemCount
                value={singleItemCount == 0 ? "" : singleItemCount}
                // calls handleInputChange on changes
                onChange={handleInputChange}
                // prevents negative values
                min="0"
                className="item-count-input"
              ></input>
              {/* if error exists, display the message below the input field */}
              {error && <p className="error-message"> {error}</p>}
            </div>
            {/* calls handleAddInCard when clicked to validate and add item to cart */}
            <button className="add-button" onClick={handleAddInCard}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default ProductCard;
