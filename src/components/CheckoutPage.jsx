/* useContext is a hook that exports PageContext context object, so its values
can be consumed by child components, allowing them to access shared state 
and logic from PageProvider component */
import { useState, useContext, useEffect } from "react";
import { PageContext } from "./PageContext";
import PageContainer from "./PageContainer";

const CheckoutPage = () => {
  const { itemCounts } = useContext(PageContext);
  // tracks checkout info and loading status
  const [checkoutDetails, setCheckoutDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetches all products' info
  useEffect(() => {
    const fetchCheckoutDetails = async () => {
      // toggle loading status
      setLoading(true);
      // try block for error handling
      try {
        // extracts all productId keys from itemCounts object
        const productIds = Object.keys(itemCounts).filter(
          // filters out product Ids where the count is 0
          (productId) => itemCounts[productId] > 0
        );

        /* if no products have a count greater than 0, productIds and checkoutDetails
        will be an empty array */
        if (productIds.length === 0) {
          setCheckoutDetails([]);
          return;
        }
        /* iterates over each productId in the productIds array 
        returns an array of promises bc the callback is async */
        const productDetails = productIds.map(async (productId) => {
          /* sends a GET request to the fakestoreapi.com endpoint 
          for each product Id in the array */
          const response = await fetch(
            `https://fakestoreapi.com/products/${productId}`
          );
          // parses the response as json to get each product's data
          const productData = await response.json();
          // spreads the existing GET response with product data into the productDetails object
          return {
            ...productData,
            /* adds quantity property to the productDetails and its value is from
            the itemCounts state */
            quantity: itemCounts[productId],
          };
        });

        // Promise.all fetches productData for every productId in itemCounts in parallel
        const details = await Promise.all(productDetails);
        setCheckoutDetails(details);
        // on failure, logs the error to the console
      } catch (error) {
        console.error("Error fetching checkout details:", error);
        // after either try or catch, toggle loading status
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutDetails();
    // re-run side effect when itemCounts changes
  }, [itemCounts]);

  // accumulates the costs for the quantities of each item
  const subTotal = checkoutDetails.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);

  // calculates tax on the subtotal
  const tax = (subTotal * 0.06).toFixed(2);

  return (
    <PageContainer>
      <h1>Your Checkout</h1>
      {/* if loading is true, render Loading h2
      if loading is false and checkoutDetails is an empty object, render 
      empty cart note 
      if loading false and checkoutDetails is not an empty object,
      render checkoutDetails */}
      {loading ? (
        <h2>Loading...</h2>
      ) : checkoutDetails.length === 0 ? (
        <h2>Your cart is empty.</h2>
      ) : (
        <div className="checkout-details">
          {/* for every product in itemCounts, map creates a ul element
          containing that product's title, price, quantity, and cost
          based on its quantity */}
          {checkoutDetails.map((product) => (
            <ul className="item-checkout" key={product.id}>
              <li className="product title">{product.title}</li>
              <li className="product cost">${product.price.toFixed(2)}</li>
              <li className="product quantity">{product.quantity}</li>
              <li className="product checkout">
                ${(product.price * product.quantity).toFixed(2)}
              </li>
            </ul>
          ))}
          <ul className="checkout-sum">
            <li className="sum-part">
              <span>Subtotal:</span>
              <span className="subtotal">${subTotal.toFixed(2)}</span>
            </li>
            <li className="sum-part">
              <span>Tax:</span>
              <span className="tax">${tax}</span>
            </li>
            <li className="sum-part">
              <span>Total:</span>
              <span className="total">
                ${(Number(subTotal) + Number(tax)).toFixed(2)}
              </span>
            </li>
          </ul>
        </div>
      )}
    </PageContainer>
  );
};

export default CheckoutPage;
