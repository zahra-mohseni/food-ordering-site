import styles from "../css/Card.module.css";
import { Fragment } from "react";

const Card = (props) => {
  return (
    <>
      {" "}
      <div className={styles["card-background"]}>{props.children}</div>
    </>
  );
};
export default Card;
