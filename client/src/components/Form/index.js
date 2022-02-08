import React from "react";
import "./style.css";

export function Input(props) {
  return (
    <div className="form-group col-12">
      <input className="form-control" {...props} />
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="form-group col-12">
      <textarea className="form-control" rows="5" {...props} />
    </div>
  );
}