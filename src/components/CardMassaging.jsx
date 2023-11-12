import FinalBackCard from "./FinalBackCard";
import ReactDom from "react-dom";
import FinalShopCard from "./FinalShopCard";
import { useState } from "react";
const CardMassaging = (props) => {
  const PortalHandler = () => {
    return (
      <>
        {" "}
        <FinalBackCard />
        <FinalShopCard />
      </>
    );
  };
  return (
    <>
      {ReactDom.createPortal(
        <PortalHandler />,
        document.getElementById("card-massage")
      )}
    </>
  );
};
export default CardMassaging;
