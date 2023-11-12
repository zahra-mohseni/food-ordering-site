import styles from "../css/ShoppingHeader.module.css";

import { useContext, useState, useEffect } from "react";

import AuthContext from "../context/AuthContext";

import DataContext from "../context/DataContext";
const ShoppingHeader = (props) => {
  const ctx = useContext(AuthContext);
  const ctx2 = useContext(DataContext);
  const [bolding, setBolding] = useState(false);
  let itemsLength = ctx2.items;
  useEffect(() => {
    if (itemsLength.length === 0) {
      return;
    }
    setBolding(true);
    let timer = setTimeout(() => {
      setBolding(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [itemsLength]);
  const onclickHandler = () => {
    ctx.ShowCardHandler();
  };
  const shoppingClasses = `${styles["shoping-container"]} ${
    bolding ? styles["bolding-classes"] : ""
  }`;
  return (
    <div className={shoppingClasses} onClick={onclickHandler}>
      <i
        className="fa fa-shopping-cart fa-7x"
        aria-hidden="true"
        style={{ fontSize: 21 }}
      ></i>{" "}
      <div>Your shopping list</div>{" "}
      <div className={styles["total-num"]}>{ctx2.finalNumber || 0}</div>
    </div>
  );
};
export default ShoppingHeader;
