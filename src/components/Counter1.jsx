import { useRef, useContext } from "react";
import React from "react";
import styles from "../css/Counter1.module.css";
import DataContext from "../context/DataContext";
const Counter1 = (props) => {
  const numberString = useRef();
  const DataCtx = useContext(DataContext);
  const SubmitFoodHandeler = (e) => {
    e.preventDefault();
    const incomingNumber = numberString.current.value;
    const realNumber = +incomingNumber.trim();

    if (realNumber.length === 0 || realNumber < 0 || realNumber > 5) {
      return;
    }

    DataCtx.addData({
      name: props.name,
      price: props.price,
      id: props.id,
      amount: realNumber,
    });
  };
  return (
    <form className={styles.div0} onSubmit={SubmitFoodHandeler}>
      <div className={styles.div1}>
        <div className={styles.div2}>Amount: </div>
        <input
          ref={numberString}
          type="number"
          min={1}
          max={5}
          className={styles["number-input"]}
          defaultValue={1}
        />
      </div>{" "}
      <button type="submit" className={styles["add-button"]}>
        +Add
      </button>
    </form>
  );
};
export default Counter1;
