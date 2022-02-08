import React from "react";
import "./style.css";

function Button(props) {
  return (
    <button {...props} className="btn col-12">
      {props.children}
    </button>
  );
}

export default Button;