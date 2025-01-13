/* ProductCard.jsx is a child of CardsContainer component
memo is a higher-order component that prevents unnecessary re-renders if
the props haven't changed */
import { useState, useEffect, memo } from "react";

const ProductCard = memo(
  /* productId - unique id for the product
  productsData - object containing details about all products
  itemCounts - object with quantity of every product
  handleAddClick - callback function to handle adding an item to the cart */
  ({ productId, productData, itemCounts, handleAddClick }) => {
    // local state for input value
    const [inputValue, setInputValue] = useState(0);
    // tracks any validation error messages
    const [error, setError] = useState(null);

    useEffect(() => {
      /* if itemCounts[productId] is undefined, useEffect does not set a value 
      for it, but inputValue is initialized with useState(0), so inputValue 
      defaults to 0 */
      if (itemCounts && itemCounts[productId] !== undefined) {
        setInputValue(itemCounts[productId]);
      }
      // re-run side effect if itemCounts or productId changes
    }, [itemCounts, productId]);

    // updates the input value based on user entry
    const handleInputChange = (event) => {
      const value = event.target.value;

      // allow the field to be empty
      if (value === "" || value === "0") {
        setInputValue(0);
        // ensures the input is a valid number
      } else if (/^\d+$/.test(value)) {
        setInputValue(Number(value));
      }

      // clears any existing error messages
      setError(null);
    };

    /* Add to Cart onClick event (ProductCard) -> triggers handleAddInCard 
    handler (ProductCard) -> triggers handleAddClick (PageContext) 
    -> and handleAddClick updates itemCounts and totalItems when an item is 
    added, whether it's a user that already exists or doesn't */
    const handleAddInCard = () => {
      // validates whether the selected quantity exceeds the available stock
      if (inputValue > productData.rating.count) {
        setError(`Cannot add more than ${productData.rating.count} items.`);
      } else {
        setError(null);
        // if it doesn't, update the cart's items count and checkout amount
        handleAddClick(productId, inputValue, productData.price);
      }
    };

    return (
      <div className="card">
        <div className="card-contents">
          <div className="image-container">
            {/* display the product image */}
            <img
              src={productData.image}
              alt={`${productId}`}
              className="product-image"
              // defers loading the image until it is visible in the viewport
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
                value={inputValue}
                // direct function reference to onChange event handler
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
