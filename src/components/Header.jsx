import React, { Fragment } from "react";
import { styled } from "styled-components";
import ShoppingHeader from "./ShopingHeader";
import CardMassaging from "./CardMassaging";
const Navigation = styled.div`
  position: fixed;
  height: 90px;
  width: 100%;
  background-color: #ffa500f5;
  position: fixed;
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: end;
  flex-direction: row;
`;
const Header = (props) => {
  return (
    <>
      <Navigation>
        {props.children} <ShoppingHeader />
      </Navigation>
    </>
  );
};
export default Header;
