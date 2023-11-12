import { styled } from "styled-components";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
const StyledDiv = styled.div`
bottom: 0;
position: fixed;
background-color: #000000ab;
width: 100%;
height: 100%;
z-index: 100;
}
`;
const FinalBackCard = (props) => {
  const ctx = useContext(AuthContext);
  return <StyledDiv onClick={ctx.HideCardHandler}>{props.children}</StyledDiv>;
};
export default FinalBackCard;
