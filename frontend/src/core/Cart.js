import React, { useState, useEffect } from "react";
import "./../styles.css";
import { API } from "./../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { loadCart } from "./helper/CartHelper";

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(loadCart());
  }, []);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>This seactio is to load prods</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
          />
        ))}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h2>This seactio is to load checkotu</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">{loadCheckout()}</div>
      </div>
    </Base>
  );
};

export default Cart;
