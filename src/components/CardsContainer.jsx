/* CardsContainer.jsx is the app's component for all the product cards
it's a child of PageContainer component 
it's a parent to the ProductCard component */
import { useContext, useState, useEffect } from "react";
import { PageContext } from "./PageContext";
import ProductCard from "./ProductCard.jsx";

// isDefaultView prop being passed in with default value of false
function CardsContainer({ isDefaultView = false }) {
  /* access totalItems, setItemsCounts, and handleAddClick provided by the 
  PageContext.Provider */
  const { cart, itemCounts, setItemCounts, handleAddClick } =
    useContext(PageContext);
  // manages the state in the CardsContainer component
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetches data for all product ids for either a user's cart or default cart
    async function fetchProducts() {
      try {
        let productIds;
        /* if isDefaultView is false, cart exists, cart has a products 
        property that's an array, and the array's length is greater than 0 
        fetch products from the user's cart */
        if (
          !isDefaultView &&
          cart &&
          Array.isArray(cart.products) &&
          cart.products.length > 0
        ) {
          productIds = cart.products.map((product) => product.productId);
          // otherwise, fetch products from the default empty cart
        } else {
          productIds = [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
          ];
        }
        // Promise.all fetches all products in parallel
        const responses = await Promise.all(
          // maps over productIds to send API requests for each product id
          productIds.map((id) =>
            fetch(`https://fakestoreapi.com/products/${id}`).then((res) =>
              res.json()
            )
          )
        );
        // on success, updates productData with the fetched product info
        setProductData(responses);
        // once productData is updated, sets loading to false
        setLoading(false);
      } catch (error) {
        /* on failure, logs the error to the console, sets error to a message 
        and sets loading to false */
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
        setLoading(false);
      }
    }

    fetchProducts();
  }, [cart, isDefaultView]);

  // if loading is true, render message indicating data is being fetched
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // if error is not null, render the error message
  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <div className="cards-container">
        {/* iterates over the fetched product data to render a ProductCard
        for each product */}
        {productData.map((product) => (
          <ProductCard
            // unique key to id each component in the list
            key={product.id}
            // id of the product
            productId={product.id}
            // full product data object
            productData={product}
            /* current count of the product of the ProductCard 
            defaults to 0 if not in itemsCount 
            */
            singleItemCount={
              // if itemCounts[product.id] is truthy, it's used as singleItemCount
              itemCounts[product.id] ||
              /* otherwise checks if cart.products is an array 
              uses optional chaining ? to safely access the products property 
              of the cart object if it's deeply nested 
              if cart is falsy, an error won't be thrown and returns undefined */
              (Array.isArray(cart?.products)
                ? /* searches for the product in the cart's products array where 
                  the productId matches the current product.id */
                  /* uses optional chaining again to safely access the quantity
                    property of the product found 
                    if find doesn't return a product, an error isn't thrown and 
                    find returns undefined */
                  cart.products.find((p) => p.productId === product.id)
                    ?.quantity
                : // 0 is the fallback if cart.products is not an array
                  0) ||
              /* if neither itemCounts (it's undefined) nor cart.products (it 
              doesn't have the quantity property) use 0 as the singleItemCount */
              0
            }
            /* updates itemCounts state in PageContext to reflect a new count for
            the product when the user modifies the product's quantity 
            onChange prop listens for changes in an input field */
            onChange={(newCount) =>
              /* creates a new ItemCount state with the updated count 
              it's the functional update form that ensures I update the current
              state based on its previous value */
              setItemCounts((prevCounts) => ({
                // ... copies existing itemCounts state
                ...prevCounts,
                // dynamically sets the key, product.id, and its corresponding value
                [product.id]: Number(newCount),
              }))
            }
            // passes product id and price to handleAddClick in PageContext
            handleAddClick={(productPrice) =>
              handleAddClick(product.id, productPrice)
            }
          />
        ))}
      </div>
    </>
  );
}

export default CardsContainer;
