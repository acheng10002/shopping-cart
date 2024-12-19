/* CardsContainer.jsx is the app's component for all the product cards
it's a child of PageContainer component 
it's a parent to the ProductCard component */
import { useContext, useState, useEffect } from "react";
import { PageContext } from "./PageContext";
import ProductCard from "./ProductCard.jsx";

const productIdSet = [
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

function CardsContainer() {
  /* access totalItems, setItemsCounts, and handleAddClick provided by the 
  PageCOntext.Provider 
  - manages the state in the CardsContainer component */
  const { itemCounts, setItemCounts, handleAddClick } = useContext(PageContext);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetches data for all product ids in productIdSet
    async function fetchAllProducts() {
      try {
        // Promise.all fetches all products in parallel
        const responses = await Promise.all(
          // maps over productIdSet to send API requests for each product id
          productIdSet.map((id) =>
            fetch(`https://fakestoreapi.com/products/${id}`).then((res) =>
              res.json()
            )
          )
        );
        // on success, updates productData with the fetched product info
        setProductData(responses);
        setLoading(false);
      } catch (error) {
        // on failure, logs the error to the console, sets error to a message
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
        setLoading(false);
      }
    }

    fetchAllProducts();

    fetch("https://fakestoreapi.com/users")
      .then((res) => res.json())
      .then((json) => console.log(json));
    // useEffect runs only once when the component mounts
  }, []);

  // if loading is true, render message indicating data is being fetched
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // if error is not null, render the error message
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <h1>Shop!</h1>
      <div className="cards-container">
        {/* iterates over the fetched product data to render a ProductCard
        for each product */}
        {productData.map((product) => (
          <ProductCard
            key={product.id} // unique key to id each component in the list
            productId={product.id} // id of the product
            productData={product} // full product data object
            /* current count of the product in the card 
            defaults to 0 if not in itemsCount */
            singleItemCount={itemCounts[product.id] || 0}
            // updates the count for the product in itemCounts
            onChange={(newCount) =>
              // creates a new state obejct with the updated count
              setItemCounts((prevCounts) => ({
                ...prevCounts,
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
