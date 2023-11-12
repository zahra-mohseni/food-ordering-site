import styles from "../css/ConfirmForm.module.css";
import { useRef, useEffect, useState } from "react";
const isValid = (value) => value.trim() !== "";
const isFiveChars = (val) => val.trim().length === 5;
const ConfirmForm = (props) => {
  const nameInput = useRef("");
  const postalCodeInput = useRef("");
  const addressInput = useRef("");

  const [formInputState, setFormInputState] = useState({
    name: true,
    address: true,
    postalCode: true,
  });
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInput.current.value;
    const enteredAddress = addressInput.current.value;
    const enteredPostalCode = postalCodeInput.current.value;
    const enteredNameIsValid = isValid(enteredName);
    const enteredAddressIsValid = isValid(enteredAddress);
    const enteredPostalCodeIsValid =
      isValid(enteredPostalCode) && isFiveChars(enteredPostalCode);
    setFormInputState({
      name: enteredNameIsValid,
      address: enteredAddressIsValid,
      postalCode: enteredPostalCodeIsValid,
    });
    const formIsValid =
      enteredNameIsValid && enteredAddressIsValid && enteredPostalCodeIsValid;
    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
      postalCode: enteredPostalCode,
    });
  };

  return (
    <form className={styles["form-styles"]} onSubmit={formSubmitHandler}>
      <div>
        <label htmlFor="name">name :</label>
        <input
          ref={nameInput}
          id="name"
          placeholder="enter your name"
          type="text"
          className={`${styles.inputs} ${
            formInputState.name ? "" : styles.invalid
          }`}
        />
        {!formInputState.name && (
          <p style={{ margin: 2, color: "red" }}>please enter a valid name</p>
        )}
      </div>
      <div>
        {" "}
        <label htmlFor="address ">address :</label>
        <input
          ref={addressInput}
          id="address"
          placeholder="enter your address"
          type="text"
          className={`${styles.inputs} ${
            formInputState.address ? "" : styles.invalid
          }`}
        />
        {!formInputState.address && (
          <p style={{ margin: 2, color: "red" }}>
            please enter a valid address
          </p>
        )}
      </div>
      <div>
        {" "}
        <label htmlFor="postal-code">postal code :</label>
        <input
          ref={postalCodeInput}
          id="postal-code"
          placeholder="enter your postal code"
          type="text"
          className={`${styles.inputs} ${
            formInputState.postalCode ? "" : styles.invalid
          }`}
        />
        {!formInputState.postalCode && (
          <p style={{ margin: 2, color: "red" }}>
            please enter a valid postal code(5 digits)
          </p>
        )}
      </div>
      <div className={styles.buttons}>
        <button
          onClick={props.onClose}
          type="button"
          style={{ backgroundColor: "#ff00004a" }}
        >
          cancle
        </button>{" "}
        <button>confirm</button>
      </div>
    </form>
  );
};
export default ConfirmForm;
