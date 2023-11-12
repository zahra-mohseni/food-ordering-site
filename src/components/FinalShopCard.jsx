import { useContext, useState, useEffect } from "react";
import styles from "../css/FinalShopCard.module.css";
import AuthContext from "../context/AuthContext";
import DataContext from "../context/DataContext";
import ConfirmForm from "./ConfirmForm";
import FinalBackCard from "./FinalBackCard";
const InformationCard = (props) => {
  return (
    <div className={styles["main-containar0"]}>
      <div className={styles["ineer-container"]}>
        {" "}
        <div>
          <div className={styles.div1}>{props.name}</div>
          {""}
        </div>
        <div className={styles.container3}>
          <div>{props.price} $</div>
        </div>
      </div>
      <div className={styles.div3}>x{props.amount}</div>
      <div className={styles.div2}>
        <button onClick={props.onAddHandler}>+</button>
        <button onClick={props.onRemoveHandler}>-</button>
      </div>
    </div>
  );
};

const FinalShopCard = (props) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const confirmHandler = () => {
    setIsConfirm(true);
  };
  const ctx = useContext(AuthContext);
  const Datactx = useContext(DataContext);
  const plusHandler = (item) => {
    Datactx.addData({ ...item, amount: 1 });
  };

  const finalSubmitHandler = (userData) => {
    setIsSubmitLoading(true);
    const Response = fetch(
      "https://react-pj-74-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, orderedItems: Datactx.items }),
      }
    )
      .then((Response) => {
        if (!Response.ok) {
          throw new Error("sorry can't concect to server!");
        } else {
          setIsSubmitLoading(false);
          setIsConfirmed(true);
          Datactx.clearCard();
        }
      })
      .catch((e) => {
        setIsSubmitLoading(false);
        setErrorMessage(e.message);

        console.log(e.message);
      });

    // ctx.HideCardHandler();
  };

  const removeHandler = (id) => {
    Datactx.removeData(id);
  };
  const buttons = (
    <div className={styles["button-styles"]}>
      <button onClick={ctx.HideCardHandler}>close</button>
      <button
        onClick={confirmHandler}
        disabled={Datactx.total === 0 ? true : false}
      >
        order
      </button>
    </div>
  );
  const mainJsx = (
    <div className={styles["card-container"]}>
      {Datactx.items.map((item) => {
        return (
          <InformationCard
            name={item.name}
            price={item.price}
            id={item.id}
            key={item.id}
            amount={item.amount}
            onAddHandler={plusHandler.bind(null, item)}
            onRemoveHandler={removeHandler.bind(null, item.id)}
          />
        );
      })}

      <div className={styles.container5}>
        <div className={styles.container4}>${Datactx.total}</div>
        {!isConfirm && buttons}
      </div>
      {isConfirm && (
        <ConfirmForm
          onClose={ctx.HideCardHandler}
          onConfirm={finalSubmitHandler}
        />
      )}
    </div>
  );
  console.log(isConfirmed);
  return (
    <>
      {!isSubmitLoading && errorMessage && (
        <FinalBackCard>
          <p className={styles.errors}>{errorMessage}</p>
        </FinalBackCard>
      )}
      {isSubmitLoading && (
        <FinalBackCard>
          {" "}
          <p className={styles.loadingMessage}>please wait ...</p>
        </FinalBackCard>
      )}{" "}
      {isConfirmed && (
        <FinalBackCard>
          <p className={styles.submition}>your order submitted successfully</p>
        </FinalBackCard>
      )}
      {!isConfirmed && !isSubmitLoading && !errorMessage && mainJsx}
    </>
  );
};
export default FinalShopCard;
