import React from "react";
import "./style.css";

function SearchBar(props) {
  return (
    <div className="col-12">
      <form>
        <input
          className="col-12"
          type="search"
          placeholder={props.placeholder}
          name="search"
          value={props.value}
          onChange={props.handleChange}
        />
      </form>
    </div>
  );
}

export default SearchBar;