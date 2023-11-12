import React from "react";
import { useReducer } from "react";
const DataContext = React.createContext({
  items: [],
  total: 0,
  addData: () => {},
  removeData: () => {},
  finalState: "",
  clearCard: () => {},
});
export default DataContext;
const initialState = { items: [], total: 0 };
const finalReducer = (finalState, action) => {
  switch (action.type) {
    case "ADD":
      const existingItemId = finalState.items.findIndex(
        (item) => item.id === action.item.id
      );
      let existingItem = finalState.items[existingItemId];
      const actualItems = finalState.items.concat(action.item);
      let updatedItems = [];

      if (existingItem) {
        let updatedItem = {
          ...existingItem,
          amount: action.item.amount + existingItem.amount,
        };
        updatedItems = [...finalState.items];
        updatedItems[existingItemId] = updatedItem;
      } else {
        updatedItems = finalState.items.concat(action.item);
      }

      const newTotal =
        finalState.total + action.item.amount * action.item.price;

      const finalFoodNumber = actualItems.reduce((y, x) => {
        return y + x.amount;
      }, 0);

      return {
        actualItems: actualItems,
        items: updatedItems,
        total: newTotal,
        finalNumber: finalFoodNumber,
      };
      break;
    case "REMOVE":
      const existingItemId2 = finalState.items.findIndex(
        (item) => item.id === action.id
      );
      const existingItem2 = finalState.items[existingItemId2];
      const newTotal2 = finalState.total - existingItem2.price;

      let updatedItems2;

      if (existingItem2.amount === 1) {
        updatedItems2 = finalState.items.filter(
          (item) => item.id !== action.id
        );
      } else {
        let updatedItem2 = {
          ...existingItem2,
          amount: existingItem2.amount - 1,
        };
        updatedItems2 = [...finalState.items];
        updatedItems2[existingItemId2] = updatedItem2;
      }
      const finalFoodNumber2 = updatedItems2.reduce((y, x) => {
        return y + x.amount;
      }, 0);
      return {
        items: updatedItems2,
        total: newTotal2,
        finalNumber: finalFoodNumber2,
      };
    case "CLEAR":
      return initialState;
  }
  return initialState;
};
export const DataContextProvider = (props) => {
  const [finalState, dispatch] = useReducer(finalReducer, initialState);
  const total = finalState.total;
  const clearCard = () => {
    dispatch({ type: "CLEAR" });
  };
  const removeData = (id) => {
    dispatch({ id: id, type: "REMOVE" });
  };
  const items = finalState.items;
  const addData = (item) => {
    dispatch({ type: "ADD", item: item });
  };
  const dataValue = {
    items: items,
    total: total,
    addData: addData,
    removeData: removeData,
    finalState: finalState,
    finalNumber: finalState.finalNumber,
    clearCard: clearCard,
  };
  return (
    <DataContext.Provider value={dataValue}>
      {props.children}
    </DataContext.Provider>
  );
};
