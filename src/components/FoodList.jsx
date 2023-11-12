import Counter1 from "./Counter1";
import { useRef } from "react";
import styles from "../css/FoodList.module.css";
const FoodList = (props) => {
  return (
    <div className={styles["food-list-container"]}>
      <div style={{ textAlign: "left" }}>
        <div style={{ fontSize: 17, fontWeight: "bold" }}>{props.name}</div>
        <div>{props.title}</div>
        <div>${props.price}</div>
      </div>

      <Counter1 name={props.name} price={props.price} id={props.id} />
    </div>
  );
};
export default FoodList;
