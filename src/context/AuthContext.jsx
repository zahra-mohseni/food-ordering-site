import React from "react";
import { useState } from "react";
const AuthContext = React.createContext({
  id: 1,
  ShowCardHandler: () => {},
  setFoodNum: () => {},
  HideCardHandler: () => {},
});
export const AuthContextProvider = (props) => {
  const [foodNum, setFoodNum] = useState();
  const foodNumber = foodNum;
  const [cardIsVisible, setCardIsVisible] = useState();
  const ShowCardHandler = () => {
    setCardIsVisible(true);
  };
  const HideCardHandler = () => {
    setCardIsVisible(false);
  };

  const cardIsVisible1 = cardIsVisible;
  return (
    <AuthContext.Provider
      value={{
        id: 1,
        setFoodNum: setFoodNum,
        foodNumber: foodNumber,
        cardIsVisible1: cardIsVisible1,
        HideCardHandler: HideCardHandler,
        ShowCardHandler: ShowCardHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
