import React from "react";

const Square = ({x, y, squareValue, clicked, handleClick}) => {

  return (
    <div className={clicked ? "square-clicked" : "square"} onClick={() => handleClick(x, y, [[x, y]])}>
      {clicked ? squareValue: ""}
    </div>
  )
}

export default Square;