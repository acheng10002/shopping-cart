import ProductCard from "./ProductCard.jsx";
import NavBar from "./NavBar.jsx";
import { useState, useEffect } from "react";

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
  const [itemCounts, setItemCounts] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [checkoutAmount, setCheckoutAmount] = useState(0.0);

  const handleAddClick = (productId, productPrice) => {
    const itemCount = Number(itemCounts[productId] || 0);

    setTotalItems((prevCount) => prevCount + itemCount);
    setCheckoutAmount(
      (prevAmount) => prevAmount + itemCount * Number(productPrice)
    );

    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: 0,
    }));
  };

  return (
    <>
      <NavBar totalItems={totalItems} checkoutAmount={checkoutAmount} />
      <h1>Shop!</h1>
      <div className="cards-container">
        {productIdSet.map((productId) => (
          <ProductCard
            key={productId}
            productId={productId}
            singleItemCount={itemCounts[productId] || 0}
            onChange={(newCount) =>
              setItemCounts((prevCounts) => ({
                ...prevCounts,
                [productId]: Number(newCount),
              }))
            }
            handleAddClick={(productPrice) =>
              handleAddClick(productId, productPrice)
            }
          />
        ))}
      </div>
    </>
  );
}

export default CardsContainer;
