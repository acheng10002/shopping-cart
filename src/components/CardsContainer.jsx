/* CardsContainer.jsx is the app's component for all the product cards
it's a child of PageContainer component 
it's a parent to the ProductCard component */
import { useContext, useState, useEffect } from "react";
import { PageContext } from "./PageContext";
import ProductCard from "./ProductCard.jsx";

// isDefaultView prop being passed in with prop of default value, false
function CardsContainer({ isDefaultView = false }) {
  /* access totalItems, setItemsCounts, handleAddClick, and cart provided by the 
  PageContext.Provider */
  const { itemCounts, setItemCounts, handleAddClick, cart } =
    useContext(PageContext);
  // manages all products' info, loading status, and error
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetches data for all product ids for either a user's cart or default cart
  useEffect(() => {
    async function fetchProducts() {
      try {
        let productIds;
        const defaultProductIds = [
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
        if (
          // if isDefaultView is false
          !isDefaultView &&
          // if cart exists
          cart &&
          // if cart has a products property that's an array
          Array.isArray(cart.products) &&
          // and the array's length is greater than 0 , then fetch products from the user's cart
          cart.products.length > 0
        ) {
          /* cart.products is array of objects, each object has a productId and a quantity 
          map iterates over the cart.products array, extract the productId property */
          const cartProductIds = cart.products.map(
            // gives me an array of productIds
            (product) => product.productId
          );
          /* [...defaultProductIds, ...cartProductIds] combines 2 arrays into 1,
          turns the combination into a Set */
          productIds = Array.from(
            /* Set ensures all its elements are unique, map converts each ID in 
            defaultProductIds and cartProductIds into a string */
            new Set([
              /* converts the defaultProductIds and cartProductsId to arrays of strings
              automatically removes duplicates, then converts the Set back 
              into an array */
              ...defaultProductIds,
              ...cartProductIds.map(String),
            ])
          );
          // productIds is an array of unique productIds

          // builds an initialItemCounts object
          const initialItemCounts = {};

          /* loops through the products objects array of cart (each object having a projectId
          property and a quantity property) */
          cart.products.forEach((product) => {
            /* each object's productId becomes a key, and its quantity becomes the key's value 
            in the initialItemCounts object */
            initialItemCounts[product.productId] = product.quantity;
          });

          // initializes state
          setItemCounts(initialItemCounts);

          // otherwise, fetch products from the default empty cart
        } else {
          // if no cart, use default product Ids
          productIds = defaultProductIds;
        }
        /* Promise.all fetches all 20 products in either merged array or 
        the defaultProductIds in parallel */
        const responses = await Promise.all(
          /* maps over merged productIds array or the defaultProductIds to send 
          API requests for each product id, transforms an array into a new array 
          by applying the fetch to each element */
          productIds.map((id) =>
            fetch(`https://fakestoreapi.com/products/${id}`).then((res) =>
              res.json()
            )
          )
        );
        /* initializes a Map object, data structure that allows key-value 
        pairs where each key is unique and value can be any type */
        const productsDataMap = new Map();
        // iterates over the responses array fetched from the API for all products
        responses.forEach((product) => {
          /* product.id of each product is added as key, product data object as value 
          to the Map, if the key already exists it updates the project data object value */
          productsDataMap.set(product.id, product);
        });
        /* takes values from the Map, turns the collection into an array,
        updates productsData array with the fetched products' info */
        setProductsData(Array.from(productsDataMap.values()));
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
    // fetch all products' info
    fetchProducts();
    // re-run sideEffect if someone else logs in or logs out
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
        {/* iterates over fetched products data for either merged array or 
        defaultProductIds array to render a ProductCard for each product */}
        {productsData.map((product) => (
          <ProductCard
            // unique key to id each component in the list
            key={product.id}
            // id of the product
            productId={product.id}
            // full product data object
            productData={product}
            itemCounts={itemCounts}
            // direct function reference
            handleAddClick={handleAddClick}
          />
        ))}
      </div>
    </>
  );
}

export default CardsContainer;
